import { parseGeoString } from '../utils/index.js';

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


