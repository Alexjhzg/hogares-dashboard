import { $ } from '../../utils/index.js';

/**
 * Transforms a native HTML <select> element into a custom searchable combobox.
 * Handles styling, searching, keyboard navigation, and two-way value synchronization.
 * 
 * @param {HTMLSelectElement} select - The native select element.
 */
export function initSearchableCombobox(select) {
    if (!select || select.tagName !== 'SELECT') return;

    const selectId = select.id;
    const parent = select.parentNode;
    if (!parent) return;

    // 1. Remove existing custom combobox for this select if it exists
    const existingWrapper = parent.querySelector(`.combobox-container[data-select-id="${selectId}"]`);
    if (existingWrapper) {
        existingWrapper.remove();
    }

    // 2. Hide the native select
    select.style.display = 'none';

    // 3. Create wrapper container
    const wrapper = document.createElement('div');
    wrapper.className = 'relative w-full combobox-container';
    wrapper.setAttribute('data-select-id', selectId);

    // Get current selection text
    const selectedOption = select.options[select.selectedIndex];
    const initialText = selectedOption ? selectedOption.textContent : 'Seleccionar...';
    const initialValue = select.value;

    const hasLeftIcon = parent.querySelector('i[data-lucide], svg.lucide') !== null;
    const padClass = hasLeftIcon ? 'pl-9 pr-2' : 'px-3';

    // 4. Construct trigger input HTML
    wrapper.innerHTML = `
        <div class="combobox-trigger flex items-center justify-between w-full bg-white dark:bg-surface-dark border border-slate-300 dark:border-slate-700/80 rounded-xl ${padClass} py-2 text-sm cursor-pointer focus-within:border-brand-blue/50 focus-within:ring-1 outline-none transition-all">
            <input type="text" class="combobox-input w-full bg-transparent border-none p-0 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-bold outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 truncate" placeholder="Buscar..." value="${initialText}" readonly autocomplete="off" />
            <span class="combobox-clear p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hidden mr-1 transition-all flex-none">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </span>
            <span class="combobox-arrow-btn text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors flex-none">
                <svg class="w-4 h-4 transition-transform combobox-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </span>
        </div>
        <div class="combobox-dropdown absolute left-0 right-0 mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl z-[100] max-h-60 overflow-y-auto hidden custom-scrollbar">
            <div class="p-1 space-y-0.5 combobox-list"></div>
        </div>
    `;

    // Insert wrapper right after the native select
    parent.insertBefore(wrapper, select.nextSibling);

    const input = wrapper.querySelector('.combobox-input');
    const dropdown = wrapper.querySelector('.combobox-dropdown');
    const arrow = wrapper.querySelector('.combobox-arrow');
    const clearBtn = wrapper.querySelector('.combobox-clear');
    let highlightedIndex = -1;

    // Render option list items
    function renderOptions(filterText = '') {
        const listContainer = wrapper.querySelector('.combobox-list');
        listContainer.innerHTML = '';
        
        const query = filterText.toLowerCase().trim();
        const options = Array.from(select.options);
        
        let matches = 0;
        options.forEach(opt => {
            const text = opt.textContent;
            const val = opt.value;
            
            // Don't show the empty option (value = "") in the list if the user has typed a query
            if (query && val === '') return;
            
            if (text.toLowerCase().includes(query)) {
                matches++;
                const item = document.createElement('div');
                item.className = 'combobox-option px-3 py-1.5 text-xs rounded-lg font-bold cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all text-slate-700 dark:text-slate-300 flex items-center justify-between';
                item.setAttribute('data-value', val);
                item.textContent = text;
                
                // Copy styles from native option
                const style = opt.getAttribute('style');
                if (style) item.setAttribute('style', style);
                
                // If selected
                if (val === select.value) {
                    item.classList.add('bg-brand-blue/10', 'text-brand-blue', 'dark:bg-brand-blue/20', 'dark:text-brand-blue');
                }
                
                item.onclick = (e) => {
                    e.stopPropagation();
                    selectOption(val, text);
                };
                
                listContainer.appendChild(item);
            }
        });
        
        if (matches === 0) {
            const noMatch = document.createElement('div');
            noMatch.className = 'px-3 py-2.5 text-xs text-slate-400 dark:text-slate-500 font-bold text-center italic';
            noMatch.textContent = 'Sin coincidencias';
            listContainer.appendChild(noMatch);
        }
    }

    function selectOption(val, text) {
        select.value = val;
        input.value = text;
        input.setAttribute('readonly', 'true');
        closeDropdown();
        
        // Toggle clear button
        if (val !== '') {
            clearBtn.classList.remove('hidden');
        } else {
            clearBtn.classList.add('hidden');
        }

        // Dispatch change event to trigger dashboard filter logic
        select.dispatchEvent(new Event('change'));
    }

    function openDropdown() {
        wrapper.classList.add('combobox-open', 'z-[10000]');
        if (parent) parent.style.zIndex = '10000';
        dropdown.classList.remove('hidden');
        arrow.classList.add('rotate-180');
        input.removeAttribute('readonly');
        
        // Save current selection text as temporary placeholder
        const currentOption = select.options[select.selectedIndex];
        input.placeholder = currentOption ? currentOption.textContent : 'Buscar...';
        
        // Clear input value so the user can type immediately
        input.value = '';
        input.focus();
        
        // Show all options initially
        renderOptions('');
        highlightedIndex = -1;
    }

    function closeDropdown() {
        wrapper.classList.remove('combobox-open', 'z-[10000]', 'z-[1000]');
        if (parent) parent.style.zIndex = '';
        dropdown.classList.add('hidden');
        arrow.classList.remove('rotate-180');
        input.setAttribute('readonly', 'true');
        
        // Restore default placeholder and input value
        input.placeholder = 'Buscar...';
        const currentOption = select.options[select.selectedIndex];
        input.value = currentOption ? currentOption.textContent : '';
        
        highlightedIndex = -1;
    }

    function getVisibleOptions() {
        return Array.from(wrapper.querySelectorAll('.combobox-option'));
    }

    function updateHighlight() {
        const visibleOptions = getVisibleOptions();
        visibleOptions.forEach((opt, idx) => {
            if (idx === highlightedIndex) {
                opt.classList.add('bg-slate-100', 'dark:bg-slate-800/80', 'ring-1', 'ring-brand-blue/30');
                opt.scrollIntoView({ block: 'nearest' });
            } else {
                opt.classList.remove('bg-slate-100', 'dark:bg-slate-800/80', 'ring-1', 'ring-brand-blue/30');
            }
        });
    }

    // --- Events ---
    // Toggle dropdown on click
    wrapper.querySelector('.combobox-trigger').onclick = (e) => {
        if (clearBtn.contains(e.target)) return; // Don't open if clicking clear button
        if (dropdown.classList.contains('hidden')) {
            openDropdown();
        } else {
            closeDropdown();
        }
    };

    // Filter options on typing
    input.oninput = () => {
        renderOptions(input.value);
        highlightedIndex = -1;
    };

    // Keyboard navigation
    input.onkeydown = (e) => {
        if (dropdown.classList.contains('hidden')) {
            if (e.key === 'ArrowDown' || e.key === 'Enter') {
                e.preventDefault();
                openDropdown();
            }
            return;
        }

        const visibleOptions = getVisibleOptions();

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            highlightedIndex = Math.min(highlightedIndex + 1, visibleOptions.length - 1);
            updateHighlight();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            highlightedIndex = Math.max(highlightedIndex - 1, 0);
            updateHighlight();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (highlightedIndex >= 0 && visibleOptions[highlightedIndex]) {
                const val = visibleOptions[highlightedIndex].getAttribute('data-value');
                const text = visibleOptions[highlightedIndex].textContent;
                selectOption(val, text);
            } else if (visibleOptions.length > 0) {
                // If nothing highlighted but options exist, select first match
                const val = visibleOptions[0].getAttribute('data-value');
                const text = visibleOptions[0].textContent;
                selectOption(val, text);
            }
        } else if (e.key === 'Escape') {
            e.preventDefault();
            closeDropdown();
            input.blur();
        }
    };

    // Clear button functionality
    clearBtn.onclick = (e) => {
        e.stopPropagation();
        selectOption('', select.options[0] ? select.options[0].textContent : 'Todos');
    };

    // Initial state of clear button
    if (initialValue !== '') {
        clearBtn.classList.remove('hidden');
    }

    // Close dropdown on click outside
    const clickOutsideHandler = (e) => {
        if (!wrapper.contains(e.target)) {
            closeDropdown();
        }
    };
    document.addEventListener('click', clickOutsideHandler);

    // Sync state when native select is updated elsewhere (e.g., reset button)
    const syncFromSelect = () => {
        const option = select.options[select.selectedIndex];
        const val = select.value;
        input.value = option ? option.textContent : '';
        
        if (val !== '') {
            clearBtn.classList.remove('hidden');
        } else {
            clearBtn.classList.add('hidden');
        }
    };
    select.addEventListener('change', syncFromSelect);

    // Clean up global listeners if wrapper is removed
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.removedNodes.forEach((node) => {
                if (node === wrapper) {
                    document.removeEventListener('click', clickOutsideHandler);
                    select.removeEventListener('change', syncFromSelect);
                    observer.disconnect();
                }
            });
        });
    });
    observer.observe(parent, { childList: true });
}
