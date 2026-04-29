import { ALERT_MAP } from '../core/index.js';

export function getSegmentPopupHtml(typeLabel, displayId, color, props) {
    return `<div class="p-2 font-sans">
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
}

export function getControlTooltipHtml(p) {
    return `<div style="font-family:Inter,sans-serif;font-size:11px;line-height:1.5">
        <b>Control ${p.CONTROL}</b> · Serie ${p.SERIE}<br>
        Línea ${p.LINEA} · Seg ${p.COD_SEG} · Manz ${p.COD_MANZA}
    </div>`;
}

export function getSurveyMarkerPopupHtml(m, uuid, color, borderColor, alertBadge, alertas, durText, distText) {
    const hasAlerts = alertas && alertas.length > 0;
    const hasSegData = m.segmento || m.sector || m.manzana || m.parcela || m.edificacion || m.direccion;
    
    const segSection = hasSegData ? `
        <div class="border-t border-slate-100 dark:border-white/5 pt-3 mb-3">
            <div class="flex items-center gap-1.5 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                <span class="text-[8px] uppercase font-bold text-sky-600 dark:text-sky-400 tracking-wider">Datos del Segmento</span>
            </div>
            <div class="grid grid-cols-3 gap-2 mb-2">
                <div><div class="text-[8px] uppercase text-slate-400 dark:text-slate-500 font-bold">Segmento</div><div class="text-[10px] font-bold text-sky-600 dark:text-sky-300">${m.segmento || '—'}</div></div>
                <div><div class="text-[8px] uppercase text-slate-400 dark:text-slate-500 font-bold">Sector</div><div class="text-[10px] font-bold text-slate-800 dark:text-white">${m.sector || '—'}</div></div>
                <div><div class="text-[8px] uppercase text-slate-400 dark:text-slate-500 font-bold">Manzana</div><div class="text-[10px] font-bold text-slate-800 dark:text-white">${m.manzana || '—'}</div></div>
            </div>
            <div class="grid grid-cols-3 gap-2">
                <div><div class="text-[8px] uppercase text-slate-400 dark:text-slate-500 font-bold">Parcela</div><div class="text-[10px] font-bold text-slate-800 dark:text-white">${m.parcela || '—'}</div></div>
                <div><div class="text-[8px] uppercase text-slate-400 dark:text-slate-500 font-bold">Edificación</div><div class="text-[10px] font-bold text-slate-800 dark:text-white">${m.edificacion || '—'}</div></div>
                <div><div class="text-[8px] uppercase text-slate-400 dark:text-slate-500 font-bold">Lado Manz.</div><div class="text-[10px] font-bold text-slate-800 dark:text-white">${m.lado_manz || '—'}</div></div>
            </div>
            ${m.direccion ? `<div class="mt-2"><div class="text-[8px] uppercase text-slate-400 dark:text-slate-500 font-bold">Dirección / Sector</div><div class="text-[10px] font-semibold text-slate-600 dark:text-slate-300 leading-tight">${m.direccion}</div></div>` : ''}
        </div>` : '';

    return `
        <div class="p-4 min-w-[280px] bg-white dark:bg-[#0f172a] text-slate-600 dark:text-slate-200 rounded-xl shadow-2xl border border-slate-100 dark:border-white/5" style="font-family:'Inter',sans-serif">
            <div class="flex justify-between items-center mb-3">
                <span class="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Encuestador</span>
                <span class="px-2 py-0.5 rounded-md text-[9px] font-bold text-white shadow-sm" style="background:${color}">${alertBadge}</span>
            </div>
            <div class="font-bold text-sm text-slate-900 dark:text-white mb-0.5">${m.nombre}</div>
            <div class="text-[10px] text-slate-500 dark:text-slate-400 mb-3">${m.fecha} · ${m.cedula}</div>
            
            <div class="border-t border-slate-100 dark:border-white/5 pt-3 mb-3">
                <div class="flex justify-between gap-4 mb-2">
                    <div class="flex-1">
                        <div class="text-[8px] uppercase text-slate-400 dark:text-slate-500 font-bold">Municipio</div>
                        <div class="text-[10px] font-bold text-slate-800 dark:text-white">${m.mun}</div>
                    </div>
                    <div class="flex-1 text-right">
                        <div class="text-[8px] uppercase text-slate-400 dark:text-slate-500 font-bold">Parroquia</div>
                        <div class="text-[10px] font-bold text-slate-800 dark:text-white">${m.par || '—'}</div>
                    </div>
                </div>
                <div class="flex justify-between items-center">
                    <div>
                        <div class="text-[8px] uppercase text-slate-400 dark:text-slate-500 font-bold">Nodo</div>
                        <div class="text-[10px] font-bold text-slate-800 dark:text-white">${m.nodo || '—'}</div>
                    </div>
                    <div class="text-right">
                        <div class="text-[8px] uppercase text-slate-400 dark:text-slate-500 font-bold">Uso</div>
                        <div class="text-[10px] font-bold text-slate-800 dark:text-white">${(m.uso || '—').replace(/_/g, ' ')}</div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-white/5 pt-3 mb-3">
                <div>
                    <div class="text-[8px] uppercase text-slate-400 dark:text-slate-500 font-bold">Duración</div>
                    <div class="text-[10px] font-bold" style="color:${m.durMin !== null && (m.durMin < 15 || m.durMin > 45) ? '#EF4444' : '#10B981'}">${durText}</div>
                </div>
                <div class="text-right">
                    <div class="text-[8px] uppercase text-slate-400 dark:text-slate-500 font-bold">Distancia (A->I)</div>
                    <div class="text-[10px] font-bold" style="color:${hasAlerts ? '#EF4444' : '#64748b'}">${distText}</div>
                </div>
            </div>

            ${hasAlerts ? `
            <div class="border-t border-red-500/10 dark:border-red-500/20 pt-3 mb-3">
                <div class="flex items-center gap-1.5 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                    <span class="text-[8px] uppercase font-bold text-red-500 dark:text-red-400 tracking-wider">Alertas Detectadas (${alertas.length})</span>
                </div>
                ${alertas.map(code => {
                    const rule = ALERT_MAP[code];
                    if (!rule) return '';
                    return `<div class="mb-1 p-1 bg-red-500/5 dark:bg-red-500/10 border border-red-500/10 dark:border-red-500/20 rounded-lg flex items-center gap-2" title="${rule.detail.replace(/\n/g,'').trim()}">
                        <div class="text-[9px] font-black text-red-500 dark:text-red-400">⚠ ${rule.label}</div>
                    </div>`;
                }).join('')}
            </div>` : ''}

            ${segSection}

            <div class="grid grid-cols-2 gap-2 border-t border-slate-100 dark:border-white/5 pt-3 mb-3">
                <div>
                    <div class="text-[8px] uppercase text-slate-400 dark:text-slate-500 font-bold">Desplazamiento</div>
                    <div class="text-[10px] font-bold" style="color:${m.dist_ini_fin !== null && m.dist_ini_fin > 30 ? '#F59E0B' : '#10B981'}">${m.dist_ini_fin !== null ? Math.round(m.dist_ini_fin) + ' m' : '—'} <span class="text-[8px] text-slate-400 dark:text-slate-500">(Ini->Fin)</span></div>
                </div>
                <div class="flex items-end justify-end">
                    <button onclick="window.viewTraceByRecord('${uuid}')" class="px-3 py-1 bg-brand-blue/10 dark:bg-brand-blue/20 hover:bg-brand-blue/20 dark:hover:bg-brand-blue/40 border border-brand-blue/20 dark:border-brand-blue/30 text-brand-blue rounded-lg text-[9px] font-bold uppercase tracking-widest transition-colors flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><circle cx="10" cy="13" r="2"/><path d="m16 19-3.5-3.5"/></svg> Ficha de Inspección
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-2 gap-2 border-t border-slate-100 dark:border-white/5 pt-3">
                <div>
                    <div class="text-[8px] uppercase text-slate-400 dark:text-slate-500 font-bold">Condición</div>
                    <div class="text-[10px] font-bold text-slate-800 dark:text-white">${(m.condicion || '—').replace(/_/g, ' ')}</div>
                </div>
                <div>
                    <div class="text-[8px] uppercase text-slate-400 dark:text-slate-500 font-bold">Hogares / Pers.</div>
                    <div class="text-[10px] font-bold text-slate-800 dark:text-white">${m.hogares} / ${m.totalPers}</div>
                </div>
            </div>
        </div>
    `;
}

export function getRouteMarkerIconHtml(num) {
    return `<div style="
        width:22px;height:22px;border-radius:50%;
        background:#F97316;border:2px solid white;
        display:flex;align-items:center;justify-content:center;
        font-family:Inter,sans-serif;font-size:9px;font-weight:900;
        color:white;box-shadow:0 2px 6px rgba(0,0,0,0.4);
        cursor:pointer;
    ">${num}</div>`;
}

export function getRouteTooltipHtml(num, hora, m, durText) {
    return `
        <div style="font-family:Inter,sans-serif;font-size:11px;line-height:1.6;padding:2px 4px">
            <b>#${num} · ${hora}</b><br>
            ${m.nombre || '—'}<br>
            Ctrl: ${m.control ? m.control.slice(-4) : '—'} · L${m.n_linea || '—'}<br>
            Duración: ${durText}
        </div>
    `;
}
