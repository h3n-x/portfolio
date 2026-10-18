import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://h3n-x.me',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  // Los fragmentos de casos de estudio no son paginas: fuera del sitemap
  integrations: [sitemap({ filter: (page) => !page.includes('/case-studies/') })],
  vite: {
    plugins: [tailwindcss()],
  },
});
