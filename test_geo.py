import sys
import os
sys.path.append(os.path.join(os.getcwd(), 'backend'))

from app.services.geo_service import geo_engine
record = {"ubicacion_f": "9.74 -63.15"}
res = geo_engine.enrich_survey(record)
print("SUCCESS:", res)
