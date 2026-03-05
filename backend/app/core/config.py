import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List

class Settings(BaseSettings):
    KOBO_API_TOKEN: str = ""
    KOBO_BASE_URL: str = ""
    ALLOWED_ORIGINS: str = "http://localhost:8000,http://127.0.0.1:8000"
    
    @property
    def origins_list(self) -> List[str]:
        return [o.strip() for o in self.ALLOWED_ORIGINS.split(",") if o.strip()]

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()
