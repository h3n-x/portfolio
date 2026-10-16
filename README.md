<h3 align="center">
  <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/misc/transparent.png" height="30" width="0"/>
  Portfolio
  <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/misc/transparent.png" height="30" width="0"/>
  <br/>
  <a href="https://github.com/h3n-x/portfolio">Henry Pacheco (h3n-x): backend and Linux developer, built with Astro 5 and Tailwind CSS v4</a>
  <br/><br/>
  <p>
    🌐 <strong>English</strong> · <a href="README.es.md">Español</a>
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
  <a href="https://h3n-x.netlify.app">Live site</a>
  ·
  <a href="#-documented-projects">Projects</a>
  ·
  <a href="#%EF%B8%8F-development">Development</a>
  ·
  <a href="LICENSE">License</a>
</p>

&nbsp;

## 🪄 About

My personal portfolio, rebuilt from scratch with **Astro 5** and **Tailwind CSS v4** around extreme performance, strict
accessibility (WCAG 2.2 AA) and a solid technical narrative for recruiters and engineers. Backend and Linux developer from
Colombia, focused on Linux systems, modular Bash automation and Python backend services.

| | |
|---|---|
| 🪶 **No unnecessary JS** | Static islands ship optimized HTML and CSS by default; the client bundle for smooth navigation is just **5.31 KB gzipped**. |
| 🔁 **SPA-like navigation** | Astro's native View Transitions (`<ClientRouter />`) with the browser's own scroll preserved (`scrollbar-gutter: stable`). |
| 🎨 **Dual design system** | A hand-made palette with a light mode (*Ghibli Meadow*) and a dark mode (*Howl's Twilight Sky*), no flash on load (anti-FOUC) and audited contrast (>7:1 for body text). |
| 🌍 **Clean i18n** | Fully separate `/es/` and `/en/` routes, with Zod-typed case studies and interface dictionaries. |

&nbsp;

## 📂 Documented projects

| Project | Description |
|---|---|
| [**archforge**](https://github.com/h3n-x/archforge) · v0.3.0, actively maintained | Modular post-installation and hardening toolkit for Arch Linux in Bash: safe dry runs, per-session backups and system services (systemd, nftables). |
| [**Repo Secret Auditor**](https://github.com/h3n-x/repo-secret-auditor) · v0.1.0, tests >80% and CI/CD | Python 3.12 + FastAPI engine that detects exposed credentials and vulnerable dependencies, with SARIF 2.1.0 export and GitHub Code Scanning severity gates. |

&nbsp;

## 🧰 Stack

| Tool | Version | Role |
|---|---|---|
| **Astro** | 5.x | Static site generator with an islands architecture |
| **Tailwind CSS** | v4 | Utility styles through native CSS `@theme` |
| **TypeScript** | 5.x | Strict typing for content schemas and i18n utilities |
| **@astrojs/sitemap** | Official | Automatic XML sitemaps |
| **Lucide** | Official | Accessible inline vector icons |
| **CSpell** | Official | Spell checking in Spanish and English |
| **Netlify** | CI/CD | Continuous deployment with security headers and tuned caching |

<details>
<summary><b>Project structure</b></summary>

```
portfolio/
├── netlify.toml              # build, 404 redirects, CSP and cache headers
├── astro.config.mjs          # Astro 5 + Tailwind v4 + sitemap
├── tsconfig.json             # strict typing
├── cspell.json               # ES/EN spell checker
├── public/
│   ├── favicon.svg
│   ├── robots.txt            # crawler rules and sitemap link
│   └── docs/cv-henry-pacheco.pdf
└── src/
    ├── assets/               # images optimized at build time
    ├── content/              # Zod-typed content collections
    │   ├── projects/         # case studies in ES and EN
    │   └── experience/       # professional timeline
    ├── i18n/                 # dictionaries and translation helpers
    ├── components/
    │   ├── common/           # Header, Footer, ThemeToggle, LangToggle, CopyEmail
    │   ├── icons/            # accessible custom SVG icons
    │   └── sections/         # Hero, About, Projects, Experience, Skills, Education, Contact
    ├── layouts/BaseLayout.astro   # HTML5, SEO, Open Graph and View Transitions
    ├── pages/                # 404, language detection, /es/ and /en/
    └── styles/global.css     # Ghibli design tokens, reset and accessibility
```

</details>

&nbsp;

## ⚙️ Development

```bash
npm install
npm run dev                              # development server
npx tsc --noEmit                         # TypeScript check
npx cspell "src/**/*.{astro,ts,md}"      # spell check (ES/EN)
npm run build                            # production build
npm run preview                          # preview the production build
```

&nbsp;

## 📊 Lighthouse

| Performance | Accessibility | Best practices | SEO |
|:---:|:---:|:---:|:---:|
| **97** | **100** | **100** | **100** |

Core Web Vitals: LCP 1.6 s · CLS 0.000 · TBT 0 ms.

&nbsp;

## 📬 Contact

- **Email:** [h3n.eth@gmail.com](mailto:h3n.eth@gmail.com)
- **GitHub:** [@h3n-x](https://github.com/h3n-x)
- **Live site:** [h3n-x.netlify.app](https://h3n-x.netlify.app)

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
