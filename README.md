# ESCA V3 — Analytics Dashboard 🚀

<div align="center">

[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)](https://www.chartjs.org/)
[![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white)](https://leafletjs.com/)

</div>

**ESCA V3** es un ecosistema de analítica avanzada diseñado para la visualización de datos de encuestas en tiempo real, integrado nativamente con **KoboToolbox**. Ofrece una experiencia premium con un enfoque en el rendimiento operativo, la precisión geoespacial y la gestión de equipos.

---

## ✨ Características Principales

-   📊 **Dashboard en Tiempo Real**: Visualización inmediata de envíos de KoboToolbox API v2.
-   🗺️ **Geospatial Intelligence**: Mapas interactivos con clustering, mapas de calor y precisión GPS.
-   🏠 **Clasificación de Vivienda**: Análisis especializado por tipología de estructura (A, B, C, E).
-   🏆 **Performance Engine**: Leaderboard dinámico de agentes y métricas de productividad.
-   📉 **Analytics Dinámico**: Gráficos interactivos de evolución temporal, demografía y metas diarias.
-   📑 **Data Explorer**: Navegador de datos brutos con filtrado avanzado y exportación (Tabulator).
-   🌓 **Modo Oscuro Premium**: Interfaz moderna de alta fidelidad optimizada para análisis crítico.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnologías |
| :--- | :--- |
| **Backend** | Python 3.10+, FastAPI, httpx (Async Proxy), python-dotenv |
| **Frontend** | JavaScript (ES6+), Vite, Tailwind CSS v4, Lucide Icons |
| **Visualización** | Chart.js, Leaflet.js (MarkerCluster), Tabulator |
| **Integración** | KoboToolbox API v2 |

---

## 🚀 Inicio Rápido

### 1. Clonar el repositorio
```bash
git clone https://github.com/Alexjhzg/hogares-dashboard.git
cd hogares-dashboard
```

### 2. Configuración del Backend
```bash
cd backend
# Crear entorno virtual
python3 -m venv .venv
source .venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno
cp .env.example .env
# Edita .env con tus credenciales de Kobo
```

### 3. Configuración del Frontend
```bash
cd ../frontend
npm install
```

### 4. Ejecución (Desarrollo)
En terminales separadas:

**Terminal A (Backend):**
```bash
cd backend
source .venv/bin/activate
python app/main.py
```

**Terminal B (Frontend):**
```bash
cd frontend
npm run dev
```

---

## 📁 Estructura del Proyecto

```text
├── backend/
│   ├── app/                # Lógica del servidor FastAPI
│   │   ├── api/            # Endpoints y controladores
│   │   ├── core/           # Configuración (Pydantic Settings)
│   │   ├── services/       # Clientes API (Kobo API Proxy)
│   │   └── utils/          # Procesamiento de datos y mapeos
│   └── requirements.txt    # Dependencias de Python
├── frontend/
│   ├── index.html          # Punto de entrada
│   ├── tailwind-custom.css # Estilos personalizados
│   ├── package.json        # Dependencias JS
│   └── vite.config.js      # Configuración de Vite
├── docs/                   # Documentación, diagramas e imágenes
├── MAPPING.md              # Diccionario de campos y mapeos Kobo
└── run.sh                  # Script automatizado de arranque
```

---

## 🛡️ Seguridad y Configuración

> [!IMPORTANT]
> Nunca compartas tu archivo `.env` o tu `KOBO_TOKEN` en repositorios públicos.

Parámetros clave en el `.env`:
- `KOBO_TOKEN`: API Token generado en tu cuenta de KoboToolbox.
- `KOBO_URL`: URL de la instancia (ej. `https://kobo.humanitarianresponse.info`).
- `FORM_ID`: El ID numérico o UID del formulario a consultar.

---

## 📄 Licencia

Este proyecto está bajo la Licencia **ISC**. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---
Desarrollado para el análisis eficiente de operaciones de campo masivas.
