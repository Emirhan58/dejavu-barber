---
phase: 4
slug: seo-deploy
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-02
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Build-time validation + HTML output inspection |
| **Config file** | next.config.ts |
| **Quick run command** | `npx next build` |
| **Full suite command** | `npx next build && npx next start` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx next build`
- **After every plan wave:** Run `npx next build` + inspect HTML output for JSON-LD and OG tags
- **Before `/gsd:verify-work`:** Full suite must be green + Lighthouse audit on deployed URL
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 04-01-01 | 01 | 1 | SEOD-01 | smoke | `npx next build && curl -s http://localhost:3000 \| grep "application/ld+json"` | ❌ W0 | ⬜ pending |
| 04-01-02 | 01 | 1 | SEOD-02 | smoke | `npx next build && curl -s http://localhost:3000 \| grep "og:image"` | ❌ W0 | ⬜ pending |
| 04-02-01 | 02 | 2 | SEOD-03 | manual | Manual: visit Vercel URL in browser | N/A | ⬜ pending |
| 04-02-02 | 02 | 2 | SEOD-04 | manual | Manual: run Lighthouse in Chrome DevTools | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] Verify `npx next build` completes without errors before starting phase work
- [ ] Confirm existing `constants.ts` has all required business data fields

*Existing infrastructure covers build validation. SEO-specific checks are build-output inspection.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Site live on Vercel URL | SEOD-03 | Requires actual Vercel deployment | 1. Deploy to Vercel 2. Visit URL on desktop and mobile 3. Verify all sections load |
| Lighthouse mobile 90+ | SEOD-04 | Requires Chrome DevTools on deployed site | 1. Open deployed URL in Chrome 2. Run Lighthouse mobile audit 3. Verify Performance >= 90 (85+ acceptable per user) |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
