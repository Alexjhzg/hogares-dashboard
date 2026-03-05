from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.core.config import settings
from app.api.endpoints import router as api_router

app = FastAPI(title="KoboToolbox API Proxy - Refactored")

# Middlewares
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir rutas de API
app.include_router(api_router)

# Archivos estáticos (frontend)
# Nota: Suponemos que la carpeta frontend existe en la raíz del proyecto
app.mount("/", StaticFiles(directory="../frontend", html=True), name="frontend")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
