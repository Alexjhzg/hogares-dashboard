/**
 * ─── API (Refactorized Orchestrator) ─────────────────────────────────────────
 * Coordinates between network services (services.js), local persistence 
 * (cache.js), and feedback UI (ui.js).
 */

import { state } from '../core/index.js';
import { $ } from '../utils/index.js';

// Sub-modules
import { showLoading, hideLoading, setConnectionUI } from './ui.js';
import { DB } from './cache.js';
import { fetchAssets, fetchSurveyData } from './services.js';

// Re-export UI helpers for other modules to use
export { showLoading, hideLoading, setConnectionUI };

/**
 * Load the list of available KoboToolbox assets (forms) and populate the
 * select element. Auto-selects "ESCA Ampliada V3" if present.
 * @param {Function} onDataLoaded - callback called with uid when data should be loaded
 */
export async function loadAssets(onDataLoaded) {
    console.log('api/index.js: Orchestrating loadAssets()...');
    showLoading('Buscando formularios en KoboToolbox…');
    
    let assets = null;
    
    try {
        // Try Network
        assets = await fetchAssets();
        await DB.set('assets_cache', assets);
        setConnectionUI(true);
    } catch (err) {
        console.warn('Network failure. Trying cache...', err);
        assets = await DB.get('assets_cache');
        if (assets) setConnectionUI(false);
    }

    if (!assets) {
        hideLoading();
        if ($('errorState')) $('errorState').style.display = 'flex';
        const badge = $('statusBadge');
        if (badge) {
            badge.textContent = 'Error de conexión';
            badge.classList.remove('active');
        }
        setConnectionUI(false);
        return;
    }

    // UI: Populate Select
    const sel = $('assetSelect');
    if (sel) {
        sel.innerHTML = '<option value="">— Seleccionar encuesta —</option>';
        assets.forEach(a => {
            const opt = document.createElement('option');
            opt.value = a.uid;
            opt.textContent = a.name;
            sel.appendChild(opt);
        });

        // Track asset name on manual selection changes
        sel.addEventListener('change', () => {
            const opt = sel.options[sel.selectedIndex];
            state.assetName = opt ? opt.textContent.trim() : '';
        });
    }

    const badge = $('statusBadge');
    if (badge) badge.textContent = 'Formularios Listos';
    if (window.lucide) lucide.createIcons();

    // Auto-select "ESCA Ampliada V3"
    const escaV3 = assets.find(a =>
        a.name.toLowerCase().includes('esca') && a.name.toLowerCase().includes('v3')
    );

    if (escaV3) {
        if (sel) sel.value = escaV3.uid;
        state.assetName = escaV3.name;
        if (onDataLoaded) onDataLoaded(escaV3.uid);
    } else {
        // If no auto-select, we finally hide the loader so user can choose
        hideLoading();
    }
}

/**
 * Download all survey submissions for the given asset UID.
 * @param {string} uid - asset UID
 * @param {Function} onDataProcessed - callback called after data is stored in state.rawData
 * @param {boolean} refresh - Force refresh from Kobo (bypasses server and browser cache)
 */
export async function loadData(uid, onDataProcessed, refresh = false) {
    if (!uid) return;
    showLoading(refresh ? 'Sincronizando con KoboToolbox…' : 'Descargando datos desde el servidor…');
    const btnRefresh = $('btnRefresh');
    if (btnRefresh) btnRefresh.disabled = true;

    let jsonData = null;
    let isOfflineMode = false;

    try {
        // Try Network
        jsonData = await fetchSurveyData(uid, refresh);
        await DB.set(`data_cache_${uid}`, jsonData);
        setConnectionUI(true);
    } catch (err) {
        console.warn('Network failure. Trying cache...', err);
        // Only try cache if NOT a forced refresh
        if (!refresh) {
            jsonData = await DB.get(`data_cache_${uid}`);
            if (jsonData) {
                isOfflineMode = true;
                setConnectionUI(false);
            }
        }
    }

    if (!jsonData) {
        alert('Error: No se pudieron descargar los datos y no hay caché disponible.');
        hideLoading();
        if (btnRefresh) btnRefresh.disabled = false;
        return;
    }

    state.rawData = jsonData.results || (Array.isArray(jsonData) ? jsonData : []);
    console.log(`api/index.js: Loaded ${state.rawData.length} records ${isOfflineMode ? '(Offline Cache)' : ''}`);

    const badge = $('statusBadge');
    if (badge) badge.textContent = `${state.rawData.length} registros`;

    // ── Pre-Render Block ─────────────────────────────────────────────────────
    // 1. Show main container shell immediately
    if ($('errorState')) $('errorState').classList.add('hidden');
    if ($('mainContent')) $('mainContent').classList.remove('hidden');
    
    showLoading('Renderizando dashboard...');

    // 2. Yield process to let browser paint the shell while loader is visible
    requestAnimationFrame(() => {
        setTimeout(async () => {
            // 3. Start Heavy Processing & Rendering
            if (onDataProcessed) await onDataProcessed();
            if (window.lucide) lucide.createIcons();

            // 4. Final yield to ensure charts/maps finished their first paint
            requestAnimationFrame(() => {
                setTimeout(() => {
                    hideLoading();
                    if (btnRefresh) btnRefresh.disabled = false;
                }, 800); // 800ms buffer after heavy work finishes
            });
        }, 100);
    });
}

// Expose loadAssets globally for legacy support in index.html (onclick)
window.loadAssets = () => loadAssets(uid => loadData(uid, window.__onProcessData));
