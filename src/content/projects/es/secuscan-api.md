---
title: "SecuScan API"
tagline: "Backend API de alto rendimiento para auditoría perimetral y gestión de superficie de ataque externa (EASM)"
description: "Backend asíncrono desarrollado en Python y FastAPI especializado en evaluar la postura defensiva perimetral de dominios y hosts autorizados. Realiza análisis profundo de TLS/SSL, cabeceras HTTP de seguridad, registros DNS (SPF/DMARC/DKIM), escaneo de puertos con mitigación de DNS rebinding, descubrimiento pasivo vía Certificate Transparency, cálculo de Posture Score y exportación a SARIF 2.1.0."
role: "Autor y Desarrollador Backend"
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
category: "Perímetro & EASM"
problemSolved: "Las organizaciones enfrentan una superficie de ataque perimetral en continua expansión (subdominios huérfanos, servicios expuestos sin cifrado robusto, cabeceras HTTP permisivas y configuraciones de correo propensas a suplantación). Muchas herramientas de EASM son servicios comerciales costosos o scripts invasivos que carecen de defensas contra abusos como SSRF y DNS rebinding."
architectureHighlights:
  - "Descubrimiento pasivo de subdominios: Mapeo de superficie de ataque consultando Certificate Transparency (`crt.sh`) sin emitir tráfico intrusivo hacia el objetivo."
  - "Deep Inspection TLS/SSL: Detección estricta de protocolos obsoletos (`TLS 1.0`, `1.1`, `SSLv3`), algoritmos de firma débiles, cadena de confianza y monitoreo de expiración."
  - "Auditoría de cabeceras HTTP defensivas: Validación exhaustiva de directivas modernas (`HSTS`, `CSP`, `X-Frame-Options`, `X-Content-Type-Options` y `Referrer-Policy`)."
  - "Higiene y políticas DNS de correo: Verificación sintáctica y de directivas en registros `SPF` (alertando ante `~all` o `?all`), `DMARC` (`p=reject`/`quarantine`) y selectores `DKIM`."
  - "Escáner de puertos asíncrono con Anti-DNS Rebinding: Resolución previa y enlace directo por socket a nivel IP para inmunidad total frente a rebinding durante escaneos TCP."
  - "Hardening perimetral Anti-SSRF: Cliente HTTP con inspección hop-by-hop en redirecciones 3xx que bloquea solicitudes hacia rangos privados (RFC 1918) y metadatos cloud (`169.254.169.254`)."
  - "Verificación criptográfica de propiedad: Handshake de autorización obligatoria mediante token aleatorio en registro DNS TXT (`_secuscan-challenge.<dominio>`) antes de permitir cualquier escaneo."
  - "Motor de Postura de Seguridad: Algoritmo de scoring matemático ponderado de 0 a 100 con letras de riesgo (`A+` a `F`) y factores de penalización transparentes."
  - "Exportación dual ejecutiva y SARIF 2.1.0: Informes ejecutivos en Markdown y exportador estándar a OASIS SARIF 2.1.0 para integración directa en GitHub Code Scanning y DefectDojo."
  - "Despliegue hardened en contenedor: Ejecución en Docker bajo usuario no root `appuser` (UID 1000) con base de datos PostgreSQL aislada en red virtual interna privada."
keyLearnings:
  - "Ingeniería de defensas perimetrales críticas: neutralización rigurosa de SSRF en clientes asíncronos y mitigación de DNS rebinding a nivel de socket en Python."
  - "Arquitectura de pipelines de auditoría pasiva basados en Certificate Transparency y modelado algorítmico de posturas de seguridad en escala 0-100."
  - "Estandarización de hallazgos bajo la norma OASIS SARIF 2.1.0 y disciplina de pruebas automatizadas: 86 tests (100% éxito) con Pytest y 0 CVEs en dependencias."
---

SecuScan API fue concebido para resolver el problema de visibilidad y seguridad en el perímetro externo de aplicaciones y organizaciones.

El sistema proporciona una arquitectura REST modular con autenticación JWT, rate limiting dinámico por usuario y una estricta barrera de verificación criptográfica de dominios. Sus motores especializados combinan descubrimiento pasivo de subdominios con auditorías profundas de cifrado y cabeceras, consolidando los resultados en un Security Posture Score y exportando reportes estándar SARIF 2.1.0 listos para integrarse en pipelines de DevSecOps.
