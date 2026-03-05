import math
from datetime import datetime
from typing import Optional, Tuple, Dict, Any, List
import httpx
from fastapi import HTTPException
from app.core.config import settings
from app.models.schemas import NormalizedRecord, KoboFlags

class KoboService:
    @staticmethod
    def parse_geopoint(s: str) -> Optional[Tuple[float, float]]:
        if not s or not isinstance(s, str):
            return None
        parts = s.strip().split()
        try:
            return (float(parts[0]), float(parts[1]))
        except Exception:
            return None

    @staticmethod
    def haversine_meters(a: Optional[Tuple[float, float]], b: Optional[Tuple[float, float]]) -> Optional[float]:
        if not a or not b:
            return None
        lat1, lon1 = a
        lat2, lon2 = b
        phi1, phi2 = math.radians(lat1), math.radians(lat2)
        dphi = math.radians(lat2 - lat1)
        dlambda = math.radians(lon2 - lon1)
        R = 6_371_000
        x = math.sin(dphi / 2) ** 2 + math.cos(phi1) * math.cos(phi2) * math.sin(dlambda / 2) ** 2
        return R * 2 * math.atan2(math.sqrt(x), math.sqrt(1 - x))

    @staticmethod
    def is_truthy_raw(v: Any) -> bool:
        if v is None:
            return False
        vs = str(v).strip().lower()
        return vs not in ("", "no", "no_2", "no_1", "0", "false", "none")

    @classmethod
    def normalize_record(cls, rec: Dict[str, Any]) -> Dict[str, Any]:
        mapped: Dict[str, Any] = {}
        
        # Mapeo básico (simplificado para brevedad, igual a la lógica original)
        mapped["cedula_encuestador"] = rec.get("S0/cedula_encuestador")
        mapped["nombre_encuestador"] = rec.get("S0/s0_nombreapellido")
        mapped["entidad"] = rec.get("S1/ent")
        mapped["municipio"] = rec.get("S1/mun")
        mapped["parroquia"] = rec.get("S1/par")
        mapped["nodo"] = rec.get("S1/nodo")
        mapped["centro_poblado"] = rec.get("S1/cpoblado")
        mapped["manzana"] = rec.get("S1/manzana")
        mapped["lado_manz"] = rec.get("S1/lado_manz")
        mapped["parcela"] = rec.get("S1/parcela")
        mapped["edificacion"] = rec.get("S1/Edificaci_n")
        mapped["unidad_inmobiliaria"] = rec.get("S1/unidad")
        mapped["uso_unidad_inmobiliaria"] = rec.get("S1/Uso_de_la_Unidad_inmobiliaria")
        mapped["nombre_sector"] = rec.get("S1/P_nomsect")
        mapped["fecha_actual"] = rec.get("group_sh53u78/fecha_actual")
        
        semana_raw = rec.get("group_sh53u78/semana") or rec.get("datos_hogar/hogar/semana_h")
        mapped["semana_raw"] = semana_raw
        mapped["semana_short"] = semana_raw[-2:] if semana_raw and len(semana_raw) >= 2 else None
        
        mapped["control"] = rec.get("group_sh53u78/control") or rec.get("datos_hogar/hogar/control_h")
        mapped["lote"] = rec.get("group_sh53u78/lote")
        mapped["n_linea"] = rec.get("group_sh53u78/n_linea")
        mapped["n_serie"] = rec.get("group_sh53u78/n_serie")

        raw_ing = rec.get("Condici_n_de_ocupaci_n/ingresada")
        mapped["ingresada"] = cls.is_truthy_raw(raw_ing)
        mapped["condicion_de_ocupacion"] = rec.get("Condici_n_de_ocupaci_n/condicion_de_ocupacion")
        mapped["situacion_vivienda_raw"] = rec.get("Condici_n_de_ocupaci_n/situacion_vivienda")

        mapped["observaciones"] = rec.get("ubicacion_final/observaciones")
        mapped["fecha_entrevista"] = rec.get("ubicacion_final/fecha_entrevista_1")
        mapped["no_respuesta"] = cls.is_truthy_raw(rec.get("ubicacion_final/nota"))

        # Geolocalización
        start_pt = cls.parse_geopoint(rec.get("start-geopoint") or rec.get("start_geopoint"))
        end_pt = cls.parse_geopoint(rec.get("group_sh53u78/ubicacion_i") or rec.get("end-geopoint") or rec.get("end_geopoint"))
        
        distance_m = cls.haversine_meters(start_pt, end_pt)
        mapped["distance_meters"] = distance_m
        flag_dist = bool(distance_m and distance_m > 500)

        # Duración
        duration_min = None
        flag_short = False
        try:
            start_str = rec.get("start")
            end_str = rec.get("end")
            if start_str and end_str:
                dt_start = datetime.fromisoformat(start_str.replace("Z", "+00:00"))
                dt_end = datetime.fromisoformat(end_str.replace("Z", "+00:00"))
                duration_min = (dt_end - dt_start).total_seconds() / 60.0
                flag_short = duration_min < 15
        except Exception:
            pass
        
        mapped["duration_minutes"] = duration_min

        # Hogares
        hogares = rec.get("datos_hogar/hogar") or []
        declared_count = int(rec.get("datos_hogar/hogar_count") or rec.get("control_entrevista/in12") or 0)
        actual_len = len(hogares) if isinstance(hogares, list) else 0
        flag_hogar_mismatch = declared_count != actual_len

        total_persons = 0
        productos_total = 0
        integrantes_mismatch_flag = False
        if isinstance(hogares, list):
            for h in hogares:
                ic = int(h.get("integrantes_hogar_count") or 0)
                al = len(h.get("integrantes_hogar") or [])
                total_persons += ic if ic else al
                if ic != al: integrantes_mismatch_flag = True
                productos_total += int(h.get("productos_22/productos_count") or 0)

        mapped["total_persons"] = total_persons
        mapped["productos_total"] = productos_total
        
        mapped["flags"] = {
            "distance_gt_500m": flag_dist,
            "short_duration": flag_short,
            "hogar_count_mismatch": flag_hogar_mismatch,
            "integrantes_mismatch": integrantes_mismatch_flag
        }
        
        mapped["_id"] = rec.get("_id")
        mapped["_submitted_by"] = rec.get("_submitted_by")

        return mapped

    @classmethod
    async def fetch_kobo_data(cls, endpoint: str, params: Optional[Dict[str, Any]] = None) -> Any:
        headers = {"Authorization": f"Token {settings.KOBO_API_TOKEN}"}
        async with httpx.AsyncClient(timeout=60) as client:
            try:
                url = f"{settings.KOBO_BASE_URL}/{endpoint}"
                response = await client.get(url, headers=headers, params=params)
                response.raise_for_status()
                return response.json()
            except httpx.HTTPStatusError as e:
                raise HTTPException(status_code=e.response.status_code, detail=str(e))
            except Exception as e:
                raise HTTPException(status_code=502, detail=f"Error al contactar Kobo: {e}")
