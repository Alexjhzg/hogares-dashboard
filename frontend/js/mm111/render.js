import { state } from '../core/index.js';
import { $ } from '../utils/index.js';
import { USO_STYLES, RAZON_STYLES } from '../core/index.js';

/**
 * Initializes or updates the Tabulator instance for MM-111.
 */
export function updateMM111Grid(records) {
    if (typeof Tabulator === 'undefined') {
        console.error('Tabulator not found');
        return;
    }

    const rows = (records || []).map((rec, i) => {
        // Calle/Rumbo
        let calleParts = [];
        if (rec['S1/G_P9/GP10_0b']) calleParts.push(rec['S1/G_P9/GP10_0b']);
        if (rec['S1/P_nomsect']) calleParts.push(rec['S1/P_nomsect']);
        for (let j = 1; j <= 4; j++) {
            const etiq = rec[`S1/G_P9/gp10_${j}_etiq`];
            const val = rec[`S1/G_P9/GP10_${j}b`];
            if (etiq && val) calleParts.push(`${etiq} ${val}`);
        }
        const calle = calleParts.length > 0 ? calleParts.join(', ') : (rec['S1/direccion'] || '-');

        // Nro Casa / Contacto (in10)
        const nro = rec._meta?.nroCasa || rec['control_de_la_entrevista/in10'] || rec['control_entrevista/in10'] || rec['in10'] || rec['S1/in10'] || '-';
        // Referencia / Descripción
        const ref = rec['control_de_la_entrevista/in11'] || rec['control_entrevista/in11'] || '-';

        return {
            linea: rec['group_sh53u78/n_linea'] || (i + 1),
            manzana: rec['S1/manzana'] || '-',
            parcela: rec['S1/parcela'] || '-',
            edificacion: rec['S1/Edificaci_n'] || rec['S1/edificacion'] || '-',
            estructura: rec['S1/estructura'] || rec['S1/unidad'] || '-',
            calle: calle,
            listadoCalleNro: nro,
            nroCasa: nro,
            descripcion: ref,
            residente: rec._meta.residente || '-',
            panel: '-', // No se captura actualmente en Kobo
            serie: rec['group_sh53u78/n_serie'] || '-',
            razon: rec['Condici_n_de_ocupaci_n/condicion_de_ocupacion'] || rec._meta.condicion || '-',
            observaciones: rec._meta.observaciones || '-',
            fecha: rec._meta.fecha_entrevista || '-',
            duracion: rec._meta.durMin,
            uso: rec['S1/Uso_de_la_Unidad_inmobiliaria'] || rec._meta.uso || '-',
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

function listadoMM111Formatter(cell) {
    const data = cell.getData();
    const desc = data.descripcion || '-';
    const res = data.residente || '-';
    return `
        <div class="flex flex-col gap-1 py-1 font-sans text-xs">
            <div class="text-slate-800 dark:text-slate-200 font-semibold border-b border-slate-100 dark:border-slate-800/40 pb-1 leading-normal">${desc}</div>
            <div class="text-[10px] text-slate-500 mt-0.5 leading-normal">
                <span class="font-black text-slate-400 dark:text-slate-500 mr-1 uppercase">NOMBRE:</span> ${res}
            </div>
        </div>`;
}

function initMM111Table(initialData) {
    const isMobile = window.innerWidth < 768;

    state.mm111Table = new Tabulator("#mm111Grid", {
        data: initialData,
        layout: isMobile ? "fitDataFill" : "fitColumns",
        height: "100%",
        responsiveLayout: "collapse",
        placeholder: "<div class='p-12 text-center text-slate-400 font-medium'>Seleccione un número de Control para visualizar el listado de las encuestas.</div>",
        columns: [
            { formatter: "responsiveCollapse", width: 32, minWidth: 32, hozAlign: "center", headerSort: false, resizable: false, responsive: 0 },
            {
                title: "Línea", field: "linea", width: 65, hozAlign: "center", responsive: 0,
                formatter: cell => `<span class="font-mono font-bold text-slate-700 dark:text-slate-200">${cell.getValue()}</span>`
            },
            { title: "Manz.", field: "manzana", width: 65, hozAlign: "center", responsive: 1 },
            { title: "Parc.", field: "parcela", width: 65, hozAlign: "center", responsive: 1 },
            { title: "Edif.", field: "edificacion", width: 65, hozAlign: "center", responsive: 1 },
            { title: "Estr.", field: "estructura", width: 65, hozAlign: "center", responsive: 1 },
            { title: "Calle / Rumbo", field: "calle", minWidth: 160, responsive: 0, formatter: "textarea" },
            { title: "Listado C./N° Casa", field: "listadoCalleNro", minWidth: 140, hozAlign: "center", responsive: 0, formatter: cell => `<span class="font-mono font-bold text-slate-700 dark:text-slate-200">${cell.getValue()}</span>` },
            { title: "Listado MM-111", field: "descripcion", minWidth: 240, responsive: 0, formatter: listadoMM111Formatter },
            { title: "Panel", field: "panel", width: 60, hozAlign: "center", responsive: 2 },
            { title: "Serie", field: "serie", width: 60, hozAlign: "center", responsive: 2, formatter: cell => `<span class="font-mono opacity-70">${cell.getValue()}</span>` },
            { title: "Condición Inclusión", field: "razon", minWidth: 150, responsive: 0, formatter: badgeRazonFormatter },
            { title: "Observaciones", field: "observaciones", minWidth: 130, responsive: 2, formatter: "textarea" },
            { title: "Fecha", field: "fecha", width: 95, hozAlign: "center", responsive: 1 },
            {
                title: "Duración", field: "duracion", width: 90, hozAlign: "center",
                formatter: cell => {
                    const rawVal = cell.getValue();
                    if (rawVal === null || rawVal === undefined || isNaN(rawVal)) return '<span class="text-slate-400">—</span>';
                    
                    const val = Math.round(rawVal);
                    const isShort = val < 5;
                    const badgeColor = isShort 
                        ? 'bg-red-500/10 text-red-500 border border-red-500/20 font-black animate-pulse' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold';
                    return `<span class="px-2 py-0.5 rounded text-[10px] ${badgeColor}">${val} min</span>`;
                }
            },
            // Extras
            { title: "Uso", field: "uso", minWidth: 120, formatter: badgeUsoFormatter },
            {
                title: "Encuestador", field: "encuestador", width: 100, hozAlign: "center",
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
    ['mm111Entidad', 'mm111Municipio', 'mm111Parroquia', 'mm111CPoblado']
        .forEach(id => { if ($(id)) $(id).textContent = '---'; });
    ['mm111EntidadCod', 'mm111MunicipioCod', 'mm111ParroquiaCod', 'mm111CPobladoCod']
        .forEach(id => { if ($(id)) $(id).textContent = '--'; });
    ['mm111Segmento', 'mm111Sector', 'mm111Nodo', 'mm111Semana', 'mm111ControlMaestro', 'mm111Lote', 'mm111Duracion']
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
        const program = state.assetName && state.assetName.toUpperCase().includes('EHM') ? 'EHM' : 'ESCA';

        resultsList.innerHTML = filtered.map((c, i) => {
            const ctrlCode = String(c.control).slice(-4).padStart(4, '0');
            
            // 1. Calculate planned viviendas
            let planif = 0;
            if (state.planificacionData?.por_semana) {
                state.planificacionData.por_semana.forEach(item => {
                    if (item.programa === program && String(item.control).padStart(4, '0') === ctrlCode) {
                        planif += item.n_viviendas || 0;
                    }
                });
            }
            
            // 2. Count observed types for this control in rawData
            let tipoA = 0, tipoB = 0, tipoC = 0;
            state.rawData.forEach(r => {
                const m = r._meta;
                if (m && m.control) {
                    const rCtrlCode = String(m.control).slice(-4).padStart(4, '0');
                    if (rCtrlCode === ctrlCode) {
                        if (m.tipo_vivienda === 'TIPO A') tipoA++;
                        else if (m.tipo_vivienda === 'TIPO B') tipoB++;
                        else if (m.tipo_vivienda === 'TIPO C') tipoC++;
                    }
                }
            });
            
            // 3. Compute Rate
            const divisor = planif - (tipoB + tipoC);
            const rate = divisor > 0 ? Math.round((tipoA / divisor) * 100) : 0;
            
            // 4. Color coding
            const badgeColorClass = rate > 0 
                ? 'bg-red-500/10 text-red-500 border border-red-500/20' 
                : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20';

            return `
                <div class="result-item p-3 hover:bg-brand-blue/10 dark:hover:bg-brand-blue/20 rounded-xl cursor-pointer transition-all flex items-center justify-between group" 
                     data-value="${c.control}" data-index="${i}">
                   <div class="flex flex-col">
                      <span class="text-sm font-bold text-slate-700 dark:text-white group-hover:text-brand-blue">${c.control}</span>
                      <div class="flex items-center gap-2 mt-0.5">
                        <span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider">${c.mun}</span>
                        ${c.seg ? `<span class="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700"></span><span class="text-[9px] text-brand-blue/60 font-bold uppercase">Ség: ${c.seg}</span>` : ''}
                      </div>
                   </div>
                   <div class="flex items-center gap-2">
                      <span class="text-[9px] font-black px-2 py-0.5 rounded-md ${badgeColorClass}">
                         No Resp: ${rate}%
                      </span>
                      <div class="h-6 w-6 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                         <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-brand-blue"></i>
                      </div>
                   </div>
                </div>
            `;
        }).join('');
    } else {
        resultsList.innerHTML = `
            <div class="p-8 text-center flex flex-col items-center gap-2">
                <i data-lucide="search-x" class="w-8 h-8 text-slate-300"></i>
                <p class="text-xs text-slate-400 font-medium">No se encontraron resultados para "${query}"</p>
            </div>`;
    }

    if (window.lucide) lucide.createIcons();
}
