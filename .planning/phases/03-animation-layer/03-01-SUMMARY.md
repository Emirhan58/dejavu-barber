---
phase: 03-animation-layer
plan: 01
subsystem: ui
tags: [gsap, css-animations, neon-glow, intro-overlay, smoke-particles]

requires:
  - phase: 01-foundation
    provides: "GSAP config, useAnimationTier hook, design tokens"
  - phase: 02-content-sections-gallery
    provides: "Hero, Navbar, page.tsx layout"
provides:
  - "IntroOverlay component with DEJAVU neon intro sequence"
  - "SmokeParticles component with CSS smoke-rise animation"
  - "neon-hover-glow and neon-hover-glow-svg CSS classes"
  - "hero-section and hero-bg-image classes for parallax targeting"
affects: [03-animation-layer]

tech-stack:
  added: []
  patterns: ["sessionStorage gate for one-time intro", "useAnimationTier tier gate for conditional rendering", "CSS-only particle effects with deterministic values"]

key-files:
  created:
    - src/components/animations/IntroOverlay.tsx
    - src/components/animations/SmokeParticles.tsx
  modified:
    - src/app/globals.css
    - src/app/page.tsx
    - src/components/sections/Hero.tsx
    - src/components/layout/Navbar.tsx

key-decisions:
  - "Intro plays on both full and reduced tiers, only skipped on prefers-reduced-motion (none)"
  - "SmokeParticles uses deterministic i-based math instead of Math.random() to avoid hydration mismatches"
  - "Logo SVG hover uses filter drop-shadow (neon-hover-glow-svg) since text-shadow does not work on SVG"

patterns-established:
  - "sessionStorage gate: check key before showing one-time animations"
  - "tier-conditional rendering: return null for unsupported tiers"
  - "neon-hover-glow-svg class for SVG elements needing hover glow"

requirements-completed: [ANIM-01, ANIM-04, ANIM-05, ANIM-06]

duration: 2min
completed: 2026-04-01
---

# Phase 03 Plan 01: Intro, Smoke & Neon Glow Summary

**DEJAVU neon intro overlay with GSAP letter-by-letter reveal, CSS smoke particles for hero atmosphere, and neon-hover-glow classes for interactive elements**

## Performance

- **Duration:** 2 min
- **Started:** 2026-04-01T18:11:43Z
- **Completed:** 2026-04-01T18:14:00Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- IntroOverlay with GSAP timeline: shuffled letter reveal, glow pulse, slogan fade, curtain-up exit, skip-on-click, sessionStorage gate
- SmokeParticles with 10 CSS-animated particles, desktop-only via tier gate, zero DOM on mobile
- neon-hover-glow (text-shadow) and neon-hover-glow-svg (filter drop-shadow) utility classes
- Hero and Navbar interactive elements wired with hover glow effects
- hero-section and hero-bg-image classes added for Plan 02 parallax targeting

## Task Commits

Each task was committed atomically:

1. **Task 1: Create IntroOverlay, SmokeParticles components and CSS foundations** - `198836c` (feat)
2. **Task 2: Wire IntroOverlay into page, SmokeParticles into Hero, apply neon-hover-glow** - `3d90fa6` (feat)

## Files Created/Modified
- `src/components/animations/IntroOverlay.tsx` - GSAP neon intro with sessionStorage gate and tier check
- `src/components/animations/SmokeParticles.tsx` - CSS smoke particles, desktop-only via useAnimationTier
- `src/app/globals.css` - smoke-rise keyframes, smoke-particle class, neon-hover-glow and neon-hover-glow-svg
- `src/app/page.tsx` - Wrapped page content with IntroOverlay
- `src/components/sections/Hero.tsx` - Added SmokeParticles, neon-hover-glow on CTA, neon-hover-glow-svg on Logo
- `src/components/layout/Navbar.tsx` - Added neon-hover-glow to desktop logo link and CTA button

## Decisions Made
- Intro plays on both "full" and "reduced" tiers (desktop and mobile), only "none" (prefers-reduced-motion) skips
- Used deterministic i-based math for SmokeParticles styles to avoid SSR hydration mismatches
- Used filter drop-shadow (neon-hover-glow-svg) for Logo SVG since text-shadow does not work on SVG elements

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- IntroOverlay and SmokeParticles ready for visual verification
- hero-section and hero-bg-image classes in place for Plan 02 parallax implementation
- neon-hover-glow classes available for any future interactive elements

---
*Phase: 03-animation-layer*
*Completed: 2026-04-01*
