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

