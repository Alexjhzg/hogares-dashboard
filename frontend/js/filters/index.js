/**
 * ─── Filters (Refactorized Orchestrator) ─────────────────────────────────────
 * All search, segmentation, and UI logic for dashboard filters.
 */

// 1. Filtering Logic & Search Engine
export { setRenderAll, applyFilters, resetFilters } from './logic.js';

// 2. Off-Canvas Panel & Dropdown Population
export { openFiltersPanel, closeFiltersPanel, populateFilters, populateEncuestadores } from './ui-panel.js';

// 3. Active Filter Badges/Tags
export { renderActiveFilterTags } from './tags.js';

// 4. Custom Presets (localStorage-persisted)
export { initCustomPresets, renderCustomPresets, loadCustomPresets } from './presets.js';
