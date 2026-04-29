/**
 * ─── UI Component: Ranking ───────────────────────────────────────────────────
 * Performance leaderboard and productivity KPIs.
 */

export function getRankingTabHTML() {
    return `
    <div id="tab-ranking" class="tab-content flex flex-col gap-8 hidden-tab animate-fade-in">
      <!-- Resumen de Desempeño Global -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="glass-panel rounded-2xl p-4 !border-l-4 !border-brand-emerald">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-brand-emerald/10 rounded-lg text-brand-emerald">
              <i data-lucide="check-circle" class="w-5 h-5"></i>
            </div>
            <div>
              <p class="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-widest font-sans mt-0">Efectivas</p>
              <h3 class="font-black font-outfit text-2xl text-slate-900 dark:text-white mt-0.5" id="rankKpiEfectivas">0</h3>
            </div>
          </div>
        </div>

        <div class="glass-panel rounded-2xl p-4 !border-l-4 !border-brand-orange">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-brand-orange/10 rounded-lg text-brand-orange">
              <i data-lucide="help-circle" class="w-5 h-5"></i>
            </div>
            <div>
              <p class="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-widest font-sans mt-0">No Efectiva</p>
              <h3 class="font-black font-outfit text-2xl text-slate-900 dark:text-white mt-0.5" id="rankKpiNoEfectiva">0</h3>
            </div>
          </div>
        </div>

        <div class="glass-panel rounded-2xl p-4 !border-l-4 !border-brand-red">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-brand-red/10 rounded-lg text-brand-red">
              <i data-lucide="alert-triangle" class="w-5 h-5"></i>
            </div>
            <div>
              <p class="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-widest font-sans mt-0">Alertas Totales</p>
              <h3 class="font-black font-outfit text-2xl text-brand-red mt-0.5" id="rankKpiAlerts">0</h3>
            </div>
          </div>
        </div>
      </div>

      <div class="glass-panel rounded-2xl p-6 flex flex-col">
          <header class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b border-slate-200/50 dark:border-white/5">
            <div class="flex items-center gap-3">
              <div class="p-2.5 bg-brand-orange/10 rounded-xl"><i data-lucide="award" class="text-brand-orange w-6 h-6"></i></div>
              <div>
                <h3 class="font-bold font-outfit text-xl text-slate-800 dark:text-white">Clasificación de Encuestadores</h3>
                <p class="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-0.5">Top por efectividad operativa</p>
              </div>
            </div>
            <div class="flex items-center gap-1 p-1 bg-slate-100 dark:bg-white/5 rounded-lg border border-slate-200/50">
              <button class="sort-btn px-2.5 py-1.5 text-[9px] font-black uppercase rounded-md active" data-sort="eficiencia">Eficiencia</button>
              <button class="sort-btn px-2.5 py-1.5 text-[9px] font-black uppercase rounded-md" data-sort="encuestas">Volumen</button>
            </div>
          </header>
          <div id="rankingTable" class="flex-1 border-0 custom-scrollbar"></div>
      </div>
    </div>`;
}
