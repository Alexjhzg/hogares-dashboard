import os
import uvicorn
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.staticfiles import StaticFiles
from app.api.api_v1 import api_router
from app.core.config import settings
from app.services.spatial_validator import spatial_validator

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Acciones al iniciar el servidor
    spatial_validator.load_data(settings.DATA_DIR)
    yield
    # Acciones al apagar el servidor (si fueran necesarias)

app = FastAPI(title=settings.PROJECT_NAME, lifespan=lifespan)

# Gzip Compression
app.add_middleware(GZipMiddleware, minimum_size=1000)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Routes
app.include_router(api_router, prefix="/api")

# Static Files (Frontend) - Servir la carpeta de producción construida por Vite
frontend_path = "frontend/dist"
if os.path.exists(frontend_path):
    app.mount("/", StaticFiles(directory=frontend_path, html=True), name="frontend")
else:
    print(f"⚠️  ADVERTENCIA: No se encontró '{frontend_path}'. Asegúrate de ejecutar 'npm run build' en la carpeta frontend.")

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=True)

