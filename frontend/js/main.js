// ─── Main Entry Point ────────────────────────────────────────────────────────
// Orchestrates all modules. This is the only file loaded by index.html.
// All dependencies are loaded via ES module imports.

import { state }            from './state.js?v=39';
import { $, avg }           from './helpers.js?v=39';
import { loadAssets, loadData } from './api.js?v=39';
import { processData }      from './dataProcessor.js?v=39';
import { populateFilters, applyFilters, resetFilters, setRenderAll,
         openFiltersPanel, closeFiltersPanel }    from './filters.js?v=39';
import { renderRankingTable, updateGrid } from './table.js?v=39';
import { initMap, renderMap, loadGeoJSONData, loadControlsData, initVerRutaButton } from './map.js?v=39';
import { showDetailModal, closeDetailModal } from './modal.js?v=39';
import { renderMM111 }      from './mm111.js?v=39';
import { updateChartsTheme, renderChartEncuestador, renderChartDuracion,
         renderChartHorario, renderChartHistograma, renderChartCondicion,
         renderChartUso, renderChartPorDia,
         renderChartResumenSemanal }       from './charts.js?v=39';
import { renderInconsistencias }           from './inconsistencias.js?v=39';

console.log('main.js: ES modules loaded ✓');

// ── renderAll (injected into filters to avoid circular deps) ─────────────────

// Track which tabs have been rendered at least once
const _tabRendered = {};

function renderAll() {
    console.log('main.js: renderAll() starting');
    try { updateKPIs(); } catch (e) { console.error('KPI Update Error:', e); }
    
    // Charts: Each wrapped to prevent cascading failure
    const chartFn = [
        renderChartEncuestador, renderChartDuracion, renderChartHorario,
        renderChartHistograma, renderChartCondicion, renderChartUso, renderChartPorDia,
        renderChartResumenSemanal,
    ];
    
    chartFn.forEach(fn => {
        try { fn(); } catch (e) { console.warn(`Chart Renderer Error (${fn.name}):`, e); }
    });

    // Defer ranking table rendering until the tab is visible
    if (_tabRendered['tab-ranking']) {
        try { renderRankingTable(); } catch (e) { console.error('Ranking Table Error:', e); }
    }
    

    
    // Grid and map are rendered lazily when their tab is first activated
    if (_tabRendered['tab-mapa']) {
        try { updateGrid(); renderMap(); } catch (e) { console.error('Map/Grid Error:', e); }
    }
    
    try { renderMM111(); } catch (e) { console.error('MM111 Error:', e); }
    try { renderInconsistencias(); } catch (e) { console.error('Inconsistencias Error:', e); }
    
    if (window.lucide) lucide.createIcons();
}

setRenderAll(renderAll);

// Register global onProcessData callback for api.js window.loadAssets
window.__onProcessData = () => { processData(); populateFilters(); state.filtered = [...state.rawData]; renderAll(); };

// ── KPIs ─────────────────────────────────────────────────────────────────────

function updateKPIs() {
    const completadas = state.filtered.filter(r => r._meta && r._meta.estado === 'completada').length;
    const noRespuesta = state.filtered.length - completadas;
    const encs        = new Set(state.filtered.map(r => r._meta.cedula)).size;
    const durs        = state.filtered
        .filter(r => r._meta.estado === 'completada')
        .map(r => r._meta.durMin)
        .filter(d => d !== null);
    const avgDuracion = durs.length ? avg(durs) : 0;
    const personas    = state.filtered.reduce((s, r) => s + (r._meta.totalPers || 0), 0);
    const hombres     = state.filtered.reduce((s, r) => s + (r._meta.totalHombres || 0), 0);
    const mujeres     = state.filtered.reduce((s, r) => s + (r._meta.totalMujeres || 0), 0);
    const municipios  = new Set(state.filtered.map(r => r._meta.mun)).size;

    if ($('kpiTotal'))          $('kpiTotal').textContent          = state.filtered.length;
    if ($('kpiCompletadas'))    $('kpiCompletadas').textContent    = completadas;
    if ($('kpiNoRespuesta'))    $('kpiNoRespuesta').textContent    = noRespuesta;
    if ($('kpiEncuestadores'))  $('kpiEncuestadores').textContent  = encs;
    if ($('kpiDuracion'))       $('kpiDuracion').textContent       = avgDuracion ? `${Math.round(avgDuracion)} min` : 'N/A';
    if ($('kpiPersonas'))       $('kpiPersonas').textContent       = personas;
    if ($('kpiHombres'))        $('kpiHombres').textContent        = hombres;
    if ($('kpiMujeres'))        $('kpiMujeres').textContent        = mujeres;
    if ($('kpiMunicipios'))     $('kpiMunicipios').textContent     = municipios;

    const encPerHour = state.filtered.length / (encs * 8 || 1);
    if ($('kpiEncPerHour')) $('kpiEncPerHour').textContent = encPerHour.toFixed(1);

    const producers = {};
    state.filtered.forEach(r => { producers[r._meta.nombre] = (producers[r._meta.nombre] || 0) + 1; });
    const topProducer = Object.entries(producers).sort((a, b) => b[1] - a[1])[0] || ['--', 0];
    if ($('kpiTopProducer'))    $('kpiTopProducer').textContent    = topProducer[0].split(' ')[0];
    if ($('kpiTopProducerVal')) $('kpiTopProducerVal').textContent = `${topProducer[1]} encuestas`;

    // ─── Métricas de Calidad (Pestaña Unificada) ─────────────────────────────
    const totalConAlertas   = state.filtered.filter(r => r._meta && r._meta.hasAlerts).length;
    const tasaEfectividad   = state.filtered.length > 0
        ? Math.round((completadas / state.filtered.length) * 100) : 0;
    const tasaAlerta        = state.filtered.length > 0
        ? Math.round((totalConAlertas / state.filtered.length) * 100) : 0;

    if ($('kpiTasaEfectividad')) $('kpiTasaEfectividad').textContent = `${tasaEfectividad}%`;
    if ($('kpiTotalAlertas'))    $('kpiTotalAlertas').textContent    = totalConAlertas;
    if ($('kpiTasaAlerta'))      $('kpiTasaAlerta').textContent      = `${tasaAlerta}%`;

    const hours = {};
    state.filtered.forEach(r => { if (r._meta.hora !== null) hours[r._meta.hora] = (hours[r._meta.hora] || 0) + 1; });
    const peakHour = Object.entries(hours).sort((a, b) => b[1] - a[1])[0] || [null, 0];
    if ($('kpiPeakHour')) $('kpiPeakHour').textContent = peakHour[0] !== null ? `${peakHour[0]}:00` : '--';

    const metaInput  = $('inputMetaDiaria');
    const meta       = metaInput && !isNaN(Number(metaInput.value)) && Number(metaInput.value) > 0 ? Number(metaInput.value) : 20;
    const metaGlobal = encs * meta;
    const progreso   = Math.min(100, (state.filtered.length / (metaGlobal || 1)) * 100);
    if ($('kpiMetaProgreso')) $('kpiMetaProgreso').textContent = `${Math.round(progreso)}%`;
    if ($('kpiMetaBar'))      $('kpiMetaBar').style.width      = `${progreso}%`;

    // ─── Ranking Tab KPIs ───────────────────
    const totalAlerts = state.filtered.filter(r => r._meta.hasAlerts).length;

    if ($('rankKpiEfectivas'))   $('rankKpiEfectivas').textContent    = completadas;
    if ($('rankKpiNoRespuesta')) $('rankKpiNoRespuesta').textContent  = noRespuesta;
    if ($('rankKpiAlerts'))      $('rankKpiAlerts').textContent       = totalAlerts;
}

// ── Theme ─────────────────────────────────────────────────────────────────────

function initTheme() {
    const storedTheme = localStorage.getItem('esca_theme');
    let isDark = true;
    if (storedTheme === 'light') isDark = false;
    else if (storedTheme === 'dark') isDark = true;
    applyTheme(isDark);

    const btn = $('btnThemeToggle');
    if (btn) {
        btn.addEventListener('click', () => {
            applyTheme(!document.documentElement.classList.contains('dark'));
        });
    }
}

function applyTheme(isDark) {
    if (isDark) { document.documentElement.classList.add('dark');    localStorage.setItem('esca_theme', 'dark'); }
    else        { document.documentElement.classList.remove('dark'); localStorage.setItem('esca_theme', 'light'); }
    updateChartsTheme(isDark);
}

// ── Tab Navigation ────────────────────────────────────────────────────────────

function switchTab(tabId) {
    if (!tabId) return;

    const tabsMenu = $('mainTabs');
    if (tabsMenu) {
        tabsMenu.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('tab-btn-active', btn.dataset.tab === tabId);
            btn.classList.toggle('active', btn.dataset.tab === tabId);
        });
    }
    document.querySelectorAll('.tab-content').forEach(c => c.classList.toggle('hidden-tab', c.id !== tabId));

    if (tabId === 'tab-mapa') {
        if (!state.map) initMap();
        // invalidateSize first, then render with fitBounds once Leaflet knows true dimensions
        setTimeout(() => {
            state.map.invalidateSize();
            setTimeout(() => {
                let isFirstLoad = false;
                if (!_tabRendered['tab-mapa']) {
                    // First time: full init
                    _tabRendered['tab-mapa'] = true;
                    updateGrid();
                    isFirstLoad = true;
                }
                renderMap();
                if (state.detailTable && !isFirstLoad) { state.detailTable.redraw(true); }
                if (window.lucide) lucide.createIcons();
            }, 200);
        }, 50);
    }
    if (tabId === 'tab-ranking') {
        if (!_tabRendered['tab-ranking']) {
            _tabRendered['tab-ranking'] = true;
            // First time showing this tab: initialize the table securely
            setTimeout(() => renderRankingTable(), 100);
        } else if (state.rankingTabulator) {
            setTimeout(() => state.rankingTabulator.redraw(true), 50);
        }
    }
    if (tabId === 'tab-mm111') {
        if (state.mm111Table) state.mm111Table.redraw();
        if (!state.mm111Table && state.filtered.length > 0) renderMM111();
    }

    setTimeout(() => {
        Object.values(state.charts).forEach(chart => {
            if (chart && typeof chart.resize === 'function') { chart.update('none'); chart.resize(); }
        });
        window.dispatchEvent(new Event('resize'));
    }, 50);
    if (window.lucide) lucide.createIcons();
}

// ── Date Display ──────────────────────────────────────────────────────────────

function updateModuleInfo() {
    const d = new Date();
    const display = $('currentDateDisplay');
    if (display) display.textContent = d.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

// ── Bootstrap ─────────────────────────────────────────────────────────────────

async function init() {
    console.log('main.js: init() start');
    try {
        await doInit();
        console.log('main.js: init() completed successfully ✓');
    } catch (err) {
        console.error('main.js: init() CRITICAL FAILURE:', err);
    }
}

async function doInit() {
    // Wire up primary controls
    if ($('btnReset')) $('btnReset').onclick = () => {
        resetFilters();
        if ($('filterINE')) {
            $('filterINE').classList.remove('active', 'bg-brand-emerald', 'text-white', 'border-brand-emerald');
            state.filterINE = false;
        }
        if ($('filterSEGEN')) {
            $('filterSEGEN').classList.remove('active', 'bg-brand-purple', 'text-white', 'border-brand-purple');
            state.filterSEGEN = false;
        }
    };
    if ($('btnResetOffcanvas')) $('btnResetOffcanvas').onclick = () => {
        resetFilters();
        if ($('filterINE')) {
            $('filterINE').classList.remove('active', 'bg-brand-emerald', 'text-white', 'border-brand-emerald');
            state.filterINE = false;
        }
        if ($('filterSEGEN')) {
            $('filterSEGEN').classList.remove('active', 'bg-brand-purple', 'text-white', 'border-brand-purple');
            state.filterSEGEN = false;
        }
    };
    if ($('btnRefresh'))   $('btnRefresh').addEventListener('click', () => loadData($('assetSelect').value, onProcessData));
    if ($('searchEncuesta')) $('searchEncuesta').addEventListener('input', () => applyFilters());
    if ($('assetSelect'))  $('assetSelect').addEventListener('change', e => loadData(e.target.value, onProcessData));

    // Off-canvas filters
    if ($('btnOpenFilters'))  $('btnOpenFilters').onclick = openFiltersPanel;
    if ($('btnCloseFilters')) $('btnCloseFilters').addEventListener('click', closeFiltersPanel);
    if ($('filtersOverlay'))  $('filtersOverlay').addEventListener('click', closeFiltersPanel);
    if ($('btnApplyFilters')) $('btnApplyFilters').addEventListener('click', () => { closeFiltersPanel(); applyFilters(); });

    if ($('filterINE')) $('filterINE').onclick = () => {
        state.filterINE = !state.filterINE;
        if (state.filterINE) state.filterSEGEN = false; // Mutually exclusive

        const btnIne = $('filterINE');
        btnIne.classList.toggle('active', state.filterINE);
        btnIne.classList.toggle('bg-brand-emerald', state.filterINE);
        btnIne.classList.toggle('text-white', state.filterINE);
        btnIne.classList.toggle('border-brand-emerald', state.filterINE);

        const btnSegen = $('filterSEGEN');
        if (btnSegen) {
            btnSegen.classList.remove('active', 'bg-brand-purple', 'text-white', 'border-brand-purple');
        }
        applyFilters();
    };

    if ($('filterSEGEN')) $('filterSEGEN').onclick = () => {
        state.filterSEGEN = !state.filterSEGEN;
        if (state.filterSEGEN) state.filterINE = false; // Mutually exclusive

        const btnSegen = $('filterSEGEN');
        btnSegen.classList.toggle('active', state.filterSEGEN);
        btnSegen.classList.toggle('bg-brand-purple', state.filterSEGEN);
        btnSegen.classList.toggle('text-white', state.filterSEGEN);
        btnSegen.classList.toggle('border-brand-purple', state.filterSEGEN);

        const btnIne = $('filterINE');
        if (btnIne) {
            btnIne.classList.remove('active', 'bg-brand-emerald', 'text-white', 'border-brand-emerald');
        }
        applyFilters();
    };

    // Primary filters
    ['filterEncuestador','filterFechaInicio','filterFechaFin'].forEach(id => {
        if ($(id)) $(id).addEventListener('change', applyFilters);
    });

    // Meta diaria
    const metaInput = $('inputMetaDiaria');
    if (metaInput) {
        try { const s = localStorage.getItem('esca_meta_diaria'); if (s && !isNaN(Number(s))) metaInput.value = s; } catch (_) {}
        metaInput.addEventListener('input', () => {
            try { localStorage.setItem('esca_meta_diaria', metaInput.value); } catch (_) {}
            updateKPIs();
        });
    }

    // Cascading municipality → parroquia → nodo
    if ($('filterMunicipio')) {
        $('filterMunicipio').addEventListener('change', () => {
            const mun    = $('filterMunicipio').value;
            const selPar = $('filterParroquia');
            const selNodo = $('filterNodo');
            if (!selPar || !selNodo) return;
            selPar.innerHTML  = '<option value="">Todas</option>';
            selNodo.innerHTML = '<option value="">Todos</option>';
            const pars = new Set(), nodos = new Set();
            state.rawData.forEach(r => {
                if (r._meta && (mun === '' || r._meta.mun === mun)) {
                    if (r._meta.par)  pars.add(r._meta.par);
                    if (r._meta.nodo) nodos.add(r._meta.nodo);
                }
            });
            [...pars].sort().forEach(p => { const o = document.createElement('option'); o.value = p; o.textContent = p; selPar.appendChild(o); });
            [...nodos].sort().forEach(n => { const o = document.createElement('option'); o.value = n; o.textContent = n; selNodo.appendChild(o); });
        });
    }

    // Quick map filter buttons
    const mapFilterMap = { 'All': 'all', 'Efectivas': 'efectivas', 'NoRespuesta': 'no_respuesta', 'Alertas': 'alertas' };
    Object.entries(mapFilterMap).forEach(([suffix, mode]) => {
        const btn = $(`btnMapFilter${suffix}`);
        if (btn) btn.addEventListener('click', () => window.setQuickFilter(mode));
    });

    // Map Expansion Controls (3-button group)
    const setMapState = (mode) => {
        const wrapper = $('mapSectionWrapper');
        const kpiGrid = $('mapKpiGrid');
        const mapContainer = $('mapDisplayContainer');
        const kpiExtra = $('mapKpiExtra');
        const headerLabel = kpiGrid ? kpiGrid.querySelector('.header-label') : null;
        
        if (!wrapper || !kpiGrid || !mapContainer) return;

        // 1. ABSOLUTE RESET: Limpieza total de clases conflictivas
        document.body.classList.remove('has-map-fullscreen');
        
        // Reset Wrapper
        wrapper.className = "grid grid-cols-1 lg:grid-cols-12 gap-8 transition-all duration-500 overflow-visible items-stretch";
        
        // Reset Map Container
        mapContainer.className = "lg:col-span-10 relative transition-all duration-500 rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-slate-900";
        
        // Reset KPI Grid
        kpiGrid.className = "lg:col-span-2 transition-all duration-500 overflow-visible flex flex-col gap-3";
        
        // Reset KPI Extra
        if (kpiExtra) kpiExtra.className = "divider mt-2 pt-2 border-t border-slate-200 dark:border-white/5 flex flex-col gap-2";
        
        // Reset Header Label
        if (headerLabel) headerLabel.className = "header-label text-[9px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-widest ml-1 mb-1";

        // Reset all buttons and glass panels
        kpiGrid.querySelectorAll('button, div.glass-panel').forEach(el => {
            el.className = el.id === 'btnVerRutaAgente' ? 
                "glass-panel rounded-xl p-3 flex items-center justify-between border-l-4 border-brand-orange hover:bg-brand-orange/5 transition-all group active:scale-[.98] disabled:opacity-40 disabled:cursor-not-allowed" :
                el.classList.contains('active-filter') || el.id === 'btnMapFilterAll' ? // Preservar estado de filtro activo si es necesario o resetear
                "glass-panel rounded-xl p-3 flex items-center justify-between border-l-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-all group" :
                "glass-panel rounded-xl p-3 flex items-center justify-between border-l-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-all group";
            
            // Re-aplicar clases de borde específicas por ID
            if (el.id === 'btnMapFilterAll') el.classList.add('border-brand-blue');
            if (el.id === 'btnMapFilterEfectivas') el.classList.add('border-brand-emerald');
            if (el.id === 'btnMapFilterNoRespuesta') el.classList.add('border-brand-orange');
            if (el.id === 'btnMapFilterAlertas') el.classList.add('border-brand-red');
            if (el.classList.contains('opacity-80')) el.classList.add('border-brand-purple'); // Encuestadores div

            const label = el.querySelector('span.uppercase');
            if (label) label.classList.remove('hidden');
        });

        // 2. APPLY MODE SPECIFIC PROFILES
        if (mode === 'normal') {
            wrapper.classList.add('h-[88vh]', 'min-h-[600px]', 'sm:min-h-[700px]');
            mapContainer.classList.add('h-[500px]', 'sm:h-auto');
            // Mobile Specific override for normal mode
            kpiGrid.classList.add('grid', 'grid-cols-2', 'sm:flex', 'sm:flex-col', 'gap-2');
            if (kpiExtra) kpiExtra.classList.add('col-span-2', 'sm:col-span-1', 'flex-col', 'sm:flex-col', 'gap-2');
            if (headerLabel) headerLabel.classList.add('hidden', 'sm:block');
            
            kpiGrid.querySelectorAll('button, div.glass-panel').forEach(el => {
                el.classList.add('flex-row', 'items-center', 'justify-between');
            });
        } 
        else if (mode === 'expanded') {
            wrapper.className = "flex flex-col items-center gap-6 transition-all duration-500 w-full mb-8";
            mapContainer.className = "w-full h-[75vh] relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10";
            
            kpiGrid.className = "flex flex-wrap sm:flex-nowrap grid grid-cols-2 sm:flex flex-row gap-2 sm:gap-8 mt-4 sm:mt-6 mx-auto max-w-[95%] sm:max-w-fit bg-slate-900/40 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-white/10 px-4 sm:px-10 py-1.5 sm:py-2 shadow-2xl";
            
            if (kpiExtra) {
                kpiExtra.className = "col-span-2 sm:col-span-1 flex flex-row gap-2 sm:gap-6 mt-0 sm:border-l border-white/10 sm:pl-8 sm:ml-4 w-full sm:w-auto items-center";
            }
            if (headerLabel) headerLabel.classList.add('hidden');

            kpiGrid.querySelectorAll(':scope > button, :scope > div.glass-panel, #mapKpiExtra > button, #mapKpiExtra > div').forEach(el => {
                el.classList.add('flex-col', 'items-center', 'justify-center', 'min-w-0', 'sm:min-w-[130px]', 'flex-1', 'border-l-0', 'border-b-2', 'sm:border-b-4', 'gap-0.5', 'py-1', 'sm:py-1.5', 'px-2');
            });
        } 
        else if (mode === 'full') {
            mapContainer.className = "map-fullscreen fixed inset-0 z-[100000] bg-slate-900";
            document.body.classList.add('has-map-fullscreen');
            
            kpiGrid.className = "flex flex-row fixed bottom-6 left-1/2 -translate-x-1/2 z-[100001] gap-2 mx-auto max-w-fit bg-slate-950/70 backdrop-blur-2xl rounded-full border border-white/10 px-4 py-1.5 shadow-[0_0_40px_rgba(0,0,0,0.7)]";
            
            if (kpiExtra) {
                kpiExtra.className = "flex flex-row gap-2 mt-0 border-l border-white/10 pl-4 ml-1 items-center";
            }
            if (headerLabel) headerLabel.classList.add('hidden');

            kpiGrid.querySelectorAll(':scope > button, :scope > div.glass-panel, #mapKpiExtra > button, #mapKpiExtra > div').forEach(el => {
                el.classList.add('flex', 'flex-col', 'items-center', 'justify-center', 'min-w-[65px]', 'border-l-0', 'border-b-2', 'gap-0', 'p-1.5', 'rounded-lg');
                const label = el.querySelector('span.uppercase');
                if (label) label.classList.add('hidden');
            });
        }

        // Active state feedback for buttons
        ['Normal', 'Expanded', 'Full'].forEach(m => {
            const btn = $(`btnMapState${m}`);
            if (btn) {
                const isActive = mode === m.toLowerCase();
                btn.classList.toggle('bg-white/30', isActive);
            }
        });

        if (window.lucide) lucide.createIcons();
        setTimeout(() => { if (state.map) state.map.invalidateSize(); }, 600);
    };

    window.setMapState = setMapState; // Expose for debugging

    if ($('btnMapStateNormal'))   $('btnMapStateNormal').addEventListener('click', () => setMapState('normal'));
    if ($('btnMapStateExpanded')) $('btnMapStateExpanded').addEventListener('click', () => setMapState('expanded'));
    if ($('btnMapStateFull'))     $('btnMapStateFull').addEventListener('click', () => setMapState('full'));

    // Initialize default
    setMapState('normal');

    // Tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', e => { e.preventDefault(); switchTab(btn.dataset.tab); });
    });

    // Sort buttons on ranking tab
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            state.currentSort = btn.dataset.sort;
            document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderRankingTable();
        });
    });

    // Keyboard: close modals on Escape
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            if ($('detailModal') && !$('detailModal').classList.contains('hidden')) closeDetailModal();
        }
    });

    checkLibraryHealth();
    
    // Load external resources in parallel to avoid blocking the whole app
    Promise.allSettled([
        loadGeoJSONData(),
        loadControlsData().then(() => {
            // Once the controls index is ready, re-run processData so that
            // LINEA_SERIE_INVALIDA alerts are evaluated against the official catalog.
            if (state.rawData.length > 0) {
                console.log('main.js: Re-processing data with controls index — updating alerts…');
                processData();
                state.filtered = [...state.rawData];
                renderAll();
            }
        }),
        loadAssets(uid => loadData(uid, onProcessData))
    ]).then(() => {
        console.log('main.js: Parallel initialization settled.');
        if (window.lucide) lucide.createIcons();
    });
}

function onProcessData() {
    processData();
    populateFilters();
    state.filtered = [...state.rawData];
    renderAll();
}

/**
 * Checks if critical external libraries are loaded. 
 * Shows a warning banner if Tabulator or Chart.js are missing (common in Brave/AdBlockers).
 */
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
    initTheme();
    updateModuleInfo();
    init();
    initVerRutaButton();
});
