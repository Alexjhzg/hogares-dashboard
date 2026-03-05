from pydantic import BaseModel, Field
from typing import List, Optional, Any, Dict

class GeoPoint(BaseModel):
    lat: float
    lon: float

class KoboFlags(BaseModel):
    distance_gt_500m: bool
    short_duration: bool
    hogar_count_mismatch: bool
    integrantes_mismatch: bool

class NormalizedRecord(BaseModel):
    cedula_encuestador: Optional[str] = None
    nombre_encuestador: Optional[str] = None
    entidad: Optional[str] = None
    municipio: Optional[str] = None
    parroquia: Optional[str] = None
    nodo: Optional[str] = None
    centro_poblado: Optional[str] = None
    manzana: Optional[str] = None
    lado_manz: Optional[str] = None
    parcela: Optional[str] = None
    edificacion: Optional[str] = None
    unidad_inmobiliaria: Optional[str] = None
    uso_unidad_inmobiliaria: Optional[str] = None
    nombre_sector: Optional[str] = None
    fecha_actual: Optional[str] = None
    semana_raw: Optional[str] = None
    semana_short: Optional[str] = None
    control: Optional[str] = None
    lote: Optional[str] = None
    n_linea: Optional[str] = None
    n_serie: Optional[str] = None
    ingresada: bool
    condicion_de_ocupacion: Optional[str] = None
    situacion_vivienda_raw: Optional[str] = None
    observaciones: Optional[str] = None
    fecha_entrevista: Optional[str] = None
    no_respuesta: bool
    duration_minutes: Optional[float] = None
    distance_meters: Optional[float] = None
    total_persons: int
    productos_total: int
    flags: KoboFlags
    id: Optional[int] = Field(None, alias="_id")
    submitted_by: Optional[str] = Field(None, alias="_submitted_by")

    class Config:
        populate_by_name = True

class AssetDataResponse(BaseModel):
    count: int
    fetched: int
    results: List[Dict[str, Any]]
