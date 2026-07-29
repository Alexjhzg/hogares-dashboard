/**
 * ─── Spatial GeoJSON IndexedDB Cache & Client-Side Simplifier ───────────────
 * Persists and simplifies GeoJSON assets directly in the browser.
 * If an incoming raw GeoJSON has not been simplified before, it passes through
 * an intermediate Douglas-Peucker & 5-decimal precision reduction pipeline on-the-fly.
 */

const DB_NAME = 'ESCA_Spatial_Cache';
const DB_VERSION = 3;
const STORE_NAME = 'geojson_store';

function openSpatialDB() {
    return new Promise((resolve, reject) => {
        if (!window.indexedDB) {
            reject(new Error('IndexedDB not supported'));
            return;
        }
        const request = window.indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        };
        request.onsuccess = (e) => resolve(e.target.result);
        request.onerror = (e) => reject(e.target.error);
    });
}

export async function getCachedGeoJSON(key) {
    try {
        const db = await openSpatialDB();
        return new Promise((resolve) => {
            const tx = db.transaction(STORE_NAME, 'readonly');
            const store = tx.objectStore(STORE_NAME);
            const req = store.get(key);
            req.onsuccess = () => resolve(req.result || null);
            req.onerror = () => resolve(null);
        });
    } catch (e) {
        console.warn('[SpatialCache] IndexedDB read fallback:', e);
        return null;
    }
}

export async function setCachedGeoJSON(key, data) {
    try {
        const db = await openSpatialDB();
        return new Promise((resolve) => {
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);
            store.put(data, key);
            tx.oncomplete = () => resolve(true);
            tx.onerror = () => resolve(false);
        });
    } catch (e) {
        console.warn('[SpatialCache] IndexedDB write fallback:', e);
        return false;
    }
}

/**
 * Client-Side Intermediate Simplifier:
 * Reduces coordinate precision to 5 decimal places (~1.1m precision)
 * and simplifies polygon vertices using Douglas-Peucker algorithm on-the-fly.
 */
export function simplifyGeoJSONClient(geojson, tolerance = 0.00004, precision = 5) {
    if (!geojson || !geojson.features || geojson._simplifiedInBrowser) return geojson;

    console.log('[SpatialCache] Running in-browser intermediate simplification step...');
    const t0 = performance.now();
    const factor = Math.pow(10, precision);

    function roundCoord(c) {
        if (typeof c[0] === 'number') {
            return [
                Math.round(c[0] * factor) / factor,
                Math.round(c[1] * factor) / factor
            ];
        }
        return c.map(roundCoord);
    }

    function getSqSegDist(p, p1, p2) {
        let x = p1[0], y = p1[1];
        let dx = p2[0] - x, dy = p2[1] - y;
        if (dx !== 0 || dy !== 0) {
            let t = ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy);
            if (t > 1) {
                x = p2[0]; y = p2[1];
            } else if (t > 0) {
                x += dx * t; y += dy * t;
            }
        }
        dx = p[0] - x; dy = p[1] - y;
        return dx * dx + dy * dy;
    }

    function simplifyRing(points, sqTol) {
        if (points.length <= 4) return points;

        function simplifyStep(pts, first, last, sqT, result) {
            let maxSqDist = sqT;
            let index = -1;

            for (let i = first + 1; i < last; i++) {
                let sqDist = getSqSegDist(pts[i], pts[first], pts[last]);
                if (sqDist > maxSqDist) {
                    index = i;
                    maxSqDist = sqDist;
                }
            }

            if (maxSqDist > sqT) {
                if (index - first > 1) simplifyStep(pts, first, index, sqT, result);
                result.push(pts[index]);
                if (last - index > 1) simplifyStep(pts, index, last, sqT, result);
            }
        }

        const result = [points[0]];
        simplifyStep(points, 0, points.length - 1, sqTol, result);
        result.push(points[points.length - 1]);
        return result;
    }

    function processCoords(coords) {
        if (!coords || !coords.length) return coords;
        if (typeof coords[0][0] === 'number') {
            const rounded = coords.map(roundCoord);
            return simplifyRing(rounded, tolerance * tolerance);
        }
        return coords.map(processCoords);
    }

    const simplifiedFeatures = geojson.features.map(f => {
        if (!f.geometry || !f.geometry.coordinates) return f;
        return {
            ...f,
            geometry: {
                ...f.geometry,
                coordinates: processCoords(f.geometry.coordinates)
            }
        };
    });

    const elapsed = (performance.now() - t0).toFixed(1);
    console.log(`[SpatialCache] In-browser simplification completed in ${elapsed}ms.`);

    return {
        ...geojson,
        features: simplifiedFeatures,
        _simplifiedInBrowser: true,
        _simplifiedTimestamp: Date.now()
    };
}
