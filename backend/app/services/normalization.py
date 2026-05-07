from datetime import datetime
from app.utils.geo import parse_geopoint, haversine_meters, extract_precision

def to_int(v, default: int = 0) -> int:
    try:
        return int(v)
    except Exception:
        return default

def is_truthy_raw(v: str) -> bool:
    if v is None:
        return False
    vs = str(v).strip().lower()
    return vs not in ("", "no", "no_2", "no_1", "0", "false", "none")

def normalize_record(rec: dict) -> dict:
    """
    Normaliza un registro crudo de KoboToolbox al esquema interno y
    calcula flags / métricas de calidad de datos.
    """
    mapped: dict = {}

    # Encuestador
    mapped["cedula_encuestador"] = rec.get("S0/cedula_encuestador")
    mapped["nombre_encuestador"] = rec.get("S0/s0_nombreapellido")

    # Ubicación geográfica
    mapped["entidad"] = rec.get("S1/ent")
    mapped["municipio"] = rec.get("S1/mun")
    mapped["parroquia"] = rec.get("S1/par")
    mapped["nodo"] = rec.get("S1/nodo")
    mapped["centro_poblado"] = rec.get("S1/cpoblado")

    # Manzana
    mapped["segmento"] = rec.get("S1/segmento") or rec.get("S1/group_segmeto_sector/segmento") or rec.get("group_segmeto_sector/segmento")
    mapped["sector"] = rec.get("S1/sector") or rec.get("S1/group_segmeto_sector/sector") or rec.get("group_segmeto_sector/sector")
    mapped["manzana"] = rec.get("S1/manzana")
    mapped["lado_manz"] = rec.get("S1/lado_manz")
    mapped["parcela"] = rec.get("S1/parcela")
    mapped["edificacion"] = rec.get("S1/Edificaci_n")
    mapped["unidad_inmobiliaria"] = rec.get("S1/unidad")
    mapped["uso_unidad_inmobiliaria"] = rec.get("S1/Uso_de_la_Unidad_inmobiliaria")
    mapped["nombre_sector"] = rec.get("S1/P_nomsect")

    # Control de levantamiento
    mapped["fecha_actual"] = rec.get("group_sh53u78/fecha_actual")
    semana_raw = rec.get("group_sh53u78/semana") or rec.get("datos_hogar/hogar/semana_h")
    mapped["semana_raw"] = semana_raw
    mapped["semana_short"] = semana_raw[-2:] if semana_raw and len(semana_raw) >= 2 else None
    mapped["control"] = rec.get("group_sh53u78/control") or rec.get("datos_hogar/hogar/control_h")
    mapped["lote"] = rec.get("group_sh53u78/lote")
    mapped["n_linea"] = rec.get("group_sh53u78/n_linea")
    mapped["n_serie"] = rec.get("group_sh53u78/n_serie")

    # Condición de ocupación
    raw_ing = rec.get("Condici_n_de_ocupaci_n/ingresada")
    mapped["ingresada_raw"] = raw_ing
    mapped["ingresada"] = is_truthy_raw(raw_ing)
    mapped["condicion_de_ocupacion"] = rec.get("Condici_n_de_ocupaci_n/condicion_de_ocupacion")
    mapped["situacion_vivienda_raw"] = rec.get("Condici_n_de_ocupaci_n/situacion_vivienda")

    # Ubicación final
    mapped["observaciones"] = rec.get("ubicacion_final/observaciones")
    mapped["fecha_entrevista"] = rec.get("ubicacion_final/fecha_entrevista_1")
    mapped["no_respuesta_raw"] = rec.get("ubicacion_final/nota")
    mapped["no_respuesta"] = (
        is_truthy_raw(mapped["no_respuesta_raw"])
        if mapped.get("no_respuesta_raw") is not None
        else False
    )

    # Metadatos y geolocalización
    mapped["start"] = rec.get("start")
    
    end_form = rec.get("ubicacion_final/hora_fin") or rec.get("ubicacion_final/hora_f") or rec.get("hora_f")
    start_str = mapped.get("start") or ""
    
    if end_form:
        if "T" not in end_form and "T" in start_str:
            mapped["end"] = start_str.split("T")[0] + "T" + end_form
        else:
            mapped["end"] = end_form
    else:
        mapped["end"] = rec.get("end")
    start_geo = rec.get("start-geopoint") or rec.get("start_geopoint")
    end_geo = (
        rec.get("group_sh53u78/ubicacion_i")
        or rec.get("end-geopoint")
        or rec.get("end_geopoint")
    )
    mapped["start_geopoint_raw"] = start_geo
    mapped["end_geopoint_raw"] = end_geo
    start_pt = parse_geopoint(start_geo)
    end_pt = parse_geopoint(end_geo)
    mapped["start_pt"] = start_pt
    mapped["end_pt"] = end_pt
    
    # Precisión de GPS
    mapped["start_precision"] = extract_precision(start_geo)
    mapped["end_precision"] = extract_precision(end_geo)

    # Distancia y flags geográficos
    distance_m = haversine_meters(start_pt, end_pt) if start_pt and end_pt else None
    mapped["distance_meters"] = distance_m
    mapped["flag_distance_gt_500m"] = distance_m is not None and distance_m > 500

    # Duración de la encuesta
    try:
        if mapped.get("start") and mapped.get("end"):
            dt_start = datetime.fromisoformat(mapped["start"].replace("Z", "+00:00"))
            dt_end = datetime.fromisoformat(mapped["end"].replace("Z", "+00:00"))
            duration_sec = (dt_end - dt_start).total_seconds()
            mapped["duration_minutes"] = duration_sec / 60.0
            
            # Solo aplica la alerta de tiempo si la encuesta fue Efectiva (Completada)
            nota_str = str(mapped.get("no_respuesta_raw") or "").lower()
            is_completada = "totalment" in nota_str
            mapped["flag_short_duration"] = is_completada and mapped["duration_minutes"] < 15
        else:
            mapped["duration_minutes"] = None
            mapped["flag_short_duration"] = False
    except Exception:
        mapped["duration_minutes"] = None
        mapped["flag_short_duration"] = False

    # Hogares y personas
    hogar_count_raw = (
        rec.get("datos_hogar/hogar_count")
        or rec.get("control_entrevista/in12")
    )
    mapped["hogar_count_raw"] = hogar_count_raw
    mapped["hogar_count_declared"] = to_int(hogar_count_raw)
    hogares = rec.get("datos_hogar/hogar") or []
    mapped["hogares_actual_len"] = len(hogares) if isinstance(hogares, list) else 0
    mapped["flag_hogar_count_mismatch"] = (
        mapped["hogar_count_declared"] != mapped["hogares_actual_len"]
    )

    total_persons = 0
    integrantes_mismatch = []
    productos_total = 0
    situ_hogs: list[str] = []

    if isinstance(hogares, list):
        for i, h in enumerate(hogares):
            ic = to_int(
                h.get("datos_hogar/hogar/integrantes_hogar_count")
                or h.get("integrantes_hogar_count")
                or 0
            )
            actual_len = len(
                h.get("datos_hogar/hogar/integrantes_hogar")
                or h.get("integrantes_hogar")
                or []
            )
            total_persons += ic if ic else actual_len
            if ic != actual_len:
                integrantes_mismatch.append(
                    {"hogar_index": i, "declared": ic, "actual": actual_len}
                )
            productos_total += to_int(
                h.get("datos_hogar/hogar/productos_22/productos_count")
                or h.get("productos_22/productos_count")
                or 0
            )
            hs = h.get("datos_hogar/hogar/E2") or h.get("situacion_hogar")
            if hs is not None:
                situ_hogs.append(str(hs))

    mapped["situacion_hogar"] = ", ".join(situ_hogs)
    mapped["total_persons"] = total_persons
    mapped["integrantes_mismatch"] = integrantes_mismatch
    mapped["productos_total"] = productos_total

    # Resumen de flags para el consumidor
    mapped["flags"] = {
        "distance_gt_500m": mapped["flag_distance_gt_500m"],
        "short_duration": mapped["flag_short_duration"],
        "hogar_count_mismatch": mapped["flag_hogar_count_mismatch"],
        "integrantes_mismatch": len(integrantes_mismatch) > 0,
    }

    # Metadatos de envío
    mapped["_id"] = rec.get("_id")
    mapped["_submitted_by"] = rec.get("_submitted_by")

    return mapped

def filter_record(rec: dict) -> dict:
    """
    Elimina campos innecesarios del registro crudo de Kobo para reducir el tamaño del JSON.
    Solo mantiene los campos que el frontend o la normalización necesitan.
    """
    # 1. Campos de primer nivel que queremos mantener
    allowed_top_keys = {
        "S0/cedula_encuestador", "S0/s0_nombreapellido",
        "start", "end", "today", "_submission_time", "_uuid", "_id", "_submitted_by", "_geolocation",
        "start-geopoint", "start_geopoint", "end-geopoint", "end_geopoint",
        "S1/ent", "S1/mun", "S1/par", "S1/nodo", "S1/cpoblado", "S1/segmento", "S1/sector", "S1/manzana", 
        "S1/parcela", "S1/Edificaci_n", "S1/edificacion", "S1/unidad", "S1/Uso_de_la_Unidad_inmobiliaria", 
        "S1/P_nomsect", "S1/direccion", "S1/ubicacion", "S1/lado_manz",
        "group_segmeto_sector/segmento", "group_segmeto_sector/sector",
        "S1/group_segmeto_sector/segmento", "S1/group_segmeto_sector/sector",
        "group_sh53u78/fecha_actual", "group_sh53u78/semana", "group_sh53u78/control", "group_sh53u78/lote", 
        "group_sh53u78/n_linea", "group_sh53u78/n_serie", "group_sh53u78/ubicacion_i",
        "Condici_n_de_ocupaci_n/ingresada", "Condici_n_de_ocupaci_n/condicion_de_ocupacion", 
        "Condici_n_de_ocupaci_n/situacion_vivienda",
        "ubicacion_final/observaciones", "ubicacion_final/fecha_entrevista_1", "ubicacion_final/nota", 
        "ubicacion_final/hora_fin", "ubicacion_final/hora_f", "hora_f", "ubicacion_final/ubicacion_f", "ubicacion_f",
        "control_entrevista/in12",
        "lista_hogar", # EHM
        "datos_hogar/hogar", "datos_hogar/hogar_count", # ESCA
        "_backend_meta" # Nuestro enriquecimiento
    }

    filtered = {}
    for k, v in rec.items():
        if k in allowed_top_keys:
            filtered[k] = v
        else:
            # Solo hacemos lower() si no está en las claves permitidas fijas
            kl = k.lower()
            if "evaluacion" in kl or "evaluador" in kl or "supervision" in kl:
                filtered[k] = v

    # 2. Filtrar dentro de los grupos repetitivos (Hogares)
    # ESCA
    if "datos_hogar/hogar" in filtered and isinstance(filtered["datos_hogar/hogar"], list):
        new_hogares = []
        for h in filtered["datos_hogar/hogar"]:
            h_filtered = {}
            # Campos nivel hogar
            h_keys = ["datos_hogar/hogar/semana_h", "datos_hogar/hogar/control_h", "datos_hogar/hogar/E2", 
                      "datos_hogar/hogar/integrantes_hogar_count", "datos_hogar/hogar/integrantes_hogar",
                      "datos_hogar/hogar/productos_22/arranque", "datos_hogar/hogar/productos_22/productos", 
                      "datos_hogar/hogar/productos_22/productos_count", "situacion_hogar"]
            for hk in h_keys:
                if hk in h: h_filtered[hk] = h[hk]
            
            # Filtrar productos (Solo nos importa si hay productos y cuántos)
            if "datos_hogar/hogar/productos_22/productos" in h and isinstance(h["datos_hogar/hogar/productos_22/productos"], list):
                # Reemplazamos la lista pesada por una lista de objetos vacíos para mantener .length en el frontend
                # y preservar la lógica de alert-engine.js
                h_filtered["datos_hogar/hogar/productos_22/productos"] = [{} for _ in h["datos_hogar/hogar/productos_22/productos"]]
            
            # Filtrar integrantes
            if "datos_hogar/hogar/integrantes_hogar" in h and isinstance(h["datos_hogar/hogar/integrantes_hogar"], list):
                new_ints = []
                for m in h["datos_hogar/hogar/integrantes_hogar"]:
                    m_filtered = {}
                    # Mantener solo sexo e ingreso para el motor de alertas y demografía
                    for mk, mv in m.items():
                        if mk.endswith("/sexo") or mk == "sexo" or \
                           mk.endswith("/cuanto_actividad") or \
                           mk.endswith("/integrantes_hogar_count"):
                            m_filtered[mk] = mv
                    new_ints.append(m_filtered)
                h_filtered["datos_hogar/hogar/integrantes_hogar"] = new_ints
            
            new_hogares.append(h_filtered)
        filtered["datos_hogar/hogar"] = new_hogares

    # EHM
    if "lista_hogar" in filtered and isinstance(filtered["lista_hogar"], list):
        new_hogares_ehm = []
        for h in filtered["lista_hogar"]:
            h_filtered = {}
            h_keys = ["lista_hogar/lista_miembros", "lista_hogar/personas_hogar", "lista_hogar/lista_miembros_count"]
            for hk in h_keys:
                if hk in h: h_filtered[hk] = h[hk]
            
            if "lista_hogar/lista_miembros" in h_filtered and isinstance(h_filtered["lista_hogar/lista_miembros"], list):
                new_ints = []
                for m in h_filtered["lista_hogar/lista_miembros"]:
                    m_filtered = {}
                    for mk, mv in m.items():
                        if mk.endswith("/sexo") or mk == "sexo":
                            m_filtered[mk] = mv
                    new_ints.append(m_filtered)
                h_filtered["lista_hogar/lista_miembros"] = new_ints
            new_hogares_ehm.append(h_filtered)
        filtered["lista_hogar"] = new_hogares_ehm

    return filtered
