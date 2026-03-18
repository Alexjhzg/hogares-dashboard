// ─── Charts ──────────────────────────────────────────────────────────────────
// All Chart.js rendering. Depends on the global `Chart` from CDN.

import { state } from './state.js';
import { COLORS } from './config.js';
import { avg, $ } from './helpers.js';

// ── Theme ─────────────────────────────────────────────────────────────────────

export function updateChartsTheme(isDark) {
    if (typeof Chart === 'undefined') return;
    const textColor = isDark ? '#94a3b8' : '#475569';
    const gridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
    Chart.defaults.color = textColor;
    Chart.defaults.scale.grid.color = gridColor;
    Object.values(state.charts).forEach(c => {
        if (c && typeof c.update === 'function') c.update('none');
    });
}

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
            legend: { labels: { font: { size: 11, family: "'Inter', sans-serif" } } },
            tooltip: {
                backgroundColor: isDark ? '#1e293b' : '#ffffff',
                titleColor:      isDark ? '#f1f5f9' : '#0f172a',
                bodyColor:       isDark ? '#e2e8f0' : '#334155',
                borderColor:     isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                borderWidth: 1,
            },
        },
        scales: {
            x: { ticks: { font: { size: 10, family: "'Inter', sans-serif" } }, grid: {} },
            y: { ticks: { font: { size: 10, family: "'Inter', sans-serif" } }, grid: {} },
        },
    };
}

// ── Individual renderers ──────────────────────────────────────────────────────

export function renderChartPorDia() {
    destroyChart('dia');
    const counts = {};
    state.filtered.forEach(r => { if (r._meta.fecha) counts[r._meta.fecha] = (counts[r._meta.fecha] || 0) + 1; });
    const sorted = Object.entries(counts).sort();
    state.charts.dia = new Chart($('chartPorDia'), {
        type: 'line',
        data: {
            labels: sorted.map(e => e[0]),
            datasets: [{ label: 'Encuestas', data: sorted.map(e => e[1]), borderColor: '#10B981', backgroundColor: '#10B98122', fill: true, tension: 0.3 }]
        },
        options: baseChartOpts(),
    });
}

export function renderChartEncuestador() {
    destroyChart('enc');
    const counts = {};
    state.filtered.forEach(r => { const n = r._meta.nombre.split(' ')[0]; counts[n] = (counts[n] || 0) + 1; });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 15);
    state.charts.enc = new Chart($('chartEncuestador'), {
        type: 'bar',
        data: {
            labels: sorted.map(e => e[0]),
            datasets: [{ label: 'Encuestas', data: sorted.map(e => e[1]), backgroundColor: '#3B82F666', borderColor: '#3B82F6', borderWidth: 1, borderRadius: 4 }]
        },
        options: baseChartOpts(),
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
    state.charts.dur = new Chart($('chartDuracion'), {
        type: 'bar',
        data: {
            labels: sorted.map(e => e[0]),
            datasets: [{ label: 'Minutos Promedio', data: sorted.map(e => Math.round(e[1])), backgroundColor: '#8B5CF666', borderColor: '#8B5CF6', borderWidth: 1, borderRadius: 4 }]
        },
        options: baseChartOpts(),
    });
}

export function renderChartHorario() {
    destroyChart('hor');
    const hoursCount = new Array(24).fill(0);
    state.filtered.forEach(r => { if (r._meta.hora !== null) hoursCount[r._meta.hora]++; });
    state.charts.hor = new Chart($('chartHorario'), {
        type: 'bar',
        data: {
            labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
            datasets: [{ label: 'Encuestas Capturadas', data: hoursCount, backgroundColor: '#10B98144', borderColor: '#10B981', borderWidth: 1, borderRadius: 4 }]
        },
        options: { ...baseChartOpts(), plugins: { ...baseChartOpts().plugins, legend: { display: false } } },
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
    state.charts.histo = new Chart($('chartHistograma'), {
        type: 'bar',
        data: { labels, datasets: [{ data: counts, backgroundColor: '#F59E0B66', borderColor: '#F59E0B', borderWidth: 1 }] },
        options: baseChartOpts(),
    });
}

export function renderChartCondicion() {
    destroyChart('cond');
    const counts = {};
    state.filtered.forEach(r => { const c = r._meta.condicion.replace(/_/g, ' '); counts[c] = (counts[c] || 0) + 1; });
    const entries = Object.entries(counts);
    state.charts.cond = new Chart($('chartCondicion'), {
        type: 'doughnut',
        data: {
            labels: entries.map(e => e[0]),
            datasets: [{ data: entries.map(e => e[1]), backgroundColor: COLORS.map(c => c + 'aa'), borderColor: '#1c2128' }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: '#8b949e', boxWidth: 10, font: { size: 9 } } } } },
    });
    try { const t = entries.reduce((s, e) => s + e[1], 0); if ($('condicionTotal')) $('condicionTotal').textContent = `Total: ${t}`; } catch (_) {}
}

export function renderChartUso() {
    destroyChart('uso');
    const counts = {};
    state.filtered.forEach(r => { const u = (r._meta.uso || 'N/A').replace(/_/g, ' ').toUpperCase(); counts[u] = (counts[u] || 0) + 1; });
    const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    state.charts.uso = new Chart($('chartUso'), {
        type: 'doughnut',
        data: {
            labels: entries.map(e => e[0]),
            datasets: [{ data: entries.map(e => e[1]), backgroundColor: COLORS.map(c => c + 'aa'), borderColor: '#1c2128' }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: '#8b949e', boxWidth: 8, font: { size: 8 } } } } },
    });
    try { const t = entries.reduce((s, e) => s + e[1], 0); if ($('usoTotal')) $('usoTotal').textContent = `Total: ${t}`; } catch (_) {}
}
