---
title: "DockerWard"
tagline: "Motor de auditoría de seguridad en runtime para contenedores Docker con reporte SARIF 2.1.0"
description: "Herramienta CLI y auditor de postura de seguridad desarrollado en Python que inspecciona contenedores Docker en ejecución contra el CIS Docker Benchmark v1.6.0, verificando límites de cgroups, capabilities del kernel, sockets montados y perfiles seccomp."
role: "Autor y Desarrollador de la Herramienta"
status: "v0.1.0 · 71 Tests (100% cov reglas) · Release Activo"
technologies:
  - "Python 3.12+"
  - "Docker Engine API"
  - "Linux Kernel"
  - "SARIF 2.1.0"
  - "Pydantic v2"
  - "Rich CLI"
  - "Pytest"
githubUrl: "https://github.com/h3n-x/DockerWard"
featured: true
order: 3
category: "Contenedores & Runtime"
problemSolved: "Los escáneres estáticos de imágenes (como Trivy o Grype) detectan CVEs en paquetes de disco, pero son ciegos ante la postura de ejecución en producción: una imagen 100% segura se convierte en una brecha crítica si se inicia con --privileged, con el socket de Docker montado, sin límites de recursos en cgroups o con seccomp deshabilitado."
architectureHighlights:
  - "Colector desacoplado sobre Docker Engine API: extrae telemetría directa por socket Unix con modelos tipados en Pydantic v2, evitando subshells o llamadas frágiles al comando docker."
  - "Motor de políticas CIS modular: evalúa 6 reglas clave con severidad dinámica (distinguiendo socket rw vs ro) y hallazgos granulares para memoria, CPU y PIDs."
  - "Exportador nativo a OASIS SARIF v2.1.0: inyecta hallazgos directamente en la pestaña GitHub Security / Code Scanning con niveles CVSS, descripciones de impacto y comandos de remediación."
  - "Pipeline Gate para CI/CD: soporte de flag --fail-on con códigos de salida normalizados para bloquear despliegues ante riesgos CRITICAL o HIGH."
keyLearnings:
  - "Comprensión profunda de primitivas de aislamiento del kernel Linux: namespaces compartidos de usuario (UID 0), cgroups v1/v2 (prevención de OOM y fork-bombs en pids.max), bounding sets de capabilities y filtros BPF en seccomp."
  - "Diseño de tests de seguridad deterministas: suite de 71 pruebas automatizadas con 100% de cobertura en reglas y un testbed reproducible con 3 contenedores (privileged, exposed y hardened)."
  - "Estructuración de telemetría de infraestructura con tipado estricto y serialización multi-formato (terminal Rich, JSON estructurado y SARIF estándar)."
---

DockerWard fue diseñado para cerrar el punto ciego más crítico en la seguridad de contenedores: la diferencia entre cómo se construye una imagen y cómo se ejecuta realmente en el servidor de producción.

El sistema inspecciona directamente el daemon local de Docker a través de su socket Unix, extrayendo la configuración viva del proceso y comparándola contra las directrices del CIS Docker Benchmark. Su salida unificada permite a los operadores diagnosticar riesgos en terminal con tablas visuales de alto impacto o automatizar puertas de calidad en GitHub Actions mediante reportes SARIF 2.1.0.
