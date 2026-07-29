import { state } from '../core/index.js';
import { drawGeoJSONLayer, drawControlsLayer } from './layers.js';

export function initMap() {
    if (state.map) return;

    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' });
    const googleSat = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        maxZoom: 20, subdomains: ['mt0', 'mt1', 'mt2', 'mt3'], attribution: '&copy; Google'
    });

    state.map = L.map('mapView', { center: [10.4806, -66.8983], zoom: 12, layers: [osm], zoomControl: false, preferCanvas: true });
    
    // Layer mapping for control
    const baseLayers = { 'OpenStreetMap': osm, 'Google Satélite': googleSat };
    const overLayers = {};
    
    state.layerControl = L.control.layers(baseLayers, overLayers, { collapsed: window.innerWidth < 768 }).addTo(state.map);
    L.control.scale().addTo(state.map);

    state.markerCluster = L.markerClusterGroup({ showCoverageOnHover: false, zoomToBoundsOnClick: true, spiderfyOnMaxZoom: true });
    state.map.addLayer(state.markerCluster);

    // Draw segments layer
    drawGeoJSONLayer();
    drawControlsLayer();

    // Default mobile behavior: lock map drag to allow page scrolling
    if (window.innerWidth < 768 || ('ontouchstart' in window)) {
        toggleMapTouchInteraction(false);
    }
}

/**
 * Toggles single-finger touch dragging on mobile devices to prevent map scroll traps.
 */
export function toggleMapTouchInteraction(forceState) {
    if (!state.map) return;

    const btn = document.getElementById('btnToggleMapTouch');
    const icon = document.getElementById('iconMapLock');

    const currentlyEnabled = state.map.dragging ? state.map.dragging.enabled() : false;
    const shouldEnable = typeof forceState === 'boolean' ? forceState : !currentlyEnabled;

    if (shouldEnable) {
        if (state.map.dragging) state.map.dragging.enable();
        if (state.map.tapHold) state.map.tapHold.enable();
        if (btn) {
            btn.classList.add('bg-brand-blue/15');
            btn.title = "Mapa interactivo activo. Toca para activar scroll libre.";
        }
        if (icon) {
            icon.setAttribute('data-lucide', 'unlock');
            icon.setAttribute('class', 'w-4 h-4 text-brand-emerald');
        }
    } else {
        if (state.map.dragging) state.map.dragging.disable();
        if (btn) {
            btn.classList.remove('bg-brand-blue/15');
            btn.title = "Scroll libre activo. Toca para interactuar con el mapa.";
        }
        if (icon) {
            icon.setAttribute('data-lucide', 'lock');
            icon.setAttribute('class', 'w-4 h-4 text-brand-orange');
        }
    }

    if (window.lucide && window.lucide.createIcons) {
        window.lucide.createIcons();
    }
}
