from abc import ABC, abstractmethod
from typing import Dict, Any, List

class BaseUpcaster(ABC):
    @property
    @abstractmethod
    def source_version(self) -> int:
        pass

    @property
    @abstractmethod
    def target_version(self) -> int:
        pass

    @abstractmethod
    def upcast(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        pass


class SchemaVersionDetector:
    """
    Detecta la versión del esquema de la encuesta inspeccionando
    metadatos explícitos o huellas estructurales del JSON crudo.
    """
    @staticmethod
    def detect_version(payload: Dict[str, Any]) -> int:
        # 1. Metadato explícito
        explicit_version = (
            payload.get("__schema_version")
            or payload.get("schema_version")
            or payload.get("_version")
        )
        if explicit_version is not None:
            try:
                return int(explicit_version)
            except (ValueError, TypeError):
                pass

        # 2. Huellas estructurales de V4 (Claves v4_ o esquema v4 explícito)
        v4_keys = {"v4_encuestador_cedula", "v4_segmento", "v4_control", "v4_condicion_ocupacion"}
        if any(k in payload for k in v4_keys):
            return 4

        # 3. Huellas estructurales de V3 (Grupos de encuestas ampliadas ESCA V3 / EHM)
        v3_keys = {"group_segmeto_sector/segmento", "S1/group_segmeto_sector/segmento", "datos_hogar/hogar", "lista_hogar"}
        if any(k in payload for k in v3_keys):
            return 3

        # 4. Huellas estructurales de V2 (Prefijos Kobo estándar S0/, S1/, group_sh53u78/)
        v2_keys = {"S0/cedula_encuestador", "S1/segmento", "S1/ent", "group_sh53u78/control"}
        if any(k in payload for k in v2_keys):
            return 2

        # 5. Si es un JSON plano legacy sin namespaces ni slashes, se asume V1
        v1_keys = {"cedula_encuestador", "cedula", "segmento", "control", "n_linea", "n_serie"}
        if any(k in payload for k in v1_keys):
            return 1

        # Por defecto si no se reconoce la firma, asumir V3 (esquema Kobo actual prevalente)
        return 3


class V1ToV2Upcaster(BaseUpcaster):
    """
    Mapea esquemas planos legados (V1) a la estructura con espacios de nombres de Kobo (V2).
    """
    @property
    def source_version(self) -> int:
        return 1

    @property
    def target_version(self) -> int:
        return 2

    def upcast(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        rec = dict(payload)
        
        # Mapeos S0 (Encuestador)
        if "S0/cedula_encuestador" not in rec:
            rec["S0/cedula_encuestador"] = rec.get("cedula_encuestador") or rec.get("cedula") or rec.get("v4_encuestador_cedula")
        if "S0/s0_nombreapellido" not in rec:
            rec["S0/s0_nombreapellido"] = (
                rec.get("S0/_xm_s0_nombreapellido")
                or rec.get("_xm_cod_nom_y_ape")
                or rec.get("v4_encuestador_nombre")
                or rec.get("nombre_encuestador")
                or rec.get("nombre")
            )

        # Mapeos S1 (Ubicación / Cartografía)
        if "S1/ent" not in rec and "entidad" in rec:
            rec["S1/ent"] = rec.get("entidad")
        if "S1/mun" not in rec and "municipio" in rec:
            rec["S1/mun"] = rec.get("municipio")
        if "S1/par" not in rec and "parroquia" in rec:
            rec["S1/par"] = rec.get("parroquia")
        if "S1/nodo" not in rec and "nodo" in rec:
            rec["S1/nodo"] = rec.get("nodo")
        if "S1/cpoblado" not in rec and "centro_poblado" in rec:
            rec["S1/cpoblado"] = rec.get("centro_poblado")
        if "S1/segmento" not in rec and "segmento" in rec:
            rec["S1/segmento"] = rec.get("segmento")
        if "S1/sector" not in rec and "sector" in rec:
            rec["S1/sector"] = rec.get("sector")
        if "S1/manzana" not in rec and "manzana" in rec:
            rec["S1/manzana"] = rec.get("manzana")
        if "S1/parcela" not in rec and "parcela" in rec:
            rec["S1/parcela"] = rec.get("parcela")
        if "S1/Edificaci_n" not in rec and ("edificacion" in rec or "edificacio_n" in rec):
            rec["S1/Edificaci_n"] = rec.get("edificacion") or rec.get("edificacio_n")
        if "S1/unidad" not in rec and "unidad_inmobiliaria" in rec:
            rec["S1/unidad"] = rec.get("unidad_inmobiliaria")

        # Mapeos Control de Campo
        if "group_sh53u78/fecha_actual" not in rec and ("fecha_actual" in rec or "fecha" in rec):
            rec["group_sh53u78/fecha_actual"] = rec.get("fecha_actual") or rec.get("fecha")
        if "group_sh53u78/semana" not in rec and ("semana" in rec or "semana_raw" in rec):
            rec["group_sh53u78/semana"] = rec.get("semana") or rec.get("semana_raw")
        if "group_sh53u78/control" not in rec and "control" in rec:
            rec["group_sh53u78/control"] = rec.get("control")
        if "group_sh53u78/lote" not in rec and "lote" in rec:
            rec["group_sh53u78/lote"] = rec.get("lote")
        if "group_sh53u78/n_linea" not in rec and ("n_linea" in rec or "linea" in rec):
            rec["group_sh53u78/n_linea"] = rec.get("n_linea") or rec.get("linea")
        if "group_sh53u78/n_serie" not in rec and ("n_serie" in rec or "serie" in rec):
            rec["group_sh53u78/n_serie"] = rec.get("n_serie") or rec.get("serie")

        rec["__schema_version"] = 2
        return rec


class V2ToV3Upcaster(BaseUpcaster):
    """
    Mapea variaciones de la versión V2 a V3 (Encuestas ampliadas ESCA V3 / EHM).
    """
    @property
    def source_version(self) -> int:
        return 2

    @property
    def target_version(self) -> int:
        return 3

    def upcast(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        rec = dict(payload)

        # Unificación de segmento y sector en grupos de V3
        if "S1/segmento" not in rec:
            seg = rec.get("group_segmeto_sector/segmento") or rec.get("S1/group_segmeto_sector/segmento")
            if seg:
                rec["S1/segmento"] = seg

        if "S1/sector" not in rec:
            sec = rec.get("group_segmeto_sector/sector") or rec.get("S1/group_segmeto_sector/sector")
            if sec:
                rec["S1/sector"] = sec

        # Unificación de horario de cierre de formulario
        if "ubicacion_final/hora_fin" not in rec:
            h_fin = rec.get("ubicacion_final/hora_f") or rec.get("hora_f")
            if h_fin:
                rec["ubicacion_final/hora_fin"] = h_fin

        rec["__schema_version"] = 3
        return rec


class V3ToV4Upcaster(BaseUpcaster):
    """
    Transforma la versión V3 a la versión canónica V4 más reciente.
    Mapea campos renombrados con prefijos v4_ y garantiza consistencia total.
    """
    @property
    def source_version(self) -> int:
        return 3

    @property
    def target_version(self) -> int:
        return 4

    def upcast(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        rec = dict(payload)

        # Mapeos de campos v4_ si provienen de la nueva versión de formulario Kobo
        if "v4_encuestador_cedula" in rec and "S0/cedula_encuestador" not in rec:
            rec["S0/cedula_encuestador"] = rec.get("v4_encuestador_cedula")

        if "v4_encuestador_nombre" in rec and "S0/s0_nombreapellido" not in rec:
            rec["S0/s0_nombreapellido"] = rec.get("v4_encuestador_nombre")

        if "v4_segmento" in rec and "S1/segmento" not in rec:
            rec["S1/segmento"] = rec.get("v4_segmento")

        if "v4_sector" in rec and "S1/sector" not in rec:
            rec["S1/sector"] = rec.get("v4_sector")

        # Mapeos cartográficos V4 (S1/S2 y S1/S3)
        if "S1/mun" not in rec and "S1/S2/mun" in rec:
            rec["S1/mun"] = rec.get("S1/S2/mun")
        if "S1/par" not in rec and "S1/S2/par" in rec:
            rec["S1/par"] = rec.get("S1/S2/par")
        if "S1/nodo" not in rec and "S1/S2/nodo" in rec:
            rec["S1/nodo"] = rec.get("S1/S2/nodo")
        if "S1/cpoblado" not in rec and "S1/S2/cpoblado" in rec:
            rec["S1/cpoblado"] = rec.get("S1/S2/cpoblado")

        if "S1/manzana" not in rec and "S1/S3/manzana" in rec:
            rec["S1/manzana"] = rec.get("S1/S3/manzana")
        if "S1/lado_manz" not in rec and "S1/S3/lado_manz" in rec:
            rec["S1/lado_manz"] = rec.get("S1/S3/lado_manz")
        if "S1/parcela" not in rec and "S1/S3/parcela" in rec:
            rec["S1/parcela"] = rec.get("S1/S3/parcela")
        if "S1/Edificaci_n" not in rec and "S1/S3/edificacion" in rec:
            rec["S1/Edificaci_n"] = rec.get("S1/S3/edificacion")
        if "S1/unidad" not in rec and "S1/S3/unidad" in rec:
            rec["S1/unidad"] = rec.get("S1/S3/unidad")
        if "S1/P_nomsect" not in rec and "S1/S3/sector_1" in rec:
            rec["S1/P_nomsect"] = rec.get("S1/S3/sector_1")

        # Control, semana y línea (compatibilidad V4 / datos_mm111 / meta/instanceName)
        if "group_sh53u78/control" not in rec:
            ctrl = rec.get("v4_control") or rec.get("datos_mm111/control")
            if not ctrl and rec.get("meta/instanceName"):
                parts = str(rec.get("meta/instanceName")).split("-")
                if len(parts) >= 4 and parts[1].isdigit():
                    ctrl = parts[1]
            if ctrl:
                rec["group_sh53u78/control"] = ctrl

        if "group_sh53u78/semana" not in rec:
            sem = rec.get("v4_semana") or rec.get("datos_mm111/semana")
            if sem:
                rec["group_sh53u78/semana"] = sem

        if "group_sh53u78/n_linea" not in rec:
            lin = rec.get("v4_linea") or rec.get("datos_mm111/n_linea")
            if not lin and rec.get("meta/instanceName"):
                parts = str(rec.get("meta/instanceName")).split("-")
                if len(parts) >= 4 and parts[2].isdigit():
                    lin = parts[2]
            if lin:
                rec["group_sh53u78/n_linea"] = lin

        if "v4_serie" in rec and "group_sh53u78/n_serie" not in rec:
            rec["group_sh53u78/n_serie"] = rec.get("v4_serie")

        if "v4_condicion_ocupacion" in rec and "Condici_n_de_ocupaci_n/condicion_de_ocupacion" not in rec:
            rec["Condici_n_de_ocupaci_n/condicion_de_ocupacion"] = rec.get("v4_condicion_ocupacion")

        if "v4_ingresada" in rec and "Condici_n_de_ocupaci_n/ingresada" not in rec:
            rec["Condici_n_de_ocupaci_n/ingresada"] = rec.get("v4_ingresada")

        # Marcar versión canónica final V4
        rec["__schema_version"] = 4
        return rec


class UpcasterChain:
    """
    Cadena de ejecución de Upcasting. Detecta la versión del payload y
    lo transforma progresivamente hasta alcanzar la versión canónica V4.
    """
    CANONICAL_VERSION = 4

    def __init__(self):
        self.upcasters: List[BaseUpcaster] = [
            V1ToV2Upcaster(),
            V2ToV3Upcaster(),
            V3ToV4Upcaster(),
        ]

    def upcast_record(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        if not isinstance(payload, dict):
            return payload

        current_version = SchemaVersionDetector.detect_version(payload)
        record = dict(payload)

        # Aplicar secuencialmente los upcasters requeridos
        for upcaster in self.upcasters:
            if current_version == upcaster.source_version and current_version < self.CANONICAL_VERSION:
                record = upcaster.upcast(record)
                current_version = upcaster.target_version

        # Garantizar mapeos v4_ si el payload ya venía marcado como V4
        record = V3ToV4Upcaster().upcast(record)

        record["__schema_version"] = self.CANONICAL_VERSION
        return record


# Instancia singleton para su uso en toda la aplicación
upcaster_chain = UpcasterChain()
