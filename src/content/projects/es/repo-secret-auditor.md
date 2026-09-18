---
title: "Repo Secret Auditor"
tagline: "Motor backend de escaneo de secretos y dependencias con integración SARIF 2.1.0"
description: "Servicio API REST y runner de CI/CD desarrollado en Python y FastAPI que audita repositorios Git en busca de credenciales expuestas y dependencias vulnerables, integrándose de forma nativa con GitHub Code Scanning mediante policy gates de severidad."
role: "Autor y Desarrollador Backend"
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
category: "Backend & Seguridad"
problemSolved: "La exposición accidental de secretos (tokens, llaves privadas, credenciales) y dependencias vulnerables en repositorios Git representa uno de los mayores riesgos en DevSecOps. Muchas organizaciones carecen de un motor local y ligero que audite el código en CI sin depender de SaaS externos invasivos."
architectureHighlights:
  - "Motor de detección de secretos configurable mediante reglas TOML (compatible con Gitleaks) con filtros heurísticos de entropía de Shannon para minimizar falsos positivos."
  - "Auditor de dependencias con soporte multi-ecosistema (`poetry.lock`, `requirements.txt` con operadores de rango y `package-lock.json`) consultando la API de OSV por lotes (`/v1/querybatch`)."
  - "Calculador algorítmico de vectores CVSS v3.1 conforme a FIRST.org, resolviendo puntuaciones exactas (ej. 9.8) para evitar evasiones silenciosas en los policy gates de CI."
  - "Exportador nativo a OASIS SARIF 2.1.0 para visualización de hallazgos en GitHub Code Scanning y workflow reusable de GitHub Actions con política estricta de fallo en HIGH/CRITICAL."
  - "Hardening perimetral y defensivo: mitigación estricta de SSRF (bloqueo de rangos privados y cloud metadata), sanitización de flags en Git refs y filtro `SensitiveDataFilter` para erradicar fugas de secretos en logs."
keyLearnings:
  - "Diseño de motores de análisis estático desacoplados capaces de operar como microservicio REST o runner headless en pipelines CI."
  - "Implementación de parsers algorítmicos para vectores CVSS v3.1 y exportación estructurada bajo el estándar OASIS SARIF."
  - "Disciplina de aseguramiento de código rigurosa: 90% de cobertura con Pytest, tipado estricto verificado por Mypy, linter con Ruff y 0 CVEs en dependencias auditadas por `pip-audit`."
---

Repo Secret & Dependency Auditor surgió para resolver un desafío concreto de seguridad en el ciclo de desarrollo de software: detectar brechas antes de que el código llegue a entornos productivos.

El sistema proporciona tanto una API REST interactiva para crear y consultar escaneos como un runner ligero pensado para pipelines de integración continua. Su motor de reglas TOML compatible con Gitleaks, su integración con OSV Batch y su exportador SARIF 2.1.0 actúan como puente nativo con el ecosistema de GitHub, inyectando anotaciones de seguridad directamente en las revisiones de código de los pull requests.
