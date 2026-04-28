import { state } from '../state.js';
import { COLORS } from '../config.js';
import { getSegmentPopupHtml, getControlTooltipHtml } from './templates.js';

/**
 * Loads the segment polygons from the GeoJSON file into state.
 */
export async function loadGeoJSONData() {
    if (state.geoJSONData) return;
    try {
        const response = await fetch('data/segmentos_monagas.geojson');
        if (!response.ok) throw new Error('Error loading GeoJSON');
        const data = await response.json();
        state.geoJSONData = data;

        // Pre-calculate BBOXes for efficient lookup
        const { getPolygonBBox } = await import('../helpers.js');
        state.segmentBBoxes = state.geoJSONData.features.map(f => {
            if (!f.geometry) return null;
            let allPoints = [];
            
            if (f.geometry.type === 'Polygon') {
                allPoints = f.geometry.coordinates[0];
            } else if (f.geometry.type === 'MultiPolygon') {
                allPoints = f.geometry.coordinates.flatMap(poly => poly[0]);
            }
            
            if (allPoints.length > 0) {
                return { bbox: getPolygonBBox(allPoints), props: f.properties, feature: f };
            }
            return null;
        }).filter(b => b !== null);

        drawGeoJSONLayer();
    } catch (e) {
        console.error('FAILED TO LOAD GEOJSON:', e);
    }
}

export function drawGeoJSONLayer() {
    if (!state.geoJSONData || !state.map || state.geoJSONLayer) return;
    try {
        state.geoJSONLayer = L.geoJSON(state.geoJSONData, {
            style: (feature) => {
                const props = feature.properties;
                const isRural = props.cod_seg === '000' || props.cod_seg === '0';
                const idVal = isRural ? (props.cod_sc || '0') : (props.cod_seg || '0');
                const compositeKey = `${idVal}`;
                const hash = compositeKey.split('').reduce((a, b) => (a * 31) + b.charCodeAt(0), 0) >>> 0;
                const color = COLORS[(hash * 13) % COLORS.length];
                
                return {
                    color: color,
                    weight: 2,
                    opacity: 0.8,
                    fillColor: color,
                    fillOpacity: 0.15
                };
            },
            onEachFeature: (feature, layer) => {
                const props = feature.properties;
                const isRural = props.cod_seg === '000' || props.cod_seg === '0';
                const idVal = isRural ? (props.cod_sc || '0') : (props.cod_seg || '0');
                const compositeKey = `${idVal}`;
                const hash = compositeKey.split('').reduce((a, b) => (a * 31) + b.charCodeAt(0), 0) >>> 0;
                const color = COLORS[(hash * 13) % COLORS.length];

                const typeLabel = isRural ? 'Sector' : 'Segmento';
                const displayId = isRural ? (props.cod_sc || 'N/A') : (props.cod_seg || 'N/A');

                layer.bindPopup(getSegmentPopupHtml(typeLabel, displayId, color, props), { className: 'custom-popup' });

                layer.on('mouseover', function () {
                    this.setStyle({ fillOpacity: 0.35, weight: 3 });
                });
                layer.on('mouseout', function () {
                    this.setStyle({ fillOpacity: 0.15, weight: 2 });
                });
            }
        }).addTo(state.map);

        if (state.layerControl) {
            state.layerControl.addOverlay(state.geoJSONLayer, 'Segmentos Monagas');
        }
    } catch (e) {
        console.error('FAILED TO DRAW GEOJSON LAYER:', e);
    }
}

export async function loadControlsData() {
    if (state.controlsIndex) return;
    try {
        const response = await fetch('data/CONTROLES.geojson');
        if (!response.ok) throw new Error(`Error loading CONTROLES.geojson: ${response.status}`);
        state.controlsData = await response.json();

        state.controlsIndex = new Map();
        state.validControls = new Set();
        state.validSeries = new Set();
        state.validLineas = new Set();
        state.controlDetails = new Map();

        const _toInt = v => { if (v == null) return null; const n = parseInt(String(v).trim(), 10); return isNaN(n) ? null : n; };
        state.controlsData.features.forEach(f => {
            const p = f.properties;
            const lInt = _toInt(p.LINEA);
            const sInt = _toInt(p.SERIE);
            if (lInt === null || sInt === null) return;
            
            const ctrl = String(p.CONTROL || '').trim();
            const serie = String(sInt);
            const linea = String(lInt);
            
            state.validControls.add(ctrl);
            state.validSeries.add(serie);
            state.validLineas.add(linea);

            if (!state.controlDetails.has(ctrl)) {
                state.controlDetails.set(ctrl, { series: new Set(), lineas: new Set() });
            }
            state.controlDetails.get(ctrl).series.add(serie);
            state.controlDetails.get(ctrl).lineas.add(linea);

            state.controlsIndex.set(`${ctrl}-${serie}-${linea}`, {
                COD_SEG: String(p.COD_SEG ?? '').trim(),
                COD_MANZA: String(p.COD_MANZA ?? '').trim(),
            });
        });

        if (state.map) drawControlsLayer();
    } catch (e) {
        console.error('FAILED TO LOAD CONTROLES.geojson:', e);
    }
}

export function drawControlsLayer() {
    if (!state.controlsData || !state.map) return;
    try {
        if (state.controlsLayer) {
            state.controlsLayer.remove();
            if (state.layerControl) {
                state.layerControl.removeLayer(state.controlsLayer);
            }
        }
        
        state.controlsLayer = L.geoJSON(state.controlsData, {
            pointToLayer: (feature, latlng) => {
                return L.circleMarker(latlng, {
                    radius: 3.5,
                    fillColor: '#38BDF8',  // Color único
                    color: '#ffffff',
                    weight: 1,
                    opacity: 0.9,
                    fillOpacity: 0.85,
                });
            },
            onEachFeature: (feature, layer) => {
                layer.bindTooltip(getControlTooltipHtml(feature.properties), { sticky: true, opacity: 0.95 });
            }
        }); // No se añade al mapa — desactivado por defecto

        if (state.layerControl) {
            state.layerControl.addOverlay(state.controlsLayer, 'Viviendas');
        }
    } catch (e) {
        console.error('FAILED TO DRAW CONTROLS LAYER:', e);
    }
}
