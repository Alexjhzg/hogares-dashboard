/**
 * ─── API Cache (IndexedDB) ───────────────────────────────────────────────────
 * Provides persistent storage for Kobo assets and survey data to support 
 * offline functionality and reduce redundant network calls.
 */

const DB_NAME = 'KoboDashboardDB';
const STORE_NAME = 'cacheStore';

export const DB = {
    /**
     * Opens the IndexedDB database.
     * @returns {Promise<IDBDatabase>}
     */
    async open() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, 1);
            request.onerror = () => reject('Error opening DB');
            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME);
                }
            };
            request.onsuccess = (e) => resolve(e.target.result);
        });
    },

    /**
     * Retrieves a value from the cache.
     * @param {string} key 
     * @returns {Promise<any>}
     */
    async get(key) {
        try {
            const db = await this.open();
            return new Promise((resolve, reject) => {
                const tx = db.transaction(STORE_NAME, 'readonly');
                const store = tx.objectStore(STORE_NAME);
                const request = store.get(key);
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });
        } catch (err) {
            console.error('IndexedDB Get Error:', err);
            return null;
        }
    },

    /**
     * Stores a value in the cache.
     * @param {string} key 
     * @param {any} value 
     * @returns {Promise<void>}
     */
    async set(key, value) {
        try {
            const db = await this.open();
            return new Promise((resolve, reject) => {
                const tx = db.transaction(STORE_NAME, 'readwrite');
                const store = tx.objectStore(STORE_NAME);
                const request = store.put(value, key);
                request.onsuccess = () => resolve();
                request.onerror = () => reject(request.error);
            });
        } catch (err) {
            console.error('IndexedDB Set Error:', err);
        }
    }
};
