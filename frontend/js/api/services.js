/**
 * ─── API Services ────────────────────────────────────────────────────────────
 * Pure network calls to the backend. Does not handle UI or Caching directly.
 */

import { BACKEND_URL } from '../core/index.js';

/**
 * Fetches the list of available assets (Kobo forms) from the backend.
 * @returns {Promise<Array>}
 */
export async function fetchAssets() {
    const url = `${BACKEND_URL}/api/assets`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error API (${response.status}) at fetchAssets`);
    }
    return await response.json();
}

/**
 * Fetches the raw survey submission data for a specific asset UID.
 * @param {string} uid        - Asset UID to download.
 * @param {boolean} refresh   - Force refresh bypassing server cache.
 * @param {string} [nextUid]  - Optional: next asset UID to prefetch in background.
 * @returns {Promise<Object>}
 */
export async function fetchSurveyData(uid, refresh = false, nextUid = '') {
    if (!uid) throw new Error('Missing UID in fetchSurveyData');

    const params = new URLSearchParams();
    if (refresh)  params.set('refresh', 'true');
    if (nextUid)  params.set('next_uid', nextUid);

    const query = params.toString() ? `?${params.toString()}` : '';
    const url = `${BACKEND_URL}/api/data/${uid}${query}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error API (${response.status}) at fetchSurveyData`);
    }
    return await response.json();
}

/**
 * Fires a fire-and-forget prefetch request for a given asset UID.
 * The backend will download and cache the data in background.
 * This call does NOT block the caller — it resolves immediately.
 * @param {string} uid
 */
export function schedulePrefetch(uid) {
    if (!uid) return;
    fetch(`${BACKEND_URL}/api/prefetch/${uid}`, { method: 'POST' })
        .then(r => {
            if (r.ok) console.info(`[api/services] Prefetch scheduled → ${uid}`);
        })
        .catch(err => console.warn(`[api/services] Prefetch request failed → ${uid}:`, err));
}
