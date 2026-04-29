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
        detail: 'La encuesta superó los 60 minutos. Posible pausa prolongada o error de cierre.'
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

/**
 * ─── Semantic Styles (Unification) ───────────────────────────────────────────
 * Centralized styles for categories used in charts and table badges.
 */
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
    'TIPO A':      { color: '#8B5CF6', badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border border-purple-200 dark:border-purple-800/50' },
    'TIPO B':      { color: '#F59E0B', badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border border-orange-200 dark:border-orange-800/50' },
    'TIPO C':      { color: '#DC2626', badge: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800/50' },
    'TIPO E':      { color: '#10B981', badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50' },
    'NO DEFINIDO': { color: '#94A3B8', badge: 'bg-slate-100 text-slate-500 dark:bg-slate-800/50 dark:text-slate-400' },
    'PRESENTES':   { color: '#2563EB', badge: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50' },
    'AUSENTES':    { color: '#FACC15', badge: 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border border-amber-100 dark:border-amber-800/50' },
    'DESOCUPAD':   { color: '#DC2626', badge: 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 border border-red-100 dark:border-red-800/50' },
    'RECHAZO':     { color: '#FACC15', badge: 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border border-amber-100 dark:border-amber-800/50' },
    'NADIE':       { color: '#FACC15', badge: 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border border-amber-100 dark:border-amber-800/50' },
    'DEFAULT':     { color: '#94A3B8', badge: 'bg-slate-100 text-slate-500 dark:bg-slate-800/50 dark:text-slate-400 border border-slate-200 dark:border-slate-700' }
};
