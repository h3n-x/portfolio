import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { compression } from 'vite-plugin-compression2'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Compresión de archivos
    compression({
      algorithm: 'brotliCompress',
      exclude: [/\.(br)$/, /\.(gz)$/, /\.(png)$/, /\.(jpe?g)$/, /\.(webp)$/, /\.(svg)$/],
      threshold: 10240,
    }),
    // PWA para mejorar la experiencia móvil
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'images/*.png', 'images/*.svg'],
      manifest: {
        name: 'Portfolio de Henry Pacheco (H3n)',
        short_name: 'H3n Portfolio',
        description: 'Portfolio de Henry Pacheco - Desarrollador Backend',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone',
        icons: [
          {
            src: '/images/profile.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: '/images/profile.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          }
        ]
      }
    }),
    // Visualizador de tamaño de paquetes (solo en build)
    process.env.ANALYZE === 'true' && visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ].filter(Boolean),
  // Optimización de build
  build: {
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['./src/components/MatrixRain.jsx', './src/components/MatrixGrid.jsx'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  // Optimización del servidor de desarrollo
  server: {
    open: true,
    cors: true,
    host: true,
  },
})
