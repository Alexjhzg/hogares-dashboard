# Mapeo JSON → Sistema

Este documento resume el mapeo de campos desde las respuestas exportadas (Kobo) hacia el modelo interno requerido por la aplicación.

## Campos principales

- Datos del Encuestador
  - `S0/cedula_encuestador` -> `cedula_encuestador`
  - `S0/s0_nombreapellido` -> `nombre_encuestador`

- Ubicación Geográfica
  - `S1/ent` -> `entidad`
  - `S1/mun` -> `municipio`
  - `S1/par` -> `parroquia`
  - `S1/nodo` -> `nodo`
  - `S1/cpoblado` -> `centro_poblado`

- Datos de Manzana
  - `S1/manzana` -> `manzana`
  - `S1/lado_manz` -> `lado_manz`
  - `S1/parcela` -> `parcela`
  - `S1/Edificaci_n` -> `edificacion`
  - `S1/unidad` -> `unidad_inmobiliaria`
  - `S1/Uso_de_la_Unidad_inmobiliaria` -> `uso_unidad_inmobiliaria`
  - `S1/P_nomsect` -> `nombre_sector`

- Control de Levantamiento (group_sh53u78)
  - `group_sh53u78/fecha_actual` -> `fecha_actual`
  - `group_sh53u78/semana` -> `semana` (guardar últimos 2 dígitos en `semana_short`)
  - `group_sh53u78/control` -> `control`
  - `group_sh53u78/lote` -> `lote`
  - `group_sh53u78/n_linea` -> `n_linea`
  - `group_sh53u78/n_serie` -> `n_serie`

- Condición de Ocupación
  - `Condici_n_de_ocupaci_n/ingresada` -> `ingresada` (booleano derivado de valor raw)
  - `Condici_n_de_ocupaci_n/condicion_de_ocupacion` -> `condicion_de_ocupacion` (catálogo)
  - `Condici_n_de_ocupaci_n/situacion_vivienda` -> `situacion_vivienda` (valor crudo que indica la situación de la vivienda; ahora se utiliza en el dashboard para filtrado y aparece como columna en el explorador)
- `datos_hogar/hogar/E2` -> `situacion_hogar` (campo recogido para auditoría; ya no se muestra en el dashboard) 

- Ubicación Final
  - `ubicacion_final/observaciones` -> `observaciones`
  - `ubicacion_final/fecha_entrevista_1` -> `fecha_entrevista`
  - `ubicacion_final/nota` -> `no_respuesta` (booleano)

- Metadatos
  - `_meta` y campos top-level: `start`, `end`, `start-geopoint`, tiempos, `_submitted_by`
  - Conteos: `control_entrevista/in12`, `datos_hogar/hogar_count`, `datos_hogar/hogar[*]/integrantes_hogar_count`, `datos_hogar/hogar[*]/productos_22/productos_count`

## Validaciones y flags

- Distancia entre geopoints: comparar `start-geopoint` y `group_sh53u78/ubicacion_i` (Haversine). Flag si distancia > 500 m.
- Duración de encuesta: calcular minutos entre `start` y `end`. Flag si < 15 min.
- Consistencia de conteos: `hogar_count` vs longitud de `datos_hogar/hogar` y `integrantes_hogar_count` vs longitud de `integrantes_hogar`.

## Notas

- Muchas claves aparecen como claves planas con slashes (Kobo export). El endpoint de normalización debe trabajar sobre la representación plana de la sumisión.
- Mantener el valor raw además del campo normalizado para auditoría y trazabilidad.
