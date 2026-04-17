from datetime import datetime
from app.utils.geo import parse_geopoint, haversine_meters

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
            mapped["flag_short_duration"] = mapped["duration_minutes"] < 15
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
