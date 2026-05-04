import { ALERT_MAP } from '../core/index.js';

export function getModalLayout(data) {
    const { 
        stEntidad, stMpio, stParr, valHeader, valLeftLabel, valLeftVal, 
        segmentMatchStatus, actualSegClasses, actualSegText, actualSeg, 
        stSect, stNodo, stEncuestador, stCedula, stFecha, stEstado, stDur, 
        stControl, stLinea, stSerie, ctrlPanelHtml, stHogares, stPers, 
        stCond, stUso, stDist, hasAlerts, alertsHtml, hasMapData, 
        isFlagged, walkedDistance, rawDist, durMin, declaredSeg, alertas 
    } = data;

    const mapSection = hasMapData ? `
        <div class="bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/50 overflow-hidden mt-4">
            <div class="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <div class="flex items-center gap-3">
                    <h4 class="text-[10px] uppercase font-black text-brand-orange tracking-widest flex items-center gap-2 m-0">Verificación Geográfica Histórica</h4>
                    ${isFlagged ? '<span class="px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-widest bg-brand-red/20 text-brand-red border border-brand-red/30">Desviación Detectada</span>' : ''}
                </div>
                <div class="flex items-center gap-4 text-[9px] uppercase font-bold text-slate-500">
                    <div class="flex items-center gap-1.5"><div class="w-2 h-2 rounded-full bg-[#38BDF8]"></div> Vivienda</div>
                    <div class="flex items-center gap-1.5"><div class="w-2 h-2 rounded-full bg-[#3B82F6]"></div> Apertura</div>
                    <div class="flex items-center gap-1.5"><div class="w-2 h-2 rounded-full bg-[#10B981]"></div> P. Inicial</div>
                    <div class="flex items-center gap-1.5"><div class="w-2 h-2 rounded-full bg-[#F59E0B]"></div> P. Final</div>
                </div>
            </div>
            <div id="detailMapWrapper" class="h-48 sm:h-64 md:h-96 w-full relative transition-[height] duration-300">
                <div class="metrics-panel-overlay absolute top-4 left-4 z-[var(--z-map-overlay)] bg-white/90 dark:bg-slate-900/80 backdrop-blur-md rounded-xl p-3 border border-slate-200 dark:border-slate-700/50 shadow-xl w-48 pointer-events-auto">
                    <div class="flex justify-between items-center md:block cursor-pointer md:cursor-default" onclick="if(window.innerWidth < 768) this.closest('.metrics-panel-overlay').classList.toggle('is-expanded')">
                        <h5 class="text-[9px] uppercase font-black text-brand-blue dark:text-slate-400 tracking-widest md:mb-2 md:border-b md:border-slate-100 md:dark:border-slate-700 md:pb-1 m-0">Métricas de Rastreo</h5>
                        <div class="md:hidden text-brand-blue">
                            <i data-lucide="chevron-up" class="w-4 h-4 transition-transform duration-300"></i>
                        </div>
                    </div>
                    <div class="metrics-content-body transition-opacity duration-300">
                        <div class="flex justify-between items-center mb-1 mt-2 md:mt-0"><span class="text-[10px] text-slate-500 font-bold">Seg. Declarado:</span><span class="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300">#${declaredSeg || 'N/A'}</span></div>
                        <div class="flex justify-between items-center mb-2 border-b border-slate-100 dark:border-slate-700/50 pb-2"><span class="text-[10px] text-slate-500 font-bold">Seg. en Mapa:</span><span class="text-[10px] font-mono font-bold ${alertas.includes('SEGMENTO_INCORRECTO') || alertas.includes('FUERA_SEGMENTO') ? 'text-brand-red' : 'text-brand-emerald'}">${actualSeg ? '#' + actualSeg : '(Nulo)'}</span></div>
                        <div class="flex justify-between items-center mb-1"><span class="text-[10px] text-slate-500 font-bold">Desplazamiento:</span><span class="text-[10px] font-mono font-bold ${alertas.includes('DESPLAZAMIENTO_ANOMALO') ? 'text-brand-orange' : 'text-slate-700 dark:text-slate-300'}">${walkedDistance !== null ? Math.round(walkedDistance)+'m' : 'N/A'}</span></div>
                        <div class="flex justify-between items-center mb-1"><span class="text-[10px] text-slate-500 font-bold">Dist. Centro:</span><span class="text-[10px] font-mono font-bold ${isFlagged ? 'text-brand-red' : 'text-brand-emerald'}">${rawDist !== null ? Math.round(rawDist)+'m' : 'N/A'}</span></div>
                        <div class="flex justify-between items-center"><span class="text-[10px] text-slate-500 font-bold">Tiempo Base:</span><span class="text-[10px] font-mono text-brand-blue font-bold">${durMin ? parseFloat(durMin).toFixed(2)+' min' : 'N/A'}</span></div>
                    </div>
                </div>
                <div id="detailMap" class="absolute inset-0 z-0 bg-slate-100 dark:bg-slate-800"></div>
            </div>
            <div class="p-1 border-t border-slate-200 dark:border-slate-700 text-center text-[10px] text-slate-400 leading-tight">El círculo sombreado indica la zona válida de cobertura (radio de 500m).</div>
        </div>` : `
        <div class="mt-4 p-4 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-center text-slate-500">
            <span class="text-xs uppercase tracking-widest font-bold block">No hay datos geográficos</span>
            <span class="text-[10px] block mt-1">Este registro no generó ni capturó coordenadas GPS con precisión adecuada.</span>
        </div>`;

    return `
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
                    <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Encuestador de Campo</div>${stEncuestador}</div>
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

            ${ctrlPanelHtml}

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
                        <div class="text-[10px] text-slate-500 font-bold uppercase mb-1">Desplazamiento (Inicio &rarr; Fin)</div>
                        ${stDist}
                    </div>
                    <div class="pt-2 border-t border-slate-200 dark:border-slate-700">
                        <div class="flex items-center gap-1.5 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${hasAlerts ? '#EF4444' : '#10B981'}" stroke-width="2.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                            <span class="text-[10px] text-slate-500 font-bold uppercase">${hasAlerts ? `Alertas (${alertas.length})` : 'Sin Alertas'}</span>
                        </div>
                        ${alertsHtml}
                    </div>
                </div>
            </div>
        </div>
        ${mapSection}
    `;
}

export function getAlertsHtml(alertas, meta) {
    if (!alertas || alertas.length === 0) {
        return `<span class="text-[10px] font-bold text-brand-emerald">✔ Encuesta dentro de parámetros normales</span>`;
    }

    return alertas.map(code => {
        const rule = ALERT_MAP[code];
        if (!rule) return '';

        let extraDetail = '';
        if (code === 'LINEA_SERIE_INVALIDA') {
            extraDetail = `<div class="mt-1 px-2 py-1 bg-red-100 dark:bg-red-900/30 rounded text-[9px] font-mono text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800/50">
                <b>Error de Datos:</b> ${meta._ls_key_reported || '—'}
            </div>`;
        }

        return `<div class="mb-2 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-lg">
            <div class="text-[10px] font-black text-brand-red mb-0.5">⚠ ${rule.label}</div>
            <div class="text-[9px] text-slate-500 dark:text-slate-400 leading-tight">${rule.detail.replace(/\n/g,' ').trim()}</div>
            ${extraDetail}
        </div>`;
    }).join('');
}

export function getControlValidationHtml(data) {
    const { 
        m, rawControl, rawSerie, rawLinea, _padM, hasCtrlIndex, ctrlEntry, ctrlKey 
    } = data;

    const noIndexMsg = !hasCtrlIndex
        ? `<div class="mt-2 text-[9px] text-slate-400 bg-slate-100 dark:bg-slate-800 rounded px-2 py-1.5 text-center">⚠ Índice de controles no cargado aún</div>`
        : '';
    let validCombosHtml = '';
    if (hasCtrlIndex && !ctrlEntry && data.validCombos && data.validCombos.length > 0) {
        validCombosHtml = `
            <div class="mt-2 p-2 bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded text-[9px] text-slate-600 dark:text-slate-400">
                <div class="font-bold mb-1 text-slate-700 dark:text-slate-300 text-center uppercase tracking-wider">Pares S/L válidos para este Control:</div>
                <div class="grid grid-cols-2 gap-1 font-mono text-center">
                    ${data.validCombos.map(c => `<div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded py-0.5"><span class="text-slate-400">S:</span>${_padM(c.serie,2)} <span class="text-slate-400 ml-1">L:</span>${_padM(c.linea,3)}</div>`).join('')}
                </div>
            </div>
        `;
    }

    const notFoundMsg = hasCtrlIndex && !ctrlEntry
        ? `<div class="mt-2 px-2 py-1.5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/30 rounded text-[9px] text-red-700 dark:text-red-300 text-center">Clave <b class="font-mono">${ctrlKey}</b><br>no existe en CONTROLES.geojson</div>${validCombosHtml}`
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
                <!-- Similares para Serie y Línea omitidos por brevedad pero incluidos en la versión completa -->
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
            ${notFoundMsg}
        </div>
    </div>`;
}

export function getRawJsonHtml(rec) {
    return `<details class="mt-3 text-sm text-slate-400 group">
        <summary class="cursor-pointer font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">Ver JSON crudo</summary>
        <pre class="text-[10px] bg-slate-100 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 p-2 rounded-lg mt-2 overflow-x-auto text-slate-700 dark:text-slate-300 font-mono">${JSON.stringify(rec, null, 2)}</pre>
    </details>`;
}

export function getMiniMapPopupHtml(data) {
    const { cod, mun, par, declaredSeg, actualSeg, featureLabel, displayId, color, isCurrent, isActual } = data;
    const badgeHtml = [
        isCurrent ? '<span style="background:#FBBF2433;color:#FBBF24;border:1px solid #FBBF2466;padding:1px 6px;border-radius:4px;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.05em">Declarado</span>' : '',
        isActual && !isCurrent ? '<span style="background:#10B98133;color:#10B981;border:1px solid #10B98166;padding:1px 6px;border-radius:4px;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.05em">Calculado GPS</span>' : '',
        isActual && isCurrent  ? '<span style="background:#10B98133;color:#10B981;border:1px solid #10B98166;padding:1px 6px;border-radius:4px;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.05em">✔ Coincide</span>' : ''
    ].filter(Boolean).join(' ');

    return `
        <div class="dark:text-slate-200" style="font-family:'Inter',sans-serif;min-width:180px;max-width:240px;padding:2px">
            <div class="dark:border-slate-700" style="font-family:'Outfit',sans-serif;font-weight:900;font-size:12px;color:#6366f1;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-bottom:8px">
                ${featureLabel} <span class="text-slate-800 dark:text-white" style="font-size:15px;">#${displayId}</span>
            </div>
            ${badgeHtml ? `<div style="margin-bottom:8px;display:flex;gap:4px;flex-wrap:wrap">${badgeHtml}</div>` : ''}
            <div style="font-size:10px;margin-bottom:3px" class="text-slate-500 dark:text-slate-400"><b>Municipio:</b> ${mun}</div>
            <div style="font-size:10px;" class="text-slate-500 dark:text-slate-400"><b>Parroquia:</b> ${par}</div>
        </div>`;
}

export function getMarkerPopupHtml(title, color, pt, accText, altText, timeText) {
    return `<div class="font-inter p-1 w-52">
        <div class="font-outfit font-black text-xs uppercase tracking-widest border-b border-slate-200 pb-1 mb-2" style="color:${color}">${title}</div>
        <div class="flex justify-between items-center text-[10px] mb-1"><span class="font-bold text-slate-500">Coordenada:</span><span class="font-mono text-slate-700">${pt.lat.toFixed(5)}, ${pt.lng.toFixed(5)}</span></div>
        <div class="flex justify-between items-center text-[10px] mb-1"><span class="font-bold text-slate-500">Precisión GPS:</span><span class="font-mono font-bold">${accText}</span></div>
        <div class="flex justify-between items-center text-[10px] mb-1"><span class="font-bold text-slate-500">Altitud Nivel Mar:</span><span class="font-mono text-slate-700">${altText}</span></div>
        <div class="flex justify-between items-center text-[10px] border-t border-slate-100 pt-1 mt-1"><span class="font-bold text-slate-500">Hora de Captura:</span><span class="font-mono text-brand-purple font-bold">${timeText}</span></div>
    </div>`;
}
