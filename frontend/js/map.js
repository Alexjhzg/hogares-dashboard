// ─── Map (Leaflet) Orchestrator ──────────────────────────────
// This file serves as the main entry point for the map module.
// It integrates sub-modules to keep logic clean and maintainable.

export { initMap } from './map/core.js';
export { loadGeoJSONData, loadControlsData } from './map/layers.js';
export { renderMap } from './map/markers.js';
export { initVerRutaButton } from './map/route.js';

/**
 * Pad a string or number with leading zeros to the desired length.
 * padCtrl('4', 4) → '0004', padCtrl('15', 3) → '015'
 */
export function padCtrl(val, len) {
    return String(parseInt(val, 10) || 0).padStart(len, '0');
}
