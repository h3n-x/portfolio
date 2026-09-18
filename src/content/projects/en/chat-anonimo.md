---
title: "Chat Anónimo v2.5 — Privacy & Anti-Surveillance Suite"
tagline: "Military-grade ephemeral messaging suite with native Zero-Knowledge Blind Relay, biometric voice scrambling, LSB steganography, and Android app with FLAG_SECURE"
description: "High-confidentiality communication platform engineered upon strict Zero Trust principles. Integrates native browser WebCrypto (AES-256-GCM + ECDH), deep EXIF/GPS metadata stripping, voice notes with formant modulation, View-Once ephemeral media, duress mode with university decoy room (PIN 9999), LSB image steganography, BIP-39 mnemonic passphrases (24 words), and OS-level screenshot blocking on Android via FLAG_SECURE."
role: "Security Architect & Lead Engineer"
status: "v2.5.0 · 28 Pytest Tests · 12 Vitest Tests · Zero-Persistence RAM"
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
category: "Cryptography & Anti-Surveillance"
problemSolved: "Mainstream messaging platforms (WhatsApp, Telegram, Signal) compromise user sovereignty by mandating phone numbers, storing message histories on cloud servers, or harvesting vast communication metadata. Furthermore, standard E2EE tools lack defenses against direct physical coercion, forensic metadata leakage in attachments, biometric voiceprint profiling, or passive ISP traffic analysis."
architectureHighlights:
  - "Zero-Knowledge Blind Relay Architecture: The FastAPI server is technically incapable of decrypting frames, storing messages, or retaining keys (formally proven in test_server_inability.py); all cryptography is strictly isolated in volatile client RAM without disk storage."
  - "Anti-Forensic Defenses & Duress Decoy Room: In the event of physical extortion or coercion, entering PIN 9999, typing /duress, or pressing Ctrl+Shift+D triggers an instant in-memory key wipe and displays an innocent, fully functional university study group room."
  - "Deep Metadata Scrubber & SHA-256 Hash Masking: Every attached image or file is stripped in memory of EXIF metadata, GPS coordinates, and camera device serials, replacing the filename with a cryptographic hash before transmission."
  - "Real-Time Biometric Voice Scrambler: Web Audio API engine modulating vocal formants and pitch (Deep Pitch, Helium, Cyborg, Whisper) prior to encoding and encryption, defeating forensic acoustic identification and voiceprint profiling."
  - "View-Once Ephemeral Media & Self-Scrubbing Clipboard: Media viewer with 7-second countdown, automatic anti-capture blur upon losing focus, and irreversible blob destruction; operating system clipboard auto-wipes after 30 seconds."
  - "LSB Image Steganography & BIP-39 Passphrases: Capacity to inject confidential payloads into lowest-significant bits of carrier PNG photos, and back up 256-bit symmetric room keys using standard 24-word BIP-39 mnemonics with SHA-256 checksum verification."
  - "Native Android App with OS-Level FLAG_SECURE: Kernel-level protection blocking hardware screenshots (Power + Vol-), screen recording malware, and task switcher snapshots, reinforced with User-Agent header spoofing."
keyLearnings:
  - "Protocol engineering with mathematical proof of technical inability on the relay intermediary (Blind Relay)."
  - "Design of a strict fail-closed in-RAM lifecycle revoking Blob Object URLs and zeroing symmetric keys upon panic or disconnect."
  - "Asymmetric key agreement via ECDH P-256 with visual 4-word Short Authentication String (SAS) for mathematical Man-In-The-Middle (MITM) defense."
  - "Mitigation of side-channel attacks, acoustic voice fingerprinting, and packet-length statistical traffic analysis through periodic decoy traffic."
---

Chat Anónimo v2.5 represents a rigorous security audit and architectural overhaul of an abandoned 2025 project. Rather than applying superficial cosmetic patches, the rewrite confronted a critical vulnerability in the messaging industry: most commercial "E2EE" services remain tethered to real-world civilian identities (mobile numbers), rely on centralized key authorities, and leave indelible forensic artifacts in metadata, voice recordings, and local device caches.

In this sovereign privacy suite, the FastAPI backend acts strictly as a Zero-Knowledge Blind Relay. Key generation, authenticated AES-256-GCM encryption with Associated Authenticated Data (`room:ID`), and ephemeral ECDH key exchange occur in volatile browser RAM using the native WebCrypto API.

The platform provides a comprehensive tactical anti-surveillance arsenal: biometric voice scrambling to defeat acoustic profiling, deep EXIF/GPS metadata stripping on images, 7-second self-destructing View-Once photos, LSB steganography in PNG carriers, Bitcoin BIP-39 standard 24-word recovery passphrases, 30-second self-scrubbing clipboard, periodic decoy traffic generation, Tor network support, and a dedicated **Duress Mode** that deploys an innocent university study group chat if the user is physically coerced into revealing the screen. Furthermore, the native Android application implements `FLAG_SECURE` at the OS kernel level to block hardware screenshots and malware recorders.
