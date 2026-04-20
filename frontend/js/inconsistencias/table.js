/**
 * ─── Inconsistencias Table ───────────────────────────────────────────────────
 * Manages the Tabulator instance for the data quality audit view.
 */

import { state } from '../state.js';
import { ALERT_MAP } from '../config.js';
import { showDetailModal } from '../modal.js';

/**
 * Initializes the Tabulator table for inconsistencies.
 * @param {Array} initialData 
 */
export function initInconsistenciasTable(initialData = []) {
    if (state.inconsistenciasTabulator) return;
    
    state.inconsistenciasTabulator = new Tabulator('#inconsistenciasTable', {
        data: initialData,
        layout: 'fitColumns',
        height: '500px',
        responsiveLayout: 'collapse',
        placeholder: '<div style="padding:40px;text-align:center;color:var(--text-muted);font-size:14px;font-family:Inter,sans-serif;">No hay inconsistencias para mostrar</div>',
        columnHeaderVertAlign: 'bottom',
        columns: [
            { formatter: 'responsiveCollapse', width: 30, minWidth: 30, hozAlign: 'center', headerSort: false, resizable: false, responsive: 0 },
            { 
                title: 'Encuestador', field: 'nombre', minWidth: 150, responsive: 0,
                formatter: cell => `<div style="font-weight:700;">${cell.getValue()}</div>`
            },
            { title: 'Cédula', field: 'cedula', width: 100, responsive: 2, cssClass: 'font-mono' },
            { title: 'Control', field: 'control', width: 100, responsive: 0, cssClass: 'font-mono text-brand-blue font-bold' },
            { title: 'Fecha', field: 'fecha', width: 100, responsive: 1, sorter: 'date' },
            { title: 'Semana', field: 'semana', width: 80, hozAlign: 'center', responsive: 1 },
            { 
                title: 'Alertas', field: 'alertas', minWidth: 200, headerSort: false, responsive: 0,
                formatter: cell => {
                    const codes = cell.getValue();
                    if (!codes) return '';
                    return codes.map(code => {
                        const rule = ALERT_MAP[code] || { label: code };
                        return `<span style="display:inline-flex;align-items:center;background:rgba(239,68,68,0.1);color:#EF4444;border:1px solid rgba(239,68,68,0.2);border-radius:4px;padding:1px 6px;font-size:9px;font-weight:700;margin-right:3px;white-space:nowrap;">${rule.label}</span>`;
                    }).join('');
                }
            }
        ],
    });

    state.inconsistenciasTabulator.on('rowClick', (e, row) => {
        const rec = row.getData()._rec;
        if (rec) showDetailModal(rec);
    });
}

/**
 * Updates the data in the audit table.
 * @param {Array} tableRows 
 */
export function updateInconsistenciasTable(tableRows) {
    if (!state.inconsistenciasTabulator) {
        initInconsistenciasTable(tableRows);
    } else {
        state.inconsistenciasTabulator.setData(tableRows);
    }
}
