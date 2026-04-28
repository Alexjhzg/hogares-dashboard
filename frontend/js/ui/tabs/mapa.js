/**
 * ─── UI Component: Mapa ──────────────────────────────────────────────────────
 * Geographic analysis view + Integrated Data Engine (Tabulator).
 */

export function getMapaTabHTML() {
    return `
    <div id="tab-mapa" class="tab-content flex flex-col gap-4 hidden-tab animate-fade-in">
      <div id="mapSectionWrapper" class="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:h-[80vh] lg:min-h-[700px] transition-all duration-500">
        <!-- Leaflet Container -->
        <div id="mapDisplayContainer" class="lg:col-span-10 relative glass-panel rounded-xl overflow-hidden border border-slate-200 dark:border-white/5 shadow-inner">
          <div id="mapControlGroup"
            class="absolute bottom-4 right-4 z-[var(--z-map-control)] flex items-center bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-2xl transition-all">
            <button id="btnMapStateNormal" class="p-2.5 hover:bg-white/10 text-white border-r border-white/10 group" title="Normal">
              <i data-lucide="layout-dashboard" class="w-4 h-4 opacity-70 group-hover:opacity-100"></i>
            </button>
            <button id="btnMapStateExpanded" class="p-2.5 hover:bg-white/10 text-white border-r border-white/10 group" title="Expandido">
              <i data-lucide="maximize" class="w-4 h-4 opacity-70 group-hover:opacity-100"></i>
            </button>
            <button id="btnMapStateFull" class="p-2.5 hover:bg-white/10 text-white group" title="Completo">
              <i data-lucide="expand" class="w-4 h-4 opacity-70 group-hover:opacity-100"></i>
            </button>
          </div>

          <div id="mapView" class="absolute inset-0 z-[var(--z-map-base)] bg-slate-100 dark:bg-[#0B1120]"></div>

          <!-- Legend -->
          <div class="absolute bottom-12 left-4 z-[var(--z-map-overlay)] bg-white/90 dark:bg-[#0f172a]/95 backdrop-blur-md rounded-xl p-3 shadow-xl border border-slate-200 dark:border-white/10 text-[10px]">
            <div class="text-[9px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-widest mb-2 border-b border-slate-200 dark:border-slate-800 pb-1">Leyenda</div>
            <div class="flex flex-col gap-1.5">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-[#38BDF8]"></span><span>Viviendas</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-[#10B981]"></span><span>Efectiva</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-[#F59E0B]"></span><span>No Efectiva</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-[#EF4444]"></span><span>Alertas</span>
              </div>
            </div>
          </div>

          <!-- Coverage Badge -->
          <div id="mapCoverageBadge" class="absolute top-2.5 left-2.5 z-[var(--z-map-overlay)] bg-brand-blue/90 backdrop-blur-md rounded-xl px-2.5 py-2 border border-white/20 text-[10px] hidden">
            <div class="flex flex-col sm:flex-row items-center gap-2">
              <div class="flex flex-col items-center">
                <span id="mapMunCount" class="text-white font-black text-xs">0</span><span class="text-[7px] text-white/70 uppercase">Mun</span>
              </div>
              <div class="flex flex-col items-center">
                <span id="mapParCount" class="text-white font-black text-xs">0</span><span class="text-[7px] text-white/70 uppercase">Parr</span>
              </div>
              <div class="flex flex-col items-center">
                <span id="mapNodoCount" class="text-white font-black text-xs">0</span><span class="text-[7px] text-white/70 uppercase">Nodos</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side KPI Buttons -->
        <div id="mapKpiGrid" class="lg:col-span-2 grid grid-cols-2 sm:flex sm:flex-col gap-2">
          <!-- Toggle Button for Fullscreen Drawer -->
          <button id="btnToggleMapKpis" class="hidden glass-panel rounded-xl p-3 flex-col items-center justify-center border-2 border-brand-blue/30 group transition-all z-50 order-first sm:-order-none">
            <i data-lucide="layout-grid" class="w-5 h-5 text-brand-blue opacity-80"></i>
          </button>
          
          <button id="btnMapFilterAll" class="glass-panel rounded-xl p-3 flex items-center justify-between border-l-4 border-brand-blue hover:bg-slate-50 transition-all active-filter">
            <div class="flex items-center gap-1.5"><i data-lucide="layers" class="w-3.5 h-3.5 text-brand-blue opacity-80"></i><span class="text-[10px] font-bold uppercase">Todos</span></div>
            <span class="text-sm font-black" id="mapKpiPoints">0</span>
          </button>
          <button id="btnMapFilterEfectivas" class="glass-panel rounded-xl p-3 flex items-center justify-between border-l-4 border-brand-emerald">
            <div class="flex items-center gap-1.5"><i data-lucide="check-circle" class="w-3.5 h-3.5 text-brand-emerald opacity-80"></i><span class="text-[10px] font-bold uppercase">Efectivas</span></div>
            <span class="text-sm font-black" id="mapKpiComplete">0</span>
          </button>
          <button id="btnMapFilterNoEfectiva" class="glass-panel rounded-xl p-3 flex items-center justify-between border-l-4 border-brand-orange">
            <div class="flex items-center gap-1.5"><i data-lucide="help-circle" class="w-3.5 h-3.5 text-brand-orange opacity-80"></i><span class="text-[10px] font-bold uppercase">No Efect.</span></div>
            <span class="text-sm font-black" id="mapKpiNoEfectiva">0</span>
          </button>
          <button id="btnMapFilterAlertas" class="glass-panel rounded-xl p-3 flex items-center justify-between border-l-4 border-brand-red">
            <div class="flex items-center gap-1.5"><i data-lucide="shield-alert" class="w-3.5 h-3.5 text-brand-red opacity-80"></i><span class="text-[10px] font-bold uppercase">Alertas</span></div>
            <span class="text-sm font-black text-brand-red" id="mapKpiAlertas">0</span>
          </button>
          <button id="btnVerRutaEncuestador" disabled class="glass-panel rounded-xl p-3 flex items-center justify-between border-l-4 border-brand-orange disabled:opacity-40">
            <div class="flex items-center gap-1.5"><i data-lucide="route" class="w-3.5 h-3.5 text-brand-orange opacity-80"></i><span class="text-[10px] font-bold uppercase">Ver Ruta</span></div>
            <span id="mapRouteAgentCount" class="text-[10px] font-black">—</span>
          </button>
          <div class="glass-panel rounded-xl p-3 flex items-center justify-between border-l-4 border-brand-purple opacity-80">
            <div class="flex items-center gap-1.5"><i data-lucide="users" class="w-3.5 h-3.5 text-brand-purple opacity-80"></i><span class="text-[10px] font-bold uppercase">Encuestadores</span></div>
            <span class="text-sm font-black" id="mapKpiAgents">0</span>
          </div>
        </div>
      </div>

      <!-- Detail Grid (Stacked below) -->
      <div class="card-premium flex flex-col overflow-hidden p-0 lg:h-[85vh] lg:min-h-[750px] min-h-[600px] border border-slate-200 dark:border-white/5">
        <div class="p-5 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50 dark:bg-slate-900/50">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-brand-emerald/10 rounded-lg"><i data-lucide="database" class="text-brand-emerald w-5 h-5"></i></div>
            <div>
              <h3 class="font-bold font-outfit text-lg text-slate-800 dark:text-white">Motor de Datos Unificado</h3>
              <p class="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Explorador de registros</p>
            </div>
          </div>
          <div class="relative w-full sm:w-64">
            <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"></i>
            <input type="text" id="searchEncuesta" placeholder="Búsqueda rápida..."
              class="w-full bg-white dark:bg-[#0B1120] border border-slate-300 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs outline-none focus:ring-1" />
          </div>
        </div>
        <div class="flex-1 bg-white dark:bg-[#111827] relative">
          <div id="detailGrid" class="absolute inset-0 border-0"></div>
        </div>
      </div>
    </div>`;
}
