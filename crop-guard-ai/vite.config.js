import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path' // ✅ Import path module

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt'],
      manifest: {
        name: 'CropGuard AI',
        short_name: 'CropGuard',
        description: 'My Progressive Web App built with React and Vite',
        theme_color: '#179746',
        background_color: '#179746',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          }
        ],
      },
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src') // ✅ Add this section
    }
  }
})
