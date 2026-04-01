---
phase: 3
slug: animation-layer
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-01
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual visual testing + Lighthouse + `npm run build` |
| **Config file** | none — visual animations are not unit-testable |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npm run start` |
| **Estimated runtime** | ~30 seconds (build) |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npm run start` + visual inspection desktop/mobile
- **Before `/gsd:verify-work`:** Full build + Lighthouse performance check + visual QA both viewports
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 03-01-XX | 01 | 1 | ANIM-01 | manual + build | `npm run build` | ✅ | ⬜ pending |
| 03-01-XX | 01 | 1 | ANIM-06 | manual | `npm run build` | ✅ | ⬜ pending |
| 03-02-XX | 02 | 1 | ANIM-02 | manual + build | `npm run build` | ✅ | ⬜ pending |
| 03-02-XX | 02 | 1 | ANIM-03 | manual | `npm run build` | ✅ | ⬜ pending |
| 03-02-XX | 02 | 1 | ANIM-04 | manual | `npm run build` | ✅ | ⬜ pending |
| 03-02-XX | 02 | 1 | ANIM-05 | manual | `npm run build` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. GSAP, ScrollTrigger, Motion, useAnimationTier, and Lenis already installed and configured in Phase 1.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Intro plays on first visit, skips on second | ANIM-01 | Visual + sessionStorage interaction | Open in incognito, watch intro, reload — should not replay |
| Intro skip on click/tap | ANIM-01 | User interaction timing | Click during intro — should skip to hero |
| Sections fade-in on scroll | ANIM-02 | Visual scroll-triggered animation | Scroll through page, verify fade-in/slide-up triggers at ~20% visible |
| Hero parallax on desktop | ANIM-03 | Visual depth effect | Scroll on desktop viewport, verify background moves at slower rate |
| Smoke particles desktop only | ANIM-04 | Visual + responsive behavior | Desktop: see particles at hero bottom. Mobile DevTools: no particle DOM |
| Mobile simple reveals only | ANIM-05 | Responsive animation tier | Mobile viewport: only fade/slide reveals, no parallax or particles |
| Neon glow on hover | ANIM-06 | Visual hover interaction | Hover over CTA buttons, logo, heading — verify red neon glow |
| Service cards no neon glow | ANIM-06 | Visual negative test | Hover service cards — only translateY + shadow, no neon glow |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
