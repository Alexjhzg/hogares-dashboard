import { state } from '../core/index.js';
import { $ } from '../utils/index.js';
import { IS_INE } from '../core/index.js';
import { renderActiveFilterTags } from './tags.js';
import { populateEncuestadores } from './ui-panel.js';

let _renderAll = () => {};

/** Inject the renderAll callback from main.js */
export function setRenderAll(fn) { _renderAll = fn; }

/**
 * Core filtering algorithm.
 * Filters state.rawData based on all active UI inputs and updates state.filtered.
 */
export function applyFilters() {
    populateEncuestadores();
    const query    = $('searchEncuesta')?.value.toLowerCase() ?? '';
    const enc      = $('filterEncuestador')?.value ?? '';
    const fi       = $('filterFechaInicio')?.value ?? '';
    const ff       = $('filterFechaFin')?.value ?? '';
    const semana   = $('filterSemana')?.value ?? '';
    const control  = $('filterControl')?.value ?? '';
    const mun      = $('filterMunicipio')?.value ?? '';
    const parroquia = $('filterParroquia')?.value ?? '';
    const nodo     = $('filterNodo')?.value ?? '';
    const estado   = $('filterEstado')?.value ?? '';
    const sitViv   = $('filterSituacionVivienda')?.value ?? '';
    const condicion = $('filterCondicion')?.value ?? '';
    const uso      = $('filterUso')?.value ?? '';
    const alerta   = $('filterAlerta')?.value ?? '';
    const hTrans   = $('filterHoraTransmision')?.value ?? '';
    const hInicio   = $('filterHoraInicio')?.value ?? '';
    const clasif   = $('filterClasificacion')?.value ?? '';
    const tasaNoRespFilter = $('filterTasaNoRespuesta')?.value ?? '';

    const satisfiedControls = new Set();
    if (tasaNoRespFilter !== '') {
        const stats = {};
        const program = state.assetName && state.assetName.toUpperCase().includes('EHM') ? 'EHM' : 'ESCA';
        
        // Cargar planificadas
        if (state.planificacionData?.por_semana) {
            state.planificacionData.por_semana.forEach(item => {
                if (item.programa !== program) return;
                const ctrlCode = String(item.control).replace(/\D/g, '').padStart(4, '0');
                if (!stats[ctrlCode]) stats[ctrlCode] = { planif: 0, tipoA: 0, tipoB: 0, tipoC: 0, totalCaptured: 0 };
                stats[ctrlCode].planif += item.n_viviendas || 0;
            });
        }
        
        // Contar observadas en rawData
        state.rawData.forEach(r => {
            const m = r._meta;
            if (!m || !m.control) return;
            const ctrlCode = String(m.control).replace(/\D/g, '').padStart(4, '0');
            if (!stats[ctrlCode]) stats[ctrlCode] = { planif: 0, tipoA: 0, tipoB: 0, tipoC: 0, totalCaptured: 0 };
            stats[ctrlCode].totalCaptured++;
            if (m.tipo_vivienda === 'TIPO A') stats[ctrlCode].tipoA++;
            else if (m.tipo_vivienda === 'TIPO B') stats[ctrlCode].tipoB++;
            else if (m.tipo_vivienda === 'TIPO C') stats[ctrlCode].tipoC++;
        });
        
        // Evaluar condición usando la fórmula oficial unificada
        Object.entries(stats).forEach(([ctrlCode, s]) => {
            const basePlanif = s.planif > 0 ? s.planif : s.totalCaptured;
            const divisor = basePlanif - (s.tipoB + s.tipoC);
            const rate = divisor > 0 ? (s.tipoA / divisor) * 100 : (s.tipoA > 0 ? 100 : 0);
            
            if (tasaNoRespFilter === 'con_no_resp' && rate > 0) {
                satisfiedControls.add(ctrlCode);
            } else if (tasaNoRespFilter === 'sin_no_resp' && rate === 0) {
                satisfiedControls.add(ctrlCode);
            }
        });
    }

    state.filtered = state.rawData.filter(r => {
        const m = r._meta;
        if (!m) return false;

        // 1. Search Query
        if (query && !(m.nombre.toLowerCase().includes(query) || m.cedula.includes(query) || m.control.includes(query))) return false;
        
        // 2. Encuestador / Entity filters
        if (enc && m.cedula !== enc) return false;
        if (state.filterINE) {
            if (!IS_INE.has(String(m.cedula).trim())) return false;
        }
        if (state.filterSEGEN) {
            if (IS_INE.has(String(m.cedula).trim())) return false;
        }

        // 3. Temporal filters
        if (fi && m.fecha < fi) return false;
        if (ff && m.fecha > ff) return false;
        if (semana && m.semana !== semana) return false;

        // 4. Geographic filters
        if (control && m.control !== control) return false;
        if (mun && m.mun !== mun) return false;
        if (parroquia && m.par !== parroquia) return false;
        if (nodo && m.nodo !== nodo) return false;

        // 4b. Non-Response Filter by Control
        if (tasaNoRespFilter !== '') {
            const ctrlCode = String(m.control).replace(/\D/g, '').padStart(4, '0');
            if (!satisfiedControls.has(ctrlCode)) return false;
        }

        // 5. Survey Status
        if (estado === 'completada' && m.estado !== 'completada') return false;
        if (estado === 'no_efectiva' && m.estado === 'completada') return false;
        
        if (state.quickFilterMode === 'efectivas' && m.estado !== 'completada') return false;
        if (state.quickFilterMode === 'no_efectiva' && m.estado === 'completada') return false;
        if (state.quickFilterMode === 'alertas' && !m.hasAlerts) return false;

        // 6. Typology & Quality
        if (sitViv && m.situacion_vivienda !== sitViv) return false;
        if (condicion && m.condicion !== condicion) return false;
        if (uso && m.uso !== uso) return false;
        if (alerta && !m.alertas.includes(alerta)) return false;
        if (hTrans !== '' && String(m.hora_trans) !== hTrans) return false;
        if (hInicio !== '' && String(m.hora) !== hInicio) return false;
        if (clasif && m.tipo_vivienda !== clasif) return false;

        return true;
    });

    renderActiveFilterTags();
    if (typeof _renderAll === 'function') _renderAll();
    document.dispatchEvent(new CustomEvent('filtersApplied'));
}

/**
 * Clear all filter inputs and reset the filtered state.
 */
export function resetFilters() {
    const ids = [
        'filterEncuestador', 'filterFechaInicio', 'filterFechaFin', 'filterSemana',
        'filterControl', 'filterMunicipio', 'filterParroquia', 'filterNodo',
        'filterEstado', 'filterCondicion', 'filterSituacionVivienda', 'filterUso', 
        'filterAlerta', 'filterHoraTransmision', 'filterHoraInicio', 'filterClasificacion',
        'filterTasaNoRespuesta', 'searchEncuesta', 'mm111SearchControl'
    ];
    
    ids.forEach(id => {
        const el = $(id);
        if (el) {
            el.value = '';
            if (el.tagName === 'SELECT') {
                el.dispatchEvent(new Event('change'));
            }
        }
    });
    
    // Reset Entity Filters
    state.filterINE = false;
    state.filterSEGEN = false;
    ['filterINE', 'filterSEGEN'].forEach(id => {
        const el = $(id);
        if (el) el.classList.remove('active', 'bg-brand-emerald', 'bg-brand-purple', 'text-white');
    });

    state.filtered = [...state.rawData];
    state.quickFilterMode = 'all';

    // Reset visual state of map quick filters if they exist
    if (typeof window.setQuickFilter === 'function') {
        window.setQuickFilter('all');
    }

    // Remove active highlight from any custom preset chip
    document.querySelectorAll('.custom-preset-chip').forEach(chip => {
        chip.classList.remove('ring-2', 'ring-indigo-400', 'bg-indigo-500/20');
        chip.classList.add('bg-indigo-500/10');
    });

    renderActiveFilterTags();
    if (typeof _renderAll === 'function') _renderAll();
}
