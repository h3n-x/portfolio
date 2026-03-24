---
title: Portfolio Recruiter-First Premium Experience Specification
version: 1.0
date_created: 2026-03-23
last_updated: 2026-03-23
owner: Henry Pacheco (H3n)
tags: [design, app, accessibility, performance, ux, architecture]
---

# Introduction

This specification defines the required behavior, constraints, and acceptance criteria to upgrade the portfolio into a recruiter-first, premium-grade experience while preserving current content, stack, and bilingual support.

## 1. Purpose & Scope

Purpose:
- Convert audit findings into explicit implementation requirements for UI/UX, accessibility, performance, and code quality.

Scope:
- Frontend application files in `index.html`, `src/`, and script quality baseline in `scripts/`.
- Behavior-level and experience-level improvements only; no content strategy rewrite and no stack migration.

Audience:
- Engineers implementing improvements and AI agents executing implementation tasks.

Assumptions:
- Existing project sections and content meaning must remain intact.
- Existing deployment target remains Netlify.

## 2. Definitions

- **Recruiter-first UX**: Interaction and content presentation optimized for first-pass evaluation by hiring teams.
- **WCAG AA**: Web Content Accessibility Guidelines Level AA conformance target.
- **Reduced Motion**: User preference from OS/browser indicating minimized animations.
- **Semantic interactive control**: Native interactive element (`button`, `a`, form control) with predictable keyboard behavior.
- **Premium UI**: High visual quality with deliberate hierarchy, spacing, contrast, and motion quality without accessibility tradeoffs.

## 3. Requirements, Constraints & Guidelines

- **REQ-001**: All controls must be operable by keyboard with visible focus indication.
- **REQ-002**: No interactive element shall be inside an `aria-hidden="true"` subtree.
- **REQ-003**: Reduced motion preference must disable or simplify JS-driven animations and smooth scrolling.
- **REQ-004**: ES/EN language parity must be preserved for all user-visible strings introduced or changed.
- **REQ-005**: Project cards and modal triggers must use semantic patterns with native key behavior (Enter + Space where applicable).
- **REQ-006**: Build and lint must pass with no new errors introduced by the upgrade.
- **REQ-007**: External credential links must provide reliable recruiter access path or explicit fallback behavior.
- **SEC-001**: Do not introduce `dangerouslySetInnerHTML` or untrusted HTML rendering.
- **SEC-002**: Preserve safe external linking (`target="_blank"` with `rel="noopener noreferrer"`).
- **CON-001**: Do not alter core textual content intent in ES/EN.
- **CON-002**: Do not replace React/Vite/Tailwind/Framer Motion stack.
- **CON-003**: Maintain current section architecture and routing model (single-page anchors).
- **GUD-001**: Prefer CSS classes/tokens over inline style mutation for hover/focus state management.
- **GUD-002**: Prefer native HTML semantics over ARIA workarounds.
- **PAT-001**: Apply incremental implementation with verification gate after each phase.

## 4. Interfaces & Data Contracts

### 4.1 Translation Contract

| Key | Type | Required | Locale Coverage | Notes |
|-----|------|----------|-----------------|-------|
| `certificateModal.*` | String | Yes | `es`, `en` | Existing contract must remain valid |
| `image.loading` | String | Yes | `es`, `en` | New key for loading state |
| `image.error` | String | Yes | `es`, `en` | New key for image error state |

### 4.2 Motion Preference Contract

| Interface | Input | Output Behavior |
|----------|-------|-----------------|
| `window.matchMedia('(prefers-reduced-motion: reduce)')` | Boolean matches | Disable Lenis smooth-scrolling and reduce animation intensity/duration for JS-controlled interactions |

### 4.3 Accessibility Contract

| Component | Contract |
|-----------|----------|
| `ScrollProgress` | Back-to-top control exposed to AT and keyboard; no parent `aria-hidden` hiding interactive controls |
| `Proyectos` cards | Clickable project trigger implemented as semantic control; keyboard parity with pointer interactions |
| Modal components | Focus trapped while open, Escape closes, focus restored after close, visible close control |

## 5. Acceptance Criteria

- **AC-001**: Given reduced-motion preference is enabled, when the page loads and user navigates anchors, then smooth-scrolling and non-essential motion are disabled/simplified.
- **AC-002**: Given a screen reader user navigates to back-to-top control, when virtual cursor reaches the control, then it is announced and actionable.
- **AC-003**: Given keyboard-only navigation on project cards, when user presses Enter or Space on a card trigger, then project details open consistently.
- **AC-004**: Given language is set to English, when image loading or error placeholders appear, then all related messages are in English.
- **AC-005**: Given lint and build are executed, when pipeline finishes, then no new errors are produced and app compiles successfully.
- **AC-006**: Given recruiter opens certification links from education section, when link is inaccessible, then UI provides explicit fallback path messaging.
- **AC-007**: Given viewport width 320-375px, when user reads multi-line content, then no horizontal page scrolling is required for reading text blocks.

## 6. Test Automation Strategy

- **Test Levels**: Unit (component logic), Integration (interaction flows), End-to-End (critical recruiter journey).
- **Frameworks**: Existing project lint/build tooling + browser automation smoke checks.
- **Test Data Management**: Use deterministic UI state (language toggle, modal open states) without external mutable fixtures.
- **CI/CD Integration**: Ensure `npm run lint` and `npm run build` are mandatory gates before deployment.
- **Coverage Requirements**: Prioritize behavior coverage for accessibility-critical interactions over line coverage targets.
- **Performance Testing**: Verify build artifact size trends and no regressions in first content paint and interaction smoothness.

## 7. Rationale & Context

The audit identified recruiter-facing risk concentration in three areas:
1. Immediate trust blockers (certificate accessibility and accessibility violations).
2. Quality baseline issues (lint failures, semantic interaction inconsistencies).
3. Premium consistency gaps (style system maintainability and motion governance).

Therefore, this specification orders implementation to maximize hiring impact early and reduce regression risk.

## 8. Dependencies & External Integrations

### External Systems
- **EXT-001**: Netlify-hosted portfolio URL for production validation.

### Third-Party Services
- **SVC-001**: External certificate hosting providers (Google Drive, Alura) used for education proofs.

### Infrastructure Dependencies
- **INF-001**: Browser support for `prefers-reduced-motion` media query and JS `matchMedia`.

### Data Dependencies
- **DAT-001**: Localized translation objects (`es.js`, `en.js`) as source of truth for UI copy.

### Technology Platform Dependencies
- **PLT-001**: React + Vite + Tailwind + Framer Motion ecosystem retained as implementation platform.

### Compliance Dependencies
- **COM-001**: WCAG 2.2 AA compliance target for accessible behavior and visual contrast/focus.

## 9. Examples & Edge Cases

```jsx
// Edge case: reduced motion active
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  // Disable smooth scrolling and non-essential motion
}
```

```jsx
// Edge case: semantic trigger for project card
<button type="button" aria-label="View details: Anonymous Chat">
  ...
</button>
```

```text
Edge case: External certificate requires authentication
Expected behavior: Provide clear fallback text and alternate verification path.
```

## 10. Validation Criteria

- Lint passes with no unresolved errors in touched files.
- Build passes and generated output remains deployable.
- Keyboard-only flow is successful for navigation, project exploration, modal open/close, and back-to-top.
- Screen-reader relevant controls are exposed with accessible names.
- Reduced-motion preference is respected in CSS and JS behavior.
- Bilingual UI consistency verified for all new or modified strings.
- No content meaning changes in project, experience, or education sections.

## 11. Related Specifications / Further Reading

- `plan/design-portfolio-recruiter-ux-1.md`
- WCAG 2.2 documentation
