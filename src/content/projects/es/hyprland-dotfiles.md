---
title: "Hyprland Dotfiles"
tagline: "Un escritorio Hyprland completo donde cada color sale del wallpaper, con shell propia en QML e instalador para varias distros"
description: "Arch Linux + Hyprland (config en Lua) + una shell escrita desde cero en Quickshell (QML). Un wallpaper genera una paleta Material You que matugen aplica a ~20 apps, a las pantallas de bloqueo e inicio de sesión, al splash de arranque y al menú de GRUB, con un instalador modular probado en seis distribuciones basadas en Arch."
role: "Autor y mantenedor"
status: "Instalador probado en 6 distros · EN / ES / JA"
technologies:
  - "Quickshell (QML)"
  - "Hyprland (Lua)"
  - "matugen"
  - "Bash"
  - "Python"
  - "GNU Stow"
  - "Docker (matriz de pruebas)"
githubUrl: "https://github.com/h3n-x/hyprland-dotfiles"
featured: true
order: 6
category: "Escritorio Linux y Theming"
areas: ["linux"]
problemSolved: "Los rices de escritorio suelen fijar un único esquema de colores y una única máquina: al cambiar el wallpaper, las apps, la terminal y las pantallas de arranque quedan desincronizadas, e instalarlos en otro equipo falla con otra GPU, otro init o otro gestor de arranque."
architectureHighlights:
  - "Pipeline de theming guiado por el wallpaper: un worker con cola (gana la última elección) genera colores de estado fijos y una paleta de código con el contraste resuelto, y matugen recolorea ~20 apps en vivo en un segundo; un pase del sistema diferido aplica el tema a SDDM, Plymouth y GRUB mediante scripts de root con reglas sudoers acotadas."
  - "Una shell escrita desde cero en QML: barra, dashboard, centro de control, lanzador, notificaciones, galería de wallpapers con opciones de color por imagen, pantalla de bloqueo supervisada que se recupera sola y un centro de configuración con buscador."
  - "Instalador modular para cualquier distribución basada en Arch: perfiles, listas de paquetes como datos, manejo de conflictos, AUR con yay o paru, servicios para systemd y OpenRC/runit/dinit/s6 de Artix, stow con respaldos y una desinstalación que los devuelve."
  - "Pasos de sistema opcionales que detectan antes de actuar: hooks del initramfs para mkinitcpio o dracut y la línea de comandos del kernel para UKI, systemd-boot, GRUB, Limine o rEFInd, probados en siete disposiciones de arranque en contenedores."
keyLearnings:
  - "Diseñar un sistema de color que se adapta a cualquier imagen manteniendo fijos y legibles los colores de estado, validado por un lint que debe quedar en cero fallos."
  - "Probar un instalador de forma reproducible: matrices de contenedores para seis distribuciones y árboles de arranque falsos en lugar de la máquina real."
  - "Construir una shell QML eficiente: nada consulta mientras está cerrado, animaciones solo con cambios reales, servicios que arrancan a pedido."
---

Hyprland Dotfiles convierte un solo wallpaper en un escritorio completo y coherente. La paleta es Material You, generada a partir de la imagen: una foto tranquila da un escritorio tranquilo, mientras los avisos, errores y éxitos mantienen colores fijos y legibles.

La shell está escrita desde cero en QML con Quickshell, y cada opción se ajusta desde un centro de configuración sin tocar un archivo. Toda la interfaz está en inglés, español y japonés, y se cambia en vivo, de la barra al menú de arranque.
