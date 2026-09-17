---
title: "ArchForge"
tagline: "Modular post-installation & hardening toolkit for Arch Linux"
description: "A comprehensive CLI system built in Bash to automate the setup of a fresh Arch Linux system, eliminating manual configuration errors and standardizing secure environments in minutes."
role: "Toolkit Author & Maintainer"
status: "v0.3.0 · Active Maintenance & Semantic Releases"
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
category: "Systems & Automation"
problemSolved: "Setting up a clean Arch Linux workstation manually takes hours of error-prone configuration steps, frequently leading to environment drift, insecure firewall presets, and forgotten system daemons."
architectureHighlights:
  - "Domain-driven modularity: decoupled modules for system security, networking, power management, graphics, and core CLI utilities."
  - "Safe dry-run execution: inspect commands and planned operations prior to applying any changes to the host operating system."
  - "Session-based automatic backups: safeguards existing dotfiles and /etc configuration files before altering files."
  - "Predictable logging & error handling: standardized exit codes and audit trails for reliable operations."
keyLearnings:
  - "Idempotent shell scripting patterns designed to run repeatedly without mutating valid system state."
  - "In-depth systemd service orchestration, daemon supervision, and firewall rule syntax with nftables."
  - "Enforcing disciplined semantic versioning and detailed changelogs for systems tooling."
---

ArchForge was created to address a direct pain point in Linux systems engineering: eliminating manual variance and operational drift when preparing developer workstations.

Rather than relying on brittle, monolithic install scripts, ArchForge organizes configuration recipes into discrete, auditable modules that can be executed selectively or sequentially with confidence.
