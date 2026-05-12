import json
import logging
from pathlib import Path
from shapely.geometry import shape, Point
from shapely.strtree import STRtree
import math

logger = logging.getLogger(__name__)

def haversine_meters(lat1, lon1, lat2, lon2):
    R = 6371000
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lon2 - lon1)
    a = math.sin(delta_phi / 2.0) ** 2 + \
        math.cos(phi1) * math.cos(phi2) * \
        math.sin(delta_lambda / 2.0) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c

class GeoEngine:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super(GeoEngine, cls).__new__(cls, *args, **kwargs)
            cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        if self._initialized:
            return

        self._initialized = True
        self.segments_tree = None
        self.segments_geometries = []
        self.segments_properties = []
        
        # We may not need controls tree if we just match exactly or nearby, 
        # but let's load it just in case.
        self.controls_tree = None
        self.controls_geometries = []
        self.controls_properties = []

        self._load_data()

    def _load_data(self):
        try:
            base_dir = Path(__file__).resolve().parent.parent.parent.parent / 'frontend' / 'public' / 'data'
            segments_path = base_dir / 'segmentos_monagas.geojson'
            controls_path = base_dir / 'CONTROLES.geojson'

            if segments_path.exists():
                logger.info("Loading Segmentos GeoJSON into Shapely...")
                with open(segments_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    for feature in data.get('features', []):
                        geom = shape(feature['geometry'])
                        self.segments_geometries.append(geom)
                        self.segments_properties.append(feature['properties'])
                self.segments_tree = STRtree(self.segments_geometries)
                logger.info(f"Loaded {len(self.segments_geometries)} segments.")

            if controls_path.exists():
                logger.info("Loading Controles GeoJSON into Shapely...")
                with open(controls_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    for feature in data.get('features', []):
                        geom = shape(feature['geometry'])
                        self.controls_geometries.append(geom)
                        self.controls_properties.append(feature['properties'])
                self.controls_tree = STRtree(self.controls_geometries)
                logger.info(f"Loaded {len(self.controls_geometries)} controls.")

        except Exception as e:
            logger.error(f"Error loading geospatial data: {e}")

    def enrich_survey(self, record: dict) -> dict:
        """
        Takes a raw Kobo record, extracts its location, and finds the intersecting segment.
        Injects a '_geo_meta' object into the record.
        """
        # Parse coordinates (similar to frontend getCoordinates)
        lat, lng = None, None
        pt_fin_str = record.get('ubicacion_final/ubicacion_f') or record.get('ubicacion_f')
        pt_ini_str = record.get('group_sh53u78/ubicacion_i') or record.get('ubicacion_i')
        
        def parse_geo(g_str):
            if not g_str: return None
            try:
                parts = str(g_str).strip().split()
                if len(parts) >= 2:
                    return float(parts[0]), float(parts[1])
            except:
                pass
            return None

        pt_ini = parse_geo(pt_ini_str)
        pt_fin = parse_geo(pt_fin_str)

        if pt_ini:
            lat, lng = pt_ini
        elif pt_fin:
            lat, lng = pt_fin
        elif '_geolocation' in record and isinstance(record['_geolocation'], list) and len(record['_geolocation']) >= 2:
            lat, lng = record['_geolocation'][0], record['_geolocation'][1]
        elif record.get('S1/ubicacion'):
            parts = str(record['S1/ubicacion']).strip().split()
            if len(parts) >= 2:
                try:
                    lat, lng = float(parts[0]), float(parts[1])
                except: pass

        geo_meta = {
            'actual_seg': None,
            'lat': None,
            'lng': None,
            'distance_m': None,
            'dist_ini_fin': None
        }
        
        # Ensure lat and lng are valid floats
        try:
            if lat is not None and str(lat).strip() != '':
                lat = float(lat)
            else:
                lat = None
            if lng is not None and str(lng).strip() != '':
                lng = float(lng)
            else:
                lng = None
            
            geo_meta['lat'] = lat
            geo_meta['lng'] = lng
        except ValueError:
            lat, lng = None, None

        # Calculate distances
        try:
            sgeo = record.get('start-geopoint') or record.get('start_geopoint')
            egeo = record.get('group_sh53u78/ubicacion_i') or record.get('end-geopoint') or record.get('end_geopoint')
            
            def get_geo_fallback():
                g = record.get('_geolocation')
                if g and len(g) >= 2:
                    try:
                        return [float(g[0]), float(g[1])]
                    except (ValueError, TypeError):
                        pass
                return None
                
            start_pt = parse_geo(sgeo) or get_geo_fallback()
            end_pt = parse_geo(egeo) or get_geo_fallback()

            if start_pt and end_pt and None not in start_pt and None not in end_pt:
                geo_meta['distance_m'] = haversine_meters(start_pt[0], start_pt[1], end_pt[0], end_pt[1])
            if pt_ini and pt_fin and None not in pt_ini and None not in pt_fin:
                geo_meta['dist_ini_fin'] = haversine_meters(pt_ini[0], pt_ini[1], pt_fin[0], pt_fin[1])
        except Exception as e:
            pass

        # Spatial Join: Find containing segment
        if lat is not None and lng is not None and self.segments_tree is not None:
            # Note: GeoJSON uses (lon, lat)
            point = Point(lng, lat)
            # Query tree
            # Using query() for STRtree in Shapely 2.0 returns indices
            indices = self.segments_tree.query(point)
            
            # Check actual intersection (bounding box may match without point being inside)
            found_prop = None
            for idx in indices:
                if self.segments_geometries[idx].contains(point):
                    found_prop = self.segments_properties[idx]
                    break
            
            if found_prop:
                cod_seg = found_prop.get('cod_seg')
                if cod_seg in ('000', '0'):
                    geo_meta['actual_seg'] = found_prop.get('cod_sc')
                else:
                    geo_meta['actual_seg'] = cod_seg
            else:
                # Tolerance check (buffer) equivalent to 165m ~ 0.0015 degrees
                # Shapely buffer is in the same units as coordinates (degrees).
                # 0.0015 deg is approx 165m
                buffer_geom = point.buffer(0.0015)
                buffer_indices = self.segments_tree.query(buffer_geom)
                for idx in buffer_indices:
                    if self.segments_geometries[idx].intersects(buffer_geom):
                        # We could implement a check here to match declaredCode if passed, 
                        # but just picking the first intersecting buffer is a good fallback.
                        prop = self.segments_properties[idx]
                        cod_seg = prop.get('cod_seg')
                        if cod_seg in ('000', '0'):
                            geo_meta['actual_seg'] = prop.get('cod_sc')
                        else:
                            geo_meta['actual_seg'] = cod_seg
                        break

        record['_geo_meta'] = geo_meta
        return record

geo_engine = GeoEngine()
