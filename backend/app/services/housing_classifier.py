import unicodedata
import re
from collections import Counter

def normalize_text(text: str) -> str:
    if not text:
        return ""
    # Convertir a minúsculas
    text = str(text).lower()
    # Eliminar tildes y caracteres especiales
    text = "".join(
        c for c in unicodedata.normalize("NFD", text)
        if unicodedata.category(c) != "Mn"
    )
    # Eliminar espacios adicionales (al inicio, final y dobles espacios)
    text = re.sub(r"\s+", " ", text).strip()
    return text

# Diccionarios de referencia (normalizados para búsqueda rápida)
DICT_A = [
    "AUSENTE TEMPORALMENTE", "AUSENTETEMPORALMENTE", "ausente_temporalmente",
    "Nadie en la vivienda al momento de la entrevista", "Nadieenlaviviendaalmomentodelaentrevista", "nadie_en_vivienda",
    "Rehuso la entrevista", "Rehusó la entrevista", "Rehusolaentrevista", "rehuso_entrevista",
    "Ocupantes Ausentes", "OcupantesAusentes",
    "Informante No Calificado", "InformanteNoCalificado",
    "NADIE EN LA VIVIENDA AL MOMENTO DE LA ENTREVISTA",
    "INCOMPLETA", "OCUPANTES AUSENTES", "INFORMANTE NO CALIFICADO",
    "PENDIENTE", "NO ATIENDE TELEFONO", "RECHAZO", "SIN ENTREVISTA", "RECHAZADA",
    "otro_ausentes"
]

DICT_B = [
    "CONSTRUCCION", "En Construccion", "EnConstruccion", "INADECUADA PARA EL USO", "inadecuada_el_uso",
    "CONSTRUYENDOSE", "VIVIENDA DESOCUPADA", "VIVIENDA OCASIONAL", 
    "USO VACACIONAL", "UsoVacacional", "uso_vacacional",
    "TEMPORALMENTE EN NEGOCIO", "temporalmente_en_negocio",
    "DESOCUPADA EN ESTADO REGULAR", "desocupada_estado_regular",
    "Inadecuada para el uso", "Inadecuadaparaeluso", "Uso Vacacional", 
    "Temporalmente en Negocio", "TemporalmenteenNegocio", "Vivienda Ocasional", "ViviendaOcasional",
    "Vivienda Desocupada", "ViviendaDesocupada", "Desocupada en estado regular", "Desocupadaenestadoregular",
    "otro_desocupada"
]

DICT_C = [
    "DEMOLIDA", "demolida", "Otro (Especifique)", "Otro(Especifique)", "MAL LISTADA", 
    "NO EXISTE", "SIN LISTAR", "NO RESIDENCIAL", "NO RESIENDECIAL", "OTRO", 
    "NO EXISTE NRO TELEFONICO", "NEGOCIO PERMANENTE", "OTRA SITUACION", 
    "CONSOLIDADA", "Negocio Permanente", "NegocioPermanente", "No Existe", "NoExiste",
    "Negocio o almacen permanente", "Negociooalmacenpermanente", "negocio_almacen_permanente"
]

DICT_E = [
    "OCUPADA CON OCUPANTES PRESENTES", "ocupada_con_ocupantes_presentes", "TOTALMENTE ENCUESTADA"
]

# Crear sets normalizados para búsqueda eficiente
NORMALIZED_A = {normalize_text(t) for t in DICT_A}
NORMALIZED_B = {normalize_text(t) for t in DICT_B}
NORMALIZED_C = {normalize_text(t) for t in DICT_C}
NORMALIZED_E = {normalize_text(t) for t in DICT_E}

def classify_housing_state(state: str) -> str:
    norm_state = normalize_text(state)
    if not norm_state:
        return "VALOR NO DEFINIDO EN EL SISTEMA"
    
    if norm_state in NORMALIZED_A:
        return "TIPO A"
    if norm_state in NORMALIZED_B:
        return "TIPO B"
    if norm_state in NORMALIZED_C:
        return "TIPO C"
    if norm_state in NORMALIZED_E:
        return "TIPO E"
    
    # Intento de búsqueda eliminando todos los espacios por si acaso (ej: "AUSENTETEMPORALMENTE")
    flat_state = norm_state.replace(" ", "")
    if flat_state in {t.replace(" ", "") for t in NORMALIZED_A}:
        return "TIPO A"
    if flat_state in {t.replace(" ", "") for t in NORMALIZED_B}:
        return "TIPO B"
    if flat_state in {t.replace(" ", "") for t in NORMALIZED_C}:
        return "TIPO C"
    if flat_state in {t.replace(" ", "") for t in NORMALIZED_E}:
        return "TIPO E"
        
    return "VALOR NO DEFINIDO EN EL SISTEMA"

def generate_classification_report(data_list: list[str]):
    """
    Genera el reporte solicitado por el usuario.
    """
    classifications = [classify_housing_state(s) for s in data_list]
    counts = Counter(classifications)
    
    # Mapeos exitosos
    matches = []
    # Inconsistencias
    inconsistencies = []
    
    seen_states = Counter(data_list)
    
    for state, freq in seen_states.items():
        category = classify_housing_state(state)
        if category != "VALOR NO DEFINIDO EN EL SISTEMA":
            matches.append({"Termino": state, "Categoria": category, "Frecuencia": freq})
        else:
            inconsistencies.append({"Termino": state or "[Vacio]", "Frecuencia": freq})
            
    return {
        "Frecuencias": dict(counts),
        "Coincidencias": matches,
        "Inconsistencias": inconsistencies
    }
