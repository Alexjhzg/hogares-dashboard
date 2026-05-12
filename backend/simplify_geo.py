import json
import logging
from pathlib import Path
from shapely.geometry import shape, mapping

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def simplify_geojson():
    base_dir = Path('/home/seem/Documentos/_proyectos/api-kobo-encuesta-ampliada/frontend/public/data')
    input_file = base_dir / 'segmentos_monagas.geojson'
    output_file = base_dir / 'segmentos_monagas_light.geojson'

    logger.info(f"Loading {input_file}...")
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    logger.info(f"Simplifying {len(data.get('features', []))} features...")
    
    # 0.00002 degrees is approx 2 meters tolerance
    # Usamos un valor mucho más pequeño para evitar que se distorsionen los bordes compartidos
    tolerance = 0.00002 

    new_features = []
    for feature in data.get('features', []):
        try:
            geom = shape(feature['geometry'])
            simplified_geom = geom.simplify(tolerance, preserve_topology=True)
            feature['geometry'] = mapping(simplified_geom)
            new_features.append(feature)
        except Exception as e:
            logger.error(f"Error simplifying feature: {e}")
            new_features.append(feature) # fallback to original

    data['features'] = new_features

    logger.info(f"Writing to {output_file}...")
    with open(output_file, 'w', encoding='utf-8') as f:
        # Use compact JSON representation
        json.dump(data, f, separators=(',', ':'))

    import os
    original_size = os.path.getsize(input_file) / (1024*1024)
    new_size = os.path.getsize(output_file) / (1024*1024)
    logger.info(f"Original size: {original_size:.2f} MB")
    logger.info(f"New size: {new_size:.2f} MB")
    logger.info("Done!")

if __name__ == '__main__':
    simplify_geojson()
