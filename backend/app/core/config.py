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
        return {
            "Authorization": f"Token {self.KOBO_API_TOKEN}",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }

    @property
    def DATA_DIR(self) -> str:
        # Default path relative to project root
        return os.path.join(os.getcwd(), "frontend", "public", "data")

settings = Settings()
