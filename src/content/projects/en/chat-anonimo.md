---
title: "Chat Anónimo v2.1"
tagline: "Ephemeral messaging system with real End-to-End Encryption (E2EE), traffic analysis resistance, and Zero-Knowledge Blind Relay architecture"
description: "Anonymous communication platform featuring native WebCrypto (AES-256-GCM + ECDH P-256), fixed-length cryptographic padding, burn-after-reading timers, E2EE voice notes, anti-capture defenses, and a RAM zero-wipe panic button."
role: "Project Author & Developer"
status: "v2.1.0 · 28 Backend Tests · 5 Frontend Tests · Native WebCrypto"
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
category: "Cryptography & E2EE Networks"
problemSolved: "Traditional chat applications and the legacy v1.0 of this project relied on a flawed premise where the server managed keys and decrypted in transit. Furthermore, packet length analysis exposed message patterns, and browser sessions lacked defenses against shoulder-surfing, screenshot leaks, or residual memory persistence."
architectureHighlights:
  - "Zero-Knowledge Blind Relay architecture: the FastAPI server acts as a blind packet router without storing, logging, or transmitting key material, isolating cryptography 100% in the client."
  - "Traffic Analysis Resistance (256-byte Padding): messages are padded with CSPRNG noise and length-prefixed before encryption, ensuring identical ciphertext sizes regardless of message length."
  - "Burn-after-reading Timers: visual countdown timers that automatically purge and scramble messages and in-memory object URLs upon expiration."
  - "In-Memory Voice Notes & Encrypted Files: streaming binary uploads via MediaRecorder and AES-256-GCM with memory-only playback and lightbox previews, leaving zero traces on disk."
  - "Anti-Shoulder Surfing & Panic Nuke: automatic blackout overlay on app switch/blur, clipboard sanitization on PrintScreen, and a triple-Esc keyboard shortcut to nuke RAM instantly."
  - "Zero-Knowledge Sharing via RFC 3986 Hash Fragment & Local QR: in-memory SVG QR code generator and direct hash fragment links that bypass external API requests."
keyLearnings:
  - "Implementing cryptographic padding to eliminate packet size fingerprinting by passive network adversaries."
  - "Designing a fail-closed in-memory lifecycle that revokes Blob URLs and clears symmetric keys instantly during panic events."
  - "Asymmetric key agreement with ECDH P-256 and visual Short Authentication String (SAS) verification to defend against MITM attacks."
---

Chat Anónimo v2.0 represents a rigorous security audit and architectural overhaul of an abandoned 2025 project. Rather than applying superficial UI patches, the rewrite confronted a critical vulnerability: the self-described 'E2EE encryption' of the initial version was fundamentally broken, as the server acted as an active decryptor and key distributor.

In this v2.0 rewrite, the FastAPI backend functions strictly as a zero-knowledge blind relay. Key generation, AES-256-GCM authenticated encryption, and ephemeral ECDH key agreement take place exclusively in the browser's RAM via native WebCrypto. All rooms, messages, and files vanish permanently once participants disconnect, ensuring genuine zero-persistence and an irreducible attack surface.
