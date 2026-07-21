/**
 * ─── Custom Presets Manager ───────────────────────────────────────────────────
 * Allows users to save the current filter state as a named quick-preset,
 * persisted in localStorage. Presets appear as chips next to system presets.
 *
 * Key: 'esca_custom_presets'
 * Max presets: 8
 *
 * Arquitectura: DRY, sin sobre-ingeniería. DOM queries via $() utility salvo
 * dentro de fragmentos dinámicos donde document.querySelector es correcto.
 */

import { state } from '../core/index.js';
import { $, showToast } from '../utils/index.js';
import { applyFilters } from './logic.js';

const STORAGE_KEY = 'esca_custom_presets';
const MAX_PRESETS  = 8;

// ── Filter IDs captured in a preset ──────────────────────────────────────────
const FILTER_IDS = [
    'filterEncuestador', 'filterMunicipio', 'filterSemana', 'filterControl',
    'filterParroquia', 'filterNodo', 'filterEstado', 'filterClasificacion',
    'filterCondicion', 'filterSituacionVivienda', 'filterUso', 'filterAlerta',
    'filterHoraTransmision', 'filterHoraInicio', 'filterTasaNoRespuesta',
    'filterFechaInicio', 'filterFechaFin',
];

// ── Available icons for presets (Lucide icon ids) ────────────────────────────
const PRESET_ICONS = [
    'bookmark', 'star', 'user', 'map-pin', 'calendar',
    'filter', 'zap', 'flag', 'heart', 'target',
    'briefcase', 'home', 'layers', 'tag', 'activity',
];

// ── CSS class sets (pre-defined so Tailwind JIT includes them) ────────────────
// Bug fix: classList.add/remove ignores 'dark:' prefix — use data-attribute
// or pre-defined CSS classes instead of passing 'dark:...' strings to classList.
const ICON_ACTIVE_CLS   = ['bg-indigo-100', 'text-indigo-500'];
const ICON_INACTIVE_CLS = ['bg-indigo-100', 'text-indigo-500'];

// ── Storage helpers ───────────────────────────────────────────────────────────
export function loadCustomPresets() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (_) {
        return [];
    }
}

function persistPresets(presets) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
    } catch (_) {}
}

// ── Capture current filter state ─────────────────────────────────────────────
function captureCurrentFilters() {
    const filters = {};
    FILTER_IDS.forEach(id => {
        const el = $(id);
        filters[id] = el ? el.value : '';
    });
    filters.filterINE       = state.filterINE       || false;
    filters.filterSEGEN     = state.filterSEGEN     || false;
    filters.quickFilterMode = state.quickFilterMode || 'all';
    return filters;
}

// ── Check if any filter is active ────────────────────────────────────────────
function hasActiveFilters(filters) {
    return FILTER_IDS.some(id => filters[id] && filters[id] !== '')
        || filters.filterINE
        || filters.filterSEGEN
        || (filters.quickFilterMode && filters.quickFilterMode !== 'all');
}

// ── Apply a preset to the DOM and trigger filtering ───────────────────────────
export function applyCustomPreset(preset) {
    const { filters } = preset;

    FILTER_IDS.forEach(id => {
        const el = $(id);
        if (!el) return;
        el.value = filters[id] || '';

        // Sync searchable combobox display text when present
        const wrapper = el.parentNode?.querySelector('.combobox-container');
        if (wrapper) {
            const input    = wrapper.querySelector('.combobox-input');
            const clearBtn = wrapper.querySelector('.combobox-clear');
            if (input) {
                const selectedOpt = Array.from(el.options).find(o => o.value === el.value);
                input.value = selectedOpt ? selectedOpt.textContent : 'Todos';
            }
            if (clearBtn) clearBtn.classList.toggle('hidden', !el.value);
        }
    });

    // Restore boolean/mode state
    state.filterINE       = filters.filterINE       || false;
    state.filterSEGEN     = filters.filterSEGEN     || false;
    state.quickFilterMode = filters.quickFilterMode || 'all';

    // Sync INE/SEGEN button visual state
    ['filterINE', 'filterSEGEN'].forEach(id => {
        const btn = $(id);
        if (!btn) return;
        const active     = state[id];
        const colorClass = id === 'filterINE' ? 'bg-brand-emerald' : 'bg-brand-purple';
        btn.classList.toggle('active', active);
        btn.classList.toggle(colorClass, active);
        btn.classList.toggle('text-white', active);
    });

    applyFilters();
    highlightActivePreset(preset.id);
}

// ── Highlight which preset chip is currently active ───────────────────────────
function highlightActivePreset(activeId) {
    document.querySelectorAll('.custom-preset-chip').forEach(chip => {
        const isActive = chip.dataset.presetId === activeId;
        chip.classList.toggle('ring-2',          isActive);
        chip.classList.toggle('ring-indigo-400', isActive);
        chip.classList.toggle('bg-indigo-500/20', isActive);
        chip.classList.toggle('bg-indigo-500/10', !isActive);
    });
}

// ── Save a new preset ─────────────────────────────────────────────────────────
export function saveCustomPreset(name, iconId) {
    const presets = loadCustomPresets();
    if (presets.length >= MAX_PRESETS) {
        showToast(`Máximo de ${MAX_PRESETS} presets alcanzado. Elimina uno primero.`, 'warning');
        return false;
    }

    const filters = captureCurrentFilters();
    if (!hasActiveFilters(filters)) {
        showToast('Aplica al menos un filtro antes de guardar.', 'warning');
        return false;
    }

    const preset = {
        id:        `preset_${Date.now()}`,
        name:      name.trim() || 'Mi Preset',
        icon:      iconId || 'bookmark',
        filters,
        createdAt: new Date().toISOString(),
    };

    presets.push(preset);
    persistPresets(presets);
    renderCustomPresets();
    showToast(`Preset "${preset.name}" guardado.`, 'success');
    return true;
}

// ── Delete a preset ───────────────────────────────────────────────────────────
export function deleteCustomPreset(id) {
    const presets = loadCustomPresets().filter(p => p.id !== id);
    persistPresets(presets);
    renderCustomPresets();
}

// ── Render chips in #customPresetsContainer ───────────────────────────────────
export function renderCustomPresets() {
    const container = $('customPresetsContainer');
    if (!container) return;

    const presets = loadCustomPresets();
    container.innerHTML = '';

    if (presets.length === 0) {
        container.classList.add('hidden');
        return;
    }

    // Visual separator between system presets and custom ones
    const sep = document.createElement('span');
    sep.className = 'w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1 self-center flex-none';
    container.appendChild(sep);

    presets.forEach(preset => {
        const chip = document.createElement('button');
        chip.className = [
            'custom-preset-chip px-2.5 py-1 rounded-lg text-[10px] font-bold',
            'bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400',
            'border border-indigo-500/20 transition-all flex items-center gap-1.5',
        ].join(' ');
        chip.dataset.presetId = preset.id;
        chip.title = `Aplicar: ${preset.name}`;

        // XSS-safe: use textContent for user-supplied preset.name
        chip.innerHTML = `
            <i data-lucide="${preset.icon}" class="w-3 h-3 flex-none pointer-events-none"></i>
            <span class="preset-label pointer-events-none max-w-[120px] truncate"></span>
            <span class="delete-preset-btn flex-none w-3.5 h-3.5 rounded-sm flex items-center justify-center hover:bg-red-500/20 hover:text-red-400 text-slate-400 transition-colors ml-0.5" title="Eliminar preset" data-id="${preset.id}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-2.5 h-2.5 pointer-events-none"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </span>
        `;
        // Set name via textContent to avoid XSS
        chip.querySelector('.preset-label').textContent = preset.name;

        chip.addEventListener('click', e => {
            if (e.target.closest('.delete-preset-btn')) {
                e.stopPropagation();
                deleteCustomPreset(preset.id);
                return;
            }
            applyCustomPreset(preset);
        });

        container.appendChild(chip);
    });

    container.classList.remove('hidden');

    if (window.lucide) lucide.createIcons({ nodes: container.querySelectorAll('[data-lucide]') });
}

// ── Save Preset Popover (inline) ─────────────────────────────────────────────
let popoverOpen = false;

/**
 * Build the popover DOM node. Uses a local selectedIcon variable returned via
 * a closure ref so callers can read the current selection.
 */
function buildPopover() {
    const existing = $('savePresetPopover');
    if (existing) existing.remove();

    const iconOptions = PRESET_ICONS.map(iconId =>
        `<button type="button" class="icon-opt w-7 h-7 flex items-center justify-center rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-500" data-icon="${iconId}" title="${iconId}" aria-label="${iconId}">
            <i data-lucide="${iconId}" class="w-3.5 h-3.5 pointer-events-none"></i>
        </button>`
    ).join('');

    const popover = document.createElement('div');
    popover.id        = 'savePresetPopover';
    popover.className = [
        'absolute top-full left-0 mt-2 z-[200]',
        'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700',
        'rounded-2xl shadow-2xl p-4 w-72 animate-slide-up',
    ].join(' ');

    popover.innerHTML = `
        <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-black text-slate-700 dark:text-slate-200 tracking-tight">Guardar Filtros como Preset</span>
            <button class="popover-close-btn text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors" aria-label="Cerrar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="w-4 h-4"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
        </div>
        <input class="preset-name-input w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-800 dark:text-slate-100 outline-none focus:border-indigo-400 transition-all mb-3"
            type="text" maxlength="30" placeholder="Nombre del preset (máx. 30 caracteres)" />
        <p class="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Ícono</p>
        <div class="icon-grid flex flex-wrap gap-1 mb-4">
            ${iconOptions}
        </div>
        <button class="confirm-save-btn w-full py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-black transition-colors flex items-center justify-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="w-3.5 h-3.5"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
            Guardar Preset
        </button>
    `;

    return popover;
}

/** Mark an icon button as selected (class-based, no dark: prefix in classList) */
function selectIconBtn(popover, btn) {
    popover.querySelectorAll('.icon-opt').forEach(b => {
        b.classList.remove('bg-indigo-100', 'text-indigo-500');
        b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('bg-indigo-100', 'text-indigo-500');
    btn.setAttribute('aria-pressed', 'true');
}

function openSavePopover(anchorBtn) {
    if (popoverOpen) { closePopover(); return; }

    const popover = buildPopover();

    // Fix: append to the immediate parent and ensure it can contain an absolute child
    const anchorParent = anchorBtn.parentElement;
    if (!['relative', 'absolute', 'fixed', 'sticky'].includes(getComputedStyle(anchorParent).position)) {
        anchorParent.style.position = 'relative';
    }
    anchorParent.appendChild(popover);
    popoverOpen = true;

    let selectedIcon = PRESET_ICONS[0];

    // Render Lucide icons (only inside this popover)
    if (window.lucide) lucide.createIcons({ nodes: Array.from(popover.querySelectorAll('[data-lucide]')) });

    // Highlight first icon by default
    const firstIconBtn = popover.querySelector('.icon-opt');
    if (firstIconBtn) selectIconBtn(popover, firstIconBtn);

    // Icon selection events (delegated to the grid for fewer listeners)
    popover.querySelector('.icon-grid').addEventListener('click', e => {
        const btn = e.target.closest('.icon-opt');
        if (!btn) return;
        selectIconBtn(popover, btn);
        selectedIcon = btn.dataset.icon;
    });

    // ── Query scoped to popover (no global getElementById) ───────────────────
    const nameInput   = popover.querySelector('.preset-name-input');
    const confirmBtn  = popover.querySelector('.confirm-save-btn');
    const closeBtn    = popover.querySelector('.popover-close-btn');

    const doSave = () => {
        const saved = saveCustomPreset(nameInput.value, selectedIcon);
        if (saved) closePopover();
    };

    closeBtn.addEventListener('click', closePopover);
    confirmBtn.addEventListener('click', doSave);
    nameInput.addEventListener('keydown', e => {
        if (e.key === 'Enter')  doSave();
        if (e.key === 'Escape') closePopover();
    });

    setTimeout(() => nameInput.focus(), 50);

    // Outside-click guard (delayed so the opening click doesn't trigger it)
    setTimeout(() => document.addEventListener('click', outsideClickHandler), 100);
}

function closePopover() {
    const popover = $('savePresetPopover');
    if (popover) popover.remove();
    popoverOpen = false;
    document.removeEventListener('click', outsideClickHandler);
}

function outsideClickHandler(e) {
    const popover = $('savePresetPopover');
    const saveBtn = $('btnSavePreset');
    if (popover && !popover.contains(e.target) && e.target !== saveBtn) {
        closePopover();
    }
}

// ── Public init ───────────────────────────────────────────────────────────────
export function initCustomPresets() {
    renderCustomPresets();

    const saveBtn = $('btnSavePreset');
    if (saveBtn) {
        saveBtn.addEventListener('click', e => {
            e.stopPropagation();
            openSavePopover(saveBtn);
        });
    }
}
