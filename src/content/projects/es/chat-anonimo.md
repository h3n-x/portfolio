---
title: "Chat Anónimo v2.5 — Privacy & Anti-Surveillance Suite"
tagline: "Suite de mensajería efímera de nivel militar con arquitectura Zero-Knowledge Blind Relay, ofuscación biométrica de voz, esteganografía LSB y app Android con FLAG_SECURE"
description: "Plataforma de comunicación de alta confidencialidad diseñada bajo el principio de Cero Confianza (*Zero Trust*). Integra WebCrypto nativo (AES-256-GCM + ECDH), depuración profunda de metadatos EXIF/GPS, notas de voz con modulación de formantes, fotos efímeras 'Ver 1 sola vez', modo coacción con sala señuelo universitaria (PIN 9999), esteganografía LSB en PNG, frases mnemónicas BIP-39 (24 palabras) y bloqueo físico de capturas de pantalla a nivel de kernel en Android."
role: "Arquitecto de Seguridad & Desarrollador Principal"
status: "v2.5.0 · 28 Tests Pytest · 12 Tests Vitest · Zero-Persistence RAM"
technologies:
  - "WebCrypto API (AES-256-GCM)"
  - "ECDH (P-256) & HKDF"
  - "Web Audio API (Voice Scrambler)"
  - "LSB Image Steganography"
  - "BIP-39 Mnemonic Derivation"
  - "Android Native (Capacitor FLAG_SECURE)"
  - "FastAPI & WebSockets"
  - "React 19 & TypeScript Strict"
  - "TailwindCSS v4"
  - "MediaRecorder E2EE"
  - "Pytest (28 Suites)"
  - "Vitest (12 Suites)"
githubUrl: "https://github.com/h3n-x/chat-anonimo"
demoUrl: "https://chat-zk.netlify.app"
featured: true
order: 4
category: "Criptografía & Anti-Vigilancia"
problemSolved: "Las aplicaciones de mensajería populares (WhatsApp, Telegram, Signal) comprometen la seguridad del usuario al exigir números telefónicos, retener historiales en servidores cloud o indexar metadatos masivos. Además, los chats cifrados comunes carecen de defensas contra coacción física directa, inspección forense de metadatos en archivos adjuntos, reconocimiento de huella vocal o análisis de tráfico pasivo en el ISP."
architectureHighlights:
  - "Arquitectura Zero-Knowledge Blind Relay: El servidor FastAPI es técnicamente incapaz de descifrar tramas, almacenar mensajes o retener claves (demostrado formalmente en test_server_inability.py); toda la criptografía vive aislada en memoria RAM volátil sin tocar disco."
  - "Defensas Anti-Forenses y Modo Coacción (Duress Decoy Room): Ante inspección coercitiva, ingresar el PIN 9999, escribir /duress o presionar Ctrl+Shift+D ejecuta un nuke criptográfico inmediato de la RAM y levanta una sala falsa de estudio universitario inocente y funcional."
  - "Limpieza Profunda de Metadatos y Hash SHA-256: Toda imagen o documento es despojado en memoria de metadatos EXIF, coordenadas GPS y marcas de cámara, ofuscando su nombre a un hash criptográfico antes de ser transmitido."
  - "Ofuscación Biométrica de Voz en Tiempo Real: Motor de Web Audio API que modula formantes y pitch acústico (Voz Grave, Helio, Cibernética, Susurro) antes de codificar y cifrar el audio, impidiendo el reconocimiento de huella vocal forense."
  - "Medios Efímeros 'Ver Una Sola Vez' y Portapapeles Seguro: Visor con temporizador de 7s, difuminado automático anti-captura al perder foco y destrucción irreversible de blobs en RAM; el portapapeles del sistema operativo se auto-borra a los 30 segundos."
  - "Esteganografía LSB en Imágenes PNG y Frases BIP-39: Capacidad de incrustar mensajes secretos en los bits menos significativos de fotos portadoras y respaldar claves simétricas de 256 bits mediante 24 palabras mnemónicas con checksum SHA-256 verificado."
  - "Aplicación Android Nativa con FLAG_SECURE a Nivel de Kernel: Bloqueo físico en el sistema operativo contra capturas de pantalla (Power + Vol-), grabación por malware y ocultación en el selector de tareas del teléfono, con User-Agent spoofing."
keyLearnings:
  - "Ingeniería de protocolos de comunicación con prueba formal de incapacidad técnica del intermediario (Blind Relay)."
  - "Diseño de un ciclo de vida fail-closed en RAM que revoca URLs de objetos Blob y limpia claves simétricas de inmediato ante eventos de pánico o desconexión."
  - "Acuerdo de claves asimétrico con ECDH P-256 y verificación visual Short Authentication String (SAS) de 4 palabras para protección matemática contra ataques Man-In-The-Middle (MITM)."
  - "Mitigación de ataques de canal lateral, fingerprinting acústico de voz y análisis estadístico de paquetes mediante camuflaje de tráfico señuelo."
---

Chat Anónimo v2.5 representa una auditoría y reescritura técnica profunda sobre un proyecto abandonado en 2025. El objetivo no fue añadir cosmética visual, sino confrontar con rigor técnico una vulnerabilidad fundamental de la industria: la mayoría del llamado "cifrado E2EE" comercial sigue vinculado a identidades civiles reales (números telefónicos), depende de autoridades de clave centralizadas y deja rastros forenses imborrables en metadatos, grabaciones de voz y memorias locales.

En esta suite de ultra-privacidad, el backend de FastAPI actúa estrictamente como un enrutador ciego (*Zero-Knowledge Blind Relay*). La generación de claves, el cifrado autenticado AES-256-GCM con AAD (`room:ID`) y el intercambio asimétrico efímero ECDH ocurren de forma aislada en la memoria RAM del navegador a través de la WebCrypto API nativa. 

El sistema incorpora un arsenal de capacidades tácticas anti-vigilancia: distorsión biométrica de voz para derrotar peritajes fonéticos, desinfección de metadatos EXIF/GPS en imágenes, fotos "Ver una sola vez" con autodestrucción en 7 segundos, esteganografía LSB en imágenes PNG, frases de recuperación mnemónica estándar Bitcoin BIP-39 (24 palabras), portapapeles auto-destructible a los 30 segundos, camuflaje con tráfico señuelo periódico, compatibilidad con la red Tor y un **Modo Coacción** que despliega una sala de estudio universitaria inocente si el usuario es extorsionado físicamente para abrir el chat. Asimismo, la versión móvil nativa en Android implementa `FLAG_SECURE` a nivel de kernel para neutralizar capturas de pantalla físicas y grabadores de pantalla de malware.
