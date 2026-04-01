---
phase: 2
slug: content-sections-gallery
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-01
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | No test framework (build verification + manual) |
| **Config file** | none |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npm run lint` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npm run lint`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | CONT-06 | smoke | `npm run build` | N/A | ⬜ pending |
| 02-01-02 | 01 | 1 | CONT-01 | smoke | `npm run build` | N/A | ⬜ pending |
| 02-02-01 | 02 | 1 | CONT-02 | smoke | `npm run build` | N/A | ⬜ pending |
| 02-02-02 | 02 | 1 | CONT-03 | smoke | `npm run build` | N/A | ⬜ pending |
| 02-02-03 | 02 | 1 | CONT-04 | smoke | `npm run build` | N/A | ⬜ pending |
| 02-02-04 | 02 | 1 | CONT-05 | smoke | `npm run build` | N/A | ⬜ pending |
| 02-03-01 | 03 | 2 | GALR-01 | manual | Manual browser check | N/A | ⬜ pending |
| 02-03-02 | 03 | 2 | GALR-02 | manual | Chrome DevTools Network | N/A | ⬜ pending |
| 02-03-03 | 03 | 2 | GALR-03 | smoke | `npm run build` | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] Move photos from `resimler/` to `public/images/` (hero, about, gallery subdirs)

*Existing infrastructure covers all phase requirements — build verification is primary validation.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| WhatsApp button opens correct number | CONT-05 | Requires browser + WhatsApp app | Click floating button, verify WhatsApp opens with 905397256886 and pre-filled message |
| All data from constants file | CONT-06 | Code review needed | grep for hardcoded Turkish text in section components — should only appear in constants.ts |
| Masonry grid layout | GALR-01 | Visual layout check | Open /galeri, verify photos in masonry columns, test filter buttons |
| Images served as WebP with blur | GALR-02 | Browser DevTools needed | Open /galeri, check Network tab for WebP format, verify blur placeholder on slow connection |
| Google Maps shows correct location | CONT-04 | Visual verification | Scroll to Iletisim, verify map shows Susehri address |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
