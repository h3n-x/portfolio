---
title: "Repo Secret Auditor"
tagline: "Backend secret & dependency scanner engine with native SARIF 2.1.0 integration"
description: "A Python and FastAPI backend service and CI/CD runner engineered to audit Git repositories for leaked secrets and vulnerable dependencies, natively integrating into GitHub Code Scanning via severity-based policy gates."
role: "Author & Backend Developer"
status: "v0.2.0 · 90% Cov · 0 CVEs & CI/CD Hardened"
technologies:
  - "Python"
  - "FastAPI"
  - "Gitleaks TOML"
  - "OSV Batch API"
  - "SARIF 2.1.0"
  - "GitHub Actions"
  - "Pytest"
  - "SQLAlchemy"
githubUrl: "https://github.com/h3n-x/repo-secret-auditor"
featured: true
order: 2
category: "Backend & Security"
problemSolved: "Accidental credential leakage (API keys, private tokens, certificates) and stale dependencies in Git repositories are leading attack vectors. Teams frequently lack lightweight, self-hosted audit runners that integrate into CI/CD pipelines without incurring costly enterprise SaaS overhead."
architectureHighlights:
  - "Gitleaks-compatible TOML rule engine combined with Shannon entropy filtering and heuristic keyword checks to eliminate false positives."
  - "Multi-ecosystem dependency auditor supporting `poetry.lock`, `requirements.txt` (version ranges) and `package-lock.json` querying the OSV Batch API (`/v1/querybatch`)."
  - "FIRST.org compliant CVSS v3.1 vector calculator parsing raw metric strings into exact numerical base scores (e.g. 9.8), preventing silent CI gate bypasses."
  - "Native OASIS SARIF 2.1.0 exporter populating findings directly into GitHub Code Scanning, accompanied by a reusable GitHub Actions workflow with strict HIGH/CRITICAL failure policies."
  - "Comprehensive defensive hardening: rigorous anti-SSRF enforcement (blocking private IP ranges and cloud metadata), Git ref flag injection mitigation, and `SensitiveDataFilter` logging protection."
keyLearnings:
  - "Designing modular static analysis engines capable of dual execution modes: async REST API daemon and headless CI runner."
  - "Implementing mathematical CVSS v3.1 vector calculation algorithms and structured SARIF reporting without heavy external runtime dependencies."
  - "Rigorous software assurance discipline: 90% test coverage with Pytest, strict static type checking with Mypy, Ruff linting, and 0 known vulnerabilities validated by `pip-audit`."
---

Repo Secret & Dependency Auditor was designed to solve a critical DevSecOps problem: catching security oversights before code merges into production branches.

The platform provides both an interactive REST API for triggerable on-demand audits and an automated runner configured for continuous integration workflows. Its Gitleaks-compatible TOML rules engine, OSV Batch integration, and compliant SARIF 2.1.0 exporter bridge local security scanning directly into GitHub Code Scanning reviews.
