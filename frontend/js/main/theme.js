import { $ } from '../helpers.js';
import { updateChartsTheme } from '../charts.js';

export function initTheme() {
    const storedTheme = localStorage.getItem('esca_theme');
    let isDark = true;
    if (storedTheme === 'light') isDark = false;
    else if (storedTheme === 'dark') isDark = true;
    
    applyTheme(isDark);

    const btn = $('btnThemeToggle');
    if (btn) {
        btn.addEventListener('click', () => {
            const currentIsDark = document.documentElement.classList.contains('dark');
            applyTheme(!currentIsDark);
        });
    }
}

export function applyTheme(isDark) {
    if (isDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('esca_theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('esca_theme', 'light');
    }
    
    // Notify charts module to update colors
    updateChartsTheme(isDark);
}
