<h3 align="center">
  <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/misc/transparent.png" height="30" width="0"/>
  Portfolio
  <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/misc/transparent.png" height="30" width="0"/>
  <br/>
  <a href="https://github.com/h3n-x/portfolio">Henry Pacheco (h3n-x): desarrollador backend y Linux, hecho con Astro 5 y Tailwind CSS v4</a>
  <br/><br/>
  <p>
    🌐 <a href="README.md">English</a> · <strong>Español</strong>
  </p>
</h3>

<p align="center">
  <img src="https://img.shields.io/badge/Astro-5-fab387?style=for-the-badge&logo=astro&logoColor=d9e0ee&labelColor=363a4f" alt="Astro"/>
  <img src="https://img.shields.io/badge/Tailwind-v4-94e2d5?style=for-the-badge&logo=tailwindcss&logoColor=d9e0ee&labelColor=363a4f" alt="Tailwind"/>
  <img src="https://img.shields.io/badge/TypeScript-5-74c7ec?style=for-the-badge&logo=typescript&logoColor=d9e0ee&labelColor=363a4f" alt="TypeScript"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Lighthouse-100_SEO_%C2%B7_100_A11y-a6e3a1?style=for-the-badge&logo=lighthouse&logoColor=d9e0ee&labelColor=363a4f" alt="Lighthouse"/>
  <img src="https://img.shields.io/badge/deploy-Netlify-89dceb?style=for-the-badge&logo=netlify&logoColor=d9e0ee&labelColor=363a4f" alt="deploy"/>
  <img src="https://img.shields.io/badge/license-MIT-a6e3a1?style=for-the-badge&labelColor=363a4f" alt="license"/>
</p>

<p align="center">
  <a href="https://h3n-x.me">Sitio en vivo</a>
  ·
  <a href="#-proyectos-documentados">Proyectos</a>
  ·
  <a href="#%EF%B8%8F-desarrollo">Desarrollo</a>
  ·
  <a href="LICENSE">Licencia</a>
</p>

&nbsp;

## 🪄 Acerca de

Mi portfolio personal, reconstruido desde cero con **Astro 5** y **Tailwind CSS v4** con foco en el rendimiento extremo, la
accesibilidad estricta (WCAG 2.2 AA) y una narrativa técnica sólida para reclutadores e ingenieros. Desarrollador backend y Linux
de Colombia, especializado en sistemas Linux, automatización modular con Bash y servicios backend en Python.

| | |
|---|---|
| 🪶 **Cero JS innecesario** | Islas estáticas que envían HTML y CSS optimizado por defecto; el bundle cliente de la navegación fluida pesa solo **5,31 KB gzip**. |
| 🔁 **Navegación tipo SPA** | View Transitions nativas de Astro (`<ClientRouter />`) conservando el scroll del navegador (`scrollbar-gutter: stable`). |
| 🎨 **Sistema de diseño dual** | Paleta artesanal con modo claro (*Ghibli Meadow*) y oscuro (*Howl's Twilight Sky*), sin parpadeo al cargar (anti-FOUC) y contrastes auditados (>7:1 en texto normal). |
| 🌍 **i18n limpia** | Rutas `/es/` y `/en/` totalmente separadas, con casos de estudio y diccionarios de interfaz tipados con Zod. |

&nbsp;

## 📂 Proyectos documentados

| Proyecto | Descripción |
|---|---|
| [**archforge**](https://github.com/h3n-x/archforge) · v0.3.0, mantenimiento activo | Toolkit modular de post-instalación y endurecimiento para Arch Linux en Bash: modo dry-run seguro, backups por sesión y servicios del sistema (systemd, nftables). |
| [**Repo Secret Auditor**](https://github.com/h3n-x/repo-secret-auditor) · v0.2.0, cobertura 91 %, 0 CVEs | Escáner de secretos y dependencias para CI/CD: reglas compatibles con Gitleaks, historial de commits, OSV, SBOM CycloneDX y SARIF 2.1.0 para GitHub Code Scanning. |
| [**DockerWard**](https://github.com/h3n-x/DockerWard) · v0.1.0, 71 tests | Auditoría de seguridad en runtime para contenedores Docker con reportes SARIF 2.1.0 nativos. |
| [**Chat Anónimo**](https://github.com/h3n-x/chat-anonimo) · v2.5.0, cero persistencia | Mensajería efímera con relay ciego zero-knowledge, ofuscación de voz, esteganografía LSB y app Android. |
| [**SecuScan API**](https://github.com/h3n-x/secuscan-api) · v0.1.0, 86 tests, sin root | API backend para auditoría perimetral y gestión de la superficie de ataque externa (EASM). |
| [**Hyprland Dotfiles**](https://github.com/h3n-x/hyprland-dotfiles) · instalador probado en 6 distros | Un escritorio Hyprland completo donde cada color sale del wallpaper, con shell propia en QML, centro de configuración e instalador para varias distros. |
| [**yt-cli**](https://github.com/h3n-x/yt-cli) · v0.4.0 beta, 218 tests | Descargador de YouTube y YouTube Music para Linux sobre la API Python de yt-dlp, con errores explicados y una UX al estilo git/uv/cargo/gh. |
| [**downloader.sh**](https://github.com/h3n-x/Downloader.sh) · MVP, 219 tests de backend | Descargador web de enlaces públicos: workers aislados, proxy de salida contra SSRF, sin cuentas y sin rastreadores. |

&nbsp;

## 🧰 Stack

| Herramienta | Versión | Rol |
|---|---|---|
| **Astro** | 5.x | Generador de sitios estáticos con arquitectura de islas |
| **Tailwind CSS** | v4 | Estilos utilitarios con `@theme` nativo en CSS |
| **TypeScript** | 5.x | Tipado estricto para esquemas de contenido y utilidades i18n |
| **@astrojs/sitemap** | Oficial | Sitemaps XML automáticos |
| **Lucide** | Oficial | Iconos vectoriales inline accesibles |
| **CSpell** | Oficial | Corrector ortográfico en español e inglés |
| **Netlify** | CI/CD | Despliegue continuo con cabeceras de seguridad y caché optimizada |

<details>
<summary><b>Estructura del proyecto</b></summary>

```
portfolio/
├── netlify.toml              # build, redirecciones 404, cabeceras CSP y caché
├── astro.config.mjs          # Astro 5 + Tailwind v4 + sitemap
├── tsconfig.json             # tipado estricto
├── cspell.json               # corrector ortográfico ES/EN
├── public/
│   ├── favicon.svg
│   ├── robots.txt            # reglas para crawlers y enlace al sitemap
│   ├── docs/                 # CV en inglés y español (cv-henry-pacheco-{en,es}.pdf)
│   └── images/projects/      # tarjetas de los proyectos (card-<slug>.svg)
└── src/
    ├── content/              # content collections tipadas con Zod
    │   ├── projects/         # casos de estudio en ES y EN
    │   └── experience/       # línea de tiempo profesional
    ├── i18n/                 # diccionarios y utilidades de traducción
    ├── components/
    │   ├── common/           # Header, Footer, ThemeToggle, LangToggle, CopyEmail
    │   ├── icons/            # iconos SVG propios accesibles
    │   └── sections/         # Hero, About, Projects, Experience, Skills, Education, Contact
    ├── layouts/BaseLayout.astro   # HTML5, SEO, Open Graph y View Transitions
    ├── pages/                # 404, detección de idioma, /es/ y /en/
    └── styles/global.css     # tokens de diseño Ghibli, reset y accesibilidad
```

</details>

&nbsp;

## ⚙️ Desarrollo

```bash
npm install
npm run dev                              # servidor de desarrollo
npx tsc --noEmit                         # verificación de TypeScript
npx cspell "src/**/*.{astro,ts,md}"      # ortografía (ES/EN)
npm run build                            # build de producción
npm run preview                          # vista previa del build de producción
```

&nbsp;

## 📊 Lighthouse

| Rendimiento | Accesibilidad | Buenas prácticas | SEO |
|:---:|:---:|:---:|:---:|
| **97** | **100** | **100** | **100** |

Core Web Vitals: LCP 1,6 s · CLS 0,000 · TBT 0 ms.

&nbsp;

## 📬 Contacto

- **Correo:** [h3n.eth@gmail.com](mailto:h3n.eth@gmail.com)
- **GitHub:** [@h3n-x](https://github.com/h3n-x)
- **Sitio en vivo:** [h3n-x.me](https://h3n-x.me)

&nbsp;

<p align="center">
  <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/footers/gray0_ctp_on_line.svg?sanitize=true" alt=""/>
</p>

<p align="center">
  Copyright © 2026 <a href="https://github.com/h3n-x">h3n-x</a>
</p>

<p align="center">
  <a href="https://github.com/h3n-x/portfolio/blob/main/LICENSE"><img src="https://img.shields.io/static/v1?style=for-the-badge&message=MIT&logoColor=d9e0ee&label=License&labelColor=363a4f&color=a6e3a1" alt="MIT License"/></a>
</p>
