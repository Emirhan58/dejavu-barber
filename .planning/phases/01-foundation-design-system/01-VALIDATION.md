---
phase: 01
slug: foundation-design-system
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-01
---

# Phase 01 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest (or jest — Wave 0 installs) |
| **Config file** | none — Wave 0 installs |
| **Quick run command** | `npm test` |
| **Full suite command** | `npm test -- --run` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm test`
- **After every plan wave:** Run `npm test -- --run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 01-01-01 | 01 | 1 | FOUND-01 | smoke | `npm run dev` exits 0, curl localhost:3000 | ❌ W0 | ⬜ pending |
| 01-01-02 | 01 | 1 | FOUND-02 | type-check | `npx tsc --noEmit` exits 0 | ❌ W0 | ⬜ pending |
| 01-02-01 | 02 | 1 | FOUND-03 | unit | `npm test -- useAnimationTier` | ❌ W0 | ⬜ pending |
| 01-02-02 | 02 | 1 | FOUND-04 | unit | `npm test -- gsap-setup` | ❌ W0 | ⬜ pending |
| 01-02-03 | 02 | 1 | FOUND-05 | manual | browser matchMedia toggle | ❌ W0 | ⬜ pending |
| 01-03-01 | 03 | 2 | VISL-01 | visual | `npm run dev` + inspect CSS vars | ❌ W0 | ⬜ pending |
| 01-03-02 | 03 | 2 | VISL-02 | visual | browser inspect neon glow elements | ❌ W0 | ⬜ pending |
| 01-03-03 | 03 | 2 | FOUND-06 | smoke | scroll test with Lenis active | ❌ W0 | ⬜ pending |
| 01-03-04 | 03 | 2 | FOUND-07 | smoke | navbar scroll-spy highlighting | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] Test framework installation (vitest or jest)
- [ ] Basic test config (vitest.config.ts)
- [ ] Stub test files for animation tier hook
- [ ] Stub test files for GSAP registration

*If none: "Existing infrastructure covers all phase requirements."*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Three-tier animation degradation | FOUND-05 | Requires browser matchMedia toggle | 1. Open DevTools 2. Toggle prefers-reduced-motion 3. Verify animations disable |
| Vintage design system visual | VISL-01, VISL-02 | Visual appearance check | 1. Load sample layout 2. Verify dark base, neon accents, texture overlay visible |
| Lenis smooth scroll feel | FOUND-06 | Scroll behavior is subjective | 1. Scroll page on desktop 2. Verify smooth interpolation 3. Verify disabled on mobile |
| Scroll-spy highlighting | FOUND-07 | Requires scroll interaction | 1. Scroll through sections 2. Verify navbar links highlight correctly |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
