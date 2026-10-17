---
title: "downloader.sh"
tagline: "Paste a public link, pick a real quality, download it: no accounts, no third-party cookies, no trackers"
description: "A self-hosted web downloader for public posts from YouTube, X, Instagram, TikTok, Reddit, Twitch, Vimeo and more. A static Astro site with a Svelte island talks to a FastAPI backend that runs every job in an isolated worker behind an egress proxy acting as an SSRF barrier."
role: "Author & Full-Stack Developer"
status: "MVP · 219 backend tests · E2E with axe"
technologies:
  - "Python 3.13"
  - "FastAPI & SSE"
  - "Astro 7 & Svelte 5"
  - "yt-dlp & FFmpeg"
  - "Docker Compose"
  - "Playwright & axe"
  - "uv & pnpm"
githubUrl: "https://github.com/h3n-x/Downloader.sh"
featured: false
order: 8
category: "Web & Security"
areas: ["web", "backend", "security"]
problemSolved: "Online downloaders are full of trackers, fake buttons and third-party cookies, and running yt-dlp as a public service is risky: user-supplied URLs can be abused to reach internal networks, exhaust resources or download far more than intended."
architectureHighlights:
  - "Isolated workers: every job runs yt-dlp in its own subprocess with resource limits and its own session, exchanging JSONL over stdin/stdout with a bounded in-memory job manager."
  - "SSRF barrier: all worker traffic goes through an egress proxy with a per-job token, a pinned public IP, only ports 80/443 and a byte budget."
  - "Allowlisted extractors: yt-dlp only runs the supported platforms' extractors, and FFmpeg only touches local files."
  - "Static-first frontend: an Astro site with a Svelte island receives live progress over Server-Sent Events from the same origin, under a strict Content Security Policy."
keyLearnings:
  - "Threat-modeling a service that fetches arbitrary URLs, and enforcing the policy at the network layer instead of trusting validation alone."
  - "Testing in depth: unit, integration and property tests without network, plus full-stack end-to-end tests with accessibility checks."
  - "Documenting decisions as ADRs alongside architecture, security, deployment and audit documents."
---

downloader.sh answers a simple need, downloading a public video or audio file without accounts or trackers, with an architecture designed for running it safely as a service.

Responsibility is built in: it only downloads public content, and it does not bypass DRM, paywalls, logins or anti-bot measures.
