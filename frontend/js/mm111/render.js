import { state } from '../state.js';
import { $ } from '../helpers.js';
import { USO_STYLES, RAZON_STYLES } from '../config.js';

/**
 * Initializes or updates the Tabulator instance for MM-111.
 */
export function updateMM111Grid(records) {
    if (typeof Tabulator === 'undefined') {
        console.error('Tabulator not found');
        return;
    }

    const rows = (records || []).map((rec, i) => {
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

    if (!state.mm111Table) {
        initMM111Table(rows);
    } else {
        state.mm111Table.setData(rows).then(() => {
            state.mm111Table.redraw(true);
        });
    }
}

function initMM111Table(initialData) {
    state.mm111Table = new Tabulator("#mm111Grid", {
        data: initialData,
        layout: "fitColumns",
        height: "100%",
        responsiveLayout: "collapse",
        placeholder: "<div class='p-12 text-center text-slate-400 font-medium'>No hay registros para este Control.</div>",
        columns: [
            { title: "Línea", field: "linea", width: 65, hozAlign: "center", frozen: true,
              formatter: cell => `<span class="font-mono font-bold text-slate-700 dark:text-slate-200">${cell.getValue()}</span>`
            },
            { title: "Serie", field: "serie", width: 60, hozAlign: "center", formatter: cell => `<span class="font-mono opacity-70">${cell.getValue()}</span>` },
            { title: "Manz.", field: "manzana", width: 65, hozAlign: "center" },
            { title: "Parc.", field: "parcela", width: 65, hozAlign: "center" },
            { title: "Edif.", field: "edificacion", width: 65, hozAlign: "center" },
            { title: "Estr.", field: "estructura", width: 65, hozAlign: "center" },
            { title: "Uso de la Unidad", field: "uso", minWidth: 120, formatter: badgeUsoFormatter },
            { title: "Lado", field: "ladoManz", width: 60, hozAlign: "center" },
            { title: "Dirección", field: "direccion", minWidth: 250, formatter: "textarea" },
            { title: "Razón Inclusión", field: "razon", minWidth: 180, formatter: badgeRazonFormatter },
            { title: "Encuestador", field: "encuestador", width: 100, hozAlign: "center",
              formatter: cell => `<span class="text-[10px] font-black uppercase text-slate-400 tracking-wider">${cell.getValue()}</span>`
            },
        ],
    });
}

function badgeUsoFormatter(cell) {
    const val = String(cell.getValue()).toUpperCase();
    let style = USO_STYLES.DEFAULT;
    
    for (const key in USO_STYLES) {
        if (val.includes(key)) {
            style = USO_STYLES[key];
            break;
        }
    }

    return `<span class="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tight ${style.badge}">${val}</span>`;
}

function badgeRazonFormatter(cell) {
    const val = String(cell.getValue()).toUpperCase();
    const cleanVal = val.replace(/_/g, ' ');
    let style = RAZON_STYLES.DEFAULT;
    
    for (const key in RAZON_STYLES) {
        if (val.includes(key)) {
            style = RAZON_STYLES[key];
            break;
        }
    }

    return `<span class="px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight ${style.badge}">${cleanVal}</span>`;
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
