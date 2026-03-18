// ─── API Communication ───────────────────────────────────────────────────────
// Handles all fetch calls to the backend. Calls renderAll via callback to
// avoid circular imports.

import { BACKEND_URL } from './config.js';
import { state } from './state.js';
import { $ } from './helpers.js';

export function showLoading(msg) {
    const overlay = $('loadingOverlay');
    if (!overlay) return;
    overlay.style.display = 'flex';
    overlay.style.opacity = '1';
    overlay.style.pointerEvents = 'all';
    $('loadingMsg').textContent = msg;
}

export function hideLoading() {
    const overlay = $('loadingOverlay');
    if (!overlay) return;
    overlay.style.display = 'none';
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
}

/**
 * Load the list of available KoboToolbox assets (forms) and populate the
 * select element. Auto-selects "ESCA Ampliada V3" if present.
 * @param {Function} onDataLoaded - callback called with uid when data should be loaded
 */
export async function loadAssets(onDataLoaded) {
    console.log('api.js: Iniciando loadAssets()...');
    showLoading('Buscando formularios en KoboToolbox…');
    try {
        const url = `${BACKEND_URL}/api/assets`;
        const response = await fetch(url);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error API (${response.status}): ${errorText}`);
        }
        const assets = await response.json();
        const sel = $('assetSelect');
        sel.innerHTML = '<option value="">— Seleccionar encuesta —</option>';

        assets.forEach(a => {
            const opt = document.createElement('option');
            opt.value = a.uid;
            opt.textContent = a.name;
            sel.appendChild(opt);
        });

        hideLoading();
        const badge = $('statusBadge');
        if (badge) badge.textContent = 'Conectado';
        if (window.lucide) lucide.createIcons();

        // Auto-select "ESCA Ampliada V3"
        const escaV3 = assets.find(a =>
            a.name.toLowerCase().includes('esca') && a.name.toLowerCase().includes('v3')
        );
        if (escaV3) {
            sel.value = escaV3.uid;
            if (onDataLoaded) onDataLoaded(escaV3.uid);
        }
    } catch (err) {
        console.error(err);
        hideLoading();
        const errState = $('errorState');
        if (errState) errState.style.display = 'flex';
        const badge = $('statusBadge');
        if (badge) {
            badge.textContent = 'Error de conexión';
            badge.classList.remove('active');
        }
    }
}

/**
 * Download all survey submissions for the given asset UID.
 * @param {string} uid - asset UID
 * @param {Function} onProcessData - callback called after data is stored in state.rawData
 */
export async function loadData(uid, onProcessData) {
    if (!uid) return;
    showLoading('Descargando datos desde Kobo API…');
    const btnRefresh = $('btnRefresh');
    if (btnRefresh) btnRefresh.disabled = true;

    try {
        const response = await fetch(`${BACKEND_URL}/api/data/${uid}`);
        if (!response.ok) throw new Error('Error al descargar los datos');

        const json = await response.json();
        state.rawData = json.results || [];

        if (onProcessData) onProcessData();

        const badge = $('statusBadge');
        if (badge) badge.textContent = `${state.rawData.length} registros`;
        const errState = $('errorState');
        if (errState) errState.classList.add('hidden');
        const mainContent = $('mainContent');
        if (mainContent) mainContent.classList.remove('hidden');
        if (window.lucide) lucide.createIcons();
    } catch (err) {
        alert('Error: ' + err.message);
    } finally {
        hideLoading();
        if (btnRefresh) btnRefresh.disabled = false;
    }
}

// Expose loadAssets globally for the inline onclick in errorState HTML
window.loadAssets = () => loadAssets(uid => loadData(uid, window.__onProcessData));
