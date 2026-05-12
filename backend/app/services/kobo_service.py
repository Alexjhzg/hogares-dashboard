import httpx
import asyncio
import math
import time
import logging
from typing import Optional
from app.core.config import settings
from app.services.geo_service import geo_engine

logger = logging.getLogger(__name__)


# ─── Cache con soporte de prefetching proactivo ───────────────────────────────

class BackgroundPrefetchCache:
    """
    Caché en memoria con precarga proactiva en segundo plano.

    Estados internos por UID:
      - Ausente       → nunca descargado, o TTL expirado.
      - "fetching"    → descarga en curso (evita peticiones duplicadas).
      - (datos, ts)   → descarga completa y almacenada.
    """

    def __init__(self, ttl_seconds: int = 900):
        self._store: dict[str, tuple[dict, float]] = {}
        self._fetching: set[str] = set()
        self._ttl = ttl_seconds

    def get(self, uid: str) -> Optional[dict]:
        """Devuelve el payload si existe y no ha expirado, o None."""
        if uid in self._store:
            payload, ts = self._store[uid]
            if time.time() - ts < self._ttl:
                return payload
            # TTL expirado → limpiar entrada
            del self._store[uid]
        return None

    def set(self, uid: str, payload: dict) -> None:
        """Almacena el payload y marca la descarga como completada."""
        self._store[uid] = (payload, time.time())
        self._fetching.discard(uid)

    def is_fetching(self, uid: str) -> bool:
        """¿Hay una descarga activa en background para este UID?"""
        return uid in self._fetching

    def mark_fetching(self, uid: str) -> None:
        """Marca un UID como 'descarga en progreso'."""
        self._fetching.add(uid)

    def invalidate(self, uid: str) -> None:
        """Elimina un UID de caché y cancela su estado de descarga."""
        self._store.pop(uid, None)
        self._fetching.discard(uid)


# Instancia global compartida por el servicio y los endpoints
prefetch_cache = BackgroundPrefetchCache()


# ─── KoboService ─────────────────────────────────────────────────────────────

class KoboService:

    @staticmethod
    async def get_assets():
        """Lista de formularios (assets) disponibles en KoboToolbox."""
        # Nota: verify=False se usa para evitar problemas (como timeouts SSL) con servidores Kobo
        async with httpx.AsyncClient(timeout=30, verify=False) as client:
            response = await client.get(
                f"{settings.KOBO_BASE_URL}/assets/?format=json",
                headers=settings.AUTH_HEADERS,
            )
            response.raise_for_status()
            return response.json().get("results", [])

    # ── Núcleo de descarga (reutilizable) ────────────────────────────────────

    @staticmethod
    async def _fetch_all_pages(client: httpx.AsyncClient, asset_uid: str) -> dict:
        """
        Descarga TODAS las páginas de un asset usando peticiones paralelas.
        Lógica centralizada para reusar tanto en get_asset_data como en prefetch_asset.
        """
        page_size = 1000
        first_url = (
            f"{settings.KOBO_BASE_URL}/assets/{asset_uid}/data/"
            f"?format=json&page_size={page_size}"
        )

        # Página 1 — determina el total de registros
        first_response = await client.get(first_url, headers=settings.AUTH_HEADERS)
        first_response.raise_for_status()
        first_payload = first_response.json()

        total_count = first_payload.get("count", 0)
        results = list(first_payload.get("results", []))

        # Si hay más páginas → descargar en paralelo (ya tenemos la 1)
        if total_count > page_size:
            total_pages = math.ceil(total_count / page_size)
            tasks = [
                client.get(f"{first_url}&page={p}", headers=settings.AUTH_HEADERS)
                for p in range(2, total_pages + 1)
            ]
            responses = await asyncio.gather(*tasks)
            for resp in responses:
                resp.raise_for_status()
                results.extend(resp.json().get("results", []))

        # Enrich data geospacially
        enriched_results = [geo_engine.enrich_survey(r) for r in results]

        return {
            "count": total_count,
            "fetched": len(enriched_results),
            "results": enriched_results,
        }

    # ── Punto de entrada principal ────────────────────────────────────────────

    @staticmethod
    async def get_asset_data(asset_uid: str) -> dict:
        """
        Descarga los datos de un asset con caché integrada.

        Flujo:
          1. Caché HIT  → retorna inmediatamente.
          2. En curso   → espera hasta que el prefetch en background termine.
          3. Miss       → descarga directa y almacena en caché.
        """
        # 1. Cache HIT
        cached = prefetch_cache.get(asset_uid)
        if cached:
            logger.info(f"[KoboService] Cache HIT → {asset_uid}")
            return cached

        # 2. Prefetch en curso → esperar con timeout (max 30 s)
        if prefetch_cache.is_fetching(asset_uid):
            logger.info(f"[KoboService] Esperando prefetch en curso → {asset_uid}...")
            for _ in range(60):
                await asyncio.sleep(0.5)
                cached = prefetch_cache.get(asset_uid)
                if cached:
                    logger.info(f"[KoboService] Prefetch listo → {asset_uid}")
                    return cached
            logger.warning(f"[KoboService] Timeout esperando prefetch → {asset_uid}. Descargando directamente.")

        # 3. Descarga directa (cache MISS)
        logger.info(f"[KoboService] Cache MISS → descargando {asset_uid}...")
        async with httpx.AsyncClient(
            timeout=httpx.Timeout(120.0, connect=30.0), 
            verify=False, 
            limits=httpx.Limits(max_connections=20)
        ) as client:
            data = await KoboService._fetch_all_pages(client, asset_uid)

        logger.info(f"[KoboService] Descarga completa → {asset_uid} ({data['fetched']} registros)")
        return data

    # ── Prefetch en segundo plano ─────────────────────────────────────────────

    @staticmethod
    async def prefetch_asset(asset_uid: str) -> None:
        """
        Descarga y almacena un asset en background de forma proactiva.
        Si ya está en caché o en curso, no hace nada (idempotente).
        """
        if not asset_uid:
            return

        # Idempotencia: evitar trabajo duplicado
        if prefetch_cache.get(asset_uid) or prefetch_cache.is_fetching(asset_uid):
            logger.info(f"[KoboService] Prefetch omitido (ya en caché/curso) → {asset_uid}")
            return

        prefetch_cache.mark_fetching(asset_uid)
        logger.info(f"[KoboService] Iniciando prefetch background → {asset_uid}")

        try:
            async with httpx.AsyncClient(
                timeout=httpx.Timeout(120.0, connect=30.0), 
                verify=False, 
                limits=httpx.Limits(max_connections=20)
            ) as client:
                data = await KoboService._fetch_all_pages(client, asset_uid)

            # El endpoint se encarga de normalizar/filtrar antes de guardar en caché.
            # Aquí sólo guardamos el payload crudo para que el endpoint lo procese
            # cuando sea requerido (estrategia lazy-normalize).
            prefetch_cache.set(asset_uid, data)
            logger.info(
                f"[KoboService] Prefetch completado → {asset_uid} "
                f"({data['fetched']} registros)"
            )
        except Exception as exc:
            # El prefetch nunca debe tumbar el servidor. Solo logueamos y limpiamos.
            logger.error(f"[KoboService] Prefetch falló → {asset_uid}: {exc}")
            prefetch_cache.invalidate(asset_uid)


kobo_service = KoboService()
