---
title: "DockerWard"
tagline: "Runtime container security auditing engine for Docker with native SARIF 2.1.0 reporting"
description: "A Python-based CLI and security posture inspector auditing live Docker containers against CIS Docker Benchmark v1.6.0, verifying cgroup ceilings, kernel capabilities, daemon socket mounts, and seccomp filters."
role: "Tool Author & Developer"
status: "v0.1.0 · 71 Tests (100% rules cov) · Active Release"
technologies:
  - "Python 3.12+"
  - "Docker Engine API"
  - "Linux Kernel"
  - "SARIF 2.1.0"
  - "Pydantic v2"
  - "Rich CLI"
  - "Pytest"
githubUrl: "https://github.com/h3n-x/DockerWard"
featured: true
order: 3
category: "Containers & Runtime"
problemSolved: "Static image scanners (such as Trivy or Grype) detect package CVEs at build time but remain completely blind to runtime execution: a vulnerability-free image becomes an immediate host compromise vector if executed with --privileged, a bind-mounted Docker socket, unconstrained cgroups, or disabled seccomp syscall filters."
architectureHighlights:
  - "Decoupled Docker Engine API collector: streams runtime telemetry over Unix domain sockets into typed Pydantic v2 models without shell wrapping or CLI subprocess dependencies."
  - "Modular CIS policy engine: evaluates 6 core rules featuring dynamic severity (differentiating read-write vs read-only socket exposure) and granular findings for memory, CPU, and PIDs."
  - "Compliant OASIS SARIF v2.1.0 exporter: integrates runtime findings directly into GitHub Security / Code Scanning dashboards complete with CVSS scores, technical impact, and remediation steps."
  - "CI/CD quality gate enforcement: configurable --fail-on flag returning standardized exit codes to fail builds or deployment pipelines upon detecting CRITICAL or HIGH misconfigurations."
keyLearnings:
  - "Deep practical mastery of Linux kernel isolation primitives: unmapped user namespaces (UID 0 host inheritance), cgroups v1/v2 ceilings (mitigating OOM kills and fork-bomb denial-of-service via pids.max), capability bounding sets, and seccomp BPF syscall firewalls."
  - "Disciplined automated security testing: 71 unit and integration tests delivering 100% coverage on rules, backed by a reproducible 3-container testbed (privileged, exposed, and hardened control)."
  - "Translating low-level container runtime state into multi-format developer tooling (Rich terminal tables, machine-readable JSON, and enterprise SARIF)."
---

DockerWard was built to address the most critical visibility gap in modern container security: the discrepancy between static image artifacts and live production runtime execution.

By introspecting the Docker daemon API directly over local Unix sockets, DockerWard extracts live process security postures and validates them against CIS Docker Benchmark standards. Its flexible reporting engine enables operators to triage vulnerabilities via rich terminal tables while seamlessly enforcing security gates in GitHub Actions using standard SARIF 2.1.0 artifacts.
