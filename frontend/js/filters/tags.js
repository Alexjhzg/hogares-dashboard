import { state } from '../core/index.js';
import { $ } from '../utils/index.js';
import { applyFilters } from './logic.js';

/**
 * Renders small badges for each active filter below the header.
 * Allows quick removal of individual filters.
 */
export function renderActiveFilterTags() {
    const container = $('activeFiltersContainer');
    const badge     = $('activeFiltersBadge');
    if (!container || !badge) return;

    const selectFilters = [
        { id: 'filterEncuestador',       label: 'Encuestador' },
        { id: 'filterMunicipio',         label: 'Municipio' },
        { id: 'filterParroquia',         label: 'Parroquia' },
        { id: 'filterNodo',              label: 'Nodo' },
        { id: 'filterEstado',            label: 'Estado' },
        { id: 'filterCondicion',         label: 'Condición' },
        { id: 'filterSituacionVivienda', label: 'Sit. Viv' },
        { id: 'filterUso',               label: 'Uso' },
        { id: 'filterSemana',            label: 'Semana' },
        { id: 'filterControl',           label: 'Control' },
        { id: 'filterAlerta',            label: 'Alerta' },
        { id: 'filterClasificacion',     label: 'Clasif' },
        { id: 'filterTasaNoRespuesta',   label: 'No Resp Ctrl' },
        { id: 'filterHoraTransmision',   label: 'Hora Trans' },
        { id: 'filterHoraInicio',        label: 'Hora Inicio' },
    ];

    let activeCount = 0;
    container.innerHTML = '';

    const addTag = (label, text, onRemove) => {
        activeCount++;
        const btn = document.createElement('button');
        btn.className = 'group flex items-center gap-1.5 px-2.5 py-1 bg-brand-blue/10 hover:bg-brand-red/10 border border-brand-blue/30 hover:border-brand-red/30 text-brand-blue hover:text-brand-red rounded-lg text-[10px] font-bold transition-all';
        btn.innerHTML = `
            <span class="opacity-70">${label}:</span> 
            <span class="truncate max-w-[220px]">${text}</span> 
            <i data-lucide="x" class="w-3 h-3 group-hover:scale-110 transition-transform"></i>
        `;
        btn.addEventListener('click', () => {
            onRemove();
            applyFilters();
        });
        container.appendChild(btn);
    };

    // 0. Búsqueda por texto
    const search = $('searchEncuesta');
    if (search && search.value.trim()) {
        addTag('Búsqueda', search.value.trim(), () => {
            search.value = '';
            search.dispatchEvent(new Event('input'));
        });
    }

    // 1. Select Filters
    selectFilters.forEach(f => {
        const el = $(f.id);
        if (el && el.value) {
            const rawText = el.options[el.selectedIndex]?.text || el.value;
            const text = rawText.replace(/\s*\(\d[\d.,]*\)$/, '');
            addTag(f.label, text, () => {
                el.value = '';
                el.dispatchEvent(new Event('change'));
            });
        }
    });

    // 2. Date Filters
    const fi = $('filterFechaInicio');
    const ff = $('filterFechaFin');
    if (fi && fi.value) {
        addTag('Desde', fi.value, () => { fi.value = ''; });
    }
    if (ff && ff.value) {
        addTag('Hasta', ff.value, () => { ff.value = ''; });
    }

    // 3. Entity Toggles
    if (state.filterINE) {
        addTag('Filtro', 'Solo INE', () => {
            state.filterINE = false;
            $('filterINE')?.classList.remove('active', 'bg-brand-emerald', 'text-white');
        });
    }
    if (state.filterSEGEN) {
        addTag('Filtro', 'Solo SEGEN', () => {
            state.filterSEGEN = false;
            $('filterSEGEN')?.classList.remove('active', 'bg-brand-purple', 'text-white');
        });
    }

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
