import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        tailwindcss(),
    ],
    server: {
        proxy: {
        '/api': {
            target: 'http://localhost:8000', // Прямая ссылка на Laravel
            changeOrigin: true,
            rewrite: (path) => path, // Не удаляем префикс /api
            secure: false
      }
        }
      }
});
