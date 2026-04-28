/**
 * ─── Tailwind Configuration ──────────────────────────────────────────────────
 * Externalized configuration for the Tailwind CDN standalone engine.
 */

if (window.tailwind) {
    tailwind.config = {
        darkMode: 'class',
        theme: {
            extend: {
                fontFamily: {
                    sans: ['Inter', 'sans-serif'],
                    inter: ['Inter', 'sans-serif'],
                    outfit: ['Outfit', 'sans-serif'],
                },
                colors: {
                    brand: {
                        blue: '#3B82F6',   /* Primary accent */
                        emerald: '#10B981', /* Success/Completion */
                        purple: '#8B5CF6',  /* Highlights/Secondary */
                        orange: '#F59E0B',  /* Warnings/Progress */
                        red: '#EF4444',     /* Errors/Alerts */
                    },
                    surface: {
                        dark: '#0B1120',    /* App dark background */
                    }
                }
            }
        }
    };
}
