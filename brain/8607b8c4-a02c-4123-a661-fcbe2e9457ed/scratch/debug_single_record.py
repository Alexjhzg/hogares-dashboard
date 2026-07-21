import urllib.request
import json

url = "http://localhost:8000/api/data/auMu4FkPUu9kUkqoDi9qQJ"
print("Fetching from", url)
try:
    with urllib.request.urlopen(url, timeout=120) as response:
        data = json.loads(response.read().decode('utf-8'))
        results = data.get("results", [])
        
        target_uuid = "ad907617-5f56-4376-b57e-9b4c2f6818a2"
        found = None
        for r in results:
            if r.get("_uuid") == target_uuid:
                found = r
                break
                
        if found:
            print("Found normalized record:")
            print(json.dumps(found, indent=2))
        else:
            print(f"Record with UUID {target_uuid} not found in normalized API output.")
except Exception as e:
    print("Error:", e)
