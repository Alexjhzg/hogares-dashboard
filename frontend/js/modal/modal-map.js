import { state } from '../core/index.js';
import { COLORS } from '../core/index.js';
import { getMiniMapPopupHtml, getMarkerPopupHtml } from './templates.js';
import { getControlTooltipHtml } from '../map/templates.js';
import { extractNested, _ctrlKey } from './utils.js';

export function initOrUpdateMiniMap(params) {
    const { displayLat, displayLng, declaredSeg, actualSeg, ptStart, ptIni, ptFin, ptMain, isFlagged, rec } = params;
    
    // Extraer clave única del registro actual para filtrar la vivienda esperada
    const rawControl = extractNested(rec, 'group_sh53u78/control') || extractNested(rec, 'control') || '';
    const rawSerie   = extractNested(rec, 'n_serie') || '';
    const rawLinea   = extractNested(rec, 'n_linea') || '';
    const targetKey  = _ctrlKey(rawControl, rawSerie, rawLinea);

    if (!state.detailMiniMapObj) {
        state.detailMiniMapObj = L.map('detailMap', { zoomControl: false }).setView([displayLat, displayLng], 16);
        const satLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', { maxZoom: 20, subdomains: ['mt0','mt1','mt2','mt3'], attribution: '&copy; Google' });
        const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' });
        satLayer.addTo(state.detailMiniMapObj);
        
        // Inicializar control de capas (se actualizará después con overlays)
        state.detailMiniMapLayerControl = L.control.layers(
            { 'Google Satélite': satLayer, 'OpenStreetMap': osmLayer }, 
            null, 
            { position: 'topright' }
        ).addTo(state.detailMiniMapObj);

    } else {
        state.detailMiniMapObj.setView([displayLat, displayLng], 16);
        state.detailMiniMapObj.eachLayer(layer => {
            if (!(layer instanceof L.TileLayer)) {
                state.detailMiniMapObj.removeLayer(layer);
            }
        });
        // Limpiar overlays del control previo
        if (state.detailMiniMapLayerControl) {
            state.detailMiniMapObj.removeControl(state.detailMiniMapLayerControl);
            const satLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', { maxZoom: 20, subdomains: ['mt0','mt1','mt2','mt3'], attribution: '&copy; Google' });
            const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' });
            state.detailMiniMapLayerControl = L.control.layers(
                { 'Google Satélite': satLayer, 'OpenStreetMap': osmLayer }, 
                null, 
                { position: 'topright' }
            ).addTo(state.detailMiniMapObj);
        }
    }

    const overlays = {};

    // Draw GeoJSON segments
    if (state.geoJSONData) {
        const segLayer = L.geoJSON(state.geoJSONData, {
            style: (feature) => {
                const idStr = String(feature.properties.cod_seg || '0');
                const isCurrent = String(feature.properties.cod_seg) === String(declaredSeg);
                const hash = idStr.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
                const color = COLORS[hash % COLORS.length];
                return {
                    color: isCurrent ? '#FBBF24' : color,
                    weight: isCurrent ? 2.5 : 1.5,
                    opacity: 0.9,
                    fillColor: isCurrent ? '#FBBF24' : color,
                    fillOpacity: isCurrent ? 0.35 : 0.15
                };
            },
            onEachFeature: (feature, layer) => {
                const p = feature.properties || {};
                const cod = p.cod_seg || p.id || 'N/A';
                const mun = p.cod_munici || p.mun || 'N/A';
                const par = p.cod_parroq || p.par || 'N/A';
                const isCurrent = String(cod) === String(declaredSeg);
                const isActual = String(cod) === String(actualSeg);
                const isRuralFeature = String(cod) === '000' || String(cod) === '0';
                const featureLabel = isRuralFeature ? 'Sector' : 'Segmento';
                const displayId = isRuralFeature ? (p.cod_sc || '000') : cod;

                const popupHtml = getMiniMapPopupHtml({
                    cod, mun, par, declaredSeg, actualSeg, featureLabel, displayId, isCurrent, isActual
                });

                layer.bindPopup(popupHtml, { className: 'custom-popup', maxWidth: 260 });
            }
        }).addTo(state.detailMiniMapObj);
        overlays['Segmentos'] = segLayer;
    }

    // Draw Dwellings (Viviendas) - Filtrado para mostrar solo la de este registro
    if (state.controlsData) {
        const vLayer = L.geoJSON(state.controlsData, {
            filter: (feature) => {
                const p = feature.properties;
                // Usamos la misma lógica de clave que el dashboard
                const featKey = _ctrlKey(p.CONTROL, p.SERIE, p.LINEA);
                return featKey === targetKey;
            },
            pointToLayer: (feature, latlng) => {
                return L.circleMarker(latlng, {
                    radius: 7,             // Un poco más grande en la ficha para que resalte
                    fillColor: '#38BDF8',  // Azul celeste único
                    color: '#ffffff',
                    weight: 2,
                    opacity: 1,
                    fillOpacity: 1,
                });
            },
            onEachFeature: (feature, layer) => {
                layer.bindPopup(getControlTooltipHtml(feature.properties), { className: 'custom-popup' });
            }
        }).addTo(state.detailMiniMapObj); // En la ficha sí lo mostramos por defecto
        
        overlays['Vivienda Esperada'] = vLayer;
    }

    // Actualizar control de capas con los overlays
    if (state.detailMiniMapLayerControl) {
        for (const [name, layer] of Object.entries(overlays)) {
            state.detailMiniMapLayerControl.addOverlay(layer, name);
        }
    }

    const validPoints = [], pathCoords = [];

    const createMarker = (pt, color, title, type, r) => {
        if (!pt) return;
        const icon = L.divIcon({ 
            className: 'custom-minimap-marker', 
            html: `<div style="background-color:${color};width:14px;height:14px;border-radius:50%;border:2px solid white;box-shadow:0 0 10px ${color};"></div>`, 
            iconSize: [14, 14], 
            iconAnchor: [7, 7] 
        });

        const accText = pt.acc ? `<span class="text-brand-emerald">± ${pt.acc}m</span>` : '<span class="text-slate-500">N/A</span>';
        const altText = pt.alt ? `${pt.alt}m s.n.m.` : 'N/A';
        const timeStr = (type === 'start' ? r.start : r.end);
        const timeText = timeStr ? new Date(timeStr).toLocaleTimeString() : 'N/A';

        const popup = getMarkerPopupHtml(title, color, pt, accText, altText, timeText);
        L.marker([pt.lat, pt.lng], { icon }).addTo(state.detailMiniMapObj).bindPopup(popup, { className: 'custom-popup-enrich' });
        validPoints.push([pt.lat, pt.lng]);
        pathCoords.push([pt.lat, pt.lng]);
    };

    if (ptStart) createMarker(ptStart, '#3B82F6', 'Apertura de la Encuesta', 'start', rec);
    if (ptIni) createMarker(ptIni, '#10B981', 'Confirmación Inicial', 'start', rec);
    if (ptFin) createMarker(ptFin, '#F59E0B', 'Cierre de Encuesta', 'end', rec);
    if (!ptStart && !ptIni && !ptFin && ptMain) createMarker(ptMain, isFlagged ? '#EF4444' : '#10B981', 'Ubicación Registrada', 'end', rec);

    if (pathCoords.length > 1) L.polyline(pathCoords, { color: '#94a3b8', dashArray: '4, 4', weight: 2, opacity: 0.6 }).addTo(state.detailMiniMapObj);

    const targetCircle = ptIni || ptMain;
    if (targetCircle) {
        const circleColor = isFlagged ? '#EF4444' : '#10B981';
        L.circle([targetCircle.lat, targetCircle.lng], {
            radius: 500, color: circleColor, fillColor: circleColor, fillOpacity: 0.05, weight: 1.5, dashArray: '6,5', interactive: false
        }).addTo(state.detailMiniMapObj);
    }

    if (validPoints.length > 0) {
        const bounds = L.latLngBounds(validPoints);
        validPoints.length === 1 && !isFlagged 
            ? state.detailMiniMapObj.setView(validPoints[0], 16) 
            : state.detailMiniMapObj.fitBounds(bounds, { padding: [40, 40], maxZoom: 18 });
    }
    state.detailMiniMapObj.invalidateSize();
}
