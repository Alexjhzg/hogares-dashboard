import { state, IS_INE } from '../core/index.js';
import { $, avg } from '../utils/index.js';
import { SUBTIPO_STYLES, SUBTIPO_NOMENCLATURA } from '../core/index.js';

// Ordered subtype definitions grouped by parent type for the breakdown panel
const SUBTIPO_GROUPS = [
    {
        tipo: 'TIPO A',
        label: 'Ausentes / Rechazos / No Respuesta',
        icon: 'user-round-x',
        color: '#8B5CF6',
        borderClass: '!border-l-2 !border-l-[#8B5CF6]',
        tooltip: 'Viviendas con ausencias, rechazos o informantes no calificados (AT, IN, OA, IC, PE, NO, RZ, SE).',
        subtypes: ['Ausente Temporalmente', 'Incompleta', 'Ocupantes Ausentes', 'Informante No Calificado', 'Pendiente', 'No Atiende Telefono', 'Rechazada', 'Sin Entrevista'],
    },
    {
        tipo: 'TIPO B',
        label: 'Desocupadas / Ocasionales / Construcción',
        icon: 'brick-wall',
        color: '#F59E0B',
        borderClass: '!border-l-2 !border-l-[#F59E0B]',
        tooltip: 'Viviendas en construcción, desocupadas, vacacionales, ocasionales o inadecuadas para uso (CO, IU, VD, VO, UV, TN).',
        subtypes: ['Construccion', 'Inadecuada para Uso', 'Vivienda Desocupada', 'Vivienda Ocasional', 'Uso Vacasional', 'Temporalmente en Negocio'],
    },
    {
        tipo: 'TIPO C',
        label: 'Inexistentes / No Residenciales / Demolidas',
        icon: 'hammer',
        color: '#64748B',
        borderClass: '!border-l-2 !border-l-[#64748B]',
        tooltip: 'Viviendas demolidas, mal listadas, inexistentes, negocios permanentes u otras situaciones no residenciales (DE, ML, NE, SL, OT, OS, NT, NP, OE, CD).',
        subtypes: ['Demolida', 'Mal Listada', 'No Existe', 'Sin Listar', 'Otra Condicion', 'Otra Situacion', 'No Existe Nro Telefonico', 'Negocio Permanente', 'Otro (Especifique)', 'Consolidada'],
    },
    {
        tipo: 'TIPO E',
        label: 'Entrevistas Efectivas',
        icon: 'user-check',
        color: '#10B981',
        borderClass: '!border-l-2 !border-l-[#10B981]',
        tooltip: 'Viviendas con entrevistas exitosas (Totalmente Encuestadas - TE).',
        subtypes: ['Totalmente Encuestado'],
    },
];

function getPlannedViviendas(scope = state.filtered) {
    if (!state.planificacionData || !state.planificacionData.por_semana) return 0;

    const program = state.assetName && state.assetName.toUpperCase().includes('EHM') ? 'EHM' : 'ESCA';
    const semanaFilter = $('filterSemana')?.value ?? '';
    const controlFilter = $('filterControl')?.value ?? '';
    const munFilter = $('filterMunicipio')?.value ?? '';
    const parFilter = $('filterParroquia')?.value ?? '';
    const encFilter = $('filterEncuestador')?.value ?? '';

    let activeControls = null;
    if (encFilter && scope) {
        activeControls = new Set(
            scope
                .map(r => r._meta?.control ? String(r._meta.control).replace(/\D/g, '').padStart(4, '0') : null)
                .filter(Boolean)
        );
    }

    let cleanMun = '';
    if (munFilter) {
        cleanMun = munFilter.replace(/^\d+\s*/, '').trim().toUpperCase();
    }
    let cleanPar = '';
    if (parFilter) {
        cleanPar = parFilter.replace(/^\d+\s*/, '').trim().toUpperCase();
    }

    let totalPlanif = 0;
    state.planificacionData.por_semana.forEach(item => {
        if (item.programa !== program) return;
        if (semanaFilter && item.semana !== Number(semanaFilter)) return;
        if (controlFilter && String(item.control).replace(/\D/g, '').padStart(4, '0') !== controlFilter.replace(/\D/g, '').padStart(4, '0')) return;
        if (activeControls && !activeControls.has(String(item.control).replace(/\D/g, '').padStart(4, '0'))) return;
        if (cleanMun && item.municipio.toUpperCase() !== cleanMun) return;
        if (cleanPar && item.parroquia.toUpperCase() !== cleanPar) return;

        totalPlanif += item.n_viviendas || 0;
    });

    return totalPlanif;
}

export function updateKPIs() {
    const completadas = state.filtered.filter(r => r._meta && r._meta.estado === 'completada').length;
    const noEfectiva = state.filtered.length - completadas;
    const encs        = new Set(state.filtered.map(r => r._meta.cedula)).size;
    const durs        = state.filtered
        .filter(r => r._meta.estado === 'completada')
        .map(r => r._meta.durMin)
        .filter(d => d !== null);
    
    const avgDuracion = durs.length ? avg(durs) : 0;
    const personas    = state.filtered.reduce((s, r) => s + (r._meta.totalPers || 0), 0);
    const avgIntegrantes = completadas > 0 ? (personas / completadas).toFixed(1) : '0';
    const hogaresUni  = state.filtered.reduce((s, r) => s + (r._meta.hogaresUniPersonales || 0), 0);
    const controles   = new Set(state.filtered.map(r => r._meta.control)).size;
    const hombres     = state.filtered.reduce((s, r) => s + (r._meta.totalHombres || 0), 0);
    const mujeres     = state.filtered.reduce((s, r) => s + (r._meta.totalMujeres || 0), 0);
    const municipios  = new Set(state.filtered.map(r => r._meta.mun)).size;

    // Housing Type Classification KPIs
    const tipoA = state.filtered.filter(r => r._meta && r._meta.tipo_vivienda === 'TIPO A').length;
    const tipoB = state.filtered.filter(r => r._meta && r._meta.tipo_vivienda === 'TIPO B').length;
    const tipoC = state.filtered.filter(r => r._meta && r._meta.tipo_vivienda === 'TIPO C').length;
    const tipoE = state.filtered.filter(r => r._meta && r._meta.tipo_vivienda === 'TIPO E').length;
    const tipoND = state.filtered.filter(r => r._meta && r._meta.tipo_vivienda === 'NO DEFINIDO').length;

    const total = state.filtered.length || 1;
    const pctA = Math.round((tipoA / total) * 100);
    const pctB = Math.round((tipoB / total) * 100);
    const pctC = Math.round((tipoC / total) * 100);
    const pctE = Math.round((tipoE / total) * 100);
    const pctND = Math.round((tipoND / total) * 100);

    // Header KPIs
    if ($('kpiTotal'))          $('kpiTotal').textContent          = state.filtered.length;
    if ($('kpiCompletadas'))    $('kpiCompletadas').textContent    = completadas;
    if ($('kpiNoEfectiva'))    $('kpiNoEfectiva').textContent    = noEfectiva;
    if ($('kpiEncuestadores'))  $('kpiEncuestadores').textContent  = encs;
    if ($('kpiDuracion'))       $('kpiDuracion').textContent       = avgDuracion ? `${Math.round(avgDuracion)} min` : 'N/A';
    if ($('kpiPersonas'))       $('kpiPersonas').textContent       = avgIntegrantes;
    if ($('kpiHogaresUni'))     $('kpiHogaresUni').textContent     = hogaresUni;
    if ($('kpiControles'))      $('kpiControles').textContent      = controles;
    if ($('kpiHombres'))        $('kpiHombres').textContent        = hombres;
    if ($('kpiMujeres'))        $('kpiMujeres').textContent        = mujeres;
    if ($('kpiMunicipios'))     $('kpiMunicipios').textContent     = municipios;

    // Housing Type Displays
    if ($('kpiTipoA')) $('kpiTipoA').textContent = tipoA;
    if ($('pctTipoA')) $('pctTipoA').textContent = `${pctA}%`;
    if ($('kpiTipoB')) $('kpiTipoB').textContent = tipoB;
    if ($('pctTipoB')) $('pctTipoB').textContent = `${pctB}%`;
    if ($('kpiTipoC')) $('kpiTipoC').textContent = tipoC;
    if ($('pctTipoC')) $('pctTipoC').textContent = `${pctC}%`;
    if ($('kpiTipoE')) $('kpiTipoE').textContent = tipoE;
    if ($('pctTipoE')) $('pctTipoE').textContent = `${pctE}%`;
    if ($('kpiTipoND')) $('kpiTipoND').textContent = tipoND;
    if ($('pctTipoND')) $('pctTipoND').textContent = `${pctND}%`;

    // Productivity
    const encPerHour = state.filtered.length / (encs * 8 || 1);
    if ($('kpiEncPerHour')) $('kpiEncPerHour').textContent = encPerHour.toFixed(1);

    const producers = {};
    state.filtered.forEach(r => { 
        const name = (r._meta && r._meta.nombre) || 'Desconocido';
        producers[name] = (producers[name] || 0) + 1; 
    });
    const topProducer = Object.entries(producers).sort((a, b) => b[1] - a[1])[0] || ['--', 0];
    if ($('kpiTopProducer'))    $('kpiTopProducer').textContent    = String(topProducer[0]).split(' ')[0];
    if ($('kpiTopProducerVal')) $('kpiTopProducerVal').textContent = `${topProducer[1]} encuestas`;

    // Quality Metrics
    const totalConAlertas = state.filtered.filter(r => r._meta && r._meta.hasAlerts).length;
    const tasaEfectividad = state.filtered.length > 0 ? Math.round((completadas / state.filtered.length) * 100) : 0;
    const tasaAlerta      = state.filtered.length > 0 ? Math.round((totalConAlertas / state.filtered.length) * 100) : 0;

    // Base Scope for Non-Response Rate (ignores classification/status filters to avoid distorting denominator)
    const query      = $('searchEncuesta')?.value.toLowerCase() ?? '';
    const enc        = $('filterEncuestador')?.value ?? '';
    const fi         = $('filterFechaInicio')?.value ?? '';
    const ff         = $('filterFechaFin')?.value ?? '';
    const semana     = $('filterSemana')?.value ?? '';
    const control    = $('filterControl')?.value ?? '';
    const mun        = $('filterMunicipio')?.value ?? '';
    const parroquia  = $('filterParroquia')?.value ?? '';
    const nodo       = $('filterNodo')?.value ?? '';
    const sitViv     = $('filterSituacionVivienda')?.value ?? '';
    const condicion  = $('filterCondicion')?.value ?? '';
    const uso        = $('filterUso')?.value ?? '';
    const alerta     = $('filterAlerta')?.value ?? '';
    const hTrans     = $('filterHoraTransmision')?.value ?? '';
    const hInicio    = $('filterHoraInicio')?.value ?? '';

    const baseScope = state.rawData.filter(r => {
        const m = r._meta;
        if (!m) return false;
        if (query && !(m.nombre.toLowerCase().includes(query) || m.cedula.includes(query) || m.control.includes(query))) return false;
        if (enc && m.cedula !== enc) return false;
        if (state.filterINE && !IS_INE.has(String(m.cedula).trim())) return false;
        if (state.filterSEGEN && IS_INE.has(String(m.cedula).trim())) return false;
        if (fi && m.fecha < fi) return false;
        if (ff && m.fecha > ff) return false;
        if (semana && m.semana !== semana) return false;
        if (control && m.control !== control) return false;
        if (mun && m.mun !== mun) return false;
        if (parroquia && m.par !== parroquia) return false;
        if (nodo && m.nodo !== nodo) return false;
        if (sitViv && m.situacion_vivienda !== sitViv) return false;
        if (condicion && m.condicion !== condicion) return false;
        if (uso && m.uso !== uso) return false;
        if (alerta && !m.alertas.includes(alerta)) return false;
        if (hTrans !== '' && String(m.hora_trans) !== hTrans) return false;
        if (hInicio !== '' && String(m.hora) !== hInicio) return false;
        return true;
    });

    const baseTipoA = baseScope.filter(r => r._meta && r._meta.tipo_vivienda === 'TIPO A').length;
    const baseTipoB = baseScope.filter(r => r._meta && r._meta.tipo_vivienda === 'TIPO B').length;
    const baseTipoC = baseScope.filter(r => r._meta && r._meta.tipo_vivienda === 'TIPO C').length;

    const vv_planif = getPlannedViviendas(baseScope);
    const basePlanif = vv_planif > 0 ? vv_planif : baseScope.length;
    const divisor = basePlanif - (baseTipoB + baseTipoC);
    const tasaNoRespuesta = divisor > 0 ? Math.round((baseTipoA / divisor) * 100) : (baseTipoA > 0 ? 100 : 0);

    if ($('kpiTasaEfectividad')) $('kpiTasaEfectividad').textContent = `${tasaEfectividad}%`;
    if ($('kpiTasaNoRespuesta')) $('kpiTasaNoRespuesta').textContent = `${tasaNoRespuesta}%`;
    if ($('kpiTotalAlertas'))    $('kpiTotalAlertas').textContent    = totalConAlertas;
    if ($('kpiTasaAlerta'))      $('kpiTasaAlerta').textContent      = `${tasaAlerta}%`;

    // Peak Hour
    const hours = {};
    state.filtered.forEach(r => { if (r._meta && r._meta.hora !== null) hours[r._meta.hora] = (hours[r._meta.hora] || 0) + 1; });
    const peakHour = Object.entries(hours).sort((a, b) => b[1] - a[1])[0] || [null, 0];
    if ($('kpiPeakHour')) $('kpiPeakHour').textContent = peakHour[0] !== null ? `${peakHour[0]}:00` : '--';

    // Daily Goal
    const metaInput  = $('inputMetaDiaria');
    const meta       = metaInput && !isNaN(Number(metaInput.value)) && Number(metaInput.value) > 0 ? Number(metaInput.value) : 20;
    const metaGlobal = encs * meta;
    const progreso   = Math.min(100, (state.filtered.length / (metaGlobal || 1)) * 100);
    if ($('kpiMetaProgreso')) $('kpiMetaProgreso').textContent = `${Math.round(progreso)}%`;
    if ($('kpiMetaBar'))      $('kpiMetaBar').style.width      = `${progreso}%`;

    // Ranking Tab KPIs
    const totalEncuestasVal = state.filtered.length || 1;
    const pctEfectivaGlobal = Math.round((completadas / totalEncuestasVal) * 100);

    if ($('rankKpiPctNoRespuesta')) $('rankKpiPctNoRespuesta').textContent = `${tasaNoRespuesta}%`;
    if ($('rankKpiNoEfectivaSub'))  $('rankKpiNoEfectivaSub').textContent  = `(${tipoA} Tipo A)`;
    if ($('rankKpiEfectivas'))      $('rankKpiEfectivas').textContent       = completadas;
    if ($('rankKpiPctEfectivas'))   $('rankKpiPctEfectivas').textContent    = `(${pctEfectivaGlobal}%)`;
    if ($('rankKpiAlerts'))         $('rankKpiAlerts').textContent          = totalConAlertas;
}

/**
 * Renders the housing subtype breakdown panel in #subtiposBreakdownContainer.
 * Groups all 12 subtypes under their parent TIPO columns with animated
 * progress bars showing count, label and percentage.
 */
export function updateSubtiposBreakdown() {
    const container = document.getElementById('subtiposBreakdownContainer');
    if (!container) return;

    const total = state.filtered.length || 1;

    // Count each subtype
    const counts = {};
    state.filtered.forEach(r => {
        const s = r._meta?.subtipo_vivienda || 'Otro (Especifique)';
        counts[s] = (counts[s] || 0) + 1;
    });

    container.innerHTML = SUBTIPO_GROUPS.map(group => {
        const groupTotal = group.subtypes.reduce((s, st) => s + (counts[st] || 0), 0);
        const groupPct = total > 0 ? Math.round((groupTotal / total) * 100) : 0;

        const activeSubtypes = group.subtypes.filter(st => (counts[st] || 0) > 0);
        const rows = activeSubtypes.length > 0 ? activeSubtypes.map(st => {
            const cnt = counts[st] || 0;
            const pct = total > 0 ? Math.round((cnt / total) * 100) : 0;
            const style = SUBTIPO_STYLES[st] || SUBTIPO_STYLES['DEFAULT'];
            const nom = SUBTIPO_NOMENCLATURA[st] || '';
            const labelText = nom ? `${nom} - ${st}` : st;
            return `
                <div class="flex items-center gap-2 mb-1.5">
                    <div class="flex-1 min-w-0">
                        <div class="flex justify-between items-center mb-0.5">
                            <span class="text-[10px] font-bold text-slate-600 dark:text-slate-300 truncate leading-tight">${labelText}</span>
                            <span class="text-[10px] font-black ml-2 shrink-0" style="color:${style.color}">${cnt}</span>
                        </div>
                        <div class="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div class="h-full rounded-full transition-all duration-700 ease-out"
                                 style="width:${pct}%;background:${style.color}"></div>
                        </div>
                    </div>
                </div>`;
        }).join('') : `<div class="text-[10px] font-medium italic text-slate-400 dark:text-slate-500 py-1 text-center">Sin registros</div>`;

        const cardKey = group.tipo.slice(-1); // A, B, C, E

        return `
            <div class="card-premium group relative animate-slide-up ${group.borderClass}" title="${group.tooltip}">
                <div class="card-glow bg-[${group.color}]/10 group-hover:bg-[${group.color}]/20"></div>
                <div class="kpi-label !mt-0 mb-1 flex items-center gap-1.5">
                    <i data-lucide="${group.icon}" class="w-4 h-4" style="color:${group.color}"></i>
                    <span class="font-outfit font-black text-xs uppercase tracking-widest text-slate-800 dark:text-slate-200">${group.tipo}</span>
                </div>
                <div class="flex items-baseline gap-2 mb-2">
                    <div class="kpi-value-text text-xl" id="kpiTipo${cardKey}">${groupTotal}</div>
                    <div class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter" id="pctTipo${cardKey}">${groupPct}%</div>
                </div>
                <div class="border-t pt-3" style="border-color:${group.color}22">
                    ${rows}
                </div>
            </div>`;
    }).join('');

    if (window.lucide) {
        window.lucide.createIcons({ root: container });
    }
}
