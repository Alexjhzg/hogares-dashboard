import { state } from '../core/index.js';
import { $ } from '../utils/index.js';
import { initMap, renderMap } from '../map/index.js';
import { updateGrid, renderRankingTable } from '../table/index.js';
import { renderMM111 } from '../mm111/index.js';
import { renderInconsistencias } from '../inconsistencias/index.js';

// Track which tabs have been rendered at least once
const _tabRendered = {};

export function switchTab(tabId) {
    if (!tabId) return;

    const tabsMenu = $('mainTabs');
    if (tabsMenu) {
        tabsMenu.querySelectorAll('.tab-btn').forEach(btn => {
            const isActive = btn.dataset.tab === tabId;
            btn.classList.toggle('tab-btn-active', isActive);
            btn.classList.toggle('active', isActive);
        });
    }
    
    document.querySelectorAll('.tab-content').forEach(c => {
        c.classList.toggle('hidden-tab', c.id !== tabId);
    });

    // Specific logic for lazy rendering and redrawing
    if (tabId === 'tab-mapa') {
        if (!state.map) initMap();
        setTimeout(() => {
            state.map.invalidateSize();
            setTimeout(() => {
                let isFirstLoad = false;
                if (!_tabRendered['tab-mapa']) {
                    _tabRendered['tab-mapa'] = true;
                    updateGrid();
                    isFirstLoad = true;
                }
                renderMap();
                if (state.detailTable && !isFirstLoad) { 
                    state.detailTable.redraw(true); 
                }
                if (window.lucide) window.lucide.createIcons();
            }, 200);
        }, 50);
    }
    
    if (tabId === 'tab-ranking') {
        if (!_tabRendered['tab-ranking']) {
            _tabRendered['tab-ranking'] = true;
            setTimeout(() => renderRankingTable(), 100);
        } else if (state.rankingTabulator) {
            setTimeout(() => state.rankingTabulator.redraw(true), 50);
        }
    }
    
    if (tabId === 'tab-mm111') {
        if (state.mm111Table) state.mm111Table.redraw();
        if (!state.mm111Table && state.filtered.length > 0) renderMM111();
    }

    // Reportes tab: lazy-load the module on first visit
    if (tabId === 'tab-reportes') {
        import('../reportes/index.js').then(({ initReportesTab }) => {
            initReportesTab();
            if (window.lucide) window.lucide.createIcons();
        }).catch(err => console.error('[navigation] Error loading reportes module:', err));
    }

    // Force charts to resize
    setTimeout(() => {
        Object.values(state.charts).forEach(chart => {
            if (chart && typeof chart.resize === 'function') { 
                chart.update('none'); 
                chart.resize(); 
            }
        });
        window.dispatchEvent(new Event('resize'));
    }, 50);
    
    if (window.lucide) window.lucide.createIcons();
}

