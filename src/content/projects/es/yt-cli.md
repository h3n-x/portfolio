---
title: "yt-cli"
tagline: "Descargador de YouTube y YouTube Music para Linux con una UX al estilo git/uv/cargo/gh y errores que se explican solos"
description: "Un descargador de línea de comandos sobre la API Python de yt-dlp: video, audio, playlists, álbumes de YouTube Music, canales y lotes concurrentes, con buenos valores por defecto, perfiles TOML validados, un archivo de descargas para sincronizar playlists y errores de yt-dlp traducidos a una causa y una acción. Empaquetado para Arch Linux."
role: "Autor y mantenedor"
status: "v0.4.0 beta · 218 tests · PKGBUILD para Arch"
technologies:
  - "Python 3.13"
  - "yt-dlp (API Python)"
  - "Typer y Rich"
  - "Pydantic v2"
  - "Pytest e Hypothesis"
  - "mypy y Ruff"
  - "PKGBUILD"
githubUrl: "https://github.com/h3n-x/yt-cli"
featured: true
order: 7
category: "Herramientas CLI"
problemSolved: "Usar yt-dlp directamente obliga a memorizar decenas de flags, un solo video no disponible puede abortar una playlist entera y los errores crudos no dicen qué hacer. Sincronizar una biblioteca de música o un canal vuelve a bajar lo que ya tienes."
architectureHighlights:
  - "Arquitectura en capas: una CLI con Typer + Rich sobre servicios de descarga, cola, historial y cache, encima de un núcleo que habla con yt-dlp por su API Python en lugar de invocar la shell."
  - "Descargas conscientes de colecciones: el alcance (video, playlist o canal) se deduce de la URL, las entradas que fallan nunca detienen el resto y un resumen final dice qué falló y por qué, con códigos de salida propios para el éxito parcial."
  - "Traducción de errores: los fallos de yt-dlp se convierten en una causa y una acción concreta, y un comando doctor comprueba ffmpeg, el runtime JavaScript que YouTube exige, mutagen y la antigüedad de yt-dlp."
  - "Configuración validada: TOML tipado con Pydantic y perfiles con nombre, archivo con permisos 0600, plantillas de nombre que ningún título puede romper y opciones de yt-dlp que pasan directo."
keyLearnings:
  - "Diseñar una CLI que se sienta como git, uv o cargo: subcomandos coherentes, salida --json, soporte de NO_COLOR, autocompletado y página de manual."
  - "Hacer una auditoría basada en descargas reales y convertir sus hallazgos en pruebas de regresión (pruebas de propiedades con Hypothesis)."
  - "Empaquetar software Python de forma nativa para Arch Linux con un PKGBUILD y reglas seguras de autoactualización."
---

yt-cli envuelve a yt-dlp en una CLI pensada para el uso diario: pon la URL entre comillas, elige video o audio, y resuelve solo playlists, álbumes y canales.

La versión 0.4.0 salió de una auditoría técnica basada en ejecuciones reales, motivada por una playlist de YouTube Music que no se podía descargar; cada hallazgo está corregido y cubierto por pruebas.
