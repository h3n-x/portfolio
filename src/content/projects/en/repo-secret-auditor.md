---
title: "Repo Secret Auditor"
tagline: "Backend secret & dependency scanner engine with native SARIF 2.1.0 integration"
description: "A Python and FastAPI backend service and CI/CD runner engineered to audit Git repositories for leaked secrets and vulnerable dependencies, natively integrating into GitHub Code Scanning via severity-based policy gates."
role: "Author & Backend Developer"
status: "v0.1.0 · Tests (>80% cov) & Active CI/CD"
technologies:
  - "Python"
  - "FastAPI"
  - "SQLAlchemy"
  - "SARIF 2.1.0"
  - "GitHub Actions"
  - "Pytest"
  - "Alembic"
githubUrl: "https://github.com/h3n-x/repo-secret-auditor"
featured: true
order: 2
category: "Backend & Security"
problemSolved: "Accidental credential leakage (API keys, private tokens, certificates) and stale dependencies in Git repositories are leading attack vectors. Teams frequently lack lightweight, self-hosted audit runners that integrate into CI/CD pipelines without incurring costly enterprise SaaS overhead."
architectureHighlights:
  - "High-throughput asynchronous FastAPI architecture with SQLAlchemy ORM persistence and schema migrations managed via Alembic."
  - "Native OASIS SARIF 2.1.0 exporter, populating security findings directly into the GitHub Code Scanning dashboard at precise line and column offsets."
  - "Reusable GitHub Actions workflow featuring a configurable severity policy gate (fail-on-severity) that automatically blocks pull requests containing HIGH or CRITICAL issues."
  - "Hardened defensive engineering: endpoint rate limiting (SlowAPI), strict parameter validation against injection, and safe log sanitization to prevent secondary credential leakage."
keyLearnings:
  - "Architecting decoupled scanning engines capable of dual runtime modes: HTTP daemon mode and headless CLI execution for CI pipelines."
  - "Translating internal vulnerability models into the industry-standard SARIF JSON schema."
  - "Rigorous testing discipline: full suite of unit, integration, and smoke tests exceeding 80% coverage enforced under strict warning mode."
---

Repo Secret & Dependency Auditor was designed to solve a critical DevSecOps problem: catching security oversights before code merges into production branches.

The platform provides both an interactive REST API for triggerable on-demand audits and an automated runner configured for continuous integration workflows. Its compliant SARIF 2.1.0 export engine bridges local security scanning directly into GitHub Code Scanning reviews.
