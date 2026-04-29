/**
 * ─── Charts (Refactorized Orchestrator) ──────────────────────────────────────
 * All Chart.js rendering. Re-exports functions from specialized sub-modules.
 */

// 1. Theme and Core Configuration
export { updateChartsTheme, destroyChart, baseChartOpts } from './theme.js';

// 2. Operational Metrics (Bars)
export { 
    renderChartEncuestador, 
    renderChartDuracion, 
    renderChartHorario,
    renderChartHoraTransmision
} from './operational.js';

// 3. Typology and Structural Distribution (Doughnuts)
export { 
    renderChartCondicion, 
    renderChartUso,
    renderChartClasificacion
} from './typology.js';

// 4. Temporal Analysis and Summaries (Lines, Histograms, Grouped Bars)
export { 
    renderChartPorDia, 
    renderChartHistograma, 
    renderChartResumenSemanal 
} from './timeline.js';

/**
 * Note: Chart.js and its plugins (DataLabels) are expected to be available globally 
 * via CDN in index.html. Initialization of custom plugins happens in charts/theme.js.
 */
