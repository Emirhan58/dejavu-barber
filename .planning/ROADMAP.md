# Roadmap: Dejavu Erkek Kuaforu

## Overview

A 4-phase build that establishes the technical foundation and vintage barber design system first, then fills in all content sections and gallery, layers portfolio-grade animations on top of stable content, and finishes with SEO optimization and Vercel deployment. Each phase produces a progressively more complete site that is functional at every stage.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3, 4): Planned milestone work
- Decimal phases (e.g., 2.1): Urgent insertions (marked with INSERTED)

- [ ] **Phase 1: Foundation & Design System** - Next.js 15 project with animation architecture, vintage barber visual identity, and mobile degradation system
- [ ] **Phase 2: Content Sections & Gallery** - All page sections with real business data, gallery page with optimized photos
- [ ] **Phase 3: Animation Layer** - Portfolio-grade GSAP/Motion animations layered onto stable content
- [ ] **Phase 4: SEO & Deploy** - Structured data, Turkish meta tags, Lighthouse optimization, Vercel deployment

## Phase Details

### Phase 1: Foundation & Design System
**Goal**: Developer has a working Next.js 15 project with the complete animation infrastructure, vintage Turkish barber design system, and three-tier animation degradation -- ready to receive content components
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, FOUND-06, FOUND-07, VISL-01, VISL-02, VISL-03
**Success Criteria** (what must be TRUE):
  1. Running `npm run dev` serves a Next.js 15 App Router site with TypeScript and Tailwind CSS 4 working
  2. A test component demonstrates GSAP and Motion animations without hydration errors, with clear GSAP/Motion boundary (no shared elements)
  3. The vintage barber design system is visible: dark base colors, red/neon accent variables, gold/cream accents, texture overlays, retro border styles -- applied to a sample layout
  4. The three-tier animation hook works: full effects on desktop, reduced on mobile, none with prefers-reduced-motion -- verifiable by toggling browser settings
  5. Lenis smooth scroll is active and navbar scrolls to section anchors with scroll-spy highlighting
**Plans**: TBD

Plans:
- [ ] 01-01: TBD
- [ ] 01-02: TBD
- [ ] 01-03: TBD

### Phase 2: Content Sections & Gallery
**Goal**: Users see a complete, functional barber shop website with all sections filled with real business data, all photos optimized, and a working gallery page -- just without fancy animations
**Depends on**: Phase 1
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, CONT-06, GALR-01, GALR-02, GALR-03
**Success Criteria** (what must be TRUE):
  1. User sees DEJAVU hero section at full screen with shop name and neon-styled text (static, no intro animation yet)
  2. User scrolls through Hakkimizda, Hizmetler (with categorized service cards and prices), and Iletisim (with embedded Google Maps, address, phone, working hours) sections
  3. User taps the floating WhatsApp button on any page and WhatsApp opens with the correct number (905397256886)
  4. User navigates to /galeri and sees shop photos in a grid layout, all loaded via next/image with WebP optimization and blur placeholders
  5. All business data (services, prices, hours, address, phone) comes from a single constants file -- changing the file updates every section
**Plans**: TBD

Plans:
- [ ] 02-01: TBD
- [ ] 02-02: TBD
- [ ] 02-03: TBD

### Phase 3: Animation Layer
**Goal**: Users experience portfolio-grade entrance animations, scroll reveals, parallax effects, and smooth page transitions that elevate the site from functional to remarkable
**Depends on**: Phase 2
**Requirements**: ANIM-01, ANIM-02, ANIM-03, ANIM-04, ANIM-05, ANIM-06
**Success Criteria** (what must be TRUE):
  1. First-time visitor sees the DEJAVU neon intro animation on page load; it does not replay on subsequent visits (sessionStorage) and can be skipped
  2. User scrolling down sees sections fade-in/slide-up into view, with parallax background layers moving at different speeds on desktop
  3. Desktop user sees smoke/steam particle effects in the hero area; mobile user sees none of these heavy effects
  4. User hovering over buttons and headings sees neon glow effects
  5. Mobile user experiences only simple scroll-reveal animations with no parallax or particles, and the site stays smooth (no jank)
**Plans**: TBD

Plans:
- [ ] 03-01: TBD
- [ ] 03-02: TBD

### Phase 4: SEO & Deploy
**Goal**: The site is discoverable by locals searching "susehri berber" on Google, passes Lighthouse mobile 90+, and is live on Vercel
**Depends on**: Phase 3
**Requirements**: SEOD-01, SEOD-02, SEOD-03, SEOD-04
**Success Criteria** (what must be TRUE):
  1. JSON-LD BarberShop structured data is present in page source with correct business name, address, phone, and working hours
  2. Turkish meta tags and Open Graph tags are present, with og:image showing the shop exterior photo
  3. Site is live on a Vercel URL and loads correctly on both desktop and mobile browsers
  4. Lighthouse mobile score is 90+ for Performance, with LCP under 2.5 seconds
**Plans**: TBD

Plans:
- [ ] 04-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Design System | 0/3 | Not started | - |
| 2. Content Sections & Gallery | 0/3 | Not started | - |
| 3. Animation Layer | 0/2 | Not started | - |
| 4. SEO & Deploy | 0/1 | Not started | - |
