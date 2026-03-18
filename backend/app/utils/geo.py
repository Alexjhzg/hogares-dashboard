import math

def parse_geopoint(s: str) -> tuple[float, float] | None:
    """Parsea un string 'lat lon [alt precision]' y devuelve (lat, lon)."""
    if not s or not isinstance(s, str):
        return None
    parts = s.strip().split()
    try:
        return (float(parts[0]), float(parts[1]))
    except Exception:
        return None

def haversine_meters(a: tuple[float, float], b: tuple[float, float]) -> float | None:
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
