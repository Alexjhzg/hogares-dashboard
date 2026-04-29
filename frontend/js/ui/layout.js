/**
 * ─── UI Layout Orchestrator ──────────────────────────────────────────────────
 * Injects all modular UI components (tabs and modals) into the DOM Shell.
 */

import { $ } from '../utils/index.js';

// Import Tabs
import {
    getResumenTabHTML,
    getMapaTabHTML,
    getRankingTabHTML,
    getMM111TabHTML,
    getInconsistenciasTabHTML
} from './tabs/index.js';

// Import Modals & Overlays
import {
    getLoadingOverlayHTML,
    getErrorStateHTML,
    getFiltersOffCanvasHTML,
    getDetailModalHTML
} from './modals/index.js';

/**
 * Injects all UI fragments into the main document body.
 * This should be called early in the application lifecycle.
 */
export function injectLayout() {
    const main = $('mainContent');
    const body = document.body;

    if (!main) {
        console.error('Layout Error: mainContent element not found.');
        return;
    }

    // 1. Inject Tabs into <main>
    const tabsHTML = [
        getResumenTabHTML(),
        getMapaTabHTML(),
        getRankingTabHTML(),
        getMM111TabHTML(),
        getInconsistenciasTabHTML()
    ].join('');
    
    // We append because main might already have some structural layout from Shell
    main.insertAdjacentHTML('beforeend', tabsHTML);

    // 2. Inject Modals & Overlays into <body>
    const overlaysHTML = [
        getLoadingOverlayHTML(),
        getErrorStateHTML(),
        getFiltersOffCanvasHTML(),
        getDetailModalHTML()
    ].join('');

    body.insertAdjacentHTML('beforeend', overlaysHTML);

    console.log('UI Layout: All components injected successfully ✓');
}
