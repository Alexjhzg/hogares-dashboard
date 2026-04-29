import { state } from '../core/index.js';
import { $ } from '../utils/index.js';
import { loadAssets, loadData } from '../api/index.js';
import { resetFilters, applyFilters, openFiltersPanel, closeFiltersPanel } from '../filters/index.js';
import { setMapState } from './map-layout.js';
import { switchTab } from './navigation.js';
import { updateKPIs } from './kpis.js';

export function bindEvents(callbacks) {
    const { onProcessData } = callbacks;

    // Reset buttons
    const resetHandler = () => {
        resetFilters();
        ['filterINE', 'filterSEGEN'].forEach(id => {
            if ($(id)) $(id).classList.remove('active', 'bg-brand-emerald', 'bg-brand-purple', 'text-white', 'border-brand-emerald', 'border-brand-purple');
        });
        state.filterINE = false;
        state.filterSEGEN = false;
    };

    if ($('btnReset')) $('btnReset').onclick = resetHandler;
    if ($('btnResetOffcanvas')) $('btnResetOffcanvas').onclick = resetHandler;

    // Data source & Refresh
    if ($('btnRefresh')) $('btnRefresh').addEventListener('click', () => {
        const assetId = $('assetSelect').value;
        if (assetId) loadData(assetId, onProcessData);
    });
    if ($('btnRetryConnection')) $('btnRetryConnection').addEventListener('click', () => loadAssets(onProcessData));
    if ($('assetSelect')) $('assetSelect').addEventListener('change', e => loadData(e.target.value, onProcessData));
    if ($('searchEncuesta')) $('searchEncuesta').addEventListener('input', () => applyFilters());

    // Off-canvas filters
    if ($('btnOpenFilters'))  $('btnOpenFilters').onclick = openFiltersPanel;
    if ($('btnCloseFilters')) $('btnCloseFilters').addEventListener('click', closeFiltersPanel);
    if ($('filtersOverlay'))  $('filtersOverlay').addEventListener('click', closeFiltersPanel);
    if ($('btnApplyFilters')) $('btnApplyFilters').addEventListener('click', () => { 
        closeFiltersPanel(); 
        applyFilters(); 
    });

    // Toggle filters (INE / SEGEN)
    const setupToggleFilter = (id, stateKey, colorClass, otherId, otherKey) => {
        const btn = $(id);
        if (btn) {
            btn.onclick = () => {
                state[stateKey] = !state[stateKey];
                if (state[stateKey]) state[otherKey] = false;

                btn.classList.toggle('active', state[stateKey]);
                btn.classList.toggle(colorClass, state[stateKey]);
                btn.classList.toggle('text-white', state[stateKey]);
                btn.classList.toggle(`border-${colorClass.split('-')[1]}-${colorClass.split('-')[2]}`, state[stateKey]);

                const otherBtn = $(otherId);
                if (otherBtn) {
                    otherBtn.classList.remove('active', 'bg-brand-emerald', 'bg-brand-purple', 'text-white', 'border-brand-emerald', 'border-brand-purple');
                }
                applyFilters();
            };
        }
    };

    setupToggleFilter('filterINE', 'filterINE', 'bg-brand-emerald', 'filterSEGEN', 'filterSEGEN');
    setupToggleFilter('filterSEGEN', 'filterSEGEN', 'bg-brand-purple', 'filterINE', 'filterINE');

    // Primary filters change
    ['filterEncuestador', 'filterFechaInicio', 'filterFechaFin', 'filterHoraTransmision', 'filterHoraInicio'].forEach(id => {
        if ($(id)) $(id).addEventListener('change', applyFilters);
    });

    // Daily Goal Mapping
    const metaInput = $('inputMetaDiaria');
    if (metaInput) {
        try { 
            const s = localStorage.getItem('esca_meta_diaria'); 
            if (s && !isNaN(Number(s))) metaInput.value = s; 
        } catch (_) {}
        
        metaInput.addEventListener('input', () => {
            try { localStorage.setItem('esca_meta_diaria', metaInput.value); } catch (_) {}
            updateKPIs();
        });
    }

    // Cascading municipality → parroquia → nodo
    if ($('filterMunicipio')) {
        $('filterMunicipio').addEventListener('change', () => {
            const mun = $('filterMunicipio').value;
            const selPar = $('filterParroquia');
            const selNodo = $('filterNodo');
            if (!selPar || !selNodo) return;
            
            selPar.innerHTML = '<option value="">Todas</option>';
            selNodo.innerHTML = '<option value="">Todos</option>';
            
            const pars = new Set(), nodos = new Set();
            state.rawData.forEach(r => {
                if (r._meta && (mun === '' || r._meta.mun === mun)) {
                    if (r._meta.par) pars.add(r._meta.par);
                    if (r._meta.nodo) nodos.add(r._meta.nodo);
                }
            });
            
            [...pars].sort().forEach(p => { 
                const o = document.createElement('option'); 
                o.value = p; o.textContent = p; 
                selPar.appendChild(o); 
            });
            [...nodos].sort().forEach(n => { 
                const o = document.createElement('option'); 
                o.value = n; o.textContent = n; 
                selNodo.appendChild(o); 
            });
        });
    }

    // Quick map filters
    const mapFilterMap = { 'All': 'all', 'Efectivas': 'efectivas', 'NoEfectiva': 'no_efectiva', 'Alertas': 'alertas' };
    Object.entries(mapFilterMap).forEach(([suffix, mode]) => {
        const btn = $(`btnMapFilter${suffix}`);
        if (btn) btn.addEventListener('click', () => {
            if (typeof window.setQuickFilter === 'function') window.setQuickFilter(mode);
        });
    });

    // Map Layout State Buttons
    if ($('btnMapStateNormal'))   $('btnMapStateNormal').addEventListener('click', () => setMapState('normal'));
    if ($('btnMapStateExpanded')) $('btnMapStateExpanded').addEventListener('click', () => setMapState('expanded'));
    if ($('btnMapStateFull'))     $('btnMapStateFull').addEventListener('click', () => setMapState('full'));
    
    if ($('btnToggleMapKpis')) {
        $('btnToggleMapKpis').addEventListener('click', () => {
            const grid = $('mapKpiGrid');
            if (grid) {
                const isCollapsed = grid.classList.contains('kpi-drawer-collapsed');
                grid.classList.toggle('kpi-drawer-collapsed', !isCollapsed);
                grid.classList.toggle('kpi-drawer-expanded', isCollapsed);
            }
        });
    }

    // Tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', e => { 
            e.preventDefault(); 
            switchTab(btn.dataset.tab); 
        });
    });

    // Ranking Table Sorting
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            state.currentSort = btn.dataset.sort;
            document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const { renderRankingTable } = callbacks;
            if (renderRankingTable) renderRankingTable();
        });
    });

    // Detail Modal Actions
    if ($('btnDetailExpand')) $('btnDetailExpand').addEventListener('click', () => {
        if (typeof window.toggleDetailModalExpand === 'function') window.toggleDetailModalExpand();
    });
    if ($('btnDetailClose')) $('btnDetailClose').addEventListener('click', () => {
        const { closeDetailModal } = callbacks;
        if (closeDetailModal) closeDetailModal();
    });
    if ($('detailModalBackdrop')) $('detailModalBackdrop').addEventListener('click', () => {
        const { closeDetailModal } = callbacks;
        if (closeDetailModal) closeDetailModal();
    });

    // Keyboard Shortcuts
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            const detailModal = $('detailModal');
            if (detailModal && !detailModal.classList.contains('hidden')) {
                const { closeDetailModal } = callbacks;
                if (closeDetailModal) closeDetailModal();
            }
        }
    });
}
