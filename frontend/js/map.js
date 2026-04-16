// ─── Map (Leaflet) ───────────────────────────────────────────────────────────
// Handles the main coverage map and quick-filter buttons.
// Depends on globals: L (Leaflet), lucide.

import { state } from './state.js?v=39';
import { $ } from './helpers.js?v=39';
import { applyFilters } from './filters.js?v=39';
import { showDetailModal } from './modal.js?v=39';
import { COLORS, ALERT_MAP } from './config.js?v=39';

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Pad a string or number with leading zeros to the desired length.
 * padCtrl('4', 4) → '0004', padCtrl('15', 3) → '015'
 */
export function padCtrl(val, len) {
    return String(parseInt(val, 10) || 0).padStart(len, '0');
}

export function initMap() {
    if (state.map) return;

    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' });
    const googleSat = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        maxZoom: 20, subdomains: ['mt0', 'mt1', 'mt2', 'mt3'], attribution: '&copy; Google'
    });

    state.map = L.map('mapView', { center: [10.4806, -66.8983], zoom: 12, layers: [osm] });
    
    // Layer mapping for control
    const baseLayers = { 'OpenStreetMap': osm, 'Google Satélite': googleSat };
    const overLayers = {};
    
    state.layerControl = L.control.layers(baseLayers, overLayers, { collapsed: false }).addTo(state.map);
    L.control.scale().addTo(state.map);

    state.markerCluster = L.markerClusterGroup({ showCoverageOnHover: false, zoomToBoundsOnClick: true, spiderfyOnMaxZoom: true });
    state.map.addLayer(state.markerCluster);

    // Draw segments layer
    drawGeoJSONLayer();
}

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
        const { getPolygonBBox } = await import('./helpers.js?v=39');
        // Pre-calcular BBoxes para búsqueda rápida
        state.segmentBBoxes = state.geoJSONData.features.map(f => {
            if (!f.geometry) return null;
            let allPoints = [];
            
            if (f.geometry.type === 'Polygon') {
                allPoints = f.geometry.coordinates[0]; // Primer anillo (exterior)
            } else if (f.geometry.type === 'MultiPolygon') {
                // Aplanamos los primeros anillos de todos los polígonos
                allPoints = f.geometry.coordinates.flatMap(poly => poly[0]);
            }
            
            if (allPoints.length > 0) {
                return { bbox: getPolygonBBox(allPoints), props: f.properties, feature: f };
            }
            return null;
        }).filter(b => b !== null);

        // Si el mapa ya está listo, dibujamos la capa inmediatamente
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
                const props   = feature.properties;
                const isRural = props.cod_seg === '000' || props.cod_seg === '0';
                const idVal   = isRural ? (props.cod_sc || '0') : (props.cod_seg || '0');
                
                // Clave basada únicamente en el identificador del segmento o sector
                const compositeKey = `${idVal}`;
                const hash  = compositeKey.split('').reduce((a, b) => (a * 31) + b.charCodeAt(0), 0) >>> 0;
                
                // Usamos un multiplicador primo para "saltar" en la paleta y aumentar contraste entre vecinos
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
                const props   = feature.properties;
                const isRural = props.cod_seg === '000' || props.cod_seg === '0';
                const idVal   = isRural ? (props.cod_sc || '0') : (props.cod_seg || '0');
                
                const compositeKey = `${idVal}`;
                const hash  = compositeKey.split('').reduce((a, b) => (a * 31) + b.charCodeAt(0), 0) >>> 0;
                const color = COLORS[(hash * 13) % COLORS.length];

                const typeLabel = isRural ? 'Sector' : 'Segmento';
                const displayId = isRural ? (props.cod_sc || 'N/A') : (props.cod_seg || 'N/A');

                let popupContent = `<div class="p-2 font-sans">
                    <div class="text-[10px] uppercase font-bold text-slate-500 mb-1">${typeLabel}</div>
                    <div class="text-sm font-bold flex items-center gap-2">
                        <span class="w-2.5 h-2.5 rounded-full" style="background:${color}"></span>
                        <span class="text-slate-800 dark:text-white">${displayId}</span>
                    </div>
                    <div class="space-y-2 mt-3 pt-2 border-t border-slate-100 dark:border-white/5">
                        <div class="flex justify-between items-center">
                            <div class="text-[8px] uppercase text-slate-400 font-bold">Municipio</div>
                            <div class="text-[10px] font-semibold text-slate-700 dark:text-slate-300">${props.cod_munici || '—'}</div>
                        </div>
                        <div class="flex justify-between items-center">
                            <div class="text-[8px] uppercase text-slate-400 font-bold">Parroquia</div>
                            <div class="text-[10px] font-semibold text-slate-700 dark:text-slate-300">${props.cod_parroq || '—'}</div>
                        </div>
                    </div>
                </div>`;
                layer.bindPopup(popupContent, { className: 'custom-popup' });

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

/**
 * Loads CONTROLES.geojson, builds the controlsIndex lookup Set,
 * and adds an optional Leaflet overlay layer.
 */
export async function loadControlsData() {
    if (state.controlsIndex) return; // Already loaded
    try {
        const response = await fetch('data/CONTROLES.geojson');
        if (!response.ok) throw new Error(`Error loading CONTROLES.geojson: ${response.status}`);
        state.controlsData = await response.json();

        // Build O(1) index: key = 'CTRL4-SERIE_int-LINEA_int'
        state.controlsIndex = new Map();
        state.validControls = new Set();
        state.validSeries   = new Set();
        state.validLineas   = new Set();
        state.controlDetails = new Map(); // Para modal: Mapea { control -> { series: Set, lineas: Set } }

        const _toInt = v => { if (v == null) return null; const n = parseInt(String(v).trim(), 10); return isNaN(n) ? null : n; };
        state.controlsData.features.forEach(f => {
            const p     = f.properties;
            const lInt  = _toInt(p.LINEA);
            const sInt  = _toInt(p.SERIE);
            if (lInt === null || sInt === null) return;
            
            const ctrl  = String(p.CONTROL || '').trim();
            const serie = String(sInt);
            const linea = String(lInt);
            
            // Add to sets for independent validation
            state.validControls.add(ctrl);
            state.validSeries.add(serie);
            state.validLineas.add(linea);

            if (!state.controlDetails.has(ctrl)) {
                state.controlDetails.set(ctrl, { series: new Set(), lineas: new Set() });
            }
            state.controlDetails.get(ctrl).series.add(serie);
            state.controlDetails.get(ctrl).lineas.add(linea);

            state.controlsIndex.set(`${ctrl}-${serie}-${linea}`, {
                COD_SEG:   String(p.COD_SEG   ?? '').trim(),
                COD_MANZA: String(p.COD_MANZA ?? '').trim(),
            });
        });

        console.log(`map.js: CONTROLES index built — ${state.controlsIndex.size} entries`);

        // Draw the layer if map is ready (activated by user via layer control)
        if (state.map) _drawControlsLayer();

    } catch (e) {
        console.error('FAILED TO LOAD CONTROLES.geojson:', e);
    }
}

/**
 * Renders point markers for each control entry as an overlay layer.
 * Added to the Leaflet layer control but hidden by default.
 * @private
 */
function _drawControlsLayer() {
    if (!state.controlsData || !state.map || state.controlsLayer) return;
    try {
        state.controlsLayer = L.geoJSON(state.controlsData, {
            pointToLayer: (feature, latlng) => {
                return L.circleMarker(latlng, {
                    radius: 4,
                    fillColor: '#FACC15',
                    color: '#92400E',
                    weight: 1,
                    opacity: 0.9,
                    fillOpacity: 0.7,
                });
            },
            onEachFeature: (feature, layer) => {
                const p = feature.properties;
                layer.bindTooltip(
                    `<div style="font-family:Inter,sans-serif;font-size:11px;line-height:1.5">
                        <b>Control ${p.CONTROL}</b> · Serie ${p.SERIE}<br>
                        Línea ${p.LINEA} · Seg ${p.COD_SEG} · Manz ${p.COD_MANZA}
                     </div>`,
                    { sticky: true, opacity: 0.95 }
                );
            }
        });

        if (state.layerControl) {
            state.layerControl.addOverlay(state.controlsLayer, '📍 Puntos de Control');
        }

    } catch (e) {
        console.error('FAILED TO DRAW CONTROLS LAYER:', e);
    }
}

export function renderMap() {
    if (!state.map || !state.markerCluster) return;
    state.markerCluster.clearLayers();

    const points = state.filtered.filter(r => r._meta.lat && r._meta.lng);

    const completedOnMap  = points.filter(r => r._meta && r._meta.estado === 'completada').length;
    const noRespOnMap     = points.length - completedOnMap;
    const agentsOnMap     = new Set(points.map(r => r._meta.cedula)).size;
    const alertasOnMap    = points.filter(r => r._meta.hasAlerts).length;
    const munsOnMap  = new Set(points.map(r => r._meta.mun).filter(m => m && m !== 'N/A'));
    const parsOnMap  = new Set(points.map(r => r._meta.par).filter(p => p && p !== 'N/A'));
    const nodosOnMap = new Set(points.map(r => r._meta.nodo).filter(n => n && n !== 'N/A'));

    if ($('mapKpiPoints'))      $('mapKpiPoints').textContent      = points.length;
    if ($('mapKpiComplete'))    $('mapKpiComplete').textContent    = completedOnMap;
    if ($('mapKpiNoRespuesta')) $('mapKpiNoRespuesta').textContent = noRespOnMap;
    if ($('mapKpiAgents'))      $('mapKpiAgents').textContent      = agentsOnMap;
    if ($('mapKpiAlertas'))     $('mapKpiAlertas').textContent     = alertasOnMap;

    const badge = $('mapCoverageBadge');
    if (badge && points.length > 0) {
        badge.classList.remove('hidden');
        if ($('mapMunCount'))  $('mapMunCount').textContent  = munsOnMap.size;
        if ($('mapParCount'))  $('mapParCount').textContent  = parsOnMap.size;
        if ($('mapNodoCount')) $('mapNodoCount').textContent = nodosOnMap.size;
    }

    const markers = points.map(r => {
        const m = r._meta;
        const isComplete  = m.estado === 'completada';
        const hasAlerts   = m.hasAlerts;
        const alertas     = m.alertas || [];

        let color, borderColor, alertBadge;
        if (hasAlerts) {
            color = '#EF4444'; borderColor = '#DC2626';
            // Compose a short summary for the top badge: first alert label
            const firstRule = ALERT_MAP[alertas[0]];
            alertBadge = `⚠ ${firstRule ? firstRule.label : 'Alerta'}${alertas.length > 1 ? ` +${alertas.length - 1}` : ''}`;
        } else if (isComplete) {
            color = '#10B981'; borderColor = '#059669'; alertBadge = 'Efectiva';
        } else {
            color = '#F59E0B'; borderColor = '#D97706'; alertBadge = 'No Respuesta';
        }

        const durText  = m.durMin !== null ? `${Math.round(m.durMin)} min` : '—';
        const distText = m.distance_m !== null ? `${Math.round(m.distance_m)} m` : '—';

        // Build segment section only when at least one field has data
        const hasSegData = m.segmento || m.sector || m.manzana || m.parcela || m.edificacion || m.direccion;
        const segSection = hasSegData ? `
                <div class="border-t border-white/5 pt-3 mb-3">
                    <div class="flex items-center gap-1.5 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                        <span class="text-[8px] uppercase font-bold text-sky-400 tracking-wider">Datos del Segmento</span>
                    </div>
                    <div class="grid grid-cols-3 gap-2 mb-2">
                        <div><div class="text-[8px] uppercase text-slate-500 font-bold">Segmento</div><div class="text-[10px] font-bold text-sky-300">${m.segmento || '—'}</div></div>
                        <div><div class="text-[8px] uppercase text-slate-500 font-bold">Sector</div><div class="text-[10px] font-bold text-white">${m.sector || '—'}</div></div>
                        <div><div class="text-[8px] uppercase text-slate-500 font-bold">Manzana</div><div class="text-[10px] font-bold text-white">${m.manzana || '—'}</div></div>
                    </div>
                    <div class="grid grid-cols-3 gap-2">
                        <div><div class="text-[8px] uppercase text-slate-500 font-bold">Parcela</div><div class="text-[10px] font-bold text-white">${m.parcela || '—'}</div></div>
                        <div><div class="text-[8px] uppercase text-slate-500 font-bold">Edificación</div><div class="text-[10px] font-bold text-white">${m.edificacion || '—'}</div></div>
                        <div><div class="text-[8px] uppercase text-slate-500 font-bold">Lado Manz.</div><div class="text-[10px] font-bold text-white">${m.lado_manz || '—'}</div></div>
                    </div>
                    ${m.direccion ? `<div class="mt-2"><div class="text-[8px] uppercase text-slate-500 font-bold">Dirección / Sector</div><div class="text-[10px] font-semibold text-slate-300 leading-tight">${m.direccion}</div></div>` : ''}
                </div>` : '';

        const html = `
            <div class="p-4 min-w-[280px] bg-[#0f172a] text-slate-200 rounded-xl" style="font-family:'Inter',sans-serif">
                <div class="flex justify-between items-center mb-3">
                    <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Encuestador</span>
                    <span class="px-2 py-0.5 rounded-md text-[9px] font-bold text-white" style="background:${color}">${alertBadge}</span>
                </div>
                <div class="font-bold text-sm text-white mb-0.5">${m.nombre}</div>
                <div class="text-[10px] text-slate-400 mb-3">${m.fecha} · ${m.cedula}</div>
                <div class="border-t border-white/5 pt-3 mb-3">
                    <div class="flex justify-between gap-4 mb-2">
                        <div class="flex-1">
                            <div class="text-[8px] uppercase text-slate-500 font-bold">Municipio</div>
                            <div class="text-[10px] font-bold text-white">${m.mun}</div>
                        </div>
                        <div class="flex-1 text-right">
                            <div class="text-[8px] uppercase text-slate-500 font-bold">Parroquia</div>
                            <div class="text-[10px] font-bold text-white">${m.par || '—'}</div>
                        </div>
                    </div>
                    <div class="flex justify-between items-center">
                        <div>
                            <div class="text-[8px] uppercase text-slate-500 font-bold">Nodo</div>
                            <div class="text-[10px] font-bold text-white">${m.nodo || '—'}</div>
                        </div>
                        <div class="text-right">
                            <div class="text-[8px] uppercase text-slate-500 font-bold">Uso</div>
                            <div class="text-[10px] font-bold text-white">${(m.uso || '—').replace(/_/g, ' ')}</div>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4 border-t border-white/5 pt-3 mb-3">
                    <div><div class="text-[8px] uppercase text-slate-500 font-bold">Duración</div>
                        <div class="text-[10px] font-bold" style="color:${m.durMin !== null && (m.durMin < 15 || m.durMin > 45) ? '#EF4444' : '#10B981'}">${durText}</div></div>
                    <div class="text-right"><div class="text-[8px] uppercase text-slate-500 font-bold">Distancia (A->I)</div>
                        <div class="text-[10px] font-bold" style="color:${hasAlerts ? '#EF4444' : '#94a3b8'}">${distText}</div></div>
                </div>
                ${alertas.length > 0 ? `
                <div class="border-t border-red-500/20 pt-3 mb-3">
                    <div class="flex items-center gap-1.5 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                        <span class="text-[8px] uppercase font-bold text-red-400 tracking-wider">Alertas Detectadas (${alertas.length})</span>
                    </div>
                    ${alertas.map(code => {
                        const rule = ALERT_MAP[code];
                        if (!rule) return '';
                        return `<div class="mb-1 p-1 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2" title="${rule.detail.replace(/\n/g,'').trim()}">
                            <div class="text-[9px] font-black text-red-400">⚠ ${rule.label}</div>
                        </div>`;
                    }).join('')}
                </div>` : ''}
                ${segSection}
                <div class="grid grid-cols-2 gap-2 border-t border-white/5 pt-3 mb-3">
                    <div><div class="text-[8px] uppercase text-slate-500 font-bold">Desplazamiento</div>
                        <div class="text-[10px] font-bold" style="color:${m.dist_ini_fin !== null && m.dist_ini_fin > 30 ? '#F59E0B' : '#10B981'}">${m.dist_ini_fin !== null ? Math.round(m.dist_ini_fin) + ' m' : '—'} <span class="text-[8px] text-slate-500">(Ini->Fin)</span></div></div>
                    <div class="flex items-end justify-end">
                        <button onclick="window.viewTraceByRecord('${r._uuid}')" class="px-3 py-1 bg-brand-blue/20 hover:bg-brand-blue/40 border border-brand-blue/30 text-brand-blue rounded-lg text-[9px] font-bold uppercase tracking-widest transition-colors flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg> Ver Ubicaciones
                        </button>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-2 border-t border-white/5 pt-3">
                    <div><div class="text-[8px] uppercase text-slate-500 font-bold">Condición</div><div class="text-[10px] font-bold text-white">${(m.condicion || '—').replace(/_/g, ' ')}</div></div>
                    <div><div class="text-[8px] uppercase text-slate-500 font-bold">Hogares / Pers.</div><div class="text-[10px] font-bold text-white">${m.hogares} / ${m.totalPers}</div></div>
                </div>
            </div>
        `;

        return L.circleMarker([m.lat, m.lng], {
            radius: 7, fillColor: color, color: borderColor,
            weight: 2, opacity: 0.9, fillOpacity: 0.7,
        }).bindPopup(html, { className: 'custom-popup', maxWidth: 320 });
    });

    state.markerCluster.addLayers(markers);

    // Si la ruta está activa, mantener los clusters ocultos y refrescar ruta
    const routeBtn = document.getElementById('btnVerRutaAgente');
    const routeActive = routeBtn?.dataset?.routeActive === '1';

    if (routeActive) {
        if (state.map.hasLayer(state.markerCluster)) state.map.removeLayer(state.markerCluster);

        // Refrescar la ruta con los nuevos datos filtrados (ej. por Control)
        const selEnc = document.getElementById('filterEncuestador');
        if (selEnc && selEnc.value) {
            drawAgentRoute(selEnc.value);
        }
    } else {
        if (markers.length > 0) {
            const bounds = state.markerCluster.getBounds();
            if (bounds.isValid()) state.map.fitBounds(bounds, { padding: [50, 50] });
        }
    }
    if (window.lucide) lucide.createIcons();
}

// ── Global Quick-Filter ───────────────────────────────────────────────────────

window.setQuickFilter = function (mode) {
    state.quickFilterMode = mode;
    const mapFilters = {
        'all': { 
            id: 'btnMapFilterAll', 
            active: ['bg-brand-blue/10', 'dark:bg-brand-blue/20', 'border-brand-blue', 'ring-brand-blue/30'],
            inactive: 'border-brand-blue' 
        },
        'efectivas': { 
            id: 'btnMapFilterEfectivas', 
            active: ['bg-brand-emerald/10', 'dark:bg-brand-emerald/20', 'border-brand-emerald', 'ring-brand-emerald/30'],
            inactive: 'border-brand-emerald' 
        },
        'no_respuesta': { 
            id: 'btnMapFilterNoRespuesta', 
            active: ['bg-brand-orange/10', 'dark:bg-brand-orange/20', 'border-brand-orange', 'ring-brand-orange/30'],
            inactive: 'border-brand-orange' 
        },
        'alertas': { 
            id: 'btnMapFilterAlertas', 
            active: ['bg-brand-red/10', 'dark:bg-brand-red/20', 'border-brand-red', 'ring-brand-red/30'],
            inactive: 'border-brand-red' 
        },
    };

    Object.entries(mapFilters).forEach(([m, cfg]) => {
        const btn = $(cfg.id);
        if (!btn) return;

        // Limpiar estados previos (incluyendo las nuevas variantes dark)
        btn.classList.remove(
            'bg-brand-blue/10', 'dark:bg-brand-blue/20', 'border-brand-blue', 'ring-brand-blue/30',
            'bg-brand-emerald/10', 'dark:bg-brand-emerald/20', 'border-brand-emerald', 'ring-brand-emerald/30',
            'bg-brand-orange/10', 'dark:bg-brand-orange/20', 'border-brand-orange', 'ring-brand-orange/30',
            'bg-brand-red/10', 'dark:bg-brand-red/20', 'border-brand-red', 'ring-brand-red/30',
            'ring-1', 'shadow-md', 'border-slate-400'
        );

        if (m === mode) {
            btn.classList.add(...cfg.active, 'ring-1', 'shadow-md');
        } else {
            btn.classList.add(cfg.inactive);
        }
    });
    applyFilters();
};

// ── Global Trace Viewer (called from map popup HTML) ──────────────────────────

window.viewTraceByRecord = function (uuid) {
    if (!uuid) return;
    const record = state.filtered.find(r => r._uuid === uuid);
    if (!record) { console.warn('Record not found in current filtered data'); return; }
    // Switch to map tab context, apply agent filter
    if (record._meta?.cedula && $('filterEncuestador')) {
        $('filterEncuestador').value = record._meta.cedula;
        applyFilters();
    }
    showDetailModal(record);
};

// ── Agent Route Tracer ────────────────────────────────────────────────────────

/**
 * Limpia la capa de ruta actual del mapa si existe.
 */
function clearAgentRoute() {
    if (state.agentRouteLayer) {
        state.map.removeLayer(state.agentRouteLayer);
        state.agentRouteLayer = null;
    }
}

/**
 * Dibuja la ruta cronológica de un encuestador identificado por su cédula.
 * Ordena sus encuestas por hora de inicio, traza una polilínea y agrega
 * marcadores circulares numerados (1, 2, 3…) en cada punto.
 * @param {string} cedula - Cédula del encuestador a trazar.
 */
function drawAgentRoute(cedula) {
    clearAgentRoute();
    if (!cedula || !state.map) return;

    // Obtener puntos del agente con coordenadas válidas, ordenados cronológicamente
    const agentPoints = state.filtered
        .filter(r => r._meta?.cedula === cedula && r._meta.lat && r._meta.lng)
        .sort((a, b) => {
            const ta = new Date(a['start'] || 0).getTime();
            const tb = new Date(b['start'] || 0).getTime();
            return ta - tb;
        });

    if (agentPoints.length === 0) return;

    // Mostrar contador de puntos
    const countEl = $('mapRouteAgentCount');
    if (countEl) countEl.textContent = `${agentPoints.length} ptos`;

    const latlngs = agentPoints.map(r => [r._meta.lat, r._meta.lng]);

    // Crear LayerGroup que contendrá la línea + los marcadores numerados
    const layers = [];

    // Línea de recorrido naranja
    layers.push(L.polyline(latlngs, {
        color: '#F97316',
        weight: 2.5,
        opacity: 0.85,
        dashArray: '6 4',
    }));

    // Marcadores numerados
    agentPoints.forEach((r, idx) => {
        const m = r._meta;
        const num = idx + 1;
        const hora    = (r['start'] || '').slice(11, 16) || '—';
        const durText = m.durMin !== null ? `${Math.round(m.durMin)} min` : '—';

        const icon = L.divIcon({
            className: '',
            html: `<div style="
                width:22px;height:22px;border-radius:50%;
                background:#F97316;border:2px solid white;
                display:flex;align-items:center;justify-content:center;
                font-family:Inter,sans-serif;font-size:9px;font-weight:900;
                color:white;box-shadow:0 2px 6px rgba(0,0,0,0.4);
                cursor:pointer;
            ">${num}</div>`,
            iconSize: [22, 22],
            iconAnchor: [11, 11],
        });

        const marker = L.marker([m.lat, m.lng], { icon });
        marker.bindTooltip(`
            <div style="font-family:Inter,sans-serif;font-size:11px;line-height:1.6;padding:2px 4px">
                <b>#${num} · ${hora}</b><br>
                ${m.nombre || '—'}<br>
                Ctrl: ${m.control ? m.control.slice(-4) : '—'} · L${m.n_linea || '—'}<br>
                Duración: ${durText}
            </div>
        `, { sticky: true, opacity: 0.97 });

        marker.on('click', () => showDetailModal(r));
        layers.push(marker);
    });

    state.agentRouteLayer = L.layerGroup(layers).addTo(state.map);

    // Ajustar vista al recorrido completo
    const bounds = L.latLngBounds(latlngs);
    if (bounds.isValid()) state.map.fitBounds(bounds, { padding: [60, 60] });
}

/**
 * Inicializa el botón "Ver Ruta" junto al filtro de encuestador.
 * - Muestra/oculta el botón según si hay encuestador seleccionado.
 * - Al hacer clic: navega a la pestaña Mapa y dibuja la ruta.
 * - Al limpiar el select (Todos): limpia la ruta automáticamente.
 */
export function initVerRutaButton() {
    const selEnc     = document.getElementById('filterEncuestador');
    const btn        = document.getElementById('btnVerRutaAgente');
    const countLabel = document.getElementById('mapRouteAgentCount');

    if (!selEnc) { console.warn('initVerRutaButton: #filterEncuestador no encontrado'); return; }
    if (!btn)    { console.warn('initVerRutaButton: #btnVerRutaAgente no encontrado'); return; }
    if (btn._verRutaAttached) return;
    btn._verRutaAttached = true;

    console.log('initVerRutaButton: OK ✓');

    // Sincroniza el estado del botón con el filtro de encuestador
    const syncBtn = () => {
        const hasAgent = !!selEnc.value;
        const pts = hasAgent ? state.filtered.filter(r =>
            r._meta?.cedula === selEnc.value && r._meta.lat && r._meta.lng
        ).length : 0;

        btn.disabled = !hasAgent;

        if (countLabel) {
            countLabel.textContent = (hasAgent && pts) ? `${pts} pts` : '—';
        }

        if (!hasAgent) {
            // Si ya no hay agente, forzar limpieza de ruta y restauración de clusters
            clearAgentRoute();
            btn.dataset.routeActive = '0';
            btn.classList.remove('bg-brand-orange/20', 'border-brand-orange');
            const labelEl = btn.querySelector('.route-label');
            if (labelEl) labelEl.textContent = 'Ver Ruta';

            if (state.map && state.markerCluster && !state.map.hasLayer(state.markerCluster)) {
                state.map.addLayer(state.markerCluster);
            }
        }
    };

    // Estado inicial
    syncBtn();

    // Reaccionar al cambio del filtro de encuestador
    selEnc.addEventListener('change', syncBtn);

    // También re-sincronizar cuando se apliquen filtros globales (por si cambian los puntos)
    document.addEventListener('filtersApplied', syncBtn);

    // Acción principal: toggle de ruta (activa ↔ oculta)
    btn.addEventListener('click', () => {
        const cedula = selEnc.value;
        if (!cedula) return;

        const isActive = btn.dataset.routeActive === '1';

        if (isActive) {
            // Desactivar ruta y restaurar clusters
            clearAgentRoute();
            btn.dataset.routeActive = '0';

            // Restaurar marcadores de encuestas
            if (state.map && state.markerCluster && !state.map.hasLayer(state.markerCluster)) {
                state.map.addLayer(state.markerCluster);
            }

            // Restaurar estilo normal del botón
            btn.classList.remove('bg-brand-orange/20', 'border-brand-orange');
            if (countLabel) countLabel.textContent = `${state.filtered.filter(r =>
                r._meta?.cedula === cedula && r._meta.lat && r._meta.lng).length} pts`;
            const labelEl = btn.querySelector('.route-label');
            if (labelEl) labelEl.textContent = 'Ver Ruta';
        } else {
            // Activar ruta: navegar al mapa y trazar
            const tabBtn = document.querySelector('[data-tab="tab-mapa"]');
            if (tabBtn) tabBtn.click();

            setTimeout(() => {
                drawAgentRoute(cedula);
                btn.dataset.routeActive = '1';

                // Ocultar clusters para ver la ruta limpia
                if (state.map && state.markerCluster && state.map.hasLayer(state.markerCluster)) {
                    state.map.removeLayer(state.markerCluster);
                }

                // Estilo activo del botón
                btn.classList.add('bg-brand-orange/20', 'border-brand-orange');

                const pts = state.filtered.filter(r =>
                    r._meta?.cedula === cedula && r._meta.lat && r._meta.lng
                ).length;
                if (countLabel) countLabel.textContent = `${pts} pts`;
                const labelEl = btn.querySelector('.route-label');
                if (labelEl) labelEl.textContent = 'Ocultar Ruta';
            }, 200);
        }

    });
}

