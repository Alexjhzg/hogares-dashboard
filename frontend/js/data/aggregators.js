import { state } from '../core/index.js';
import { avg } from '../utils/index.js';

export function getPlannedViviendasForControls(controlsSet) {
    if (!state.planificacionData || !state.planificacionData.por_semana || !controlsSet || controlsSet.size === 0) return 0;
    const program = state.assetName && state.assetName.toUpperCase().includes('EHM') ? 'EHM' : 'ESCA';
    let total = 0;
    state.planificacionData.por_semana.forEach(item => {
        if (item.programa !== program) return;
        const c4 = String(item.control).slice(-4).padStart(4, '0');
        if (controlsSet.has(c4)) {
            total += item.n_viviendas || 0;
        }
    });
    return total;
}

export function rebuildEncMap() {
    state.encMap = {};
    
    // Pass 1: Local record aggregation
    state.rawData.forEach(r => {
        if (!r._meta) return;
        const mRec = r._meta;
        const { cedula, nombre, estado, durMin, totalPers, mun, condicion, semana, control, tipo_vivienda, alertas } = mRec;

        if (!state.encMap[cedula]) {
            state.encMap[cedula] = {
                cedula, nombre, encuestas: 0, completadas: 0, noEfectiva: 0,
                tipoA: 0, tipoB: 0, tipoC: 0, tipoE: 0, alertasCount: 0,
                duraciones: [], personas: 0, municipios: new Set(), condiciones: {},
                semanas: {}, controlesSet: new Set(),
            };
        }
        
        const m = state.encMap[cedula];
        m.encuestas++;
        if (estado === 'completada') {
            m.completadas++;
        } else {
            m.noEfectiva++;
        }

        if (tipo_vivienda === 'TIPO A') m.tipoA++;
        else if (tipo_vivienda === 'TIPO B') m.tipoB++;
        else if (tipo_vivienda === 'TIPO C') m.tipoC++;
        else if (tipo_vivienda === 'TIPO E') m.tipoE++;

        if (Array.isArray(alertas) && alertas.length > 0) m.alertasCount += alertas.length;
        if (control) m.controlesSet.add(String(control).slice(-4).padStart(4, '0'));

        if (durMin !== null) m.duraciones.push(durMin);
        m.personas += (totalPers || 0);
        m.municipios.add(mun);
        m.condiciones[condicion] = (m.condiciones[condicion] || 0) + 1;
        
        if (semana) {
            if (!m.semanas[semana]) m.semanas[semana] = new Set();
            if (control) m.semanas[semana].add(control);
        }
    });

    // Pass 2: Calculate averages and scores with official Planned Housing formula: Tipo A / (BasePlanif - (Tipo B + Tipo C))
    Object.values(state.encMap).forEach(m => {
        const vvPlanif   = getPlannedViviendasForControls(m.controlesSet);
        const basePlanif = vvPlanif > 0 ? vvPlanif : m.encuestas;
        const divisor    = basePlanif - (m.tipoB + m.tipoC);

        m.avgDur         = m.duraciones.length ? avg(m.duraciones) : 0;
        m.planificadas   = vvPlanif;
        m.noRespuesta    = m.tipoA;
        m.pctCompleta    = m.encuestas > 0 ? Math.round((m.completadas / m.encuestas) * 100) : 0;
        m.pctNoRespuesta = divisor > 0 ? Math.round((m.tipoA / divisor) * 100) : 0;
        m.score          = m.pctNoRespuesta;
        
        const semanasArr = Object.values(m.semanas || {});
        m.avgControlesSemana = semanasArr.length
            ? Math.round(semanasArr.reduce((s, set) => s + set.size, 0) / semanasArr.length)
            : 0;
        m.totalSemanas = semanasArr.length;
    });
}
