// ─── MM-111 Module ───────────────────────────────────────────────────────────
// Renders the Marco Maestro de Muestreo verification panel.

import { state } from './state.js';
import { $ } from './helpers.js';

export function renderMM111() {
    const searchBtn   = $('btnLoadMM111');
    const searchInput = $('mm111SearchControl');
    if (!searchBtn || !searchInput) return;

    // Rebuild control dropdown options
    const uniqueControls = new Set();
    state.filtered.forEach(r => { if (r._meta.control) uniqueControls.add(r._meta.control); });
    const controls = [...uniqueControls].sort();

    searchInput.innerHTML = '<option value="">Seleccionar Control...</option>' +
        controls.map(c => `<option value="${c}">${c}</option>`).join('');

    searchBtn.onclick   = () => loadMM111ControlData(searchInput.value.trim());
    searchInput.onchange = () => loadMM111ControlData(searchInput.value.trim());

    // Auto-load if there's a current value, else load the first available
    const currentVal = searchInput.value.trim();
    if (currentVal) {
        loadMM111ControlData(currentVal);
    } else {
        const first = state.filtered.find(r => r._meta.control);
        if (first) {
            searchInput.value = first._meta.control;
            loadMM111ControlData(first._meta.control);
        }
    }
}

export function loadMM111ControlData(controlNro) {
    if (!controlNro) return;

    const records = state.filtered.filter(r =>
        String(r._meta.control).toLowerCase() === String(controlNro).toLowerCase()
    );

    if (records.length === 0) {
        clearMM111Header();
        updateMM111Grid([]);
        return;
    }

    const first = records[0];

    // Header — geographic fields
    $('mm111Entidad').textContent   = first['S1/ent'] || first._meta.mun || 'N/A';
    $('mm111Municipio').textContent = first._meta.mun || 'N/A';
    $('mm111Parroquia').textContent = first._meta.par || 'N/A';
    $('mm111CPoblado').textContent  = first['S1/cpoblado'] || 'N/A';

    const extractCode = (str, sliceLast = null) => {
        if (!str) return '--';
        const match = String(str).match(/^(\d+)/);
        let code = match ? match[1] : '--';
        if (code !== '--' && sliceLast) code = code.slice(-sliceLast);
        return code;
    };

    $('mm111EntidadCod').textContent   = extractCode(first['S1/ent']) || '--';
    $('mm111MunicipioCod').textContent = extractCode(first._meta.mun, 2) || '--';
    $('mm111ParroquiaCod').textContent = extractCode(first._meta.par, 2) || '--';
    $('mm111CPobladoCod').textContent  = extractCode(first['S1/cpoblado']) || '--';

    // Control bar
    const fmtSuffix = (val, len) => val && String(val).trim() !== '-' ? String(val).slice(-len) : '-';

    $('mm111Segmento').textContent  = first['S1/segmento'] || first['S1/group_segmeto_sector/segmento'] || first['group_segmeto_sector/segmento'] || '-';
    $('mm111Sector').textContent    = first['S1/sector']   || first['S1/group_segmeto_sector/sector']   || first['group_segmeto_sector/sector']   || '-';
    $('mm111Nodo').textContent      = first._meta.nodo || '-';
    $('mm111Semana').textContent    = fmtSuffix(first._meta.semana, 2);
    $('mm111ControlNro').textContent = fmtSuffix(first._meta.control, 4);

    updateMM111Grid(records);
}

export function clearMM111Header() {
    ['mm111Entidad','mm111Municipio','mm111Parroquia','mm111CPoblado']
        .forEach(id => { if ($(id)) $(id).textContent = '---'; });
    ['mm111EntidadCod','mm111MunicipioCod','mm111ParroquiaCod','mm111CPobladoCod']
        .forEach(id => { if ($(id)) $(id).textContent = '--'; });
    ['mm111Segmento','mm111Sector','mm111Nodo','mm111Semana','mm111ControlMaestro','mm111Lote']
        .forEach(id => { if ($(id)) $(id).textContent = '-'; });
    if ($('mm111ControlNro')) $('mm111ControlNro').textContent = '0000';
}

export function updateMM111Grid(records) {
    const tbody = $('mm111HTMLGrid');
    if (!tbody) return;

    if (!records || records.length === 0) {
        tbody.innerHTML = '<tr><td colspan="11" class="text-center py-10 text-slate-400">No hay registros para este Control.</td></tr>';
        return;
    }

    const rows = records.map((rec, i) => {
        let dirParts = [];
        if (rec['S1/P_nomsect']) dirParts.push(rec['S1/P_nomsect']);
        for (let j = 1; j <= 4; j++) {
            const etiq = rec[`S1/G_P9/gp10_${j}_etiq`];
            const val  = rec[`S1/G_P9/GP10_${j}b`];
            if (etiq && val) dirParts.push(`${etiq} ${val}`);
        }
        const nro = rec['control_de_la_entrevista/in10'] || rec['control_entrevista/in10'];
        if (nro) dirParts.push(`Nro: ${nro}`);
        const ref = rec['control_de_la_entrevista/in11'] || rec['control_entrevista/in11'];
        if (ref) dirParts.push(`Ref: ${ref}`);
        const dirFinal = dirParts.length > 0 ? dirParts.join(', ') : (rec['S1/direccion'] || rec._meta.nota || '-');

        return {
            linea:      rec['group_sh53u78/n_linea'] || (i + 1),
            serie:      rec['group_sh53u78/n_serie'] || '-',
            manzana:    rec['S1/manzana'] || '-',
            parcela:    rec['S1/parcela'] || '-',
            edificacion: rec['S1/Edificaci_n'] || rec['S1/edificacion'] || '-',
            estructura: rec['S1/estructura'] || rec['S1/unidad'] || '-',
            uso:        rec['S1/Uso_de_la_Unidad_inmobiliaria'] || rec._meta.uso || '-',
            ladoManz:   rec['S1/lado_manz'] || '-',
            direccion:  dirFinal,
            razon:      rec['Condici_n_de_ocupaci_n/condicion_de_ocupacion'] || rec._meta.condicion || '-',
            agente:     rec._meta.nombre ? rec._meta.nombre.split(' ')[0] : 'N/A',
        };
    });

    rows.sort((a, b) => parseInt(a.linea) - parseInt(b.linea));

    tbody.innerHTML = rows.map((r, i) => `
        <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white dark:bg-[#0B1120]' : 'bg-slate-50 dark:bg-slate-900/50'}">
            <td class="py-3 px-3 align-top font-mono font-bold text-center sticky left-0 z-10 ${i % 2 === 0 ? 'bg-white dark:bg-[#0B1120]' : 'bg-slate-50 dark:bg-slate-900/50'} shadow-[inset_-1px_0_0_rgba(226,232,240,1)] dark:shadow-[inset_-1px_0_0_rgba(30,41,59,1)]">${r.linea}</td>
            <td class="py-3 px-3 align-top font-mono text-center">${r.serie}</td>
            <td class="py-3 px-3 align-top text-center">${r.manzana}</td>
            <td class="py-3 px-3 align-top text-center">${r.parcela}</td>
            <td class="py-3 px-3 align-top text-center">${r.edificacion}</td>
            <td class="py-3 px-3 align-top text-center">${r.estructura}</td>
            <td class="py-3 px-3 align-top font-semibold truncate max-w-[120px]" title="${r.uso}">${r.uso}</td>
            <td class="py-3 px-3 align-top text-center">${r.ladoManz}</td>
            <td class="py-3 px-3 align-top whitespace-normal min-w-[200px] leading-snug">${r.direccion}</td>
            <td class="py-3 px-3 align-top whitespace-normal min-w-[150px] leading-snug text-slate-500 dark:text-slate-400">${r.razon}</td>
            <td class="py-3 px-3 align-top font-bold text-[10px] text-slate-400 dark:text-slate-500 uppercase">${r.agente}</td>
        </tr>
    `).join('');
}
