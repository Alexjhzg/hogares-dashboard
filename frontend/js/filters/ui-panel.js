import { state } from '../core/index.js';
import { $ } from '../utils/index.js';
import { IS_INE, ALERT_RULES } from '../core/index.js';

export function openFiltersPanel() {
    const panel = $('offCanvasFilters');
    const overlay = $('filtersOverlay');
    if (!panel || !overlay) return;

    panel.classList.remove('translate-x-full');
    overlay.classList.remove('hidden');
    setTimeout(() => overlay.classList.remove('opacity-0'), 10);
}

export function closeFiltersPanel() {
    const panel = $('offCanvasFilters');
    const overlay = $('filtersOverlay');
    if (!panel || !overlay) return;

    panel.classList.add('translate-x-full');
    overlay.classList.add('opacity-0');
    setTimeout(() => overlay.classList.add('hidden'), 300);
}

/**
 * Extracts unique values from current data to fill the filter dropdowns.
 */
export function populateFilters() {
    const selects = {
        enc: $('filterEncuestador'),
        mun: $('filterMunicipio'),
        con: $('filterCondicion'),
        sit: $('filterSituacionVivienda'),
        uso: $('filterUso'),
        sem: $('filterSemana'),
        ctrl: $('filterControl'),
        par: $('filterParroquia'),
        nodo: $('filterNodo'),
        alerta: $('filterAlerta'),
        htrans: $('filterHoraTransmision'),
        hinicio: $('filterHoraInicio')
    };

    // Reset all
    Object.values(selects).forEach(s => {
        if (s) {
            let defaultLabel = 'Todos';
            if (s.id === 'filterAlerta') defaultLabel = 'Todas las alertas';
            else if (s.id === 'filterHoraTransmision' || s.id === 'filterHoraInicio') defaultLabel = 'Cualquier hora';
            else if (s.id.includes('Condicion') || s.id.includes('Semana') || s.id.includes('Parroquia')) defaultLabel = 'Todas';
            
            s.innerHTML = `<option value="">${defaultLabel}</option>`;
        }
    });

    if (selects.alerta) {
        ALERT_RULES.forEach(r => {
            const o = document.createElement('option');
            o.value = r.code;
            o.textContent = r.label;
            selects.alerta.appendChild(o);
        });
    }

    const sets = {
        muns: new Set(), sitVs: new Set(), cons: new Set(),
        usos: new Set(), semanas: new Set(), controles: new Set(),
        pars: new Set(), nodos: new Set(), hTrans: new Set(), hInicio: new Set()
    };

    // 1. Populate Encuestadores from encMap (pre-aggregated)
    if (selects.enc) {
        Object.values(state.encMap)
            .sort((a, b) => a.nombre.localeCompare(b.nombre))
            .forEach(m => {
                const isIne = IS_INE.has(String(m.cedula).trim());
                const opt = document.createElement('option');
                opt.value = m.cedula;
                opt.textContent = `${m.nombre} (${m.cedula})${isIne ? ' [INE]' : ' [SEGEN]'}`;
                opt.style.color = isIne ? '#10B981' : '#8B5CF6';
                opt.style.fontWeight = 'bold';
                selects.enc.appendChild(opt);
            });
    }

    // 2. Extract unique values from rawData
    state.rawData.forEach(r => {
        const m = r._meta;
        if (!m) return;
        if (m.mun && m.mun !== 'N/A')                sets.muns.add(m.mun);
        if (m.situacion_vivienda)                    sets.sitVs.add(m.situacion_vivienda);
        if (m.condicion && m.condicion !== 'N/A')    sets.cons.add(m.condicion);
        if (m.uso && m.uso !== 'N/A')                sets.usos.add(m.uso);
        if (m.semana)                                sets.semanas.add(m.semana);
        if (m.control)                               sets.controles.add(m.control);
        if (m.par && m.par !== 'N/A')                sets.pars.add(m.par);
        if (m.nodo && m.nodo !== 'N/A')              sets.nodos.add(m.nodo);
        if (m.hora_trans !== undefined && m.hora_trans !== null) sets.hTrans.add(m.hora_trans);
        if (m.hora !== undefined && m.hora !== null)             sets.hInicio.add(m.hora);
    });

    const append = (sel, vals, transform) => {
        if (!sel) return;
        [...vals].sort().forEach(v => {
            const o = document.createElement('option');
            o.value = v;
            o.textContent = transform ? transform(v) : v;
            sel.appendChild(o);
        });
    };

    append(selects.mun,  sets.muns);
    append(selects.par,  sets.pars);
    append(selects.nodo, sets.nodos);
    append(selects.sem,  sets.semanas);
    append(selects.ctrl, sets.controles);
    append(selects.sit,  sets.sitVs, v => v.replace(/_/g, ' ').toUpperCase());
    append(selects.con,  sets.cons,  v => v.replace(/_/g, ' ').toUpperCase());
    append(selects.uso,  sets.usos,  v => v.replace(/_/g, ' ').toUpperCase());
    append(selects.htrans, sets.hTrans, v => `${v}:00`);
    append(selects.hinicio, sets.hInicio, v => `${v}:00`);

    // Trigger change on municipio to refresh sub-filters if needed
    if (selects.mun) selects.mun.dispatchEvent(new Event('change'));
}
