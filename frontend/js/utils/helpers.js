// ─── Pure Helper Functions ───────────────────────────────────────────────────
// No side-effects, no DOM access, no imports from other project modules.

/** Shorthand getElementById */
export const $ = id => document.getElementById(id);

/** Shorthand querySelectorAll — returns a NodeList */
export const $$ = sel => document.querySelectorAll(sel);

/** Arithmetic mean of an array of numbers */
export function avg(arr) {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
}

/**
 * Parse a KoboToolbox geopoint string "lat lon [alt precision]"
 * Returns [lat, lng] or null.
 */
export function parseGeoString(g) {
    if (!g) return null;
    try {
        const parts = String(g).trim().split(/\s+/);
        if (parts.length < 2) return null;
        return [parseFloat(parts[0]), parseFloat(parts[1])];
    } catch (e) { return null; }
}



/**
 * Compares two segment codes, handling potential padding or full UBIGEO strings.
 * Returns true if they are considered a match.
 */
export function matchSegmentCodes(declared, real) {
    if (!declared || !real) return false;
    const d = String(declared).trim();
    const r = String(real).trim();
    
    // Exact match
    if (d === r) return true;
    
    // Normalized 3-digit match (standard padding)
    if (d.padStart(3, '0') === r.padStart(3, '0')) return true;
    
    // UBIGEO vs Short code match (e.g. "16050100001011" ends with "011")
    if (d.endsWith(r) || r.endsWith(d)) return true;
    
    return false;
}
