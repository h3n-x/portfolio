---
title: "Chat Anónimo v2.1"
tagline: "Sistema de mensajería efímera con cifrado de extremo a extremo (E2EE) real, resistencia a análisis de tráfico y arquitectura Zero-Knowledge Blind Relay"
description: "Plataforma de comunicación anónima con WebCrypto nativo (AES-256-GCM + ECDH P-256), padding criptográfico de longitud fija, temporizadores de autodestrucción (burn-after-reading), notas de voz E2EE, defensas anti-captura y botón de pánico de autodestrucción en RAM."
role: "Autor y Desarrollador del Proyecto"
status: "v2.1.0 · 28 Tests Backend · 5 Tests Frontend · WebCrypto Nativo"
technologies:
  - "WebCrypto API"
  - "AES-256-GCM"
  - "ECDH (P-256)"
  - "Web Audio API"
  - "MediaRecorder E2EE"
  - "FastAPI"
  - "WebSockets"
  - "React 19"
  - "TypeScript Strict"
  - "TailwindCSS v4"
  - "Pytest"
  - "Vitest"
githubUrl: "https://github.com/h3n-x/chat-anonimo"
demoUrl: "https://chat-zk.netlify.app"
featured: true
order: 4
category: "Criptografía & Red E2EE"
problemSolved: "Las aplicaciones de chat tradicionales y la versión original de este proyecto dependían de un falso E2EE donde el servidor gestionaba claves y descifraba en tránsito. Además, la inferencia de tráfico por análisis de longitud de paquetes revelaba patrones de mensajes, y las sesiones en navegadores carecían de defensas contra miradas indiscretas, capturas de pantalla o persistencia residual en memoria."
architectureHighlights:
  - "Arquitectura Zero-Knowledge Blind Relay: el servidor FastAPI actúa como un enrutador ciego de paquetes sin almacenar, loggear ni retransmitir material de claves, aislando la criptografía 100% en el cliente."
  - "Resistencia a Análisis de Tráfico (Padding de 256 bytes): los mensajes son rellenados con ruido CSPRNG y prefijados con longitud antes del cifrado, asegurando tamaños idénticos independientemente de la longitud del texto."
  - "Mensajería Efímera con Autodestrucción (Burn-after-reading): temporizadores con cuenta regresiva visual que purgan y revuelven los mensajes y objetos de memoria RAM tras expirar."
  - "Notas de Voz y Archivos Cifrados en Memoria: streaming binario con MediaRecorder y AES-256-GCM con reproductor y visor de previsualización en RAM, sin almacenamiento temporal en disco."
  - "Defensas Anti-Hombro y Botón de Pánico (Nuke): encubrimiento visual automático en pérdida de foco/selector de apps, neutralización de portapapeles en PrintScreen y atajo de autodestrucción (Esc x 3)."
  - "Compartición Zero-Knowledge vía RFC 3986 Hash Fragment y QR local: generación en memoria de códigos QR SVG y enlaces directos sin consultar APIs externas."
keyLearnings:
  - "Implementación de padding criptográfico para neutralizar fingerprinting de longitud de paquetes por parte de observadores pasivos de red."
  - "Diseño de un ciclo de vida fail-closed en RAM que revoca URLs de objetos Blob y limpia claves simétricas de inmediato ante eventos de pánico."
  - "Acuerdo de claves asimétrico con ECDH P-256 y verificación visual Short Authentication String (SAS) para protección contra ataques MITM."
---

Chat Anónimo v2.0 representa una auditoría y reescritura técnica profunda sobre un proyecto abandonado en 2025. El objetivo no fue añadir cosmética visual, sino confrontar con rigor técnico una vulnerabilidad fundamental: el autodenominado "cifrado E2EE" de la primera versión no era real, pues el servidor conocía y gestionaba las claves simétricas de cada participante.

En esta nueva versión, el backend de FastAPI actúa estrictamente como un enrutador ciego (*Zero-Knowledge Blind Relay*). La generación de claves, el cifrado autenticado AES-256-GCM y el intercambio asimétrico ECDH ocurren de forma aislada en la memoria RAM del navegador a través de la WebCrypto API nativa. Los mensajes y archivos desaparecen de forma irrevocable al desconectarse los participantes, garantizando cero persistencia en bases de datos y una superficie de ataque mínima.
