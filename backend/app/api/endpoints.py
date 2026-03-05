from typing import List, Dict, Any
from fastapi import APIRouter, HTTPException
from app.services.kobo_service import KoboService
from app.models.schemas import NormalizedRecord, AssetDataResponse

router = APIRouter(prefix="/api", tags=["Kobo API"])

@router.get("/assets")
async def get_assets():
    """Lista de formularios (assets) disponibles en KoboToolbox."""
    data = await KoboService.fetch_kobo_data("assets/?format=json")
    return data.get("results", [])

@router.get("/data/{asset_uid}", response_model=AssetDataResponse)
async def get_asset_data(asset_uid: str):
    """
    Descarga TODAS las respuestas de un formulario con paginación automática.
    """
    first_url_suffix = f"assets/{asset_uid}/data/?format=json"
    first_payload = await KoboService.fetch_kobo_data(first_url_suffix)
    
    total_count: int = first_payload.get("count", 0)
    results: List[Dict[str, Any]] = list(first_payload.get("results", []))

    next_url: str | None = first_payload.get("next")
    while next_url:
        # Extraer el path relativo para el servicio
        path = next_url.split("/api/v2/")[1]
        page_payload = await KoboService.fetch_kobo_data(path)
        results.extend(page_payload.get("results", []))
        next_url = page_payload.get("next")

    return {
        "count": total_count,
        "fetched": len(results),
        "results": results,
    }

@router.post("/normalize", response_model=Dict[str, NormalizedRecord])
async def normalize_endpoint(record: Dict[str, Any]):
    """Normaliza un registro de Kobo usando Pydantic."""
    try:
        normalized = KoboService.normalize_record(record)
        return {"normalized": NormalizedRecord(**normalized)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error en normalización: {str(e)}")
