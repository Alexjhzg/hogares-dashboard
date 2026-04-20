/**
 * ─── Main Entry Point (Refactorized) ──────────────────────────────────────────
 * Orchestrates all modules. This is the only file loaded by index.html.
 */

import { state }            from './state.js';
import { $ }                from './helpers.js';
import { loadAssets, loadData } from './api.js';
import { processData }      from './dataProcessor.js';
import { populateFilters, setRenderAll } from './filters.js';
import { updateGrid, renderRankingTable } from './table.js';
import { renderMap, initVerRutaButton } from './map.js';
import { closeDetailModal } from './modal.js';
import { renderMM111 }      from './mm111.js';
import { renderInconsistencias } from './inconsistencias.js';
import { 
    updateChartsTheme, 
    renderChartEncuestador, renderChartDuracion, renderChartHorario, 
    renderChartHistograma, renderChartCondicion, renderChartUso, 
    renderChartPorDia, renderChartResumenSemanal, renderChartHoraTransmision
} from './charts.js';

// Sub-modules
// UI Layout Components
import { injectLayout } from './ui/layout.js';

import { initTheme } from './main/theme.js';
import { updateKPIs } from './main/kpis.js';
import { switchTab } from './main/navigation.js';
import { setMapState } from './main/map-layout.js';
import { bindEvents } from './main/events.js';

console.log('main.js: Modular orchestrator initializing ✓');

// ── Render Orchestration ──────────────────────────────────────────────────────

function renderAll() {
    console.log('main.js: renderAll() starting');
    try { updateKPIs(); } catch (e) { console.error('KPI Update Error:', e); }
    
    // Charts: Each wrapped to prevent cascading failure
    const chartFn = [
        renderChartEncuestador, renderChartDuracion, renderChartHorario, renderChartHoraTransmision,
        renderChartHistograma, renderChartCondicion, renderChartUso, 
        renderChartPorDia, renderChartResumenSemanal,
    ];
    
    chartFn.forEach(fn => {
        try { fn(); } catch (e) { console.warn(`Chart Renderer Error (${fn.name}):`, e); }
    });

    try { renderMap(); } catch (e) { console.error('Map Render Error:', e); }
    try { updateGrid(); } catch (e) { console.error('Grid Update Error:', e); }
    try { renderRankingTable(); } catch (e) { console.error('Ranking Table Error:', e); }

    try { renderMM111(); } catch (e) { console.error('MM111 Error:', e); }
    try { renderInconsistencias(); } catch (e) { console.error('Inconsistencias Error:', e); }
    
    if (window.lucide) lucide.createIcons();
}

// Inject renderAll into filters to avoid circular dependencies
setRenderAll(renderAll);

const onProcessData = () => {
    processData();
    populateFilters();
    state.filtered = [...state.rawData];
    renderAll();
};

// ── Init Dashboard ───────────────────────────────────────────────────────────

async function init() {
    // 1. Inject modular HTML fragments before initializing modules
    injectLayout();

    // 2. Init Core UI
    initTheme();

    console.log('main.js: init() start');
    
    updateCurrentDate();
    
    // Map initial state
    setMapState('normal');

    // Event Binding
    bindEvents({
        onProcessData,
        renderRankingTable,
        closeDetailModal
    });

    checkLibraryHealth();
    
    // Parallel discovery and initial data load
    const { loadGeoJSONData, loadControlsData } = await import('./map.js');
    
    Promise.allSettled([
        loadGeoJSONData(),
        loadControlsData().then(() => {
            if (state.rawData.length > 0) {
                console.log('main.js: Refreshing data with catalog index…');
                onProcessData();
            }
        }),
        loadAssets(uid => loadData(uid, onProcessData))
    ]).then(() => {
        console.log('main.js: Bootstrap phase completed.');
        if (window.lucide) lucide.createIcons();
    });
}

function updateCurrentDate() {
    const display = $('currentDateDisplay');
    if (display) {
        display.textContent = new Date().toLocaleDateString('es-ES', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }
}

function checkLibraryHealth() {
    const missing = [];
    if (typeof Tabulator === 'undefined') missing.push('Tabulator');
    if (typeof Chart === 'undefined') missing.push('Chart.js');
    if (typeof L === 'undefined') missing.push('Leaflet');
    
    const warn = $('libCheckWarn');
    if (missing.length > 0) {
        console.error('CRITICAL: Missing libraries:', missing.join(', '));
        if (warn) warn.classList.remove('hidden');
    } else {
        if (warn) warn.classList.add('hidden');
    }
}

// ── DOMContentLoaded ──────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    init();
    initVerRutaButton();
});

// Expose some functions for debugging / special triggers if needed (not recommended)
window.setMapStateForDebug = setMapState;
window.switchTabForDebug = switchTab;
