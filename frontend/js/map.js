// ─── Map (Leaflet) ───────────────────────────────────────────────────────────
// Handles the main coverage map and quick-filter buttons.
// Depends on globals: L (Leaflet), lucide.

import { state } from './state.js?v=34';
import { $ } from './helpers.js?v=34';
import { applyFilters } from './filters.js?v=34';
import { showDetailModal } from './modal.js?v=34';
import { COLORS, ALERT_MAP } from './config.js?v=34';

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
        const { getPolygonBBox } = await import('./helpers.js?v=34');
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
                return { bbox: getPolygonBBox(allPoints), props: f.properties };
            }
            return null;
        }).filter(b => b !== null);

    } catch (e) {
        console.error('FAILED TO LOAD GEOJSON:', e);
    }
}

export function drawGeoJSONLayer() {
    if (!state.geoJSONData || !state.map || state.geoJSONLayer) return;
    try {
        state.geoJSONLayer = L.geoJSON(state.geoJSONData, {
            style: (feature) => {
                const idStr = String(feature.properties.cod_seg || '0');
                const hash  = idStr.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
                const color = COLORS[hash % COLORS.length];
                
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
                const idStr = String(props.cod_seg || '0');
                const hash  = idStr.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
                const color = COLORS[hash % COLORS.length];

                let popupContent = `<div class="p-2 font-sans">
                    <div class="text-[10px] uppercase font-bold text-slate-500 mb-1">Segmento</div>
                    <div class="text-sm font-bold flex items-center gap-2">
                        <span class="w-2.5 h-2.5 rounded-full" style="background:${color}"></span>
                        <span class="text-slate-800 dark:text-white">${props.cod_seg || 'N/A'}</span>
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

export function renderMap() {
    if (!state.map || !state.markerCluster) return;
    state.markerCluster.clearLayers();

    const points = state.filtered.filter(r => r._meta.lat && r._meta.lng);

    const completedOnMap  = points.filter(r => /totalment/i.test(r._meta.nota)).length;
    const noRespOnMap     = points.filter(r => !/totalment/i.test(r._meta.nota)).length;
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
        const isComplete  = /totalment/i.test(m.nota);
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
                        <div class="text-[10px] font-bold" style="color:${m.dist_ini_fin !== null && m.dist_ini_fin > 50 ? '#F59E0B' : '#10B981'}">${m.dist_ini_fin !== null ? Math.round(m.dist_ini_fin) + ' m' : '—'} <span class="text-[8px] text-slate-500">(Ini->Fin)</span></div></div>
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
    if (markers.length > 0) {
        const bounds = state.markerCluster.getBounds();
        if (bounds.isValid()) state.map.fitBounds(bounds, { padding: [50, 50] });
    }
    if (window.lucide) lucide.createIcons();
}

// ── Global Quick-Filter ───────────────────────────────────────────────────────

window.setQuickFilter = function (mode) {
    state.quickFilterMode = mode;
    const mapFilters = {
        'all':          'btnMapFilterAll',
        'efectivas':    'btnMapFilterEfectivas',
        'no_respuesta': 'btnMapFilterNoRespuesta',
        'alertas':      'btnMapFilterAlertas',
    };
    Object.entries(mapFilters).forEach(([m, id]) => {
        const btn = $(id);
        if (!btn) return;
        if (m === mode) {
            btn.classList.add('bg-brand-blue/5', 'border-brand-blue', 'ring-1', 'ring-brand-blue/20', 'shadow-md');
            btn.classList.remove('border-slate-400', 'border-brand-green', 'border-brand-orange', 'border-brand-red');
        } else {
            btn.classList.remove('bg-brand-blue/5', 'border-brand-blue', 'ring-1', 'ring-brand-blue/20', 'shadow-md');
            if (m === 'all')          btn.classList.add('border-slate-400');
            if (m === 'efectivas')    btn.classList.add('border-brand-green');
            if (m === 'no_respuesta') btn.classList.add('border-brand-orange');
            if (m === 'alertas')      btn.classList.add('border-brand-red');
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
