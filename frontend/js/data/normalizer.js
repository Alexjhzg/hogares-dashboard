import { state } from '../state.js';

export function normalizeRecord(r) {
    const cedula = String(r['S0/cedula_encuestador'] || 'N/A').trim();
    const nombre = String(r['S0/s0_nombreapellido'] || 'Desconocido').trim();
    const start  = r['start'] || '';
    let end      = r['end'] || '';
    
    // Correct end time based on Kobo field inconsistency (ported from backend logic)
    const endForm = r['ubicacion_final/hora_fin'] || r['ubicacion_final/hora_f'] || r['hora_f'];
    if (endForm) {
        if (!endForm.includes('T') && start.includes('T')) {
            end = start.split('T')[0] + 'T' + endForm;
        } else {
            end = endForm;
        }
        r['end'] = end; 
    }
    
    const fecha = (r['today'] || r['_submission_time'] || '').slice(0, 10);
    const formType = (() => {
        const name = (state.assetName || '').toUpperCase();
        if (name.includes('EHM')) return 'EHM';
        return 'ESCA';
    })();

    // Hour for productivity chart
    let hora = null;
    if (start) { try { hora = new Date(start).getHours(); } catch (_) { } }

    // Basic mapping
    return {
        cedula,
        nombre,
        start,
        end,
        fecha,
        hora,
        formType,
        mun:    r['S1/mun'] || 'N/A',
        par:    r['S1/par'] || 'N/A',
        nodo:   r['S1/nodo'] || 'N/A',
        semana: r['group_sh53u78/semana'] || '',
        uso:    r['S1/Uso_de_la_Unidad_inmobiliaria'] || 'N/A',
        condicion: r['Condici_n_de_ocupaci_n/condicion_de_ocupacion'] || 'N/A',
        control: r['group_sh53u78/control'] || r['_uuid'] || '',
        lote:    r['group_sh53u78/lote'] || '',
        situacion_vivienda: r['Condici_n_de_ocupaci_n/situacion_vivienda'] || '',
        segmento: r['S1/segmento'] || r['S1/group_segmeto_sector/segmento'] || r['group_segmeto_sector/segmento'] || '',
        sector:   r['S1/sector']   || r['S1/group_segmeto_sector/sector']   || r['group_segmeto_sector/sector']   || '',
        manzana:  r['S1/manzana']  || '',
        parcela:  r['S1/parcela']  || '',
        edificacion: r['S1/Edificaci_n'] || r['S1/edificacion'] || '',
        lado_manz:  r['S1/lado_manz'] || '',
        n_linea:    r['group_sh53u78/n_linea'] || '',
        n_serie:    r['group_sh53u78/n_serie'] || '',
        direccion:  r['S1/P_nomsect'] || r['S1/direccion'] || '',
        nota:       r['ubicacion_final/nota'] || ''
    };
}

export function calculateDuration(start, end) {
    if (!start || !end) return null;
    try {
        const s = new Date(start), e = new Date(end);
        const durMin = Math.round((e - s) / 60000 * 10) / 10;
        return (durMin >= 0 && durMin <= 600) ? durMin : null;
    } catch (_) {
        return null;
    }
}
