import { state } from '../core/index.js';
import { $ } from '../utils/index.js';
import { loadAssets, loadData } from '../api/index.js';
import { resetFilters, applyFilters, openFiltersPanel, closeFiltersPanel } from '../filters/index.js';
import { setMapState } from './map-layout.js';
import { switchTab } from './navigation.js';
import { updateKPIs } from './kpis.js';
import { initSearchableCombobox } from '../ui/components/combobox.js';
import { toggleMapTouchInteraction } from '../map/index.js';

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
        if (assetId) loadData(assetId, onProcessData, true);
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
    ['filterEncuestador', 'filterMunicipio', 'filterSemana', 'filterFechaInicio', 'filterFechaFin', 'filterHoraTransmision', 'filterHoraInicio', 'filterTasaNoRespuesta'].forEach(id => {
        if ($(id)) $(id).addEventListener('change', applyFilters);
    });

    // 1-Click Presets
    if ($('presetAlertas')) {
        $('presetAlertas').addEventListener('click', () => {
            state.quickFilterMode = 'alertas';
            applyFilters();
        });
    }
    if ($('presetNoRespuesta')) {
        $('presetNoRespuesta').addEventListener('click', () => {
            const el = $('filterClasificacion');
            if (el) {
                el.value = el.value === 'TIPO A' ? '' : 'TIPO A';
                el.dispatchEvent(new Event('change'));
            }
            applyFilters();
        });
    }
    if ($('presetNoEfectivas')) {
        $('presetNoEfectivas').addEventListener('click', () => {
            const el = $('filterEstado');
            if (el) {
                el.value = el.value === 'no_efectiva' ? '' : 'no_efectiva';
                el.dispatchEvent(new Event('change'));
            }
            applyFilters();
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


    // Map Layout State Buttons
    if ($('btnMapStateNormal'))   $('btnMapStateNormal').addEventListener('click', () => setMapState('normal'));
    if ($('btnMapStateExpanded')) $('btnMapStateExpanded').addEventListener('click', () => setMapState('expanded'));
    if ($('btnMapStateFull'))     $('btnMapStateFull').addEventListener('click', () => setMapState('full'));
    if ($('btnToggleMapTouch'))   $('btnToggleMapTouch').addEventListener('click', () => toggleMapTouchInteraction());
    
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
    if ($('btnDetailPrev')) $('btnDetailPrev').addEventListener('click', () => {
        const { navigateDetailModal } = callbacks;
        if (navigateDetailModal) navigateDetailModal(-1);
    });
    if ($('btnDetailNext')) $('btnDetailNext').addEventListener('click', () => {
        const { navigateDetailModal } = callbacks;
        if (navigateDetailModal) navigateDetailModal(1);
    });

    // Keyboard Shortcuts
    document.addEventListener('keydown', e => {
        const detailModal = $('detailModal');
        if (detailModal && !detailModal.classList.contains('hidden')) {
            if (e.key === 'Escape') {
                const { closeDetailModal } = callbacks;
                if (closeDetailModal) closeDetailModal();
            } else if (e.key === 'ArrowLeft') {
                const { navigateDetailModal } = callbacks;
                if (navigateDetailModal) navigateDetailModal(-1);
            } else if (e.key === 'ArrowRight') {
                const { navigateDetailModal } = callbacks;
                if (navigateDetailModal) navigateDetailModal(1);
            }
        }
    });
}
