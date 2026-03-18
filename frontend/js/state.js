// ─── Application State ──────────────────────────────────────────────────────
// Single mutable state object shared across all modules.
// Import { state } and mutate its properties directly.

export const state = {
    // Data
    rawData: [],
    filtered: [],
    encMap: {},           // cedula → metrics object

    // Charts — keys match destroyChart() ids 
    charts: {},

    // Map (Leaflet)
    map: null,
    markerCluster: null,
    geoJSONLayer: null,
    geoJSONData: null,     // Raw GeoJSON object
    segmentBBoxes: [],    // Pre-calculated BBOXES [{bbox: {}, code: ''}]
    detailMiniMapObj: null,
    locMap: null,
    locMarker: null,

    // Tables (Tabulator)
    detailTable: null,
    rankingTabulator: null,
    mm111Table: null,

    // UI state
    currentSort: 'encuestas',
    currentPage: 1,
    quickFilterMode: 'all',

    // Accessibility: last focused element before opening a modal
    lastFocused: null,
};
