/**
 * ─── UI Component: Detail Modal ──────────────────────────────────────────────
 * Large dialog for inspecting individual survey records.
 */

export function getDetailModalHTML() {
    return `
    <div id="detailModal" class="hidden fixed inset-0 z-[var(--z-modal)] flex items-center justify-center">
      <div class="absolute inset-0 bg-[#0B1120]/80 backdrop-blur-md" id="detailModalBackdrop"></div>
      <div
        class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-0 rounded-xl sm:rounded-2xl z-10 w-[95%] sm:w-11/12 max-w-7xl text-slate-800 dark:text-slate-200 shadow-2xl overflow-hidden flex flex-col transform transition-all scale-95 opacity-0"
        id="detailModalPane" role="dialog" aria-modal="true" aria-labelledby="detailModalTitle">
        <div class="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/50">
          <h3 id="detailModalTitle" class="font-outfit font-black text-xl text-slate-900 dark:text-white flex items-center gap-3">
            <i data-lucide="file-json" class="text-brand-purple w-6 h-6"></i> Ficha de Inspección
          </h3>
          <div class="flex items-center gap-2">
            <button id="btnDetailExpand" class="p-2 bg-white dark:bg-slate-800 rounded-lg text-slate-500 hover:text-slate-900 transition-all border border-slate-200 dark:border-slate-700">
              <i data-lucide="maximize" id="detailModalExpandIcon" class="w-4 h-4"></i>
            </button>
            <button id="btnDetailClose" class="p-2 bg-white dark:bg-slate-800 rounded-lg text-slate-500 hover:text-slate-900 transition-all border border-slate-200 dark:border-slate-700">
              <i data-lucide="x" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
        <div id="detailModalBody" class="overflow-y-auto max-h-[75vh] p-6 text-sm font-inter custom-scrollbar" tabindex="0">
          <!-- Inject dynamic content here -->
        </div>
      </div>
    </div>`;
}
