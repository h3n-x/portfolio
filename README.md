# Portfolio — Henry Pacheco (H3n)

> **Desarrollador Backend & Linux** · Colombia  
> Especializado en sistemas Linux, automatización modular con Bash y desarrollo de servicios backend en Python.

[![Astro](https://img.shields.io/badge/Astro-5.x-BC52EE?style=flat-square&logo=astro&logoColor=white)](https://astro.build/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-100%20SEO%20%7C%20100%20A11y-22C55E?style=flat-square)](https://h3n-x.netlify.app)
[![Netlify](https://img.shields.io/badge/Deploy-Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white)](https://h3n-x.netlify.app)

---

## Descripción

Portfolio personal reconstruido desde cero con **Astro 5** y **Tailwind CSS v4**, diseñado bajo la premisa de rendimiento extremo, accesibilidad estricta (WCAG 2.2 AA) y una narrativa técnica sólida para reclutadores e ingenieros de software.

- **Cero JS innecesario:** Arquitectura de islas estáticas que envía únicamente HTML y CSS optimizado por defecto. El bundle cliente de navegación fluida es de solo **5.31 KB gzipped**.
- **Navegación tipo SPA sin recarga:** Implementación nativa de la View Transitions API de Astro (`<ClientRouter />`) con preservación del scroll nativo del navegador (`scrollbar-gutter: stable`).
- **Sistema de diseño dual (Ghibli Aesthetic):** Paleta artesanal con modo Claro (*Ghibli Meadow*) y modo Oscuro (*Howl's Twilight Sky*), con prevención total de parpadeo (Anti-FOUC) y contrastes auditados (>7:1 para texto normal).
- **Internacionalización limpia (Cero Spanglish):** Rutas `/es/` y `/en/` completamente segregadas con tipado estricto en Zod para casos de estudio y diccionarios de interfaz.

---

## Proyectos Documentados

1. **[ArchForge](https://github.com/h3n-x/archforge) (v0.3.0 · Mantenimiento Activo):**
   - Toolkit modular de post-instalación y endurecimiento para Arch Linux desarrollado en Bash.
   - Modo dry-run seguro, backups por sesión y configuración de servicios de sistema (systemd, nftables).
2. **[Repo Secret Auditor](https://github.com/h3n-x/repo-secret-auditor) (v0.1.0 · Tests >80% & CI/CD):**
   - Motor backend en Python 3.12 y FastAPI para detección de credenciales expuestas y dependencias vulnerables.
   - Exportador OASIS SARIF 2.1.0 e integración nativa con GitHub Code Scanning mediante policy gates de severidad.

---

## Stack Tecnológico

| Herramienta | Versión | Rol |
|---|---|---|
| **Astro** | 5.x | Generador de sitios estáticos (SSG) y arquitectura de islas |
| **Tailwind CSS** | v4 | Estilos utilitarios modernos vía `@theme` nativo en CSS |
| **TypeScript** | 5.x | Tipado estricto para esquemas de contenido y utilidades i18n |
| **@astrojs/sitemap** | Oficial | Generación automática de índices de sitemaps XML |
| **Lucide** | Oficial | Iconografía vectorial inline accesible |
| **CSpell** | Oficial | Comprobador ortográfico multilingüe (español e inglés) |
| **Netlify** | CI/CD | Despliegue continuo con cabeceras de seguridad y caché optimizada |

---

## Estructura del Proyecto

```
portfolio/
├── netlify.toml              # Build, redirects 404, headers CSP y caché
├── astro.config.mjs          # Configuración Astro 5 + Tailwind v4 + Sitemap
├── tsconfig.json             # Tipado estricto
├── cspell.json               # Configuración de corrector ortográfico ES/EN
├── public/
│   ├── favicon.svg           # Favicon personalizado en SVG
│   ├── robots.txt            # Reglas para crawlers y enlace al sitemap
│   └── docs/
│       └── cv-henry-pacheco.pdf # Currículum en PDF descargable
├── src/
│   ├── assets/               # Imágenes optimizadas en tiempo de compilación
│   │   └── archforge.png
│   ├── content/              # Content Collections tipadas con Zod
│   │   ├── config.ts
│   │   ├── projects/         # Casos de estudio en ES y EN
│   │   └── experience/       # Línea de tiempo profesional
│   ├── i18n/                 # Diccionarios y utilidades de traducción
│   ├── components/
│   │   ├── common/           # Header, Footer, ThemeToggle, LangToggle, CopyEmail
│   │   ├── icons/            # Iconos SVG personalizados accesibles
│   │   └── sections/         # Hero, About, Projects, Experience, Skills, Education, Contact
│   ├── layouts/
│   │   └── BaseLayout.astro  # Layout HTML5, SEO, Open Graph y View Transitions
│   ├── pages/
│   │   ├── 404.astro         # Página de error 404 consistente y bilingüe
│   │   ├── index.astro       # Detección de idioma y redirección inteligente
│   │   ├── es/index.astro    # Landing page en español
│   │   └── en/index.astro    # Landing page en inglés
│   └── styles/
│       └── global.css        # Tokens de diseño Ghibli, reset y accesibilidad
```

---

## Comandos y Desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Verificación de tipos TypeScript
npx tsc --noEmit

# Comprobación de ortografía multilingüe
npx cspell "src/**/*.{astro,ts,md}"

# Build optimizado para producción
npm run build

# Previsualización local del build de producción
npm run preview
```

---

## Métricas de Producción (Lighthouse)

- **Performance:** 97 / 100
- **Accessibility:** 100 / 100
- **Best Practices:** 100 / 100
- **SEO:** 100 / 100
- **Core Web Vitals:** LCP: 1.6 s · CLS: 0.000 · TBT: 0 ms

---

## Contacto

- **Correo:** [h3n.eth@gmail.com](mailto:h3n.eth@gmail.com)
- **GitHub:** [@h3n-x](https://github.com/h3n-x)
- **Portfolio Live:** [h3n-x.netlify.app](https://h3n-x.netlify.app)
