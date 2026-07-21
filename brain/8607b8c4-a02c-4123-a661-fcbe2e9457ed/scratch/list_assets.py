import asyncio
import httpx
import os
import sys

# Add backend to path
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "..", "..", "backend"))
from app.core.config import settings

async def main():
    try:
        async with httpx.AsyncClient(timeout=30, verify=False) as client:
            resp = await client.get(
                f"{settings.KOBO_BASE_URL}/assets/?format=json",
                headers=settings.AUTH_HEADERS,
            )
            print("STATUS:", resp.status_code)
            if resp.status_code == 200:
                results = resp.json().get("results", [])
                print(f"Found {len(results)} assets:")
                for r in results:
                    print(f"- Name: {r.get('name')} | UID: {r.get('uid')} | Type: {r.get('asset_type')}")
            else:
                print("Error:", resp.text)
    except Exception as e:
        print("EXCEPTION:", type(e), e)

asyncio.run(main())
