// ─── Configuration ──────────────────────────────────────────────────────────
// Centralised constants. Import from here, never hardcode values elsewhere.

export const BACKEND_URL = '';

export const COLORS = [
    '#2563EB', '#DC2626', '#16A34A', '#FACC15',
    '#7C3AED', '#EA580C', '#06B6D4', '#DB2777',
    '#84CC16', '#92400E', '#312E81', '#FDA4AF',
];

export const ROWS_PER_PAGE = 25;

// ─── Alert Thresholds ────────────────────────────────────────────────────────
export const DUR_MIN_OK = 15;   // min — below this is too fast (generic)
export const DUR_MAX_OK = 45;   // min — above this is too slow
export const DIST_APERT_MAX = 500;  // m   — aperture vs start-point limit
export const DIST_SEGMENTO_MAX = 600;  // m   — coverage radius per segment

// Umbrales diferenciados por tipo de formulario
export const DUR_MIN_EHM = 10;  // min — mínimo aceptable para EHM (con 1 persona)
export const DUR_MIN_ESCA = 15;  // min — mínimo aceptable para ESCA

// Validación de cédula del encuestador
export const CEDULA_MIN_LEN = 6;
export const CEDULA_MAX_LEN = 9;

// Validación de ingresos declarados por miembro del hogar
export const INGRESO_MIN = 1;
export const INGRESO_MAX = 9_999_999;

/**
 * Declarative alert rules. Each rule is evaluated in dataProcessor.js.
 * - code:   unique identifier stored in _meta.alertas[]
 * - label:  short name shown as badge
 * - detail: full explanation shown in tooltip / popup
 */
export const ALERT_RULES = [
    {
        code: 'APERT_LEJOS',
        label: 'Apertura Distante',
        detail: `El punto donde se abrió el formulario (apertura automática) está a más de
${DIST_APERT_MAX} m del punto de inicio marcado manualmente. Puede indicar que el
encuestador abrió la encuesta fuera de la vivienda o del segmento asignado.`,
    },
    {
        code: 'FUERA_SEGMENTO',
        label: 'Fuera de Cobertura',
        detail: `El punto de captura se encuentra a más de ${DIST_SEGMENTO_MAX} m del centro
del segmento asignado. El encuestador pudo haber trabajado en un área que no corresponde
a su segmento.`,
    },
    {
        code: 'TIEMPO_CORTO',
        label: 'Velocidad Sospechosa (corto)',
        detail: `La encuesta se completó en menos de ${DUR_MIN_OK} minutos, por debajo del
tiempo mínimo razonable para una entrevista de calidad. Es probable que los datos se
hayan completado sin realizar las preguntas completas.`,
    },
    {
        code: 'TIEMPO_LARGO',
        label: 'Duración Larga',
        color: '#EF4444',
        detail: 'La encuesta superó los 45 minutos. Posible pausa prolongada o error de cierre.'
    },
    {
        code: 'SEGMENTO_INCORRECTO',
        label: 'Segmento Erróneo',
        color: '#EF4444',
        detail: 'La ubicación GPS del levantamiento no coincide con el segmento declarado en la encuesta.'
    },
    // ── Nuevas alertas (requerimientos 2026-03) ────────────────────────────────
    {
        code: 'TIEMPO_CORTO_EHM',
        label: 'Rapidez Inusual (EHM)',
        detail: `EHM efectiva con una sola persona completada en menos de ${DUR_MIN_EHM} minutos.
El mínimo razonable para EHM con un solo miembro del hogar es ${DUR_MIN_EHM} minutos.`,
    },
    {
        code: 'TIEMPO_CORTO_ESCA',
        label: 'Rapidez Inusual (ESCA)',
        detail: `ESCA efectiva completada en menos de ${DUR_MIN_ESCA} minutos.
El mínimo razonable para ESCA es ${DUR_MIN_ESCA} minutos.`,
    },
    {
        code: 'ARRANQUE_INCONSISTENTE',
        label: 'Arranque Incorrecto',
        detail: 'El número de arranque declarado en el hogar no correlaciona con el número de línea del control. Posible error de captura o salto de registro.',
    },
    {
        code: 'LINEA_SERIE_INVALIDA',
        label: 'Inconsistencia Línea/Serie',
        detail: 'Uno o más datos (Control, Serie o Línea) no se encuentran definidos en la base de datos oficial del proyecto.',
    },
    {
        code: 'CEDULA_INVALIDA',
        label: 'Cédula Inválida',
        detail: `La cédula del encuestador no es numérica o su longitud está fuera del rango permitido (${CEDULA_MIN_LEN}–${CEDULA_MAX_LEN} dígitos).`,
    },
    {
        code: 'INGRESO_ANOMALO',
        label: 'Ingreso Anómalo',
        detail: `El ingreso declarado por un miembro del hogar está fuera del rango razonable (${INGRESO_MIN} – ${INGRESO_MAX.toLocaleString('es-VE')} Bs.). Posible error de digitación.`,
    },
    {
        code: 'DESPLAZAMIENTO_ANOMALO',
        label: 'Desplazamiento Anómalo',
        detail: 'La distancia entre el punto de captura inicial y el punto de cierre de la encuesta supera los 30 metros. El encuestador pudo haberse movido durante la encuesta.',
        color: '#F59E0B'
    },
    {
        code: 'HOGARES_INCONSISTENTES',
        label: 'Hogares con Inconsistencias',
        detail: 'La cantidad de hogares registrados difiere de la cantidad de hogares declarados.',
        color: '#EF4444'
    },
    {
        code: 'INTEGRANTES_INCONSISTENTES',
        label: 'Integrantes con Inconsistencias',
        detail: 'La lista de integrantes por hogar no coincide con el total de miembros declarado.',
        color: '#EF4444'
    },
    {
        code: 'CONTROL_DISTANTE',
        label: 'Control Distante',
        detail: 'La ubicación GPS del levantamiento está a más de 600 metros del punto de control teórico definido en la base de datos oficial.',
        color: '#EF4444'
    },
];

/**
 * Pretty labels for chart categories.
 * Maps raw data codes to human-readable strings.
 */
export const MAP_LABELS = {
    condicion: {
        'ocupada_con_ocupantes_presentes': 'OCUPADA CON OCUPANTES PRESENTES',
        'ocupadas_con_ocupantes_ausentes': 'OCUPADA CON OCUPANTES AUSENTES',
        'desocupada': 'DESOCUPADO',
        'N/A': 'N/A'
    },
    uso: {
        'residencial': 'RESIDENCIAL',
        'construcci_n': 'CONSTRUCCIÓN',
        'comercio': 'COMERCIO',
        'mixto': 'MIXTO',
        'agr_cola': 'AGRÍCOLA',
        'transporte': 'TRANSPORTE',
        'religioso': 'RELIGIOSO',
        'servicio_social_comunal': 'SERVICIO',
        'creativo_cultural_deportivo': 'CREATIVO O CULTURAL',
        'N/A': 'N/A'
    }
};

/** Quick lookup map: code → rule object */
export const ALERT_MAP = Object.fromEntries(ALERT_RULES.map(r => [r.code, r]));

/** List of specialized INE encuestadores */
export const ENCUESTADORES_INE = [
    '12151751',
    '13293815',
    '13476080',
    '17695927',
    '22719373',
    '29879307',
    '28474258',
].map(c => c.trim());
export const IS_INE = new Set(ENCUESTADORES_INE);

/** Mapeo de auxilio Cédula -> Nombre de Encuestador */
export const ENCUESTADOR_NAMES = {
    '12151751': 'Euclides Caraballo',
    '13476080': 'Neida Gimón',
    '17695927': 'Oneida Bárcena',
    '22719373': 'Jhosel Torres',
    '28474258': 'Alines Rodríguez',
    '13293815': 'Encuestador INE 13293815',
    '29879307': 'Encuestador 29879307',
    '16700495': 'Encuestador 16700495',
    '17068499': 'Encuestador 17068499',
    '10832440': 'Gómez Blanco Henry José',
    '11441770': 'Gómez Ordaz Yusbelly Josefina',
    '20310102': 'Campos Guateima Francheska del Jesús',
    '26532999': 'Rodríguez González Jorge Luis',
    '26786495': 'Hernández Villarroel Salvador Augusto'
};

/** Catalog mapping for Estado Monagas (Entidad 16) Municipios */
export const MUNICIPIOS_MAP = {
    '1': 'ACOSTA',          '01': 'ACOSTA',          '1601': 'ACOSTA',          'ACOSTA': 'ACOSTA',
    '2': 'AGUASAY',         '02': 'AGUASAY',         '1602': 'AGUASAY',         'AGUASAY': 'AGUASAY',
    '3': 'BOLIVAR',         '03': 'BOLIVAR',         '1603': 'BOLIVAR',         'BOLIVAR': 'BOLIVAR',
    '4': 'CARIPE',          '04': 'CARIPE',          '1604': 'CARIPE',          'CARIPE': 'CARIPE',
    '5': 'CEDEÑO',          '05': 'CEDEÑO',          '1605': 'CEDEÑO',          'CEDEÑO': 'CEDEÑO',
    '6': 'EZEQUIEL ZAMORA', '06': 'EZEQUIEL ZAMORA', '1606': 'EZEQUIEL ZAMORA', 'EZEQUIEL ZAMORA': 'EZEQUIEL ZAMORA',
    '7': 'LIBERTADOR',      '07': 'LIBERTADOR',      '1607': 'LIBERTADOR',      'LIBERTADOR': 'LIBERTADOR',
    '8': 'MATURIN',         '08': 'MATURIN',         '1608': 'MATURIN',         'MATURIN': 'MATURIN',
    '9': 'PIAR',            '09': 'PIAR',            '1609': 'PIAR',            'PIAR': 'PIAR',
    '10': 'PUNCERES',       '1610': 'PUNCERES',       'PUNCERES': 'PUNCERES',
    '11': 'SANTA BARBARA',   '1611': 'SANTA BARBARA',   'SANTA BARBARA': 'SANTA BARBARA',
    '12': 'SOTILLO',        '1612': 'SOTILLO',        'SOTILLO': 'SOTILLO',
    '13': 'URACOA',         '1613': 'URACOA',         'URACOA': 'URACOA',
};

export const MUNICIPIO_CODES = {
    'ACOSTA': '01',
    'AGUASAY': '02',
    'BOLIVAR': '03',
    'CARIPE': '04',
    'CEDEÑO': '05',
    'EZEQUIEL ZAMORA': '06',
    'LIBERTADOR': '07',
    'MATURIN': '08',
    'PIAR': '09',
    'PUNCERES': '10',
    'SANTA BARBARA': '11',
    'SOTILLO': '12',
    'URACOA': '13',
};

/**
 * Formats a municipality value with its official INE code and uppercase name.
 * Example: getMunicipioLabel('1608')    -> "08 - MATURIN"
 *          getMunicipioLabel('MATURIN') -> "08 - MATURIN"
 *          getMunicipioLabel('1')       -> "01 - ACOSTA"
 */
export function getMunicipioLabel(val) {
    if (!val || val === 'N/A' || val === '—') return 'N/A';
    const str = String(val).trim();
    if (/^\d{2}\s*-\s*/.test(str)) return str;

    const rawUpper = str.toUpperCase();

    // Check direct mapping in MUNICIPIOS_MAP (covers "1608", "8", "08", "MATURIN")
    const name = MUNICIPIOS_MAP[rawUpper] || (rawUpper.startsWith('16') && MUNICIPIOS_MAP[rawUpper.slice(2)]) || rawUpper;
    const code = MUNICIPIO_CODES[name] || (rawUpper.length <= 2 ? rawUpper.padStart(2, '0') : '00');
    return `${code} - ${name}`;
}

/**
 * ─── Semantic Styles (Unification) ───────────────────────────────────────────
 * Centralized styles for categories used in charts and table badges.
 */
export const SEMANTIC_COLORS = {
    EFFECTIVE:       '#10B981', // Emerald — TIPO E / Efectivas
    NON_RESPONSE:    '#8B5CF6', // Purple — TIPO A / No Respuesta
    VACANT:          '#F59E0B', // Amber — TIPO B / Desocupada
    NON_RESIDENTIAL: '#64748B', // Slate — TIPO C / Inexistente / No Residencial
    VOLUME:          '#3B82F6', // Blue — Volumen / Encuestas Recibidas
    OPERATIONAL:     '#06B6D4', // Cyan — Encuestadores / Personal de campo
    DEMOGRAPHIC:     '#06B6D4', // Cyan — Integrantes / Demografía
    ALERTS:          '#EF4444', // Red — Alertas e inconsistencias
};

export const USO_STYLES = {
    'RESIDENCIAL': { color: '#2563EB', badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50' },
    'COMERCIO':    { color: '#FACC15', badge: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800/50' },
    'COMERCIAL':   { color: '#FACC15', badge: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800/50' },
    'MIXTO':       { color: '#16A34A', badge: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800/50' },
    'CONSTRUCCI':  { color: '#DC2626', badge: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800/50' },
    'RELIGIOSO':   { color: '#7C3AED', badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border border-purple-200 dark:border-purple-800/50' },
    'CREATIVO':    { color: '#DB2777', badge: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400 border border-pink-200 dark:border-pink-800/50' },
    'CULTURAL':    { color: '#DB2777', badge: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400 border border-pink-200 dark:border-pink-800/50' },
    'SERVICIO':    { color: '#F97316', badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border border-orange-200 dark:border-orange-800/50' },
    'AGRÍCOLA':    { color: '#84CC16', badge: 'bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-400 border border-lime-200 dark:border-lime-800/50' },
    'TRANSPORTE':  { color: '#06B6D4', badge: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800/50' },
    'DEFAULT':     { color: '#94A3B8', badge: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400' }
};

export const RAZON_STYLES = {
    'TIPO A':      { color: SEMANTIC_COLORS.NON_RESPONSE, badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border border-purple-200 dark:border-purple-800/50' },
    'TIPO B':      { color: SEMANTIC_COLORS.VACANT,       badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50' },
    'TIPO C':      { color: SEMANTIC_COLORS.NON_RESIDENTIAL, badge: 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400 border border-slate-200 dark:border-slate-800/50' },
    'TIPO E':      { color: SEMANTIC_COLORS.EFFECTIVE,    badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50' },
    'NO DEFINIDO': { color: '#94A3B8', badge: 'bg-slate-100 text-slate-500 dark:bg-slate-800/50 dark:text-slate-400' },
    'PRESENTES':   { color: SEMANTIC_COLORS.EFFECTIVE,    badge: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50' },
    'AUSENTES':    { color: SEMANTIC_COLORS.NON_RESPONSE, badge: 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400 border border-purple-100 dark:border-purple-800/50' },
    'DESOCUPAD':   { color: SEMANTIC_COLORS.VACANT,       badge: 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border border-amber-100 dark:border-amber-800/50' },
    'RECHAZO':     { color: SEMANTIC_COLORS.NON_RESPONSE, badge: 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400 border border-purple-100 dark:border-purple-800/50' },
    'NADIE':       { color: SEMANTIC_COLORS.NON_RESPONSE, badge: 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400 border border-purple-100 dark:border-purple-800/50' },
    'DEFAULT':     { color: '#94A3B8', badge: 'bg-slate-100 text-slate-500 dark:bg-slate-800/50 dark:text-slate-400 border border-slate-200 dark:border-slate-700' }
};

/**
 * ─── Subtype Styles ───────────────────────────────────────────────────────────
 * Semantic styles for each housing subtype label used in charts, badges, and
 * breakdown indicators. Colors are intentionally grouped by parent type.
 */
export const SUBTIPO_STYLES = {
    // TIPO E — Encuestada
    'Totalmente Encuestado':     { color: '#10B981', colorBg: 'rgba(16,185,129,0.15)', badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700' },
    // TIPO A — Ausentes / Rechazos / No Efectivas
    'Ausente Temporalmente':     { color: '#FB923C', colorBg: 'rgba(251,146,60,0.15)', badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 border border-orange-300 dark:border-orange-700' },
    'Incompleta':               { color: '#F87171', colorBg: 'rgba(248,113,113,0.15)', badge: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300 border border-rose-300 dark:border-rose-700' },
    'Ocupantes Ausentes':        { color: '#F59E0B', colorBg: 'rgba(245,158,11,0.15)', badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-300 dark:border-amber-700' },
    'Informante No Calificado': { color: '#C084FC', colorBg: 'rgba(192,132,252,0.15)', badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border border-purple-300 dark:border-purple-700' },
    'Pendiente':                { color: '#A78BFA', colorBg: 'rgba(167,139,250,0.15)', badge: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300 border border-violet-300 dark:border-violet-700' },
    'No Atiende Telefono':      { color: '#E879F9', colorBg: 'rgba(232,121,249,0.15)', badge: 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-300 border border-fuchsia-300 dark:border-fuchsia-700' },
    'Rechazada':                 { color: '#8B5CF6', colorBg: 'rgba(139,92,246,0.15)', badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border border-purple-300 dark:border-purple-700' },
    'Sin Entrevista':           { color: '#94A3B8', colorBg: 'rgba(148,163,184,0.15)', badge: 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300 border border-slate-300 dark:border-slate-700' },
    // TIPO B — Desocupadas / Ocasionales / Construcción
    'Construccion':              { color: '#60A5FA', colorBg: 'rgba(96,165,250,0.15)', badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-300 dark:border-blue-700' },
    'Inadecuada para Uso':       { color: '#F97316', colorBg: 'rgba(249,115,22,0.15)', badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 border border-orange-300 dark:border-orange-700' },
    'Vivienda Desocupada':       { color: '#FBBF24', colorBg: 'rgba(251,191,36,0.15)', badge: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 border border-yellow-300 dark:border-yellow-700' },
    'Vivienda Ocasional':       { color: '#38BDF8', colorBg: 'rgba(56,189,248,0.15)', badge: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300 border border-sky-300 dark:border-sky-700' },
    'Uso Vacasional':            { color: '#34D399', colorBg: 'rgba(52,211,153,0.12)', badge: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300 border border-teal-300 dark:border-teal-700' },
    'Temporalmente en Negocio':  { color: '#C084FC', colorBg: 'rgba(192,132,252,0.13)', badge: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300 border border-purple-300 dark:border-purple-700' },
    // TIPO C — Inexistentes / No Residenciales / Demolidas
    'Demolida':                  { color: '#EF4444', colorBg: 'rgba(239,68,68,0.15)',  badge: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 border border-red-300 dark:border-red-700' },
    'Mal Listada':              { color: '#F43F5E', colorBg: 'rgba(244,63,94,0.15)',  badge: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300 border border-rose-300 dark:border-rose-700' },
    'No Existe':                { color: '#DC2626', colorBg: 'rgba(220,38,38,0.15)',  badge: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 border border-red-400 dark:border-red-700' },
    'Sin Listar':               { color: '#E11D48', colorBg: 'rgba(225,29,72,0.15)',  badge: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300 border border-rose-400 dark:border-rose-700' },
    'Otra Condicion':           { color: '#94A3B8', colorBg: 'rgba(148,163,184,0.12)', badge: 'bg-slate-100 text-slate-600 dark:bg-slate-800/50 dark:text-slate-400 border border-slate-300 dark:border-slate-700' },
    'Otra Situacion':           { color: '#94A3B8', colorBg: 'rgba(148,163,184,0.12)', badge: 'bg-slate-100 text-slate-600 dark:bg-slate-800/50 dark:text-slate-400 border border-slate-300 dark:border-slate-700' },
    'No Existe Nro Telefonico': { color: '#B91C1C', colorBg: 'rgba(185,28,28,0.15)',  badge: 'bg-red-200 text-red-900 dark:bg-red-950 dark:text-red-300 border border-red-500' },
    'Negocio Permanente':        { color: '#A78BFA', colorBg: 'rgba(167,139,250,0.15)', badge: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300 border border-violet-300 dark:border-violet-700' },
    'Otro (Especifique)':        { color: '#94A3B8', colorBg: 'rgba(148,163,184,0.12)', badge: 'bg-slate-100 text-slate-600 dark:bg-slate-800/50 dark:text-slate-400 border border-slate-300 dark:border-slate-700' },
    'Consolidada':              { color: '#64748B', colorBg: 'rgba(100,116,139,0.12)', badge: 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-400' },
    'DEFAULT':                   { color: '#94A3B8', colorBg: 'rgba(148,163,184,0.10)', badge: 'bg-slate-100 text-slate-500 dark:bg-slate-800/50 dark:text-slate-400 border border-slate-200 dark:border-slate-700' },
};

/**
 * Maps each subtype label to its parent classification type (Updated Official Master Table).
 */
export const SUBTIPO_TO_TIPO = {
    // TIPO E — Encuestada
    'Totalmente Encuestado':    'TIPO E',
    
    // TIPO A — Ausentes / Rechazos / No Efectivas
    'Ausente Temporalmente':    'TIPO A', // AT
    'Incompleta':               'TIPO A', // IN
    'Ocupantes Ausentes':       'TIPO A', // OA
    'Informante No Calificado': 'TIPO A', // IC
    'Pendiente':                'TIPO A', // PE
    'No Atiende Telefono':      'TIPO A', // NO
    'Rechazada':                'TIPO A', // RZ
    'Sin Entrevista':           'TIPO A', // SE

    // TIPO B — Desocupadas / Ocasionales / Construcción / Negocio Temporal
    'Construccion':             'TIPO B', // CO
    'Inadecuada para Uso':      'TIPO B', // IU
    'Vivienda Desocupada':      'TIPO B', // VD
    'Vivienda Ocasional':       'TIPO B', // VO
    'Uso Vacasional':           'TIPO B', // UV
    'Temporalmente en Negocio': 'TIPO B', // TN

    // TIPO C — No Residenciales / Demolidas / Inexistentes / Errores de Listado
    'Demolida':                 'TIPO C', // DE
    'Mal Listada':              'TIPO C', // ML
    'No Existe':                'TIPO C', // NE
    'Sin Listar':               'TIPO C', // SL
    'Otra Condicion':           'TIPO C', // OT
    'Otra Situacion':           'TIPO C', // OS
    'No Existe Nro Telefonico': 'TIPO C', // NT
    'Negocio Permanente':       'TIPO C', // NP
    'Otro (Especifique)':       'TIPO C', // OE
    'Consolidada':              'TIPO C', // CD
};

export const SUBTIPO_NOMENCLATURA = {
    'Totalmente Encuestado':    'TE',
    'Ausente Temporalmente':    'AT',
    'Incompleta':               'IN',
    'Ocupantes Ausentes':       'OA',
    'Informante No Calificado': 'IC',
    'Pendiente':                'PE',
    'No Atiende Telefono':      'NO',
    'Rechazada':                'RZ',
    'Sin Entrevista':           'SE',
    'Construccion':             'CO',
    'Inadecuada para Uso':      'IU',
    'Vivienda Desocupada':      'VD',
    'Vivienda Ocasional':       'VO',
    'Uso Vacasional':           'UV',
    'Temporalmente en Negocio': 'TN',
    'Demolida':                 'DE',
    'Mal Listada':              'ML',
    'No Existe':                'NE',
    'Sin Listar':               'SL',
    'Otra Condicion':           'OT',
    'Otra Situacion':           'OS',
    'No Existe Nro Telefonico': 'NT',
    'Negocio Permanente':       'NP',
    'Otro (Especifique)':       'OE',
    'Consolidada':              'CD',
};
