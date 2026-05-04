// ─── Modals (Refactorized) ─────────────────────────────────────────────────────
// Orchestrator for Detail Modal and UI interactions.

import { state } from '../core/index.js';
import { $, matchSegmentCodes } from '../utils/index.js';
import { extractNested, fmt, parseGeo, calcDistance, _padM, _ctrlKey } from './utils.js';
import { 
    getModalLayout, 
    getAlertsHtml, 
    getControlValidationHtml, 
    getRawJsonHtml 
} from './templates.js';
import { initOrUpdateMiniMap } from './modal-map.js';

// ── Detail Modal ──────────────────────────────────────────────────────────────

export function showDetailModal(rec) {
    const modal = $('detailModal');
    const body  = $('detailModalBody');
    if (!modal || !body || !rec) return;

    // 1. Data Extraction & Formatting
    // Prefer _meta (already normalized) over raw Kobo paths to avoid picking up
    // group-objects (e.g. rec['S1'] = { segmento:... }) instead of scalar values.
    const m = rec._meta || {};
    const data = {
        stEntidad: fmt(m.ent || rec['S1/ent'] || rec['ent'] || null),
        stMpio:    fmt(m.mun  || null),
        stParr:    fmt(m.par  || null),
        stSect:    fmt(m.sector || null),
        stNodo:    fmt(m.nodo  || null),
        stEncuestador: fmt(m.nombre  || rec['S0/s0_nombreapellido'] || null),
        stCedula:  fmt(m.cedula  !== 'N/A' ? m.cedula : null),
        stFecha:   fmt(m.fecha   || rec['today'] || rec['_submission_time'] || null),
        stDur:     fmt((() => {
            const d = m.durMin;
            return d != null ? `${parseFloat(d).toFixed(2)} min` : null;
        })()),
        // Segmento declarado: prefer _meta, then raw Kobo scalar (not the object)
        declaredSeg: m.segmento || rec['S1/segmento'] || rec['S1/group_segmeto_sector/segmento'] || null,
        actualSeg: m.actual_seg || null,
        rawControl: String(m.control || rec['group_sh53u78/control'] || ''),
        rawSerie:   String(m.n_serie  || ''),
        rawLinea:   String(m.n_linea  || ''),
        stHogares: fmt(m.hogares ?? null),
        stPers:    fmt(m.totalPers ?? null),
        stUso:     fmt(m.uso     || null),
        stCond:    fmt(m.condicion || null),
        alertas:   m.alertas   || [],
        hasAlerts: m.hasAlerts || false,
        isFlagged: m.flag_distance_gt_500,
        durMin:    m.durMin ?? null,
        rawDist:   m.distance_m ?? null,
        m
    };

    data.isRural = data.declaredSeg === '000' || data.declaredSeg === '0';
    data.valHeader = data.isRural ? 'Validación de Sector' : 'Validación de Segmento';
    data.valLeftLabel = data.isRural ? 'Sector Declarado' : 'Declarado';
    data.valLeftVal = data.isRural ? (extractNested(rec, 'sector') || extractNested(rec, 'S1/sector') || '000') : (data.declaredSeg || 'N/A');
    
    data.stControl = fmt(data.rawControl || null);
    data.stLinea   = fmt(data.rawLinea   || null);
    data.stSerie   = fmt(data.rawSerie   || null);
    data.stEstado  = data.m.estado === 'completada'
        ? '<span class="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest bg-brand-green/20 text-brand-green border border-brand-green/30">Completada (Efectiva)</span>'
        : '<span class="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest bg-brand-orange/20 text-brand-orange border border-brand-orange/30">No Efectiva</span>';
    


    // 2. Control Catalog Lookup
    const ctrlKey = _ctrlKey(data.rawControl, data.rawSerie, data.rawLinea);
    const ctrlEntry = (state.controlsIndex instanceof Map) ? state.controlsIndex.get(ctrlKey) : null;
    const hasCtrlIndex = state.controlsIndex instanceof Map && state.controlsIndex.size > 0;
    
    const parsedControl = data.rawControl ? String(data.rawControl).trim().slice(-4) : '';
    const ctrlDetails = (state.controlDetails instanceof Map) ? state.controlDetails.get(parsedControl) : null;
    const validCombos = ctrlDetails ? ctrlDetails.combos : [];

    data.ctrlPanelHtml = getControlValidationHtml({
        m: data.m, rawControl: data.rawControl, rawSerie: data.rawSerie, rawLinea: data.rawLinea,
        _padM, hasCtrlIndex, ctrlEntry, ctrlKey, validCombos
    });

    // 3. Mini-Map Data Preparation
    const ptStart = parseGeo(rec['start-geopoint']);
    const ptIni   = parseGeo(rec['group_sh53u78/ubicacion_i'] || rec['ubicacion_i']);
    const ptFin   = parseGeo(rec['ubicacion_final/ubicacion_f'] || rec['ubicacion_f']);
    let rawLat = rec.lat || data.m.lat || (rec._geolocation ? rec._geolocation[0] : null);
    let rawLng = rec.lng || data.m.lng || (rec._geolocation ? rec._geolocation[1] : null);
    const ptMain = (rawLat && rawLng) ? { lat: parseFloat(rawLat), lng: parseFloat(rawLng) } : null;
    
    data.walkedDistance = ptIni && ptFin ? calcDistance(ptIni, ptFin) : null;
    
    data.stDist = data.walkedDistance !== null
        ? `<span class="font-outfit font-black ${data.walkedDistance > 30 ? 'text-brand-red' : 'text-brand-emerald'}">${Math.round(data.walkedDistance)} m</span>`
        : '<span class="text-slate-500 font-medium italic">N/A</span>';

    data.hasMapData = ptStart || ptIni || ptFin || ptMain;
    
    data.segmentMatchStatus = (!data.valLeftVal || !data.actualSeg) 
        ? '<i data-lucide="minus" class="text-slate-400 w-4 h-4"></i>' 
        : (matchSegmentCodes(data.valLeftVal, data.actualSeg) 
            ? '<i data-lucide="check" class="text-brand-emerald w-5 h-5"></i>' 
            : '<i data-lucide="x" class="text-brand-red w-5 h-5"></i>');
    
    data.actualSegClasses = data.actualSeg && !matchSegmentCodes(data.valLeftVal, data.actualSeg) 
        ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800/30' 
        : 'bg-slate-100 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700';
    
    data.actualSegText = data.actualSeg && !matchSegmentCodes(data.valLeftVal, data.actualSeg) 
        ? 'text-brand-red' 
        : 'text-slate-800 dark:text-slate-200';

    // 4. Content Generation
    data.alertsHtml = getAlertsHtml(data.alertas, data.m);
    body.innerHTML = getModalLayout(data) + getRawJsonHtml(rec);
    if (window.lucide) lucide.createIcons({ root: body });

    // 5. UI Transitions
    state.lastFocused = document.activeElement;
    modal.classList.remove('hidden');
    if (window.innerWidth < 768) {
        const pane = $('detailModalPane');
        if (pane && pane.classList.contains('max-w-7xl')) {
            if (typeof window.toggleDetailModalExpand === 'function') window.toggleDetailModalExpand();
        }
    }
    setTimeout(() => { modal.querySelector('#detailModalPane')?.classList.remove('scale-95', 'opacity-0'); }, 10);

    // 6. Map Initialization
    if (data.hasMapData) {
        setTimeout(() => {
            const displayLat = ptMain ? ptMain.lat : (ptIni ? ptIni.lat : (ptStart ? ptStart.lat : ptFin.lat));
            const displayLng = ptMain ? ptMain.lng : (ptIni ? ptIni.lng : (ptStart ? ptStart.lng : ptFin.lng));
            
            initOrUpdateMiniMap({
                displayLat, displayLng, declaredSeg: data.declaredSeg, actualSeg: data.actualSeg,
                ptStart, ptIni, ptFin, ptMain, isFlagged: data.isFlagged, rec
            });
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
    
    const isExpanding = pane.classList.contains('max-w-7xl');
    
    if (isExpanding) {
        pane.classList.remove('max-w-7xl','w-11/12','rounded-2xl','p-0');
        pane.classList.add('w-full','max-w-none','h-full','rounded-none');
        icon.setAttribute('data-lucide', 'minimize');
        if (mapWrapper) {
            mapWrapper.classList.remove('h-48', 'sm:h-64', 'md:h-96');
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
            mapWrapper.classList.add('h-48', 'sm:h-64', 'md:h-96');
        }
        if (body) {
            body.classList.remove('flex-1', 'max-h-none');
            body.classList.add('max-h-[75vh]');
        }
    }
    if (window.lucide) window.lucide.createIcons();
    if (state.detailMiniMapObj) setTimeout(() => state.detailMiniMapObj.invalidateSize(), 350);
};

window.viewTraceByRecord = function(uuid) {
    const rec = state.rawData.find(r => r._uuid === uuid || r.uuid === uuid);
    if (rec) {
        showDetailModal(rec);
    } else {
        console.warn(`[Modal] Registro con UUID ${uuid} no encontrado.`);
    }
};

window.closeDetailModal = closeDetailModal;
