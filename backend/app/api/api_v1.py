from fastapi import APIRouter
from app.api.endpoints import assets, normalize

api_router = APIRouter()
api_router.include_router(assets.router, tags=["assets"])
api_router.include_router(normalize.router, tags=["normalize"])
