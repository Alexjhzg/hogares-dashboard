import { $ } from '../utils/index.js';
import { loadMM111ControlData, getControlMetadata } from './logic.js';
import { renderResultsList, clearMM111Header, updateMM111Grid } from './render.js';
import { applyFilters } from '../filters/logic.js';

/**
 * Initializes all event listeners for the MM-111 module.
 */
export function initMM111Events() {
    const searchBtn    = $('btnLoadMM111');
    const searchInput  = $('mm111SearchControl');
    const resultsPanel = $('mm111SearchResults');
    const clearBtn     = $('mm111ClearSearch');

    if (!searchInput || !resultsPanel) return;

    let selectedIndex = -1;
    
    // --- Search Input Logic ---
    const showResults = (val) => {
        const query = val.toLowerCase().trim();
        const controls = getControlMetadata(); // Get fresh list based on current filters

        const filtered = controls.filter(c => 
            c.control.toLowerCase().includes(query) || 
            c.mun.toLowerCase().includes(query) ||
            c.seg.toLowerCase().includes(query)
        ).slice(0, 50);
        
        selectedIndex = -1;
        if (query.length > 0 || val.length === 0) {
            resultsPanel.classList.remove('hidden');
            renderResultsList(filtered, val);
            
            // Re-bind clicks to new results
            const items = resultsPanel.querySelectorAll('.result-item');
            items.forEach(item => {
                item.onclick = () => selectControl(item.getAttribute('data-value'));
            });
        } else {
            resultsPanel.classList.add('hidden');
        }
    };

    const selectControl = async (val) => {
        if (searchInput) searchInput.value = val;
        if (resultsPanel) resultsPanel.classList.add('hidden');
        if (val.trim().length > 0) clearBtn?.classList.remove('hidden');
        
        // Sync with global filter
        const globalFilter = $('filterControl');
        if (globalFilter) globalFilter.value = val;

        loadMM111ControlData(val);
        
        // Apply filters globally to sync everything
        applyFilters();
    };

    // --- Event Handlers ---
    searchInput.onfocus = () => showResults(searchInput.value);
    
    searchInput.oninput = () => {
        if (searchInput.value.trim().length > 0) clearBtn?.classList.remove('hidden');
        else clearBtn?.classList.add('hidden');
        showResults(searchInput.value);
    };

    searchInput.onkeydown = (e) => {
        const items = resultsPanel.querySelectorAll('.result-item');
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
            updateSelection(items);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = Math.max(selectedIndex - 1, 0);
            updateSelection(items);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedIndex >= 0 && items[selectedIndex]) {
                selectControl(items[selectedIndex].getAttribute('data-value'));
            } else if (items.length > 0) {
                selectControl(items[0].getAttribute('data-value'));
            }
        } else if (e.key === 'Escape') {
            resultsPanel.classList.add('hidden');
        }
    };

    const updateSelection = (items) => {
        items.forEach((item, i) => {
            if (i === selectedIndex) {
                item.classList.add('active', 'bg-brand-blue/10', 'dark:bg-brand-blue/20', 'ring-1', 'ring-brand-blue/30');
                item.scrollIntoView({ block: 'nearest' });
            } else {
                item.classList.remove('active', 'bg-brand-blue/10', 'dark:bg-brand-blue/20', 'ring-1', 'ring-brand-blue/30');
            }
        });
    };

    if (clearBtn) {
        clearBtn.onclick = async () => {
            searchInput.value = '';
            clearBtn.classList.add('hidden');
            
            const globalControl = $('filterControl');
            if (globalControl) globalControl.value = '';
            
            const inputInicio = $('filterFechaInicio');
            const inputFin = $('filterFechaFin');
            if (inputInicio) inputInicio.value = '';
            if (inputFin)    inputFin.value    = '';

            searchInput.focus();
            showResults('');
            applyFilters();
        };
    }

    if (searchBtn) {
        searchBtn.onclick = () => selectControl(searchInput.value.trim());
    }

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !resultsPanel.contains(e.target)) {
            resultsPanel.classList.add('hidden');
        }
    });
}

/**
 * Sync listener for global filter changes.
 */
document.addEventListener('filtersApplied', () => {
    const globalControl = $('filterControl')?.value;
    const mmInput = $('mm111SearchControl');
    const clearBtn = $('mm111ClearSearch');
    
    if (mmInput && globalControl && mmInput.value !== globalControl) {
        mmInput.value = globalControl;
        if (clearBtn) clearBtn.classList.remove('hidden');
        loadMM111ControlData(globalControl);
    } else if (mmInput && !globalControl && mmInput.value !== '') {
        mmInput.value = '';
        if (clearBtn) clearBtn.classList.add('hidden');
        clearMM111Header();
        updateMM111Grid([]);
    }
});
