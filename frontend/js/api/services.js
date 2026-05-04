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
 * @param {string} uid 
 * @param {boolean} refresh - Force refresh cache from Kobo
 * @returns {Promise<Object>}
 */
export async function fetchSurveyData(uid, refresh = false) {
    if (!uid) throw new Error('Missing UID in fetchSurveyData');
    
    const url = `${BACKEND_URL}/api/data/${uid}${refresh ? '?refresh=true' : ''}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error API (${response.status}) at fetchSurveyData`);
    }
    return await response.json();
}
