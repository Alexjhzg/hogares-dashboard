import { state } from '../state.js';
import { $ } from '../helpers.js';
import { COLORS } from '../config.js';
import { destroyChart, baseChartOpts } from './theme.js';

export function renderChartPorDia() {
    destroyChart('dia');
    const counts = {};
    state.filtered.forEach(r => { 
        if (r._meta.fecha) counts[r._meta.fecha] = (counts[r._meta.fecha] || 0) + 1; 
    });
    const sorted = Object.entries(counts).sort();
    const canvas = $('chartPorDia');
    if (!canvas) return;
    
    state.charts.dia = new Chart(canvas, {
        type: 'line',
        data: {
            labels: sorted.map(e => e[0]),
            datasets: [{ 
                label: 'Encuestas', 
                data: sorted.map(e => e[1]), 
                borderColor: '#10B981', 
                backgroundColor: '#10B98122', 
                fill: true, 
                tension: 0.3 
            }]
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
                    color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#000000',
                    formatter: (v) => v > 0 ? v : ''
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
        for (let i = 0; i < bins.length - 1; i++) { 
            if (d < bins[i + 1]) { counts[i]++; break; } 
        }
    });
    const canvas = $('chartHistograma');
    if (!canvas) return;

    state.charts.histo = new Chart(canvas, {
        type: 'bar',
        data: { 
            labels, 
            datasets: [{ 
                data: counts, 
                backgroundColor: '#F59E0B66', 
                borderColor: '#F59E0B', 
                borderWidth: 1 
            }] 
        },
        options: baseChartOpts(),
    });
}

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
        label: String(enc.nombre || 'N/A').split(' ')[0],
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
