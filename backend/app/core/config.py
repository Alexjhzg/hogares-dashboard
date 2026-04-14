import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "KoboToolbox API Proxy"
    
    KOBO_API_TOKEN: str = os.getenv("KOBO_API_TOKEN", "")
    KOBO_BASE_URL: str = os.getenv("KOBO_BASE_URL", "").rstrip("/")
    
    # CORS
    raw_origins: str = os.getenv("ALLOWED_ORIGINS", "http://localhost:8000,http://127.0.0.1:8000")
    
    @property
    def ALLOWED_ORIGINS(self) -> list[str]:
        return [o.strip() for o in self.raw_origins.split(",") if o.strip()]
    
    @property
    def AUTH_HEADERS(self) -> dict:
        return {"Authorization": f"Token {self.KOBO_API_TOKEN}"}

settings = Settings()
