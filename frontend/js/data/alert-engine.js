import { state } from '../core/index.js';
import { parseGeoString, haversineMeters, matchSegmentCodes } from '../utils/index.js';
import {
    DUR_MIN_OK, DUR_MAX_OK, DIST_APERT_MAX,
    DUR_MIN_EHM, DUR_MIN_ESCA,
    CEDULA_MIN_LEN, CEDULA_MAX_LEN,
    INGRESO_MIN, INGRESO_MAX,
} from '../core/index.js';

export function runAlertEngine(params) {
    const { r, normalized, durMin, totalPers, distance_m, dist_ini_fin, actualSeg, ptIni, isCompletada, hogaresRaw } = params;
    const alertas = [];

    // 0. Incorporar alertas pre-calculadas por el Backend (DRY)
    if (r._backend_meta && r._backend_meta.flags) {
        const bf = r._backend_meta.flags;
        if (bf.distance_gt_500m) alertas.push('FUERA_SEGMENTO');
        if (bf.short_duration) alertas.push('TIEMPO_CORTO');
        if (bf.hogar_count_mismatch) alertas.push('HOGARES_INCONSISTENTES');
        if (bf.integrantes_mismatch) alertas.push('INTEGRANTES_INCONSISTENTES');
    }

    // 1. Apertura muy lejos
    try {
        const sgeo = r['start-geopoint'] || r['start_geopoint'];
        const startPt = parseGeoString(sgeo) || (r['_geolocation']?.length >= 2 ? [r['_geolocation'][0], r['_geolocation'][1]] : null);
        if (startPt && ptIni && ptIni[0]) {
            const d = haversineMeters(startPt[0], startPt[1], ptIni[0], ptIni[1]);
            if (d > DIST_APERT_MAX) alertas.push('APERT_LEJOS');
        }
    } catch (_) {}

    // 2. Cobertura del segmento
    if (distance_m !== null && distance_m > 600) alertas.push('FUERA_SEGMENTO');
    if (dist_ini_fin !== null && dist_ini_fin > 30) alertas.push('DESPLAZAMIENTO_ANOMALO');

    // 3. Velocidad / Duración
    if (isCompletada && durMin !== null) {
        if (normalized.formType === 'EHM' && totalPers === 1 && durMin < DUR_MIN_EHM) {
            alertas.push('TIEMPO_CORTO_EHM');
        } else if (normalized.formType !== 'EHM' && durMin < DUR_MIN_ESCA) {
            alertas.push('TIEMPO_CORTO_ESCA');
        } else if (durMin < DUR_MIN_OK) {
            alertas.push('TIEMPO_CORTO');
        }
    }
    if (isCompletada && durMin !== null && durMin > DUR_MAX_OK) alertas.push('TIEMPO_LARGO');

    // 4. Cédula
    const cedulaStr = normalized.cedula.replace(/\D/g, '');
    if (cedulaStr.length < CEDULA_MIN_LEN || cedulaStr.length > CEDULA_MAX_LEN) alertas.push('CEDULA_INVALIDA');

    // 5. Ingresos (Solo ESCA por ahora)
    hogaresRaw.forEach(h => {
        const ints = Array.isArray(h['datos_hogar/hogar/integrantes_hogar']) ? h['datos_hogar/hogar/integrantes_hogar'] : [];
        ints.forEach(miembro => {
            const rawIngreso = miembro['datos_hogar/hogar/integrantes_hogar/integrantes/cuanto_actividad'];
            if (rawIngreso !== undefined && rawIngreso !== null && rawIngreso !== '') {
                const ing = Number(rawIngreso);
                if (!isNaN(ing) && (ing < INGRESO_MIN || ing > INGRESO_MAX)) {
                    if (!alertas.includes('INGRESO_ANOMALO')) alertas.push('INGRESO_ANOMALO');
                }
            }
        });
    });

    // 6. Arranque
    hogaresRaw.forEach(h => {
        const arranque = h['datos_hogar/hogar/productos_22/arranque'] || '';
        const productos = h['datos_hogar/hogar/productos_22/productos'];
        const tieneProd = Array.isArray(productos) && productos.length > 0;
        if (isCompletada && tieneProd && !arranque) {
            if (!alertas.includes('ARRANQUE_INCONSISTENTE')) alertas.push('ARRANQUE_INCONSISTENTE');
        }
    });

    // 7. Validación de Segmento
    const declaredCode = (normalized.segmento === '000' || normalized.segmento === '0') ? normalized.sector : normalized.segmento;
    if (actualSeg && !matchSegmentCodes(declaredCode, actualSeg)) {
        alertas.push('SEGMENTO_INCORRECTO');
    } else if (!actualSeg && normalized.lat !== null) {
        alertas.push('SEGMENTO_INCORRECTO');
    }

    return alertas;
}
