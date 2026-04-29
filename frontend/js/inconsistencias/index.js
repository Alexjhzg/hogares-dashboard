/**
 * ─── Inconsistencias (Refactorized Orchestrator) ──────────────────────────────
 * Manages the data quality audit dashboard, including summary cards,
 * local search filters, and the detailed audit grid.
 */

import { state } from '../core/index.js';
import { ALERT_MAP } from '../core/index.js';
import { $ } from '../utils/index.js';

// Sub-modules
import { renderEmptyState, generateCardHTML } from './cards.js';
import { updateInconsistenciasTable } from './table.js';
import { filters, bindInconsistenciasEvents } from './ui-events.js';

/**
 * Main entry point for rendering the inconsistencies tab.
 * Orchestrates card summaries, local filtering, and the Tabulator grid.
 */
export function renderInconsistencias() {
    const container = $('inconsistenciasContainer');
    if (!container) return;

    // 1. Initial Event Binding
    bindInconsistenciasEvents(renderInconsistencias);

    // 2. Data Preparation: Collect all records with alerts
    const globalAlertedRecs = state.filtered.filter(r => r._meta && r._meta.hasAlerts);

    // 3. Counting alerts by code
    const countByCode = {};
    globalAlertedRecs.forEach(r => {
        r._meta.alertas.forEach(code => {
            countByCode[code] = (countByCode[code] || 0) + 1;
        });
    });

    const totalAlertas = globalAlertedRecs.length;

    // 4. Update Alert Search Dropdown
    _updateAlertSelect(countByCode);

    // 5. Render Summary Cards
    _renderSummaryCards(countByCode, totalAlertas);

    // 6. Apply Local Filtering (Search + Selected Card)
    const filteredRows = _getFilteredRows(globalAlertedRecs);

    // 7. Update Audit Table
    updateInconsistenciasTable(filteredRows);
}

/**
 * Updates the alert filter dropdown in the UI.
 * @private
 */
function _updateAlertSelect(countByCode) {
    const selectEl = $('incFilterAlerta');
    if (!selectEl) return;

    const codeEntries = Object.entries(countByCode).sort((a, b) => b[1] - a[1]);
    const opts = ['<option value="">Todas las alertas</option>'];
    codeEntries.forEach(([code, count]) => {
        const label = ALERT_MAP[code] ? ALERT_MAP[code].label : code;
        const sel = (code === filters.currentAlertFilter) ? 'selected' : '';
        opts.push(`<option value="${code}" ${sel}>${label} (${count})</option>`);
    });
    
    const newHTML = opts.join('');
    if (selectEl.innerHTML !== newHTML) {
        selectEl.innerHTML = newHTML;
    }
}

/**
 * Renders the top summary cards grid.
 * @private
 */
function _renderSummaryCards(countByCode, totalAlertas) {
    const cardsEl = $('inconsistenciasCards');
    if (!cardsEl) return;

    if (totalAlertas === 0) {
        cardsEl.innerHTML = renderEmptyState();
    } else {
        const sorted = Object.entries(countByCode).sort((a, b) => b[1] - a[1]);
        cardsEl.innerHTML = sorted.map(([code, count]) => 
            generateCardHTML(code, count, filters.currentAlertFilter)
        ).join('');
    }
}

/**
 * Filters the alerted records based on local UI state.
 * @private
 */
function _getFilteredRows(records) {
    let results = records;

    // Filter by specific alert type (from card or select)
    if (filters.currentAlertFilter) {
        results = results.filter(r => r._meta.alertas.includes(filters.currentAlertFilter));
    }

    // Filter by search query (name, cedula, control)
    if (filters.currentSearchQuery) {
        results = results.filter(r => {
            const m = r._meta;
            return (m.nombre && m.nombre.toLowerCase().includes(filters.currentSearchQuery)) ||
                   (m.cedula && m.cedula.toLowerCase().includes(filters.currentSearchQuery)) ||
                   (m.control && m.control.toLowerCase().includes(filters.currentSearchQuery));
        });
    }

    // Map to Tabulator-ready objects
    return results.sort((a, b) => {
        const diff = b._meta.alertas.length - a._meta.alertas.length;
        if (diff !== 0) return diff;
        return (b._meta.fecha || '').localeCompare(a._meta.fecha || '');
    }).map(r => ({
        _rec: r,
        nombre: r._meta.nombre,
        cedula: r._meta.cedula,
        control: r._meta.control || '—',
        fecha: r._meta.fecha || '—',
        semana: r._meta.semana || '—',
        alertas: r._meta.alertas,
    }));
}
