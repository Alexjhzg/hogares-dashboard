import asyncio
import httpx
from app.core.config import settings

async def main():
    try:
        async with httpx.AsyncClient(timeout=30, verify=False) as client:
            resp = await client.get(
                f"{settings.KOBO_BASE_URL}/assets/?format=json",
                headers=settings.AUTH_HEADERS,
            )
            print("STATUS:", resp.status_code)
    except Exception as e:
        print("EXCEPTION:", type(e), e)

asyncio.run(main())
