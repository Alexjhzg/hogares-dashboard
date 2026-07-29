/**
 * ─── UI Component: Resumen ───────────────────────────────────────────────────
 * Main dashboard view with KPIs and trend charts.
 */

export function getResumenTabHTML() {
    return `
    <div id="tab-resumen" class="tab-content flex flex-col gap-6 animate-fade-in">
      <!-- Encabezado del módulo -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 px-2">
        <div>
          <h2 class="text-xl sm:text-2xl font-black font-outfit text-slate-800 dark:text-white">Vista General</h2>
          <p class="text-sm text-slate-500 font-inter">Métricas clave de producción, calidad y caracterización del campo.</p>
        </div>
        <div id="currentDateDisplay"
          class="bg-brand-blue/10 border border-brand-blue/20 text-brand-blue px-4 py-1.5 rounded-full text-xs font-bold tracking-wide">
          --</div>
      </div>

      <!-- TIER 1: Indicadores Críticos de Producción -->
      <section class="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-7 gap-4">
        <div class="card-premium group relative animate-slide-up" title="Volumen total de formularios recibidos en el servidor sin distinción de su estado de completitud.">
          <div class="card-glow bg-blue-500/10 group-hover:bg-blue-500/20"></div>
          <div class="h-10 w-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
            <i data-lucide="files" class="w-5 h-5"></i>
          </div>
          <div class="kpi-value-text" id="kpiTotal">0</div>
          <div class="text-[10px] font-bold text-blue-400 tracking-wider uppercase mt-1">Total Encuestas Recibidas</div>
        </div>

        <div class="card-premium group relative animate-slide-up" title="Entrevistas que cumplen con todos los criterios de completitud y validación del formulario.">
          <div class="card-glow bg-emerald-500/10 group-hover:bg-emerald-500/20"></div>
          <div class="h-10 w-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
            <i data-lucide="check-circle" class="w-5 h-5"></i>
          </div>
          <div class="kpi-value-text" id="kpiCompletadas">0</div>
          <div class="text-[10px] font-bold text-emerald-400 tracking-wider uppercase mt-1">Efectiva</div>
        </div>

        <div class="card-premium group relative animate-slide-up" title="Registros donde no se pudo concretar la entrevista debido a rechazos, ausencia de informante u otros motivos.">
          <div class="card-glow bg-orange-500/10 group-hover:bg-orange-500/20"></div>
          <div class="h-10 w-10 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center mb-4">
            <i data-lucide="help-circle" class="w-5 h-5"></i>
          </div>
          <div class="kpi-value-text" id="kpiNoEfectiva">0</div>
          <div class="text-[10px] font-bold text-orange-400 tracking-wider uppercase mt-1">No Efectivas</div>
        </div>

        <div class="card-premium group relative animate-slide-up" title="Comparativa porcentual entre encuestas efectivas y no efectivas: (Efectivas / (Efectivas + No Efectivas)) * 100.">
          <div class="card-glow bg-teal-500/10 group-hover:bg-teal-500/20"></div>
          <div class="h-10 w-10 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center mb-4">
            <i data-lucide="percent" class="w-5 h-5"></i>
          </div>
          <div class="kpi-value-text" id="kpiTasaEfectividad">0%</div>
          <div class="text-[10px] font-bold text-teal-400 tracking-wider uppercase mt-1">Tasa de Efectividad</div>
        </div>

        <div class="card-premium group relative animate-slide-up" title="Tasa de no respuesta calculada sobre el total de viviendas elegibles: (Tipo A / (Planificadas - (Tipo B + Tipo C))) * 100.">
          <div class="card-glow bg-purple-500/10 group-hover:bg-purple-500/20"></div>
          <div class="h-10 w-10 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
            <i data-lucide="user-x" class="w-5 h-5"></i>
          </div>
          <div class="kpi-value-text" id="kpiTasaNoRespuesta">0%</div>
          <div class="text-[10px] font-bold text-purple-400 tracking-wider uppercase mt-1">Tasa No Respuesta</div>
        </div>

        <div class="card-premium group relative animate-slide-up" title="Cantidad de encuestadores únicos que han sincronizado datos en el periodo y filtros seleccionados.">
          <div class="card-glow bg-cyan-500/10 group-hover:bg-cyan-500/20"></div>
          <div class="h-10 w-10 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
            <i data-lucide="users" class="w-5 h-5"></i>
          </div>
          <div class="kpi-value-text" id="kpiEncuestadores">0</div>
          <div class="text-[10px] font-bold text-cyan-400 tracking-wider uppercase mt-1">Encuestadores Activos</div>
        </div>

        <div class="card-premium group relative animate-slide-up" title="Entrevistas que han disparado alguna regla del motor de inconsistencias o validaciones técnicas.">
          <div class="card-glow bg-red-500/10 group-hover:bg-red-500/20"></div>
          <div class="h-10 w-10 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center mb-4">
            <i data-lucide="shield-alert" class="w-5 h-5"></i>
          </div>
          <div class="kpi-value-text" id="kpiTotalAlertas">0</div>
          <div class="text-[10px] font-bold text-red-400 tracking-wider uppercase mt-1">Registros con Alertas</div>
        </div>
      </section>

      <!-- TIER 2: Detalle Demográfico y de Tiempo -->
      <section class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
        <div class="card-premium !border-l-2 !border-l-brand-orange" title="Tiempo promedio invertido en completar una entrevista efectiva (desde el inicio hasta el fin del formulario).">
          <div class="kpi-label !mt-0 mb-2 flex items-center gap-1.5"><i data-lucide="clock" class="w-4 h-4 text-brand-orange/80"></i> Duración Media</div>
          <div class="kpi-value-text text-slate-900 dark:text-white" id="kpiDuracion">0m</div>
        </div>
        <div class="card-premium !border-l-2 !border-l-teal-500" title="Promedio de integrantes censados por cada hogar que respondió la encuesta de manera efectiva.">
          <div class="kpi-label !mt-0 mb-2 flex items-center gap-1.5"><i data-lucide="users" class="w-4 h-4 text-teal-500/80"></i> Prom. Integrantes / Hogar</div>
          <div class="kpi-value-text text-slate-900 dark:text-white" id="kpiPersonas">0</div>
        </div>
        <div class="card-premium !border-l-2 !border-l-indigo-500" title="Cantidad de hogares donde solo se registró a un (1) habitante o encuestado.">
          <div class="kpi-label !mt-0 mb-2 flex items-center gap-1.5"><i data-lucide="user" class="w-4 h-4 text-indigo-500/80"></i> Hogares Unipersonales</div>
          <div class="kpi-value-text text-slate-900 dark:text-white" id="kpiHogaresUni">0</div>
        </div>
        <div class="card-premium !border-l-2 !border-l-cyan-500" title="Cantidad total de planillas físicas (Controles) registradas en el sistema.">
          <div class="kpi-label !mt-0 mb-2 flex items-center gap-1.5"><i data-lucide="clipboard-list" class="w-4 h-4 text-cyan-500/80"></i> Total Controles</div>
          <div class="kpi-value-text text-slate-900 dark:text-white" id="kpiControles">0</div>
        </div>
        <div class="card-premium !border-l-2 !border-l-blue-500" title="Total de personas de sexo masculino registradas en los hogares censados.">
          <div class="kpi-label !mt-0 mb-2 flex items-center gap-1.5"><i data-lucide="mars" class="w-4 h-4 text-blue-500/80"></i> Hombres</div>
          <div class="kpi-value-text text-slate-900 dark:text-white" id="kpiHombres">0</div>
        </div>
        <div class="card-premium !border-l-2 !border-l-pink-500" title="Total de personas de sexo femenino registradas en los hogares censados.">
          <div class="kpi-label !mt-0 mb-2 flex items-center gap-1.5"><i data-lucide="venus" class="w-4 h-4 text-pink-500/80"></i> Mujeres</div>
          <div class="kpi-value-text text-slate-900 dark:text-white" id="kpiMujeres">0</div>
        </div>
      </section>

      <!-- TIER 1.5: Clasificación y Desglose Detallado de Viviendas -->
      <section id="subtiposBreakdownContainer" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Rendered dynamically by kpis.js updateSubtiposBreakdown() -->
        <div class="col-span-full text-center text-slate-400 text-xs py-6 animate-pulse">Cargando desglose de viviendas...</div>
      </section>

      <!-- SECCIÓN 1: Distribución y Tipologías (DONAS) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <!-- Gráfico de Clasificación (A, B, C, E) -->
        <div class="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800/50 p-5 flex flex-col items-center min-h-[300px] sm:h-[380px] transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700/50 group" title="Distribución porcentual de las viviendas según su clasificación final.">
          <div class="w-full mb-4">
            <h3 class="font-bold flex items-center gap-2 font-outfit text-sm text-slate-800 dark:text-slate-200">
              <i data-lucide="pie-chart" class="text-brand-emerald w-4 h-4"></i> Clasificación de Viviendas
            </h3>
          </div>
          <div class="flex-1 w-full relative">
            <canvas id="chartClasificacion"></canvas>
          </div>
        </div>

        <!-- Tipología Vivienda -->
        <div class="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800/50 p-5 flex flex-col items-center min-h-[300px] sm:h-[380px] transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700/50 group" title="Distribución de las unidades inmobiliarias según su estado de habitabilidad u ocupación.">
          <div class="w-full mb-4">
            <h3 class="font-bold flex items-center gap-2 font-outfit text-sm text-slate-800 dark:text-slate-200">
              <i data-lucide="home" class="text-brand-purple w-4 h-4"></i> Tipología Vivienda
            </h3>
          </div>
          <div class="flex-1 w-full relative">
            <canvas id="chartCondicion"></canvas>
          </div>
        </div>

        <!-- Uso Estructura -->
        <div class="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800/50 p-5 flex flex-col items-center min-h-[300px] sm:h-[380px] transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700/50 group" title="Desglose del uso principal de las estructuras visitadas (Residencial, Comercial, Mixto, etc.).">
          <div class="w-full mb-4">
            <h3 class="font-bold flex items-center gap-2 font-outfit text-sm text-slate-800 dark:text-slate-200">
              <i data-lucide="building-2" class="text-brand-emerald w-4 h-4"></i> Uso Estructura
            </h3>
          </div>
          <div class="flex-1 w-full relative">
            <canvas id="chartUso"></canvas>
          </div>
        </div>
      </div>

      <!-- SECCIÓN 2: Métricas Operativas y Rendimiento -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <!-- Volumen por Encuestador -->
        <div class="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800/50 p-5 flex flex-col min-h-[300px] sm:h-[380px] transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700/50 group" title="Ranking de productividad mostrando los 15 encuestadores con mayor volumen de captación en el periodo.">
          <div class="w-full mb-4">
            <h3 class="font-bold flex items-center gap-2 font-outfit text-sm text-slate-800 dark:text-slate-200">
              <i data-lucide="bar-chart-3" class="text-brand-blue w-4 h-4"></i> Volumen por Encuestador
            </h3>
          </div>
          <div class="flex-1 min-h-0 relative">
            <canvas id="chartEncuestador"></canvas>
          </div>
        </div>

        <!-- Distribución Horaria -->
        <div class="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800/50 p-5 flex flex-col min-h-[300px] sm:h-[380px] transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700/50 group" title="Frecuencia de las encuestas según la hora de inicio registrada por el dispositivo en campo (Métricas de Jornada Laboral).">
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-bold flex items-center gap-2 font-outfit text-sm text-slate-800 dark:text-slate-200">
              <i data-lucide="clock" class="text-brand-emerald w-4 h-4"></i> Distribución Horaria
            </h3>
          </div>
          <div class="flex-1 min-h-0 relative">
            <canvas id="chartHorario"></canvas>
          </div>
        </div>

        <!-- Hora de Transmisión -->
        <div class="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800/50 p-5 flex flex-col min-h-[300px] sm:h-[380px] transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700/50 group" title="Frecuencia de envío de encuestas según la hora en que el dispositivo transmitió los datos al servidor (Métricas de Envío).">
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-bold flex items-center gap-2 font-outfit text-sm text-slate-800 dark:text-slate-200">
              <i data-lucide="cloud-upload" class="text-brand-orange w-4 h-4"></i> Hora de Transmisión
            </h3>
          </div>
          <div class="flex-1 min-h-0 relative">
            <canvas id="chartHoraTransmision"></canvas>
          </div>
        </div>
      </div>

      <!-- SECCIÓN 3: Tendencia Temporal (FINAL) -->
      <div class="grid grid-cols-1 gap-4 sm:gap-6">
        <!-- Tendencia Diaria de Recolección -->
        <div class="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800/50 p-5 flex flex-col min-h-[350px] transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700/50 group" title="Evolución temporal del volumen de recolección de datos según la fecha de realización de la entrevista.">
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-bold flex items-center gap-2 font-outfit text-sm text-slate-800 dark:text-slate-200">
              <i data-lucide="activity" class="text-brand-blue w-4 h-4"></i> Tendencia Diaria de Recolección
            </h3>
          </div>
          <div class="flex-1 min-h-0 relative">
            <canvas id="chartPorDia"></canvas>
          </div>
        </div>
      </div>
    </div>`;
}
