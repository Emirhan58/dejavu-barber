# Pitfalls Research

**Domain:** Barber shop website with heavy animations (GSAP + Framer Motion, Next.js 15, vintage Turkish theme)
**Researched:** 2026-04-01
**Confidence:** HIGH

## Critical Pitfalls

### Pitfall 1: GSAP + Framer Motion Dual-Library Conflict

**What goes wrong:**
Using both GSAP and Framer Motion in the same project creates competing animation systems that fight over the same DOM elements. Framer Motion uses React's reconciliation cycle for animation state, while GSAP directly manipulates the DOM. When both touch the same element (or parent-child elements), you get flickering, interrupted animations, layout thrashing, and inconsistent behavior. Framer Motion drops to ~45fps with multiple simultaneous animations; GSAP maintains 60fps. Mixing them without clear boundaries amplifies the worst of both.

**Why it happens:**
Developers choose Framer Motion for React-native transitions (page transitions, layout animations, mount/unmount) and GSAP for complex scroll-driven effects and timelines. Without strict separation, the two libraries end up animating overlapping properties on shared elements.

**How to avoid:**
Establish a hard boundary: Framer Motion owns component-level mount/unmount animations and layout transitions. GSAP owns scroll-triggered animations, complex timelines, and SVG effects. Never let both libraries animate the same CSS property on the same element. Document which library controls which section in a comment header per component file.

Concrete rule: If a component uses `useGSAP()`, it does NOT use `<motion.div>` wrappers on the same elements. Use a plain `<div ref={containerRef}>` for GSAP targets.

**Warning signs:**
- Animations stutter or "jump" when scrolling back and forth
- `transform` values reset unexpectedly mid-animation
- Console warnings about conflicting style mutations
- Framer Motion `animate` prop seems ignored on elements also targeted by GSAP

**Phase to address:**
Phase 1 (Foundation/Setup) -- establish the animation architecture contract before writing any animation code.

---

### Pitfall 2: GSAP ScrollTrigger Memory Leaks in Next.js App Router

**What goes wrong:**
ScrollTrigger instances persist after component unmount in single-page applications. With Next.js App Router's client-side navigation, components mount and unmount frequently. Orphaned ScrollTrigger instances accumulate, consuming memory, firing callbacks on destroyed elements, and causing phantom scroll behaviors. On a gallery page with many scroll-triggered reveals, navigating back and forth 5-10 times can make the page visibly lag.

**Why it happens:**
Developers use raw `useEffect` with manual GSAP cleanup, but miss edge cases: timelines with nested ScrollTriggers, delayed animations created outside the initial effect (setTimeout, event handlers), and ScrollTrigger.refresh() calls that re-register triggers. React's strict mode in development double-mounts components, masking cleanup bugs that surface in production.

**How to avoid:**
Use the official `@gsap/react` package and its `useGSAP()` hook exclusively. This hook wraps `gsap.context()` and automatically reverts all animations created within its scope on unmount. Critical rules:

1. Register ScrollTrigger inside `useGSAP()`: `gsap.registerPlugin(ScrollTrigger)` at the top of the hook
2. Never create GSAP animations in event handlers or timeouts without adding them to context manually via `contextSafe()`
3. Call `ScrollTrigger.refresh()` only when layout genuinely changes (images loaded), not on every render
4. Add `"use client"` directive -- GSAP does not work in server components

```typescript
// Correct pattern
const container = useRef<HTMLDivElement>(null);

useGSAP(() => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.from(".service-card", {
    scrollTrigger: { trigger: ".services", start: "top 80%" },
    y: 60, opacity: 0, stagger: 0.15
  });
}, { scope: container }); // auto-cleanup on unmount
```

**Warning signs:**
- Browser memory usage climbs after navigating between pages
- Scroll-triggered animations fire on the wrong page
- Console errors referencing null DOM elements
- Animations replay from the beginning after navigating away and back

**Phase to address:**
Phase 1 (Foundation) -- set up the `useGSAP()` pattern as the mandatory standard before any animation development.

---

### Pitfall 3: Mobile Performance Disaster from Unthrottled Animations

**What goes wrong:**
Over 70% of barber shop website traffic comes from mobile devices. Heavy GSAP timelines, particle effects, parallax layers, and complex scroll-driven animations that run buttery smooth on a developer's desktop MacBook will completely destroy performance on mid-range Android phones common in rural Turkish towns (Samsung A series, Xiaomi Redmi). Users see janky scrolling, delayed interactions, battery drain, and may abandon the site before finding the WhatsApp button. Lighthouse mobile score drops below 50. Google penalizes Core Web Vitals failures in search ranking, directly hurting local discoverability.

**Why it happens:**
Developers test on desktop or high-end phones. They add animations incrementally -- each one feels fine in isolation. But combined, 15+ simultaneous GSAP tweens with scroll listeners, particle canvas rendering, and parallax transforms overwhelm mobile GPUs. The `will-change` property is overused, consuming GPU memory. CSS `backdrop-filter` (blur effects) is particularly expensive on mobile.

**How to avoid:**
1. Build a `useDeviceCapability()` hook that detects mobile via `matchMedia('(max-width: 768px)')` AND checks `navigator.hardwareConcurrency` (< 4 cores = low-end)
2. Create two animation tiers: FULL (desktop) and REDUCED (mobile)
3. Mobile tier: No particle effects, no parallax, simpler scroll reveals (opacity + translateY only, no 3D transforms), no `backdrop-filter`
4. Use GSAP's `ScrollTrigger.matchMedia()` to conditionally register animations by breakpoint
5. Test on Chrome DevTools throttled to "Mid-tier mobile" (4x CPU slowdown) throughout development, not just at the end
6. Set a performance budget: Lighthouse mobile score >= 90 is a hard gate before deploy

```typescript
ScrollTrigger.matchMedia({
  "(min-width: 769px)": function() {
    // Full desktop animations - parallax, particles, complex timelines
  },
  "(max-width: 768px)": function() {
    // Simple fade-in only, no parallax
    gsap.from(".section", { opacity: 0, y: 30, duration: 0.5 });
  }
});
```

**Warning signs:**
- Lighthouse mobile performance score below 80
- "Long task" warnings in Chrome DevTools Performance tab
- Total Blocking Time (TBT) above 300ms on mobile
- Scroll feels "heavy" or laggy in DevTools mobile emulation with CPU throttling

**Phase to address:**
Phase 1 (Foundation) -- the mobile animation tier must be architected upfront, not retrofitted after building desktop-first animations.

---

### Pitfall 4: Next.js 15 Hydration Errors from Animation Libraries

**What goes wrong:**
GSAP's ScrollTrigger adds inline `style={{}}` attributes to the `<body>` tag during initialization. Framer Motion's `AnimatePresence` can render different initial states on server vs client. Both cause React 19's stricter hydration checks (used in Next.js 15) to throw "Hydration failed because the initial UI does not match what was rendered on the server" errors. These show as console errors in development and can cause visible flash-of-unstyled-content (FOUC) in production where the page briefly renders without animation styles, then jumps.

**Why it happens:**
Server-side rendering generates HTML without any browser APIs. GSAP and Framer Motion depend on `window`, `document`, and layout measurements that only exist in the browser. When the client hydrates, the DOM doesn't match what the server rendered. React 19 in Next.js 15 is stricter about these mismatches than previous versions.

**How to avoid:**
1. All animation components must be `"use client"` components -- never try to animate in server components
2. Use `useGSAP()` (which runs only on client) instead of raw `useEffect` for GSAP initialization
3. For Framer Motion page transitions with `AnimatePresence`, use `dynamic(() => import('./AnimatedLayout'), { ssr: false })` if hydration errors persist
4. Set initial animation states in CSS (not JS) so server-rendered HTML already has the correct starting styles (e.g., `opacity: 0` in Tailwind classes, then animate to visible)
5. Avoid `suppressHydrationWarning` as a band-aid -- fix the root cause instead
6. Do NOT use `typeof window !== 'undefined'` checks in render logic -- this itself causes hydration mismatch

**Warning signs:**
- Red "Hydration mismatch" errors in browser console during development
- Page content briefly flashes or jumps on initial load
- Elements appear then disappear then reappear
- `style` attribute differences between server HTML and client DOM

**Phase to address:**
Phase 1 (Foundation) -- establish the `"use client"` boundary and animation initialization pattern before building any animated sections.

---

### Pitfall 5: Unoptimized Barber Photos Destroying Load Times

**What goes wrong:**
The project has 7 real photos from the barber shop (exterior, interior, work photos). Phone camera photos are typically 3-8MB each in JPEG. Without optimization, the hero section alone takes 5+ seconds to load on a 3G/4G connection common in Susehri. LCP (Largest Contentful Paint) exceeds 4 seconds, destroying both user experience and Google's Core Web Vitals score. The gallery page with all photos becomes essentially unusable on mobile data.

**Why it happens:**
Developers drop raw photos into the project and assume Next.js handles it. While `next/image` does optimize, it needs proper configuration: correct `sizes` attribute for responsive images, `priority` on hero images, and appropriate quality settings. Without these, the default behavior still serves images larger than needed.

**How to avoid:**
1. Pre-process all photos before adding to the project: resize to max 2000px wide, convert to WebP with quality 80
2. Use `next/image` with explicit `sizes` attribute on every image:
   ```tsx
   <Image
     src="/images/hero.webp"
     alt="Dejavu Erkek Kuaforu"
     fill
     sizes="100vw"
     priority  // ONLY on hero image
     quality={80}
   />
   ```
3. Add `priority` ONLY to the hero image -- never to gallery thumbnails or below-fold images
4. For the gallery page: implement lazy loading with blur placeholders (`placeholder="blur"` with `blurDataURL`)
5. Use `loading="lazy"` (default in next/image) for all non-hero images
6. Store optimized images in `public/images/` with descriptive filenames for SEO

**Warning signs:**
- LCP above 2.5 seconds in Lighthouse
- Network tab shows images over 500KB
- Gallery page loads slowly even on WiFi
- `next/image` warnings about missing `sizes` prop

**Phase to address:**
Phase 2 (Content/Assets) -- optimize all images before building components that use them. Do not defer image optimization to "later."

---

### Pitfall 6: Local SEO Negligence on a Local Business Site

**What goes wrong:**
The entire purpose of this site is to attract local customers in Susehri/Sivas. Yet developers focus on flashy animations and forget the basics: structured data (LocalBusiness schema), Google Business Profile link, consistent NAP (Name, Address, Phone) across the site, proper meta tags in Turkish, and embedding the Google Business Profile map (not just a generic Google Maps pin). Without these, the beautiful site ranks nowhere in local Google searches for "susehri berber" or "susehri erkek kuaforu."

**Why it happens:**
SEO is invisible and unglamorous compared to animation work. The developer's reference project (emirhankaya.vercel.app) is a personal portfolio where SEO barely matters. Carrying that mindset to a local business site means the site looks amazing but generates zero customer traffic.

**How to avoid:**
1. Add JSON-LD structured data for `LocalBusiness` schema with exact business info:
   ```json
   {
     "@context": "https://schema.org",
     "@type": "BarberShop",
     "name": "Salon Dejavu - Sac ve Sakal Tasarimi",
     "address": { "@type": "PostalAddress", "streetAddress": "Cami Orta Mahallesi, Sivas Cd. No:55/C", "addressLocality": "Susehri", "addressRegion": "Sivas", "postalCode": "58600" },
     "telephone": "+905397256886",
     "openingHours": "Mo-Sa 07:00-23:30"
   }
   ```
2. Embed the Google Business Profile map, NOT a generic Google Maps address pin
3. Ensure NAP consistency: same exact name, address, phone format everywhere on the site
4. Turkish meta descriptions targeting local search terms: "Susehri erkek kuaforu", "Susehri berber", "Dejavu kuafor"
5. Add an Open Graph image showing the shop exterior (the neon "DEJAVU" sign)

**Warning signs:**
- Searching "susehri berber" on Google returns no results for the site
- No structured data detected in Google's Rich Results Test tool
- Google Search Console shows zero impressions for local keywords

**Phase to address:**
Phase 3 (SEO/Polish) -- but the LocalBusiness schema structure should be planned in Phase 1 so the layout accommodates it.

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Using `suppressHydrationWarning` everywhere | Silences hydration errors fast | Masks real SSR/client mismatches that cause FOUC | Never -- fix root cause |
| Inline GSAP animations without `useGSAP()` hook | Faster to prototype | Memory leaks accumulate with navigation | Never in production |
| Skipping `sizes` on `next/image` | Less code to write | Oversized images served to mobile, poor LCP | Never -- always specify |
| Hardcoding WhatsApp number in multiple components | Quick copy-paste | Update one, miss others; broken links | Only if extracted to a constants file |
| Using `will-change` on many elements | Feels proactive for perf | Excessive GPU memory consumption, opposite of intended effect | Only on elements that actually animate, remove after animation completes |
| Raw `<img>` tags instead of `next/image` | Simpler markup | No automatic WebP/AVIF, no responsive sizing, no lazy loading | Never in Next.js |

## Integration Gotchas

Common mistakes when connecting to external services.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Google Maps Embed | Embedding a generic address pin | Embed the Google Business Profile listing map for SEO signals |
| WhatsApp Link | Using `https://wa.me/05397256886` (with leading 0) | Use international format: `https://wa.me/905397256886` (drop the leading 0, add country code 90) |
| WhatsApp Pre-filled Message | No pre-filled text, user has to type from scratch | Add `?text=Merhaba,%20randevu%20almak%20istiyorum` to the URL |
| Google Fonts (if used) | Loading multiple weights via external stylesheet | Use `next/font` for zero-layout-shift, self-hosted font loading |
| Vercel Analytics | Not adding it at all | Free tier includes Web Vitals tracking -- add `@vercel/analytics` to monitor real-user performance |

## Performance Traps

Patterns that work at small scale but fail on real devices.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Parallax on every section | Buttery on desktop, crawling on mobile | Limit parallax to 1-2 sections max; disable on mobile entirely | Any phone below flagship tier |
| Canvas-based particle effects | Cool intro animation, blocks main thread | Use CSS-only alternatives or limit to 50 particles; skip on mobile | Mid-range phones, any phone on battery saver |
| Multiple simultaneous GSAP timelines | Each timeline is fine alone | Use a master timeline or stagger entry so max 3-4 tweens run concurrently | More than 10 simultaneous tweens on mobile |
| CSS `backdrop-filter: blur()` | Frosted glass effect looks premium | Use solid semi-transparent backgrounds on mobile; `backdrop-filter` only on desktop | Any mobile GPU |
| Unthrottled scroll event listeners | Scroll effects feel responsive | Use ScrollTrigger (already throttled) instead of raw scroll events; never `addEventListener('scroll')` | Any device at 60fps target |

## Security Mistakes

Domain-specific security issues for this project.

| Mistake | Risk | Prevention |
|---------|------|------------|
| Exposing personal phone in page source without obfuscation | Spam bots scrape phone numbers from HTML | Accept the risk -- it is a public business number, already on Google. No action needed. |
| Google Maps API key in client bundle (if using JS API) | Key theft, quota abuse, billing | Use iframe embed (no API key needed) instead of the JavaScript Maps API |
| No Content Security Policy headers | XSS risk if any dynamic content added later | Add basic CSP headers in `next.config.js` since the site is fully static |

## UX Pitfalls

Common user experience mistakes for barber shop websites with heavy animations.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Intro animation blocks content for 3+ seconds | User bounces before seeing anything useful; mobile users on slow connections wait even longer | Keep intro under 1.5 seconds, or make it skippable, or animate content in progressively rather than blocking |
| WhatsApp button hidden until scroll or behind animation | User came to book, cannot find the CTA | Floating WhatsApp button visible at ALL times on mobile, even during intro animation |
| Gallery loads all images at once | 7+ full-size photos = page freeze on mobile | Lazy load with blur placeholders; show 2-3 initially, load more on scroll |
| Animations replay on back-navigation | Returning user sees the same intro again, frustrating | Use sessionStorage flag: `if (!sessionStorage.getItem('visited')) { playIntro(); }` |
| Tiny tap targets on mobile | Barber's customers have large, working hands | Minimum 48x48px touch targets; WhatsApp button should be prominent (56px+ round) |
| Dark theme with low-contrast text | Vintage aesthetic hurts readability, especially in bright sunlight (checking phone outside the shop) | Ensure WCAG AA contrast ratios (4.5:1 minimum) even with the dark/gold palette |

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **Hero animation:** Often missing `prefers-reduced-motion` support -- verify animations are disabled/simplified when user has reduced motion enabled in OS settings
- [ ] **WhatsApp link:** Often uses domestic format (0539...) -- verify international format (905397256886) works on both mobile and desktop WhatsApp
- [ ] **Google Maps embed:** Often embeds address pin -- verify it links to the actual Google Business Profile
- [ ] **Image alt texts:** Often generic ("image1") -- verify all images have Turkish descriptive alt text for SEO and accessibility
- [ ] **Mobile animations:** Often "works on iPhone 15" -- verify on throttled Chrome DevTools (4x CPU slowdown) simulating a budget Android
- [ ] **Meta tags:** Often has default Next.js title -- verify Turkish title, description, and OG image are set for every route
- [ ] **Working hours display:** Often hardcoded without noting "Pazar kapali" -- verify the Sunday-closed status is clearly shown
- [ ] **Scroll animations on short viewports:** Often tuned for 1080p -- verify ScrollTrigger start/end positions work on phones (640px height)
- [ ] **Font loading:** Often causes layout shift on slow connections -- verify `next/font` is used with `display: swap`

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| GSAP/Framer Motion conflict on shared elements | LOW | Audit all animated elements; assign each to exactly one library; extract conflicting animations to separate components |
| ScrollTrigger memory leaks | MEDIUM | Refactor all GSAP code to use `useGSAP()` hook; add `ScrollTrigger.killAll()` to route change events as temporary fix |
| Mobile performance failure | HIGH | Requires rearchitecting animation tiers; cannot easily bolt on mobile optimization after building desktop-first complex animations. Prevention is 5x cheaper. |
| Hydration errors | LOW | Add `"use client"` to animation components; set CSS initial states matching animation start values |
| Unoptimized images | LOW | Batch process through `sharp` or `squoosh`; update `next/image` components with `sizes` and `priority` |
| Missing local SEO | MEDIUM | Add JSON-LD, meta tags, and GBP embed; takes 2-4 weeks for Google to re-index and reflect changes |

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| GSAP/Framer Motion conflict | Phase 1: Foundation | Code review checklist: no element has both `useGSAP` ref and `motion.*` wrapper |
| ScrollTrigger memory leaks | Phase 1: Foundation | Navigate between pages 10 times; check Chrome DevTools Memory tab for increasing heap |
| Mobile performance | Phase 1: Foundation (architecture), every phase (testing) | Lighthouse mobile >= 90 on every deploy |
| Hydration errors | Phase 1: Foundation | Zero hydration warnings in browser console during development |
| Unoptimized images | Phase 2: Content/Assets | No image file over 300KB in `public/`; LCP under 2.5s |
| Local SEO negligence | Phase 3: SEO/Polish | Google Rich Results Test passes for BarberShop schema; "susehri berber" query shows site within 4 weeks of deploy |
| Intro animation too long | Phase 2: Animations | Stopwatch test: content visible within 1.5s of page load |
| WhatsApp button hidden | Phase 2: Layout | Floating button visible on mobile at every scroll position |
| `prefers-reduced-motion` ignored | Phase 2: Animations | Toggle reduced motion in OS; verify all animations stop |
| Replay intro on back-nav | Phase 3: Polish | Navigate away and back; intro should not replay |

## Sources

- [GSAP + React official guide](https://gsap.com/resources/React/) -- useGSAP() hook documentation (HIGH confidence)
- [GSAP ScrollTrigger cleanup in React](https://gsap.com/community/forums/topic/35810-scrolltrigger-and-react-component-cycle-cleanup/) -- memory leak patterns
- [Next.js 15 hydration error discussion](https://gsap.com/community/forums/topic/43281-hydration-error-in-nextjs-15/) -- GSAP-specific hydration issues
- [Framer Motion vs GSAP performance comparison](https://blog.uavdevelopment.io/blogs/comparing-the-performance-of-framer-motion-and-gsap-animations-in-next-js) -- benchmark data (MEDIUM confidence)
- [Next.js Image optimization docs](https://nextjs.org/docs/app/api-reference/components/image) -- LCP optimization patterns (HIGH confidence)
- [WCAG 2.3.3: Animation from Interactions](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html) -- accessibility requirements (HIGH confidence)
- [Local SEO best practices for Google Maps embedding](https://seeders.com/blog/local-seo-best-practices-for-embedding-google-maps-and-directions-on-your-website/) -- GBP embed vs address pin (MEDIUM confidence)
- [Tailwind CSS v4 upgrade guide](https://tailwindcss.com/docs/upgrade-guide) -- breaking changes from v3 (HIGH confidence)
- [Why modern websites remove heavy animations](https://www.gomilestone.com/blog/why-websites-are-removing-heavy-animations) -- mobile performance impact (MEDIUM confidence)
- [Optimizing GSAP in Next.js 15](https://medium.com/@thomasaugot/optimizing-gsap-animations-in-next-js-15-best-practices-for-initialization-and-cleanup-2ebaba7d0232) -- initialization patterns (MEDIUM confidence)

---
*Pitfalls research for: Barber shop website with heavy animations (Dejavu Erkek Kuaforu)*
*Researched: 2026-04-01*
