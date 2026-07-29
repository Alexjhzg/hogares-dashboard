import { state } from '../core/index.js';
import { applyFilters } from '../filters/index.js';
import { rankingNombreFormatter, efectividadFormatter, noRespuestaFormatter, desgloseTipologiaFormatter } from './formatters.js';

export function renderRankingTable(rows) {
    console.log('table.js: renderRankingTable() initializing leaderboard...');

    if (typeof Tabulator === 'undefined') {
        console.error('table.js: CRITICAL - Tabulator library is NOT loaded.');
        return;
    }
    
    const container = document.querySelector('#rankingTable');
    if (!container) return;

    // 1. Data Preparation
    if (!rows) {
        if (!state.filtered || !state.encMap) return;
        
        const validRecords = state.filtered.filter(r => r && r._meta);
        const encsInFiltered = new Set(validRecords.map(r => r._meta.cedula));
        rows = Object.values(state.encMap).filter(m => encsInFiltered.has(m.cedula));
        
        const sortFns = {
            norespuesta:(a, b) => (b.pctNoRespuesta || 0) - (a.pctNoRespuesta || 0),
            encuestas:  (a, b) => (b.encuestas || 0) - (a.encuestas || 0),
            completadas:(a, b) => (b.completadas || 0) - (a.completadas || 0),
            eficiencia: (a, b) => (b.pctCompleta || 0) - (a.pctCompleta || 0),
            personas:   (a, b) => (b.personas || 0) - (a.personas || 0),
        };
        const currentSort = state.currentSort || 'norespuesta';
        rows.sort(sortFns[currentSort] || sortFns.norespuesta);
    }

    const tableData = rows.map((m, i) => ({
        pos: i + 1,
        nombre: m.nombre || 'Sin Nombre',
        cedula: m.cedula || 'N/A',
        encuestas: m.encuestas || 0,
        completadas: m.completadas || 0,
        noRespuesta: m.noRespuesta || 0,
        pctCompleta: m.pctCompleta || 0,
        pctNoRespuesta: m.pctNoRespuesta || 0,
        tipoA: m.tipoA || 0,
        tipoB: m.tipoB || 0,
        tipoC: m.tipoC || 0,
        tipoE: m.tipoE !== undefined ? m.tipoE : (m.completadas || 0),
        personas: m.personas || 0,
        alertasCount: m.alertasCount || 0,
    }));

    // 2. Tabulator Instance Management
    const isMobile = window.innerWidth < 640;

    if (!state.rankingTabulator) {
        state.rankingTabulator = new Tabulator('#rankingTable', {
            data: tableData,
            layout: isMobile ? 'fitDataFill' : 'fitColumns',
            height: '460px',
            responsiveLayout: 'collapse',
            persistence: false,
            placeholder: '<div style="padding:40px;text-align:center;color:#64748b;font-size:13px;font-family:Inter,sans-serif;">Sin datos disponibles</div>',
            initialSort: [{ column: 'pctNoRespuesta', dir: 'desc' }],
            columns: [
                { formatter: 'responsiveCollapse', width: 30, minWidth: 30, hozAlign: 'center', headerSort: false, resizable: false, responsive: 0 },
                {
                    title: '#', field: 'pos', width: 42, hozAlign: 'center', headerSort: false, frozen: !isMobile, responsive: 0,
                    formatter: cell => `<span style="color:#64748b;font-weight:800;font-size:12px;">${cell.getValue()}</span>`
                },
                { title: 'Encuestador', field: 'nombre', minWidth: 130, frozen: !isMobile, responsive: 0, formatter: rankingNombreFormatter },
                { title: 'Volumen', field: 'encuestas', hozAlign: 'center', width: 85, sorter: 'number', responsive: 0,
                    formatter: cell => `<span style="font-weight:800;color:#3B82F6;font-size:13px">${cell.getValue()}</span>` },
                { title: 'No Resp. (A)', field: 'noRespuesta', hozAlign: 'center', width: 85, sorter: 'number', responsive: 1,
                    formatter: cell => `<span style="font-weight:800;color:#8B5CF6;font-size:13px">${cell.getValue()}</span>` },
                { title: '% No Resp.', field: 'pctNoRespuesta', hozAlign: 'center', minWidth: 110, sorter: 'number', responsive: 0, formatter: noRespuestaFormatter },
                { title: '% Efectividad', field: 'pctCompleta', hozAlign: 'center', minWidth: 110, sorter: 'number', responsive: 2, formatter: efectividadFormatter },
                { title: 'Tipo', field: 'tipoA', hozAlign: 'center', minWidth: 180, headerSort: false, responsive: 2, formatter: desgloseTipologiaFormatter },
                { title: 'Alertas', field: 'alertasCount', hozAlign: 'center', width: 75, sorter: 'number', responsive: 2,
                    formatter: cell => {
                        const val = cell.getValue();
                        return val > 0 
                            ? `<span style="font-weight:900;color:#EF4444;background:rgba(239,68,68,0.12);padding:2px 6px;border-radius:4px;">⚠ ${val}</span>` 
                            : `<span style="color:#94a3b8;">0</span>`;
                    }
                },
            ],
        });
        
        state.rankingTabulator.on('rowClick', (e, row) => {
            const cedula = row.getData().cedula;
            const filterEl = document.getElementById('filterEncuestador');
            if (cedula && filterEl) {
                filterEl.value = cedula;
                if (typeof applyFilters === 'function') applyFilters();
            }
        });
    } else {
        state.rankingTabulator.setData(tableData).then(() => {
            state.rankingTabulator.redraw(true);
        });
    }
}
