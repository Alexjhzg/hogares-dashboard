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
 * Haversine distance in metres between two (lat, lon) pairs.
 */
export function haversineMeters(lat1, lon1, lat2, lon2) {
    const toRad = x => x * Math.PI / 180;
    const R = 6371000;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/**
 * Point-in-Polygon check using Ray Casting algorithm.
 * @param {number[]} point - [lat, lng] point to check.
 * @param {number[][]} polygon - Array of [lng, lat] coordinates (GeoJSON standard ring).
 */
export function isPointInPolygon(point, polygon) {
    const [lat, lng] = point;
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i]; // xi=lng, yi=lat (GeoJSON style)
        const [xj, yj] = polygon[j]; // xj=lng, yj=lat
        
        const intersect = ((yi > lat) !== (yj > lat)) &&
            (lng < (xj - xi) * (lat - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}

/**
 * Get Bounding Box for a polygon [[lng, lat], ...] (GeoJSON standard outer ring)
 * Returns {minLat, maxLat, minLng, maxLng}
 * Using correctly destructured labels for clarity.
 */
export function getPolygonBBox(polygon) {
    let minLat = Infinity, maxLat = -Infinity;
    let minLng = Infinity, maxLng = -Infinity;
    for (const [lng, lat] of polygon) {
        if (lat < minLat) minLat = lat;
        if (lat > maxLat) maxLat = lat;
        if (lng < minLng) minLng = lng;
        if (lng > maxLng) maxLng = lng;
    }
    return { minLat, maxLat, minLng, maxLng };
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
