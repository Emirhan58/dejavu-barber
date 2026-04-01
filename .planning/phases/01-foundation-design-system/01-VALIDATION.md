---
phase: 01
slug: foundation-design-system
status: draft
nyquist_compliant: true
wave_0_complete: false
created: 2026-04-01
---

# Phase 01 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | TypeScript compiler + Next.js build (no unit test framework for Phase 1) |
| **Config file** | tsconfig.json, next.config.ts |
| **Quick run command** | `npx tsc --noEmit` |
| **Full suite command** | `npm run build` |
| **Estimated runtime** | ~15-30 seconds |

**Rationale:** Phase 1 is a design system + animation infrastructure phase. Its outputs are visual components, CSS tokens, and client-side hooks — best verified by type-checking (compile-time correctness) and build success (no hydration/import errors). Unit tests for animation tier logic and scroll-spy can be added in later phases when vitest is introduced. The checkpoint:human-verify task in Plan 03 covers visual/interactive verification.

---

## Sampling Rate

- **After every task commit:** Run `npx tsc --noEmit`
- **After every plan wave:** Run `npm run build`
- **Before `/gsd:verify-work`:** Full build must succeed + human-verify checkpoint passed
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | Status |
|---------|------|------|-------------|-----------|-------------------|--------|
| 01-01-01 | 01 | 1 | FOUND-01, FOUND-02, FOUND-04, VISL-01, VISL-02, VISL-03 | build | `npm run build` exits 0 | pending |
| 01-01-02 | 01 | 1 | FOUND-02 | type-check | `npx tsc --noEmit` exits 0 | pending |
| 01-02-01 | 02 | 2 | FOUND-03, FOUND-05 | type-check | `npx tsc --noEmit` exits 0 | pending |
| 01-02-02 | 02 | 2 | FOUND-05 | build | `npm run build` exits 0 | pending |
| 01-03-01 | 03 | 3 | FOUND-06 | type-check | `npx tsc --noEmit` exits 0 | pending |
| 01-03-02 | 03 | 3 | FOUND-06, FOUND-07 | build | `npm run build` exits 0 | pending |
| 01-03-03 | 03 | 3 | ALL | human-verify | checkpoint:human-verify (Task 3) | pending |

*Status: pending · green · red · flaky*

---

## Wave 0 Requirements

No Wave 0 needed — Phase 1 uses `npx tsc --noEmit` and `npm run build` as automated verification, both available from the Next.js project scaffold created in Plan 01.

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

- [x] All tasks have `<automated>` verify commands (tsc --noEmit or npm run build)
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] No Wave 0 needed — build toolchain serves as verification
- [x] No watch-mode flags
- [x] Feedback latency < 30s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** ready
