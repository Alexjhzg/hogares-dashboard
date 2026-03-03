# ESCA V3 — Analytics Dashboard

Dashboard de analítica en tiempo real para operaciones de encuestas, conectado a KoboToolbox.

## Stack

| Capa | Tecnología |
|------|-----------|
| **Backend** | FastAPI + httpx (proxy async hacia Kobo API) |
| **Frontend** | HTML + Tailwind CSS (CDN) + Chart.js + Leaflet.js + Tabulator |
| **Datos** | KoboToolbox API v2 |

## Inicio rápido

```bash
# 1. Clonar
git clone https://github.com/TU_USUARIO/api-kobo-encuesta-ampliada.git
cd api-kobo-encuesta-ampliada

# 2. Entorno virtual
python3 -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt

# 3. Configurar credenciales
cp backend/.env.example backend/.env
# Editar backend/.env con tu token de Kobo

# 4. Ejecutar
python backend/main.py
# Abrir http://localhost:8000
```

## Estructura

```
├── backend/
│   ├── main.py            # FastAPI server + Kobo proxy
│   ├── requirements.txt   # Dependencias Python
│   ├── .env.example       # Template de variables de entorno
│   └── .env               # (ignorado por git) Credenciales reales
├── frontend/
│   ├── index.html          # Dashboard principal
│   ├── app.js              # Lógica de charts, filtros, mapa
│   └── tailwind-custom.css # Estilos dark-mode personalizados
├── MAPPING.md              # Mapeo de campos Kobo
├── run.sh                  # Script de arranque
└── .gitignore
```

## Pestañas del Dashboard

- **Resumen** — KPIs globales + timeline de actividad
- **Operativa** — Velocidad, top performer, hot zone, meta diaria
- **Demografía** — Tipología de vivienda y destino de estructura
- **Cobertura** — Mapa interactivo con clusters
- **Desempeño** — Leaderboard de agentes + cards
- **DB Raw** — Explorador de datos con filtros por columna

## Seguridad

> ⚠️ **Nunca** subas el archivo `.env` a GitHub. Contiene tu token de API.
