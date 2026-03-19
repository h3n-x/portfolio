<div align="center">

# Portfolio — Henry Pacheco (H3n)

### Backend Developer | Open Source Contributor | Colombia

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Site-6366f1?style=for-the-badge)](https://h3n-x.netlify.app)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[![GitHub Stars](https://img.shields.io/github/stars/h3n-x/portfolio?style=social)](https://github.com/h3n-x/portfolio/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/h3n-x/portfolio?style=social)](https://github.com/h3n-x/portfolio/network/members)

</div>

---

## Descripción

Portfolio personal desarrollado con React 19 + Vite 8. Diseño limpio con profundidad espacial, tipografía Montserrat + Lato, animaciones con Framer Motion y scroll suavizado con Lenis. Soporte completo para español e inglés.

Construyo backends con Python y Flask — desde APIs REST hasta bots de Discord con persistencia real. Mi entorno es Arch Linux con Hyprland.

## Stack Tecnológico

### Frontend
| Tecnología | Versión | Rol |
|---|---|---|
| React | 19 | UI library |
| Vite | 8 | Build tool + dev server |
| TailwindCSS | v4 | Estilos utilitarios (vía PostCSS, sin config file) |
| Framer Motion | 12 | Animaciones y transiciones |
| Lenis | 1.3 | Smooth scroll |
| Lucide React | 0.577 | Iconos |

### Build & Deploy
| Herramienta | Uso |
|---|---|
| PostCSS + cssnano | Optimización de CSS |
| Terser | Minificación JS |
| vite-plugin-compression | Compresión gzip/brotli |
| Netlify | Hosting y CI/CD |

## Estructura del Proyecto

```
portfolio/
├── public/
│   ├── fonts/                  # Montserrat Variable + Lato (woff2, self-hosted)
│   ├── images/
│   │   ├── original/           # Fuentes originales
│   │   ├── *-400.jpeg          # Móvil
│   │   ├── *-640.jpeg          # Tablet pequeño
│   │   ├── *-960.jpeg          # Tablet
│   │   ├── *-1280.jpeg         # Desktop
│   │   └── *-1920.jpeg         # HD
│   ├── favicon.svg
│   ├── manifest.json           # PWA manifest
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── Hero.jsx            # Sección principal con presentación
│   │   ├── Header.jsx          # Navegación + language toggle
│   │   ├── SobreMi.jsx         # Sobre mí
│   │   ├── Proyectos.jsx       # Grid de proyectos
│   │   ├── Experiencia.jsx     # Experiencia laboral
│   │   ├── Formacion.jsx       # Educación y certificados
│   │   ├── OptimizedImage.jsx  # Imágenes responsive con srcset
│   │   ├── ScrollProgress.jsx  # Barra de progreso de scroll
│   │   ├── SimpleCertificateModal.jsx
│   │   └── icons/
│   │       └── BrandIcons.jsx  # Iconos SVG de tecnologías
│   ├── translations/
│   │   ├── es.js               # Español
│   │   ├── en.js               # Inglés
│   │   └── index.js            # Hook useTranslation
│   ├── LanguageContext.jsx     # Contexto global de idioma
│   ├── LanguageToggle.jsx      # Botón ES/EN
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css               # Variables CSS + estilos globales
├── scripts/
│   └── generate-images.js      # Genera variantes responsive (requiere sharp)
├── netlify.toml                # Configuración de deploy
├── .npmrc                      # legacy-peer-deps=true
├── vite.config.js
├── postcss.config.js
└── package.json
```

## Instalación

**Requisitos:** Node.js >= 20

```bash
# Clonar
git clone https://github.com/h3n-x/portfolio.git
cd portfolio

# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview
```

### Generar variantes de imágenes (opcional)

Las imágenes optimizadas ya están incluidas en `public/images/`. Si agregas imágenes nuevas:

```bash
# Instalar sharp temporalmente
npm install sharp --save-dev

# Generar variantes (400, 640, 960, 1280, 1920px)
npm run generate-images
```

## Scripts

| Script | Descripción |
|---|---|
| `dev` | Servidor de desarrollo con HMR |
| `build` | Build optimizado para producción |
| `preview` | Preview local del build |
| `lint` | Análisis ESLint |
| `generate-images` | Genera variantes responsive de imágenes |

## Características

- **Multilenguaje** — Español e Inglés con cambio instantáneo
- **Imágenes responsive** — srcset con variantes 400-1920px
- **Fuentes self-hosted** — Montserrat + Lato en woff2, sin dependencias externas
- **Animaciones** — Framer Motion con reducción de movimiento respetada
- **Scroll suavizado** — Lenis con integración nativa
- **PWA** — Manifest configurado
- **SEO** — robots.txt + sitemap.xml + meta tags

## Deploy

El deploy en Netlify se activa automáticamente con cada push a `main`. Configuración en `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"
```

---

<div align="center">

[![Email](https://img.shields.io/badge/Email-h3n.eth@gmail.com-6366f1?style=flat-square)](mailto:h3n.eth@gmail.com)
[![Portfolio](https://img.shields.io/badge/Portfolio-h3n--x.netlify.app-6366f1?style=flat-square)](https://h3n-x.netlify.app)
[![GitHub](https://img.shields.io/badge/GitHub-h3n--x-6366f1?style=flat-square&logo=github)](https://github.com/h3n-x)

*Desarrollado por Henry Pacheco*

</div>
