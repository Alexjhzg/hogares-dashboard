import { state } from '../state.js';

/**
 * Updates global Chart.js defaults and existing chart instances for theme changes.
 */
export function updateChartsTheme(isDark) {
    if (typeof Chart === 'undefined') return;
    
    const textColor = isDark ? '#94a3b8' : '#475569';
    const gridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
    
    Chart.defaults.color = textColor;
    Chart.defaults.scale.grid.color = gridColor;

    if (typeof ChartDataLabels !== 'undefined') {
        Chart.register(ChartDataLabels);
    }

    Object.values(state.charts).forEach(c => {
        if (!c) return;
        const opts = c.options.plugins;
        if (!opts) return;

        if (opts.datalabels) {
            opts.datalabels.color = isDark ? '#e2e8f0' : '#1e293b';
        }
        
        if (typeof c.update === 'function') c.update('none');
    });
}

/**
 * Custom plugin to draw total count in the center of doughnut charts.
 */
export const centerTextPlugin = {
    id: 'centerText',
    afterDraw: (chart) => {
        const opts = chart.config.options.plugins.centerText;
        if (opts && opts.display !== false) {
            const { ctx, chartArea: { left, top, width, height } } = chart;
            ctx.save();
            const isDark = document.documentElement.classList.contains('dark');
            const color = isDark ? '#f1f5f9' : '#0f172a';
            
            ctx.font = 'bold 18px Outfit';
            ctx.fillStyle = color;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(opts.text || '', left + width / 2, top + height / 2);
            
            ctx.font = 'bold 9px Inter';
            ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
            ctx.fillText('TOTAL', left + width / 2, top + height / 2 + 18);
            ctx.restore();
        }
    }
};

// Register the center text plugin globally
if (typeof Chart !== 'undefined') {
    Chart.register(centerTextPlugin);
}

/**
 * Helper to clean up existing chart instances.
 */
export function destroyChart(id) {
    if (state.charts[id]) { 
        state.charts[id].destroy(); 
        delete state.charts[id]; 
    }
}

/**
 * Returns standardized base options for all charts.
 */
export function baseChartOpts() {
    const isDark = document.documentElement.classList.contains('dark');
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { 
                labels: { 
                    font: { size: 11, family: "'Inter', sans-serif", weight: 'bold' } 
                } 
            },
            tooltip: {
                backgroundColor: isDark ? '#1e293b' : '#ffffff',
                titleColor:      isDark ? '#f1f5f9' : '#0f172a',
                bodyColor:       isDark ? '#e2e8f0' : '#334155',
                borderColor:     isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                titleFont:       { weight: 'bold' },
                bodyFont:        { family: "'Inter', sans-serif" },
                borderWidth: 1,
            },
        },
        scales: {
            x: { ticks: { font: { size: 11, family: "'Inter', sans-serif", weight: '600' } }, grid: {} },
            y: { ticks: { font: { size: 11, family: "'Inter', sans-serif", weight: '600' } }, grid: {} },
        },
    };
}
