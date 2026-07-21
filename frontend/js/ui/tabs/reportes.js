/**
 * ─── UI Component: Reportes ──────────────────────────────────────────────────
 * Custom Excel export builder with field selector checklist and presets.
 */

export function getReportesTabHTML() {
  return `
    <div id="tab-reportes" class="tab-content flex flex-col gap-6 hidden-tab animate-fade-in">

      <!-- ── Encabezado ─────────────────────────────────────────────────────── -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 px-2">
        <div>
          <h2 class="text-xl sm:text-2xl font-black font-outfit text-slate-800 dark:text-white flex items-center gap-3">
            <span class="p-2 bg-emerald-500/10 rounded-xl text-emerald-500">
              <i data-lucide="file-spreadsheet" class="w-5 h-5 sm:w-6 sm:h-6"></i>
            </span>
            Generador de Reportes
          </h2>
          <p class="text-sm text-slate-500 font-inter mt-1 ml-1">Selecciona los campos que deseas exportar y descarga el reporte en formato Excel.</p>
        </div>
        <div id="reportes-record-count"
          class="flex items-center gap-2 bg-brand-blue/10 border border-brand-blue/20 text-brand-blue px-4 py-2 rounded-full text-xs font-bold tracking-wide whitespace-nowrap">
          <i data-lucide="database" class="w-3.5 h-3.5"></i>
          <span id="rpt-count-label">— registros listos</span>
        </div>
      </div>

      <!-- ── Cuerpo Principal: Config + Checklist ───────────────────────────── -->
      <div class="grid grid-cols-1 xl:grid-cols-12 gap-5">

        <!-- ── Panel izquierdo: Configuración ──────────────────────────────── -->
        <div class="xl:col-span-4 flex flex-col gap-4">

          <!-- Nombre del archivo -->
          <div class="card-premium flex flex-col gap-4">
            <div class="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <div class="p-1.5 bg-brand-blue/10 text-brand-blue rounded-lg">
                <i data-lucide="settings-2" class="w-4 h-4"></i>
              </div>
              <span class="font-outfit font-black text-sm uppercase tracking-wider text-slate-800 dark:text-slate-200">
                Configuración de Exportación
              </span>
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Nombre del Archivo
              </label>
              <div class="relative">
                <i data-lucide="file-spreadsheet" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"></i>
                <input id="rpt-filename" type="text" value="reporte_encuestas"
                  class="w-full bg-white dark:bg-surface-dark/80 border border-slate-300 dark:border-slate-700/80 rounded-xl pl-10 pr-16 py-2.5 text-sm text-slate-700 dark:text-slate-200 focus:border-brand-emerald/50 focus:ring-1 outline-none transition-all"
                  placeholder="reporte_encuestas" />
                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">.xlsx</span>
              </div>
            </div>

            <!-- Fuente de datos -->
            <div class="flex flex-col gap-2">
              <label class="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Fuente de Datos
              </label>
              <div class="flex flex-col gap-2">
                <label class="flex items-start gap-3 cursor-pointer group p-2.5 rounded-xl border border-transparent hover:border-brand-emerald/30 hover:bg-emerald-500/5 transition-all">
                  <input type="radio" name="rpt-datasource" id="rpt-src-filtered" value="filtered" checked
                    class="mt-0.5 accent-emerald-500 shrink-0 cursor-pointer" />
                  <div>
                    <div class="text-sm font-bold text-slate-700 dark:text-slate-200">Registros filtrados</div>
                    <div class="text-[11px] text-slate-500">Solo los registros visibles según los filtros activos</div>
                  </div>
                </label>
                <label class="flex items-start gap-3 cursor-pointer group p-2.5 rounded-xl border border-transparent hover:border-brand-blue/30 hover:bg-blue-500/5 transition-all">
                  <input type="radio" name="rpt-datasource" id="rpt-src-all" value="all"
                    class="mt-0.5 accent-blue-500 shrink-0 cursor-pointer" />
                  <div>
                    <div class="text-sm font-bold text-slate-700 dark:text-slate-200">Todos los Registros</div>
                    <div class="text-[11px] text-slate-500">Todos los registros descargados, ignorando filtros</div>
                  </div>
                </label>
              </div>
            </div>

            <!-- Opciones de estructura -->
            <div class="flex flex-col gap-2">
              <label class="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Opciones
              </label>
              <label class="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" id="rpt-opt-alerts-text" checked class="rounded accent-emerald-500 cursor-pointer" />
                <span class="text-sm text-slate-600 dark:text-slate-300">Exportar alertas como texto legible</span>
              </label>
              <label class="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" id="rpt-opt-include-header" checked class="rounded accent-emerald-500 cursor-pointer" />
                <span class="text-sm text-slate-600 dark:text-slate-300">Incluir fila de cabeceras</span>
              </label>
            </div>
          </div>

          <!-- Presets de Selección -->
          <div class="card-premium flex flex-col gap-3">
            <div class="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <div class="p-1.5 bg-brand-purple/10 text-brand-purple rounded-lg">
                <i data-lucide="sparkles" class="w-4 h-4"></i>
              </div>
              <span class="font-outfit font-black text-sm uppercase tracking-wider text-slate-800 dark:text-slate-200">
                Presets Rápidos
              </span>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <button id="rpt-preset-basic" data-preset="basic"
                class="rpt-preset-btn flex flex-col items-center gap-1.5 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-brand-emerald/50 hover:bg-emerald-500/5 transition-all text-center group">
                <i data-lucide="layout-list" class="w-4 h-4 text-slate-400 group-hover:text-brand-emerald transition-colors"></i>
                <span class="text-[11px] font-bold text-slate-600 dark:text-slate-300 group-hover:text-brand-emerald transition-colors">Básico</span>
                <span class="text-[9px] text-slate-400 leading-tight">ID + Ubicación + Estado</span>
              </button>
              <button id="rpt-preset-audit" data-preset="audit"
                class="rpt-preset-btn flex flex-col items-center gap-1.5 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-brand-red/50 hover:bg-red-500/5 transition-all text-center group">
                <i data-lucide="shield-alert" class="w-4 h-4 text-slate-400 group-hover:text-brand-red transition-colors"></i>
                <span class="text-[11px] font-bold text-slate-600 dark:text-slate-300 group-hover:text-brand-red transition-colors">Calidad</span>
                <span class="text-[9px] text-slate-400 leading-tight">Métricas de validación</span>
              </button>
              <button id="rpt-preset-demo" data-preset="demo"
                class="rpt-preset-btn flex flex-col items-center gap-1.5 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-brand-blue/50 hover:bg-blue-500/5 transition-all text-center group">
                <i data-lucide="users" class="w-4 h-4 text-slate-400 group-hover:text-brand-blue transition-colors"></i>
                <span class="text-[11px] font-bold text-slate-600 dark:text-slate-300 group-hover:text-brand-blue transition-colors">Demografía</span>
                <span class="text-[9px] text-slate-400 leading-tight">Personas + Hogares</span>
              </button>
              <button id="rpt-preset-geo" data-preset="geo"
                class="rpt-preset-btn flex flex-col items-center gap-1.5 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-brand-orange/50 hover:bg-orange-500/5 transition-all text-center group">
                <i data-lucide="map-pin" class="w-4 h-4 text-slate-400 group-hover:text-brand-orange transition-colors"></i>
                <span class="text-[11px] font-bold text-slate-600 dark:text-slate-300 group-hover:text-brand-orange transition-colors">Geográfico</span>
                <span class="text-[9px] text-slate-400 leading-tight">GPS + Segmentos</span>
              </button>
            </div>
            <div class="flex gap-2 pt-1 border-t border-slate-100 dark:border-slate-800 mt-1">
              <button id="rpt-select-all" class="flex-1 text-[11px] font-bold py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-500/10 hover:text-brand-emerald transition-all">
                ✓ Seleccionar Todo
              </button>
              <button id="rpt-clear-all" class="flex-1 text-[11px] font-bold py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-red-500/10 hover:text-brand-red transition-all">
                ✕ Limpiar Todo
              </button>
            </div>
          </div>

          <!-- Botón de Exportación -->
          <button id="rpt-export-btn"
            class="group relative w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-outfit font-black text-base text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
            <span id="rpt-export-icon" class="transition-transform group-hover:scale-110">
              <i data-lucide="download" class="w-5 h-5"></i>
            </span>
            <span id="rpt-export-text">Generar Reporte Excel</span>
            <span id="rpt-export-spinner" class="hidden">
              <svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
            </span>
          </button>

        </div>

        <!-- ── Panel derecho: Checklist de Campos ──────────────────────────── -->
        <div class="xl:col-span-8 flex flex-col gap-4">

          <!-- ── Grupo: Identificación ───────────────────────────────────── -->
          <div class="card-premium !p-0 overflow-hidden">
            <button class="rpt-section-toggle w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-white/3 transition-colors" data-section="identificacion">
              <div class="flex items-center gap-2.5">
                <div class="p-1.5 bg-brand-blue/10 text-brand-blue rounded-lg"><i data-lucide="id-card" class="w-4 h-4"></i></div>
                <span class="font-outfit font-black text-sm text-slate-800 dark:text-slate-200">Identificación</span>
                <span class="text-[10px] bg-brand-blue/10 text-brand-blue font-bold px-2 py-0.5 rounded-full rpt-selected-count" data-section="identificacion">0</span>
              </div>
              <i data-lucide="chevron-down" class="w-4 h-4 text-slate-400 transition-transform rpt-chevron" data-section="identificacion"></i>
            </button>
            <div class="rpt-section-body px-4 pb-4 border-t border-slate-100 dark:border-slate-800" data-section="identificacion">
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2.5 pt-3">
                ${_checkboxGroup([
    { id: 'rpt-f-cedula', label: 'Cédula', desc: 'Documento del encuestador', checked: true },
    { id: 'rpt-f-nombre', label: 'Nombre', desc: 'Nombre del encuestador', checked: true },
    { id: 'rpt-f-control', label: 'Control', desc: 'Número de control', checked: true },
    { id: 'rpt-f-serie', label: 'Serie', desc: 'N° de serie', checked: true },
    { id: 'rpt-f-linea', label: 'Línea', desc: 'N° de línea', checked: true },
    { id: 'rpt-f-linea_valida', label: 'Línea Válida', desc: 'Válida / INVÁLIDA', checked: false },
    { id: 'rpt-f-lote', label: 'Lote', desc: 'N° de lote', checked: false },
    { id: 'rpt-f-semana', label: 'Semana', desc: 'Semana del levantamiento', checked: true },
    { id: 'rpt-f-fecha', label: 'Fecha', desc: 'Fecha de la encuesta', checked: true },
    { id: 'rpt-f-uuid', label: 'UUID', desc: 'Identificador único Kobo', checked: false },
  ])}
              </div>
            </div>
          </div>

          <!-- ── Grupo: Ubicación ────────────────────────────────────────── -->
          <div class="card-premium !p-0 overflow-hidden">
            <button class="rpt-section-toggle w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-white/3 transition-colors" data-section="ubicacion">
              <div class="flex items-center gap-2.5">
                <div class="p-1.5 bg-brand-orange/10 text-brand-orange rounded-lg"><i data-lucide="map-pin" class="w-4 h-4"></i></div>
                <span class="font-outfit font-black text-sm text-slate-800 dark:text-slate-200">Ubicación Geográfica</span>
                <span class="text-[10px] bg-brand-orange/10 text-brand-orange font-bold px-2 py-0.5 rounded-full rpt-selected-count" data-section="ubicacion">0</span>
              </div>
              <i data-lucide="chevron-down" class="w-4 h-4 text-slate-400 transition-transform rpt-chevron" data-section="ubicacion"></i>
            </button>
            <div class="rpt-section-body px-4 pb-4 border-t border-slate-100 dark:border-slate-800" data-section="ubicacion">
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2.5 pt-3">
                ${_checkboxGroup([
    { id: 'rpt-f-entidad', label: 'Entidad', desc: 'Código de estado/entidad', checked: false },
    { id: 'rpt-f-mun', label: 'Municipio', desc: 'Código de municipio', checked: true },
    { id: 'rpt-f-par', label: 'Parroquia', desc: 'Código de parroquia', checked: false },
    { id: 'rpt-f-nodo', label: 'Nodo', desc: 'Nodo censal', checked: false },
    { id: 'rpt-f-segmento', label: 'Segmento', desc: 'Código de segmento', checked: false },
    { id: 'rpt-f-sector', label: 'Sector', desc: 'Código de sector', checked: false },
    { id: 'rpt-f-manzana', label: 'Manzana', desc: 'N° de manzana', checked: false },
    { id: 'rpt-f-parcela', label: 'Parcela', desc: 'N° de parcela', checked: false },
    { id: 'rpt-f-direccion', label: 'Dirección/Sector', desc: 'Nombre del sector', checked: false },
    { id: 'rpt-f-lat', label: 'Latitud', desc: 'Coordenada GPS Lat.', checked: false },
    { id: 'rpt-f-lng', label: 'Longitud', desc: 'Coordenada GPS Lng.', checked: false },
  ])}
              </div>
            </div>
          </div>

          <!-- ── Grupo: Estado y Vivienda ───────────────────────────────── -->
          <div class="card-premium !p-0 overflow-hidden">
            <button class="rpt-section-toggle w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-white/3 transition-colors" data-section="vivienda">
              <div class="flex items-center gap-2.5">
                <div class="p-1.5 bg-brand-emerald/10 text-brand-emerald rounded-lg"><i data-lucide="home" class="w-4 h-4"></i></div>
                <span class="font-outfit font-black text-sm text-slate-800 dark:text-slate-200">Estado y Vivienda</span>
                <span class="text-[10px] bg-brand-emerald/10 text-brand-emerald font-bold px-2 py-0.5 rounded-full rpt-selected-count" data-section="vivienda">0</span>
              </div>
              <i data-lucide="chevron-down" class="w-4 h-4 text-slate-400 transition-transform rpt-chevron" data-section="vivienda"></i>
            </button>
            <div class="rpt-section-body px-4 pb-4 border-t border-slate-100 dark:border-slate-800" data-section="vivienda">
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2.5 pt-3">
                ${_checkboxGroup([
    { id: 'rpt-f-estado', label: 'Estado', desc: 'Completada / No efectiva', checked: true },
    { id: 'rpt-f-tipo_vivienda', label: 'Tipo Vivienda (A/B/C/E)', desc: 'Clasificación del tipo', checked: false },
    { id: 'rpt-f-subtipo_vivienda', label: 'Subtipo Vivienda', desc: 'Desglose detallado de subtipo', checked: false },
    { id: 'rpt-f-condicion', label: 'Condición de Ocupación', desc: 'Presentes, ausentes, etc.', checked: false },
    { id: 'rpt-f-uso', label: 'Uso de la Unidad', desc: 'Residencial, comercial...', checked: false },
    { id: 'rpt-f-situacion_vivienda', label: 'Situación Vivienda', desc: 'Valor crudo de situación', checked: false },
    { id: 'rpt-f-nota', label: 'Nota / Observación', desc: 'Campo de nota final', checked: false },
  ])}
              </div>
            </div>
          </div>

          <!-- ── Grupo: Demografía ──────────────────────────────────────── -->
          <div class="card-premium !p-0 overflow-hidden">
            <button class="rpt-section-toggle w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-white/3 transition-colors" data-section="demografia">
              <div class="flex items-center gap-2.5">
                <div class="p-1.5 bg-indigo-500/10 text-indigo-500 rounded-lg"><i data-lucide="users" class="w-4 h-4"></i></div>
                <span class="font-outfit font-black text-sm text-slate-800 dark:text-slate-200">Demografía</span>
                <span class="text-[10px] bg-indigo-500/10 text-indigo-500 font-bold px-2 py-0.5 rounded-full rpt-selected-count" data-section="demografia">0</span>
              </div>
              <i data-lucide="chevron-down" class="w-4 h-4 text-slate-400 transition-transform rpt-chevron" data-section="demografia"></i>
            </button>
            <div class="rpt-section-body px-4 pb-4 border-t border-slate-100 dark:border-slate-800" data-section="demografia">
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2.5 pt-3">
                ${_checkboxGroup([
    { id: 'rpt-f-totalPers', label: 'Total Personas', desc: 'N° de miembros del hogar', checked: false },
    { id: 'rpt-f-hogares', label: 'N° Hogares', desc: 'Hogares por encuesta', checked: false },
    { id: 'rpt-f-hombres', label: 'Hombres', desc: 'Total de sexo masculino', checked: false },
    { id: 'rpt-f-mujeres', label: 'Mujeres', desc: 'Total de sexo femenino', checked: false },
  ])}
              </div>
            </div>
          </div>

          <!-- ── Grupo: Calidad / Auditoría ─────────────────────────────── -->
          <div class="card-premium !p-0 overflow-hidden">
            <button class="rpt-section-toggle w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-white/3 transition-colors" data-section="calidad">
              <div class="flex items-center gap-2.5">
                <div class="p-1.5 bg-brand-red/10 text-brand-red rounded-lg"><i data-lucide="shield-alert" class="w-4 h-4"></i></div>
                <span class="font-outfit font-black text-sm text-slate-800 dark:text-slate-200">Calidad y Auditoría</span>
                <span class="text-[10px] bg-brand-red/10 text-brand-red font-bold px-2 py-0.5 rounded-full rpt-selected-count" data-section="calidad">0</span>
              </div>
              <i data-lucide="chevron-down" class="w-4 h-4 text-slate-400 transition-transform rpt-chevron" data-section="calidad"></i>
            </button>
            <div class="rpt-section-body px-4 pb-4 border-t border-slate-100 dark:border-slate-800" data-section="calidad">
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2.5 pt-3">
                ${_checkboxGroup([
    { id: 'rpt-f-durMin', label: 'Duración (min)', desc: 'Tiempo de la encuesta', checked: false },
    { id: 'rpt-f-distance_m', label: 'Dist. al Control (m)', desc: 'Distancia GPS al control', checked: false },
    { id: 'rpt-f-dist_ini_fin', label: 'Desplazamiento (m)', desc: 'Dist. inicio a fin', checked: false },
    { id: 'rpt-f-actual_seg', label: 'Segmento Real GPS', desc: 'Segmento detectado por GPS', checked: false },
    { id: 'rpt-f-alertas', label: 'Alertas', desc: 'Códigos de inconsistencias', checked: false },
    { id: 'rpt-f-hasAlerts', label: '¿Tiene Alertas?', desc: 'Sí / No', checked: false },
    { id: 'rpt-f-hora_inicio', label: 'Hora Inicio', desc: 'Hora de apertura del form.', checked: false },
    { id: 'rpt-f-hora_trans', label: 'Hora Transmisión', desc: 'Hora de envío al servidor', checked: false },
  ])}
              </div>
            </div>
          </div>

          <!-- ── Grupo: Campos Dinámicos (Raw Kobo) ─────────────────────── -->
          <div class="card-premium !p-0 overflow-hidden">
            <button class="rpt-section-toggle w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-white/3 transition-colors" data-section="raw">
              <div class="flex items-center gap-2.5">
                <div class="p-1.5 bg-brand-purple/10 text-brand-purple rounded-lg"><i data-lucide="code-2" class="w-4 h-4"></i></div>
                <span class="font-outfit font-black text-sm text-slate-800 dark:text-slate-200">Variables Originales Kobo</span>
                <span class="text-[10px] bg-brand-purple/10 text-brand-purple font-bold px-2 py-0.5 rounded-full rpt-selected-count" data-section="raw">0</span>
              </div>
              <i data-lucide="chevron-down" class="w-4 h-4 text-slate-400 transition-transform rpt-chevron" data-section="raw" style="transform:rotate(-90deg)"></i>
            </button>
            <div class="rpt-section-body hidden px-4 pb-4 border-t border-slate-100 dark:border-slate-800" data-section="raw">
              <div class="pt-3 flex flex-col gap-3">
                <p class="text-[11px] text-slate-500">Campos adicionales encontrados en el JSON crudo de Kobo. Los valores de tipo objeto/lista serán exportados como JSON.</p>
                <div class="relative">
                  <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"></i>
                  <input id="rpt-raw-search" type="text" placeholder="Buscar campo..." 
                    class="w-full bg-white dark:bg-surface-dark/80 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs outline-none focus:border-brand-purple/50 transition-all" />
                </div>
                <div id="rpt-raw-fields-list" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-y-1.5 gap-x-4 max-h-60 overflow-y-auto pr-1 no-scrollbar">
                  <div class="col-span-full text-center text-sm text-slate-400 py-4">
                    <i data-lucide="loader-2" class="w-4 h-4 animate-spin inline-block mr-1"></i> Cargando campos...
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div> <!-- end right panel -->
      </div> <!-- end grid -->
    </div>`;
}

/**
 * Helper: Renders a group of checkbox items.
 * @param {Array<{id, label, desc, checked}>} items
 * @returns {string}
 */
function _checkboxGroup(items) {
  return items.map(({ id, label, desc, checked }) => `
        <label for="${id}" class="flex items-start gap-2.5 cursor-pointer group">
          <input type="checkbox" id="${id}" class="rpt-field-checkbox mt-0.5 shrink-0 accent-emerald-500 cursor-pointer rounded" ${checked ? 'checked' : ''} />
          <div>
            <div class="text-[12px] font-semibold text-slate-700 dark:text-slate-200 group-hover:text-brand-emerald transition-colors leading-tight">${label}</div>
            <div class="text-[10px] text-slate-400 leading-tight">${desc}</div>
          </div>
        </label>
    `).join('');
}
