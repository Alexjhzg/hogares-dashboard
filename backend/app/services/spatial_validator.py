import json
import logging
from pathlib import Path
from shapely.geometry import shape, Point
from shapely.strtree import STRtree

logger = logging.getLogger(__name__)

class SpatialValidator:
    """
    Servicio Singleton para validaciones geoespaciales avanzadas.
    Carga los polígonos de segmentos y puntos de control en memoria para
    búsquedas ultrarrápidas mediante STRtree.
    """
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super(SpatialValidator, cls).__new__(cls)
        return cls._instance

    def __init__(self):
        if hasattr(self, 'initialized') and self.initialized:
            return
        
        self.segments_data = []
        self.segments_tree = None
        self.controls_index = {} # (control, serie, linea) -> Point
        self.initialized = False

    def load_data(self, data_dir: str):
        """Carga y procesa los archivos GeoJSON."""
        try:
            data_path = Path(data_dir)
            
            # 1. Cargar Segmentos (Archivo original sin simplificar)
            segments_file = data_path / 'segmentos_monagas.geojson'
            if segments_file.exists():
                logger.info(f"[SpatialValidator] Cargando segmentos desde {segments_file}...")
                with open(segments_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    features = data.get('features', [])
                    
                    geoms = []
                    self.segments_data = []
                    for f in features:
                        try:
                            geom = shape(f['geometry'])
                            geoms.append(geom)
                            self.segments_data.append(f['properties'])
                        except Exception as e:
                            logger.error(f"Error procesando geometría de segmento: {e}")
                    
                    if geoms:
                        self.segments_tree = STRtree(geoms)
                        logger.info(f"[SpatialValidator] {len(geoms)} segmentos indexados.")
            
            # 2. Cargar Controles (Viviendas)
            controls_file = data_path / 'CONTROLES.geojson'
            if controls_file.exists():
                logger.info(f"[SpatialValidator] Cargando controles desde {controls_file}...")
                with open(controls_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    for f in data.get('features', []):
                        p = f['properties']
                        coords = f['geometry']['coordinates'] # [lng, lat]
                        
                        # Generar clave compuesta
                        ctrl = str(p.get('CONTROL', '')).strip()
                        serie = str(p.get('SERIE', '')).strip()
                        linea = str(p.get('LINEA', '')).strip()
                        key = f"{ctrl}-{serie}-{linea}"
                        
                        self.controls_index[key] = {
                            "point": Point(coords[0], coords[1]),
                            "properties": p
                        }
                logger.info(f"[SpatialValidator] {len(self.controls_index)} puntos de control indexados.")

            self.initialized = True
        except Exception as e:
            logger.error(f"[SpatialValidator] Error crítico cargando datos: {e}")

    def find_segment(self, lat: float, lon: float):
        """Encuentra el segmento que contiene un punto (lat, lon)."""
        if not self.segments_tree or lat is None or lon is None:
            return None
        
        point = Point(lon, lat)
        # nearest() devuelve el índice de la geometría más cercana
        # Pero queremos saber si está DENTRO.
        # Primero buscamos candidatos cercanos para optimizar.
        indices = self.segments_tree.query(point, predicate='contains')
        if indices.size > 0:
            # Si cae en varios (overlap), devolvemos el primero
            return self.segments_data[indices[0]]
        
        return None

    def get_control_point(self, control: str, serie: str, linea: str):
        """Obtiene la ubicación teórica de un control."""
        key = f"{str(control).strip()}-{str(serie).strip()}-{str(linea).strip()}"
        return self.controls_index.get(key)

    def calculate_distance_to_control(self, lat: float, lon: float, control_info: dict):
        """Calcula distancia en metros a un punto de control."""
        if not control_info or lat is None or lon is None:
            return None
        
        survey_pt = Point(lon, lat)
        control_pt = control_info["point"]
        
        # Shapely distance es en grados para 4326. 
        # Para metros usamos una aproximación simple o haversine
        from app.utils.geo import haversine_meters
        return haversine_meters((lat, lon), (control_pt.y, control_pt.x))

spatial_validator = SpatialValidator()
