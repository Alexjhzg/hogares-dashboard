import pytest
from app.services.normalization import normalize_record


def make_record(start="2026-02-09T11:52:09.183-04:00", end="2026-02-09T12:07:09.183-04:00", start_geo="9.0 -63.0 0 0", end_geo="9.0 -63.0 0 0"):
    return {
        "_id": 1,
        "S0/cedula_encuestador": "12345",
        "S0/s0_nombreapellido": "Test Encuestador",
        "start": start,
        "end": end,
        "start-geopoint": start_geo,
        "group_sh53u78/ubicacion_i": end_geo,
        "group_sh53u78/semana": "1606",
        "group_sh53u78/control": "16062079",
        "Condici_n_de_ocupaci_n/situacion_vivienda": "consolidada",
        "datos_hogar/hogar_count": "1",
        "datos_hogar/hogar": [
            {
                "datos_hogar/hogar/integrantes_hogar_count": "2",
                "datos_hogar/hogar/integrantes_hogar": [
                    {"datos_hogar/hogar/integrantes_hogar/integrantes/nombre_apellido": "A"},
                    {"datos_hogar/hogar/integrantes_hogar/integrantes/nombre_apellido": "B"},
                ],
                "datos_hogar/hogar/productos_22/productos_count": "3",
                "datos_hogar/hogar/E2": "1",
            }
        ],
        "ubicacion_final/nota": "totalmente",
    }


def test_normal_duration_and_counts():
    rec = make_record()
    out = normalize_record(rec)
    assert out["cedula_encuestador"] == "12345"
    assert out["hogar_count_declared"] == 1
    assert out["hogares_actual_len"] == 1
    assert out["flag_hogar_count_mismatch"] is False
    assert out["total_persons"] == 2
    assert out["productos_total"] == 3
    assert out["flag_short_duration"] is False
    assert out.get("situacion_vivienda_raw") == "consolidada"


def test_short_duration_flag():
    # duration less than 15 min
    rec = make_record(end="2026-02-09T11:56:00.000-04:00")
    out = normalize_record(rec)
    assert out["duration_minutes"] < 15
    assert out["flag_short_duration"] is True


def test_distance_flag():
    # different points ~ > 500m apart
    rec = make_record(start_geo="9.75 -63.13 0 0", end_geo="9.76 -63.14 0 0")
    out = normalize_record(rec)
    assert out["distance_meters"] is not None
    assert isinstance(out["distance_meters"], float)


def test_integrantes_mismatch_flag():
    rec = make_record()
    # tamper declared count
    rec["datos_hogar/hogar"][0]["datos_hogar/hogar/integrantes_hogar_count"] = "5"
    out = normalize_record(rec)
    assert out["integrantes_mismatch"] != []
