/**
 * ─── UI Component: Ranking ───────────────────────────────────────────────────
 * Performance leaderboard and productivity KPIs.
 */

export function getRankingTabHTML() {
    return `
    <div id="tab-ranking" class="tab-content flex flex-col gap-8 hidden-tab animate-fade-in">
      <!-- Resumen de Desempeño y Tasa de No Respuesta Global -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="glass-panel rounded-2xl p-4 !border-l-4 !border-brand-purple">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-brand-purple/10 rounded-lg text-brand-purple">
              <i data-lucide="percent" class="w-5 h-5"></i>
            </div>
            <div>
              <p class="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-widest font-sans mt-0">Tasa de No Respuesta (TIPO A)</p>
              <div class="flex items-baseline gap-2 mt-0.5">
                <h3 class="font-black font-outfit text-2xl text-slate-900 dark:text-white mt-0" id="rankKpiPctNoRespuesta">0%</h3>
                <span class="text-xs text-slate-500 font-bold" id="rankKpiNoEfectivaSub">(0 Tipo A)</span>
              </div>
            </div>
          </div>
        </div>

        <div class="glass-panel rounded-2xl p-4 !border-l-4 !border-brand-emerald">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-brand-emerald/10 rounded-lg text-brand-emerald">
              <i data-lucide="check-circle" class="w-5 h-5"></i>
            </div>
            <div>
              <p class="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-widest font-sans mt-0">Encuestas Efectivas (TIPO E)</p>
              <div class="flex items-baseline gap-2 mt-0.5">
                <h3 class="font-black font-outfit text-2xl text-slate-900 dark:text-white mt-0" id="rankKpiEfectivas">0</h3>
                <span class="text-xs text-brand-emerald font-bold" id="rankKpiPctEfectivas">(0%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="glass-panel rounded-2xl p-6 flex flex-col">
          <header class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b border-slate-200/50 dark:border-white/5">
            <div class="flex items-center gap-3">
              <div class="p-2.5 bg-brand-purple/10 rounded-xl"><i data-lucide="award" class="text-brand-purple w-6 h-6"></i></div>
              <div>
                <h3 class="font-bold font-outfit text-xl text-slate-800 dark:text-white">Tasa de No Respuesta y Desempeño Operativo</h3>
                <p class="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-0.5">Ranking por encuestador y desglose tipológico</p>
              </div>
            </div>
            <div class="flex items-center gap-1 p-1 bg-slate-100 dark:bg-white/5 rounded-lg border border-slate-200/50">
              <button class="sort-btn px-2.5 py-1.5 text-[9px] font-black uppercase rounded-md active" data-sort="norespuesta">No Respuesta</button>
              <button class="sort-btn px-2.5 py-1.5 text-[9px] font-black uppercase rounded-md" data-sort="eficiencia">Eficiencia</button>
              <button class="sort-btn px-2.5 py-1.5 text-[9px] font-black uppercase rounded-md" data-sort="encuestas">Volumen</button>
            </div>
          </header>
          <div id="rankingTable" class="flex-1 border-0 custom-scrollbar"></div>
      </div>
    </div>`;
}
