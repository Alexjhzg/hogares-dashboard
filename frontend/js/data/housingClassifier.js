/**
 * ─── Housing State Classifier ────────────────────────────────────────────────
 * Classifies housing states into TIPO A, B, and C based on business rules.
 */

const DICT_A = new Set([
    "AUSENTE TEMPORALMENTE", "AUSENTETEMPORALMENTE", "ausente_temporalmente",
    "NADIE EN LA VIVIENDA AL MOMENTO DE LA ENTREVISTA", "nadie_en_vivienda",
    "REHUSO LA ENTREVISTA", "REHUSÓ LA ENTREVISTA", "REHUSOLAENTREVISTA", "rehuso_entrevista",
    "OCUPANTES AUSENTES", "OCUPANTES_AUSENTES",
    "INFORMANTE NO CALIFICADO", "INFORMANTE_NO_CALIFICADO",
    "INCOMPLETA", "PENDIENTE", "NO ATIENDE TELEFONO", "RECHAZO", "SIN ENTREVISTA", "RECHAZADA",
    "OTRO_AUSENTES"
].map(s => normalizeText(s)));

const DICT_B = new Set([
    "CONSTRUCCION", "EN CONSTRUCCION", "en_construccion", "INADECUADA PARA EL USO", "inadecuada_el_uso",
    "CONSTRUYENDOSE", "CONSTRUYÉNDOSE", "VIVIENDA DESOCUPADA", "VIVIENDA OCASIONAL", 
    "USO VACACIONAL", "uso_vacacional", "USO_VACACIONAL",
    "TEMPORALMENTE EN NEGOCIO", "temporalmente_en_negocio",
    "DESOCUPADA EN ESTADO REGULAR", "desocupada_estado_regular",
    "VIVIENDA_DESOCUPADA", "OTRO_DESOCUPADA"
].map(s => normalizeText(s)));

const DICT_C = new Set([
    "DEMOLIDA", "demolida", "OTRO (ESPECIFIQUE)", "MAL LISTADA", 
    "NO EXISTE", "SIN LISTAR", "NO RESIDENCIAL", "NO RESIENDECIAL", "OTRO", 
    "NO EXISTE NRO TELEFONICO", "NEGOCIO PERMANENTE", "OTRA SITUACION", 
    "CONSOLIDADA", "NEGOCIO O ALMACEN PERMANENTE", "negocio_almacen_permanente"
].map(s => normalizeText(s)));

const DICT_E = new Set([
    "OCUPADA CON OCUPANTES PRESENTES", "ocupada_con_ocupantes_presentes", "TOTALMENTE ENCUESTADA"
].map(s => normalizeText(s)));

function normalizeText(text) {
    if (!text) return "";
    return String(text)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Remove tildes
        .replace(/[^a-z0-9]/g, "")       // Remove all non-alphanumeric (including spaces and underscores)
        .trim();
}

/**
 * Classifies a raw housing state string.
 * @param {string} state 
 * @returns {string} TIPO A, TIPO B, TIPO C, or VALOR NO DEFINIDO
 */
export function classifyHousingState(state) {
    const norm = normalizeText(state);
    if (!norm) return "NO DEFINIDO";
    
    if (DICT_A.has(norm)) return "TIPO A";
    if (DICT_B.has(norm)) return "TIPO B";
    if (DICT_C.has(norm)) return "TIPO C";
    if (DICT_E.has(norm)) return "TIPO E";
    
    return "NO DEFINIDO";
}
