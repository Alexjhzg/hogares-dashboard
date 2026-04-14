// ─── Tables (Tabulator) ──────────────────────────────────────────────────────
// Manages the DB Raw Explorer Tabulator grid, the ranking leaderboard table,
// and the agent score cards.

import { state } from './state.js?v=39';
import { ROWS_PER_PAGE, ALERT_MAP, IS_INE } from './config.js?v=39';
import { $ } from './helpers.js?v=39';
import { applyFilters } from './filters.js?v=39';
import { showDetailModal } from './modal.js?v=39';

// ── DB Raw Explorer ───────────────────────────────────────────────────────────

function initGrid(initialData = []) {
    if (state.detailTable) return;
    state.detailTable = new Tabulator('#detailGrid', {
        data: initialData,
        layout: 'fitColumns',
        height: '100%',
        pagination: true,
        paginationSize: ROWS_PER_PAGE,
        paginationSizeSelector: [10, 25, 50, 100],
        movableColumns: true,
        responsiveLayout: 'collapse',
        clipboard: true,
        placeholder: '<div style="padding:40px;text-align:center;color:var(--text-muted);font-size:14px;font-family:Inter,sans-serif;">Cargando base de datos...</div>',
        columnHeaderVertAlign: 'bottom',
        columns: [
            { formatter: 'responsiveCollapse', width: 30, minWidth: 30, hozAlign: 'center', headerSort: false, resizable: false, responsive: 0 },
            {
                title: 'Identificación', frozen: true,
                columns: [
                    { title: 'Cédula',  field: 'cedula',  headerFilter: 'input', minWidth: 90,  responsive: 0 },
                    { title: 'Nombre',  field: 'nombre',  headerFilter: 'input', minWidth: 140, responsive: 0 },
                    { title: 'Control', field: 'control', headerFilter: 'input', width: 90,     responsive: 0 },
                ]
            },
            {
                title: 'Contexto',
                columns: [
                    { title: 'Fecha',     field: 'fecha',     headerFilter: 'input', width: 90, sorter: 'date', responsive: 1 },
                    { title: 'Municipio', field: 'mun',       headerFilter: 'input', width: 90, responsive: 2 },
                    { title: 'Parroquia', field: 'par',       headerFilter: 'input', width: 90, responsive: 4 },
                    { title: 'Segm.',     field: 'segmento',  headerFilter: 'input', width: 70, hozAlign: 'center', responsive: 4 },
                    { title: 'Sect.',     field: 'sector',    headerFilter: 'input', width: 70, hozAlign: 'center', responsive: 4 },
                ]
            },
            {
                title: 'Métricas',
                columns: [
                    {
                        title: 'Estado', field: 'estado', width: 100, responsive: 0,
                        headerFilter: 'list', headerFilterParams: { valuesLookup: true, clearable: true },
                        formatter: cell => {
                            const v = cell.getValue();
                            const color = v === 'completada' ? '#10B981' : '#F59E0B';
                            const label = v === 'completada' ? 'EFECTIVA' : 'NO RESPUESTA';
                            return `<span style="color:${color};font-weight:700;font-size:10px;letter-spacing:0.02em">${label}</span>`;
                        }
                    },
                    {
                        title: 'Dur.', field: 'durMin', width: 70, hozAlign: 'center', responsive: 2,
                        formatter: cell => {
                            const v = cell.getValue();
                            if (v === null) return '—';
                            const color = v < 15 ? '#EF4444' : v < 25 ? '#F59E0B' : '#10B981';
                            return `<span style="color:${color};font-weight:800;font-family:Outfit,sans-serif;">${v}m</span>`;
                        }
                    },
                    {
                        title: 'Alertas', field: 'alertas', minWidth: 160, headerSort: false, responsive: 2,
                        formatter: cell => {
                            const codes = cell.getValue();
                            if (!codes || codes.length === 0) {
                                return '<span style="color:var(--text-muted);font-size:10px">—</span>';
                            }
                            return codes.map(code => {
                                const rule = ALERT_MAP[code];
                                const label = rule ? rule.label : code;
                                const detail = rule ? rule.detail.replace(/\n/g, ' ') : '';
                                return `<span title="${detail}" style="display:inline-flex;align-items:center;gap:3px;background:rgba(239,68,68,0.15);color:#EF4444;border:1px solid rgba(239,68,68,0.3);border-radius:4px;padding:1px 5px;font-size:9px;font-weight:700;letter-spacing:0.02em;margin-right:3px;white-space:nowrap;">⚠ ${label}</span>`;
                            }).join('');
                        }
                    },
                ]
            },
            {
                title: 'Social',
                columns: [
                    { title: 'Hog.', field: 'hogares',  width: 50, hozAlign: 'center', responsive: 4 },
                    { title: 'Pers.', field: 'personas', width: 50, hozAlign: 'center', responsive: 4 },
                ]
            },
            {
                title: 'Acciones', width: 120, headerSort: false, hozAlign: 'center', responsive: 0,
                formatter: () => `
                    <div class="flex gap-2">
                        <button class="tab-action-btn btn-view" data-action="view">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                            <span>VER</span>
                        </button>
                    </div>
                `,
                cellClick: (e, cell) => {
                    e.stopPropagation();
                    const btn = e.target.closest('button');
                    if (!btn) return;
                    const rec = cell.getData()._rec;
                    if (rec && btn.dataset.action === 'view') showDetailModal(rec);
                }
            }
        ],
        rowFormatter: row => {
            const data = row.getData();
            if (data.estado === 'completada')        row.getElement().classList.add('row-complete');
            else if (data.estado === 'no_respuesta') row.getElement().classList.add('row-no-respuesta');
            if (data.hasAlerts)                      row.getElement().classList.add('row-flagged');
        }
    });
    state.detailTable.on('rowClick', (e, row) => {
        const rec = row.getData()._rec;
        if (rec) showDetailModal(rec);
    });
}

export function updateGrid(data = state.filtered) {
    const rows = data.map(rec => {
        const m = rec._meta || {};
        return {
            _rec: rec,
            id:       m.control || rec._uuid,
            cedula:   m.cedula   || '',
            nombre:   m.nombre   || '',
            control:  m.control  || '',
            fecha:    m.fecha    || '',
            mun:      m.mun      || '',
            par:      m.par      || '',
            nodo:     m.nodo     || '',
            segmento: m.segmento || '',
            sector:   m.sector   || '',
            estado:   m.estado   || '',
            durMin:   m.durMin,
            alertas:  m.alertas  || [],
            hasAlerts: m.hasAlerts || false,
            flagDist: m.flag_distance_gt_500,
            flagDur:  m.flag_short_duration,
            hogares:  m.hogares  || 0,
            personas: m.totalPers || 0,
            lat: rec.lat || m.lat || (rec._geolocation ? rec._geolocation[0] : null),
            lng: rec.lng || m.lng || (rec._geolocation ? rec._geolocation[1] : null),
        };
    });

    if (!state.detailTable) {
        initGrid(rows);
    } else {
        try {
            state.detailTable.setData(rows);
        } catch (e) {
            console.warn('Tabulator setData delayed:', e.message);
            setTimeout(() => state.detailTable && state.detailTable.setData(rows), 100);
        }
    }
}

// ── Ranking Leaderboard ───────────────────────────────────────────────────────

/**
 * Renders the Agent Ranking table using Tabulator.
 * @param {Array} [rows] - Optional processed agent metrics. If missing, calculates from state.filtered.
 */
export function renderRankingTable(rows) {
    console.log('table.js: renderRankingTable() called at', new Date().toLocaleTimeString());

    // 1. Dependency & DOM Checks
    if (typeof Tabulator === 'undefined') {
        console.error('table.js: CRITICAL - Tabulator library is NOT loaded (global Tabulator is undefined).');
        return;
    }
    const container = document.querySelector('#rankingTable');
    if (!container) {
        console.warn('table.js: Container #rankingTable not found in DOM yet.');
        return;
    }

    // 2. Data Preparation
    if (!rows) {
        if (!state.filtered || !state.encMap) {
            console.warn('table.js: State not ready for ranking calculation.');
            return;
        }
        
        const validRecords = state.filtered.filter(r => r && r._meta);
        const encsInFiltered = new Set(validRecords.map(r => r._meta.cedula));
        rows = Object.values(state.encMap).filter(m => encsInFiltered.has(m.cedula));
        
        const sortFns = {
            encuestas:  (a, b) => (b.encuestas || 0) - (a.encuestas || 0),
            completadas:(a, b) => (b.completadas || 0) - (a.completadas || 0),
            eficiencia: (a, b) => (b.pctCompleta || 0) - (a.pctCompleta || 0),
            personas:   (a, b) => (b.personas || 0) - (a.personas || 0),
        };
        rows.sort(sortFns[state.currentSort] || sortFns.eficiencia);
    }

    const tableData = rows.map((m, i) => ({
        pos: i + 1,
        nombre: m.nombre || 'Sin Nombre',
        cedula: m.cedula || 'N/A',
        encuestas: m.encuestas || 0,
        completadas: m.completadas || 0,
        pctCompleta: m.pctCompleta || 0,
        personas: m.personas || 0,
    }));

    console.log(`table.js: Ready to render ${tableData.length} records in leaderboard.`);
    if (tableData.length > 0) console.table(tableData.slice(0, 3));

    // 3. (Re)Initialization or Update
    if (!state.rankingTabulator) {
        console.log('table.js: Creating NEW Tabulator instance for #rankingTable');
        state.rankingTabulator = new Tabulator('#rankingTable', {
            data: tableData,
            layout: 'fitColumns',
            height: '420px',
            responsiveLayout: 'collapse',
            persistence: false,
            placeholder: '<div style="padding:40px;text-align:center;color:#64748b;font-size:13px;font-family:Inter,sans-serif;">Sin datos disponibles</div>',
            initialSort: [{ column: 'pctCompleta', dir: 'desc' }],
            columns: [
                { formatter: 'responsiveCollapse', width: 30, minWidth: 30, hozAlign: 'center', headerSort: false, resizable: false, responsive: 0 },
                {
                    title: '#', field: 'pos', width: 55, hozAlign: 'center', headerSort: false, frozen: true, responsive: 0,
                    formatter: cell => {
                        const v = cell.getValue();
                        return `<span style="color:#64748b;font-weight:800;font-size:12px;">${v}</span>`;
                    }
                },
                {
                    title: 'Encuestador', field: 'nombre', minWidth: 140, frozen: true, responsive: 0,
                    formatter: cell => {
                        const d = cell.getData();
                        const isIne = IS_INE.has(d.cedula);
                        const badge = isIne ? '<span style="background:#3B82F6;color:white;font-size:8px;font-weight:900;padding:1px 4px;border-radius:4px;margin-left:6px;vertical-align:middle;">INE</span>' : '';
                        return `<div><div style="font-weight:800;color:currentColor;font-size:12px;line-height:1.3;">${d.nombre}${badge}</div><div style="font-size:9px;color:#94a3b8;font-weight:600;">${d.cedula}</div></div>`;
                    }
                },
                { title: 'Volumen', field: 'encuestas', hozAlign: 'center', width: 90, sorter: 'number', responsive: 0,
                    formatter: cell => `<span style="font-weight:800;color:#3B82F6;font-size:14px">${cell.getValue()}</span>` },
                {
                    title: '% Efectividad', field: 'pctCompleta', hozAlign: 'center', minWidth: 120, sorter: 'number', responsive: 0,
                    formatter: cell => {
                        const v = cell.getValue();
                        const color = v >= 80 ? '#10B981' : v >= 50 ? '#F59E0B' : '#EF4444';
                        return `<div style="display:flex;flex-direction:column;align-items:center;gap:3px;padding:4px 0"><span style="font-weight:900;color:${color};font-size:15px;">${v}%</span><div style="width:100%;max-width:80px;height:6px;background:rgba(0,0,0,0.05);border-radius:10px;overflow:hidden"><div style="width:${v}%;height:100%;background:${color};border-radius:10px;"></div></div></div>`;
                    }
                },
                { title: 'Pers.', field: 'personas', hozAlign: 'center', width: 70, sorter: 'number', responsive: 2,
                    formatter: cell => `<span style="font-weight:600;color:#64748b">${cell.getValue()}</span>` },
            ],
        });
        state.rankingTabulator.on('rowClick', (e, row) => {
            const cedula = row.getData().cedula;
            const filterEl = document.getElementById('filterEncuestador');
            if (cedula && filterEl) {
                filterEl.value = cedula;
                window.applyFilters && window.applyFilters();
            }
        });
    } else {
        console.log('table.js: Updating data in EXISTING Tabulator instance.');
        state.rankingTabulator.setData(tableData).then(() => {
            state.rankingTabulator.redraw(true);
        });
    }
}

// ── Agent Score Cards ─────────────────────────────────────────────────────────

export function renderEncuestadorCards() {
    const encsInFiltered = new Set(state.filtered.map(r => r._meta.cedula));
    const rows = Object.values(state.encMap)
        .filter(m => encsInFiltered.has(m.cedula))
        .sort((a, b) => b.score - a.score);

    $('cardsGrid').innerHTML = rows.slice(0, 12).map((m, idx) => `
    <div class="card-premium flex flex-col gap-4">
      <div class="flex justify-between items-start">
        <div class="font-black text-white leading-tight truncate w-full" title="${m.nombre}">${m.nombre}</div>
      </div>
      <div class="text-[10px] text-slate-500 font-bold tracking-wider uppercase">ID: ${m.cedula}</div>
      <div class="grid grid-cols-3 gap-2 mt-2">
        <div class="p-2 bg-brand-950/50 rounded-lg text-center">
            <div class="text-xs font-black text-brand-blue">${m.encuestas}</div>
            <div class="text-[8px] uppercase text-slate-600 font-bold">Enc.</div>
        </div>
        <div class="p-2 bg-brand-950/50 rounded-lg text-center">
            <div class="text-xs font-black text-brand-green">${m.completadas}</div>
            <div class="text-[8px] uppercase text-slate-600 font-bold">Cmpl.</div>
        </div>
        <div class="p-2 bg-brand-950/50 rounded-lg text-center">
            <div class="text-xs font-black text-brand-orange">${m.pctCompleta}%</div>
            <div class="text-[8px] uppercase text-slate-600 font-bold">Efect.</div>
        </div>
      </div>
      <div class="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
        <span class="text-[10px] text-slate-500 font-medium">Municipios: ${m.municipios.size}</span>
        <div class="w-8 h-8 rounded-full border border-brand-blue/30 flex items-center justify-center text-[10px] font-black text-brand-blue">#${idx + 1}</div>
      </div>
    </div>`).join('');
}
