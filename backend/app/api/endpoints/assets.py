from fastapi import APIRouter, BackgroundTasks, HTTPException
import httpx
from app.services.kobo_service import kobo_service, prefetch_cache
from app.services.normalization import normalize_record, filter_record

router = APIRouter()


def _normalize_payload(raw_data: dict) -> dict:
    """
    Aplica normalización y filtrado de campos al payload crudo de Kobo.
    Función auxiliar para no duplicar lógica entre el endpoint y el prefetch.
    """
    results = raw_data.get("results", [])
    filtered_results = [
        filter_record({**r, "_backend_meta": normalize_record(r)})
        for r in results
    ]
    return {
        "count":   raw_data.get("count", 0),
        "fetched": raw_data.get("fetched", 0),
        "results": filtered_results,
    }


@router.get("/assets")
async def get_assets():
    """Lista de formularios (assets) disponibles en KoboToolbox."""
    try:
        return await kobo_service.get_assets()
    except httpx.RequestError as e:
        raise HTTPException(status_code=502, detail=f"Error al contactar Kobo: {e}")
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=str(e))


@router.get("/data/{asset_uid}")
async def get_asset_data(
    asset_uid: str,
    refresh: bool = False,
    next_uid: str = "",
    background_tasks: BackgroundTasks = None,
):
    """
    Descarga TODAS las respuestas de un formulario, las normaliza y las envía
    al cliente. Usa el BackgroundPrefetchCache para evitar esperas en cargas
    consecutivas.

    Query params:
      - refresh   : Fuerza descarga desde Kobo ignorando caché (default: false).
      - next_uid  : UID del siguiente asset a precargar en background.
    """
    # ── Forzar refresh: invalidar caché ──────────────────────────────────────
    if refresh:
        prefetch_cache.invalidate(asset_uid)

    # ── Servir desde caché si está disponible ────────────────────────────────
    cached = prefetch_cache.get(asset_uid)
    if cached:
        # Si el payload crudo aún no fue normalizado (viene de un prefetch),
        # lo normalizamos ahora, actualizamos caché y servimos.
        if "results" in cached and cached["results"] and "_backend_meta" not in cached["results"][0]:
            cached = _normalize_payload(cached)
            prefetch_cache.set(asset_uid, cached)

        # Lanzar prefetch de la siguiente encuesta antes de responder
        if next_uid and background_tasks:
            background_tasks.add_task(kobo_service.prefetch_asset, next_uid)

        return cached

    # ── Descarga (cache MISS o refresh) ──────────────────────────────────────
    try:
        raw_data = await kobo_service.get_asset_data(asset_uid)
        final_payload = _normalize_payload(raw_data)

        # Guardar payload ya normalizado en caché
        prefetch_cache.set(asset_uid, final_payload)

        # Lanzar prefetch de la siguiente encuesta en background
        # (no bloquea la respuesta al cliente)
        if next_uid and background_tasks:
            background_tasks.add_task(kobo_service.prefetch_asset, next_uid)

        return final_payload

    except httpx.RequestError as e:
        raise HTTPException(status_code=502, detail=f"Error al contactar Kobo: {e}")
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=str(e))


@router.post("/prefetch/{asset_uid}")
async def trigger_prefetch(asset_uid: str, background_tasks: BackgroundTasks):
    """
    Endpoint explícito para calentar el caché de un asset sin esperar respuesta.
    El frontend puede llamarlo de forma proactiva tras cargar la lista de encuestas.
    """
    if not asset_uid:
        raise HTTPException(status_code=400, detail="asset_uid es requerido")

    background_tasks.add_task(kobo_service.prefetch_asset, asset_uid)
    return {"status": "prefetch_scheduled", "uid": asset_uid}
