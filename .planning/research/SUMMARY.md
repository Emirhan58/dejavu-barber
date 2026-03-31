# Project Research Summary

**Project:** Dejavu Erkek Kuaforu — Barber Shop Website
**Domain:** Local business promotional site with portfolio-grade animations
**Researched:** 2026-04-01
**Confidence:** HIGH

## Executive Summary

Dejavu Erkek Kuaforu is a static promotional website for a single-barber shop in Susehri, Sivas, Turkey. The site's primary business goals are local discoverability (Google search) and converting visitors into WhatsApp appointment bookings. The competitive bar locally is essentially zero — no other barber in Susehri has a custom-built site. This means the technical challenge is not beating competition on features but rather achieving a level of visual polish that would be remarkable in any context: a portfolio-quality site for a real local business. The recommended approach is a static Next.js 15 site with zero backend, deploying to Vercel, using a dual animation library strategy (GSAP for complex scroll-driven timelines, Motion/Framer for React lifecycle transitions) layered onto a vintage Turkish barber aesthetic.

The single most important risk is mobile performance. Over 70% of local traffic arrives on mid-range Android phones (Samsung A-series, Xiaomi Redmi) common in rural Turkey. Heavy GSAP timelines, particle effects, and parallax layers that look smooth on a developer's desktop will completely destroy the experience on these devices. The architecture must bake in a three-tier animation system (full / reduced / none) from day one — it cannot be retrofitted. The second major risk is that developers get absorbed in animation work and neglect local SEO, which is the primary mechanism by which the site delivers real business value. JSON-LD LocalBusiness schema, Turkish meta tags, and Google Business Profile map embed must not be deferred.

The build order is strictly dictated by dependencies: project foundation and mobile animation architecture first, then static HTML content sections, then the GSAP/Motion animation layer on top, then gallery page, then polish effects, then SEO and deployment. Building animation and content simultaneously makes debugging nearly impossible and leads to the hydration errors and ScrollTrigger memory leaks that are the most common failure modes with GSAP in Next.js 15 App Router.

---

## Key Findings

### Recommended Stack

The stack is a cohesive, well-tested combination targeting Next.js 15.x (App Router, SSR/SSG, built-in image optimization), React 19, TypeScript 5, and Tailwind CSS 4 (CSS-first config, no `tailwind.config.js` required, Rust-based build engine). The animation stack pairs GSAP 3.14 (now 100% free including SplitText, ScrollTrigger) with `@gsap/react` for cleanup-safe hooks, Motion 12.x (formerly Framer Motion, import from `motion/react`) for component-level animations, and Lenis 1.3 for buttery smooth scrolling. This combination is the industry standard for portfolio/agency sites in 2026.

**Core technologies:**
- **Next.js 15.x**: Framework, SSR/SSG, image optimization — battle-tested, Vercel-native, sufficient for a static site without needing v16
- **TypeScript 5.x**: Type safety — industry standard, enforces correctness across static data and component contracts
- **Tailwind CSS 4.x**: Utility styling — CSS-first config, 5x faster builds, built-in 3D transforms; use `@tailwindcss/postcss` for Next.js integration (NOT the Vite plugin)
- **GSAP 3.14 + @gsap/react 2.x**: Complex animations — all plugins free, `useGSAP()` hook mandatory for App Router cleanup safety
- **Motion 12.x**: React-native animations — page transitions, hover states, `AnimatePresence`; import from `motion/react` (old `framer-motion` package is deprecated)
- **Lenis 1.3.x**: Smooth scrolling — lightweight, no Locomotive Scroll, wraps in a client component provider

**What NOT to use:** `framer-motion` (deprecated package name), `@studio-freight/lenis` (deprecated), Locomotive Scroll, three.js/R3F (500KB+ bundle overkill), jQuery, any CMS, online booking system, or `next-themes`.

### Expected Features

The site has two tiers of purpose: functional (why locals visit) and emotional (why locals share it). All P1 features serve the functional tier. Differentiators serve the emotional tier.

**Must have (table stakes — P1):**
- Hero section with DEJAVU branding — first impression, defines the shop's identity
- Services + prices list — the primary reason people visit; hiding prices creates abandonment
- Contact section with address, phone, working hours (07:00-23:30, Pazar kapali) — how to find and reach the shop
- WhatsApp floating action button — the sole conversion action; always visible, international format `+905397256886`
- Mobile-responsive layout — 70%+ of traffic is mobile-first phone users
- Basic scroll-reveal animations — minimum premium feel
- SEO: Turkish meta tags + LocalBusiness JSON-LD structured data — the mechanism for local Google discovery
- Hakkimizda (About) section — small-town trust factor; personal story matters

**Should have (differentiators — P2):**
- Portfolio-grade hero intro animation (GSAP timeline, neon DEJAVU text, cinematic entrance)
- Vintage Turkish barber aesthetic (custom color system: dark base, red/neon, gold/cream, warm browns; texture overlays)
- Scroll-triggered section animations (Framer Motion `whileInView`)
- Gallery page with photo grid and lightbox
- Smooth page transitions (Framer Motion `AnimatePresence`)
- Parallax effects on hero (GSAP ScrollTrigger, desktop only)
- Neon glow CSS hover effects on interactive elements

**Defer to v2+:**
- Particle effects (smoke/steam canvas) — highest complexity, lowest practical value
- Full cinematic intro sequence at samurai-portfolio level
- Instagram feed integration
- Google Reviews widget
- Before/after image slider (only if suitable photo pairs exist)

**Deliberately excluded:** Online booking system (WhatsApp is the correct local substitute), customer reviews section, blog, newsletter, e-commerce, multi-language, admin panel, live chat.

### Architecture Approach

The architecture is a pure static promotional site with zero backend. All business data (services, prices, contact, hours) lives in a single `lib/constants.ts` TypeScript file. The page structure is a vertical stack of section components on a single home route, plus a `/galeri` gallery route. The complexity lives entirely in the presentation and animation layers, not in data management. The critical architectural decisions are the dual animation library boundary (GSAP owns scroll-driven and timeline effects, Motion owns component lifecycle and hover states — never both on the same element) and the centralized GSAP configuration (`lib/gsap-config.ts` registers all plugins once; components import from there, never directly from `gsap`).

**Major components:**
1. **Layout Shell** (`app/layout.tsx`, Server Component) — fonts via `next/font`, metadata, smooth scroll wrapper
2. **Section Components** (`Hero`, `About`, `Services`, `Contact`) — each is a `"use client"` component managing its own scroll animations via `useGSAP` with a scoped ref
3. **Animation System** (`lib/gsap-config.ts`, `hooks/useAnimationTier.ts`) — centralized plugin registration, three-tier degradation (full/reduced/none)
4. **Gallery Page** (`app/galeri/page.tsx`) — separate route with Framer Motion layout animations and lazy-loaded optimized images
5. **WhatsApp FAB** (`components/layout/WhatsAppFAB.tsx`) — always visible fixed-position client component, zero scroll dependencies
6. **Static Data** (`lib/constants.ts`) — single source of truth for all business information

### Critical Pitfalls

1. **GSAP + Framer Motion conflict on shared elements** — Both libraries fight over the `transform` property when applied to the same DOM element. Hard rule: if a component uses `useGSAP()`, do not wrap the same elements in `<motion.div>`. Use a wrapper pattern (outer div for GSAP, inner `<motion.div>` for hover states on different properties). Address in Phase 1 before writing any animation code.

2. **ScrollTrigger memory leaks in App Router** — ScrollTrigger instances persist after component unmount, accumulating with every navigation. Mandatory fix: use `useGSAP(() => {...}, { scope: containerRef })` exclusively. Never create GSAP animations in raw `useEffect`. Never use `gsap.registerPlugin()` inside individual components — use the centralized config file. Address in Phase 1 as the non-negotiable foundation pattern.

3. **Mobile performance failure from unthrottled animations** — The target audience uses mid-range Android phones. A three-tier `useAnimationTier()` hook must be built in Phase 1. Mobile tier: no parallax, no particles, opacity+translateY reveals only, no `backdrop-filter`. Use `ScrollTrigger.matchMedia()` for breakpoint-conditional animation registration. Test with Chrome DevTools 4x CPU throttle from Phase 2 onward. Recovery after the fact is extremely expensive.

4. **Hydration errors (GSAP/Motion vs Next.js 15 SSR)** — GSAP's ScrollTrigger modifies `<body>` styles; Framer Motion renders different initial states server vs client. React 19's stricter hydration checks make this visible. Fix: all animation components are `"use client"`, set initial animation states in CSS/Tailwind classes (not JS), never use `suppressHydrationWarning` as a band-aid. Address in Phase 1.

5. **Unoptimized barber photos destroying load times** — 7 raw phone-camera photos at 3-8MB each will make the site unusable on mobile data. Pre-process all images to WebP at max 2000px before building components. Use `next/image` with explicit `sizes` attribute everywhere. Add `priority` only to the hero image. Use blur placeholders in the gallery. Lighthouse LCP must be under 2.5s. Address at start of Phase 2.

6. **Local SEO negligence** — The entire business value of this site is local discoverability. JSON-LD `BarberShop` schema, Turkish meta descriptions targeting "susehri berber" / "susehri erkek kuaforu", and embedding the Google Business Profile map (not a generic address pin) are non-negotiable. WhatsApp link must use international format (`905397256886`, not `05397256886`). Address in Phase 4 (SEO/Deploy).

---

## Implications for Roadmap

Based on combined research, the architecture's own build order dependency graph directly prescribes the phase structure. The PITFALLS.md pitfall-to-phase mapping aligns with this order. Six phases are recommended.

### Phase 1: Foundation and Animation Architecture

**Rationale:** All four research files agree this must come first. PITFALLS.md flags Pitfalls 1-4 (GSAP/Motion conflict, ScrollTrigger leaks, mobile performance, hydration errors) as "Phase 1: Foundation" items. These are architectural decisions that cannot be retrofitted. Building a single animated component before this phase is locked is a risk multiplier. ARCHITECTURE.md's build order explicitly lists this as Phase 1 dependencies.

**Delivers:** Working Next.js 15 project with TypeScript, Tailwind CSS 4, GSAP + Motion + Lenis installed, centralized GSAP config, `useAnimationTier()` hook, `lib/constants.ts` with all business data, root layout with fonts and metadata shell, `"use client"` boundary pattern established.

**Addresses:** Project scaffolding, dev tooling (Prettier + prettier-plugin-tailwindcss, ESLint), PostCSS config for Tailwind 4, GSAP plugin registration pattern, mobile detection hooks.

**Avoids:** ScrollTrigger memory leaks (useGSAP pattern set as mandatory), GSAP/Motion element conflict (boundary documented), hydration errors ("use client" pattern established), mobile performance (animation tier hook built before any animations).

**Research flag:** Standard patterns — well-documented Next.js 15 + GSAP setup. Skip phase research.

---

### Phase 2: Static Content Sections (No Animation)

**Rationale:** ARCHITECTURE.md is explicit: "Build all sections as static HTML/CSS first, then layer animations on top. Never build animation and content simultaneously — it makes debugging impossible." This phase produces a fully functional, JavaScript-optional version of the site. It also forces image optimization early (Pitfall 5).

**Delivers:** All home page sections rendered as static HTML with Tailwind CSS: Hero (no animation yet), Hakkimizda, Hizmetler (services + prices from constants.ts), Iletisim (contact, lazy Google Maps embed, working hours), Footer. WhatsApp FAB always visible. Navbar with scroll-to-section links. All 7 barber photos pre-processed to WebP, loaded via `next/image` with correct `sizes` attributes.

**Addresses:** All P1 must-have features — this phase is where the business-critical content lives.

**Avoids:** Unoptimized images (processed at start of this phase), Google Maps iframe loaded eagerly (use `loading="lazy"`), WhatsApp link in wrong format (validated against international format).

**Research flag:** Standard patterns. Skip phase research.

---

### Phase 3: Animation Layer

**Rationale:** Animations layer on top of complete, working content (Phase 2). The dual-library boundary from Phase 1 is now applied to real components. This phase is the highest-risk technically — it's where the GSAP/Motion conflict and ScrollTrigger cleanup patterns are exercised.

**Delivers:** Hero intro GSAP timeline (neon DEJAVU text entrance, SplitText per-character animation), scroll-reveal animations on all sections via Framer Motion `whileInView`, Hizmetler service card stagger animations, Lenis smooth scroll activated, Navbar active section tracking via IntersectionObserver. Intro skippable (sessionStorage `visited` flag to prevent replay on back-navigation).

**Uses:** Full GSAP + @gsap/react + Motion + Lenis stack. `useAnimationTier()` hook gates all animations.

**Implements:** Dual animation library pattern, progressive degradation, centralized GSAP config.

**Avoids:** Intro animation blocking content >1.5s (time-boxed), `prefers-reduced-motion` ignored (hook gates all GSAP timelines), animations replaying on back-navigation (sessionStorage flag).

**Research flag:** Animation patterns are well-documented but the GSAP + Next.js App Router combination has known gotchas. Consider running `/gsd:research-phase` if any ScrollTrigger or hydration issues arise during implementation.

---

### Phase 4: Gallery Page

**Rationale:** Gallery is a separate Next.js route that depends on the animation system (Phase 3) and image optimization patterns (Phase 2) being established. ARCHITECTURE.md notes this can parallel Phase 3 if resources allow, but sequentially it comes after the animation system is proven on the home page sections first.

**Delivers:** `/galeri` route with photo grid layout (`GalleryGrid`, `GalleryCard` components), Lightbox fullscreen viewer, Framer Motion `AnimatePresence` page transition from home to gallery and back, staggered entrance animations on grid items, lazy loading with blur placeholders for all gallery images.

**Uses:** Framer Motion layout animations, `next/image` with `placeholder="blur"`, App Router `template.tsx` wrapper for page transitions.

**Avoids:** All images loaded at once (lazy load with 2-3 visible initially), page transition jarring (AnimatePresence handles enter/exit).

**Research flag:** Standard patterns. Skip phase research.

---

### Phase 5: Polish and Visual Effects

**Rationale:** Differentiator features from FEATURES.md that elevate the site above "good" to "portfolio-quality." These are deliberately last because they depend on all prior content and animation structure being stable, and they are the first to be disabled on mobile (requiring the animation tier system from Phase 1 to be fully working).

**Delivers:** Vintage Turkish barber design polish pass (texture overlays, vintage borders, neon text-shadow CSS `@keyframes`, barber pole stripe decorative animation), parallax layers on hero section (GSAP ScrollTrigger, desktop only), neon glow hover effects on buttons and service cards, CSS backdrop effects (desktop only, not mobile), `SectionDivider` decorative components between sections. Particle/steam effects if performance budget allows.

**Uses:** GSAP ScrollTrigger parallax, CSS custom properties for the vintage color system (dark base, red/neon, gold/cream, warm browns), `useAnimationTier()` to gate all effects to desktop.

**Avoids:** Parallax on mobile (animation tier gate), `backdrop-filter` on mobile (GPU killer), `will-change` overuse, particle effects without canvas/performance detection.

**Research flag:** Particle system implementation (canvas vs CSS) may benefit from a focused research spike if pursued.

---

### Phase 6: SEO, Accessibility, and Deploy

**Rationale:** SEO must come last because structured data and meta tags reference actual content that only exists after all sections are built. PITFALLS.md explicitly notes "SEO requires content completion." This is also the final quality gate before the site goes live.

**Delivers:** JSON-LD `BarberShop` schema with full business data (address: Cami Orta Mahallesi, Sivas Cd. No:55/C, Susehri, Sivas 58600; phone: +905397256886; hours: Mo-Sa 07:00-23:30), Turkish meta descriptions targeting "susehri berber" / "susehri erkek kuaforu" / "dejavu kuafor", Open Graph image (shop exterior with DEJAVU neon sign), Google Business Profile map embed (not generic address pin), WCAG AA contrast audit (4.5:1 minimum on dark/gold palette), `prefers-reduced-motion` full audit, Lighthouse score gates (mobile >= 90, desktop >= 95), Vercel deployment with `sharp` explicitly installed, `@vercel/analytics` for real-user Web Vitals monitoring.

**Avoids:** LocalBusiness schema missing (site ranks nowhere locally), WhatsApp wrong format (validated), image alt texts generic (Turkish descriptive text required), Sunday-closed status missing from hours display.

**Research flag:** Standard patterns. Skip phase research.

---

### Phase Ordering Rationale

- **Foundation first** because all four pitfall categories (animation conflict, memory leaks, mobile performance, hydration) are architectural decisions that cannot be patched after the fact. Recovery cost for mobile performance failure after building desktop-first animations is rated HIGH in PITFALLS.md.
- **Static content before animation** because debugging content issues inside animated components is extremely difficult. This pattern is explicitly recommended in ARCHITECTURE.md and validated by the animation library's own documentation.
- **Gallery after home sections** because the animation patterns proven on the home page (GSAP cleanup, Motion page transitions) transfer directly to the gallery implementation. Building gallery first risks discovering fundamental animation architecture issues after more code is written.
- **Polish and effects last** because they are decorative — removing them leaves a complete, functional, shippable site. Adding them before core content is stable creates fragile dependencies.
- **SEO last** because it depends on final, stable content. But SEO structure (NAP consistency, business data in constants.ts) is planned in Phase 1 so the layout accommodates it from the start.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 3 (Animation Layer):** GSAP + Next.js App Router is a well-known source of subtle bugs (ScrollTrigger with App Router navigation, React 19 strict mode double-mounting). If unexpected hydration or cleanup issues arise during implementation, a focused research spike is warranted. The `useGSAP` hook documentation and the community forum threads on hydration are the primary resources.
- **Phase 5 (Particle Effects, if pursued):** Canvas-based particle systems on mobile are a known performance hazard. If the particle/steam aesthetic is pursued beyond CSS-only approaches, a performance research spike is needed before implementation.

Phases with standard patterns (skip research):
- **Phase 1:** Next.js 15 project setup is fully documented; GSAP + Next.js integration patterns are covered by official `@gsap/react` docs.
- **Phase 2:** Static HTML + Tailwind CSS + `next/image` are all well-documented standard patterns.
- **Phase 4:** Gallery with Framer Motion and App Router is standard; `AnimatePresence` page transitions are documented.
- **Phase 6:** JSON-LD LocalBusiness schema and Next.js metadata API are official, stable documentation.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All versions verified against official release notes and npm. Version compatibility matrix validated (Next.js 15 + React 19 + Tailwind 4 + GSAP 3.14 + Motion 12). |
| Features | HIGH | Cross-referenced against multiple barber site design examples, Turkish web agency sites, and PROJECT.md business constraints. Anti-features are well-justified by domain context. |
| Architecture | HIGH | Patterns sourced from official Next.js docs, GSAP React documentation, and reference project (emirhankaya.vercel.app). Build order derived from actual code dependencies. |
| Pitfalls | HIGH | Critical pitfalls (1-4) sourced from official GSAP community forums and Next.js 15 GSAP integration guides. Performance pitfalls backed by benchmark data. |

**Overall confidence: HIGH**

### Gaps to Address

- **Photo availability for before/after slider:** FEATURES.md notes this feature "only if before/after photos are available." Confirm with shop owner during Phase 2 whether suitable photo pairs exist before allocating build time.
- **Google Business Profile status:** PITFALLS.md recommends embedding the Google Business Profile map specifically (not a generic pin). Confirm the shop has a verified GBP listing before Phase 6. If not, create one before deployment.
- **Particle effect decision:** Research suggests this is "highest complexity, lowest practical value" (FEATURES.md). The decision to include or exclude should be made before Phase 5 begins, based on Phase 3 Lighthouse mobile scores. If mobile score is already tight at Phase 3, skip particles entirely.
- **Custom font decision:** `public/fonts/` is in the architecture. If a custom vintage font is desired for the DEJAVU heading (beyond Google Fonts), source and license it before Phase 1 to avoid font substitution mid-development.

---

## Sources

### Primary (HIGH confidence)
- [Next.js Official Blog - 15.5](https://nextjs.org/blog/next-15-5) — version verification
- [Next.js 16 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-16) — version comparison
- [Tailwind CSS v4.0 Release](https://tailwindcss.com/blog/tailwindcss-v4) — features and PostCSS setup
- [Motion Official Site](https://motion.dev/) — rename from framer-motion, version 12
- [GSAP npm + SplitText Docs](https://gsap.com/docs/v3/Plugins/SplitText/) — free license confirmation
- [Lenis GitHub](https://github.com/darkroomengineering/lenis) — version 1.3.21
- [GSAP + React Official Guide](https://gsap.com/resources/React/) — useGSAP() hook documentation
- [Next.js Image Optimization Docs](https://nextjs.org/docs/app/api-reference/components/image) — LCP patterns
- [WCAG 2.3.3: Animation from Interactions](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html) — accessibility requirements

### Secondary (MEDIUM confidence)
- [Colorlib - Best Barbershop Website Designs 2026](https://colorlib.com/wp/barbershop-websites/) — feature landscape
- [CyberOptik - Best Barber Shop Websites 2026](https://www.cyberoptik.net/blog/best-barber-shop-websites/) — feature landscape
- [Framer Motion vs GSAP performance comparison](https://blog.uavdevelopment.io/blogs/comparing-the-performance-of-framer-motion-and-gsap-animations-in-next-js) — benchmark data
- [Setting Up GSAP with Next.js: 2025 Edition](https://javascript.plainenglish.io/setting-up-gsap-with-next-js-2025-edition-bcb86e48eab6) — GSAP + App Router patterns
- [Optimizing GSAP in Next.js 15](https://medium.com/@thomasaugot/optimizing-gsap-animations-in-next-js-15-best-practices-for-initialization-and-cleanup-2ebaba7d0232) — cleanup patterns
- [Infobip - Add WhatsApp Button to Website 2026](https://www.infobip.com/blog/add-whatsapp-button-to-website) — URL format
- [Reference project: emirhankaya.vercel.app](https://emirhankaya.vercel.app) — animation quality benchmark
- [Local SEO best practices for Google Maps embedding](https://seeders.com/blog/local-seo-best-practices-for-embedding-google-maps-and-directions-on-your-website/) — GBP embed vs address pin

### Tertiary (LOW confidence)
- [YD Web - Berber & Kuafor Web Sitesi Tasarimi](https://ydweb.com.tr/cozumler/berber-kuafor-web-sitesi-tasarimi/) — Turkish barber site market context (single source)
- [Why modern websites remove heavy animations](https://www.gomilestone.com/blog/why-websites-are-removing-heavy-animations) — mobile performance impact (single source, but aligns with Lighthouse data)

---
*Research completed: 2026-04-01*
*Ready for roadmap: yes*
