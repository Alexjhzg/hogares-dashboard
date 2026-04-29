/**
 * ─── Inconsistencias UI Events ───────────────────────────────────────────────
 * Manages domestic events for the audit tab (search, card clicks, filters).
 */

import { $ } from '../utils/index.js';

// Local state for the module (private to the orchestrator call)
export const filters = {
    currentAlertFilter: '',
    currentSearchQuery: '',
    isEventsBound: false
};

/**
 * Binds UI events for the inconsistencies tab.
 * @param {Function} onRefresh - Callback to trigger a full re-render of the module
 */
export function bindInconsistenciasEvents(onRefresh) {
    if (filters.isEventsBound) return;
    filters.isEventsBound = true;
    
    const searchInp = $('incSearchInput');
    const clearBtn = $('incClearSearch');
    const filterSel = $('incFilterAlerta');
    const cardsCont = $('inconsistenciasCards');

    if (searchInp) {
        searchInp.addEventListener('input', (e) => {
            filters.currentSearchQuery = e.target.value.trim().toLowerCase();
            if (clearBtn) clearBtn.classList.toggle('hidden', filters.currentSearchQuery.length === 0);
            if (onRefresh) onRefresh();
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (searchInp) searchInp.value = '';
            filters.currentSearchQuery = '';
            clearBtn.classList.add('hidden');
            if (onRefresh) onRefresh();
        });
    }

    if (filterSel) {
        filterSel.addEventListener('change', (e) => {
            filters.currentAlertFilter = e.target.value;
            if (onRefresh) onRefresh();
        });
    }

    if (cardsCont) {
        cardsCont.addEventListener('click', (e) => {
            const card = e.target.closest('.alert-card');
            if (!card) return;
            const code = card.dataset.code;
            filters.currentAlertFilter = (filters.currentAlertFilter === code) ? '' : code;
            if (onRefresh) onRefresh();
        });
    }
}
