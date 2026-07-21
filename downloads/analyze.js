const fs = require('fs');
const path = require('path');

// 1. Load raw data
const rawDataPath = '/home/seem/Documentos/_proyectos/api-kobo-encuesta-ampliada/downloads/esca_ampliada_v3_raw.json';
if (!fs.existsSync(rawDataPath)) {
    console.error("Raw data file not found!");
    process.exit(1);
}
const data = JSON.parse(fs.readFileSync(rawDataPath, 'utf8'));
const rawData = Array.isArray(data) ? data : (data.results || []);
console.log(`Loaded ${rawData.length} raw records.`);

// 2. Define normalization and dictionaries (copy-paste from our code)
function normalizeText(text) {
    if (!text) return "";
    return String(text)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]/g, "")
        .trim();
}

const DICT_A = new Set([
    "Informante No Calificado", "InformanteNoCalificado", "INFORMANTE NO CALIFICADO", "INFORMANTE_NO_CALIFICADO",
    "Niños al momento de la visita",
    "El informante. Se encontraba en estado de ebriedad al momento de la visita",
    "No apto para la entrevista, la persona sufre de enfermedad mental",
    "El informante se encuentra enferma",
    "Persona con discapacidad",
    "Rechazada", "RECHAZADA", "Rechazo", "RECHAZO", "Rehuso la entrevista", "Rehusó la entrevista", "Rehusolaentrevista", "rehuso_entrevista",
    "No Atienden el Telefono", "No atiende el telefono", "NO ATIENDE TELEFONO", "noatiendetelefono",
    "Incompleta", "INCOMPLETA",
    "Sin Entrevista", "SIN ENTREVISTA", "sinentrevista"
].map(s => normalizeText(s)));

const DICT_B = new Set([
    "Ocupantes Ausentes", "OcupantesAusentes", "OCUPANTES AUSENTES", "OCUPANTES_AUSENTES", "ocupadas_con_ocupantes_ausentes", "Residencia", "Residencia estudiantil",
    "Construcción", "CONSTRUCCION", "En Construccion", "EnConstruccion", "CONSTRUYENDOSE", "CONSTRUYÉNDOSE",
    "Vivienda Desocupada", "ViviendaDesocupada", "VIVIENDA DESOCUPADA", "VIVIENDA_DESOCUPADA", "desocupada", "desocupado", "desocupada_estado_regular", "DESOCUPADA EN ESTADO REGULAR", "Desocupada en estado regular", "Desocupadaenestadoregular", "otro_desocupada", "No vive nadie en la vivienda",
    "Uso Vacacional", "UsoVacacional", "USO VACACIONAL", "uso_vacacional",
    "Ausente Temporalmente", "ausente_temporalmente", "AUSENTE TEMPORALMENTE", "AUSENTETEMPORALMENTE", "otro_ausentes", "Están  fuera del país en Brasil", "Están fuera del país en Colombia", "Las personas están de viaje",
    "Sin Listar", "SIN LISTAR", "sinlistar",
    "Actualizada y No Seleccionada", "Actualizada y no seleccionada", "actualizadaynoseleccionada",
    "nadie_en_vivienda", "Nadie en la vivienda al momento de la entrevista"
].map(s => normalizeText(s)));

const DICT_C = new Set([
    "Demolida", "DEMOLIDA", "demolida",
    "Mal Listada", "MAL LISTADA", "mallistada",
    "Negocio Permanente", "NEGOCIO PERMANENTE", "NegocioPermanente", "Negocio o almacen permanente", "Negociooalmacenpermanente", "negocio_almacen_permanente", "Ferreteria", "Autolavado", "Uso comercial", "Ferreteria ", "Uso comercial ", "Autolavado ", "Iglesia cristiana ", "Iglesia cristiana",
    "Inadecuada para el Uso", "INADECUADA PARA EL USO", "inadecuada_el_uso", "Inadecuada para el uso", "Inadecuadaparaeluso",
    "No Existe", "NO EXISTE", "NoExiste",
    "Temporalmente en Negocio", "TEMPORALMENTE EN NEGOCIO", "temporalmente_en_negocio", "Temporalmente en Negocio", "TemporalmenteenNegocio",
    "Otro (Especifique)", "Otro(Especifique)", "OTRO", "Otro",
    "No Existe Numero Telefonico", "NO EXISTE NRO TELEFONICO", "No Existe Numero Telefonico", "NO EXISTE NUMERO TELEFONICO", "noexistenrotelefonico",
    "Otra Condición", "Otra Condicion", "otracondicion",
    "Otra Situación", "OTRA SITUACION", "Otra Situación", "Otra Situacion", "otrasituacion", "CONSOLIDADA", "consolidada",
    "Pendiente", "PENDIENTE", "pendiente"
].map(s => normalizeText(s)));

const DICT_E = new Set([
    "Totalmente Encuestada", "TOTALMENTE ENCUESTADA", "totalmenteencuestada",
    "OCUPADA CON OCUPANTES PRESENTES", "ocupada_con_ocupantes_presentes"
].map(s => normalizeText(s)));

function classifyHousingState(state) {
    const norm = normalizeText(state);
    if (!norm) return "NO DEFINIDO";
    
    if (DICT_A.has(norm) || norm.includes("nocalificad") || norm.includes("informatecalificada") || norm.includes("ebriedad") || norm.includes("discapacidad") || norm.includes("enferma") || norm.includes("enfermedad") || norm.includes("menor") || norm.includes("nino")) return "TIPO A";
    if (DICT_B.has(norm) || norm.includes("usovacacional") || norm.includes("usoocacional") || norm.includes("nadieenvivienda") || norm.includes("viaje") || norm.includes("fueradelpais") || norm.includes("pais")) return "TIPO B";
    if (DICT_C.has(norm) || norm.includes("comercial") || norm.includes("iglesia") || norm.includes("ferreteria") || norm.includes("autolavado")) return "TIPO C";
    if (DICT_E.has(norm)) return "TIPO E";
    
    return "NO DEFINIDO";
}

// Subcategory sets in kpis.js
const SET_INFORMATE_NO_CAL = new Set([
    "informantenocalificado", "ninosalmomentodelavisita",
    "elinformanteseencuentraenestadodeebriedadalmomentodelavisita",
    "noaptoparalaentrevistalapersonasufredeenfermedadmental",
    "elinformanteseencuentraenferma", "personacondiscapacidad"
]);
const SET_RECHAZO = new Set([
    "rechazada", "rechazo", "rehusolaentrevista", "rehusoentrevista"
]);
const SET_NO_ATIENDE_TELF = new Set([
    "noatiendeneltelefono", "noatiendetelefono"
]);
const SET_INCOMPLETA = new Set(["incompleta"]);
const SET_SIN_ENTREVISTA = new Set(["sinentrevista"]);

const SET_OCUPANTES_AUSENTES = new Set([
    "ocupantesausentes", "ocupadasconocupantesausentes", "residencia", "residenciaestudiantil",
    "nadieenvivienda", "nadieenlaviviendaalmomentodelaentrevista"
]);
const SET_CONSTRUCCION = new Set([
    "construccion", "enconstruccion", "construyendose"
]);
const SET_DESOCUPACION = new Set([
    "viviendadesocupada", "desocupada", "desocupado", "desocupadaestadoregular", "desocupadaenestadoregular", "otrodesocupada", "novivenadieenlavivienda"
]);
const SET_USO_VACACIONAL = new Set([
    "usovacacional", "usoocacional"
]);
const SET_AUSENCIA = new Set([
    "ausentetemporalmente", "otroausentes", "estanfueradelpaisenbrasil", "estanfueradelpaisencolombia", "laspersonasestandeviaje"
]);
const SET_SIN_LISTAR = new Set(["sinlistar"]);
const SET_ACTUALIZADA_NO_SEL = new Set(["actualizadaynoseleccionada"]);

const SET_DEMOLIDA = new Set(["demolida"]);
const SET_MAL_LISTADA = new Set(["mallistada"]);
const SET_NEGOCIO_PERM = new Set([
    "negociopermanente", "negociooalmacenpermanente", "negocioalmacenpermanente", "ferreteria", "autolavado", "usocomercial", "iglesiacristiana"
]);
const SET_INADE_USO = new Set(["inadecuadaparaeluso", "inadecuadaeluso"]);
const SET_NO_EXISTE = new Set(["noexiste"]);
const SET_TEMP_NEGOCIO = new Set(["temporalmenteennegocio"]);
const SET_OTRO_ESPEC = new Set(["otroespecifique", "otro"]);
const SET_NO_EXISTE_TELF = new Set(["noexistenumerotelefonico", "noexistenrotelefonico"]);
const SET_OTRA_COND = new Set(["otracondicion"]);
const SET_OTRA_SIT = new Set(["otrasituacion", "consolidada"]);
const SET_PENDIENTE = new Set(["pendiente"]);

const SET_HABITADA = new Set(["totalmenteencuestada", "ocupadaconocupantespresentes"]);

// 3. Analyze each record
const unclassified = {};
const noSubcategoryA = {};
const countByType = { "TIPO A": 0, "TIPO B": 0, "TIPO C": 0, "TIPO E": 0, "NO DEFINIDO": 0 };

rawData.forEach(r => {
    const cond = r['Condici_n_de_ocupaci_n/condicion_de_ocupacion'] || 'N/A';
    const sit = r['Condici_n_de_ocupaci_n/vivienda_ocupada01'] || r['Condici_n_de_ocupaci_n/situacion_vivienda'] || '';
    const stateVal = sit || cond;
    const type = classifyHousingState(stateVal);
    countByType[type]++;

    const norm = normalizeText(stateVal);

    if (type === 'NO DEFINIDO') {
        const key = `sit: [${sit}], cond: [${cond}]`;
        unclassified[key] = (unclassified[key] || 0) + 1;
    } else if (type === 'TIPO A') {
        // Check if it matches any subcategory in kpis.js
        if (!SET_INFORMATE_NO_CAL.has(norm) && !norm.includes("nocalificad") && !norm.includes("informatecalificada") && !norm.includes("nocalificada") &&
            !norm.includes("ebriedad") && !norm.includes("discapacidad") && !norm.includes("enferma") && !norm.includes("enfermedad") && !norm.includes("menor") && !norm.includes("nino") &&
            !SET_RECHAZO.has(norm) &&
            !SET_NO_ATIENDE_TELF.has(norm) &&
            !SET_INCOMPLETA.has(norm) &&
            !SET_SIN_ENTREVISTA.has(norm)) {
            const key = `sit: [${sit}], cond: [${cond}] (norm: [${norm}])`;
            noSubcategoryA[key] = (noSubcategoryA[key] || 0) + 1;
        }
    }
});

console.log("\n--- COUNT BY TYPE ---");
console.log(countByType);

console.log("\n--- UNCLASSIFIED FREQUENCIES ---");
console.log(Object.entries(unclassified).sort((a,b) => b[1] - a[1]));

console.log("\n--- TIPO A MISSED SUBCATEGORY FREQUENCIES ---");
console.log(Object.entries(noSubcategoryA).sort((a,b) => b[1] - a[1]));
