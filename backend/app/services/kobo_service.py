import httpx
from app.core.config import settings

class KoboService:
    @staticmethod
    async def get_assets():
        """Lista de formularios (assets) disponibles en KoboToolbox."""
        async with httpx.AsyncClient(timeout=30) as client:
            response = await client.get(
                f"{settings.KOBO_BASE_URL}/assets/?format=json",
                headers=settings.AUTH_HEADERS,
            )
            response.raise_for_status()
            return response.json().get("results", [])

    @staticmethod
    async def get_asset_data(asset_uid: str):
        """
        Descarga TODAS las respuestas de un formulario, siguiendo la paginación
        automáticamente.
        """
        first_url = f"{settings.KOBO_BASE_URL}/assets/{asset_uid}/data/?format=json"

        async with httpx.AsyncClient(timeout=60) as client:
            # Obtenemos la primera página para conocer count y next
            first_response = await client.get(first_url, headers=settings.AUTH_HEADERS)
            first_response.raise_for_status()
            first_payload = first_response.json()

            total_count: int = first_payload.get("count", 0)
            results: list[dict] = list(first_payload.get("results", []))

            # Iterar páginas restantes si las hay
            next_url: str | None = first_payload.get("next")
            while next_url:
                page_resp = await client.get(next_url, headers=settings.AUTH_HEADERS)
                page_resp.raise_for_status()
                page_payload = page_resp.json()
                results.extend(page_payload.get("results", []))
                next_url = page_payload.get("next")

            return {
                "count": total_count,
                "fetched": len(results),
                "results": results,
            }

kobo_service = KoboService()
