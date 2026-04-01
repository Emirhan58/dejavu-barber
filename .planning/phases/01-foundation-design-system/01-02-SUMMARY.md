---
phase: 01-foundation-design-system
plan: 02
subsystem: ui
tags: [gsap, motion, animation, hooks, react, next.js]

# Dependency graph
requires:
  - phase: 01-01
    provides: design tokens, globals.css, RetroCard, SectionDivider, layout.tsx
provides:
  - GSAP singleton registration (gsap-config.ts)
  - useAnimationTier hook with 3-tier degradation
  - useMediaQuery general-purpose hook
  - AnimationProvider in root layout
  - AnimationDemo proving GSAP + Motion hydration-safe coexistence
affects: [01-03, phase-03-animations]

# Tech tracking
tech-stack:
  added: [gsap, @gsap/react, motion]
  patterns: [GSAP singleton registration, useGSAP scoped container, tier-aware animation, GSAP/Motion element separation]

key-files:
  created:
    - src/lib/gsap-config.ts
    - src/hooks/useAnimationTier.ts
    - src/hooks/useMediaQuery.ts
    - src/components/providers/AnimationProvider.tsx
    - src/components/demo/AnimationDemo.tsx
  modified:
    - src/app/layout.tsx
    - src/app/page.tsx

key-decisions:
  - "GSAP registerPlugin as module-level side effect in gsap-config.ts"
  - "useAnimationTier default 'reduced' (SSR-safe, mobile-first)"
  - "GSAP/Motion separation enforced: class selectors for GSAP, motion.div for Motion, never on same element"

patterns-established:
  - "Pattern: Import from @/lib/gsap-config for all GSAP usage (ensures plugins registered)"
  - "Pattern: useAnimationTier() check before any animation (tier === 'none' skips)"
  - "Pattern: useGSAP with scope container for React-safe GSAP animations"

requirements-completed: [FOUND-03, FOUND-05]

# Metrics
duration: 2min
completed: 2026-04-01
---

# Phase 01 Plan 02: Animation Infrastructure Summary

**GSAP + Motion hydration-safe animation foundation with 3-tier degradation hook (full/reduced/none) and demo component proving element separation**

## Performance

- **Duration:** 2 min
- **Started:** 2026-04-01T12:24:37Z
- **Completed:** 2026-04-01T12:26:19Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments
- GSAP ScrollTrigger + useGSAP registered via singleton module, re-exported for project-wide use
- useAnimationTier hook detects 3 tiers: full (desktop >=768px), reduced (mobile), none (prefers-reduced-motion)
- AnimationDemo proves both GSAP and Motion work without hydration errors, on strictly separate elements
- AnimationProvider wraps root layout ensuring GSAP registration happens once in app lifecycle

## Task Commits

Each task was committed atomically:

1. **Task 1: GSAP config + useAnimationTier hook + AnimationProvider** - `c3cfd35` (feat)
2. **Task 2: GSAP + Motion demo component (hydration test)** - `ee7be09` (feat)

## Files Created/Modified
- `src/lib/gsap-config.ts` - GSAP singleton: registerPlugin(ScrollTrigger, useGSAP), re-exports
- `src/hooks/useAnimationTier.ts` - 3-tier detection: matchMedia 768px + prefers-reduced-motion
- `src/hooks/useMediaQuery.ts` - General matchMedia wrapper with SSR-safe default (false)
- `src/components/providers/AnimationProvider.tsx` - Client wrapper importing gsap-config (side effect)
- `src/components/demo/AnimationDemo.tsx` - GSAP fade-in + Motion hover on separate elements, tier-aware
- `src/app/layout.tsx` - Added AnimationProvider wrapping children
- `src/app/page.tsx` - Added AnimationDemo section

## Decisions Made
- GSAP registration as module-level side effect (import triggers registerPlugin once)
- useAnimationTier defaults to "reduced" (safest SSR default - assumes mobile)
- prefers-reduced-motion has highest priority (overrides desktop to "none")
- GSAP targets elements by CSS class selector (.gsap-fade-item), Motion uses motion.div wrapper - never overlap

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Animation infrastructure ready for 01-03 (Lenis smooth scroll + navbar scroll-spy)
- useAnimationTier hook available for all future animated components
- GSAP/Motion separation pattern established and demonstrated

---
*Phase: 01-foundation-design-system*
*Completed: 2026-04-01*
