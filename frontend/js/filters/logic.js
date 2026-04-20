import { state } from '../state.js';
import { $ } from '../helpers.js';
import { IS_INE } from '../config.js';
import { renderActiveFilterTags } from './tags.js';

let _renderAll = () => {};

/** Inject the renderAll callback from main.js */
export function setRenderAll(fn) { _renderAll = fn; }

/**
 * Core filtering algorithm.
 * Filters state.rawData based on all active UI inputs and updates state.filtered.
 */
export function applyFilters() {
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

        // 5. Survey Status
        if (estado === 'completada' && m.estado !== 'completada') return false;
        if ((estado === 'no_respuesta' || estado === 'parcial') && m.estado === 'completada') return false;
        
        if (state.quickFilterMode === 'efectivas' && m.estado !== 'completada') return false;
        if (state.quickFilterMode === 'no_respuesta' && m.estado === 'completada') return false;
        if (state.quickFilterMode === 'alertas' && !m.hasAlerts) return false;

        // 6. Typology & Quality
        if (sitViv && m.situacion_vivienda !== sitViv) return false;
        if (condicion && m.condicion !== condicion) return false;
        if (uso && m.uso !== uso) return false;
        if (alerta && !m.alertas.includes(alerta)) return false;
        if (hTrans !== '' && String(m.hora_trans) !== hTrans) return false;
        if (hInicio !== '' && String(m.hora) !== hInicio) return false;

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
        'filterAlerta', 'filterHoraTransmision', 'filterHoraInicio', 'searchEncuesta'
    ];
    
    ids.forEach(id => {
        const el = $(id);
        if (el) el.value = '';
    });

    if ($('filterMunicipio')) $('filterMunicipio').dispatchEvent(new Event('change'));
    
    state.filtered = [...state.rawData];
    renderActiveFilterTags();
    if (typeof _renderAll === 'function') _renderAll();
}
