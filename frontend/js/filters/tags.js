import { $ } from '../helpers.js';
import { applyFilters } from './logic.js';

/**
 * Renders small badges for each active filter below the header.
 * Allows quick removal of individual filters.
 */
export function renderActiveFilterTags() {
    const container = $('activeFiltersContainer');
    const badge     = $('activeFiltersBadge');
    if (!container || !badge) return;

    const filters = [
        { id: 'filterMunicipio',        label: 'Mpio' },
        { id: 'filterParroquia',        label: 'Parr' },
        { id: 'filterNodo',             label: 'Nodo' },
        { id: 'filterEstado',           label: 'Estado' },
        { id: 'filterCondicion',        label: 'Condición' },
        { id: 'filterSituacionVivienda',label: 'Sit. Viv' },
        { id: 'filterUso',              label: 'Uso' },
        { id: 'filterSemana',           label: 'Sem' },
        { id: 'filterControl',          label: 'Control' },
        { id: 'filterAlerta',           label: 'Alerta' },
    ];

    let activeCount = 0;
    container.innerHTML = '';

    filters.forEach(f => {
        const el = $(f.id);
        if (el && el.value) {
            activeCount++;
            const text = el.options[el.selectedIndex].text;
            const btn = document.createElement('button');
            btn.className = 'group flex items-center gap-2 px-3 py-1.5 bg-brand-blue/10 hover:bg-brand-red/10 border border-brand-blue/30 hover:border-brand-red/30 text-brand-blue hover:text-brand-red rounded-lg text-[10px] font-bold transition-all';
            btn.innerHTML = `
                <span class="opacity-70">${f.label}:</span> 
                <span>${text}</span> 
                <i data-lucide="x" class="w-3 h-3 group-hover:scale-110 transition-transform"></i>
            `;
            
            btn.addEventListener('click', () => {
                el.value = '';
                // Special case for municipality to reset parish/node lists
                if (f.id === 'filterMunicipio') el.dispatchEvent(new Event('change'));
                applyFilters();
            });
            
            container.appendChild(btn);
        }
    });

    // Update active filters counter badge (on the sidebar button)
    if (activeCount > 0) {
        badge.textContent = activeCount;
        badge.classList.remove('hidden');
        container.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
        badge.textContent = '0';
        container.classList.add('hidden');
    }

    // Refresh Lucide icons if present
    if (window.lucide) lucide.createIcons();
}
