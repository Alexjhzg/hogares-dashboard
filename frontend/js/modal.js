// ─── Modals ──────────────────────────────────────────────────────────────────
// Detail modal (with integrated mini Leaflet map) and location modal.

import { state } from './state.js?v=39';
import { $, matchSegmentCodes } from './helpers.js?v=39';
import { ALERT_MAP, COLORS } from './config.js?v=39';

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

    const stEntidad = fmt(extractNested('S1/ent') || extractNested('ent'));
    const stMpio    = fmt(extractNested('mun'));
    const stParr    = fmt(extractNested('par'));
    const declaredSeg = extractNested('segmento') || extractNested('S1/segmento') || extractNested('S1/group_segmeto_sector/segmento');
    const actualSeg = extractNested('actual_seg');
    const stSect    = fmt(extractNested('sector')   || extractNested('S1/sector')   || extractNested('S1/group_segmeto_sector/sector'));
    const stNodo    = fmt(extractNested('nodo'));

    // Rural detection for dynamic labeling
    const isRural      = declaredSeg === '000' || declaredSeg === '0';
    const valHeader    = isRural ? 'Validación de Sector' : 'Validación de Segmento';
    const valLeftLabel = isRural ? 'Sector Declarado' : 'Declarado';
    const valLeftVal   = isRural ? (extractNested('sector') || extractNested('S1/sector') || '000') : (declaredSeg || 'N/A');

    const stAgente  = fmt(extractNested('nombre')  || extractNested('S0/s0_nombreapellido'));
    const stCedula  = fmt(extractNested('cedula')  || extractNested('S0/cedula_encuestador'));
    const stFecha   = fmt(extractNested('fecha')   || extractNested('today/_submission_time'));
    const stEstado  = rec._meta?.estado === 'completada'
        ? '<span class="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest bg-brand-green/20 text-brand-green border border-brand-green/30">Completada (Efectiva)</span>'
        : '<span class="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest bg-brand-orange/20 text-brand-orange border border-brand-orange/30">No Respuesta / Error</span>';
    const stDur     = fmt(extractNested('durMin') ? `${extractNested('durMin')} min` : null);
    const rawControl = String(extractNested('control') || extractNested('group_sh53u78/control') || '');
    const rawSerie   = String(extractNested('n_serie') || '');
    const rawLinea   = String(extractNested('n_linea') || '');
    const stControl = fmt(rawControl || null);
    const stLinea   = fmt(rawLinea   || null);
    const stSerie   = fmt(rawSerie   || null);

    // ── Lookup en catálogo de controles ─────────────────────────────────────
    // La clave usa: últimos 4 dígitos del control (GeoJSON CONTROL=4 dig, encuesta=8 dig)
    // + SERIE y LINEA normalizados a int-string (sin ceros), igual que en map.js
    const _padM = (v, l) => String(parseInt(v, 10) || 0).padStart(l, '0');  // solo para display
    const _ctrlKey = (ctrl, serie, linea) => {
        const c = String(ctrl  || '').trim().slice(-4);
        const s = String(parseInt(serie, 10) || 0);
        const l = String(parseInt(linea, 10) || 0);
        return `${c}-${s}-${l}`;
    };
    const ctrlKey    = _ctrlKey(rawControl, rawSerie, rawLinea);
    const ctrlEntry  = (state.controlsIndex instanceof Map) ? state.controlsIndex.get(ctrlKey) : null;
    const ctrlCodSeg  = ctrlEntry ? ctrlEntry.COD_SEG  : null;
    const ctrlCodManz = ctrlEntry ? ctrlEntry.COD_MANZA : null;
    const hasCtrlIndex = state.controlsIndex instanceof Map && state.controlsIndex.size > 0;

    const _c = rawControl ? rawControl.trim().slice(-4) : '';
    const ctrlDetails = state.controlDetails ? state.controlDetails.get(_c) : null;
    const catSeriesStr = ctrlDetails ? Array.from(ctrlDetails.series).sort((a,b)=>a-b).join(', ') : 'Ninguna';
    const catLineasStr = ctrlDetails ? Array.from(ctrlDetails.lineas).sort((a,b)=>a-b).join(', ') : 'Ninguna';
    const hasSerieInCat = ctrlDetails && rawSerie ? ctrlDetails.series.has(String(parseInt(rawSerie, 10))) : false;
    const hasLineaInCat = ctrlDetails && rawLinea ? ctrlDetails.lineas.has(String(parseInt(rawLinea, 10))) : false;

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

    const isMatch = matchSegmentCodes(valLeftVal, actualSeg);

    const segmentMatchStatus = (!valLeftVal || !actualSeg) 
        ? '<i data-lucide="minus" class="text-slate-400 w-4 h-4"></i>' 
        : (isMatch 
            ? '<i data-lucide="check" class="text-brand-emerald w-5 h-5"></i>' 
            : '<i data-lucide="x" class="text-brand-red w-5 h-5"></i>');
    
    const actualSegClasses = actualSeg && !isMatch 
        ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800/30' 
        : 'bg-slate-100 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700';
    
    const actualSegText = actualSeg && !isMatch 
        ? 'text-brand-red' 
        : 'text-slate-800 dark:text-slate-200';

    const layout = `
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
            <div class="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-5 border border-slate-200 dark:border-slate-700/50">
                <h4 class="text-[10px] uppercase font-black text-brand-blue tracking-widest flex items-center gap-2 mb-4">Contexto Geográfico</h4>
                <div class="space-y-3">
                    <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Estado / Entidad</div>${stEntidad}</div>
                    <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Municipio</div>${stMpio}</div>
                    <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Parroquia</div>${stParr}</div>
                    
                    <div class="pt-3 border-t border-slate-200 dark:border-slate-700">
                        <div class="text-[10px] text-slate-500 font-bold uppercase mb-2">${valHeader}</div>
                        <div class="flex items-center gap-2 mb-1">
                            <div class="flex-1 bg-white dark:bg-slate-900/50 p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-center shadow-sm">
                                <div class="text-[9px] text-slate-500 uppercase font-black mb-1">${valLeftLabel}</div>
                                <div class="font-outfit font-bold text-slate-800 dark:text-slate-200 text-sm">#${valLeftVal}</div>
                            </div>
                            <div class="flex items-center justify-center min-w-[24px]">
                                ${segmentMatchStatus}
                            </div>
                            <div class="flex-1 ${actualSegClasses} p-2 rounded-lg border text-center">
                                <div class="font-outfit font-bold text-slate-500 uppercase font-black mb-1">En GeoJSON</div>
                                <div class="font-outfit font-bold ${actualSegText} text-sm">${actualSeg ? '#' + actualSeg : '(Nulo)'}</div>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                        <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Sector</div>${stSect}</div>
                        <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Nodo</div>${stNodo}</div>
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
                    <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                        <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Nro. Línea</div>${stLinea}</div>
                        <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Nro. Serie</div>${stSerie}</div>
                    </div>
                </div>
            </div>

            <!-- ─── PANEL: Validación Control ↔ Segmento ─── -->
            ${(() => {
                const ctrlMatch_decl   = ctrlCodSeg && valLeftVal ? matchSegmentCodes(ctrlCodSeg, valLeftVal) : null;
                const ctrlMatch_actual = ctrlCodSeg && actualSeg  ? matchSegmentCodes(ctrlCodSeg, actualSeg)  : null;

                const iconOk   = '<svg xmlns="http://www.w3.org/2000/svg" class="inline w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
                const iconFail = '<svg xmlns="http://www.w3.org/2000/svg" class="inline w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#DC2626" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
                const iconUnk  = '<svg xmlns="http://www.w3.org/2000/svg" class="inline w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>';
                const matchIcon = (val) => val === null ? iconUnk : (val ? iconOk : iconFail);
                const matchBg   = (val) => val === null ? '' : (val ? 'bg-emerald-50 dark:bg-emerald-900/10' : 'bg-red-50 dark:bg-red-900/10');

                const ctrlBadge  = rawControl ? `<span class="font-mono font-black text-sm text-slate-800 dark:text-slate-100">${_padM(rawControl,4)}</span>` : '<span class="text-slate-400 italic text-xs">—</span>';
                const serieBadge = rawSerie   ? `<span class="font-mono font-black text-sm text-slate-800 dark:text-slate-100">${_padM(rawSerie,2)}</span>`   : '<span class="text-slate-400 italic text-xs">—</span>';
                const lineaBadge = rawLinea   ? `<span class="font-mono font-black text-sm text-slate-800 dark:text-slate-100">${_padM(rawLinea,3)}</span>`   : '<span class="text-slate-400 italic text-xs">—</span>';

                const noIndexMsg = !hasCtrlIndex
                    ? `<div class="mt-2 text-[9px] text-slate-400 bg-slate-100 dark:bg-slate-800 rounded px-2 py-1.5 text-center">⚠ Índice de controles no cargado aún</div>`
                    : '';
                const notFoundMsg = hasCtrlIndex && !ctrlEntry
                    ? `<div class="mt-2 px-2 py-1.5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/30 rounded text-[9px] text-red-700 dark:text-red-300 text-center">Clave <b class="font-mono">${ctrlKey}</b><br>no existe en CONTROLES.geojson</div>`
                    : '';

                return `<div class="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-5 border border-slate-200 dark:border-slate-700/50">
                    <h4 class="text-[10px] uppercase font-black text-[#EA580C] tracking-widest flex items-center gap-2 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 20H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h.5"/><path d="M13 20h3a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-.5"/><rect x="9" y="2" width="6" height="4" rx="1"/><path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L15 9"/></svg>
                        Control, Serie y Línea
                    </h4>
                    <div class="space-y-3">
                        <div class="grid grid-cols-3 gap-1.5">
                            <div class="text-center p-2 rounded-lg border ${m._ls_ctrl_ok ? 'bg-indigo-50/50 dark:bg-indigo-900/10 border-indigo-200 dark:border-indigo-800' : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/50'}">
                                <div class="text-[8px] uppercase ${m._ls_ctrl_ok ? 'text-indigo-400' : 'text-red-400'} font-black mb-1">Control</div>
                                <div class="flex items-center justify-center gap-1">
                                    <span class="font-mono font-black text-xs ${m._ls_ctrl_ok ? 'text-slate-700 dark:text-slate-200' : 'text-red-700 dark:text-red-300'}">${_padM(rawControl,4)}</span>
                                    ${m._ls_ctrl_ok ? '<svg class="text-emerald-500" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : '<svg class="text-red-500" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'}
                                </div>
                            </div>
                            <div class="text-center p-2 rounded-lg border ${m._ls_serie_ok ? 'bg-indigo-50/50 dark:bg-indigo-900/10 border-indigo-200 dark:border-indigo-800' : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/50'}">
                                <div class="text-[8px] uppercase ${m._ls_serie_ok ? 'text-indigo-400' : 'text-red-400'} font-black mb-1">Serie</div>
                                <div class="flex items-center justify-center gap-1">
                                    <span class="font-mono font-black text-xs ${m._ls_serie_ok ? 'text-slate-700 dark:text-slate-200' : 'text-red-700 dark:text-red-300'}">${_padM(rawSerie,2)}</span>
                                    ${m._ls_serie_ok ? '<svg class="text-emerald-500" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : '<svg class="text-red-500" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'}
                                </div>
                            </div>
                            <div class="text-center p-2 rounded-lg border ${m._ls_linea_ok ? 'bg-indigo-50/50 dark:bg-indigo-900/10 border-indigo-200 dark:border-indigo-800' : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/50'}">
                                <div class="text-[8px] uppercase ${m._ls_linea_ok ? 'text-indigo-400' : 'text-red-400'} font-black mb-1">Línea</div>
                                <div class="flex items-center justify-center gap-1">
                                    <span class="font-mono font-black text-xs ${m._ls_linea_ok ? 'text-slate-700 dark:text-slate-200' : 'text-red-700 dark:text-red-300'}">${_padM(rawLinea,3)}</span>
                                    ${m._ls_linea_ok ? '<svg class="text-emerald-500" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : '<svg class="text-red-500" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'}
                                </div>
                            </div>
                        </div>

                        ${noIndexMsg}

                        ${hasCtrlIndex ? `
                        <div class="pt-2 border-t border-slate-200 dark:border-slate-700">
                            <div class="text-[8px] uppercase text-slate-400 font-black mb-2">Datos en catálogo (GeoJSON)</div>
                            
                            <div class="space-y-1.5">
                                <div class="flex items-center justify-between px-2.5 py-2 rounded-lg border ${hasSerieInCat ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/10 dark:border-emerald-800/50' : 'bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-900/50'}">
                                    <span class="text-[9px] ${hasSerieInCat ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'} font-bold uppercase">Serie</span>
                                    <div class="flex items-center gap-2">
                                        <span class="font-mono text-[11px] font-black ${hasSerieInCat ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-700 dark:text-red-300'}">
                                            Enc: ${parseInt(rawSerie, 10) || '—'} ${hasSerieInCat ? '=' : '≠'} GeoJSON: ${hasSerieInCat ? parseInt(rawSerie, 10) : 'No existe'}
                                        </span>
                                        ${hasSerieInCat ? '<svg class="text-emerald-500" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : '<svg class="text-red-500" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'}
                                    </div>
                                </div>
                                <div class="flex items-center justify-between px-2.5 py-2 rounded-lg border ${hasLineaInCat ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/10 dark:border-emerald-800/50' : 'bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-900/50'}">
                                    <span class="text-[9px] ${hasLineaInCat ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'} font-bold uppercase">Línea</span>
                                    <div class="flex items-center gap-2">
                                        <span class="font-mono text-[11px] font-black ${hasLineaInCat ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-700 dark:text-red-300'}">
                                            Enc: ${parseInt(rawLinea, 10) || '—'} ${hasLineaInCat ? '=' : '≠'} GeoJSON: ${hasLineaInCat ? parseInt(rawLinea, 10) : 'No existe'}
                                        </span>
                                        ${hasLineaInCat ? '<svg class="text-emerald-500" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : '<svg class="text-red-500" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'}
                                    </div>
                                </div>
                            </div>
                        </div>
                        ` : ''}
                    </div>
                </div>`;
            })()}

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

                                // Detalle adicional para Línea/Serie
                                let extraDetail = '';
                                if (code === 'LINEA_SERIE_INVALIDA') {
                                    extraDetail = `<div class="mt-1 px-2 py-1 bg-red-100 dark:bg-red-900/30 rounded text-[9px] font-mono text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800/50">
                                        <b>Error de Datos:</b> ${m._ls_key_reported || '—'}
                                    </div>`;
                                }

                                return `<div class="mb-2 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-lg">
                                    <div class="text-[10px] font-black text-brand-red mb-0.5">⚠ ${rule.label}</div>
                                    <div class="text-[9px] text-slate-500 dark:text-slate-400 leading-tight">${rule.detail.replace(/\n/g,' ').trim()}</div>
                                    ${extraDetail}
                                </div>`;
                              }).join('')
                            : `<span class="text-[10px] font-bold text-brand-emerald">✔ Encuesta dentro de parámetros normales</span>`
                        }
                    </div>
                </div>
            </div>
        </div>
        ${hasMapData ? `
        <div class="bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/50 overflow-hidden mt-4">
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
            <div id="detailMapWrapper" class="h-64 md:h-96 w-full relative transition-[height] duration-300">
                <div class="absolute top-4 left-4 z-[400] bg-white/90 dark:bg-slate-900/80 backdrop-blur-md rounded-xl p-3 border border-slate-200 dark:border-slate-700/50 shadow-xl w-48 pointer-events-none">
                    <h5 class="text-[9px] uppercase font-black text-brand-blue dark:text-slate-400 tracking-widest mb-2 border-b border-slate-100 dark:border-slate-700 pb-1">Métricas de Rastreo</h5>
                    <div class="flex justify-between items-center mb-1"><span class="text-[10px] text-slate-500 font-bold">Seg. Declarado:</span><span class="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300">#${extractNested('segmento') || 'N/A'}</span></div>
                    <div class="flex justify-between items-center mb-2 border-b border-slate-100 dark:border-slate-700/50 pb-2"><span class="text-[10px] text-slate-500 font-bold">Seg. en Mapa:</span><span class="text-[10px] font-mono font-bold ${alertas.includes('SEGMENTO_INCORRECTO') || alertas.includes('FUERA_SEGMENTO') ? 'text-brand-red' : 'text-brand-emerald'}">${extractNested('actual_seg') ? '#' + extractNested('actual_seg') : '(Nulo)'}</span></div>
                    <div class="flex justify-between items-center mb-1"><span class="text-[10px] text-slate-500 font-bold">Desplazamiento:</span><span class="text-[10px] font-mono font-bold ${alertas.includes('DESPLAZAMIENTO_ANOMALO') ? 'text-brand-orange' : 'text-slate-700 dark:text-slate-300'}">${walkedDistance !== null ? Math.round(walkedDistance)+'m' : 'N/A'}</span></div>
                    <div class="flex justify-between items-center mb-1"><span class="text-[10px] text-slate-500 font-bold">Dist. Centro:</span><span class="text-[10px] font-mono font-bold ${isFlagged ? 'text-brand-red' : 'text-brand-emerald'}">${rawDist !== null ? Math.round(rawDist)+'m' : 'N/A'}</span></div>
                    <div class="flex justify-between items-center"><span class="text-[10px] text-slate-500 font-bold">Tiempo Base:</span><span class="text-[10px] font-mono text-brand-blue font-bold">${extractNested('durMin') ? extractNested('durMin')+' min' : 'N/A'}</span></div>
                </div>
                <div id="detailMap" class="absolute inset-0 z-0 bg-slate-800"></div>
            </div>
            <div class="p-1 border-t border-slate-200 dark:border-slate-700 text-center text-[10px] text-slate-400 leading-tight">El círculo sombreado indica la zona válida de cobertura (radio de 500m).</div>
        </div>` : `
        <div class="mt-4 p-4 border border-dashed border-slate-700 rounded-xl text-center text-slate-500">
            <span class="text-xs uppercase tracking-widest font-bold block">No hay datos geográficos</span>
            <span class="text-[10px] block mt-1">Este registro no generó ni capturó coordenadas GPS con precisión adecuada.</span>
        </div>`}
    `;

    const rawJson = `<details class="mt-3 text-sm text-slate-400 group"><summary class="cursor-pointer font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">Ver JSON crudo</summary><pre class="text-[10px] bg-slate-100 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 p-2 rounded-lg mt-2 overflow-x-auto text-slate-700 dark:text-slate-300 font-mono">${JSON.stringify(rec, null, 2)}</pre></details>`;

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
                // Limpiar todas las capas excepto los tiles base
                state.detailMiniMapObj.eachLayer(layer => {
                    if (!(layer instanceof L.TileLayer)) {
                        state.detailMiniMapObj.removeLayer(layer);
                    }
                });
            }

            // Agregar GeoJSON siempre (nuevo o tras limpieza) para que los popups
            // capturen los valores de declaredSeg/actualSeg del registro actual.
            if (state.geoJSONData) {
                L.geoJSON(state.geoJSONData, {
                    style: (feature) => {
                        const idStr = String(feature.properties.cod_seg || '0');
                        const isCurrent = String(feature.properties.cod_seg) === String(declaredSeg);
                        const hash  = idStr.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
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
                        // Usar los nombres de propiedad reales del GeoJSON de segmentos
                        const cod  = p.cod_seg   || p.id   || 'N/A';
                        const mun  = p.cod_munici || p.mun  || 'N/A';
                        const par  = p.cod_parroq || p.par  || 'N/A';
                        const isCurrent = String(cod) === String(declaredSeg);
                        const isActual  = String(cod) === String(actualSeg);
                        const badgeHtml = [
                            isCurrent ? '<span style="background:#FBBF2433;color:#FBBF24;border:1px solid #FBBF2466;padding:1px 6px;border-radius:4px;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.05em">Declarado</span>' : '',
                            isActual && !isCurrent ? '<span style="background:#10B98133;color:#10B981;border:1px solid #10B98166;padding:1px 6px;border-radius:4px;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.05em">Calculado GPS</span>' : '',
                            isActual && isCurrent  ? '<span style="background:#10B98133;color:#10B981;border:1px solid #10B98166;padding:1px 6px;border-radius:4px;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.05em">✔ Coincide</span>' : ''
                        ].filter(Boolean).join(' ');
                        const isRuralFeature = String(cod) === '000' || String(cod) === '0';
                        const featureLabel = isRuralFeature ? 'Sector' : 'Segmento';
                        const displayId = isRuralFeature ? (p.cod_sc || '000') : cod;

                        const popup = `
                            <div class="dark:text-slate-200" style="font-family:'Inter',sans-serif;min-width:180px;max-width:240px;padding:2px">
                                <div class="dark:border-slate-700" style="font-family:'Outfit',sans-serif;font-weight:900;font-size:12px;color:#6366f1;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-bottom:8px">
                                    ${featureLabel} <span class="text-slate-800 dark:text-white" style="font-size:15px;">#${displayId}</span>
                                </div>
                                ${badgeHtml ? `<div style="margin-bottom:8px;display:flex;gap:4px;flex-wrap:wrap">${badgeHtml}</div>` : ''}
                                <div style="font-size:10px;margin-bottom:3px" class="text-slate-500 dark:text-slate-400"><b>Municipio:</b> ${mun}</div>
                                <div style="font-size:10px;" class="text-slate-500 dark:text-slate-400"><b>Parroquia:</b> ${par}</div>
                            </div>`;
                        layer.bindPopup(popup, { className: 'custom-popup', maxWidth: 260 });
                        layer.on('mouseover', function() { this.setStyle({ fillOpacity: 0.45, weight: 2.5 }); });
                        layer.on('mouseout',  function() {
                            const c = String(this.feature.properties.cod_seg);
                            this.setStyle({
                                fillOpacity: c === String(declaredSeg) ? 0.35 : 0.15,
                                weight:      c === String(declaredSeg) ? 2.5  : 1.5
                            });
                        });
                    }
                }).addTo(state.detailMiniMapObj);
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
            if (targetCircle) {
                const circleColor = isFlagged ? '#EF4444' : '#10B981';
                L.circle([targetCircle.lat, targetCircle.lng], {
                    radius: 500,
                    color: circleColor,
                    fillColor: circleColor,
                    fillOpacity: 0.05,
                    weight: 1.5,
                    dashArray: '6,5',
                    interactive: false   // ← los clics pasan a los segmentos GeoJSON debajo
                }).addTo(state.detailMiniMapObj);
            }

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
        const body = $('detailModalBody');
        if (pane?.classList.contains('max-w-none')) {
            pane.classList.remove('w-full','max-w-none','h-full','rounded-none');
            pane.classList.add('max-w-7xl','w-11/12','rounded-2xl','p-0');
            if (icon) icon.setAttribute('data-lucide', 'maximize');
            if (body) {
                body.classList.remove('flex-1', 'max-h-none');
                body.classList.add('max-h-[75vh]');
            }
        }
        if (state.detailMiniMapObj) { state.detailMiniMapObj.remove(); state.detailMiniMapObj = null; }
        if (state.lastFocused?.focus) { try { state.lastFocused.focus(); } catch (_) {} }
    }, 300);
}

window.toggleDetailModalExpand = function () {
    const pane = $('detailModalPane');
    const icon = $('detailModalExpandIcon');
    const mapWrapper = $('detailMapWrapper');
    const body = $('detailModalBody');
    if (!pane || !icon) return;
    if (pane.classList.contains('max-w-7xl')) {
        pane.classList.remove('max-w-7xl','w-11/12','rounded-2xl','p-0');
        pane.classList.add('w-full','max-w-none','h-full','rounded-none');
        icon.setAttribute('data-lucide', 'minimize');
        if (mapWrapper) {
            mapWrapper.classList.remove('h-64', 'md:h-96');
            mapWrapper.classList.add('h-[60vh]', 'md:h-[75vh]');
        }
        if (body) {
            body.classList.remove('max-h-[75vh]');
            body.classList.add('flex-1', 'max-h-none');
        }
    } else {
        pane.classList.remove('w-full','max-w-none','h-full','rounded-none');
        pane.classList.add('max-w-7xl','w-11/12','rounded-2xl','p-0');
        icon.setAttribute('data-lucide', 'maximize');
        if (mapWrapper) {
            mapWrapper.classList.remove('h-[60vh]', 'md:h-[75vh]');
            mapWrapper.classList.add('h-64', 'md:h-96');
        }
        if (body) {
            body.classList.remove('flex-1', 'max-h-none');
            body.classList.add('max-h-[75vh]');
        }
    }
    if (window.lucide) window.lucide.createIcons();
    if (state.detailMiniMapObj) setTimeout(() => state.detailMiniMapObj.invalidateSize(), 350);
};

window.closeDetailModal = closeDetailModal;

