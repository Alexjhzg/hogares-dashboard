/**
 * ─── UI Component: Inconsistencias ───────────────────────────────────────────
 * Data quality audit view with alert cards and record grid.
 */

export function getInconsistenciasTabHTML() {
    return `
    <div id="tab-inconsistencias" class="tab-content flex flex-col gap-4 sm:gap-6 hidden-tab lg:h-[calc(100vh-180px)] h-auto overflow-y-auto lg:overflow-visible">
      <div class="flex justify-between items-end px-2">
        <div>
          <h2 class="text-2xl font-black font-outfit text-slate-900 dark:text-white">Motor de Inconsistencias</h2>
          <p class="text-sm text-slate-500">Detección automática de anomalías en el levantamiento.</p>
        </div>
      </div>

      <!-- Cards resumen por tipo de alerta -->
      <div id="inconsistenciasCards" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"></div>

      <!-- Tabla de detalle de registros con alertas -->
      <div id="inconsistenciasContainer" class="card-premium flex flex-col overflow-hidden p-0 min-h-[500px] lg:min-h-0">
        <div class="p-5 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50 dark:bg-slate-900/50">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-brand-red/10 rounded-lg"><i data-lucide="shield-alert" class="text-brand-red w-5 h-5"></i></div>
            <h3 class="font-bold font-outfit text-lg text-slate-800 dark:text-white">Registros con Alertas</h3>
          </div>
          <div class="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <select id="incFilterAlerta" class="bg-white dark:bg-[#0B1120] border rounded-xl px-3 py-2 text-xs outline-none focus:ring-1">
                <option value="">Todas las alertas</option>
            </select>
            <div class="relative w-full sm:w-64">
              <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"></i>
              <input type="text" id="incSearchInput" placeholder="Buscar..." class="w-full bg-white dark:bg-[#0B1120] border rounded-xl pl-10 pr-8 py-2 text-xs outline-none" />
              <button id="incClearSearch" class="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hidden"><i data-lucide="x" class="w-4 h-4"></i></button>
            </div>
          </div>
        </div>
        <div id="inconsistenciasTable" class="w-full" style="height: 500px;"></div>
      </div>
    </div>`;
}
