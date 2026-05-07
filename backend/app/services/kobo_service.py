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
        Descarga TODAS las respuestas de un formulario de forma optimizada.
        Utiliza un tamaño de página mayor y peticiones paralelas.
        """
        page_size = 1000  # Aumentamos el tamaño de página para reducir peticiones
        first_url = f"{settings.KOBO_BASE_URL}/assets/{asset_uid}/data/?format=json&page_size={page_size}"

        async with httpx.AsyncClient(timeout=60, limits=httpx.Limits(max_connections=20)) as client:
            # Obtenemos la primera página para conocer count
            first_response = await client.get(first_url, headers=settings.AUTH_HEADERS)
            first_response.raise_for_status()
            first_payload = first_response.json()

            total_count = first_payload.get("count", 0)
            results = list(first_payload.get("results", []))

            # Si hay más datos, calculamos cuántas páginas faltan
            if total_count > page_size:
                import asyncio
                import math
                
                total_pages = math.ceil(total_count / page_size)
                # Ya tenemos la página 1, pedimos de la 2 en adelante
                tasks = []
                for page in range(2, total_pages + 1):
                    page_url = f"{first_url}&page={page}"
                    tasks.append(client.get(page_url, headers=settings.AUTH_HEADERS))
                
                responses = await asyncio.gather(*tasks)
                for resp in responses:
                    resp.raise_for_status()
                    results.extend(resp.json().get("results", []))

            return {
                "count": total_count,
                "fetched": len(results),
                "results": results,
            }

kobo_service = KoboService()
