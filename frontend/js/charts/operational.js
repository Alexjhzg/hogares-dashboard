import { state } from '../core/index.js';
import { $, avg } from '../utils/index.js';
import { destroyChart, baseChartOpts } from './theme.js';

export function renderChartEncuestador() {
    destroyChart('enc');
    const counts = {};
    state.filtered.forEach(r => { 
        const n = String(r._meta.nombre || 'Desconocido').split(' ')[0]; 
        counts[n] = (counts[n] || 0) + 1; 
    });
    
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 15);
    const canvas = $('chartEncuestador');
    if (!canvas) return;

    state.charts.enc = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: sorted.map(e => e[0]),
            datasets: [{ 
                label: 'Encuestas', 
                data: sorted.map(e => e[1]), 
                backgroundColor: '#3B82F666', 
                borderColor: '#3B82F6', 
                borderWidth: 1, 
                borderRadius: 4 
            }]
        },
        options: {
            ...baseChartOpts(),
            plugins: {
                ...baseChartOpts().plugins,
                datalabels: {
                    align: 'top',
                    anchor: 'end',
                    font: { weight: 'bold', size: 10 },
                    color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#000000',
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
        const n = String(r._meta.nombre || 'Desconocido').split(' ')[0];
        if (r._meta.durMin !== null) { 
            if (!durPerEnc[n]) durPerEnc[n] = []; 
            durPerEnc[n].push(r._meta.durMin); 
        }
    });
    
    const sorted = Object.entries(durPerEnc).map(([k, v]) => [k, avg(v)]).sort((a, b) => b[1] - a[1]).slice(0, 15);
    const canvas = $('chartDuracion');
    if (!canvas) return;

    state.charts.dur = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: sorted.map(e => e[0]),
            datasets: [{ 
                label: 'Minutos Promedio', 
                data: sorted.map(e => Math.round(e[1])), 
                backgroundColor: '#8B5CF666', 
                borderColor: '#8B5CF6', 
                borderWidth: 1, 
                borderRadius: 4 
            }]
        },
        options: {
            ...baseChartOpts(),
            plugins: {
                ...baseChartOpts().plugins,
                datalabels: {
                    align: 'top',
                    anchor: 'end',
                    font: { weight: 'bold', size: 10 },
                    color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#000000',
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
            datasets: [{ 
                label: 'Encuestas Capturadas', 
                data: hoursCount, 
                backgroundColor: '#10B98144', 
                borderColor: '#10B981', 
                borderWidth: 1, 
                borderRadius: 4 
            }]
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
                    color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#000000',
                    formatter: (v) => v > 0 ? v : '' 
                }
            }
        },
    });
}

export function renderChartHoraTransmision() {
    destroyChart('htrans');
    const hoursCountMap = {};
    state.filtered.forEach(r => { 
        if (r._meta.hora_trans !== null && r._meta.hora_trans !== undefined) {
            hoursCountMap[r._meta.hora_trans] = (hoursCountMap[r._meta.hora_trans] || 0) + 1;
        }
    });

    const sortedHours = Object.keys(hoursCountMap).map(Number).sort((a, b) => a - b);
    const labels = sortedHours.map(h => `${h}:00`);
    const hoursCount = sortedHours.map(h => hoursCountMap[h]);

    const canvas = $('chartHoraTransmision');
    if (!canvas) return;

    state.charts.htrans = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{ 
                label: 'Encuestas Transmitidas', 
                data: hoursCount, 
                backgroundColor: '#F9731644', 
                borderColor: '#F97316', 
                borderWidth: 1, 
                borderRadius: 4 
            }]
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
                    color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#000000',
                    formatter: (v) => v > 0 ? v : '' 
                }
            }
        },
    });
}
