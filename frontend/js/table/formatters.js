import { ALERT_MAP, IS_INE, SUBTIPO_STYLES } from '../core/index.js';

export const estadoFormatter = (cell) => {
    const v = cell.getValue();
    const color = v === 'completada' ? '#10B981' : '#F59E0B';
    const label = v === 'completada' ? 'EFECTIVA' : 'NO EFECTIVA';
    return `<span style="color:${color};font-weight:700;font-size:10px;letter-spacing:0.02em">${label}</span>`;
};

export const duracionFormatter = (cell) => {
    const v = cell.getValue();
    if (v === null) return '—';
    const color = v < 15 ? '#EF4444' : v < 25 ? '#F59E0B' : '#10B981';
    return `<span style="color:${color};font-weight:800;font-family:Outfit,sans-serif;">${parseFloat(v).toFixed(2)}m</span>`;
};

export const alertasFormatter = (cell) => {
    const codes = cell.getValue();
    if (!codes || codes.length === 0) return '<span style="color:var(--text-muted);font-size:10px">—</span>';
    return codes.map(code => {
        const rule = ALERT_MAP[code];
        const label = rule ? rule.label : code;
        const detail = rule ? rule.detail.replace(/\n/g, ' ') : '';
        return `<span title="${detail}" style="display:inline-flex;align-items:center;gap:3px;background:rgba(239,68,68,0.15);color:#EF4444;border:1px solid rgba(239,68,68,0.3);border-radius:4px;padding:1px 5px;font-size:9px;font-weight:700;letter-spacing:0.02em;margin-right:3px;white-space:nowrap;">⚠ ${label}</span>`;
    }).join('');
};

export const rankingNombreFormatter = (cell) => {
    const d = cell.getData();
    const isIne = IS_INE.has(d.cedula);
    const badge = isIne ? '<span style="background:#3B82F6;color:white;font-size:8px;font-weight:900;padding:1px 4px;border-radius:4px;margin-left:6px;vertical-align:middle;">INE</span>' : '';
    return `<div><div style="font-weight:800;color:currentColor;font-size:12px;line-height:1.3;">${d.nombre || 'Sin Nombre'}${badge}</div><div style="font-size:9px;color:#94a3b8;font-weight:600;">${d.cedula || 'N/A'}</div></div>`;
};

export const efectividadFormatter = (cell) => {
    const v = cell.getValue();
    const color = v >= 80 ? '#10B981' : v >= 50 ? '#F59E0B' : '#EF4444';
    return `<div style="display:flex;flex-direction:column;align-items:center;gap:3px;padding:4px 0">
        <span style="font-weight:900;color:${color};font-size:15px;">${v}%</span>
        <div style="width:100%;max-width:80px;height:6px;background:rgba(0,0,0,0.05);border-radius:10px;overflow:hidden">
            <div style="width:${v}%;height:100%;background:${color};border-radius:10px;"></div>
        </div>
    </div>`;
};

export const actionButtonFormatter = () => `
    <div class="flex gap-2">
        <button class="tab-action-btn btn-view" data-action="view">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            <span>VER</span>
        </button>
    </div>
`;

export const noRespuestaFormatter = (cell) => {
    const v = Number(cell.getValue()) || 0;
    const color = v > 30 ? '#EF4444' : v > 15 ? '#F59E0B' : '#10B981';
    return `<div style="display:flex;flex-direction:column;align-items:center;gap:3px;padding:4px 0">
        <span style="font-weight:900;color:${color};font-size:15px;">${v}%</span>
        <div style="width:100%;max-width:80px;height:6px;background:rgba(0,0,0,0.06);border-radius:10px;overflow:hidden">
            <div style="width:${Math.min(100, v)}%;height:100%;background:${color};border-radius:10px;"></div>
        </div>
    </div>`;
};

export const desgloseTipologiaFormatter = (cell) => {
    const d = cell.getData();
    const tA = d.tipoA || 0;
    const tB = d.tipoB || 0;
    const tC = d.tipoC || 0;
    return `<div style="display:flex;align-items:center;gap:4px;justify-content:center;">
        <span title="Tipo A (Ausentes/Rechazos): ${tA}" style="background:rgba(139,92,246,0.15);color:#8B5CF6;border:1px solid rgba(139,92,246,0.3);font-size:9px;font-weight:800;padding:1px 5px;border-radius:4px;">A: ${tA}</span>
        <span title="Tipo B (Desocupadas): ${tB}" style="background:rgba(245,158,11,0.15);color:#F59E0B;border:1px solid rgba(245,158,11,0.3);font-size:9px;font-weight:800;padding:1px 5px;border-radius:4px;">B: ${tB}</span>
        <span title="Tipo C (No Residencial/Demolida): ${tC}" style="background:rgba(100,116,139,0.15);color:#64748B;border:1px solid rgba(100,116,139,0.3);font-size:9px;font-weight:800;padding:1px 5px;border-radius:4px;">C: ${tC}</span>
    </div>`;
};

export const subtipoFormatter = (cell) => {
    const val = cell.getValue();
    if (!val) return '<span style="color:var(--text-muted);font-size:10px">—</span>';
    const style = SUBTIPO_STYLES[val] || SUBTIPO_STYLES['DEFAULT'];
    return `<span style="display:inline-flex;align-items:center;background:${style.colorBg};color:${style.color};border:1px solid ${style.color}44;border-radius:6px;padding:2px 6px;font-size:9px;font-weight:800;letter-spacing:0.03em;white-space:nowrap;">${val}</span>`;
};
