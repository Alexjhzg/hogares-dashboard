from fastapi import APIRouter, HTTPException
from app.services.normalization import normalize_record

router = APIRouter()

@router.post("/normalize")
async def normalize_endpoint(record: dict):
    """
    Normaliza un único registro crudo de Kobo.
    """
    try:
        return {"normalized": normalize_record(record)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
