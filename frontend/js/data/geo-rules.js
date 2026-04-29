import { state } from '../core/index.js';
import { parseGeoString, haversineMeters, isPointInPolygon, matchSegmentCodes } from '../utils/index.js';

export function getCoordinates(r) {
    const ptFin = parseGeoString(r['ubicacion_final/ubicacion_f'] || r['ubicacion_f']);
    const ptIni = parseGeoString(r['group_sh53u78/ubicacion_i'] || r['ubicacion_i']);
    
    let lat = null, lng = null;
    if (ptIni && ptIni[0]) { lat = ptIni[0]; lng = ptIni[1]; }
    else if (ptFin && ptFin[0]) { lat = ptFin[0]; lng = ptFin[1]; }
    else if (r['_geolocation'] && r['_geolocation'].length >= 2) {
        lat = r['_geolocation'][0]; lng = r['_geolocation'][1];
    } else if (r['S1/ubicacion']) {
        const parts = r['S1/ubicacion'].split(' ');
        if (parts.length >= 2) { lat = parseFloat(parts[0]); lng = parseFloat(parts[1]); }
    }
    
    return { lat, lng, ptIni, ptFin };
}

export function calculateDistances(r, ptIni, ptFin) {
    let distance_m = null, dist_ini_fin = null;
    try {
        const sgeo = r['start-geopoint'] || r['start_geopoint'];
        const egeo = r['group_sh53u78/ubicacion_i'] || r['end-geopoint'] || r['end_geopoint'];
        const startPt = parseGeoString(sgeo) || (r['_geolocation']?.length >= 2 ? [r['_geolocation'][0], r['_geolocation'][1]] : null);
        const endPt   = parseGeoString(egeo) || (r['_geolocation']?.length >= 2 ? [r['_geolocation'][0], r['_geolocation'][1]] : null);
        
        if (startPt && endPt) distance_m = haversineMeters(startPt[0], startPt[1], endPt[0], endPt[1]);
        if (ptIni && ptFin && ptIni[0] && ptFin[0]) dist_ini_fin = haversineMeters(ptIni[0], ptIni[1], ptFin[0], ptFin[1]);
    } catch (_) { }
    
    return { distance_m, dist_ini_fin };
}

export function validateSegment(lat, lng, declaredCode) {
    if (lat === null || lng === null || state.segmentBBoxes.length === 0) return null;

    let actualSeg = null;

    // 1. Fast search via BBOX
    for (const item of state.segmentBBoxes) {
        const b = item.bbox;
        if (lat >= b.minLat && lat <= b.maxLat && lng >= b.minLng && lng <= b.maxLng) {
            // 2. Precise PIP check
            const geom = item.feature.geometry;
            let found = false;
            
            if (geom.type === 'Polygon') {
                if (isPointInPolygon([lat, lng], geom.coordinates[0])) found = true;
            } else if (geom.type === 'MultiPolygon') {
                for (const poly of geom.coordinates) {
                    if (isPointInPolygon([lat, lng], poly[0])) { found = true; break; }
                }
            }
            
            if (found) {
                actualSeg = (item.props.cod_seg === '000' || item.props.cod_seg === '0') 
                            ? item.props.cod_sc 
                            : item.props.cod_seg;
                break;
            }
        }
    }

    // 3. Optional tolerance check if not found
    if (!actualSeg) {
        const EPS = 0.0015; // ~165m tolerance
        for (const item of state.segmentBBoxes) {
            const isRuralFeature = item.props.cod_seg === '000' || item.props.cod_seg === '0';
            const featureCode = isRuralFeature ? item.props.cod_sc : item.props.cod_seg;

            if (matchSegmentCodes(declaredCode, featureCode)) {
                const b = item.bbox;
                if (lat >= b.minLat - EPS && lat <= b.maxLat + EPS &&
                    lng >= b.minLng - EPS && lng <= b.maxLng + EPS) {
                    return featureCode; // Matches declared near enough
                }
            }
        }
    }

    return actualSeg;
}
