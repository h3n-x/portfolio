import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['robots.txt', 'sitemap.xml'],
      manifest: {
        name: 'Portfolio de h3n',
        short_name: 'h3n Portfolio',
        description: 'Portfolio personal de h3n - Programador',
        theme_color: '#22c55e',
        background_color: '#000000',
        icons: [
          {
            src: '/images/profile-640.jpeg',
            sizes: '192x192',
            type: 'image/jpeg',
            purpose: 'any maskable'
          },
          {
            src: '/images/profile-960.jpeg',
            sizes: '512x512',
            type: 'image/jpeg',
            purpose: 'any maskable'
          }
        ]
      }
    }),
    viteCompression({
      algorithm: 'gzip',
      threshold: 10240, // Comprimir archivos mayores a 10KB
    })
  ],
  server: {
    headers: {
      'Content-Type': 'application/javascript'
    }
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'react-vendor';
            if (id.includes('framer-motion')) return 'framer-motion';
            if (id.includes('@')) return 'vendor';
            return 'vendor';
          }
          if (id.includes('MatrixRain') || id.includes('MatrixGrid')) {
            return 'animations';
          }
          if (id.includes('components/')) {
            return 'components';
          }
        }
      }
    },
    cssCodeSplit: true,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 4096
  }
})
