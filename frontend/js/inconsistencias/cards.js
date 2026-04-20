/**
 * ─── Inconsistencias Cards ───────────────────────────────────────────────────
 * Handles the visual representation of alert summaries as interactive cards.
 */

import { ALERT_MAP } from '../config.js';

export const BADGE_COLORS = {
    'TIEMPO_CORTO_EHM':       { bg: '#F59E0B22', border: '#F59E0B', text: '#F59E0B' },
    'TIEMPO_CORTO_ESCA':      { bg: '#F59E0B22', border: '#F59E0B', text: '#F59E0B' },
    'TIEMPO_CORTO':           { bg: '#F59E0B22', border: '#F59E0B', text: '#F59E0B' },
    'TIEMPO_LARGO':           { bg: '#EF444422', border: '#EF4444', text: '#EF4444' },
    'APERT_LEJOS':            { bg: '#8B5CF622', border: '#8B5CF6', text: '#8B5CF6' },
    'FUERA_SEGMENTO':         { bg: '#EF444422', border: '#EF4444', text: '#EF4444' },
    'SEGMENTO_INCORRECTO':    { bg: '#EF444422', border: '#EF4444', text: '#EF4444' },
    'ARRANQUE_INCONSISTENTE': { bg: '#F59E0B22', border: '#F59E0B', text: '#F59E0B' },
    'LINEA_SERIE_INVALIDA':   { bg: '#EF444422', border: '#EF4444', text: '#EF4444' },
    'CEDULA_INVALIDA':        { bg: '#EF444422', border: '#EF4444', text: '#EF4444' },
    'INGRESO_ANOMALO':        { bg: '#F59E0B22', border: '#F59E0B', text: '#F59E0B' },
    'DESPLAZAMIENTO_ANOMALO': { bg: '#F59E0B22', border: '#F59E0B', text: '#F59E0B' },
};

/**
 * Renders the empty state HTML when no alerts are detected.
 * @returns {string} HTML string
 */
export function renderEmptyState() {
    return `
        <div class="col-span-full text-center py-10 text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="1.5" class="mx-auto mb-2 text-brand-green">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <p class="font-bold text-sm">Sin inconsistencias detectadas</p>
            <p class="text-xs mt-1 opacity-60">Todos los registros del filtro actual pasan las validaciones.</p>
        </div>`;
}

/**
 * Generates HTML for a summary alert card.
 * @param {string} code - Alert code
 * @param {number} count - Number of occurrences
 * @param {string} currentFilter - Currently active alert filter code
 * @returns {string} HTML string
 */
export function generateCardHTML(code, count, currentFilter) {
    const rule = ALERT_MAP[code] || { label: code };
    const c = BADGE_COLORS[code] || { bg: '#64748b22', border: '#64748b', text: '#64748b' };
    const isActive = currentFilter === code;
    
    // UI state classes
    const ringClass = isActive ? `ring-2 ring-offset-1 dark:ring-offset-[#0B1120]` : '';
    const styleRing = isActive ? `ring-color: ${c.border}; border-color: ${c.border};` : `border-color:${c.border}30;`;
    
    return `
    <div class="alert-card ${ringClass}"
         data-code="${code}"
         style="background:${c.bg}; ${styleRing};">
        <div class="min-w-0 pr-2">
            <div class="text-[10px] sm:text-xs font-black uppercase tracking-widest mb-0.5 truncate"
                 style="color:${c.text}" title="${rule.label}">${rule.label}</div>
            <div class="text-[9px] text-slate-500 font-mono truncate opacity-60">${code}</div>
        </div>
        <div class="text-xl sm:text-2xl font-black font-outfit shrink-0 ml-auto" style="color:${c.text}">${count}</div>
    </div>`;
}
