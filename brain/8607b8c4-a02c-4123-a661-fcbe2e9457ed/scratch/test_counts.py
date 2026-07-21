import urllib.request
import json
import collections

url = "http://localhost:8000/api/data/auMu4FkPUu9kUkqoDi9qQJ"
print("Fetching from", url)
try:
    with urllib.request.urlopen(url, timeout=120) as response:
        data = json.loads(response.read().decode('utf-8'))
        results = data.get("results", [])
        print(f"Success! Fetched {len(results)} records.")
        
        counts = collections.Counter()
        for r in results:
            # Mirror the new normalizer.js prioritization logic:
            sit = r.get("Condici_n_de_ocupaci_n/vivienda_ocupada01") or r.get("Condici_n_de_ocupaci_n/situacion_vivienda")
            if sit:
                counts[sit] += 1
            else:
                counts["None"] += 1
                
        print("\nValue counts (prioritizing vivienda_ocupada01):")
        for k, v in counts.most_common():
            print(f"- {k}: {v}")
except Exception as e:
    print("Error:", e)
