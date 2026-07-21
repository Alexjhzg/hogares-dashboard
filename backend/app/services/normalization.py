from datetime import datetime
from app.utils.geo import parse_geopoint, haversine_meters, extract_precision
from app.services.spatial_validator import spatial_validator
from app.services.upcaster import upcaster_chain

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
    Aplica primero el patrón Upcasting (V1-V3 -> V4 Canónico).
    """
    rec = upcaster_chain.upcast_record(rec)
    mapped: dict = {}

    # Encuestador
    cedula_enc = (
        rec.get("S0/cedula_encuestador")
        or rec.get("v4_encuestador_cedula")
        or rec.get("cedula_encuestador")
    )
    raw_nom = (
        rec.get("S0/s0_nombreapellido")
        or rec.get("S0/_xm_s0_nombreapellido")
        or rec.get("_xm_cod_nom_y_ape")
        or rec.get("v4_encuestador_nombre")
        or rec.get("nombre_encuestador")
    )
    
    enc_catalog = {
        "12151751": "Euclides Caraballo",
        "13476080": "Neida Gimón",
        "17695927": "Oneida Bárcena",
        "22719373": "Jhosel Torres",
        "28474258": "Alines Rodríguez",
        "13293815": "Encuestador INE 13293815",
        "29879307": "Encuestador 29879307",
        "16700495": "Encuestador 16700495",
        "17068499": "Encuestador 17068499",
        "10832440": "Gómez Blanco Henry José",
        "11441770": "Gómez Ordaz Yusbelly Josefina",
        "20310102": "Campos Guateima Francheska del Jesús",
        "26532999": "Rodríguez González Jorge Luis",
        "26786495": "Hernández Villarroel Salvador Augusto"
    }

    mapped["cedula_encuestador"] = cedula_enc
    if raw_nom and str(raw_nom).strip() and str(raw_nom).strip().lower() != "desconocido":
        mapped["nombre_encuestador"] = str(raw_nom).strip()
    elif cedula_enc and str(cedula_enc).strip() in enc_catalog:
        mapped["nombre_encuestador"] = enc_catalog[str(cedula_enc).strip()]
    elif cedula_enc and str(cedula_enc).strip():
        mapped["nombre_encuestador"] = f"Encuestador {str(cedula_enc).strip()}"
    else:
        mapped["nombre_encuestador"] = None

    # Ubicación geográfica
    mapped["entidad"] = rec.get("S1/ent") or rec.get("datos_mm111/ent")
    mapped["municipio"] = rec.get("S1/mun") or rec.get("S1/S2/mun")
    mapped["parroquia"] = rec.get("S1/par") or rec.get("S1/S2/par")
    mapped["nodo"] = rec.get("S1/nodo") or rec.get("S1/S2/nodo")
    mapped["centro_poblado"] = rec.get("S1/cpoblado") or rec.get("S1/S2/cpoblado")

    # Manzana
    mapped["segmento"] = rec.get("S1/segmento") or rec.get("S1/group_segmeto_sector/segmento") or rec.get("group_segmeto_sector/segmento")
    mapped["sector"] = rec.get("S1/sector") or rec.get("S1/group_segmeto_sector/sector") or rec.get("group_segmeto_sector/sector")
    mapped["manzana"] = rec.get("S1/manzana") or rec.get("S1/S3/manzana")
    mapped["lado_manz"] = rec.get("S1/lado_manz") or rec.get("S1/S3/lado_manz")
    mapped["parcela"] = rec.get("S1/parcela") or rec.get("S1/S3/parcela")
    mapped["edificacion"] = rec.get("S1/Edificaci_n") or rec.get("S1/edificacion") or rec.get("S1/S3/edificacion")
    mapped["unidad_inmobiliaria"] = rec.get("S1/unidad") or rec.get("S1/S3/unidad")
    mapped["uso_unidad_inmobiliaria"] = rec.get("S1/Uso_de_la_Unidad_inmobiliaria")
    mapped["nombre_sector"] = rec.get("S1/P_nomsect") or rec.get("S1/S3/sector_1") or rec.get("S1/S3/GP10_0b")

    # Control de levantamiento
    mapped["fecha_actual"] = rec.get("group_sh53u78/fecha_actual")
    semana_raw = rec.get("group_sh53u78/semana") or rec.get("datos_mm111/semana") or rec.get("datos_hogar/hogar/semana_h")
    mapped["semana_raw"] = semana_raw
    mapped["semana_short"] = semana_raw[-2:] if semana_raw and len(semana_raw) >= 2 else None
    
    ctrl_val = rec.get("group_sh53u78/control") or rec.get("datos_mm111/control") or rec.get("datos_hogar/hogar/control_h")
    if not ctrl_val and rec.get("meta/instanceName"):
        parts = str(rec.get("meta/instanceName")).split("-")
        if len(parts) >= 4 and parts[1].isdigit():
            ctrl_val = parts[1]
    mapped["control"] = ctrl_val

    mapped["lote"] = rec.get("group_sh53u78/lote")
    
    linea_val = rec.get("group_sh53u78/n_linea") or rec.get("datos_mm111/n_linea")
    if not linea_val and rec.get("meta/instanceName"):
        parts = str(rec.get("meta/instanceName")).split("-")
        if len(parts) >= 4 and parts[2].isdigit():
            linea_val = parts[2]
    mapped["n_linea"] = linea_val
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

    # ── VALIDACIÓN ESPACIAL AVANZADA (Shapely) ──────────────────────────────
    # 1. Detectar segmento real basado en GPS (usamos end_pt que suele ser la ubicación i/f)
    real_seg = None
    dist_to_control = None
    
    check_pt = end_pt or start_pt
    if check_pt:
        real_seg = spatial_validator.find_segment(check_pt[0], check_pt[1])
        
        # 2. Distancia al punto de control teórico
        ctrl = mapped.get("control")
        serie = mapped.get("n_serie")
        linea = mapped.get("n_linea")
        if ctrl and serie and linea:
            control_info = spatial_validator.get_control_point(ctrl, serie, linea)
            if control_info:
                dist_to_control = spatial_validator.calculate_distance_to_control(
                    check_pt[0], check_pt[1], control_info
                )

    mapped["real_segment_properties"] = real_seg
    mapped["distance_to_control"] = dist_to_control
    
    # Flags de integridad espacial
    mapped["flag_wrong_segment"] = False
    if real_seg:
        # Comparar con lo declarado (considerando normalización de ceros)
        declared_seg = str(mapped.get("segmento") or mapped.get("sector") or "").strip().zfill(3)
        real_seg_id = str(real_seg.get("COD_SEG") or real_seg.get("cod_seg") or "").strip().zfill(3)
        if declared_seg != "000" and real_seg_id != "000" and declared_seg != real_seg_id:
            mapped["flag_wrong_segment"] = True
    
    mapped["flag_far_from_control"] = dist_to_control is not None and dist_to_control > 600 # 600m threshold

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

    # Hogares y personas (Soporta ESCA/EHM V1-V3 y V4)
    hogar_count_raw = (
        rec.get("datos_hogar/hogar_count")
        or rec.get("control_entrevista/in12")
        or rec.get("control_de_la_entrevista/in12")
    )
    mapped["hogar_count_raw"] = hogar_count_raw
    mapped["hogar_count_declared"] = to_int(hogar_count_raw)
    hogares = rec.get("datos_hogar/hogar") or rec.get("lista_hogar") or []
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
                or h.get("lista_hogar/lista_miembros_count")
                or h.get("lista_miembros_count")
                or 0
            )
            miembros_list = (
                h.get("datos_hogar/hogar/integrantes_hogar")
                or h.get("integrantes_hogar")
                or h.get("lista_hogar/lista_miembros")
                or h.get("lista_miembros")
                or []
            )
            actual_len = len(miembros_list) if isinstance(miembros_list, list) else 0
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
        "wrong_segment": mapped.get("flag_wrong_segment", False),
        "far_from_control": mapped.get("flag_far_from_control", False),
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
        "S1/S2/mun", "S1/S2/par", "S1/S2/nodo", "S1/S2/cpoblado",
        "S1/S3/manzana", "S1/S3/lado_manz", "S1/S3/parcela", "S1/S3/edificacion", "S1/S3/unidad", "S1/S3/sector_1", "S1/S3/GP10_0b",
        "group_segmeto_sector/segmento", "group_segmeto_sector/sector",
        "S1/group_segmeto_sector/segmento", "S1/group_segmeto_sector/sector",
        "group_sh53u78/fecha_actual", "group_sh53u78/semana", "group_sh53u78/control", "group_sh53u78/lote", 
        "group_sh53u78/n_linea", "group_sh53u78/n_serie", "group_sh53u78/ubicacion_i",
        "Condici_n_de_ocupaci_n/ingresada", "Condici_n_de_ocupaci_n/condicion_de_ocupacion", 
        "Condici_n_de_ocupaci_n/situacion_vivienda", "Condici_n_de_ocupaci_n/vivienda_ocupada01",
        "ubicacion_final/observaciones", "ubicacion_final/fecha_entrevista_1", "ubicacion_final/nota", 
        "ubicacion_final/hora_fin", "ubicacion_final/hora_f", "hora_f", "ubicacion_final/ubicacion_f", "ubicacion_f",
        "control_entrevista/in12",
        "control_entrevista/nombre_informante",
        "control_de_la_entrevista/nombre_informante",
        "control_de_la_entrevista/in10",
        "control_de_la_entrevista/in11",
        "control_entrevista/in10",
        "control_entrevista/in11",
        "datos_mm111/control",
        "datos_mm111/semana",
        "datos_mm111/n_linea",
        "datos_mm111/ent",
        "datos_mm111/concatenar_mm",
        "meta/instanceName",
        "lista_hogar", # EHM
        "datos_hogar/hogar", "datos_hogar/hogar_count", # ESCA
        "_backend_meta", # Nuestro enriquecimiento base
        "_geo_meta" # Nuestro enriquecimiento geoespacial
    }

    filtered = {}
    for k, v in rec.items():
        if k in allowed_top_keys or k.startswith("S1/G_P9/"):
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
