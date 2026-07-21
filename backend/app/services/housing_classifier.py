import unicodedata
import re
from collections import Counter

def normalize_text(text: str) -> str:
    if not text:
        return ""
    text = str(text).lower()
    text = "".join(
        c for c in unicodedata.normalize("NFD", text)
        if unicodedata.category(c) != "Mn"
    )
    return re.sub(r"[^a-z0-9]", "", text)

def classify_housing_state(situacion: str, condicion: str = "") -> str:
    sit = normalize_text(situacion)
    cond = normalize_text(condicion)
    norm = sit or cond

    if not norm:
        return "NO DEFINIDO"

    # 1. TOTALMENTE ENCUESTADA (TIPO E)
    if cond == 'ocupadaconocupantespresentes' or sit == 'ocupadaconocupantespresentes' or 'totalmenteencuestad' in sit:
        return "TIPO E"

    # 2. TIPO A (VIVIENDA OCUPADA)
    if cond == 'ocupadasconocupantesausentes' or sit in ['nadieenvivienda', 'ausentetemporalmente', 'rehusoentrevista', 'otroausentes']:
        return "TIPO A"
    if any(k in sit for k in ['nocalificad', 'menor', 'nino', 'ebriedad', 'enferm', 'discapacidad', 'incapacitad', 'noatiende', 'incompleta', 'sinentrevista', 'rehuso', 'rechaz']):
        return "TIPO A"

    # 3. TIPO B (VIVIENDA DESOCUPADA HABITABLE / USO OCASIONAL / CONSTRUCCION)
    if cond == 'desocupada' or norm:
        if sit in ['desocupadaestadoregular', 'inadecuadaeluso', 'construyendose', 'temporalmenteennegocio', 'usovacacional', 'usovacasional']:
            return "TIPO B"
        if any(k in sit for k in ['desocupad', 'inadecuada', 'construc', 'temporalmenteennegocio', 'usovacacional', 'usoocacional']):
            return "TIPO B"

    # 4. TIPO C (VIVIENDA DESOCUPADA NO RESIDENCIAL / DEMOLIDA / OTRO)
    if sit in ['demolida', 'negocioalmacenpermanente', 'consolidada', 'otrodesocupada', 'otro']:
        return "TIPO C"
    if any(k in sit for k in ['demolid', 'negocio', 'almacen', 'consolidada', 'ferreteria', 'autolavado', 'comercio', 'taller', 'iglesia', 'otro']):
        return "TIPO C"

    return "TIPO C" if cond == 'desocupada' else "NO DEFINIDO"

def generate_classification_report(data_list: list[str]):
    classifications = [classify_housing_state(s) for s in data_list]
    counts = Counter(classifications)
    
    matches = []
    inconsistencies = []
    seen_states = Counter(data_list)
    
    for state, freq in seen_states.items():
        category = classify_housing_state(state)
        if category != "NO DEFINIDO":
            matches.append({"Termino": state, "Categoria": category, "Frecuencia": freq})
        else:
            inconsistencies.append({"Termino": state or "[Vacio]", "Frecuencia": freq})
            
    return {
        "Frecuencias": dict(counts),
        "Coincidencias": matches,
        "Inconsistencias": inconsistencies
    }
