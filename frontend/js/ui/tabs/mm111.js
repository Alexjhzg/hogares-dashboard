/**
 * ─── UI Component: MM-111 ────────────────────────────────────────────────────
 * Geographic Sampling Framework View.
 */

export function getMM111TabHTML() {
    return `
    <div id="tab-mm111" class="tab-content flex flex-col gap-4 sm:gap-6 hidden-tab lg:h-[calc(100vh-180px)] h-auto overflow-y-auto lg:overflow-visible">
      <!-- Cabecera Institucional y Geográfica -->
      <div class="glass-panel rounded-2xl p-4 sm:p-6 border-t-4 border-t-brand-blue flex flex-col gap-4 sm:gap-6 shadow-sm">
        <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-slate-200 dark:border-slate-800 pb-4 gap-4">
          <div class="flex items-center gap-3 sm:gap-4 shrink-0">
            <div class="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 shrink-0">
              <svg class="w-6 h-6 sm:w-8 sm:h-8 text-slate-800 dark:text-white" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2">
                <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" />
                <path d="M14 2v6h6" />
                <path d="m3 12.5 5 5 9-9" />
              </svg>
            </div>
            <div>
              <h1 class="text-lg sm:text-2xl font-black font-outfit tracking-tight text-slate-800 dark:text-white leading-tight">
                Marco Maestro de Muestreo (VIV MM-111)</h1>
              <p class="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-widest mt-0.5">(CRTE) - INSTITUTO NACIONAL DE ESTADÍSTICA</p>
            </div>
          </div>

          <div class="lg:mt-0 flex flex-col items-stretch lg:items-end w-full lg:w-auto">
            <label class="text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1.5 ml-1 lg:text-right flex items-center lg:justify-end gap-2">
              Seleccionar Planilla Física (Control Nro.)
              <span id="mm111FilteredCount" class="bg-brand-blue/10 text-brand-blue px-2 py-0.5 rounded-md text-[9px] font-black border border-brand-blue/20">0</span>
            </label>
            <div class="flex items-center gap-2">
              <div class="relative flex-1 lg:w-80 group">
                <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand-blue transition-colors"></i>
                <input type="text" id="mm111SearchControl" autocomplete="off" placeholder="Buscar Control..."
                  class="w-full bg-slate-50 dark:bg-surface-dark border-2 border-brand-blue/30 rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-800 dark:text-white font-bold outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 transition-all font-outfit" />
                
                <button id="mm111ClearSearch" class="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hidden">
                   <i data-lucide="x" class="w-4 h-4"></i>
                </button>

                <!-- Search Results Dropdown -->
                <div id="mm111SearchResults" class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl z-[100] max-h-64 overflow-y-auto hidden glass-panel">
                  <div class="p-2 space-y-1" id="mm111ResultsList">
                    <!-- Results will be injected here -->
                  </div>
                </div>
              </div>
              <button id="btnLoadMM111" class="btn-primary py-2.5 px-4 sm:px-6 shadow-lg shadow-brand-blue/20 flex items-center gap-2">
                <i data-lucide="map-pin" class="w-4 h-4"></i>
                <span>Localizar</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Segmento Geográfico -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="p-3 bg-slate-50 dark:bg-surface-dark/60 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <div>
              <p class="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Entidad Federal</p>
              <p class="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1 truncate" id="mm111Entidad">---</p>
            </div>
            <div class="bg-slate-200 dark:bg-slate-800 px-3 py-1.5 rounded-lg text-xs font-black font-outfit border border-slate-300 dark:border-slate-700" id="mm111EntidadCod">--</div>
          </div>
          <div class="p-3 bg-slate-50 dark:bg-surface-dark/60 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <div>
              <p class="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Municipio</p>
              <p class="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1 truncate" id="mm111Municipio">---</p>
            </div>
            <div class="bg-slate-200 dark:bg-slate-800 px-3 py-1.5 rounded-lg text-xs font-black font-outfit border border-slate-300 dark:border-slate-700" id="mm111MunicipioCod">--</div>
          </div>
          <div class="p-3 bg-slate-50 dark:bg-surface-dark/60 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <div>
              <p class="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Parroquia</p>
              <p class="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1 truncate" id="mm111Parroquia">---</p>
            </div>
            <div class="bg-slate-200 dark:bg-slate-800 px-3 py-1.5 rounded-lg text-xs font-black font-outfit border border-slate-300 dark:border-slate-700" id="mm111ParroquiaCod">--</div>
          </div>
          <div class="p-3 bg-slate-50 dark:bg-surface-dark/60 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <div>
              <p class="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Centro Poblado</p>
              <p class="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1 truncate" id="mm111CPoblado">---</p>
            </div>
            <div class="bg-slate-200 dark:bg-slate-800 px-3 py-1.5 rounded-lg text-xs font-black font-outfit border border-slate-300 dark:border-slate-700" id="mm111CPobladoCod">--</div>
          </div>
        </div>

        <!-- Barra de Controles Operativos -->
        <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-[1px] bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <div class="px-4 py-3 flex flex-col items-center justify-center text-center bg-white dark:bg-surface-dark">
            <span class="text-[9px] uppercase font-bold text-slate-500">Segmento</span>
            <div class="text-sm font-black font-outfit mt-1 text-slate-800 dark:text-slate-300" id="mm111Segmento">-</div>
          </div>
          <div class="px-4 py-3 flex flex-col items-center justify-center text-center bg-white dark:bg-surface-dark">
            <span class="text-[9px] uppercase font-bold text-slate-500">Sector</span>
            <div class="text-sm font-black font-outfit mt-1 text-slate-800 dark:text-slate-300" id="mm111Sector">-</div>
          </div>
          <div class="px-4 py-3 flex flex-col items-center justify-center text-center bg-white dark:bg-surface-dark">
            <span class="text-[9px] uppercase font-bold text-slate-500">Nodo</span>
            <div class="text-sm font-black font-outfit mt-1 text-slate-800 dark:text-slate-300" id="mm111Nodo">-</div>
          </div>
          <div class="px-4 py-3 flex flex-col items-center justify-center text-center bg-white dark:bg-surface-dark">
            <span class="text-[9px] uppercase font-bold text-slate-500">Semana</span>
            <div class="text-sm font-black font-outfit mt-1 text-slate-800 dark:text-slate-300" id="mm111Semana">-</div>
          </div>
          <div class="px-4 py-3 flex flex-col items-center justify-center text-center bg-white dark:bg-surface-dark col-span-2 sm:col-span-4 lg:col-span-1">
            <span class="text-[9px] uppercase font-bold text-slate-500">Control Maestro</span>
            <div class="text-sm font-black font-outfit mt-1 text-slate-800 dark:text-slate-300 truncate w-full" id="mm111ControlMaestro">-</div>
          </div>
          <div class="px-4 py-3 flex flex-col items-center justify-center text-center bg-yellow-50 dark:bg-yellow-500/5 border-x border-yellow-100 dark:border-yellow-500/10">
            <span class="text-[10px] uppercase font-black text-yellow-600 dark:text-yellow-400">Control Nro.</span>
            <div class="text-lg font-black font-outfit text-yellow-700 dark:text-yellow-200" id="mm111ControlNro">0000</div>
          </div>
          <div class="px-4 py-3 flex flex-col items-center justify-center text-center bg-white dark:bg-surface-dark">
            <span class="text-[9px] uppercase font-bold text-slate-500">Lote</span>
            <div class="text-sm font-black font-outfit mt-1 text-slate-800 dark:text-slate-300" id="mm111Lote">-</div>
          </div>
        </div>
      </div>

      <!-- Tabla de Listado de Viviendas -->
      <div class="card-premium flex-1 flex flex-col p-0 overflow-hidden border-2 border-slate-200 dark:border-slate-700 mt-4 relative min-h-[500px] lg:min-h-0">
        <div id="mm111Grid" class="w-full h-full bg-white dark:bg-surface-dark"></div>
      </div>
    </div>`;
}
