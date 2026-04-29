import { $ } from '../utils/index.js';
import { updateChartsTheme } from '../charts/index.js';

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
    const iconMoon = $('iconMoon');
    const iconSun = $('iconSun');

    if (isDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('esca_theme', 'dark');
        if (iconMoon) iconMoon.style.display = 'none';
        if (iconSun) iconSun.style.display = 'block';
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('esca_theme', 'light');
        if (iconMoon) iconMoon.style.display = 'block';
        if (iconSun) iconSun.style.display = 'none';
    }
    
    // Notify charts module to update colors
    updateChartsTheme(isDark);
}
