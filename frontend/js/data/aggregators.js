import { state } from '../core/index.js';
import { avg } from '../utils/index.js';

export function rebuildEncMap() {
    state.encMap = {};
    
    // Pass 1: Local record aggregation
    state.rawData.forEach(r => {
        if (!r._meta) return;
        const mRec = r._meta;
        const { cedula, nombre, estado, durMin, totalPers, mun, condicion, semana, control } = mRec;

        if (!state.encMap[cedula]) {
            state.encMap[cedula] = {
                cedula, nombre, encuestas: 0, completadas: 0,
                duraciones: [], personas: 0, municipios: new Set(), condiciones: {},
                semanas: {},
            };
        }
        
        const m = state.encMap[cedula];
        m.encuestas++;
        if (estado === 'completada') m.completadas++;
        if (durMin !== null) m.duraciones.push(durMin);
        m.personas += (totalPers || 0);
        m.municipios.add(mun);
        m.condiciones[condicion] = (m.condiciones[condicion] || 0) + 1;
        
        if (semana) {
            if (!m.semanas[semana]) m.semanas[semana] = new Set();
            if (control) m.semanas[semana].add(control);
        }
    });

    // Pass 2: Calculate averages and scores
    Object.values(state.encMap).forEach(m => {
        m.avgDur      = m.duraciones.length ? avg(m.duraciones) : 0;
        m.pctCompleta = m.encuestas > 0 ? Math.round(m.completadas / m.encuestas * 100) : 0;
        m.score       = m.pctCompleta; // Score logic: currently just effectiveness %
        
        const semanasArr = Object.values(m.semanas || {});
        m.avgControlesSemana = semanasArr.length
            ? Math.round(semanasArr.reduce((s, set) => s + set.size, 0) / semanasArr.length)
            : 0;
        m.totalSemanas = semanasArr.length;
    });
}
