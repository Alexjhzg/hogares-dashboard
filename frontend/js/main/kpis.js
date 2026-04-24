import { state } from '../state.js';
import { $, avg } from '../helpers.js';

export function updateKPIs() {
    const completadas = state.filtered.filter(r => r._meta && r._meta.estado === 'completada').length;
    const noRespuesta = state.filtered.length - completadas;
    const encs        = new Set(state.filtered.map(r => r._meta.cedula)).size;
    const durs        = state.filtered
        .filter(r => r._meta.estado === 'completada')
        .map(r => r._meta.durMin)
        .filter(d => d !== null);
    
    const avgDuracion = durs.length ? avg(durs) : 0;
    const personas    = state.filtered.reduce((s, r) => s + (r._meta.totalPers || 0), 0);
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
    if ($('kpiNoRespuesta'))    $('kpiNoRespuesta').textContent    = noRespuesta;
    if ($('kpiEncuestadores'))  $('kpiEncuestadores').textContent  = encs;
    if ($('kpiDuracion'))       $('kpiDuracion').textContent       = avgDuracion ? `${Math.round(avgDuracion)} min` : 'N/A';
    if ($('kpiPersonas'))       $('kpiPersonas').textContent       = personas;
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

    if ($('kpiTasaEfectividad')) $('kpiTasaEfectividad').textContent = `${tasaEfectividad}%`;
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
    if ($('rankKpiEfectivas'))   $('rankKpiEfectivas').textContent    = completadas;
    if ($('rankKpiNoRespuesta')) $('rankKpiNoRespuesta').textContent  = noRespuesta;
    if ($('rankKpiAlerts'))      $('rankKpiAlerts').textContent       = totalConAlertas;
}
