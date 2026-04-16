// ─── API Communication ───────────────────────────────────────────────────────
// Handles all fetch calls to the backend. Calls renderAll via callback to
// avoid circular imports.

import { BACKEND_URL } from './config.js?v=39';
import { state } from './state.js?v=39';
import { $ } from './helpers.js?v=39';

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

// ─── IndexedDB Helper ────────────────────────────────────────────────────────
const dbName = 'KoboDashboardDB';
const storeName = 'cacheStore';

const DB = {
    async open() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(dbName, 1);
            request.onerror = () => reject('Error opening DB');
            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains(storeName)) {
                    db.createObjectStore(storeName);
                }
            };
            request.onsuccess = (e) => resolve(e.target.result);
        });
    },
    async get(key) {
        const db = await this.open();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(storeName, 'readonly');
            const store = tx.objectStore(storeName);
            const request = store.get(key);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },
    async set(key, value) {
        const db = await this.open();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(storeName, 'readwrite');
            const store = tx.objectStore(storeName);
            const request = store.put(value, key);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }
};

export function setConnectionUI(isOnline) {
    const statusText = document.getElementById('connectionStatus');
    const dot = document.getElementById('connectionDot');
    const ping = document.getElementById('connectionPing');
    if (!statusText || !dot) return;

    if (isOnline) {
        statusText.textContent = 'Live Connection';
        statusText.classList.remove('text-amber-500');
        statusText.classList.add('text-emerald-400');
        dot.className = 'relative inline-flex rounded-full h-2 w-2 bg-brand-emerald';
        if(ping) ping.className = 'animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-emerald opacity-75';
    } else {
        statusText.textContent = 'Modo Offline - Datos Cacheados';
        statusText.classList.remove('text-emerald-400', 'text-slate-400');
        statusText.classList.add('text-amber-500');
        dot.className = 'relative inline-flex rounded-full h-2 w-2 bg-amber-500';
        if(ping) ping.className = 'absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-20';
    }
}

/**
 * Load the list of available KoboToolbox assets (forms) and populate the
 * select element. Auto-selects "ESCA Ampliada V3" if present.
 * @param {Function} onDataLoaded - callback called with uid when data should be loaded
 */
export async function loadAssets(onDataLoaded) {
    console.log('api.js: Iniciando loadAssets()...');
    showLoading('Buscando formularios en KoboToolbox…');
    
    let assets = null;
    
    try {
        const url = `${BACKEND_URL}/api/assets`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error API (${response.status})`);
        }
        assets = await response.json();
        await DB.set('assets_cache', assets);
        setConnectionUI(true);
    } catch (err) {
        console.warn('Fallo al obtener assets del servidor. Intentando usar caché...', err);
        try {
            assets = await DB.get('assets_cache');
            if (assets) {
                setConnectionUI(false);
            }
        } catch (dbErr) {
            console.error('Error al leer caché de assets', dbErr);
        }
    }

    if (!assets) {
        hideLoading();
        const errState = $('errorState');
        if (errState) errState.style.display = 'flex';
        const badge = $('statusBadge');
        if (badge) {
            badge.textContent = 'Error de conexión';
            badge.classList.remove('active');
        }
        setConnectionUI(false);
        return;
    }

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
        state.assetName = escaV3.name;
        if (onDataLoaded) onDataLoaded(escaV3.uid);
    }
    // Track asset name on manual selection changes
    sel.addEventListener('change', () => {
        const opt = sel.options[sel.selectedIndex];
        state.assetName = opt ? opt.textContent.trim() : '';
    });
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

    let jsonData = null;
    let isOfflineMode = false;

    try {
        const response = await fetch(`${BACKEND_URL}/api/data/${uid}`);
        if (!response.ok) throw new Error('Error al descargar los datos');

        jsonData = await response.json();
        await DB.set(`data_cache_${uid}`, jsonData);
        setConnectionUI(true);
    } catch (err) {
        console.warn('Fallo al obtener datos de red. Buscando en caché...', err);
        try {
            jsonData = await DB.get(`data_cache_${uid}`);
            if (jsonData) {
                isOfflineMode = true;
                setConnectionUI(false);
            }
        } catch(dbErr) {
            console.error('Error al leer caché de datos', dbErr);
        }
    }

    if (!jsonData) {
        alert('Error: No se pudieron descargar los datos y no hay caché disponible.');
        hideLoading();
        if (btnRefresh) btnRefresh.disabled = false;
        return;
    }

    state.rawData = jsonData.results || (Array.isArray(jsonData) ? jsonData : []);
    console.log(`api.js: Cargados ${state.rawData.length} registros ${isOfflineMode ? '(Caché Offline)' : ''}`);

    if (onProcessData) onProcessData();

    const badge = $('statusBadge');
    if (badge) badge.textContent = `${state.rawData.length} registros`;
    const errState = $('errorState');
    if (errState) errState.classList.add('hidden');
    const mainContent = $('mainContent');
    if (mainContent) mainContent.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
    
    hideLoading();
    if (btnRefresh) btnRefresh.disabled = false;
}

// Expose loadAssets globally for the inline onclick in errorState HTML
window.loadAssets = () => loadAssets(uid => loadData(uid, window.__onProcessData));

