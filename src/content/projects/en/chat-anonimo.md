---
title: "Chat Anónimo v2.0"
tagline: "Ephemeral messaging system with real End-to-End Encryption (E2EE) and Zero-Knowledge Blind Relay architecture"
description: "Anonymous communication platform rewritten from the ground up to eradicate weak fallbacks and server-side decryption, featuring native WebCrypto (AES-256-GCM + ECDH P-256), Zero-Knowledge invitation links via RFC 3986, and 15MB bounded encrypted file streaming."
role: "Project Author & Developer"
status: "v2.0.0 · 25 Backend Tests (93% cov) · Native WebCrypto"
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
demoUrl: "https://write-ghost.netlify.app"
featured: true
order: 4
category: "Cryptography & E2EE Networks"
problemSolved: "Traditional chat platforms and the legacy v1.0 of this project relied on a flawed premise: the server generated and distributed symmetric keys, decrypted messages in transit, and silently degraded to XOR fallbacks using Math.random(). Furthermore, unauthenticated admin endpoints and unbounded file uploads exposed the server to DoS memory exhaustion."
architectureHighlights:
  - "Zero-Knowledge Blind Relay architecture: the FastAPI server acts as a blind packet router that never generates, derives, or stores keys, making it mathematically impossible to decrypt messages or files."
  - "Key exchange via RFC 3986 URL Hash Fragment: room keys are shared in the URL hash fragment (#room=XYZ&key=BASE64), which per RFC 3986 standard is never transmitted across the network or sent to the server."
  - "Asymmetric key agreement with ECDH (P-256): supports room code joining via ephemeral Diffie-Hellman handshake and HKDF-SHA256 key wrapping for RoomKey distribution."
  - "In-memory file encryption with chunked streaming: clients encrypt files locally with AES-256-GCM and stream 64 KB blocks to the relay with a hard 15 MB cutoff (HTTP 413) and 10-minute auto-destruction TTL."
  - "Strict Fail-Closed policy: if the browser or network lacks WebCrypto (e.g. non-secure HTTP), the UI is blocked immediately with zero silent degradation to weak ciphers."
keyLearnings:
  - "Clear technical distinction between Transport Layer Security (TLS) and genuine End-to-End Encryption (E2EE) with AAD binding room IDs to prevent cross-room replay attacks."
  - "Mitigating Man-in-the-Middle (MITM) attacks through visual 4-word Short Authentication Strings (SAS) derived from cryptographic key hashes."
  - "Bounded asynchronous streaming in FastAPI to prevent memory exhaustion (OOM DoS) while handling opaque binary payloads without server-side inspection."
---

Chat Anónimo v2.0 represents a rigorous security audit and architectural overhaul of an abandoned 2025 project. Rather than applying superficial UI patches, the rewrite confronted a critical vulnerability: the self-described 'E2EE encryption' of the initial version was fundamentally broken, as the server acted as an active decryptor and key distributor.

In this v2.0 rewrite, the FastAPI backend functions strictly as a zero-knowledge blind relay. Key generation, AES-256-GCM authenticated encryption, and ephemeral ECDH key agreement take place exclusively in the browser's RAM via native WebCrypto. All rooms, messages, and files vanish permanently once participants disconnect, ensuring genuine zero-persistence and an irreducible attack surface.
