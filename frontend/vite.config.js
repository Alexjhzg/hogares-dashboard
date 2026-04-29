import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: './',
  plugins: [
    tailwindcss(),
  ],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      }
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});
