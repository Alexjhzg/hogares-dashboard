// ─── Configuration ──────────────────────────────────────────────────────────
// Centralised constants. Import from here, never hardcode values elsewhere.

export const BACKEND_URL = '';

export const COLORS = [
    '#3B82F6', '#10B981', '#8B5CF6', '#F59E0B',
    '#39d0c4', '#EF4444', '#e3b341', '#a371f7',
    '#ffa657', '#79c0ff', '#56d364', '#ff7b72',
];

export const ROWS_PER_PAGE = 25;

// ─── Alert Thresholds ────────────────────────────────────────────────────────
export const DUR_MIN_OK         = 15;   // min — below this is too fast
export const DUR_MAX_OK         = 45;   // min — above this is too slow
export const DIST_APERT_MAX     = 500;  // m   — aperture vs start-point limit
export const DIST_SEGMENTO_MAX  = 600;  // m   — coverage radius per segment

/**
 * Declarative alert rules. Each rule is evaluated in dataProcessor.js.
 * - code:   unique identifier stored in _meta.alertas[]
 * - label:  short name shown as badge
 * - detail: full explanation shown in tooltip / popup
 */
export const ALERT_RULES = [
    {
        code:   'APERT_LEJOS',
        label:  'Apertura Distante',
        detail: `El punto donde se abrió el formulario (apertura automática) está a más de
${DIST_APERT_MAX} m del punto de inicio marcado manualmente. Puede indicar que el
encuestador abrió la encuesta fuera de la vivienda o del segmento asignado.`,
    },
    {
        code:   'FUERA_SEGMENTO',
        label:  'Fuera de Cobertura',
        detail: `El punto de captura se encuentra a más de ${DIST_SEGMENTO_MAX} m del centro
del segmento asignado. El encuestador pudo haber trabajado en un área que no corresponde
a su segmento.`,
    },
    {
        code:   'TIEMPO_CORTO',
        label:  'Velocidad Sospechosa (corto)',
        detail: `La encuesta se completó en menos de ${DUR_MIN_OK} minutos, por debajo del
tiempo mínimo razonable para una entrevista de calidad. Es probable que los datos se
hayan completado sin realizar las preguntas completas.`,
    },
    {
        code:   'TIEMPO_LARGO',
        label:  'Duración Larga',
        color:  '#EF4444',
        detail: 'La encuesta superó los 60 minutos. Posible pausa prolongada o error de cierre.'
    },
    {
        code:   'SEGMENTO_INCORRECTO',
        label:  'Segmento Erróneo',
        color:  '#EF4444',
        detail: 'La ubicación GPS del levantamiento no coincide con el segmento declarado en la encuesta.'
    },
];

/** Quick lookup map: code → rule object */
export const ALERT_MAP = Object.fromEntries(ALERT_RULES.map(r => [r.code, r]));

