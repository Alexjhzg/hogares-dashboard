// ─── Data Processing ─────────────────────────────────────────────────────────
// Transforms raw Kobo records into the enriched _meta objects used by all
// rendering modules. Also builds the encMap aggregate.

import { state } from './state.js';
import { avg, parseGeoString, haversineMeters, isPointInPolygon } from './helpers.js';
import { DUR_MIN_OK, DUR_MAX_OK, DIST_APERT_MAX } from './config.js';

/**
 * Process state.rawData in-place, enriching each record with a _meta object
 * and rebuilding state.encMap.
 */
export function processData() {
    state.encMap = {};

    state.rawData.forEach(r => {
        const cedula  = (r['S0/cedula_encuestador'] || 'N/A').trim();
        const nombre  = (r['S0/s0_nombreapellido'] || 'Desconocido').trim();
        const start   = r['start'] || '';
        const end     = r['end'] || '';
        const fecha   = (r['today'] || r['_submission_time'] || '').slice(0, 10);
        const nota    = r['ubicacion_final/nota'] || '';
        const condicion = r['Condici_n_de_ocupaci_n/condicion_de_ocupacion'] || 'N/A';
        const mun     = r['S1/mun'] || 'N/A';
        const par     = r['S1/par'] || 'N/A';
        const nodo    = r['S1/nodo'] || 'N/A';
        const semana  = r['group_sh53u78/semana'] || '';
        const uso     = r['S1/Uso_de_la_Unidad_inmobiliaria'] || 'N/A';
        const control = r['group_sh53u78/control'] || r['_uuid'] || '';
        const situacion_vivienda = r['Condici_n_de_ocupaci_n/situacion_vivienda'] || '';

        // Census tracking fields
        const segmento   = r['S1/segmento'] || r['S1/group_segmeto_sector/segmento'] || r['group_segmeto_sector/segmento'] || '';
        const sector     = r['S1/sector']   || r['S1/group_segmeto_sector/sector']   || r['group_segmeto_sector/sector']   || '';
        const manzana    = r['S1/manzana']  || '';
        const parcela    = r['S1/parcela']  || '';
        const edificacion = r['S1/Edificaci_n'] || r['S1/edificacion'] || '';
        const lado_manz  = r['S1/lado_manz'] || '';
        const n_linea    = r['group_sh53u78/n_linea'] || '';
        const n_serie    = r['group_sh53u78/n_serie'] || '';
        const direccion  = r['S1/P_nomsect'] || r['S1/direccion'] || '';

        // Duration in minutes
        let durMin = null;
        if (start && end) {
            try {
                const s = new Date(start), e = new Date(end);
                durMin = Math.round((e - s) / 60000 * 10) / 10;
                if (durMin < 0 || durMin > 600) durMin = null;
            } catch (_) { }
        }

        // Households & persons
        const hogares = Array.isArray(r['datos_hogar/hogar']) ? r['datos_hogar/hogar'] : [];
        let totalPers = 0;
        hogares.forEach(h => {
            const ints = Array.isArray(h['datos_hogar/hogar/integrantes_hogar'])
                ? h['datos_hogar/hogar/integrantes_hogar'] : [];
            totalPers += ints.length;
        });

        // Hour for productivity chart
        let hora = null;
        if (start) { try { hora = new Date(start).getHours(); } catch (_) { } }

        // GPS Coords (Priority: Final > Initial > System _geolocation)
        let lat = null, lng = null;
        const ptFin = parseGeoString(r['ubicacion_final/ubicacion_f'] || r['ubicacion_f']);
        const ptIni = parseGeoString(r['group_sh53u78/ubicacion_i'] || r['ubicacion_i']);

        if (ptFin && ptFin[0] && ptFin[1]) { lat = ptFin[0]; lng = ptFin[1]; }
        else if (ptIni && ptIni[0] && ptIni[1]) { lat = ptIni[0]; lng = ptIni[1]; }
        else if (r['_geolocation'] && r['_geolocation'].length >= 2) {
            lat = r['_geolocation'][0]; lng = r['_geolocation'][1];
        } else if (r['S1/ubicacion']) {
            const parts = r['S1/ubicacion'].split(' ');
            if (parts.length >= 2) { lat = parseFloat(parts[0]); lng = parseFloat(parts[1]); }
        }

        // Distances
        let distance_m = null, dist_ini_fin = null;
        try {
            const sgeo = r['start-geopoint'] || r['start_geopoint'];
            const egeo = r['group_sh53u78/ubicacion_i'] || r['end-geopoint'] || r['end_geopoint'];
            const startPt = parseGeoString(sgeo) || (r['_geolocation']?.length >= 2 ? [r['_geolocation'][0], r['_geolocation'][1]] : null);
            const endPt   = parseGeoString(egeo) || (r['_geolocation']?.length >= 2 ? [r['_geolocation'][0], r['_geolocation'][1]] : null);
            if (startPt && endPt) distance_m = haversineMeters(startPt[0], startPt[1], endPt[0], endPt[1]);
            if (ptIni && ptFin && ptIni[0] && ptFin[0]) dist_ini_fin = haversineMeters(ptIni[0], ptIni[1], ptFin[0], ptFin[1]);
        } catch (_) { }

        const flag_short_duration  = false; // kept for legacy compat — use alertas[]
        const flag_distance_gt_500  = false; // kept for legacy compat — use alertas[]

        // ── Structured Alert Engine ───────────────────────────────────────────
        /** @type {string[]} Alert codes — see ALERT_RULES in config.js */
        const alertas = [];

        // Alerta 1: Apertura muy lejos del Inicio de encuesta
        try {
            const sgeo     = r['start-geopoint'] || r['start_geopoint'];
            const startPt  = parseGeoString(sgeo) ||
                             (r['_geolocation']?.length >= 2
                                ? [r['_geolocation'][0], r['_geolocation'][1]]
                                : null);
            if (startPt && ptIni && ptIni[0]) {
                const d = haversineMeters(startPt[0], startPt[1], ptIni[0], ptIni[1]);
                if (d > DIST_APERT_MAX) alertas.push('APERT_LEJOS');
            }
        } catch (_) {}

        // Alerta 2: Fuera del radio de cobertura del segmento
        if (distance_m !== null && distance_m > 600) alertas.push('FUERA_SEGMENTO');

        // Alerta 3: Velocidad sospechosa — tiempo corto (solo para efectivas)
        const isCompletada = /totalment/i.test(nota);
        if (isCompletada && durMin !== null && durMin < DUR_MIN_OK) alertas.push('TIEMPO_CORTO');

        // Alerta 4: Velocidad sospechosa — tiempo largo (solo para efectivas)
        if (isCompletada && durMin !== null && durMin > DUR_MAX_OK) alertas.push('TIEMPO_LARGO');

        // Alerta 5: Validación de Segmento Geográfico
        if (lat !== null && lng !== null && state.segmentBBoxes.length > 0) {
            let actualSeg = null;

            // 1. Quick search via BBOX
            for (const item of state.segmentBBoxes) {
                const b = item.bbox;
                if (lat >= b.minLat && lat <= b.maxLat && lng >= b.minLng && lng <= b.maxLng) {
                    // 2. Precise search (PIP)
                    const feature = state.geoJSONData.features.find(f => f.properties.cod_seg === item.props.cod_seg && f.properties.cod_munici === item.props.cod_munici);
                    if (feature) {
                        const coords = feature.geometry.type === 'Polygon' 
                            ? feature.geometry.coordinates 
                            : feature.geometry.coordinates[0]; 
                        
                        if (isPointInPolygon([lat, lng], coords[0])) {
                            actualSeg = item.props.cod_seg;
                            break;
                        }
                    }
                }
            }

            if (actualSeg) {
                const declared = String(segmento).trim().padStart(3, '0');
                const real = String(actualSeg).trim().padStart(3, '0');
                if (declared !== real) {
                    alertas.push('SEGMENTO_INCORRECTO');
                }
            } else {
                alertas.push('SEGMENTO_INCORRECTO');
            }
        }

        r._meta = {
            cedula, nombre, fecha, durMin, nota, condicion, mun, par, nodo, uso, semana,
            hogares: hogares.length, totalPers, control, hora, lat, lng,
            situacion_vivienda, segmento, sector, manzana, parcela, edificacion, lado_manz,
            n_linea, n_serie, direccion, dist_ini_fin, distance_m,
            estado: /totalment/i.test(nota) ? 'completada' : 'no_respuesta',
            // Legacy flags (kept for backwards compat)
            flag_distance_gt_500: distance_m !== null && distance_m > 500,
            flag_short_duration:  durMin     !== null && durMin      < DUR_MIN_OK,
            // Structured alert system
            alertas,
            hasAlerts: alertas.length > 0,
        };

        // Aggregate
        if (!state.encMap[cedula]) {
            state.encMap[cedula] = {
                cedula, nombre, encuestas: 0, completadas: 0,
                duraciones: [], personas: 0, municipios: new Set(), condiciones: {},
            };
        }
        const m = state.encMap[cedula];
        m.encuestas++;
        if (/totalment/i.test(nota)) m.completadas++;
        if (durMin !== null) m.duraciones.push(durMin);
        m.personas += totalPers;
        m.municipios.add(mun);
        m.condiciones[condicion] = (m.condiciones[condicion] || 0) + 1;
    });

    Object.values(state.encMap).forEach(m => {
        m.avgDur      = m.duraciones.length ? avg(m.duraciones) : null;
        m.pctCompleta = m.encuestas ? Math.round(m.completadas / m.encuestas * 100) : 0;
        m.score       = calcScore(m);
    });
}

export function calcScore(m) {
    const maxEnc   = Math.max(...Object.values(state.encMap).map(x => x.encuestas), 1);
    const volScore = m.encuestas / maxEnc * 100;
    const effScore = m.avgDur != null ? Math.max(0, 100 - Math.abs(m.avgDur - 40) * 2) : 50;
    return Math.round(m.pctCompleta * 0.4 + volScore * 0.3 + effScore * 0.3);
}
