from fastapi import APIRouter, HTTPException
import httpx
from app.services.kobo_service import kobo_service
from app.services.normalization import normalize_record, filter_record
import time

router = APIRouter()

# Simple In-Memory Cache
class SimpleCache:
    def __init__(self, ttl_seconds=900): 
        # TTL (Time To Live): Tiempo de vida en segundos antes de que los datos caduquen (900s = 15min)
        self.data = {}
        self.ttl = ttl_seconds

    def get(self, key):
        if key in self.data:
            val, timestamp = self.data[key]
            if time.time() - timestamp < self.ttl:
                return val
            else:
                del self.data[key]
        return None

    def set(self, key, value):
        self.data[key] = (value, time.time())

data_cache = SimpleCache()

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
async def get_asset_data(asset_uid: str, refresh: bool = False):
    """
    Descarga TODAS las respuestas de un formulario, las normaliza en el backend
    y las envía al cliente (filtrando solo los campos necesarios).
    Usa un sistema de caché de 15 minutos.
    """
    if not refresh:
        cached_val = data_cache.get(asset_uid)
        if cached_val:
            return cached_val

    try:
        data = await kobo_service.get_asset_data(asset_uid)
        results = data.get("results", [])
        
        filtered_results = []
        for r in results:
            # 1. Normalizar (añade _backend_meta)
            r["_backend_meta"] = normalize_record(r)
            # 2. Filtrar campos innecesarios
            filtered_results.append(filter_record(r))
            
        final_payload = {
            "count": data.get("count", 0),
            "fetched": data.get("fetched", 0),
            "results": filtered_results,
        }
        
        # Guardar en caché
        data_cache.set(asset_uid, final_payload)
        
        return final_payload
    except httpx.RequestError as e:
        raise HTTPException(status_code=502, detail=f"Error al contactar Kobo: {e}")
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=str(e))
