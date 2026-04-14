from fastapi import APIRouter, HTTPException
import httpx
from app.services.kobo_service import kobo_service

router = APIRouter()

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
async def get_asset_data(asset_uid: str):
    """
    Descarga TODAS las respuestas de un formulario, siguiendo la paginación.
    """
    try:
        return await kobo_service.get_asset_data(asset_uid)
    except httpx.RequestError as e:
        raise HTTPException(status_code=502, detail=f"Error al contactar Kobo: {e}")
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=str(e))
