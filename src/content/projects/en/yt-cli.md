---
title: "yt-cli"
tagline: "YouTube and YouTube Music downloader for Linux with a git/uv/cargo/gh-style UX and errors that explain themselves"
description: "A command-line downloader built on yt-dlp's Python API: video, audio, playlists, YouTube Music albums, channels and concurrent batches, with good defaults, validated TOML profiles, a download archive to sync playlists and yt-dlp errors translated into a cause and an action. Packaged for Arch Linux."
role: "Author & Maintainer"
status: "v0.4.0 beta · 218 tests · Arch PKGBUILD"
technologies:
  - "Python 3.13"
  - "yt-dlp (Python API)"
  - "Typer & Rich"
  - "Pydantic v2"
  - "Pytest & Hypothesis"
  - "mypy & Ruff"
  - "PKGBUILD"
githubUrl: "https://github.com/h3n-x/yt-cli"
featured: false
order: 7
category: "CLI Tools"
areas: ["linux"]
problemSolved: "Using yt-dlp directly means memorizing dozens of flags, and one unavailable video can abort a whole playlist while the raw errors give no hint of what to do. Syncing a music library or downloading a channel repeatedly downloads what you already have."
architectureHighlights:
  - "Layered architecture: a Typer + Rich CLI over download, queue, history and cache services, on top of a downloader core that talks to yt-dlp through its Python API instead of shelling out."
  - "Collection-aware downloads: the scope (video, playlist or channel) is deduced from the URL, failed entries never stop the rest, and a final summary lists what failed and why, with dedicated exit codes for partial success."
  - "Error translation: yt-dlp failures are mapped to a cause and a concrete action, and a doctor command checks ffmpeg, the JavaScript runtime YouTube requires, mutagen and yt-dlp's age."
  - "Validated configuration: Pydantic-typed TOML with named profiles, a 0600 config file, filename templates that can't be broken by titles, and pass-through yt-dlp options."
keyLearnings:
  - "Designing a CLI that feels like git, uv or cargo: consistent subcommands, --json output, NO_COLOR support, shell completions and a man page."
  - "Running an evidence-based audit against real downloads and turning its findings into regression tests (property-based tests with Hypothesis)."
  - "Packaging Python software natively for Arch Linux with a PKGBUILD and safe self-update rules."
---

yt-cli wraps yt-dlp in a CLI built for daily use: quote the URL, choose video or audio, and it handles playlists, albums and channels on its own.

Version 0.4.0 came out of a technical audit based on real runs, triggered by a YouTube Music playlist that failed to download; every finding is fixed and covered by tests.
