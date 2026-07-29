/**
 * ─── Main Entry Point (Refactorized) ──────────────────────────────────────────
 * Orchestrates all modules. This is the only file loaded by index.html.
 */

import { state }            from '../core/index.js';
import { $ }                from '../utils/index.js';
import { loadAssets, loadData, loadPlanificacionData } from '../api/index.js';
import { processData }      from '../data/index.js';
import { populateFilters, setRenderAll, initCustomPresets } from '../filters/index.js';
import { updateGrid, renderRankingTable } from '../table/index.js';
import { renderMap, initVerRutaButton, loadGeoJSONData, loadControlsData } from '../map/index.js';
import { closeDetailModal, navigateDetailModal } from '../modal/index.js';
import { renderMM111 }      from '../mm111/index.js';
import { renderInconsistencias } from '../inconsistencias/index.js';
import { 
    updateChartsTheme, 
    renderChartEncuestador, renderChartDuracion, renderChartHorario, 
    renderChartHistograma, renderChartCondicion, renderChartUso, renderChartClasificacion,
    renderChartPorDia, renderChartResumenSemanal, renderChartHoraTransmision
} from '../charts/index.js';

// Sub-modules
// UI Layout Components
import { injectLayout } from '../ui/index.js';

import { initTheme } from './theme.js';
import { updateKPIs, updateSubtiposBreakdown } from './kpis.js';
import { switchTab } from './navigation.js';
import { setMapState } from './map-layout.js';
import { bindEvents } from './events.js';

console.log('main/index.js: Modular orchestrator initializing ✓');

// ── Render Orchestration ──────────────────────────────────────────────────────

function renderAll() {
    console.log('main/index.js: renderAll() starting');
    try { updateKPIs(); } catch (e) { console.error('KPI Update Error:', e); }
    try { updateSubtiposBreakdown(); } catch (e) { console.warn('Subtipos Breakdown Error:', e); }
    
    // Charts: Each wrapped to prevent cascading failure
    const chartFn = [
        renderChartEncuestador, renderChartDuracion, renderChartHorario, renderChartHoraTransmision,
        renderChartHistograma, renderChartCondicion, renderChartUso, renderChartClasificacion,
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

const onProcessData = async () => {
    await processData();
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

    console.log('main/index.js: init() start');
    
    updateCurrentDate();
    
    // Map initial state
    setMapState('normal');

    // Event Binding
    bindEvents({
        onProcessData,
        renderRankingTable,
        closeDetailModal,
        navigateDetailModal
    });

    // Custom Presets (localStorage-persisted quick filters)
    initCustomPresets();

    checkLibraryHealth();
    
    // 1. Primary data load (Survey Assets + Planificacion) for immediate dashboard render
    Promise.allSettled([
        loadPlanificacionData(),
        loadAssets(uid => loadData(uid, onProcessData))
    ]).then(() => {
        console.log('main/index.js: Primary dashboard data ready.');
        if (window.lucide) lucide.createIcons();

        // 2. Idle-phase background load of heavy spatial layers (IndexedDB cached)
        const loadSpatialLayers = () => {
            Promise.allSettled([
                loadGeoJSONData(),
                loadControlsData().then(() => {
                    if (state.rawData.length > 0) {
                        console.log('main/index.js: Spatial catalog index ready.');
                        onProcessData();
                    }
                })
            ]);
        };

        if ('requestIdleCallback' in window) {
            requestIdleCallback(loadSpatialLayers, { timeout: 2000 });
        } else {
            setTimeout(loadSpatialLayers, 100);
        }
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
