---
phase: 03-animation-layer
plan: 02
subsystem: ui
tags: [gsap, scrolltrigger, motion, parallax, scroll-reveal, page-transition]

requires:
  - phase: 03-animation-layer/01
    provides: GSAP config, useAnimationTier, SmokeParticles, neon-hover effects
  - phase: 02-content-sections-gallery
    provides: About, Services, Contact, GalleryGrid, Hero sections
provides:
  - ScrollReveal component for GSAP-based scroll-triggered entrance animations
  - PageTransition component with FrozenRouter for page fade transitions
  - HeroParallax component for desktop-only parallax on hero background
  - ServiceCard hover effects with motion.div (translateY + shadow)
affects: [04-deploy]

tech-stack:
  added: []
  patterns: [ScrollReveal wrapper pattern, FrozenRouter for AnimatePresence, null-render GSAP effect component]

key-files:
  created:
    - src/components/animations/ScrollReveal.tsx
    - src/components/animations/PageTransition.tsx
    - src/components/animations/HeroParallax.tsx
  modified:
    - src/components/sections/About.tsx
    - src/components/sections/Services.tsx
    - src/components/sections/Contact.tsx
    - src/components/gallery/GalleryGrid.tsx
    - src/components/sections/Hero.tsx
    - src/components/sections/ServiceCard.tsx
    - src/app/layout.tsx

key-decisions:
  - "About, Services, Contact converted to client components for ScrollReveal integration"
  - "HeroParallax renders null -- pure GSAP effect via class selectors, Hero stays server component"
  - "ServiceCard hover: translateY -3px + shadow deepening, no neon glow per user decision"
  - "FrozenRouter pattern with LayoutRouterContext for clean exit animations in Next.js 16"

patterns-established:
  - "ScrollReveal wrapper: stagger={true} + scroll-reveal-item class for child stagger"
  - "Null-render effect component: client component returns null, applies GSAP to class selectors"

requirements-completed: [ANIM-02, ANIM-03, ANIM-05, ANIM-06]

duration: 4min
completed: 2026-04-01
---

# Phase 3 Plan 2: Scroll Reveals, Parallax, Hover Effects and Page Transitions Summary

**GSAP ScrollTrigger scroll reveals on all sections, hero parallax with scrub, ServiceCard motion hover, and AnimatePresence page transitions with FrozenRouter**

## Performance

- **Duration:** 4 min
- **Started:** 2026-04-01T18:11:42Z
- **Completed:** 2026-04-01T18:15:33Z
- **Tasks:** 2
- **Files modified:** 10

## Accomplishments
- ScrollReveal wrapper with tier-aware GSAP ScrollTrigger (top 80%, stagger 0.12s) applied to About, Services, Contact, GalleryGrid
- HeroParallax: desktop-only GSAP parallax (yPercent -15, scrub 0.5) on hero background image
- ServiceCard: motion.div whileHover with y:-3 + boxShadow deepening, respects animation tier
- PageTransition with AnimatePresence mode="wait" + FrozenRouter for fade out/in between pages

## Task Commits

Each task was committed atomically:

1. **Task 1: Create ScrollReveal and PageTransition, apply scroll reveals to sections** - `e6defe8` (feat)
2. **Task 2: Add Hero parallax, ServiceCard hover, wire PageTransition in layout** - `87cfb91` (feat)

## Files Created/Modified
- `src/components/animations/ScrollReveal.tsx` - Reusable GSAP ScrollTrigger wrapper with stagger support
- `src/components/animations/PageTransition.tsx` - AnimatePresence + FrozenRouter for page transitions
- `src/components/animations/HeroParallax.tsx` - Null-render GSAP parallax effect for hero background
- `src/components/sections/About.tsx` - Converted to client, wrapped with ScrollReveal
- `src/components/sections/Services.tsx` - Converted to client, ScrollReveal with stagger
- `src/components/sections/Contact.tsx` - Converted to client, wrapped with ScrollReveal
- `src/components/gallery/GalleryGrid.tsx` - Masonry grid wrapped with ScrollReveal stagger
- `src/components/sections/Hero.tsx` - Added HeroParallax component
- `src/components/sections/ServiceCard.tsx` - Converted to client, motion.div whileHover
- `src/app/layout.tsx` - PageTransition wrapping children in main

## Decisions Made
- About, Services, Contact converted from server to client components for ScrollReveal integration (simplest correct pattern)
- Hero stays server component; HeroParallax is a separate null-render client component using class selectors
- ServiceCard hover uses translateY + shadow only, no neon glow per user decision
- LayoutRouterContext available in Next.js 16.2.2, FrozenRouter pattern works as planned

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- All animation layer components complete (Plan 01 + Plan 02)
- Three-tier animation system fully integrated: full (desktop parallax + all), reduced (scroll reveals only), none (instant visibility)
- Ready for Phase 04 deploy

## Self-Check: PASSED

- All 10 files verified present on disk
- Commit e6defe8 verified in git log
- Commit 87cfb91 verified in git log
- npm run build passes with exit code 0

---
*Phase: 03-animation-layer*
*Completed: 2026-04-01*
