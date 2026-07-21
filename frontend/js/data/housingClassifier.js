/**
 * ─── Housing State Classifier (Official Kobo Form Mapping) ────────────────────
 * Evaluates 2 levels of Kobo fields:
 *  1. Condición de Ocupación (ocupada_con_ocupantes_presentes, ocupadas_con_ocupantes_ausentes, desocupada)
 *  2. Situación de la Vivienda (subtipos específicos de campo)
 */

function normalizeText(text) {
    if (!text) return "";
    return String(text)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]/g, "")
        .trim();
}

/**
 * Classifies a record into one of the canonical subtipos.
 */
export function classifyHousingSubtype(situacion, condicion) {
    const sit = normalizeText(situacion || '');
    const cond = normalizeText(condicion || '');

    // 1. TOTALMENTE ENCUESTADA (TIPO E)
    if (cond === 'ocupadaconocupantespresentes' || sit === 'ocupadaconocupantespresentes' || sit.includes('totalmenteencuestad')) {
        return 'Totalmente Encuestado';
    }

    // 2. TIPO A (VIVIENDA OCUPADA CON AUSENCIAS / RECHAZO)
    if (cond === 'ocupadasconocupantesausentes' || sit === 'nadieenvivienda' || sit === 'ausentetemporalmente' || sit === 'rehusoentrevista' || sit === 'otroausentes') {
        if (sit === 'nadieenvivienda' || sit.includes('nadieenvivienda')) return 'Ocupantes Ausentes';
        if (sit === 'ausentetemporalmente' || sit.includes('ausentetemporalmente')) return 'Ausente Temporalmente';
        if (sit === 'rehusoentrevista' || sit.includes('rehuso') || sit.includes('rechaz')) return 'Rechazada';
        return 'Ocupantes Ausentes';
    }

    // 3 & 4. VIVIENDA DESOCUPADA (TIPO B o TIPO C)
    if (cond === 'desocupada' || sit) {
        // TIPO B (Habitables / Ocasionales / Construcción)
        if (sit === 'desocupadaestadoregular' || sit.includes('desocupadaestadoregular')) return 'Vivienda Desocupada';
        if (sit === 'inadecuadaeluso' || sit.includes('inadecuadaeluso') || sit.includes('inadecuadaparaeluso')) return 'Inadecuada para Uso';
        if (sit === 'construyendose' || sit.includes('construyendose') || sit.includes('construc')) return 'Construccion';
        if (sit === 'temporalmenteennegocio' || sit.includes('temporalmenteennegocio')) return 'Temporalmente en Negocio';
        if (sit === 'usovacacional' || sit === 'usovacasional' || sit.includes('usovacacional') || sit.includes('usoocacional')) return 'Uso Vacasional';

        // TIPO C (No Residenciales / Demolidas / Consolidada / Otro)
        if (sit === 'demolida' || sit.includes('demolid')) return 'Demolida';
        if (sit === 'negocioalmacenpermanente' || sit.includes('negocioalmacen') || sit.includes('negociopermanente') || sit.includes('ferreteria') || sit.includes('autolavado') || sit.includes('comercio') || sit.includes('taller')) return 'Negocio Permanente';
        if (sit === 'consolidada' || sit.includes('consolidada')) return 'Consolidada';
        if (sit === 'otrodesocupada' || sit === 'otro' || sit.includes('otro')) return 'Otro (Especifique)';
    }

    return 'Otro (Especifique)';
}

/** Mapeo Canónico a Tipo Superior según especificación del usuario */
const SUBTIPO_TO_TIPO = {
    // 1. TOTALMENTE ENCUESTADA
    'Totalmente Encuestado':    'TIPO E',
    
    // 2. TIPO A (VIVIENDA OCUPADA)
    'Ocupantes Ausentes':       'TIPO A',
    'Ausente Temporalmente':    'TIPO A',
    'Rechazada':                'TIPO A',
    'Informante No Calificado': 'TIPO A',
    'Incompleta':               'TIPO A',
    'Pendiente':                'TIPO A',
    'No Atiende Telefono':      'TIPO A',
    'Sin Entrevista':           'TIPO A',

    // 3. TIPO B (VIVIENDA DESOCUPADA HABITABLE / USO OCASIONAL / CONSTRUCCION)
    'Vivienda Desocupada':      'TIPO B',
    'Inadecuada para Uso':      'TIPO B',
    'Construccion':             'TIPO B',
    'Temporalmente en Negocio': 'TIPO B',
    'Uso Vacasional':           'TIPO B',
    'Vivienda Ocasional':       'TIPO B',

    // 4. TIPO C (VIVIENDA DESOCUPADA NO RESIDENCIAL / DEMOLIDA / OTRO)
    'Demolida':                 'TIPO C',
    'Negocio Permanente':       'TIPO C',
    'Consolidada':              'TIPO C',
    'Otro (Especifique)':       'TIPO C',
    'Mal Listada':              'TIPO C',
    'No Existe':                'TIPO C',
    'Sin Listar':               'TIPO C',
    'Otra Condicion':           'TIPO C',
    'Otra Situacion':           'TIPO C',
    'No Existe Nro Telefonico': 'TIPO C',
};

/**
 * Classifies a raw housing state string into TIPO A/B/C/E.
 */
export function classifyHousingState(state) {
    const subtype = classifyHousingSubtype(state, state);
    const tipo = SUBTIPO_TO_TIPO[subtype];
    if (tipo) return tipo;
    return "NO DEFINIDO";
}
