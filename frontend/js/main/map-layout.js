import { state } from '../state.js';
import { $ } from '../helpers.js';

/**
 * Manages the different layout states for the map section.
 * Modes: 'normal', 'expanded', 'full'
 */
export function setMapState(mode) {
    const wrapper = $('mapSectionWrapper');
    const kpiGrid = $('mapKpiGrid');
    const mapContainer = $('mapDisplayContainer');
    const headerLabel = kpiGrid ? kpiGrid.querySelector('.header-label') : null;
    
    if (!wrapper || !kpiGrid || !mapContainer) return;

    // 1. ABSOLUTE RESET: Clean up conflicting classes
    document.body.classList.remove('has-map-fullscreen');
    
    // Reset Wrapper
    wrapper.className = "flex flex-col lg:grid lg:grid-cols-12 gap-4 sm:gap-8 transition-all duration-500 overflow-visible items-stretch";
    
    // Reset Map Container
    mapContainer.className = "lg:col-span-10 relative transition-all duration-500 rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-slate-900";
    
    // Reset KPI Grid
    kpiGrid.className = "lg:col-span-2 transition-all duration-500 overflow-visible flex flex-col gap-3";
    
    // Reset Header Label
    if (headerLabel) {
        headerLabel.className = "header-label text-[9px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-widest ml-1 mb-1";
    }

    // Reset specific buttons and panels
    const toggleBtn = $('btnToggleMapKpis');
    if (toggleBtn) toggleBtn.classList.add('hidden');

    kpiGrid.querySelectorAll('button:not(#btnToggleMapKpis), div.glass-panel').forEach(el => {
        el.className = el.id === 'btnVerRutaEncuestador' ? 
            "glass-panel rounded-xl p-3 flex items-center justify-between border-l-4 border-brand-orange hover:bg-brand-orange/5 transition-all group disabled:opacity-40 disabled:cursor-not-allowed" :
            "glass-panel rounded-xl p-3 flex items-center justify-between border-l-4 hover:bg-slate-100/50 dark:hover:bg-white/5 transition-all group";
        
        // Restore border colors based on ID
        if (el.id === 'btnMapFilterAll') el.classList.add('border-brand-blue');
        if (el.id === 'btnMapFilterEfectivas') el.classList.add('border-brand-emerald');
        if (el.id === 'btnMapFilterNoEfectiva') el.classList.add('border-brand-orange');
        if (el.id === 'btnMapFilterAlertas') el.classList.add('border-brand-red');
        if (el.classList.contains('opacity-80') || el.id === 'kpiMapEncuestadorContainer') {
            el.classList.add('border-brand-purple');
        }

        const label = el.querySelector('span.uppercase');
        if (label) label.classList.remove('hidden');
    });

    // 2. APPLY MODE SPECIFIC CLASSES
    if (mode === 'normal') {
        wrapper.classList.add('h-auto', 'lg:h-[88vh]', 'lg:min-h-[700px]');
        mapContainer.classList.add('h-[500px]', 'lg:h-auto', 'lg:col-span-10');
        kpiGrid.classList.add('grid', 'grid-cols-2', 'sm:flex', 'sm:flex-col', 'gap-2');
        if (headerLabel) headerLabel.classList.add('hidden', 'sm:block');
        
        kpiGrid.querySelectorAll(':scope > button, :scope > div.glass-panel').forEach(el => {
            if (el.id === 'btnToggleMapKpis') return;
            el.classList.add('flex-row', 'items-center', 'justify-between');
        });
    } 
    else if (mode === 'expanded') {
        wrapper.className = "flex flex-col items-center gap-6 transition-all duration-500 w-full mb-8";
        mapContainer.className = "w-full h-[75vh] relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10";
        kpiGrid.className = "flex flex-wrap sm:flex-nowrap grid grid-cols-2 sm:flex flex-row gap-2 sm:gap-8 mt-4 sm:mt-6 mx-auto max-w-[95%] sm:max-w-fit bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-white/10 px-4 sm:px-10 py-1.5 sm:py-2 shadow-2xl";
        
        if (headerLabel) headerLabel.classList.add('hidden');

        kpiGrid.querySelectorAll(':scope > button, :scope > div.glass-panel').forEach(el => {
            if (el.id === 'btnToggleMapKpis') return;
            el.classList.add('flex-col', 'items-center', 'justify-center', 'min-w-0', 'sm:min-w-[130px]', 'flex-1', 'border-l-0', 'border-b-2', 'sm:border-b-4', 'gap-0.5', 'py-1', 'sm:py-1.5', 'px-2');
        });
    } 
    else if (mode === 'full') {
        mapContainer.className = "map-fullscreen fixed inset-0 z-[var(--z-map-full)] bg-slate-900";
        document.body.classList.add('has-map-fullscreen');
        kpiGrid.className = "flex flex-col-reverse sm:flex-row fixed bottom-40 sm:bottom-6 left-4 sm:left-1/2 sm:-translate-x-1/2 z-[var(--z-map-full-controls)] gap-2 transition-all duration-300 items-start sm:items-center w-auto sm:max-w-fit";
        
        const toggleBtnFull = $('btnToggleMapKpis');
        if (toggleBtnFull) toggleBtnFull.classList.remove('hidden');

        if (headerLabel) headerLabel.classList.add('hidden');

        kpiGrid.querySelectorAll(':scope > button, :scope > div.glass-panel').forEach(el => {
            if (el.id === 'btnToggleMapKpis') return;
            el.classList.add('flex', 'flex-col', 'items-center', 'justify-center', 'min-w-[55px]', 'sm:min-w-[75px]', 'border-2', 'rounded-xl', 'shadow-lg', 'gap-0', 'p-2');
            const label = el.querySelector('span.uppercase');
            if (label) label.classList.add('hidden');
            el.classList.add('kpi-drawer-item');
        });

        kpiGrid.classList.add('kpi-drawer-collapsed');
    }

    // 3. UI FEEDBACK AND COMPONENT UPDATES
    ['Normal', 'Expanded', 'Full'].forEach(m => {
        const btn = $(`btnMapState${m}`);
        if (btn) {
            const isActive = mode === m.toLowerCase();
            btn.classList.toggle('bg-white/30', isActive);
        }
    });

    if (window.lucide) window.lucide.createIcons();
    setTimeout(() => { 
        if (state.map) state.map.invalidateSize(); 
    }, 600);
}
