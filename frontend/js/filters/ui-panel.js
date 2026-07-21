import { state } from '../core/index.js';
import { $ } from '../utils/index.js';
import { IS_INE, ALERT_RULES, ENCUESTADOR_NAMES, getMunicipioLabel } from '../core/index.js';
import { initSearchableCombobox } from '../ui/components/combobox.js';

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
 * Dynamically populates the Encuestador select dropdown based on filterINE/filterSEGEN state.
 */
export function populateEncuestadores() {
    const select = $('filterEncuestador');
    if (!select) return;

    // Save current selection
    const currentValue = select.value;

    select.innerHTML = '<option value="">Todos</option>';

    Object.values(state.encMap)
        .sort((a, b) => (a.nombre || '').localeCompare(b.nombre || ''))
        .forEach(m => {
            const isIne = IS_INE.has(String(m.cedula).trim());
            
            // Check state filters
            if (state.filterINE && !isIne) return;
            if (state.filterSEGEN && isIne) return;

            const displayName = (m.nombre && m.nombre !== 'Desconocido')
                ? m.nombre
                : (ENCUESTADOR_NAMES[m.cedula] || `Encuestador ${m.cedula}`);

            const opt = document.createElement('option');
            opt.value = m.cedula;
            opt.textContent = `${displayName} (${m.cedula})${isIne ? ' [INE]' : ' [SEGEN]'}`;
            opt.style.color = isIne ? '#10B981' : '#8B5CF6';
            opt.style.fontWeight = 'bold';
            select.appendChild(opt);
        });

    // Restore selection if it still exists in the filtered options
    if (currentValue) {
        const optionExists = Array.from(select.options).some(opt => opt.value === currentValue);
        if (optionExists) {
            select.value = currentValue;
        } else {
            select.value = '';
        }
    }

    // Re-initialize searchable combobox for Encuestador
    initSearchableCombobox(select);
}

export function setupFilterCascading() {
    const munSel = $('filterMunicipio');
    const parSel = $('filterParroquia');
    const nodoSel = $('filterNodo');
    const ctrlSel = $('filterControl');
    const semSel = $('filterSemana');

    if (munSel) {
        munSel.addEventListener('change', () => {
            const chosenMun = munSel.value;
            refreshSubLocationSelects(chosenMun, semSel?.value);
        });
    }

    if (semSel) {
        semSel.addEventListener('change', () => {
            const chosenSem = semSel.value;
            refreshSubLocationSelects(munSel?.value, chosenSem);
        });
    }
}

function refreshSubLocationSelects(selectedMun, selectedSem) {
    const parSel = $('filterParroquia');
    const nodoSel = $('filterNodo');
    const ctrlSel = $('filterControl');

    const filteredRecords = state.rawData.filter(r => {
        const m = r._meta;
        if (!m) return false;
        if (selectedMun && m.mun !== selectedMun) return false;
        if (selectedSem && m.semana !== selectedSem) return false;
        return true;
    });

    const parCounts = {};
    const nodoCounts = {};
    const ctrlCounts = {};

    filteredRecords.forEach(r => {
        const m = r._meta;
        if (m.par && m.par !== 'N/A') parCounts[m.par] = (parCounts[m.par] || 0) + 1;
        if (m.nodo && m.nodo !== 'N/A') nodoCounts[m.nodo] = (nodoCounts[m.nodo] || 0) + 1;
        if (m.control) ctrlCounts[m.control] = (ctrlCounts[m.control] || 0) + 1;
    });

    const updateOptions = (sel, countsMap, defaultLabel) => {
        if (!sel) return;
        const currVal = sel.value;
        sel.innerHTML = `<option value="">${defaultLabel}</option>`;
        Object.entries(countsMap)
            .sort((a, b) => a[0].localeCompare(b[0]))
            .forEach(([val, count]) => {
                const opt = document.createElement('option');
                opt.value = val;
                opt.textContent = `${val} (${count.toLocaleString('es-VE')})`;
                sel.appendChild(opt);
            });
        if (currVal && countsMap[currVal]) {
            sel.value = currVal;
        } else {
            sel.value = '';
        }
        initSearchableCombobox(sel);
    };

    updateOptions(parSel, parCounts, 'Todas las parroquias');
    updateOptions(nodoSel, nodoCounts, 'Todos los nodos');
    updateOptions(ctrlSel, ctrlCounts, 'Todos los controles');
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
            if (s.id === 'filterEncuestador') return; // Handled by populateEncuestadores()
            let defaultLabel = 'Todos';
            if (s.id === 'filterAlerta') defaultLabel = 'Todas las alertas';
            else if (s.id === 'filterHoraTransmision' || s.id === 'filterHoraInicio') defaultLabel = 'Cualquier hora';
            else if (s.id.includes('Condicion') || s.id.includes('Semana') || s.id.includes('Parroquia') || s.id.includes('Municipio')) defaultLabel = 'Todos';
            
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
        muns: {}, sitVs: {}, cons: {},
        usos: {}, semanas: {}, controles: {},
        pars: {}, nodos: {}, hTrans: {}, hInicio: {}
    };

    // 1. Populate Encuestadores
    populateEncuestadores();

    // 2. Extract unique values and counts from rawData
    state.rawData.forEach(r => {
        const m = r._meta;
        if (!m) return;
        if (m.mun && m.mun !== 'N/A')                sets.muns[m.mun] = (sets.muns[m.mun] || 0) + 1;
        if (m.situacion_vivienda)                    sets.sitVs[m.situacion_vivienda] = (sets.sitVs[m.situacion_vivienda] || 0) + 1;
        if (m.condicion && m.condicion !== 'N/A')    sets.cons[m.condicion] = (sets.cons[m.condicion] || 0) + 1;
        if (m.uso && m.uso !== 'N/A')                sets.usos[m.uso] = (sets.usos[m.uso] || 0) + 1;
        if (m.semana)                                sets.semanas[m.semana] = (sets.semanas[m.semana] || 0) + 1;
        if (m.control)                               sets.controles[m.control] = (sets.controles[m.control] || 0) + 1;
        if (m.par && m.par !== 'N/A')                sets.pars[m.par] = (sets.pars[m.par] || 0) + 1;
        if (m.nodo && m.nodo !== 'N/A')              sets.nodos[m.nodo] = (sets.nodos[m.nodo] || 0) + 1;
        if (m.hora_trans !== undefined && m.hora_trans !== null) sets.hTrans[m.hora_trans] = (sets.hTrans[m.hora_trans] || 0) + 1;
        if (m.hora !== undefined && m.hora !== null)             sets.hInicio[m.hora] = (sets.hInicio[m.hora] || 0) + 1;
    });

    const appendWithCount = (sel, countsObj, transform) => {
        if (!sel) return;
        Object.entries(countsObj)
            .sort((a, b) => a[0].localeCompare(b[0]))
            .forEach(([val, count]) => {
                const o = document.createElement('option');
                o.value = val;
                const labelText = transform ? transform(val) : val;
                o.textContent = `${labelText} (${count.toLocaleString('es-VE')})`;
                sel.appendChild(o);
            });
    };

    appendWithCount(selects.mun,  sets.muns, v => getMunicipioLabel(v));
    appendWithCount(selects.par,  sets.pars);
    appendWithCount(selects.nodo, sets.nodos);
    appendWithCount(selects.sem,  sets.semanas);
    appendWithCount(selects.ctrl, sets.controles);
    appendWithCount(selects.sit,  sets.sitVs, v => v.replace(/_/g, ' ').toUpperCase());
    appendWithCount(selects.con,  sets.cons,  v => v.replace(/_/g, ' ').toUpperCase());
    appendWithCount(selects.uso,  sets.usos,  v => v.replace(/_/g, ' ').toUpperCase());
    appendWithCount(selects.htrans, sets.hTrans, v => `${v}:00`);
    appendWithCount(selects.hinicio, sets.hInicio, v => `${v}:00`);

    // Initialize/Update all searchable comboboxes
    const allSelectIds = [
        'filterMunicipio', 'filterParroquia', 'filterNodo',
        'filterEstado', 'filterClasificacion', 'filterCondicion',
        'filterSituacionVivienda', 'filterUso', 'filterSemana',
        'filterControl', 'filterHoraInicio', 'filterHoraTransmision',
        'filterAlerta', 'filterEncuestador', 'filterTasaNoRespuesta'
    ];
    allSelectIds.forEach(id => {
        const el = $(id);
        if (el) initSearchableCombobox(el);
    });

    setupFilterCascading();
}
