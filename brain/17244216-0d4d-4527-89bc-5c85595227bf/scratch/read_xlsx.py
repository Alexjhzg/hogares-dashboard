import json
import os

def inspect_geojson_properties(geojson_path):
    with open(geojson_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    features = data.get('features', [])
    print(f"Total features: {len(features)}")
    
    # Group unique controls to see how many we have and what they look like
    unique_controls = set()
    samples = []
    
    for f in features:
        p = f.get('properties', {})
        ctrl = p.get('CONTROL')
        if ctrl not in unique_controls:
            unique_controls.add(ctrl)
            samples.append(p)
            
    print(f"Total unique CONTROL values: {len(unique_controls)}")
    print("Samples of unique control properties:")
    for s in sorted(samples, key=lambda x: str(x.get('CONTROL')))[:15]:
        print(f"  - CONTROL={s.get('CONTROL')} | SERIE={s.get('SERIE')} | LINEA={s.get('LINEA')} | COD_SEG={s.get('COD_SEG')} | COD_MANZA={s.get('COD_MANZA')}")

if __name__ == "__main__":
    geojson_path = "/home/seem/Documentos/_proyectos/api-kobo-encuesta-ampliada/frontend/public/data/CONTROLES.geojson"
    inspect_geojson_properties(geojson_path)
