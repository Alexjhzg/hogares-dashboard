import sys
import os

from app.services.upcaster import upcaster_chain, SchemaVersionDetector
from app.services.normalization import normalize_record

def test_upcasting_pipeline():
    print("🧪 Iniciando pruebas sintéticas de Upcasting (V1 -> V4)...")

    # 1. Payload Legacy V1 (Plano sin slashes)
    v1_payload = {
        "cedula": "12345678",
        "nombre": "Encuestador V1",
        "entidad": "Monagas",
        "municipio": "Maturin",
        "segmento": "010",
        "control": "0001",
        "linea": "0001",
        "serie": "100"
    }

    # 2. Payload V2 (Estructura Kobo estándar S0/S1)
    v2_payload = {
        "S0/cedula_encuestador": "87654321",
        "S0/s0_nombreapellido": "Encuestador V2",
        "S1/ent": "Monagas",
        "S1/mun": "Maturin",
        "S1/segmento": "020",
        "group_sh53u78/control": "0002",
        "group_sh53u78/n_linea": "0002",
        "group_sh53u78/n_serie": "200"
    }

    # 3. Payload V3 (Variantes de grupos ESCA V3 / EHM)
    v3_payload = {
        "S0/cedula_encuestador": "11223344",
        "S0/s0_nombreapellido": "Encuestador V3",
        "S1/ent": "Monagas",
        "group_segmeto_sector/segmento": "030",
        "group_sh53u78/control": "0003",
        "group_sh53u78/n_linea": "0003",
        "group_sh53u78/n_serie": "300"
    }

    # 4. Payload V4 (Nueva versión de formulario Kobo con prefijos v4_)
    v4_payload = {
        "v4_encuestador_cedula": "99887766",
        "v4_encuestador_nombre": "Encuestador V4",
        "v4_segmento": "040",
        "v4_control": "0004",
        "v4_linea": "0004",
        "v4_serie": "400",
        "v4_condicion_ocupacion": "ocupada_con_ocupantes_presentes",
        "v4_ingresada": "1"
    }

    payloads = [
        ("V1 Legacy", v1_payload, "12345678", "010", "0001"),
        ("V2 Kobo", v2_payload, "87654321", "020", "0002"),
        ("V3 Grouped", v3_payload, "11223344", "030", "0003"),
        ("V4 New Form", v4_payload, "99887766", "040", "0004"),
    ]

    for name, raw, exp_ced, exp_seg, exp_ctrl in payloads:
        detected = SchemaVersionDetector.detect_version(raw)
        upcast = upcaster_chain.upcast_record(raw)
        normalized = normalize_record(raw)

        assert upcast["__schema_version"] == 4, f"[{name}] Falló versión final canónica"
        assert normalized["cedula_encuestador"] == exp_ced, f"[{name}] Cédula no coincide: {normalized['cedula_encuestador']} vs {exp_ced}"
        assert normalized["segmento"] == exp_seg, f"[{name}] Segmento no coincide: {normalized['segmento']} vs {exp_seg}"
        assert normalized["control"] == exp_ctrl, f"[{name}] Control no coincide: {normalized['control']} vs {exp_ctrl}"

        print(f"  ✅ [{name}] Detectado como V{detected} -> Transformado exitosamente a V4 Canónico ({normalized['cedula_encuestador']} | Seg: {normalized['segmento']} | Ctrl: {normalized['control']})")

    print("\n🎉 Todas las pruebas sintéticas de Upcasting se completaron con ÉXITO.")

if __name__ == "__main__":
    test_upcasting_pipeline()
