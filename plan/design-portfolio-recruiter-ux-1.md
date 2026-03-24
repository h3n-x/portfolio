---
goal: Portfolio uplift plan for recruiter-first UX, accessibility, and performance
version: 1.0
date_created: 2026-03-23
last_updated: 2026-03-23
owner: Henry Pacheco (H3n)
status: Planned
tags: [design, feature, refactor, accessibility, performance, ux]
---

# Introduction

![Status: Planned](https://img.shields.io/badge/status-Planned-blue)

Implementation plan to elevate the portfolio to international premium quality while preserving current content, stack, and bilingual support. Prioritization is strictly recruiter-impact first, then performance/accessibility risk reduction, then visual/detail polish.

## 1. Requirements & Constraints

- **REQ-001**: Resolve all high-priority accessibility issues identified in audit before visual polish tasks.
- **REQ-002**: Preserve all existing textual content semantics and meaning in ES/EN.
- **REQ-003**: Keep React + Vite + Tailwind + Framer Motion stack unchanged.
- **REQ-004**: Ensure all key recruiter flows are frictionless: landing comprehension, project trust, credential validation, clear contact action.
- **REQ-005**: Keep bilingual behavior functional and consistent for UI states and fallbacks.
- **SEC-001**: Avoid introducing insecure external behaviors (unsafe links, unsafe HTML insertion, hardcoded secrets).
- **CON-001**: Do not remove existing sections (Hero, Sobre Mi, Proyectos, Experiencia, Formacion).
- **CON-002**: Respect `prefers-reduced-motion` in both CSS and JavaScript-driven motion.
- **CON-003**: Changes must improve recruiter perception and not degrade current UX.
- **GUD-001**: Prefer native semantic elements over custom ARIA patterns when possible.
- **GUD-002**: Standardize interaction styling through CSS classes/tokens; minimize inline style mutations.
- **PAT-001**: Implement changes incrementally with verification after each phase.

## 2. Implementation Steps

### Implementation Phase 1

- **GOAL-001**: Fix recruiter-trust and accessibility blockers that can cause immediate rejection.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-001 | Refactor `src/components/ScrollProgress.jsx` to remove interactive controls from `aria-hidden` containers and expose proper accessible name/role/value. |  |  |
| TASK-002 | Enforce reduced motion in JS: gate Lenis and smooth-scroll behaviors in `src/App.jsx`, `src/components/Header.jsx`, and `src/components/ScrollProgress.jsx` using `matchMedia('(prefers-reduced-motion: reduce)')`. |  |  |
| TASK-003 | Replace non-native interactive card pattern in `src/components/Proyectos.jsx` with semantic button/link behavior that supports Enter and Space consistently. |  |  |
| TASK-004 | Localize image loading/error strings in `src/components/OptimizedImage.jsx` through translation keys and remove hardcoded single-language UX text. |  |  |
| TASK-005 | Verify certificate access strategy in `src/components/Formacion.jsx` (open/public links with reliable recruiter access messaging and fallback behavior). |  |  |

### Implementation Phase 2

- **GOAL-002**: Raise technical quality baseline and maintainability for premium-level review.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-006 | Resolve lint errors in `scripts/generate-certificates.js`, `scripts/generate-images.js`, and `src/components/OptimizedImage.jsx` while preserving behavior. |  |  |
| TASK-007 | Remove redundant image semantics in `src/components/OptimizedImage.jsx` (`role="img"` wrapper + inner `img`) and keep single clean semantic path. |  |  |
| TASK-008 | Consolidate repeated inline hover/focus mutations into CSS utility/component classes in `src/index.css`, `src/App.jsx`, `src/components/Header.jsx`, and `src/LanguageToggle.jsx`. |  |  |
| TASK-009 | Normalize metadata consistency in `index.html` (canonical/live domain strategy, title clarity, and realistic security-header handling scope). |  |  |

### Implementation Phase 3

- **GOAL-003**: Premium UI/UX refinement focused on recruiter scanability and conversion.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-010 | Improve recruiter-first hierarchy in `src/components/Hero.jsx` and footer CTA flow in `src/App.jsx` without changing core content meaning. |  |  |
| TASK-011 | Improve project card readability and interaction predictability in `src/components/Proyectos.jsx` for mobile and keyboard users. |  |  |
| TASK-012 | Tune animation pacing and visual density in `src/index.css` and motion variants across sections to maintain premium feel with lower cognitive load. |  |  |

### Implementation Phase 4

- **GOAL-004**: Verify stability, compliance, and delivery quality.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-013 | Run validation suite: `npm run lint`, `npm run build`, and runtime smoke checks for navigation, modal, links, and language toggle. |  |  |
| TASK-014 | Run final accessibility pass against WCAG AA checklist (landmarks, headings, focus visibility, labels, reduced motion, reflow 320px, modal behavior). |  |  |
| TASK-015 | Produce a user-facing changelog of all modifications and rationale. |  |  |

## 3. Alternatives

- **ALT-001**: Full visual redesign from scratch. Rejected due to high risk of content/brand drift and larger regression surface.
- **ALT-002**: Performance-only optimization first. Rejected because recruiter trust/accessibility blockers have higher business impact.
- **ALT-003**: Keep current inline-style approach for speed. Rejected due to maintainability and consistency debt.

## 4. Dependencies

- **DEP-001**: Existing project dependencies in `package.json` (React, Framer Motion, Tailwind, Vite).
- **DEP-002**: Existing translation architecture in `src/translations/`.
- **DEP-003**: Existing image and static assets in `public/`.

## 5. Files

- **FILE-001**: `index.html`
- **FILE-002**: `src/App.jsx`
- **FILE-003**: `src/index.css`
- **FILE-004**: `src/components/Header.jsx`
- **FILE-005**: `src/components/Hero.jsx`
- **FILE-006**: `src/components/Proyectos.jsx`
- **FILE-007**: `src/components/Formacion.jsx`
- **FILE-008**: `src/components/Experiencia.jsx`
- **FILE-009**: `src/components/ScrollProgress.jsx`
- **FILE-010**: `src/components/OptimizedImage.jsx`
- **FILE-011**: `src/LanguageToggle.jsx`
- **FILE-012**: `src/translations/es.js`
- **FILE-013**: `src/translations/en.js`
- **FILE-014**: `scripts/generate-images.js`
- **FILE-015**: `scripts/generate-certificates.js`

## 6. Testing

- **TEST-001**: Keyboard-only navigation across header, project cards, modal open/close, and back-to-top controls.
- **TEST-002**: Language toggle consistency for all strings touched by changes.
- **TEST-003**: Reduced-motion validation with OS/browser setting enabled.
- **TEST-004**: Responsive checks at 375px, 768px, 1280px, 1920px including no horizontal overflow for text content.
- **TEST-005**: Link integrity checks for project demos, repositories, and certificates.
- **TEST-006**: Regression checks for lazy-loaded sections and modal focus trap.

## 7. Risks & Assumptions

- **RISK-001**: External certificate links may remain unstable if third-party permissions change.
- **RISK-002**: Motion reductions may alter perceived premium feel; requires calibrated fallback styles.
- **RISK-003**: Refactoring inline styles to classes can create minor visual regressions.
- **ASSUMPTION-001**: Existing content wording must remain semantically unchanged.
- **ASSUMPTION-002**: Netlify deployment behavior remains unchanged for static hosting.

## 8. Related Specifications / Further Reading

- `spec/spec-design-portfolio-recruiter-premium-1.md`
- WCAG 2.2 Level AA (reference for validation criteria)
