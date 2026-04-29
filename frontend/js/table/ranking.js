import { state } from '../core/index.js';
import { applyFilters } from '../filters/index.js';
import { rankingNombreFormatter, efectividadFormatter } from './formatters.js';

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

    // 2. Tabulator Instance Management
    if (!state.rankingTabulator) {
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
                    formatter: cell => `<span style="color:#64748b;font-weight:800;font-size:12px;">${cell.getValue()}</span>`
                },
                { title: 'Encuestador', field: 'nombre', minWidth: 140, frozen: true, responsive: 0, formatter: rankingNombreFormatter },
                { title: 'Volumen', field: 'encuestas', hozAlign: 'center', width: 90, sorter: 'number', responsive: 0,
                    formatter: cell => `<span style="font-weight:800;color:#3B82F6;font-size:14px">${cell.getValue()}</span>` },
                { title: '% Efectividad', field: 'pctCompleta', hozAlign: 'center', minWidth: 120, sorter: 'number', responsive: 0, formatter: efectividadFormatter },
                { title: 'Pers.', field: 'personas', hozAlign: 'center', width: 70, sorter: 'number', responsive: 2,
                    formatter: cell => `<span style="font-weight:600;color:#64748b">${cell.getValue()}</span>` },
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
