---
title: "Hyprland Dotfiles"
tagline: "A complete Hyprland desktop where every color comes from the wallpaper, with its own QML shell and a cross-distro installer"
description: "Arch Linux + Hyprland (Lua config) + a shell written from scratch in Quickshell (QML). One wallpaper drives a Material You palette rendered by matugen into ~20 apps, the lock and login screens, the boot splash and the GRUB menu, with a modular installer tested on six Arch-based distributions."
role: "Author & Maintainer"
status: "Installer tested on 6 distros · EN / ES / JA"
technologies:
  - "Quickshell (QML)"
  - "Hyprland (Lua)"
  - "matugen"
  - "Bash"
  - "Python"
  - "GNU Stow"
  - "Docker (test matrix)"
githubUrl: "https://github.com/h3n-x/hyprland-dotfiles"
featured: true
order: 6
category: "Linux Desktop & Theming"
problemSolved: "Desktop rices usually hardcode one color scheme and one machine: changing the wallpaper leaves apps, terminals and boot screens out of sync, and installing them elsewhere breaks on a different GPU, init system or bootloader."
architectureHighlights:
  - "Wallpaper-driven theming pipeline: a queued theme-apply worker (latest pick wins) generates fixed status colors and a contrast-solved code palette, then matugen recolors ~20 live apps in about a second; a debounced system pass themes SDDM, Plymouth and GRUB through root-owned sync scripts with narrowly scoped sudoers rules."
  - "A shell written from scratch in QML: bar, dashboard, control center, launcher, notifications, wallpaper gallery with per-wallpaper color options, a supervised lock screen with crash recovery and a searchable settings center."
  - "Modular installer for any Arch-based distribution: profiles, package lists as data, conflict handling, AUR via yay or paru, services for systemd and Artix's OpenRC/runit/dinit/s6, stow with backups and an uninstall that restores them."
  - "Optional system steps that detect before acting: initramfs hooks for mkinitcpio or dracut and the kernel command line for UKI, systemd-boot, GRUB, Limine or rEFInd, tested across seven boot layouts in containers."
keyLearnings:
  - "Designing a color system that adapts to any image while keeping status colors fixed and readable, validated by a lint that must stay at zero failures."
  - "Testing an installer reproducibly: container matrices for six distributions and fake boot trees instead of the real machine."
  - "Building a performant QML shell: nothing polls while closed, animations only on real changes, services started on demand."
---

Hyprland Dotfiles turns a single wallpaper into a complete, coherent desktop. The palette is Material You, generated from the image, so a calm photo gives a calm desktop while warnings, errors and success keep fixed, readable colors.

The shell is written from scratch in QML with Quickshell, and every option is configurable from a settings center without touching a file. The whole interface is available in English, Spanish and Japanese, switched live, from the bar to the boot menu.
