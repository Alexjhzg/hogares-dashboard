import { state } from '../state.js';
import { drawGeoJSONLayer, drawControlsLayer } from './layers.js';

export function initMap() {
    if (state.map) return;

    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' });
    const googleSat = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        maxZoom: 20, subdomains: ['mt0', 'mt1', 'mt2', 'mt3'], attribution: '&copy; Google'
    });

    state.map = L.map('mapView', { center: [10.4806, -66.8983], zoom: 12, layers: [osm], zoomControl: false });
    
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
}
