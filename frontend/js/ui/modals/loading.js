/**
 * ─── UI Component: Loading Overlay ───────────────────────────────────────────
 * Splash screen for initial data fetch and processing.
 */

export function getLoadingOverlayHTML() {
    return `
    <div id="loadingOverlay"
      class="fixed inset-0 z-[var(--z-loader)] bg-[#0B1120]/90 backdrop-blur-xl flex flex-col items-center justify-center gap-6 pointer-events-none opacity-0 transition-opacity duration-500">
      <div class="relative w-16 h-16">
        <div class="absolute inset-0 rounded-full border-t-2 border-brand-blue animate-spin"></div>
        <div class="absolute inset-2 rounded-full border-r-2 border-brand-purple animate-spin"
          style="animation-direction: reverse; animation-duration: 1.5s;"></div>
        <i data-lucide="database-zap" class="absolute inset-0 m-auto text-slate-400 w-6 h-6 animate-pulse"></i>
      </div>
      <div class="text-center">
        <h3 class="font-outfit font-bold text-lg text-white mb-1">Cargando Datasets</h3>
        <p id="loadingMsg" class="text-xs font-medium text-slate-400 font-inter uppercase tracking-widest">Procesando vectores...</p>
      </div>
    </div>`;
}
