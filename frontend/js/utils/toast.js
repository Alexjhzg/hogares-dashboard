/**
 * ─── Toast Notification Utility ──────────────────────────────────────────────
 * Lightweight, auto-dismissing toast for user feedback.
 * Usage: showToast('Mensaje', 'success' | 'warning' | 'info')
 */

const TOAST_STYLES = {
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    info:    'bg-indigo-500',
};
const TOAST_ICONS = {
    success: '✓',
    warning: '⚠',
    info:    'ℹ',
};

/**
 * @param {string} message
 * @param {'success'|'warning'|'info'} type
 * @param {number} [duration=2800] ms before dismiss
 */
export function showToast(message, type = 'info', duration = 2800) {
    const bg = TOAST_STYLES[type] || TOAST_STYLES.info;
    const ic = TOAST_ICONS[type]  || TOAST_ICONS.info;

    const toast = document.createElement('div');
    toast.className = [
        'fixed bottom-6 left-1/2 -translate-x-1/2 z-[999]',
        'px-4 py-2.5 rounded-xl text-xs font-bold shadow-xl',
        'text-white flex items-center gap-2 transition-opacity duration-300',
        bg,
    ].join(' ');
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.innerHTML = `<span aria-hidden="true">${ic}</span><span>${message}</span>`;

    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}
