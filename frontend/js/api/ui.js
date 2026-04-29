/**
 * ─── API UI ──────────────────────────────────────────────────────────────────
 * Handles all UI feedback related to data loading, connectivity status,
 * and background processing overlays.
 */

import { $ } from '../utils/index.js';

let hideTimeout = null;

/**
 * Displays the global loading overlay with a specific message.
 * @param {string} msg 
 */
export function showLoading(msg) {
    const overlay = $('loadingOverlay');
    const msgEl = $('loadingMsg');
    if (!overlay) return;

    if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
    }

    overlay.style.display = 'flex';
    // Small timeout to allow display:flex to register before opacity transition
    setTimeout(() => {
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'all';
    }, 10);
    
    if (msgEl) msgEl.textContent = msg;
}

/**
 * Hides the global loading overlay.
 */
export function hideLoading() {
    const overlay = $('loadingOverlay');
    if (!overlay) return;

    if (hideTimeout) clearTimeout(hideTimeout);

    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    hideTimeout = setTimeout(() => {
        overlay.style.display = 'none';
        hideTimeout = null;
    }, 500);
}

/**
 * Updates the connectivity badge and ping indicators.
 * @param {boolean} isOnline 
 */
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
        if (ping) ping.className = 'animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-emerald opacity-75';
    } else {
        statusText.textContent = 'Modo Offline - Datos Cacheados';
        statusText.classList.remove('text-emerald-400', 'text-slate-400');
        statusText.classList.add('text-amber-500');
        dot.className = 'relative inline-flex rounded-full h-2 w-2 bg-amber-500';
        if (ping) ping.className = 'absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-20';
    }
}
