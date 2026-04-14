// ─── Charts ──────────────────────────────────────────────────────────────────
// All Chart.js rendering. Depends on the global `Chart` from CDN.

import { state } from './state.js?v=39';
import { COLORS, MAP_LABELS } from './config.js?v=39';
import { avg, $ } from './helpers.js?v=39';

// ── Theme ─────────────────────────────────────────────────────────────────────

export function updateChartsTheme(isDark) {
    if (typeof Chart === 'undefined') return;
    const textColor = isDark ? '#94a3b8' : '#475569';
    const gridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
    Chart.defaults.color = textColor;
    Chart.defaults.scale.grid.color = gridColor;

    // Register Plugins
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
        
        // Also update center text if it exists (doughnuts)
        if (opts.centerText) {
            // No need to manually update color here if the plugin logic already uses isDark
        }

        if (typeof c.update === 'function') c.update('none');
    });
}

// ── Custom Plugins ────────────────────────────────────────────────────────────

const centerTextPlugin = {
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
Chart.register(centerTextPlugin);

// ── Helpers ───────────────────────────────────────────────────────────────────

export function destroyChart(id) {
    if (state.charts[id]) { state.charts[id].destroy(); delete state.charts[id]; }
}

export function baseChartOpts() {
    const isDark = document.documentElement.classList.contains('dark');
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { labels: { font: { size: 11, family: "'Inter', sans-serif", weight: 'bold' } } },
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

// ── Individual renderers ──────────────────────────────────────────────────────

export function renderChartPorDia() {
    destroyChart('dia');
    const counts = {};
    state.filtered.forEach(r => { if (r._meta.fecha) counts[r._meta.fecha] = (counts[r._meta.fecha] || 0) + 1; });
    const sorted = Object.entries(counts).sort();
    const canvas = $('chartPorDia');
    if (!canvas) return;
    
    state.charts.dia = new Chart(canvas, {
        type: 'line',
        data: {
            labels: sorted.map(e => e[0]),
            datasets: [{ label: 'Encuestas', data: sorted.map(e => e[1]), borderColor: '#10B981', backgroundColor: '#10B98122', fill: true, tension: 0.3 }]
        },
        options: {
            ...baseChartOpts(),
            plugins: {
                ...baseChartOpts().plugins,
                datalabels: {
                    align: 'top',
                    anchor: 'end',
                    offset: 2,
                    font: { weight: 'bold', size: 10 },
                    color: document.documentElement.classList.contains('dark') ? '#94a3b8' : '#475569',
                    formatter: (v) => v > 0 ? v : ''
                }
            }
        },
    });
}

export function renderChartEncuestador() {
    destroyChart('enc');
    const counts = {};
    state.filtered.forEach(r => { const n = r._meta.nombre.split(' ')[0]; counts[n] = (counts[n] || 0) + 1; });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 15);
    const canvas = $('chartEncuestador');
    if (!canvas) return;

    state.charts.enc = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: sorted.map(e => e[0]),
            datasets: [{ label: 'Encuestas', data: sorted.map(e => e[1]), backgroundColor: '#3B82F666', borderColor: '#3B82F6', borderWidth: 1, borderRadius: 4 }]
        },
        options: {
            ...baseChartOpts(),
            plugins: {
                ...baseChartOpts().plugins,
                datalabels: {
                    align: 'top',
                    anchor: 'end',
                    font: { weight: 'bold', size: 10 },
                    color: document.documentElement.classList.contains('dark') ? '#f1f5f9' : '#1e293b',
                    formatter: (v) => v > 0 ? v : ''
                }
            }
        },
    });
}

export function renderChartDuracion() {
    destroyChart('dur');
    const durPerEnc = {};
    state.filtered.forEach(r => {
        const n = r._meta.nombre.split(' ')[0];
        if (r._meta.durMin !== null) { if (!durPerEnc[n]) durPerEnc[n] = []; durPerEnc[n].push(r._meta.durMin); }
    });
    const sorted = Object.entries(durPerEnc).map(([k, v]) => [k, avg(v)]).sort((a, b) => b[1] - a[1]).slice(0, 15);
    const canvas = $('chartDuracion');
    if (!canvas) return;

    state.charts.dur = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: sorted.map(e => e[0]),
            datasets: [{ label: 'Minutos Promedio', data: sorted.map(e => Math.round(e[1])), backgroundColor: '#8B5CF666', borderColor: '#8B5CF6', borderWidth: 1, borderRadius: 4 }]
        },
        options: {
            ...baseChartOpts(),
            plugins: {
                ...baseChartOpts().plugins,
                datalabels: {
                    align: 'top',
                    anchor: 'end',
                    font: { weight: 'bold', size: 10 },
                    color: document.documentElement.classList.contains('dark') ? '#f1f5f9' : '#1e293b',
                    formatter: (v) => v > 0 ? v : ''
                }
            }
        },
    });
}

export function renderChartHorario() {
    destroyChart('hor');
    const hoursCountMap = {};
    state.filtered.forEach(r => { 
        if (r._meta.hora !== null) {
            hoursCountMap[r._meta.hora] = (hoursCountMap[r._meta.hora] || 0) + 1;
        }
    });

    const sortedHours = Object.keys(hoursCountMap).map(Number).sort((a, b) => a - b);
    const labels = sortedHours.map(h => `${h}:00`);
    const hoursCount = sortedHours.map(h => hoursCountMap[h]);

    const canvas = $('chartHorario');
    if (!canvas) return;

    state.charts.hor = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{ label: 'Encuestas Capturadas', data: hoursCount, backgroundColor: '#10B98144', borderColor: '#10B981', borderWidth: 1, borderRadius: 4 }]
        },
        options: {
            ...baseChartOpts(),
            plugins: {
                ...baseChartOpts().plugins,
                legend: { display: false },
                datalabels: {
                    align: 'top',
                    anchor: 'end',
                    font: { weight: 'bold', size: 9 },
                    color: document.documentElement.classList.contains('dark') ? '#94a3b8' : '#475569',
                    formatter: (v) => v > 5 ? v : '' // Only show if > 5 to avoid overlap
                }
            }
        },
    });
}

export function renderChartHistograma() {
    destroyChart('histo');
    const bins = [0, 20, 40, 60, 90, 120, 999];
    const labels = ['<20', '20-40', '40-60', '60-90', '90-120', '>120'];
    const counts = new Array(labels.length).fill(0);
    state.filtered.forEach(r => {
        const d = r._meta.durMin;
        if (d === null) return;
        for (let i = 0; i < bins.length - 1; i++) { if (d < bins[i + 1]) { counts[i]++; break; } }
    });
    const canvas = $('chartHistograma');
    if (!canvas) return;

    state.charts.histo = new Chart(canvas, {
        type: 'bar',
        data: { labels, datasets: [{ data: counts, backgroundColor: '#F59E0B66', borderColor: '#F59E0B', borderWidth: 1 }] },
        options: baseChartOpts(),
    });
}

export function renderChartCondicion() {
    destroyChart('cond');
    const counts = {};
    state.filtered.forEach(r => {
        const raw = r._meta.condicion;
        const label = MAP_LABELS.condicion[raw] || raw.replace(/_/g, ' ');
        counts[label] = (counts[label] || 0) + 1;
    });
    const entries = Object.entries(counts);
    const canvas = $('chartCondicion');
    if (!canvas) return;

    const total = entries.reduce((s, e) => s + e[1], 0);

    state.charts.cond = new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: entries.map(e => e[0]),
            datasets: [{ data: entries.map(e => e[1]), backgroundColor: COLORS.map(c => c + 'aa'), borderColor: '#1c2128' }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#8b949e', boxWidth: 10, font: { size: 10, weight: 'bold' } }
                },
                datalabels: {
                    color: document.documentElement.classList.contains('dark') ? '#e2e8f0' : '#1e293b',
                    font: { weight: 'bold', size: 11 },
                    formatter: (value) => value > 0 ? value : '',
                },
                centerText: { text: String(total) }
            }
        },
    });
    try { if ($('condicionTotal')) $('condicionTotal').style.display = 'none'; } catch (_) {}
}

export function renderChartUso() {
    destroyChart('uso');
    const counts = {};
    state.filtered.forEach(r => {
        const raw = r._meta.uso || 'N/A';
        const label = MAP_LABELS.uso[raw] || raw.replace(/_/g, ' ').toUpperCase();
        counts[label] = (counts[label] || 0) + 1;
    });
    const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const canvas = $('chartUso');
    if (!canvas) return;

    const total = entries.reduce((s, e) => s + e[1], 0);

    state.charts.uso = new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: entries.map(e => e[0]),
            datasets: [{ data: entries.map(e => e[1]), backgroundColor: COLORS.map(c => c + 'aa'), borderColor: '#1c2128' }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#8b949e', boxWidth: 10, font: { size: 10, weight: 'bold' } }
                },
                datalabels: {
                    color: document.documentElement.classList.contains('dark') ? '#e2e8f0' : '#1e293b',
                    font: { weight: 'bold', size: 10 },
                    formatter: (value) => value > 0 ? value : '',
                },
                centerText: { text: String(total) }
            }
        },
    });
    try { if ($('usoTotal')) $('usoTotal').style.display = 'none'; } catch (_) {}
}

/**
 * Gráfico de barras agrupadas: controles únicos por semana, agrupados por encuestador.
 * Renderiza en el canvas #chartResumenSemanal.
 */
export function renderChartResumenSemanal() {
    destroyChart('semana');
    const canvas = $('chartResumenSemanal');
    if (!canvas) return;

    const semanasSet = new Set();
    state.filtered.forEach(r => { if (r._meta.semana) semanasSet.add(r._meta.semana); });
    const semanas = [...semanasSet].sort();
    if (semanas.length === 0) return;

    const encEnFiltrado = new Set(state.filtered.map(r => r._meta.cedula));
    const topEncs = Object.values(state.encMap)
        .filter(m => encEnFiltrado.has(m.cedula) && m.semanas)
        .sort((a, b) => {
            const tA = Object.values(a.semanas).reduce((s, set) => s + set.size, 0);
            const tB = Object.values(b.semanas).reduce((s, set) => s + set.size, 0);
            return tB - tA;
        })
        .slice(0, 10);

    const datasets = topEncs.map((enc, i) => ({
        label: enc.nombre.split(' ')[0],
        data: semanas.map(sem => enc.semanas[sem] ? enc.semanas[sem].size : 0),
        backgroundColor: COLORS[i % COLORS.length] + '99',
        borderColor:     COLORS[i % COLORS.length],
        borderWidth: 1,
        borderRadius: 3,
    }));

    state.charts.semana = new Chart(canvas, {
        type: 'bar',
        data: { labels: semanas, datasets },
        options: {
            ...baseChartOpts(),
            plugins: {
                ...baseChartOpts().plugins,
                legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 9 } } },
            },
            scales: {
                x: { ticks: { font: { size: 9 } } },
                y: {
                    beginAtZero: true,
                    ticks: { font: { size: 9 } },
                    title: { display: true, text: 'Controles únicos', font: { size: 9 } },
                },
            },
        },
    });
}
