import { state } from '../state.js';
import { $ } from '../helpers.js';
import { clearMM111Header, updateMM111Grid } from './render.js';

/**
 * Loads and displays data for a specific control number.
 */
export function loadMM111ControlData(controlNro) {
    if (!controlNro) return;

    // Use rawData to ensure we find the control even if filtered out in other views
    const records = state.rawData.filter(r =>
        String(r._meta.control).toLowerCase() === String(controlNro).toLowerCase()
    );

    if (records.length === 0) {
        clearMM111Header();
        updateMM111Grid([]);
        return;
    }

    const first = records[0];

    // Update Header Fields
    if ($('mm111Entidad'))   $('mm111Entidad').textContent   = first['S1/ent'] || first._meta.mun || 'N/A';
    if ($('mm111Municipio')) $('mm111Municipio').textContent = first._meta.mun || 'N/A';
    if ($('mm111Parroquia')) $('mm111Parroquia').textContent = first._meta.par || 'N/A';
    if ($('mm111CPoblado'))  $('mm111CPoblado').textContent  = first['S1/cpoblado'] || 'N/A';

    const extractCode = (str, sliceLast = null) => {
        if (!str) return '--';
        const match = String(str).match(/^(\d+)/);
        let code = match ? match[1] : '--';
        if (code !== '--' && sliceLast) code = code.slice(-sliceLast);
        return code;
    };

    if ($('mm111EntidadCod'))   $('mm111EntidadCod').textContent   = extractCode(first['S1/ent']) || '--';
    if ($('mm111MunicipioCod')) $('mm111MunicipioCod').textContent = extractCode(first._meta.mun, 2) || '--';
    if ($('mm111ParroquiaCod')) $('mm111ParroquiaCod').textContent = extractCode(first._meta.par, 2) || '--';
    if ($('mm111CPobladoCod'))  $('mm111CPobladoCod').textContent  = extractCode(first['S1/cpoblado']) || '--';

    // Control bar
    const fmtSuffix = (val, len) => val && String(val).trim() !== '-' ? String(val).slice(-len) : '-';

    if ($('mm111Segmento'))  $('mm111Segmento').textContent  = first['S1/segmento'] || first['S1/group_segmeto_sector/segmento'] || first['group_segmeto_sector/segmento'] || '-';
    if ($('mm111Sector'))    $('mm111Sector').textContent    = first['S1/sector']   || first['S1/group_segmeto_sector/sector']   || first['group_segmeto_sector/sector']   || '-';
    if ($('mm111Nodo'))      $('mm111Nodo').textContent      = first._meta.nodo || '-';
    if ($('mm111Semana'))    $('mm111Semana').textContent    = fmtSuffix(first._meta.semana, 2);
    if ($('mm111ControlNro')) $('mm111ControlNro').textContent = fmtSuffix(first._meta.control, 4);

    const lote = first['group_sh53u78/lote'] || first['lote'] || '-';
    if ($('mm111Lote')) $('mm111Lote').textContent = lote;

    // Sync Global Date Filters with Control Dates
    const dates = records.map(r => r._meta.fecha).filter(Boolean).sort();
    if (dates.length > 0) {
        const inputInicio = $('filterFechaInicio');
        const inputFin = $('filterFechaFin');
        if (inputInicio) inputInicio.value = dates[0];
        if (inputFin)    inputFin.value    = dates[dates.length - 1];
    }

    updateMM111Grid(records);
}

/**
 * Extracts unique control metadata for search.
 */
export function getControlMetadata() {
    const controlMap = new Map();
    state.filtered.forEach(r => {
        const m = r._meta;
        if (!m || !m.control) return;

        if (!controlMap.has(m.control)) {
            controlMap.set(m.control, {
                control: m.control,
                mun: m.mun || 'N/A',
                seg: m.segmento || '',
                sec: m.sector || ''
            });
        }
    });
    return Array.from(controlMap.values()).sort((a, b) => a.control.localeCompare(b.control));
}
