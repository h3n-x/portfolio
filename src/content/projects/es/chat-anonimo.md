---
title: "Chat Anónimo v2.0"
tagline: "Sistema de mensajería efímera con cifrado de extremo a extremo (E2EE) real y arquitectura Zero-Knowledge Blind Relay"
description: "Plataforma de comunicación anónima reescrita desde cero para erradicar fallbacks débiles y descifrado en servidor, implementando WebCrypto nativo (AES-256-GCM + ECDH P-256), enlaces de invitación Zero-Knowledge vía RFC 3986 y streaming de archivos cifrados con cuota de 15MB."
role: "Autor y Desarrollador del Proyecto"
status: "v2.0.0 · 27 Tests Backend (93% cov) · WebCrypto Nativo"
technologies:
  - "WebCrypto API"
  - "AES-256-GCM"
  - "ECDH (P-256)"
  - "Python 3.12+"
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
problemSolved: "Las aplicaciones de chat tradicionales y la versión v1.0 original de este proyecto dependían de un falso E2EE: el servidor generaba y repartía claves simétricas, descifraba los mensajes en tránsito y exponía fallbacks silenciosos a operaciones XOR con Math.random(). Además, la subida de archivos almacenaba metadatos legibles y no protegía la RAM contra ataques de denegación de servicio."
architectureHighlights:
  - "Arquitectura Zero-Knowledge Blind Relay: el servidor FastAPI actúa como un enrutador ciego de paquetes; la implementación no almacena, loggea ni retransmite material de claves simétricas o privadas, aislando completamente las operaciones criptográficas en el cliente."
  - "Compartición de claves vía RFC 3986 Hash Fragment: el anfitrión comparte la sala mediante el fragmento hash de la URL (#room=XYZ&key=BASE64), el cual jamás viaja por la red ni se envía al servidor HTTP."
  - "Acuerdo de claves asimétrico con ECDH (P-256): soporte de unión por código de sala con handshake efímero Diffie-Hellman y derivación HKDF-SHA256 para envoltura segura de la RoomKey."
  - "Cifrado de archivos en memoria con streaming chunked: los clientes cifran archivos localmente con AES-256-GCM y los transmiten en bloques de 64 KB hacia el relay con corte estricto de 15 MB (HTTP 413) y TTL de autodestrucción en 10 minutos."
  - "Política estricta de Fail-Closed: si el navegador o contexto carece de WebCrypto (ej. HTTP no seguro), la interfaz se bloquea sin degradación silenciosa ni algoritmos débiles."
keyLearnings:
  - "Diferenciación rigurosa entre cifrado en tránsito (TLS) y verdadero cifrado de extremo a extremo (E2EE) con AAD vinculando criptográficamente el ID de la sala para impedir ataques de retransmisión."
  - "Mitigación de ataques Man-in-the-Middle (MITM) mediante Short Authentication Strings (SAS) visuales de 4 palabras derivadas del hash criptográfico de la clave."
  - "Manejo asíncrono y delimitado de streams binarios en FastAPI para prevenir agotamiento de memoria (OOM DoS) sin inspeccionar los datos cifrados."
---

Chat Anónimo v2.0 representa una auditoría y reescritura técnica profunda sobre un proyecto abandonado en 2025. El objetivo no fue añadir cosmética visual, sino confrontar con rigor técnico una vulnerabilidad fundamental: el autodenominado "cifrado E2EE" de la primera versión no era real, pues el servidor conocía y gestionaba las claves simétricas de cada participante.

En esta nueva versión, el backend de FastAPI actúa estrictamente como un enrutador ciego (*Zero-Knowledge Blind Relay*). La generación de claves, el cifrado autenticado AES-256-GCM y el intercambio asimétrico ECDH ocurren de forma aislada en la memoria RAM del navegador a través de la WebCrypto API nativa. Los mensajes y archivos desaparecen de forma irrevocable al desconectarse los participantes, garantizando cero persistencia en bases de datos y una superficie de ataque mínima.
