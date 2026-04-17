/**
 * Centralized utility functions for modal data processing.
 */

export const extractNested = (rec, path) => {
    if (!rec) return null;
    if (rec._meta && typeof rec._meta[path] !== 'undefined' && rec._meta[path] !== null) return rec._meta[path];
    if (rec[path] !== undefined && rec[path] !== null) return rec[path];
    
    // Fallback for Kobo-style paths Group/Field
    const keys = String(path).split('/').map(s => s.trim());
    for (const k of keys) {
        if (!k || k.includes(' ')) continue;
        if (rec[k] !== undefined && rec[k] !== null) return rec[k];
    }
    return null;
};

export const fmt = (val) => {
    if (val === null || val === undefined || val === '') return '<span class="text-slate-500 font-medium italic">(No Registrado)</span>';
    if (typeof val === 'object') return `<pre class="text-[10px] bg-slate-950/20 p-2 rounded overflow-x-auto">${JSON.stringify(val, null, 2)}</pre>`;
    return `<span class="font-outfit font-bold text-slate-800 dark:text-slate-200 text-sm">${String(val)}</span>`;
};

export const parseGeo = (geoStr) => {
    if (!geoStr || typeof geoStr !== 'string') return null;
    const parts = geoStr.trim().split(' ');
    if (parts.length >= 2) return { 
        lat: parseFloat(parts[0]), 
        lng: parseFloat(parts[1]), 
        alt: parts[2] ? parseFloat(parts[2]) : null, 
        acc: parts[3] ? parseFloat(parts[3]) : null 
    };
    return null;
};

export const calcDistance = (pt1, pt2) => {
    if (!pt1 || !pt2) return null;
    const R = 6371000; // Earth radius in meters
    const toRad = p => p * Math.PI / 180;
    const dLat = toRad(pt2.lat - pt1.lat);
    const dLng = toRad(pt2.lng - pt1.lng);
    const a = Math.sin(dLat/2)**2 + Math.cos(toRad(pt1.lat)) * Math.cos(toRad(pt2.lat)) * Math.sin(dLng/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
};

export const _padM = (v, l) => String(parseInt(v, 10) || 0).padStart(l, '0');

export const _ctrlKey = (ctrl, serie, linea) => {
    const c = String(ctrl || '').trim().slice(-4);
    const s = String(parseInt(serie, 10) || 0);
    const l = String(parseInt(linea, 10) || 0);
    return `${c}-${s}-${l}`;
};
