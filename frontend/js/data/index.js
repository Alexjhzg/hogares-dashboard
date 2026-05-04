/**
 * ─── Data Processing (Refactorized) ──────────────────────────────────────────
 * Orchestrates the transformation of raw records into enriched _meta objects.
 */

import { state } from '../core/index.js';

// Sub-modules
import { normalizeRecord, calculateDuration } from './normalizer.js';
import { parseDemographics } from './survey-parsers.js';
import { getCoordinates, calculateDistances, validateSegment } from './geo-rules.js';
import { runAlertEngine } from './alert-engine.js';
import { rebuildEncMap } from './aggregators.js';
import { classifyHousingState } from './housingClassifier.js';

/**
 * Main entry point for data processing.
 * Runs the transformation pipeline for each record and then aggregates results.
 */
export function processData() {
    console.log('data/index.js: Processing raw data pipeline...');
    
    state.rawData.forEach(r => {
        // 1. Normalization (Frontend schema)
        const n = normalizeRecord(r);
        
        // Use backend duration if available
        const durMin = (r._backend_meta && r._backend_meta.duration_minutes !== undefined) 
            ? r._backend_meta.duration_minutes 
            : calculateDuration(n.start, n.end);

        // 2. Demographic Parsing (EHM/ESCA)
        const { totalPers, totalHombres, totalMujeres, hogaresCount, hogaresRaw } = parseDemographics(r, n.formType);

        // 3. Geographic Analytics
        const { lat, lng, ptIni, ptFin } = getCoordinates(r);
        const { distance_m, dist_ini_fin } = calculateDistances(r, ptIni, ptFin);
        
        const declaredCode = (n.segmento === '000' || n.segmento === '0') ? n.sector : n.segmento;
        const actualSeg = validateSegment(lat, lng, declaredCode);

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
        const isCompletada = /totalment/i.test(n.nota);
        const tipoVivienda = classifyHousingState(n.situacion_vivienda || n.condicion);
        
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
            // Simple flags for legacy support
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
    });

    // 6. Cross-validation: Check Linea/Serie catalog
    _checkLineaSerie();

    // 7. Aggregation: Build EncMap & Rankings
    rebuildEncMap();
    
    console.log('data/index.js: Pipeline completed ✓');
}

/**
 * Validates Linea/Serie combinations against the official cartography catalog.
 * @private
 */
function _checkLineaSerie() {
    const hasIndex = state.controlsIndex instanceof Map && state.controlsIndex.size > 0;
    if (!hasIndex) return;

    state.rawData.forEach(r => {
        if (!r._meta) return;
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
            const reasons = [];
            if (!isCtrlValid) reasons.push('Control');
            else reasons.push('Combinación Serie/Línea');
            r._meta._ls_key_reported = `${reasons.join(', ')} inválida en BD`;
        }
    });
}
