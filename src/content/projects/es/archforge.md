---
title: "ArchForge"
tagline: "Toolkit modular de post-instalación y endurecimiento para Arch Linux"
description: "Sistema integral desarrollado en Bash para automatizar la configuración de un sistema operativo Arch Linux recién instalado, eliminando errores humanos y estandarizando entornos seguros en minutos."
role: "Autor y Mantenedor del Toolkit"
status: "v0.3.0 · Mantenimiento y Versionado Activo"
technologies:
  - "Bash"
  - "Arch Linux"
  - "systemd"
  - "nftables"
  - "Linux CLI"
  - "Git"
githubUrl: "https://github.com/h3n-x/archforge"
featured: true
order: 1
category: "Sistemas & Automatización"
problemSolved: "Configurar un entorno Arch Linux desde cero suele tomar horas de comandos manuales repetitivos y es propenso a desajustes de configuración (drift), errores en reglas de red/firewall y olvidos en la habilitación de servicios de energía y seguridad."
architectureHighlights:
  - "Estructura modular por dominios: módulos aislados para seguridad, red, energía, gráficos y herramientas esenciales."
  - "Modo dry-run seguro: permite simular la ejecución e inspeccionar los comandos antes de alterar el sistema host."
  - "Backups automatizados por sesión: resguardo preventivo de dotfiles y archivos de configuración en /etc antes de cualquier modificación."
  - "Registro y manejo de errores consistente: logs detallados de ejecución con códigos de salida normalizados."
keyLearnings:
  - "Diseño de scripts de shell idempotentes que pueden ejecutarse múltiples veces sin corromper el estado del sistema."
  - "Profundización en la arquitectura de servicios de systemd, gestión de daemons y reglas de filtrado con nftables."
  - "Importancia del versionado semántico riguroso y documentación de cambios (CHANGELOG) en proyectos de infraestructura."
---

ArchForge nació de una necesidad cotidiana en el trabajo con sistemas Linux: la falta de predictibilidad y el tiempo excesivo invertido en poner a punto máquinas de desarrollo.

En lugar de depender de scripts monolíticos frágiles, ArchForge organiza las tareas en módulos independientes que pueden ejecutarse de forma selectiva o secuencial, permitiendo al usuario auditar cada paso antes de aplicar cambios destructivos en el disco.
