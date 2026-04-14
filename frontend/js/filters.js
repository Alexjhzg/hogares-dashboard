// ─── Filters ─────────────────────────────────────────────────────────────────
// Populates filter selects, applies filter logic, handles off-canvas panel,
// and renders active filter tags.
//
// renderAll is injected via setRenderAll() to avoid circular imports.

import { state } from './state.js?v=39';
import { $ } from './helpers.js?v=39';

import { IS_INE, ALERT_RULES } from './config.js?v=39';

let _renderAll = () => {};
/** Inject the renderAll callback from main.js */
export function setRenderAll(fn) { _renderAll = fn; }

// ── Off-Canvas Panel ──────────────────────────────────────────────────────────

export function openFiltersPanel() {
    $('offCanvasFilters').classList.remove('translate-x-full');
    $('filtersOverlay').classList.remove('hidden');
    setTimeout(() => $('filtersOverlay').classList.remove('opacity-0'), 10);
}

export function closeFiltersPanel() {
    $('offCanvasFilters').classList.add('translate-x-full');
    $('filtersOverlay').classList.add('opacity-0');
    setTimeout(() => $('filtersOverlay').classList.add('hidden'), 300);
}

// ── Populate ─────────────────────────────────────────────────────────────────

export function populateFilters() {
    const selEnc     = $('filterEncuestador');
    const selMun     = $('filterMunicipio');
    const selCon     = $('filterCondicion');
    const selSitV    = $('filterSituacionVivienda');
    const selUso     = $('filterUso');
    const selSemana  = $('filterSemana');
    const selControl = $('filterControl');
    const selPar     = $('filterParroquia');
    const selNodo    = $('filterNodo');
    const selAlerta  = $('filterAlerta');

    selEnc.innerHTML     = '<option value="">Todos</option>';
    selMun.innerHTML     = '<option value="">Todos</option>';
    selCon.innerHTML     = '<option value="">Todas</option>';
    selUso.innerHTML     = '<option value="">Todos</option>';
    if (selSemana)  selSemana.innerHTML  = '<option value="">Todas</option>';
    if (selControl) selControl.innerHTML = '<option value="">Todos</option>';
    if (selPar)     selPar.innerHTML     = '<option value="">Todas</option>';
    if (selNodo)    selNodo.innerHTML    = '<option value="">Todos</option>';
    if (selAlerta) {
        selAlerta.innerHTML = '<option value="">Todas las alertas</option>';
        ALERT_RULES.forEach(r => {
            const o = document.createElement('option');
            o.value = r.code;
            o.textContent = r.label;
            selAlerta.appendChild(o);
        });
    }

    const muns = new Set(), sitVs = new Set(), cons = new Set(),
          usos = new Set(), semanas = new Set(), controles = new Set(),
          pars = new Set(), nodos = new Set();

    Object.values(state.encMap)
        .sort((a, b) => a.nombre.localeCompare(b.nombre))
        .forEach(m => {
            const isIne = IS_INE.has(m.cedula);
            const opt = document.createElement('option');
            opt.value = m.cedula;
            opt.textContent = `${m.nombre} (${m.cedula})${isIne ? ' [INE]' : ' [SEGEN]'}`;
            if (isIne) {
                opt.classList.add('font-bold', 'text-brand-emerald');
                opt.style.color = '#10B981'; // Emerald/Green
            } else {
                opt.classList.add('font-bold', 'text-brand-purple');
                opt.style.color = '#8B5CF6'; // Purple
            }
            selEnc.appendChild(opt);
        });

    state.rawData.forEach(r => {
        if (r._meta.mun !== 'N/A')              muns.add(r._meta.mun);
        if (r._meta.situacion_vivienda)          sitVs.add(r._meta.situacion_vivienda);
        if (r._meta.condicion !== 'N/A')         cons.add(r._meta.condicion);
        if (r._meta.uso !== 'N/A')               usos.add(r._meta.uso);
        if (r._meta.semana)                      semanas.add(r._meta.semana);
        if (r._meta.control)                     controles.add(r._meta.control);
        if (r._meta.par && r._meta.par !== 'N/A')   pars.add(r._meta.par);
        if (r._meta.nodo && r._meta.nodo !== 'N/A') nodos.add(r._meta.nodo);
    });

    const append = (sel, vals, transform) =>
        [...vals].sort().forEach(v => {
            const o = document.createElement('option');
            o.value = v;
            o.textContent = transform ? transform(v) : v;
            sel.appendChild(o);
        });

    append(selMun, muns);
    if (selSitV) append(selSitV, sitVs, v => v.replace(/_/g, ' ').toUpperCase());
    if (selSemana)  append(selSemana, semanas);
    if (selControl) append(selControl, controles);
    if (selPar)     append(selPar, pars);
    if (selNodo)    append(selNodo, nodos);
    append(selCon, cons, v => v.replace(/_/g, ' ').toUpperCase());
    append(selUso, usos, v => v.replace(/_/g, ' ').toUpperCase());

    if ($('filterMunicipio')) $('filterMunicipio').dispatchEvent(new Event('change'));
}

// ── Apply ─────────────────────────────────────────────────────────────────────

export function applyFilters() {
    const query    = $('searchEncuesta')?.value.toLowerCase() ?? '';
    const enc      = $('filterEncuestador')?.value ?? '';
    const fi       = $('filterFechaInicio')?.value ?? '';
    const ff       = $('filterFechaFin')?.value ?? '';
    const semana   = $('filterSemana')?.value ?? '';
    const control  = $('filterControl')?.value ?? '';
    const mun      = $('filterMunicipio')?.value ?? '';
    const parroquia = $('filterParroquia')?.value ?? '';
    const nodo     = $('filterNodo')?.value ?? '';
    const estado   = $('filterEstado')?.value ?? '';
    const sitViv   = $('filterSituacionVivienda')?.value ?? '';
    const condicion = $('filterCondicion')?.value ?? '';
    const uso      = $('filterUso')?.value ?? '';
    const alerta   = $('filterAlerta')?.value ?? '';

    state.filtered = state.rawData.filter(r => {
        const m = r._meta;
        if (query    && !(m.nombre.toLowerCase().includes(query) || m.cedula.includes(query) || m.control.includes(query))) return false;
        if (enc      && m.cedula !== enc)        return false;
        if (state.filterINE) {
            const cleanCed = String(m.cedula).trim();
            if (!IS_INE.has(cleanCed)) return false;
        }
        if (state.filterSEGEN) {
            const cleanCed = String(m.cedula).trim();
            if (IS_INE.has(cleanCed)) return false;
        }
        if (fi       && m.fecha < fi)            return false;
        if (ff       && m.fecha > ff)            return false;
        if (semana   && m.semana !== semana)     return false;
        if (control  && m.control !== control)   return false;
        if (mun      && m.mun !== mun)           return false;
        if (parroquia && m.par !== parroquia)    return false;
        if (nodo     && m.nodo !== nodo)         return false;
        if (estado === 'completada'   && m.estado !== 'completada') return false;
        if ((estado === 'no_respuesta' || estado === 'parcial') && m.estado === 'completada')  return false;
        if (state.quickFilterMode === 'efectivas'    && m.estado !== 'completada') return false;
        if (state.quickFilterMode === 'no_respuesta' && m.estado === 'completada')  return false;
        if (state.quickFilterMode === 'alertas'      && !m.hasAlerts)            return false;
        if (sitViv   && m.situacion_vivienda !== sitViv) return false;
        if (condicion && m.condicion !== condicion)      return false;
        if (uso      && m.uso !== uso)                   return false;
        if (alerta   && !m.alertas.includes(alerta))     return false;
        return true;
    });

    renderActiveFilterTags();
    _renderAll();
    document.dispatchEvent(new CustomEvent('filtersApplied'));
}

// ── Reset ─────────────────────────────────────────────────────────────────────

export function resetFilters() {
    ['filterEncuestador','filterFechaInicio','filterFechaFin','filterSemana',
     'filterControl','filterMunicipio','filterParroquia','filterNodo',
     'filterEstado','filterCondicion','filterSituacionVivienda','filterUso','filterAlerta','searchEncuesta']
        .forEach(id => { if ($(id)) $(id).value = ''; });

    if ($('filterMunicipio')) $('filterMunicipio').dispatchEvent(new Event('change'));
    state.filtered = [...state.rawData];
    renderActiveFilterTags();
    _renderAll();
}

// ── Active Filter Tags ────────────────────────────────────────────────────────

export function renderActiveFilterTags() {
    const container = $('activeFiltersContainer');
    const badge     = $('activeFiltersBadge');
    if (!container || !badge) return;

    const filters = [
        { id: 'filterMunicipio',        label: 'Mpio' },
        { id: 'filterParroquia',        label: 'Parr' },
        { id: 'filterNodo',             label: 'Nodo' },
        { id: 'filterEstado',           label: 'Estado' },
        { id: 'filterCondicion',        label: 'Condición' },
        { id: 'filterSituacionVivienda',label: 'Sit. Viv' },
        { id: 'filterUso',              label: 'Uso' },
        { id: 'filterSemana',           label: 'Sem' },
        { id: 'filterControl',          label: 'Control' },
        { id: 'filterAlerta',           label: 'Alerta' },
    ];

    let activeCount = 0;
    container.innerHTML = '';

    filters.forEach(f => {
        const el = $(f.id);
        if (el && el.value) {
            activeCount++;
            const text = el.options[el.selectedIndex].text;
            const btn = document.createElement('button');
            btn.className = 'group flex items-center gap-2 px-3 py-1.5 bg-brand-blue/10 hover:bg-brand-red/10 border border-brand-blue/30 hover:border-brand-red/30 text-brand-blue hover:text-brand-red rounded-lg text-[10px] font-bold transition-all';
            btn.innerHTML = `<span class="opacity-70">${f.label}:</span> <span>${text}</span> <i data-lucide="x" class="w-3 h-3 group-hover:scale-110 transition-transform"></i>`;
            btn.addEventListener('click', () => {
                el.value = '';
                if (f.id === 'filterMunicipio') el.dispatchEvent(new Event('change'));
                applyFilters();
            });
            container.appendChild(btn);
        }
    });

    if (activeCount > 0) {
        badge.textContent = activeCount;
        badge.classList.remove('hidden');
        container.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
        container.classList.add('hidden');
    }

    if (window.lucide) lucide.createIcons();
}
