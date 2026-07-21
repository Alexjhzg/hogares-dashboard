/**
 * ─── Data Processing (Refactorized) ──────────────────────────────────────────
 * Orchestrates the transformation of raw records into enriched _meta objects.
 */

import { state } from '../core/index.js';

// Sub-modules
import { normalizeRecord, calculateDuration } from './normalizer.js';
import { parseDemographics } from './survey-parsers.js';
import { getCoordinates } from './geo-rules.js';
import { runAlertEngine } from './alert-engine.js';
import { classifyHousingState, classifyHousingSubtype } from './housingClassifier.js';
import { getPlannedViviendasForControls } from './aggregators.js';

/**
 * Main entry point for data processing.
 * Runs the transformation pipeline for each record and then aggregates results.
 * Optimized to run in chunks to avoid blocking the main thread.
 */
export async function processData() {
    console.log('data/index.js: Processing data pipeline (Optimized)...');
    
    // Reset aggregation maps
    state.encMap = {};
    const hasControlIndex = state.controlsIndex instanceof Map && state.controlsIndex.size > 0;
    
    const CHUNK_SIZE = 500;
    const total = state.rawData.length;

    for (let i = 0; i < total; i += CHUNK_SIZE) {
        const end = Math.min(i + CHUNK_SIZE, total);
        
        for (let j = i; j < end; j++) {
            const r = state.rawData[j];
            
            // 1. Normalization (Frontend schema)
            const n = normalizeRecord(r);
            
            // Use backend duration if available
            const durMin = (r._backend_meta && r._backend_meta.duration_minutes !== undefined) 
                ? r._backend_meta.duration_minutes 
                : calculateDuration(n.start, n.end);

            // 2. Demographic Parsing (EHM/ESCA)
            const { totalPers, totalHombres, totalMujeres, hogaresCount, hogaresRaw } = parseDemographics(r, n.formType);

            // 3. Geographic Analytics (Backend Enriched)
            const { ptIni } = getCoordinates(r); // Kept for legacy alert engine compatibility
            const geoMeta = r._geo_meta || {};
            const lat = geoMeta.lat ?? null;
            const lng = geoMeta.lng ?? null;
            const distance_m = geoMeta.distance_m ?? null;
            const dist_ini_fin = geoMeta.dist_ini_fin ?? null;
            const actualSeg = geoMeta.actual_seg ?? null;

            // Count unipersonal households
            let hogaresUniPersonales = 0;
            if (Array.isArray(hogaresRaw)) {
                hogaresRaw.forEach(h => {
                    const members = Array.isArray(h['lista_hogar/lista_miembros']) 
                        ? h['lista_hogar/lista_miembros'] 
                        : (Array.isArray(h['datos_hogar/hogar/integrantes_hogar']) ? h['datos_hogar/hogar/integrantes_hogar'] : []);
                    
                    let count = members.length;
                    if (count === 0) {
                        const c = parseInt(h['lista_hogar/personas_hogar'] || h['lista_hogar/lista_miembros_count'] || '0', 10);
                        if (!isNaN(c)) count = c;
                    }
                    if (count === 1) hogaresUniPersonales++;
                });
            }

            // 4. Enrichment (_meta object)
            const situacionRaw = r['Condici_n_de_ocupaci_n/situacion_vivienda'] || null;
            const condicionRaw  = r['Condici_n_de_ocupaci_n/condicion_de_ocupacion'] || null;
            const tipoVivienda = classifyHousingState(n.situacion_vivienda || n.condicion);
            const subtipoVivienda = classifyHousingSubtype(situacionRaw, condicionRaw);
            const isCompletada = /totalment/i.test(n.nota) || tipoVivienda === 'TIPO E';
            
            r._meta = {
                ...n,
                durMin,
                totalPers, totalHombres, totalMujeres,
                hogares: hogaresCount,
                hogaresUniPersonales,
                lat, lng,
                distance_m, dist_ini_fin,
                actual_seg: actualSeg,
                estado: isCompletada ? 'completada' : 'no_efectiva',
                tipo_vivienda: tipoVivienda,
                subtipo_vivienda: subtipoVivienda,
                flag_distance_gt_500: distance_m !== null && distance_m > 500,
                flag_short_duration:  durMin     !== null && durMin      < 10, 
            };

            // 5. Alert Engine
            r._meta.alertas = runAlertEngine({
                r, normalized: n, durMin, totalPers, 
                distance_m, dist_ini_fin, actualSeg, ptIni, 
                isCompletada, hogaresRaw
            });
            r._meta.hasAlerts = r._meta.alertas.length > 0;

            // 6. Integrated Linea/Serie validation
            if (hasControlIndex) {
                const c = r._meta.control ? r._meta.control.slice(-4) : '';
                const s = String(parseInt(r._meta.n_serie, 10) || 0);
                const l = String(parseInt(r._meta.n_linea, 10) || 0);
                const comboKey = `${c}-${s}-${l}`;
                const isComboValid = state.controlsIndex.has(comboKey);
                const isCtrlValid  = state.validControls.has(c);

                r._meta._ls_ctrl_ok  = isCtrlValid;
                r._meta._ls_serie_ok = isComboValid;
                r._meta._ls_linea_ok = isComboValid;

                if (!isComboValid) {
                    if (!r._meta.alertas.includes('LINEA_SERIE_INVALIDA')) {
                        r._meta.alertas.push('LINEA_SERIE_INVALIDA');
                        r._meta.hasAlerts = true;
                    }
                }
            }

            // 7. Integrated Aggregation (Pass 1 of rebuildEncMap)
            const { cedula, nombre, estado, mun, condicion, semana, control, tipo_vivienda, alertas } = r._meta;
            if (!state.encMap[cedula]) {
                state.encMap[cedula] = {
                    cedula, nombre, encuestas: 0, completadas: 0, noEfectiva: 0,
                    tipoA: 0, tipoB: 0, tipoC: 0, tipoE: 0, alertasCount: 0,
                    duraciones: [], personas: 0, municipios: new Set(), condiciones: {},
                    semanas: {}, controlesSet: new Set(),
                };
            }
            const m = state.encMap[cedula];
            m.encuestas++;
            if (estado === 'completada') {
                m.completadas++;
            } else {
                m.noEfectiva++;
            }

            if (tipo_vivienda === 'TIPO A') m.tipoA++;
            else if (tipo_vivienda === 'TIPO B') m.tipoB++;
            else if (tipo_vivienda === 'TIPO C') m.tipoC++;
            else if (tipo_vivienda === 'TIPO E') m.tipoE++;

            if (Array.isArray(alertas) && alertas.length > 0) m.alertasCount += alertas.length;
            if (control) m.controlesSet.add(String(control).slice(-4).padStart(4, '0'));

            if (durMin !== null) m.duraciones.push(durMin);
            m.personas += (totalPers || 0);
            m.municipios.add(mun);
            m.condiciones[condicion] = (m.condiciones[condicion] || 0) + 1;
            if (semana) {
                if (!m.semanas[semana]) m.semanas[semana] = new Set();
                if (control) m.semanas[semana].add(control);
            }
        }
        
        // Yield to browser for UI responsiveness
        await new Promise(r => setTimeout(r, 0));
    }

    // 8. Final Aggregation Step (Pass 2 of rebuildEncMap)
    for (const m of Object.values(state.encMap)) {
        const vvPlanif   = getPlannedViviendasForControls(m.controlesSet);
        const basePlanif = vvPlanif > 0 ? vvPlanif : m.encuestas;
        const divisor    = basePlanif - (m.tipoB + m.tipoC);

        m.avgDur         = m.duraciones.length ? (m.duraciones.reduce((a, b) => a + b, 0) / m.duraciones.length) : 0;
        m.planificadas   = vvPlanif;
        m.noRespuesta    = m.tipoA;
        m.pctCompleta    = m.encuestas > 0 ? Math.round((m.completadas / m.encuestas) * 100) : 0;
        m.pctNoRespuesta = divisor > 0 ? Math.round((m.tipoA / divisor) * 100) : 0;
        m.score          = m.pctNoRespuesta;
        const semanasArr = Object.values(m.semanas || {});
        m.avgControlesSemana = semanasArr.length
            ? Math.round(semanasArr.reduce((s, set) => s + set.size, 0) / semanasArr.length)
            : 0;
        m.totalSemanas = semanasArr.length;
    }
    
    console.log('data/index.js: Pipeline completed ✓');
}
