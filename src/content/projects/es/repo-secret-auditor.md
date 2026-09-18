---
title: "Repo Secret Auditor"
tagline: "Motor backend de escaneo de secretos y dependencias con integración SARIF 2.1.0"
description: "Servicio API REST y runner de CI/CD desarrollado en Python y FastAPI que audita repositorios Git en busca de credenciales expuestas y dependencias vulnerables, integrándose de forma nativa con GitHub Code Scanning mediante policy gates de severidad."
role: "Autor y Desarrollador Backend"
status: "v0.1.0 · Tests (>80% cov) & CI/CD Activo"
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
category: "Backend & Seguridad"
problemSolved: "La exposición accidental de secretos (tokens, llaves privadas, credenciales) y dependencias vulnerables en repositorios Git representa uno de los mayores riesgos en DevSecOps. Muchas organizaciones carecen de un motor local y ligero que audite el código en CI sin depender de SaaS externos invasivos."
architectureHighlights:
  - "API asíncrona de alto rendimiento en FastAPI con persistencia en SQLAlchemy y migraciones estructuradas con Alembic."
  - "Exportador nativo a SARIF 2.1.0 (Static Analysis Results Interchange Format), permitiendo visualizar hallazgos directamente en la pestaña de GitHub Code Scanning a nivel de archivo y línea."
  - "Workflow reutilizable de GitHub Actions con policy gate (fail-on-severity) que detiene pipelines si se detectan vulnerabilidades HIGH o CRITICAL."
  - "Controles de seguridad defensivos: rate limiting (SlowAPI), validación estricta de parámetros y sanitización de logs para no reexponer secretos capturados."
keyLearnings:
  - "Diseño de un motor de escaneo desacoplado capaz de ejecutarse tanto en servidor como mediante CLI local o GitHub Actions."
  - "Implementación del estándar abierto SARIF para interoperabilidad con plataformas DevSecOps empresariales."
  - "Disciplina de pruebas rigurosa: suite con tests unitarios, de integración y smoke tests superando el 80% de cobertura bajo modo de warnings estricto."
---

Repo Secret & Dependency Auditor surgió para resolver un desafío concreto de seguridad en el ciclo de desarrollo de software: detectar brechas antes de que el código llegue a entornos productivos.

El sistema proporciona tanto una API REST interactiva para crear y consultar escaneos como un runner ligero pensado para pipelines de integración continua. Su exportador SARIF 2.1.0 actúa como puente nativo con el ecosistema de GitHub, inyectando anotaciones de seguridad directamente en las revisiones de código de los pull requests.
