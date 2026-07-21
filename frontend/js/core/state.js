// ─── Application State ──────────────────────────────────────────────────────
// Single mutable state object shared across all modules.
// Import { state } and mutate its properties directly.

export const state = {
    // Data
    rawData: [],
    filtered: [],
    encMap: {},           // cedula → metrics object
    assetName: '',        // Name of the currently loaded KoboToolbox form
    planificacionData: null, // Raw planned housing catalog

    // Charts — keys match destroyChart() ids 
    charts: {},

    // Map (Leaflet)
    map: null,
    markerCluster: null,
    geoJSONLayer: null,
    geoJSONData: null,     // Raw GeoJSON object
    segmentBBoxes: [],    // Pre-calculated BBOXES [{bbox: {}, code: ''}]
    detailMiniMapObj: null,

    // Control Points (CONTROLES.geojson)
    controlsData: null,   // Raw GeoJSON for control points
    controlsIndex: null,  // Map<'CONTROL-SERIE-LINEA', {COD_SEG, COD_MANZA}> for O(1) lookup
    controlsLayer: null,  // Leaflet layer for control points overlay

    // Tables (Tabulator)
    detailTable: null,
    rankingTabulator: null,
    mm111Table: null,

    // UI state
    currentSort: 'eficiencia',
    currentPage: 1,
    quickFilterMode: 'all',
    filterINE: false,
    filterSEGEN: false,

    // Accessibility: last focused element before opening a modal
    lastFocused: null,
};
