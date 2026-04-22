import { $ } from '../helpers.js';

/**
 * Updates the main grid table with control records.
 */
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
            encuestador: rec._meta.nombre ? rec._meta.nombre.split(' ')[0] : 'N/A',
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
            <td class="py-3 px-3 align-top font-bold text-[10px] text-slate-400 dark:text-slate-500 uppercase">${r.encuestador}</td>
        </tr>
    `).join('');
}

/**
 * Resets the header information to default state.
 */
export function clearMM111Header() {
    ['mm111Entidad','mm111Municipio','mm111Parroquia','mm111CPoblado']
        .forEach(id => { if ($(id)) $(id).textContent = '---'; });
    ['mm111EntidadCod','mm111MunicipioCod','mm111ParroquiaCod','mm111CPobladoCod']
        .forEach(id => { if ($(id)) $(id).textContent = '--'; });
    ['mm111Segmento','mm111Sector','mm111Nodo','mm111Semana','mm111ControlMaestro','mm111Lote']
        .forEach(id => { if ($(id)) $(id).textContent = '-'; });
    if ($('mm111ControlNro')) $('mm111ControlNro').textContent = '0000';
}

/**
 * Renders the results dropdown list.
 */
export function renderResultsList(filtered, query) {
    const resultsList = $('mm111ResultsList');
    if (!resultsList) return;

    if (filtered.length > 0) {
        resultsList.innerHTML = filtered.map((c, i) => `
            <div class="result-item p-3 hover:bg-brand-blue/10 dark:hover:bg-brand-blue/20 rounded-xl cursor-pointer transition-all flex items-center justify-between group" 
                 data-value="${c.control}" data-index="${i}">
               <div class="flex flex-col">
                  <span class="text-sm font-bold text-slate-700 dark:text-white group-hover:text-brand-blue">${c.control}</span>
                  <div class="flex items-center gap-2 mt-0.5">
                    <span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider">${c.mun}</span>
                    ${c.seg ? `<span class="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700"></span><span class="text-[9px] text-brand-blue/60 font-bold uppercase">Ség: ${c.seg}</span>` : ''}
                  </div>
               </div>
               <div class="h-6 w-6 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                  <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-brand-blue"></i>
               </div>
            </div>
        `).join('');
    } else {
        resultsList.innerHTML = `
            <div class="p-8 text-center flex flex-col items-center gap-2">
                <i data-lucide="search-x" class="w-8 h-8 text-slate-300"></i>
                <p class="text-xs text-slate-400 font-medium">No se encontraron resultados para "${query}"</p>
            </div>`;
    }
    
    if (window.lucide) lucide.createIcons();
}
