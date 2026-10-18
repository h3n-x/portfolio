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
  <img src="https://img.shields.io/badge/Lighthouse-100_A11y_%C2%B7_100_SEO_%C2%B7_100_desktop-a6e3a1?style=for-the-badge&logo=lighthouse&logoColor=d9e0ee&labelColor=363a4f" alt="Lighthouse"/>
  <img src="https://img.shields.io/badge/deploy-Netlify-89dceb?style=for-the-badge&logo=netlify&logoColor=d9e0ee&labelColor=363a4f" alt="deploy"/>
  <img src="https://img.shields.io/badge/license-MIT-a6e3a1?style=for-the-badge&labelColor=363a4f" alt="license"/>
</p>

<p align="center">
  <a href="https://h3n-x.me">Live site</a>
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
| [**Repo Secret Auditor**](https://github.com/h3n-x/repo-secret-auditor) · v0.2.0, 91% coverage, 0 CVEs | Secret and dependency scanner for CI/CD: Gitleaks-compatible rules, commit history, OSV, CycloneDX SBOM and SARIF 2.1.0 for GitHub Code Scanning. |
| [**DockerWard**](https://github.com/h3n-x/DockerWard) · v0.1.0, 71 tests | Runtime security auditing for Docker containers with native SARIF 2.1.0 reports. |
| [**Chat Anónimo**](https://github.com/h3n-x/chat-anonimo) · v2.5.0, zero persistence | Ephemeral messaging with a zero-knowledge blind relay, voice scrambling, LSB steganography and an Android app. |
| [**SecuScan API**](https://github.com/h3n-x/secuscan-api) · v0.1.0, 86 tests, non-root | Backend API for perimeter security auditing and external attack surface management (EASM). |
| [**Hyprland Dotfiles**](https://github.com/h3n-x/hyprland-dotfiles) · installer tested on 6 distros | A complete Hyprland desktop where every color comes from the wallpaper, with its own QML shell, a settings center and a cross-distro installer. |
| [**yt-cli**](https://github.com/h3n-x/yt-cli) · v0.4.0 beta, 218 tests | YouTube and YouTube Music downloader for Linux on yt-dlp's Python API, with explained errors and a git/uv/cargo/gh-style UX. |
| [**downloader.sh**](https://github.com/h3n-x/Downloader.sh) · MVP, 219 backend tests | Web downloader for public links: isolated worker processes, an egress proxy against SSRF, no accounts and no trackers. |

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
│   ├── docs/                 # resume in English and Spanish (cv-henry-pacheco-{en,es}.pdf)
│   ├── fonts/                # Plus Jakarta Sans (self-hosted, OFL)
│   └── images/projects/      # project cards (card-<slug>.svg)
└── src/
    ├── content/              # Zod-typed content collections
    │   ├── projects/         # case studies in ES and EN
    │   └── experience/       # professional timeline
    ├── i18n/                 # dictionaries and translation helpers
    ├── components/
    │   ├── common/           # Header, Footer, ThemeToggle, LangToggle, CopyEmail
    │   ├── icons/            # accessible custom SVG icons
    │   └── sections/         # Hero, About, Projects, Experience, Skills, Education, Contact
    ├── layouts/BaseLayout.astro   # HTML5, SEO, Open Graph and View Transitions
    ├── pages/                # 404, language detection, /es/, /en/ and the case-study fragments
    │                         # loaded on demand (/<lang>/case-studies/<slug>/)
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

| Device | Performance | Accessibility | Best practices | SEO | Agentic browsing | FCP | LCP | TBT | CLS |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Desktop** | **100** | **100** | **100** | **100** | **100** | 0.4 s | 0.4–0.5 s | 0–12 ms | 0 |
| **Mobile** | **85–96** | **100** | **100** | **100** | **100** | 1.1 s | 2.1–2.3 s | 70–430 ms | 0 |

Measured on [h3n-x.me](https://h3n-x.me) with Lighthouse 13.5 and Chromium 154 (2026-10-18), default settings, `/es/` and `/en/`, several runs each. Mobile uses Lighthouse's simulated slow 4G and 4× CPU slowdown, so its Performance score depends on how busy the machine running the test is: 94–98 on an idle machine, 85–89 on a loaded one. With real DevTools throttling it stays at 93–97.

Why it's fast: the only font (Plus Jakarta Sans, variable) is served from the site and preloaded; the eight case studies are static fragments loaded into their dialog on demand, so the home page is 17 KB of compressed HTML; zero layout shift.

&nbsp;

## 📬 Contact

- **Email:** [h3n.eth@gmail.com](mailto:h3n.eth@gmail.com)
- **GitHub:** [@h3n-x](https://github.com/h3n-x)
- **Live site:** [h3n-x.me](https://h3n-x.me)

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
