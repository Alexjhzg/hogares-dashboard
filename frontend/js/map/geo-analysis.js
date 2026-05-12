/**
 * ─── GeoAnalysis (Turf.js Wrapper) ───────────────────────────────────────────
 * Advanced geospatial operations for frontend validation and visualization.
 */

import * as turf from '@turf/turf';

export const GeoAnalysis = {
    
    /**
     * Finds which polygon in a FeatureCollection contains the given point.
     * @param {number} lat 
     * @param {number} lng 
     * @param {Object} geoJSON - FeatureCollection of polygons
     * @returns {Object|null} Properties of the containing feature
     */
    findContainingFeature(lat, lng, geoJSON) {
        if (!lat || !lng || !geoJSON || !geoJSON.features) return null;
        const pt = turf.point([lng, lat]);
        
        for (const feature of geoJSON.features) {
            if (feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon') {
                if (turf.booleanPointInPolygon(pt, feature)) {
                    return feature.properties;
                }
            }
        }
        return null;
    },

    /**
     * Calculates distance in meters between two points.
     */
    getDistance(lat1, lng1, lat2, lng2) {
        const from = turf.point([lng1, lat1]);
        const to = turf.point([lng2, lat2]);
        return turf.distance(from, to, { units: 'meters' });
    },

    /**
     * Creates a convex hull for a set of points (e.g. an agent's daily route).
     */
    createConvexHull(points) {
        if (!points || points.length < 3) return null;
        const turfPoints = turf.featureCollection(points.map(p => turf.point([p.lng, p.lat])));
        return turf.convex(turfPoints);
    },

    /**
     * Simplifies a polyline geometry to improve rendering performance.
     */
    simplifyPath(latlngs, tolerance = 0.0001) {
        if (!latlngs || latlngs.length < 3) return latlngs;
        const line = turf.lineString(latlngs.map(ll => [ll[1], ll[0]]));
        const simplified = turf.simplify(line, { tolerance, highQuality: true });
        return simplified.geometry.coordinates.map(c => [c[1], c[0]]);
    },

    /**
     * Calculates the area of a polygon in square kilometers.
     */
    getAreaKm2(feature) {
        if (!feature) return 0;
        const areaM2 = turf.area(feature);
        return areaM2 / 1_000_000; // Convert to km2
    }
};
