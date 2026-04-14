// ─── Data Processing ─────────────────────────────────────────────────────────
// Transforms raw Kobo records into the enriched _meta objects used by all
// rendering modules. Also builds the encMap aggregate.

import { state } from './state.js?v=39';
import { avg, parseGeoString, haversineMeters, isPointInPolygon, matchSegmentCodes } from './helpers.js?v=39';
import {
    DUR_MIN_OK, DUR_MAX_OK, DIST_APERT_MAX,
    DUR_MIN_EHM, DUR_MIN_ESCA,
    CEDULA_MIN_LEN, CEDULA_MAX_LEN,
    INGRESO_MIN, INGRESO_MAX,
} from './config.js?v=39';

/** Build the GeoJSON lookup key from encuesta fields:
 *  - control: use last 4 digits (encuesta=8 chars, GeoJSON CONTROL=4 chars)
 *  - serie/linea: normalize to int-string (no leading zeros), matching GeoJSON format
 */
const _ctrlKey = (control, serie, linea) => {
    const ctrl4 = String(control || '').trim().slice(-4);
    const s     = String(parseInt(serie,  10) || 0);
    const l     = String(parseInt(linea,  10) || 0);
    return `${ctrl4}-${s}-${l}`;
};

/**
 * Process state.rawData in-place, enriching each record with a _meta object
 * and rebuilding state.encMap.
 */
export function processData() {
    state.encMap = {};

    state.rawData.forEach(r => {
        const cedula  = String(r['S0/cedula_encuestador'] || 'N/A').trim();
        const nombre  = String(r['S0/s0_nombreapellido'] || 'Desconocido').trim();
        const start   = r['start'] || '';
        let end       = r['end'] || '';
        
        const endForm = r['ubicacion_final/hora_fin'] || r['ubicacion_final/hora_f'] || r['hora_f'];
        if (endForm) {
            if (!endForm.includes('T') && start.includes('T')) {
                end = start.split('T')[0] + 'T' + endForm;
            } else {
                end = endForm;
            }
            r['end'] = end; // Mutate the raw property so maps and tooltips read the same explicit time
        }
        const fecha   = (r['today'] || r['_submission_time'] || '').slice(0, 10);
        const nota    = r['ubicacion_final/nota'] || '';
        const condicion = r['Condici_n_de_ocupaci_n/condicion_de_ocupacion'] || 'N/A';
        const mun     = r['S1/mun'] || 'N/A';
        const par     = r['S1/par'] || 'N/A';
        const nodo    = r['S1/nodo'] || 'N/A';
        const semana  = r['group_sh53u78/semana'] || '';
        const uso     = r['S1/Uso_de_la_Unidad_inmobiliaria'] || 'N/A';
        const control = r['group_sh53u78/control'] || r['_uuid'] || '';
        const lote    = r['group_sh53u78/lote'] || '';
        const formType = (() => {
            // Determinar tipo de formulario: 'ESCA' o 'EHM' según el nombre del asset
            // El nombre del asset se guarda en state.assetName cuando se carga.
            const name = (state.assetName || '').toUpperCase();
            if (name.includes('EHM')) return 'EHM';
            return 'ESCA'; // Default
        })();
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

        // Households & persons (Unified Logic for ESCA and EHM)
        let totalPers = 0;
        let hogares = [];
        let totalHombres = 0;
        let totalMujeres = 0;

        if (formType === 'EHM') {
            hogares = Array.isArray(r['lista_hogar']) ? r['lista_hogar'] : [];
            hogares.forEach(h => {
                const miembros = Array.isArray(h['lista_hogar/lista_miembros']) ? h['lista_hogar/lista_miembros'] : [];
                
                // Usar la cantidad real de registros si existen (para que coincida con la sumatoria de H+M)
                if (miembros.length > 0) {
                    totalPers += miembros.length;
                } else {
                    const count = parseInt(h['lista_hogar/personas_hogar'] || h['lista_hogar/lista_miembros_count'] || '0', 10);
                    if (!isNaN(count)) totalPers += count;
                }
                
                miembros.forEach(m => {
                    // Buscar variante dinámica de llave "sexo"
                    const sexoKey = Object.keys(m).find(k => k.endsWith('/sexo') || k.endsWith(':sexo') || k === 'sexo');
                    if (sexoKey) {
                        const sexo = String(m[sexoKey]).trim().toLowerCase();
                        if (['1', 'sexo1', 'v', 'm', 'masculino', 'hombre'].includes(sexo)) totalHombres++;
                        if (['2', 'sexo2', 'h', 'f', 'femenino', 'mujer'].includes(sexo)) totalMujeres++;
                    }
                });
            });
        } else {
            hogares = Array.isArray(r['datos_hogar/hogar']) ? r['datos_hogar/hogar'] : [];
            hogares.forEach(h => {
                const ints = Array.isArray(h['datos_hogar/hogar/integrantes_hogar'])
                    ? h['datos_hogar/hogar/integrantes_hogar'] : [];
                totalPers += ints.length;
                
                ints.forEach(m => {
                    const sexoKey = Object.keys(m).find(k => k.endsWith('/sexo') || k.endsWith(':sexo') || k === 'sexo');
                    if (sexoKey) {
                        const sexo = String(m[sexoKey]).trim().toLowerCase();
                        if (['1', 'sexo1', 'v', 'm', 'masculino', 'hombre'].includes(sexo)) totalHombres++;
                        if (['2', 'sexo2', 'h', 'f', 'femenino', 'mujer'].includes(sexo)) totalMujeres++;
                    }
                });
            });
        }

        // Hour for productivity chart
        let hora = null;
        if (start) { try { hora = new Date(start).getHours(); } catch (_) { } }

        // GPS Coords (Priority: Final > Initial > System _geolocation)
        let lat = null, lng = null;
        const ptFin = parseGeoString(r['ubicacion_final/ubicacion_f'] || r['ubicacion_f']);
        const ptIni = parseGeoString(r['group_sh53u78/ubicacion_i'] || r['ubicacion_i']);

        if (ptIni && ptIni[0] && ptIni[1]) { lat = ptIni[0]; lng = ptIni[1]; }
        else if (ptFin && ptFin[0] && ptFin[1]) { lat = ptFin[0]; lng = ptFin[1]; }
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

        // ── Validación de Cédula ──────────────────────────────────────────────
        const cedulaStr = cedula.replace(/\D/g, ''); // solo dígitos
        const cedulaValida = cedulaStr.length >= CEDULA_MIN_LEN && cedulaStr.length <= CEDULA_MAX_LEN;

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

        // Alerta 2.b: Desplazamiento anormal entre capturas
        if (dist_ini_fin !== null && dist_ini_fin > 30) alertas.push('DESPLAZAMIENTO_ANOMALO');

        // Alerta 3: Velocidad sospechosa — tiempo corto diferenciado por tipo
        const isCompletada = /totalment/i.test(nota);
        if (isCompletada && durMin !== null) {
            if (formType === 'EHM' && totalPers === 1 && durMin < DUR_MIN_EHM) {
                alertas.push('TIEMPO_CORTO_EHM');
            } else if (formType !== 'EHM' && durMin < DUR_MIN_ESCA) {
                alertas.push('TIEMPO_CORTO_ESCA');
            } else if (durMin < DUR_MIN_OK) {
                // Fallback genérico por retrocompatibilidad
                alertas.push('TIEMPO_CORTO');
            }
        }

        // Alerta 4: Velocidad sospechosa — tiempo largo (solo para efectivas)
        if (isCompletada && durMin !== null && durMin > DUR_MAX_OK) alertas.push('TIEMPO_LARGO');

        // Alerta 5b: Cédula del encuestador inválida
        if (!cedulaValida) alertas.push('CEDULA_INVALIDA');

        // Alerta 6: Ingresos anómalos — revisar integrantes de cada hogar
        hogares.forEach(h => {
            const ints = Array.isArray(h['datos_hogar/hogar/integrantes_hogar'])
                ? h['datos_hogar/hogar/integrantes_hogar'] : [];
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

        // Alerta 7: Arranque inconsistente — verificar que el código 'arranque' exista
        // y correlacione con el número de línea del control.
        // El campo arranque está en cada hogar: datos_hogar/hogar/productos_22/arranque
        // Si hay múltiples hogares, el arranque debería ser el mismo o correlacionar.
        hogares.forEach((h, idx) => {
            const arranque = h['datos_hogar/hogar/productos_22/arranque'] || '';
            // El arranque codifica el hogar inicial. Si está ausente en un registro
            // efectivo con productos, es una inconsistencia.
            const productos = h['datos_hogar/hogar/productos_22/productos'];
            const tieneProd = Array.isArray(productos) && productos.length > 0;
            if (isCompletada && tieneProd && !arranque) {
                if (!alertas.includes('ARRANQUE_INCONSISTENTE')) alertas.push('ARRANQUE_INCONSISTENTE');
            }
        });

        // Alerta 5: Validación de Segmento Geográfico
        let actualSeg = null;
        if (lat !== null && lng !== null && state.segmentBBoxes.length > 0) {

            // 1. Quick search via BBOX
            for (const item of state.segmentBBoxes) {
                const b = item.bbox;
                if (lat >= b.minLat && lat <= b.maxLat && lng >= b.minLng && lng <= b.maxLng) {
                    // 2. Precise search (PIP)
                    const geom = item.feature.geometry;
                    let found = false;
                    
                    if (geom.type === 'Polygon') {
                        // Revisar anillo exterior
                        if (isPointInPolygon([lat, lng], geom.coordinates[0])) {
                            found = true;
                        }
                    } else if (geom.type === 'MultiPolygon') {
                        // Revisar cada polígono individualmente
                        for (const poly of geom.coordinates) {
                            if (isPointInPolygon([lat, lng], poly[0])) {
                                found = true;
                                break;
                            }
                        }
                    }
                    
                    if (found) {
                        // Si es rural (000), el identificador real es cod_sc
                        actualSeg = (item.props.cod_seg === '000' || item.props.cod_seg === '0') 
                                    ? item.props.cod_sc 
                                    : item.props.cod_seg;
                        break;
                    }
                }
            }

            const declaredCode = (segmento === '000' || segmento === '0') ? sector : segmento;

            if (actualSeg) {
                if (!matchSegmentCodes(declaredCode, actualSeg)) {
                    alertas.push('SEGMENTO_INCORRECTO');
                }
            } else {
                // Si no caemos en ningún polígono, revisamos si estamos "muy cerca" 
                // del segmento/sector declarado (tolerancia de ~150m para datum shift)
                let foundNear = false;
                const EPS = 0.0015; // ~165 metros de tolerancia
                
                for (const item of state.segmentBBoxes) {
                    // Si el declarado es rural, comparamos contra cod_sc; si es urbano, contra cod_seg
                    const isRuralFeature = item.props.cod_seg === '000' || item.props.cod_seg === '0';
                    const featureCode = isRuralFeature ? item.props.cod_sc : item.props.cod_seg;

                    if (matchSegmentCodes(declaredCode, featureCode)) {
                        const b = item.bbox;
                        if (lat >= b.minLat - EPS && lat <= b.maxLat + EPS &&
                            lng >= b.minLng - EPS && lng <= b.maxLng + EPS) {
                            foundNear = true;
                            break;
                        }
                    }
                }
                
                if (!foundNear) {
                    alertas.push('SEGMENTO_INCORRECTO');
                }
            }
        }

        r._meta = {
            cedula, nombre, fecha, durMin, nota, condicion, mun, par, nodo, uso, semana,
            hogares: hogares.length, totalPers, totalHombres, totalMujeres, control, lote, hora, lat, lng,
            situacion_vivienda, segmento, sector, manzana, parcela, edificacion, lado_manz,
            n_linea, n_serie, direccion, dist_ini_fin, distance_m,
            actual_seg: actualSeg,
            estado: isCompletada ? 'completada' : 'no_respuesta',
            formType,
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
                // Resumen semanal: semana → Set<controlId>
                semanas: {},
            };
        }
        const m = state.encMap[cedula];
        m.encuestas++;
        if (isCompletada) m.completadas++;
        if (durMin !== null) m.duraciones.push(durMin);
        m.personas += totalPers;
        m.municipios.add(mun);
        m.condiciones[condicion] = (m.condiciones[condicion] || 0) + 1;
        // Resumen semanal: acumular controles únicos por semana
        if (semana) {
            if (!m.semanas[semana]) m.semanas[semana] = new Set();
            if (control) m.semanas[semana].add(control);
        }
    });

    Object.values(state.encMap).forEach(m => {
        m.encuestas    = Number(m.encuestas) || 0;
        m.completadas  = Number(m.completadas) || 0;
        m.personas     = Number(m.personas) || 0;
        m.avgDur      = m.duraciones.length ? avg(m.duraciones) : 0;
        m.pctCompleta = m.encuestas > 0 ? Math.round(m.completadas / m.encuestas * 100) : 0;
        m.score       = calcScore(m) || 0;
        // Calcular promedio de controles por semana
        const semanasArr = Object.values(m.semanas || {});
        m.avgControlesSemana = semanasArr.length
            ? Math.round(semanasArr.reduce((s, set) => s + set.size, 0) / semanasArr.length)
            : 0;
        m.totalSemanas = semanasArr.length;
    });

    // Segunda pasada: validación cruzada de Línea/Serie por control
    _checkLineaSerie();
}

/**
 * Segunda pasada post-procesamiento.
 * Valida que la combinación reportada (control, n_serie, n_linea) exista
 * en el catálogo oficial de cartografía (CONTROLES.geojson).
 * Se permiten duplicados (varios hogares en una vivienda).
 * @private
 */
function _checkLineaSerie() {
    const hasIndex = state.controlsIndex instanceof Map && state.controlsIndex.size > 0;
    if (!hasIndex) return; // Esperar a que el índice cargue

    state.rawData.forEach(r => {
        if (!r._meta) return;
        const c = r._meta.control ? r._meta.control.slice(-4) : '';
        const s = String(parseInt(r._meta.n_serie, 10) || 0);
        const l = String(parseInt(r._meta.n_linea, 10) || 0);
        
        const isCtrlValid  = state.validControls.has(c);
        const isSerieValid = state.validSeries.has(s);
        const isLineaValid = state.validLineas.has(l);

        // Guardar estado para el modal
        r._meta._ls_ctrl_ok  = isCtrlValid;
        r._meta._ls_serie_ok = isSerieValid;
        r._meta._ls_linea_ok = isLineaValid;

        if (!isCtrlValid || !isSerieValid || !isLineaValid) {
            if (!r._meta.alertas.includes('LINEA_SERIE_INVALIDA')) {
                r._meta.alertas.push('LINEA_SERIE_INVALIDA');
                r._meta.hasAlerts = true;
            }
            
            const reasons = [];
            if (!isCtrlValid)  reasons.push('Control');
            if (!isSerieValid) reasons.push('Serie');
            if (!isLineaValid) reasons.push('Línea');
            
            r._meta._ls_fail_reason  = 'independiente';
            r._meta._ls_key_reported = `${reasons.join(', ')} no definido(s) en base de datos`;
        }
    });
}

export function calcScore(m) {
    // Solo tomamos en cuenta la efectividad (completadas vs total)
    return m.pctCompleta;
}
