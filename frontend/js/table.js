// ─── Tables (Tabulator) ──────────────────────────────────────────────────────
// Manages the DB Raw Explorer Tabulator grid, the ranking leaderboard table,
// and the agent score cards.

import { state } from './state.js';
import { ROWS_PER_PAGE, ALERT_MAP } from './config.js';
import { $ } from './helpers.js';
import { applyFilters } from './filters.js';
import { showDetailModal } from './modal.js';

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

export function renderRankingTable() {
    const encsInFiltered = new Set(state.filtered.map(r => r._meta.cedula));
    let rows = Object.values(state.encMap).filter(m => encsInFiltered.has(m.cedula));

    const sortFns = {
        encuestas:  (a, b) => b.encuestas - a.encuestas,
        completadas:(a, b) => b.completadas - a.completadas,
        duracion:   (a, b) => (a.avgDur || 999) - (b.avgDur || 999),
        personas:   (a, b) => b.personas - a.personas,
        eficiencia: (a, b) => b.score - a.score,
    };
    rows.sort(sortFns[state.currentSort] || sortFns.encuestas);

    const tableData = rows.map((m, i) => ({
        pos: i + 1, nombre: m.nombre, cedula: m.cedula,
        encuestas: m.encuestas, completadas: m.completadas, pctCompleta: m.pctCompleta,
        avgDur: m.avgDur != null ? Math.round(m.avgDur) : null,
        personas: m.personas, municipios: m.municipios.size, score: m.score,
    }));

    if (!state.rankingTabulator) {
        state.rankingTabulator = new Tabulator('#rankingTable', {
            data: tableData, layout: 'fitColumns', height: '420px',
            responsiveLayout: 'collapse',
            placeholder: '<div style="padding:40px;text-align:center;color:var(--text-muted);font-size:13px;font-family:Inter,sans-serif;">Sin datos de agentes</div>',
            initialSort: [{ column: 'score', dir: 'desc' }],
            columns: [
                { formatter: 'responsiveCollapse', width: 30, minWidth: 30, hozAlign: 'center', headerSort: false, resizable: false, responsive: 0 },
                {
                    title: '#', field: 'pos', width: 55, hozAlign: 'center', headerSort: false, frozen: true, responsive: 0,
                    formatter: cell => {
                        const v = cell.getValue();
                        if (v === 1) return '<span style="font-size:18px" title="1er lugar">🥇</span>';
                        if (v === 2) return '<span style="font-size:18px" title="2do lugar">🥈</span>';
                        if (v === 3) return '<span style="font-size:18px" title="3er lugar">🥉</span>';
                        return `<span style="color:var(--text-muted);font-weight:800;font-size:12px;font-family:'Outfit',sans-serif">${v}</span>`;
                    }
                },
                {
                    title: 'Agente', field: 'nombre', minWidth: 140, frozen: true, responsive: 0,
                    formatter: cell => {
                        const d = cell.getData();
                        return `<div><div style="font-weight:800;color:var(--text-primary);font-size:12px;line-height:1.3;font-family:Inter,sans-serif;">${d.nombre}</div><div style="font-size:9px;color:var(--text-muted);font-weight:600;letter-spacing:0.03em;font-family:Inter,sans-serif;">${d.cedula}</div></div>`;
                    }
                },
                { title: 'Vol.', field: 'encuestas', hozAlign: 'center', width: 65, sorter: 'number', responsive: 0,
                    formatter: cell => `<span style="font-weight:800;color:#3B82F6;font-family:'Outfit',sans-serif;font-size:14px">${cell.getValue()}</span>` },
                {
                    title: '% Efect.', field: 'pctCompleta', hozAlign: 'center', width: 90, sorter: 'number', responsive: 2,
                    formatter: cell => {
                        const v = cell.getValue();
                        const color = v >= 80 ? '#10B981' : v >= 50 ? '#F59E0B' : '#EF4444';
                        return `<div style="display:flex;flex-direction:column;align-items:center;gap:3px"><span style="font-weight:800;color:${color};font-size:12px;font-family:'Outfit',sans-serif">${v}%</span><div style="width:100%;height:4px;background:var(--border-medium);border-radius:4px;overflow:hidden"><div style="width:${v}%;height:100%;background:${color};border-radius:4px;transition:width 0.6s ease"></div></div></div>`;
                    }
                },
                {
                    title: 'Dur.', field: 'avgDur', hozAlign: 'center', width: 80, sorter: 'number', responsive: 3,
                    formatter: cell => {
                        const v = cell.getValue();
                        if (v === null) return '<span style="color:var(--text-muted)">—</span>';
                        let color, icon;
                        if (v < 15)       { color = '#EF4444'; icon = '⚡'; }
                        else if (v < 25)  { color = '#F59E0B'; icon = '⏱'; }
                        else              { color = '#10B981'; icon = '✓'; }
                        return `<span style="color:${color};font-weight:700;font-size:11px" title="${v} min promedio">${icon} ${v}m</span>`;
                    }
                },
                { title: 'Pers.', field: 'personas',   hozAlign: 'center', width: 65, sorter: 'number', responsive: 4,
                    formatter: cell => `<span style="font-weight:600;color:var(--text-muted)">${cell.getValue()}</span>` },
                { title: 'Mun.',  field: 'municipios', hozAlign: 'center', width: 60, sorter: 'number', responsive: 4,
                    formatter: cell => `<span style="font-weight:600;color:#8B5CF6">${cell.getValue()}</span>` },
                {
                    title: 'Score', field: 'score', hozAlign: 'center', width: 90, sorter: 'number', responsive: 0,
                    formatter: cell => {
                        const v = cell.getValue();
                        const color = v >= 70 ? '#10B981' : v >= 40 ? '#F59E0B' : '#EF4444';
                        return `<div style="display:flex;flex-direction:column;align-items:center;gap:3px"><span style="font-weight:900;color:${color};font-size:14px;font-family:'Outfit',sans-serif">${v}</span><div style="width:100%;height:5px;background:var(--border-medium);border-radius:4px;overflow:hidden"><div style="width:${v}%;height:100%;background:linear-gradient(90deg,${color},${color}aa);border-radius:4px;transition:width 0.6s ease"></div></div></div>`;
                    }
                },
            ],
        });
        state.rankingTabulator.on('rowClick', (e, row) => {
            const cedula = row.getData().cedula;
            if (cedula && $('filterEncuestador')) {
                $('filterEncuestador').value = cedula;
                applyFilters();
            }
        });
    } else {
        state.rankingTabulator.setData(tableData);
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
            <div class="text-xs font-black text-brand-green">${m.pctCompleta}%</div>
            <div class="text-[8px] uppercase text-slate-600 font-bold">Cmpl.</div>
        </div>
        <div class="p-2 bg-brand-950/50 rounded-lg text-center">
            <div class="text-xs font-black text-brand-orange">${m.score}</div>
            <div class="text-[8px] uppercase text-slate-600 font-bold">Pts.</div>
        </div>
      </div>
      <div class="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
        <span class="text-[10px] text-slate-500 font-medium">Municipios: ${m.municipios.size}</span>
        <div class="w-8 h-8 rounded-full border border-brand-blue/30 flex items-center justify-center text-[10px] font-black text-brand-blue">#${idx + 1}</div>
      </div>
    </div>`).join('');
}
