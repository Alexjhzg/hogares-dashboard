import asyncio
import httpx
import os
import sys
import json

# Add backend to path
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "..", "..", "backend"))
from app.core.config import settings

# Create downloads folder
dest_dir = os.path.join(os.path.dirname(__file__), "..", "..", "..", "downloads")
os.makedirs(dest_dir, exist_ok=True)

async def download_raw_kobo(client, asset_uid, filename):
    print(f"Downloading RAW Kobo data for {asset_uid}...")
    url = f"{settings.KOBO_BASE_URL}/assets/{asset_uid}/data/?format=json&page_size=1000"
    
    # Let's handle pagination in case it has multiple pages
    results = []
    page = 1
    while url:
        print(f"  Fetching page {page}...")
        resp = await client.get(url, headers=settings.AUTH_HEADERS)
        if resp.status_code != 200:
            print(f"  Error fetching page {page}: {resp.status_code} - {resp.text}")
            break
        payload = resp.json()
        results.extend(payload.get("results", []))
        url = payload.get("next")
        page += 1

    filepath = os.path.join(dest_dir, filename)
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump({"count": len(results), "results": results}, f, indent=2, ensure_ascii=False)
    print(f"Saved RAW to {filepath} ({len(results)} records)")

async def download_normalized_api(client, asset_uid, filename):
    print(f"Downloading NORMALIZED data for {asset_uid} from local API...")
    url = f"http://localhost:8000/api/data/{asset_uid}"
    try:
        resp = await client.get(url, timeout=120.0)
        if resp.status_code == 200:
            filepath = os.path.join(dest_dir, filename)
            with open(filepath, "w", encoding="utf-8") as f:
                json.dump(resp.json(), f, indent=2, ensure_ascii=False)
            print(f"Saved NORMALIZED to {filepath}")
        else:
            print(f"  API Error: {resp.status_code} - {resp.text}")
    except Exception as e:
        print(f"  Connection to local API failed: {e}")

async def main():
    async with httpx.AsyncClient(timeout=60.0, verify=False) as client:
        # V3 UIDs
        ehm_uid = "aZ6qCkgxXpzM6ZYeJRtWhF"
        esca_uid = "auMu4FkPUu9kUkqoDi9qQJ"

        # 1. Download EHM V3
        await download_raw_kobo(client, ehm_uid, "ehm_ampliada_v3_raw.json")
        await download_normalized_api(client, ehm_uid, "ehm_ampliada_v3_normalized.json")

        # 2. Download ESCA V3
        await download_raw_kobo(client, esca_uid, "esca_ampliada_v3_raw.json")
        await download_normalized_api(client, esca_uid, "esca_ampliada_v3_normalized.json")

if __name__ == "__main__":
    asyncio.run(main())
