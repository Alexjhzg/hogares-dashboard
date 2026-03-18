// ─── Pure Helper Functions ───────────────────────────────────────────────────
// No side-effects, no DOM access, no imports from other project modules.

/** Shorthand getElementById */
export const $ = id => document.getElementById(id);

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
 * Coordinates expected as [lat, lng].
 * Polygon should be an array of [lat, lng] (outer ring).
 */
export function isPointInPolygon(point, polygon) {
    const [x, y] = point;
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];
        const intersect = ((yi > y) !== (yj > y)) &&
            (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}

/**
 * Get Bounding Box for a polygon [[lat, lng], ...]
 * Returns {minLat, maxLat, minLng, maxLng}
 */
export function getPolygonBBox(polygon) {
    let minLat = Infinity, maxLat = -Infinity;
    let minLng = Infinity, maxLng = -Infinity;
    for (const [lat, lng] of polygon) {
        if (lat < minLat) minLat = lat;
        if (lat > maxLat) maxLat = lat;
        if (lng < minLng) minLng = lng;
        if (lng > maxLng) maxLng = lng;
    }
    return { minLat, maxLat, minLng, maxLng };
}
