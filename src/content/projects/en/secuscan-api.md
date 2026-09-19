---
title: "SecuScan API"
tagline: "High-performance backend API for perimeter security auditing and External Attack Surface Management (EASM)"
description: "Asynchronous backend developed in Python and FastAPI designed to audit the external defensive posture of authorized domains and hosts. Features deep TLS/SSL analysis, defensive HTTP security headers, DNS security records (SPF/DMARC/DKIM), async port scanning with DNS rebinding protection, passive Certificate Transparency reconnaissance, Posture Scoring, and SARIF 2.1.0 reporting."
role: "Author & Backend Engineer"
status: "v0.1.0 · 86 Tests (100%) · 0 CVEs · Hardened Non-Root"
technologies:
  - "Python 3.12"
  - "FastAPI"
  - "EASM & DNS Security"
  - "TLS/SSL Deep Inspection"
  - "Anti-SSRF & DNS Rebinding"
  - "SARIF 2.1.0"
  - "PostgreSQL & SQLAlchemy"
  - "Docker Hardened"
  - "Pytest (86 Tests)"
githubUrl: "https://github.com/h3n-x/secuscan-api"
featured: true
order: 5
category: "Perimeter & EASM"
problemSolved: "Organizations face an expanding internet-facing attack surface (orphaned subdomains, exposed services without strong encryption, permissive HTTP headers, and insecure DNS records vulnerable to email spoofing). Most existing EASM tools are expensive enterprise SaaS or intrusive scripts that lack protection against SSRF, DNS rebinding, and unauthorized scanning."
architectureHighlights:
  - "Passive Subdomain Discovery: Maps external attack surface by querying Certificate Transparency logs (`crt.sh`) without transmitting intrusive traffic to the target."
  - "TLS/SSL Deep Inspection: Strict detection of obsolete protocols (`TLS 1.0`, `1.1`, `SSLv3`), weak cipher suites, certificate trust chains, and expiration telemetry."
  - "Defensive HTTP Header Auditing: Rigorous compliance validation of modern security directives (`HSTS`, `CSP`, `X-Frame-Options`, `X-Content-Type-Options`, and `Referrer-Policy`)."
  - "DNS Email Hygiene & Anti-Spoofing: Syntax and policy inspection for `SPF` (flagging permissive `~all` or `?all`), `DMARC` (`p=reject`/`quarantine`), and `DKIM` selectors."
  - "Async Port Scanner with Anti-DNS Rebinding: Pre-resolves IP addresses and binds direct TCP sockets at the IP level to eradicate DNS rebinding attack vectors."
  - "Anti-SSRF Perimeter Hardening: HTTP client with hop-by-hop inspection across 3xx redirects, blocking private ranges (RFC 1918) and cloud metadata services (`169.254.169.254`)."
  - "Cryptographic Domain Ownership Handshake: Requires random TXT token verification (`_secuscan-challenge.<domain>`) before scans can be triggered on any target."
  - "Security Posture Score Engine: Weighted mathematical scoring (0-100) with transparent risk letter grades (`A+` to `F`) and itemized deduction matrices."
  - "Dual Executive & Standard Reporting: Executive Markdown summaries and native OASIS SARIF 2.1.0 exporter for GitHub Code Scanning and DefectDojo."
  - "Container Hardening: Docker deployment running as unprivileged `appuser` (UID 1000) with PostgreSQL isolated within an internal private virtual network."
keyLearnings:
  - "Engineering critical perimeter defenses: robust SSRF neutralization in async HTTP clients and low-level socket handling to mitigate DNS rebinding."
  - "Architecting non-intrusive asset recon via Certificate Transparency and designing multi-factor security scoring algorithms."
  - "Standardizing vulnerability findings under OASIS SARIF 2.1.0 and upholding disciplined test automation: 86 Pytest suites (100% pass) and zero CVE dependencies."
---

SecuScan API was built to solve the critical need for automated perimeter posture visibility and attack surface intelligence without enterprise SaaS vendor lock-in.

The platform provides a modular REST architecture powered by FastAPI with JWT authentication, sliding-window rate limiting, and cryptographic domain ownership verification. It continuously assesses external assets through passive intelligence and deep protocol inspection, outputting actionable Security Posture Scores and OASIS SARIF 2.1.0 reports for automated DevSecOps pipelines.
