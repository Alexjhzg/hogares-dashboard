// ─── Modals ──────────────────────────────────────────────────────────────────
// Detail modal (with integrated mini Leaflet map) and location modal.

import { state } from './state.js?v=34';
import { $ } from './helpers.js?v=34';
import { ALERT_MAP } from './config.js?v=34';

// ── Detail Modal ──────────────────────────────────────────────────────────────

export function showDetailModal(rec) {
    const modal = $('detailModal');
    const body  = $('detailModalBody');
    if (!modal || !body || !rec) return;

    const extractNested = (path) => {
        if (rec._meta && typeof rec._meta[path] !== 'undefined' && rec._meta[path] !== null) return rec._meta[path];
        if (rec[path] !== undefined && rec[path] !== null) return rec[path];
        const keys = String(path).split('/').map(s => s.trim());
        for (const k of keys) { if (!k || k.includes(' ')) continue; if (rec[k] !== undefined && rec[k] !== null) return rec[k]; }
        return null;
    };

    const fmt = (val) => {
        if (val === null || val === undefined || val === '') return '<span class="text-slate-500 font-medium italic">(No Registrado)</span>';
        if (typeof val === 'object') return `<pre class="text-[10px] bg-slate-950/20 p-2 rounded overflow-x-auto">${JSON.stringify(val, null, 2)}</pre>`;
        return `<span class="font-outfit font-bold text-slate-800 dark:text-slate-200 text-sm">${String(val)}</span>`;
    };

    const stEntidad = fmt(extractNested('mun') || extractNested('S1/ent'));
    const stMpio    = fmt(extractNested('mun'));
    const stParr    = fmt(extractNested('par'));
    const stSegm    = fmt(extractNested('segmento') || extractNested('S1/segmento') || extractNested('S1/group_segmeto_sector/segmento'));
    const stSect    = fmt(extractNested('sector')   || extractNested('S1/sector')   || extractNested('S1/group_segmeto_sector/sector'));
    const stNodo    = fmt(extractNested('nodo'));

    const stAgente  = fmt(extractNested('nombre')  || extractNested('S0/s0_nombreapellido'));
    const stCedula  = fmt(extractNested('cedula')  || extractNested('S0/cedula_encuestador'));
    const stFecha   = fmt(extractNested('fecha')   || extractNested('today/_submission_time'));
    const stEstado  = rec._meta?.estado === 'completada'
        ? '<span class="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest bg-brand-green/20 text-brand-green border border-brand-green/30">Completada (Efectiva)</span>'
        : '<span class="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest bg-brand-orange/20 text-brand-orange border border-brand-orange/30">No Respuesta / Error</span>';
    const stDur     = fmt(extractNested('durMin') ? `${extractNested('durMin')} min` : null);
    const stControl = fmt(extractNested('control') || extractNested('group_sh53u78/control'));

    const stHogares = fmt(extractNested('hogares') || extractNested('datos_hogar/hogar_count') || extractNested('lista_hogar_count'));
    const stPers    = fmt(extractNested('totalPers') || extractNested('datos_hogar/hogar.integrantes_hogar'));
    const stUso     = fmt(extractNested('uso')     || extractNested('S1/Uso_de_la_Unidad_inmobiliaria'));
    const stCond    = fmt(extractNested('condicion') || extractNested('Condici_n_de_ocupaci_n/condicion_de_ocupacion'));
    const rawDist   = extractNested('distance_m');
    const isFlagged = rec._meta?.flag_distance_gt_500;
    const alertas   = rec._meta?.alertas || [];
    const hasAlerts = rec._meta?.hasAlerts || false;
    const stDist    = rawDist !== null
        ? `<span class="font-outfit font-black ${isFlagged ? 'text-brand-red' : 'text-brand-emerald'}">${Math.round(rawDist)} m</span>`
        : '<span class="text-slate-500 font-medium italic">N/A</span>';

    const parseGeo = (geoStr) => {
        if (!geoStr || typeof geoStr !== 'string') return null;
        const parts = geoStr.trim().split(' ');
        if (parts.length >= 2) return { lat: parseFloat(parts[0]), lng: parseFloat(parts[1]), alt: parts[2] ? parseFloat(parts[2]) : null, acc: parts[3] ? parseFloat(parts[3]) : null };
        return null;
    };

    const calcDistance = (pt1, pt2) => {
        if (!pt1 || !pt2) return null;
        const R = 6371e3, toRad = p => p * Math.PI / 180;
        const dLat = toRad(pt2.lat - pt1.lat), dLng = toRad(pt2.lng - pt1.lng);
        const a = Math.sin(dLat/2)**2 + Math.cos(toRad(pt1.lat)) * Math.cos(toRad(pt2.lat)) * Math.sin(dLng/2)**2;
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    };

    const ptStart = parseGeo(rec['start-geopoint']);
    const ptIni   = parseGeo(rec['group_sh53u78/ubicacion_i'] || rec['ubicacion_i']);
    const ptFin   = parseGeo(rec['ubicacion_final/ubicacion_f'] || rec['ubicacion_f']);
    const m       = rec._meta || {};
    let rawLat = rec.lat || m.lat || (rec._geolocation ? rec._geolocation[0] : null);
    let rawLng = rec.lng || m.lng || (rec._geolocation ? rec._geolocation[1] : null);
    const ptMain  = (rawLat && rawLng) ? { lat: parseFloat(rawLat), lng: parseFloat(rawLng) } : null;
    const walkedDistance = ptIni && ptFin ? calcDistance(ptIni, ptFin) : null;
    const hasMapData = ptStart || ptIni || ptFin || ptMain;

    const layout = `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div class="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-5 border border-slate-200 dark:border-slate-700/50">
                <h4 class="text-[10px] uppercase font-black text-brand-blue tracking-widest flex items-center gap-2 mb-4">Contexto Geográfico</h4>
                <div class="space-y-3">
                    <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Estado / Entidad</div>${stEntidad}</div>
                    <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Municipio</div>${stMpio}</div>
                    <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Parroquia</div>${stParr}</div>
                    <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                        <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Segmento</div>${stSegm}</div>
                        <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Sector</div>${stSect}</div>
                    </div>
                </div>
            </div>
            <div class="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-5 border border-slate-200 dark:border-slate-700/50">
                <h4 class="text-[10px] uppercase font-black text-brand-purple tracking-widest flex items-center gap-2 mb-4">Datos Operativos</h4>
                <div class="space-y-3">
                    <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Agente de Campo</div>${stAgente}</div>
                    <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Documento ID</div>${stCedula}</div>
                    <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Fecha y Hora de Carga</div>${stFecha}</div>
                    <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Estatus del Registro</div>${stEstado}</div>
                    <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                        <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Duración Real</div>${stDur}</div>
                        <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Control Nro.</div>${stControl}</div>
                    </div>
                </div>
            </div>
            <div class="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-5 border border-slate-200 dark:border-slate-700/50">
                <h4 class="text-[10px] uppercase font-black text-brand-emerald tracking-widest flex items-center gap-2 mb-4">Resultados / Tipología</h4>
                <div class="space-y-3">
                    <div class="grid grid-cols-2 gap-2 pb-2 border-b border-slate-200 dark:border-slate-700">
                        <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Nro. Hogares</div>${stHogares}</div>
                        <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Nro. Personas</div>${stPers}</div>
                    </div>
                    <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Condición de Ocupación</div>${stCond}</div>
                    <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Uso Estructural</div>${stUso}</div>
                    <div class="pt-2 border-t border-slate-200 dark:border-slate-700">
                        <div class="text-[10px] text-slate-500 font-bold uppercase mb-1">Distancia calc. al segmento</div>
                        ${stDist}
                    </div>
                    <div class="pt-2 border-t border-slate-200 dark:border-slate-700">
                        <div class="flex items-center gap-1.5 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${hasAlerts ? '#EF4444' : '#10B981'}" stroke-width="2.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                            <span class="text-[10px] text-slate-500 font-bold uppercase">${hasAlerts ? `Alertas (${alertas.length})` : 'Sin Alertas'}</span>
                        </div>
                        ${hasAlerts
                            ? alertas.map(code => {
                                const rule = ALERT_MAP[code];
                                if (!rule) return '';
                                return `<div class="mb-2 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-lg">
                                    <div class="text-[10px] font-black text-brand-red mb-0.5">⚠ ${rule.label}</div>
                                    <div class="text-[9px] text-slate-500 dark:text-slate-400 leading-tight">${rule.detail.replace(/\n/g,' ').trim()}</div>
                                </div>`;
                              }).join('')
                            : `<span class="text-[10px] font-bold text-brand-emerald">✔ Encuesta dentro de parámetros normales</span>`
                        }
                    </div>
                </div>
            </div>
        </div>
        ${hasMapData ? `
        <div class="bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/50 overflow-hidden mt-6">
            <div class="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <div class="flex items-center gap-3">
                    <h4 class="text-[10px] uppercase font-black text-brand-orange tracking-widest flex items-center gap-2 m-0">Verificación Geográfica Histórica</h4>
                    ${isFlagged ? '<span class="px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-widest bg-brand-red/20 text-brand-red border border-brand-red/30">Desviación Detectada</span>' : ''}
                </div>
                <div class="flex items-center gap-4 text-[9px] uppercase font-bold text-slate-500">
                    <div class="flex items-center gap-1.5"><div class="w-2 h-2 rounded-full bg-[#3B82F6]"></div> Apertura</div>
                    <div class="flex items-center gap-1.5"><div class="w-2 h-2 rounded-full bg-[#10B981]"></div> P. Inicial</div>
                    <div class="flex items-center gap-1.5"><div class="w-2 h-2 rounded-full bg-[#F59E0B]"></div> P. Final</div>
                </div>
            </div>
            <div class="h-64 md:h-96 w-full relative">
                <div class="absolute top-4 left-4 z-[400] bg-slate-900/80 backdrop-blur-md rounded-xl p-3 border border-slate-700/50 shadow-xl w-48 pointer-events-none">
                    <h5 class="text-[9px] uppercase font-black text-slate-400 tracking-widest mb-2 border-b border-slate-700 pb-1">Métricas de Rastreo</h5>
                    <div class="flex justify-between items-center mb-1"><span class="text-[10px] text-slate-500 font-bold">Resumen Segm:</span><span class="text-[10px] font-mono font-bold ${isFlagged ? 'text-brand-red' : 'text-brand-emerald'}">${rawDist !== null ? Math.round(rawDist)+'m' : 'N/A'}</span></div>
                    <div class="flex justify-between items-center mb-1"><span class="text-[10px] text-slate-500 font-bold">Ruta Calculada:</span><span class="text-[10px] font-mono text-brand-orange font-bold">${walkedDistance !== null ? Math.round(walkedDistance)+'m' : 'N/A'}</span></div>
                    <div class="flex justify-between items-center"><span class="text-[10px] text-slate-500 font-bold">Tiempo Base:</span><span class="text-[10px] font-mono text-brand-blue font-bold">${extractNested('durMin') ? extractNested('durMin')+' min' : 'N/A'}</span></div>
                </div>
                <div id="detailMap" class="absolute inset-0 z-0 bg-slate-800"></div>
            </div>
            <div class="p-2 border-t border-slate-200 dark:border-slate-700 text-center text-[10px] text-slate-400">El círculo sombreado indica la zona válida de cobertura (radio de 500m).</div>
        </div>` : `
        <div class="mt-6 p-6 border border-dashed border-slate-700 rounded-xl text-center text-slate-500">
            <span class="text-xs uppercase tracking-widest font-bold block">No hay datos geográficos</span>
            <span class="text-[10px] block mt-1">Este registro no generó ni capturó coordenadas GPS con precisión adecuada.</span>
        </div>`}
    `;

    const rawJson = `<details class="mt-6 text-sm text-slate-400 group"><summary class="cursor-pointer font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">Ver JSON crudo</summary><pre class="text-xs bg-slate-950/40 border border-slate-800 p-4 rounded-xl mt-3 overflow-x-auto text-slate-300 font-mono">${JSON.stringify(rec, null, 2)}</pre></details>`;

    body.innerHTML = `${layout}${rawJson}`;
    if (window.lucide) lucide.createIcons({ root: body });

    state.lastFocused = document.activeElement;
    modal.classList.remove('hidden');
    setTimeout(() => { modal.querySelector('#detailModalPane')?.classList.remove('scale-95', 'opacity-0'); }, 10);

    if (hasMapData) {
        setTimeout(() => {
            const displayLat = ptMain ? ptMain.lat : (ptIni ? ptIni.lat : (ptStart ? ptStart.lat : ptFin.lat));
            const displayLng = ptMain ? ptMain.lng : (ptIni ? ptIni.lng : (ptStart ? ptStart.lng : ptFin.lng));

            if (!state.detailMiniMapObj) {
                state.detailMiniMapObj = L.map('detailMap', { zoomControl: false }).setView([displayLat, displayLng], 16);
                const satLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', { maxZoom: 20, subdomains: ['mt0','mt1','mt2','mt3'], attribution: '&copy; Google' });
                const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' });
                satLayer.addTo(state.detailMiniMapObj);
                L.control.layers({ 'Google Satélite': satLayer, 'OpenStreetMap': osmLayer }, null, { position: 'topright' }).addTo(state.detailMiniMapObj);
                L.control.zoom({ position: 'bottomright' }).addTo(state.detailMiniMapObj);
            } else {
                state.detailMiniMapObj.setView([displayLat, displayLng], 16);
                state.detailMiniMapObj.eachLayer(layer => {
                    if (layer instanceof L.Marker || layer instanceof L.Circle || layer instanceof L.Polyline) state.detailMiniMapObj.removeLayer(layer);
                });
            }

            const validPoints = [], pathCoords = [];
            const extractTimeStr = type => {
                if (type === 'start') return rec.start ? new Date(rec.start).toLocaleTimeString() : 'N/A';
                if (type === 'end')   return rec.end   ? new Date(rec.end).toLocaleTimeString()   : 'N/A';
                return 'Desconocido';
            };
            const createCustomMarker = (pt, color, title, type) => {
                if (!pt) return;
                const icon = L.divIcon({ className: 'custom-minimap-marker', html: `<div style="background-color:${color};width:14px;height:14px;border-radius:50%;border:2px solid white;box-shadow:0 0 10px ${color};"></div>`, iconSize: [14,14], iconAnchor: [7,7] });
                const accText  = pt.acc ? `<span class="text-brand-emerald">± ${pt.acc}m</span>` : '<span class="text-slate-500">N/A</span>';
                const altText  = pt.alt ? `${pt.alt}m s.n.m.` : 'N/A';
                const timeText = extractTimeStr(type);
                const popup = `<div class="font-inter p-1 w-52"><div class="font-outfit font-black text-xs uppercase tracking-widest border-b border-slate-200 pb-1 mb-2" style="color:${color}">${title}</div><div class="flex justify-between items-center text-[10px] mb-1"><span class="font-bold text-slate-500">Coordenada:</span><span class="font-mono text-slate-700">${pt.lat.toFixed(5)}, ${pt.lng.toFixed(5)}</span></div><div class="flex justify-between items-center text-[10px] mb-1"><span class="font-bold text-slate-500">Precisión GPS:</span><span class="font-mono font-bold">${accText}</span></div><div class="flex justify-between items-center text-[10px] mb-1"><span class="font-bold text-slate-500">Altitud Nivel Mar:</span><span class="font-mono text-slate-700">${altText}</span></div><div class="flex justify-between items-center text-[10px] border-t border-slate-100 pt-1 mt-1"><span class="font-bold text-slate-500">Hora de Captura:</span><span class="font-mono text-brand-purple font-bold">${timeText}</span></div></div>`;
                L.marker([pt.lat, pt.lng], { icon }).addTo(state.detailMiniMapObj).bindPopup(popup, { className: 'custom-popup-enrich' });
                validPoints.push([pt.lat, pt.lng]);
                pathCoords.push([pt.lat, pt.lng]);
            };

            if (ptStart) createCustomMarker(ptStart, '#3B82F6', 'Apertura de la Encuesta', 'start');
            if (ptIni)   createCustomMarker(ptIni,   '#10B981', 'Confirmación Inicial',     'start');
            if (ptFin)   createCustomMarker(ptFin,   '#F59E0B', 'Cierre de Encuesta',        'end');
            if (!ptStart && !ptIni && !ptFin && ptMain) createCustomMarker(ptMain, isFlagged ? '#EF4444' : '#10B981', 'Ubicación Registrada', 'end');

            if (pathCoords.length > 1) L.polyline(pathCoords, { color: '#94a3b8', dashArray: '4, 4', weight: 2, opacity: 0.6 }).addTo(state.detailMiniMapObj);

            const targetCircle = ptIni || ptMain;
            if (targetCircle) L.circle([targetCircle.lat, targetCircle.lng], { radius: 500, color: isFlagged ? '#EF4444' : '#10B981', fillColor: isFlagged ? '#EF4444' : '#10B981', fillOpacity: 0.05, weight: 1, dashArray: '4,4' }).addTo(state.detailMiniMapObj);

            if (validPoints.length > 0) {
                const bounds = L.latLngBounds(validPoints);
                validPoints.length === 1 && !isFlagged ? state.detailMiniMapObj.setView(validPoints[0], 16) : state.detailMiniMapObj.fitBounds(bounds, { padding: [40,40], maxZoom: 18 });
            }
            state.detailMiniMapObj.invalidateSize();
        }, 300);
    }
}

export function closeDetailModal() {
    const m = $('detailModal');
    if (!m) return;
    m.querySelector('#detailModalPane')?.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        m.classList.add('hidden');
        const pane = $('detailModalPane');
        const icon = $('detailModalExpandIcon');
        if (pane?.classList.contains('max-w-none')) {
            pane.classList.remove('w-full','max-w-none','h-full','rounded-none');
            pane.classList.add('max-w-7xl','w-11/12','rounded-2xl','p-0');
            if (icon) icon.setAttribute('data-lucide', 'maximize');
        }
        if (state.detailMiniMapObj) { state.detailMiniMapObj.remove(); state.detailMiniMapObj = null; }
        if (state.lastFocused?.focus) { try { state.lastFocused.focus(); } catch (_) {} }
    }, 300);
}

window.toggleDetailModalExpand = function () {
    const pane = $('detailModalPane');
    const icon = $('detailModalExpandIcon');
    if (!pane || !icon) return;
    if (pane.classList.contains('max-w-7xl')) {
        pane.classList.remove('max-w-7xl','w-11/12','rounded-2xl','p-0');
        pane.classList.add('w-full','max-w-none','h-full','rounded-none');
        icon.setAttribute('data-lucide', 'minimize');
    } else {
        pane.classList.remove('w-full','max-w-none','h-full','rounded-none');
        pane.classList.add('max-w-7xl','w-11/12','rounded-2xl','p-0');
        icon.setAttribute('data-lucide', 'maximize');
    }
    if (window.lucide) window.lucide.createIcons();
    if (state.detailMiniMapObj) setTimeout(() => state.detailMiniMapObj.invalidateSize(), 350);
};

window.closeDetailModal = closeDetailModal;

// ── Location Modal ────────────────────────────────────────────────────────────

export function showLocationModal(rec) {
    const modal  = $('locModal');
    const mapDiv = $('locMap');
    if (!modal || !mapDiv) return;
    const lat = Number(rec._meta.lat);
    const lng = Number(rec._meta.lng);
    if (Number.isNaN(lat) || Number.isNaN(lng)) { alert('Coordenadas inválidas'); return; }

    modal.classList.remove('hidden');
    if (!state.locMap) {
        const osm       = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' });
        const googleSat = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', { maxZoom: 20, subdomains: ['mt0','mt1','mt2','mt3'], attribution: '&copy; Google' });
        state.locMap = L.map('locMap', { center: [lat, lng], zoom: 16, layers: [osm] });
        L.control.layers({ 'OpenStreetMap': osm, 'Google Satélite': googleSat }, null, { collapsed: false }).addTo(state.locMap);
        L.control.scale().addTo(state.locMap);
    } else {
        state.locMap.setView([lat, lng], 16);
    }
    if (state.locMarker) { try { state.locMap.removeLayer(state.locMarker); } catch (_) {} state.locMarker = null; }
    state.locMarker = L.marker([lat, lng]).addTo(state.locMap).bindPopup(`<b>${rec._meta.nombre}</b><br>${rec._meta.fecha}`).openPopup();
    setTimeout(() => { try { state.locMap.invalidateSize(); } catch (_) {} }, 120);

    state.lastFocused = document.activeElement;
    const closeBtn = $('locModalClose');
    if (closeBtn) closeBtn.focus();
}

export function closeLocModal() {
    const m = $('locModal');
    if (!m) return;
    m.classList.add('hidden');
    if (state.locMarker) { try { state.locMap.removeLayer(state.locMarker); } catch (_) {} state.locMarker = null; }
    if (state.lastFocused?.focus) { try { state.lastFocused.focus(); } catch (_) {} }
}

window.closeLocModal = closeLocModal;
