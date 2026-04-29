/**
 * ─── MM-111 Orchestrator ─────────────────────────────────────────────────────
 * Manages the Geographic Sampling Framework module.
 */

import { $ } from '../utils/index.js';
import { initMM111Events } from './events.js';
import { loadMM111ControlData, getControlMetadata } from './logic.js';
import { clearMM111Header, updateMM111Grid } from './render.js';

// Public API exports
export { loadMM111ControlData } from './logic.js';
export { updateMM111Grid, clearMM111Header } from './render.js';

let mm111Initialized = false;

/**
 * Main entry point for the MM-111 module.
 * Called by the main orchestrator (renderAll).
 */
export function renderMM111() {
    // 1. Initialize event listeners once
    if (!mm111Initialized) {
        initMM111Events();
        mm111Initialized = true;
    }

    const searchInput = $('mm111SearchControl');
    const clearBtn    = $('mm111ClearSearch');
    const countEl     = $('mm111FilteredCount');
    
    if (!searchInput) return;

    // 2. Sync UI states
    if (countEl) {
        const kpiVal = $('kpiControles')?.textContent || '0';
        countEl.textContent = kpiVal;
    }

    if (searchInput.value.trim().length === 0) {
        clearBtn?.classList.add('hidden');
    } else {
        clearBtn?.classList.remove('hidden');
    }

    // 3. Update data view based on current search/filter state
    const currentVal = searchInput.value.trim();
    if (currentVal) {
        loadMM111ControlData(currentVal);
    } else {
        clearMM111Header();
        updateMM111Grid([]);
    }
}
