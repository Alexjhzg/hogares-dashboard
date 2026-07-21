import { state } from '../core/index.js';
import { $ } from '../utils/index.js';
import { COLORS, MAP_LABELS, USO_STYLES, RAZON_STYLES, SUBTIPO_STYLES } from '../core/index.js';
import { destroyChart } from './theme.js';

/**
 * ─── Color Resolvers (Unified) ──────────────────────────────────────────────
 * These functions ensure charts and badges use the same color palette.
 */
function getUsoColor(label) {
    const upper = String(label).toUpperCase();
    for (const key in USO_STYLES) {
        if (upper.includes(key)) return USO_STYLES[key].color;
    }
    return USO_STYLES.DEFAULT.color;
}

function getCondColor(label) {
    const upper = String(label).toUpperCase();
    if (RAZON_STYLES[upper]) return RAZON_STYLES[upper].color;
    for (const key in RAZON_STYLES) {
        if (upper.includes(key)) return RAZON_STYLES[key].color;
    }
    return RAZON_STYLES.DEFAULT.color;
}

function getSubtipoColor(label) {
    const style = SUBTIPO_STYLES[label] || SUBTIPO_STYLES['DEFAULT'];
    return style.color;
}

export function renderChartCondicion() {
    destroyChart('cond');
    const counts = {};
    state.filtered.forEach(r => {
        const subtipo = r._meta?.subtipo_vivienda || 'Otro (Especifique)';
        counts[subtipo] = (counts[subtipo] || 0) + 1;
    });
    // Sort by count descending
    const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const canvas = $('chartCondicion');
    if (!canvas) return;

    const total = entries.reduce((s, e) => s + e[1], 0);

    state.charts.cond = new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: entries.map(e => e[0]),
            datasets: [{ 
                data: entries.map(e => e[1]), 
                backgroundColor: entries.map(e => getSubtipoColor(e[0]) + 'bb'), 
                borderColor: '#1c2128',
                borderWidth: 2,
                hoverOffset: 15 
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#000000', boxWidth: 10, font: { size: 10, weight: 'bold' } }
                },
                datalabels: {
                    color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#000000',
                    font: { weight: 'bold', size: 11 },
                    formatter: (value) => value > 0 ? value : '',
                },
                centerText: { text: String(total) }
            }
        },
    });
}


export function renderChartUso() {
    destroyChart('uso');
    const counts = {};
    state.filtered.forEach(r => {
        const raw = r._meta.uso || 'N/A';
        const label = MAP_LABELS.uso[raw] || String(raw).replace(/_/g, ' ').toUpperCase();
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
            datasets: [{ 
                data: entries.map(e => e[1]), 
                backgroundColor: entries.map(e => getUsoColor(e[0]) + 'aa'), 
                borderColor: '#1c2128',
                borderWidth: 2,
                hoverOffset: 15 
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#000000', boxWidth: 10, font: { size: 10, weight: 'bold' } }
                },
                datalabels: {
                    color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#000000',
                    font: { weight: 'bold', size: 10 },
                    formatter: (value) => value > 0 ? value : '',
                },
                centerText: { text: String(total) }
            }
        },
    });
}

export function renderChartClasificacion() {
    if (!$('chartClasificacion')) return;
    destroyChart('clasif');

    const counts = {
        'TIPO A': 0,
        'TIPO B': 0,
        'TIPO C': 0,
        'TIPO E': 0
    };

    state.filtered.forEach(r => {
        const label = r._meta && r._meta.tipo_vivienda;
        if (counts.hasOwnProperty(label)) {
            counts[label]++;
        }
    });

    const entries = Object.entries(counts);
    const labels = entries.map(e => e[0]);
    const data = entries.map(e => e[1]);
    const colors = labels.map(l => getCondColor(l));
    const total = data.reduce((a, b) => a + b, 0);

    const canvas = $('chartClasificacion');
    state.charts.clasif = new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels,
            datasets: [{
                data,
                backgroundColor: colors.map(c => c + 'aa'),
                borderColor: '#1c2128',
                borderWidth: 2,
                hoverOffset: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { 
                        color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#000000', 
                        boxWidth: 10, 
                        font: { size: 10, weight: 'bold' } 
                    }
                },
                datalabels: {
                    color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#000000',
                    font: { weight: 'bold', size: 11 },
                    formatter: (value) => value > 0 ? value : '',
                },
                centerText: { text: String(total) }
            }
        }
    });
}
