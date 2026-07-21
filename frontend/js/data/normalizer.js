import { state, ENCUESTADOR_NAMES, getMunicipioLabel } from '../core/index.js';

/**
 * Extrae el primer valor no nulo de un registro, priorizando _backend_meta.
 */
function pick(r, metaKey, rawKeys = [], defaultVal = '') {
    if (metaKey && r._backend_meta && r._backend_meta[metaKey] != null && r._backend_meta[metaKey] !== '') {
        return r._backend_meta[metaKey];
    }
    for (const key of rawKeys) {
        if (r[key] != null && String(r[key]).trim() !== '') {
            return r[key];
        }
    }
    return defaultVal;
}

/**
 * Extrae la hora (0-23) de un string ISO sin instanciar objetos Date.
 */
function extractHourFast(isoStr) {
    if (!isoStr || typeof isoStr !== 'string') return null;
    const match = isoStr.match(/T(\d{2}):/);
    return match ? parseInt(match[1], 10) : null;
}

/**
 * Extrae la precisión GPS del string geopoint de Kobo.
 */
function extractPrecisionFast(geoStr) {
    if (!geoStr || typeof geoStr !== 'string') return null;
    const parts = geoStr.trim().split(' ');
    return parts.length >= 4 ? parseFloat(parts[3]) : null;
}

export function normalizeRecord(r) {
    // 1. Cédula y Nombre del Encuestador
    const cedula = String(pick(r, 'cedula_encuestador', [
        'S0/cedula_encuestador', 'v4_encuestador_cedula', 'cedula_encuestador'
    ], 'N/A')).trim();

    const rawNombre = pick(r, 'nombre_encuestador', [
        'S0/s0_nombreapellido', 'S0/_xm_s0_nombreapellido', '_xm_cod_nom_y_ape',
        'v4_encuestador_nombre', 'nombre_encuestador'
    ]);

    const nombre = (rawNombre && String(rawNombre).trim() && String(rawNombre).trim().toLowerCase() !== 'desconocido')
        ? String(rawNombre).trim()
        : (ENCUESTADOR_NAMES[cedula] || (cedula !== 'N/A' ? `Encuestador ${cedula}` : 'Desconocido'));

    // 2. Fechas y Tiempos
    const start = r['start'] || '';
    let end = r['end'] || '';
    const endForm = pick(r, '', ['ubicacion_final/hora_fin', 'ubicacion_final/hora_f', 'hora_f']);
    
    if (endForm) {
        end = (!endForm.includes('T') && start.includes('T')) ? `${start.split('T')[0]}T${endForm}` : endForm;
        r['end'] = end;
    }

    const fecha = (r['today'] || r['_submission_time'] || '').slice(0, 10);
    const formType = (state.assetName || '').toUpperCase().includes('EHM') ? 'EHM' : 'ESCA';

    // 3. Extracción de Número de Control y Línea (con fallback a instanceName)
    let control = pick(r, 'control', ['group_sh53u78/control', 'datos_mm111/control']);
    let nLinea  = pick(r, 'n_linea', ['group_sh53u78/n_linea', 'datos_mm111/n_linea']);

    if (!control && r['meta/instanceName']) {
        const parts = String(r['meta/instanceName']).split('-');
        if (parts.length >= 4 && /^\d+$/.test(parts[1])) control = parts[1];
        if (parts.length >= 4 && /^\d+$/.test(parts[2]) && !nLinea) nLinea = parts[2];
    }
    if (!control) control = r['_uuid'] || '';

    // 4. Mapeo Canónico del Registro
    return {
        cedula,
        nombre,
        start,
        end,
        fecha,
        hora: extractHourFast(start),
        hora_trans: extractHourFast(r['_submission_time']),
        formType,
        start_precision: extractPrecisionFast(r['start-geopoint'] || r['start_geopoint']),
        end_precision:   extractPrecisionFast(r['group_sh53u78/ubicacion_i'] || r['end-geopoint']),
        
        ent:    pick(r, 'entidad', ['S1/ent', 'datos_mm111/ent']),
        mun:    getMunicipioLabel(pick(r, 'municipio', ['S1/mun', 'S1/S2/mun'])),
        par:    pick(r, 'parroquia', ['S1/par', 'S1/S2/par']),
        nodo:   pick(r, 'nodo', ['S1/nodo', 'S1/S2/nodo']),
        semana: pick(r, 'semana_raw', ['group_sh53u78/semana', 'datos_mm111/semana']),
        
        uso:    r['S1/Uso_de_la_Unidad_inmobiliaria'] || 'N/A',
        condicion: r['Condici_n_de_ocupaci_n/condicion_de_ocupacion'] || 'N/A',
        control,
        lote:   r['group_sh53u78/lote'] || '',
        
        situacion_vivienda: (r['Condici_n_de_ocupaci_n/condicion_de_ocupacion'] === 'ocupadas_con_ocupantes_ausentes' && r['Condici_n_de_ocupaci_n/situacion_vivienda'] === 'otro_ausentes')
            ? 'otro_ausentes'
            : (r['Condici_n_de_ocupaci_n/vivienda_ocupada01'] || r['Condici_n_de_ocupaci_n/situacion_vivienda'] || ''),
            
        segmento: pick(r, 'segmento', ['S1/segmento', 'S1/group_segmeto_sector/segmento', 'group_segmeto_sector/segmento']),
        sector:   pick(r, 'sector', ['S1/sector', 'S1/group_segmeto_sector/sector', 'group_segmeto_sector/sector']),
        manzana:  pick(r, 'manzana', ['S1/manzana', 'S1/S3/manzana']),
        parcela:  pick(r, 'parcela', ['S1/parcela', 'S1/S3/parcela']),
        edificacion: pick(r, 'edificacion', ['S1/Edificaci_n', 'S1/edificacion', 'S1/S3/edificacion']),
        lado_manz: pick(r, 'lado_manz', ['S1/lado_manz', 'S1/S3/lado_manz']),
        n_linea:  nLinea,
        n_serie:  pick(r, 'n_serie', ['group_sh53u78/n_serie']),
        direccion: pick(r, 'nombre_sector', ['S1/P_nomsect', 'S1/S3/sector_1', 'S1/S3/GP10_0b', 'S1/direccion']),
        
        nota:       r['ubicacion_final/nota'] || '',
        residente: pick(r, '', ['control_entrevista/nombre_informante', 'control_de_la_entrevista/nombre_informante'], '-'),
        observaciones: r['ubicacion_final/observaciones'] || '-',
        fecha_entrevista: r['ubicacion_final/fecha_entrevista_1'] || fecha,
        descripcion: pick(r, '', ['control_de_la_entrevista/in11', 'control_entrevista/in11'], '-'),
        nroCasa: pick(r, '', ['control_de_la_entrevista/in10', 'control_entrevista/in10'], '-')
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
