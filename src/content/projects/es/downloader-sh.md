---
title: "downloader.sh"
tagline: "Pega un enlace público, elige una calidad real y descárgalo: sin cuentas, sin cookies de terceros, sin rastreadores"
description: "Un descargador web autoalojado para publicaciones públicas de YouTube, X, Instagram, TikTok, Reddit, Twitch, Vimeo y más. Un sitio estático en Astro con una isla Svelte habla con un backend FastAPI que ejecuta cada trabajo en un worker aislado detrás de un proxy de salida que hace de barrera SSRF."
role: "Autor y desarrollador full-stack"
status: "MVP · 219 tests de backend · E2E con axe"
technologies:
  - "Python 3.13"
  - "FastAPI y SSE"
  - "Astro 7 y Svelte 5"
  - "yt-dlp y FFmpeg"
  - "Docker Compose"
  - "Playwright y axe"
  - "uv y pnpm"
githubUrl: "https://github.com/h3n-x/Downloader.sh"
featured: false
order: 8
category: "Web y Seguridad"
areas: ["web", "backend", "security"]
problemSolved: "Los descargadores en línea están llenos de rastreadores, botones falsos y cookies de terceros, y ofrecer yt-dlp como servicio público es riesgoso: las URLs de los usuarios pueden usarse para llegar a redes internas, agotar recursos o descargar mucho más de lo previsto."
architectureHighlights:
  - "Workers aislados: cada trabajo ejecuta yt-dlp en su propio subproceso con límites de recursos y sesión propia, intercambiando JSONL por stdin/stdout con un gestor de trabajos acotado en memoria."
  - "Barrera SSRF: todo el tráfico del worker pasa por un proxy de salida con un token por trabajo, IP pública fijada, solo puertos 80/443 y un presupuesto de bytes."
  - "Extractores en allowlist: yt-dlp solo usa los extractores de las plataformas soportadas y FFmpeg solo toca ficheros locales."
  - "Frontend estático primero: un sitio Astro con una isla Svelte recibe el progreso en vivo por Server-Sent Events del mismo origen, con una Content Security Policy estricta."
keyLearnings:
  - "Modelar las amenazas de un servicio que descarga URLs arbitrarias y aplicar la política en la capa de red en lugar de confiar solo en la validación."
  - "Probar en profundidad: pruebas unitarias, de integración y de propiedades sin red, más E2E full-stack con comprobaciones de accesibilidad."
  - "Documentar las decisiones como ADR junto a los documentos de arquitectura, seguridad, despliegue y auditoría."
---

downloader.sh responde a una necesidad simple, descargar un video o audio público sin cuentas ni rastreadores, con una arquitectura pensada para ofrecerlo como servicio de forma segura.

La responsabilidad viene incluida: solo descarga contenido público y no elude DRM, muros de pago, inicios de sesión ni medidas anti-bot.
