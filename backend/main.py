import os
import math
from datetime import datetime

import httpx
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from dotenv import load_dotenv

load_dotenv()

# ---------------------------------------------------------------------------
# Configuración
# ---------------------------------------------------------------------------
KOBO_API_TOKEN: str = os.getenv("KOBO_API_TOKEN", "")
KOBO_BASE_URL: str = os.getenv("KOBO_BASE_URL", "").rstrip("/")

# ALLOWED_ORIGINS puede definirse en .env como lista separada por comas, p.ej.:
#   ALLOWED_ORIGINS=http://localhost:8000,http://127.0.0.1:8000
# Si no está definida, sólo se permite localhost:8000 (más seguro que "*").
_raw_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:8000,http://127.0.0.1:8000")
ALLOWED_ORIGINS: list[str] = [o.strip() for o in _raw_origins.split(",") if o.strip()]

AUTH_HEADERS = {"Authorization": f"Token {KOBO_API_TOKEN}"}

# ---------------------------------------------------------------------------
# FastAPI app
# ---------------------------------------------------------------------------
app = FastAPI(title="KoboToolbox API Proxy")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------------------------
# Utilidades de normalización / cálculo
# ---------------------------------------------------------------------------

def parse_geopoint(s: str):
    """Parsea un string 'lat lon [alt precision]' y devuelve (lat, lon)."""
    if not s or not isinstance(s, str):
        return None
    parts = s.strip().split()
    try:
        return (float(parts[0]), float(parts[1]))
    except Exception:
        return None


def haversine_meters(a, b) -> float | None:
    """Distancia en metros entre dos pares (lat, lon) — fórmula Haversine."""
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


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@app.get("/api/assets")
async def get_assets():
    """Lista de formularios (assets) disponibles en KoboToolbox."""
    async with httpx.AsyncClient(timeout=30) as client:
        try:
            response = await client.get(
                f"{KOBO_BASE_URL}/assets/?format=json",
                headers=AUTH_HEADERS,
            )
            response.raise_for_status()
            return response.json().get("results", [])
        except httpx.RequestError as e:
            raise HTTPException(status_code=502, detail=f"Error al contactar Kobo: {e}")
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=str(e))


@app.get("/api/data/{asset_uid}")
async def get_asset_data(asset_uid: str):
    """
    Descarga TODAS las respuestas de un formulario, siguiendo la paginación
    automáticamente para no truncar resultados en encuestas grandes.
    """
    first_url = f"{KOBO_BASE_URL}/assets/{asset_uid}/data/?format=json"

    async with httpx.AsyncClient(timeout=60) as client:
        try:
            # Obtenemos la primera página para conocer count y next
            first_response = await client.get(first_url, headers=AUTH_HEADERS)
            first_response.raise_for_status()
            first_payload = first_response.json()

            total_count: int = first_payload.get("count", 0)
            results: list[dict] = list(first_payload.get("results", []))

            # Iterar páginas restantes si las hay
            next_url: str | None = first_payload.get("next")
            while next_url:
                page_resp = await client.get(next_url, headers=AUTH_HEADERS)
                page_resp.raise_for_status()
                page_payload = page_resp.json()
                results.extend(page_payload.get("results", []))
                next_url = page_payload.get("next")

            return {
                "count": total_count,
                "fetched": len(results),
                "results": results,
            }

        except httpx.RequestError as e:
            raise HTTPException(status_code=502, detail=f"Error al contactar Kobo: {e}")
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=str(e))


@app.post("/api/normalize")
async def normalize_endpoint(record: dict):
    """
    Normaliza un único registro crudo de Kobo.
    POST un objeto JSON que represente una sumisión.
    """
    try:
        return {"normalized": normalize_record(record)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ---------------------------------------------------------------------------
# Archivos estáticos (frontend) — debe ir después de las rutas de API
# ---------------------------------------------------------------------------
app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
