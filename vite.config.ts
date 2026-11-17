import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['icon.svg'],
        manifest: {
          id: '/',
          name: 'Yachay Kids - Quechua Bilingüe',
          short_name: 'YachayKids',
          description: 'Aplicación móvil educativa, inclusiva y bilingüe para niños quechuahablantes del Perú. 100% offline.',
          theme_color: '#d97706',
          background_color: '#fffbeb',
          display: 'standalone',
          orientation: 'portrait',
          start_url: '/',
          scope: '/',
          icons: [
            {
              src: '/icon.svg',
              sizes: '192x192 512x512',
              type: 'image/svg+xml',
              purpose: 'any',
            },
            {
              src: '/icon.svg',
              sizes: '192x192 512x512',
              type: 'image/svg+xml',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,jpg,jpeg,webp,svg,woff,woff2,mp4}'],
          maximumFileSizeToCacheInBytes: 25 * 1024 * 1024,
          cleanupOutdatedCaches: true,
          skipWaiting: true,
          clientsClaim: true,
          runtimeCaching: [
            {
              urlPattern: /\.mp4$/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'yachay-videos-offline-v1',
                rangeRequests: true,
                cacheableResponse: {
                  statuses: [200],
                },
                expiration: {
                  maxEntries: 20,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
              },
            },
          ],
        },
        devOptions: {
          enabled: true,
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
