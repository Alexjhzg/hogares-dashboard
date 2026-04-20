/**
 * ─── UI Component: Error State Modal ─────────────────────────────────────────
 * Full-screen overlay for critical connection failures.
 */

export function getErrorStateHTML() {
    return `
    <div id="errorState"
      class="hidden fixed inset-0 z-[120] bg-[#0B1120]/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center">
      <div
        class="w-24 h-24 bg-brand-red/10 rounded-full flex items-center justify-center mb-6 ring-[12px] ring-brand-red/5 animate-pulse">
        <i data-lucide="power-off" class="text-brand-red w-10 h-10"></i>
      </div>
      <h2 class="text-4xl font-black font-outfit text-white mb-3">Conexión Caída</h2>
      <p id="errorMsg"
        class="text-slate-400 max-w-md mb-8 text-sm leading-relaxed border border-slate-800 bg-slate-900/50 p-4 rounded-xl">
        Error crítico al intentar obtener los datasets desde el servidor local.
      </p>
      <button id="btnRetryConnection" class="btn-primary px-8 py-3 text-lg font-bold">
        <i data-lucide="refresh-cw" class="w-5 h-5"></i> Forzar Reintento
      </button>
    </div>`;
}
