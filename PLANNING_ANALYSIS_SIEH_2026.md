# Análisis de Planificación de Levantamiento de Encuesta SIEH 📋
### Segundo Semestre 2026

Este documento detalla la estructura, métricas y consistencia del archivo de planificación `./PLANIFICACIÓN LEVANTAMIENTO ENCUESTA SIEH 2DO SEMESTRE.xlsx` en relación al catálogo oficial de controles del sistema (`CONTROLES.geojson`).

---

## 1. Resumen Ejecutivo de la Planificación

*   **Total de Controles Planificados**: 224
*   **Total de Viviendas Objetivo a Visitar**: 3350
*   **Promedio de Viviendas por Control**: 14.96 viviendas (mínimo: 0, máximo: 23)
*   **Distribución por Programa**:
    *   **EHM** (Encuesta de Hogares Monagas): 85 controles (38%)
    *   **ESCA** (Encuesta Social de Estructuras y Viviendas): 139 controles (62%)
*   **Duración del Operativo**: 25 Semanas

---

## 2. Planificación Semanal (EHM vs ESCA)

El levantamiento se distribuye de manera regular a lo largo de las 25 semanas, planificando entre 8 y 10 controles semanales (con excepción de la semana 25, que concluye el operativo con 3 controles de EHM):

| Semana | Controles EHM | Controles ESCA | Total Controles | Viviendas Planificadas |
| :--- | :---: | :---: | :---: | :---: |
| **Semana 01** | 3 | 6 | 9 | 150 |
| **Semana 02** | 3 | 6 | 9 | 136 |
| **Semana 03** | 3 | 5 | 8 | 106 |
| **Semana 04** | 4 | 5 | 9 | 138 |
| **Semana 05** | 3 | 6 | 9 | 134 |
| **Semana 06** | 3 | 6 | 9 | 141 |
| **Semana 07** | 3 | 6 | 9 | 138 |
| **Semana 08** | 4 | 6 | 10 | 155 |
| **Semana 09** | 4 | 6 | 10 | 156 |
| **Semana 10** | 3 | 6 | 9 | 120 |
| **Semana 11** | 4 | 6 | 10 | 144 |
| **Semana 12** | 4 | 6 | 10 | 150 |
| **Semana 13** | 3 | 6 | 9 | 122 |
| **Semana 14** | 3 | 6 | 9 | 142 |
| **Semana 15** | 3 | 6 | 9 | 136 |
| **Semana 16** | 4 | 5 | 9 | 132 |
| **Semana 17** | 3 | 6 | 9 | 136 |
| **Semana 18** | 4 | 5 | 9 | 121 |
| **Semana 19** | 4 | 5 | 9 | 135 |
| **Semana 20** | 4 | 6 | 10 | 158 |
| **Semana 21** | 3 | 6 | 9 | 132 |
| **Semana 22** | 3 | 6 | 9 | 133 |
| **Semana 23** | 4 | 6 | 10 | 152 |
| **Semana 24** | 3 | 6 | 9 | 131 |
| **Semana 25** | 3 | 0 | 3 | 52 |
| **TOTAL** | **85** | **139** | **224** | **3350** |

---

## 3. Cobertura Geográfica (Estado Monagas, Venezuela)

El levantamiento cubre la totalidad de los 13 municipios del Estado Monagas, con una alta concentración en la capital (Maturín):

1.  **MATURIN**: 143 controles (63.8% del operativo)
    *   *Principales Parroquias*: Boquerón (25), Alto de los Godos (32 en total entre variantes de nombres), Santa Cruz (18), San Simón (14).
2.  **EZEQUIEL ZAMORA**: 14 controles (6.3%)
    *   *Principales Parroquias*: Capital Ezequiel Zamora (9), Ezequiel Zamora (3), El Tejero (2).
3.  **BOLIVAR**: 13 controles (5.8%)
    *   *Principales Parroquias*: Bolívar (7), Capital Bolívar (6).
4.  **LIBERTADOR**: 9 controles (4.0%)
5.  **CARIPE**: 8 controles (3.6%)
6.  **CEDEÑO**: 7 controles (3.1%)
7.  **SOTILLO**: 6 controles (2.7%)
8.  **ACOSTA**: 5 controles (2.2%)
9.  **PUNCERES**: 5 controles (2.2%)
10. **AGUASAY**: 4 controles (1.8%)
11. **PIAR**: 4 controles (1.8%)
12. **URACOA**: 4 controles (1.8%)
13. **SANTA BARBARA**: 2 controles (0.9%)

---

## 4. Auditoría de Consistencia (Excel vs CONTROLES.geojson)

Al cruzar los controles planificados del Excel con la base de datos oficial geoespacial (`CONTROLES.geojson`), se obtuvo el siguiente resultado:
*   **Controles Coincidentes**: 210 de 224 (**93.8%**)
*   **Controles Faltantes en GeoJSON**: 14 controles (**6.2%**)

> [!WARNING]
> Los siguientes 14 controles planificados no existen en el archivo `CONTROLES.geojson` de la aplicación, por lo que **generarán la alerta `LINEA_SERIE_INVALIDA` en el Dashboard** cuando los encuestadores carguen las sumisiones correspondientes.

### Detalle de Controles Faltantes en el Sistema:

| Semana | Programa | Control | Viviendas Planificadas | Municipio | Parroquia | Comunidad | Causa Probable / Observaciones |
| :---: | :--- | :--- | :---: | :--- | :--- | :--- | :--- |
| **01** | ESCA | **2098** | 19 | BOLIVAR | MUN CAPITAL BOLIVAR | LOS KILOMETROS | No definido en catálogo geoespacial. |
| **01** | ESCA | **2050** | 15 | MATURIN | ALTO DE LOS GODOS | Edif. El Chaparral | No definido en catálogo geoespacial. |
| **02** | ESCA | **2075** | 15 | MATURIN | ALTO DE LOS GODOS | C. H. La Gran Victoria | No definido en catálogo geoespacial. |
| **03** | ESCA | **3001** | *None* | MATURIN | SANTA CRUZ | Tipuro | No definido en catálogo geoespacial (viviendas: None). |
| **08** | EHM | **6002 (0045)** | 15 | MATURIN | BOQUERON | Urb. Villas de los Angeles | En el GeoJSON el control existe como **`0045`**. La nomenclatura `6002` no está indexada. |
| **09** | ESCA | **3021** | 15 | LIBERTADOR | DESCONOCIDO | La Manga - Temblador | No definido en catálogo geoespacial. |
| **10** | ESCA | **3004** | *None* | MATURIN | SANTA CRUZ | Urb. Tipuro | No definido en catálogo geoespacial (viviendas: None). |
| **10** | ESCA | **3025** | 15 | MATURIN | BOQUERON | El Pueblito De Aribí | No definido en catálogo geoespacial. |
| **11** | EHM | **6001** | *None* | MATURIN | SAN SIMON | San Miguel | No definido en catálogo geoespacial. |
| **13** | EHM | **6004** | *None* | MATURIN | BOQUERON | Boqueron | No definido en catálogo geoespacial. |
| **14** | EHM | **6003 (0029)** | 15 | MATURIN | LOS GODOS | Urb. Puertas del Sur | En el GeoJSON existe el control **`6003`** (y también un control `3024` con línea `0029`). Hay una posible duplicidad o error de nomenclatura. |
| **23** | ESCA | **2005** | 14 | CARIPE | TERESEN | Teresen- Caripe | No definido en catálogo geoespacial. |
| **24** | ESCA | **2032** | 12 | MATURIN | SAN SIMON | Centro- Calle Carabobo | No definido en catálogo geoespacial. |
| **24** | ESCA | **2046** | 15 | PUNCERES | CAPITAL PUNCERES | 23 de Enero | No definido en catálogo geoespacial. |

### Recomendaciones Operativas:
1.  **Corrección de Nomenclatura**:
    *   Para el control `6002 (0045)`, se debe unificar a **`0045`** o agregar el alias en la lógica de validación para evitar rechazos.
    *   Para el control `6003 (0029)`, verificar si corresponde al control **`6003`** nativo.
2.  **Actualización del GeoJSON**:
    *   Agregar los 12 controles restantes a `CONTROLES.geojson` con sus respectivas coordenadas teóricas de segmentación para que no disparen falsos positivos de calidad de datos en el Dashboard.
