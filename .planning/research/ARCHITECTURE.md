# Architecture Research

**Domain:** Barber shop promotional website with heavy animations (single-page scroll + gallery)
**Researched:** 2026-04-01
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │
│  │  Layout   │  │  Nav /   │  │  Page    │  │  Animation       │ │
│  │  Shell    │  │  WhatsApp │  │  Sections│  │  System          │ │
│  │          │  │  FAB      │  │          │  │  (GSAP+Framer)   │ │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────────────┘ │
│       │              │             │              │               │
├───────┴──────────────┴─────────────┴──────────────┴───────────────┤
│                     SECTION COMPONENTS                            │
│  ┌────────┐ ┌──────────┐ ┌──────────┐ ┌─────────┐ ┌───────────┐ │
│  │  Hero  │ │ Hakkimiz │ │ Hizmetler│ │ Iletisim│ │  Galeri   │ │
│  │        │ │ (About)  │ │(Services)│ │(Contact)│ │ (Gallery) │ │
│  └────────┘ └──────────┘ └──────────┘ └─────────┘ └───────────┘ │
│                                                                   │
├───────────────────────────────────────────────────────────────────┤
│                     SHARED / UTILITIES                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │
│  │  Static  │  │  UI      │  │  Hooks   │  │  Animation       │ │
│  │  Data    │  │  Atoms   │  │          │  │  Primitives      │ │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘ │
└───────────────────────────────────────────────────────────────────┘
```

This is a static promotional site with zero backend. All data is hardcoded. The complexity lives entirely in the presentation and animation layers.

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| Layout Shell | Root layout, font loading, metadata, smooth scroll wrapper | `app/layout.tsx` (Server Component) |
| Navigation | Scroll-to-section links, mobile hamburger, active section tracking | Client component with `IntersectionObserver` |
| WhatsApp FAB | Floating action button, always visible, links to WhatsApp API | Client component, fixed position, pulse animation |
| Hero Section | Full-screen intro, shop name with neon glow, entrance animation | Client component, GSAP timeline for intro sequence |
| Hakkimizda (About) | Shop story, team info, scroll-reveal content | Client component, Framer Motion scroll animations |
| Hizmetler (Services) | Service cards with prices, categorized | Client component, staggered reveal animations |
| Iletisim (Contact) | Google Maps embed, address, phone, working hours | Hybrid: map iframe lazy-loaded, static text |
| Galeri (Gallery) | Separate page, photo grid, lightbox, before/after | Client component, masonry grid, Framer Motion layout |
| Animation System | GSAP plugin registration, ScrollTrigger config, shared presets | Centralized config module + custom hooks |
| Static Data | Services list, prices, contact info, working hours | TypeScript constants file(s) |
| UI Atoms | Buttons, section headings, dividers, neon text effect | Reusable styled components |

## Recommended Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (Server Component) - fonts, metadata
│   ├── page.tsx                # Home page - assembles scroll sections
│   ├── galeri/
│   │   └── page.tsx            # Gallery page
│   └── globals.css             # Tailwind base + custom CSS variables
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Navigation bar with scroll links
│   │   ├── Footer.tsx          # Footer with contact summary
│   │   ├── WhatsAppFAB.tsx     # Floating WhatsApp button
│   │   └── SmoothScroll.tsx    # Lenis/native smooth scroll wrapper
│   ├── sections/
│   │   ├── Hero.tsx            # Hero with intro animation
│   │   ├── About.tsx           # Hakkimizda section
│   │   ├── Services.tsx        # Hizmetler + fiyat listesi
│   │   ├── Contact.tsx         # Iletisim / Konum section
│   │   └── SectionDivider.tsx  # Decorative dividers between sections
│   ├── gallery/
│   │   ├── GalleryGrid.tsx     # Photo grid layout
│   │   ├── GalleryCard.tsx     # Individual photo card
│   │   └── Lightbox.tsx        # Fullscreen photo viewer
│   ├── ui/
│   │   ├── NeonText.tsx        # Neon glow text effect
│   │   ├── SectionHeading.tsx  # Consistent section title style
│   │   ├── ServiceCard.tsx     # Individual service + price card
│   │   └── AnimatedButton.tsx  # CTA button with hover effects
│   └── effects/
│       ├── ParticleField.tsx   # Background particle system (canvas)
│       └── BarberPole.tsx      # Decorative barber pole stripe animation
├── lib/
│   ├── gsap-config.ts          # GSAP plugin registration (centralized)
│   ├── animation-presets.ts    # Shared animation variants/configs
│   └── constants.ts            # Business data: services, prices, hours
├── hooks/
│   ├── useScrollSection.ts     # Track active section via IntersectionObserver
│   ├── useReducedMotion.ts     # Detect prefers-reduced-motion
│   └── useMediaQuery.ts        # Mobile detection for animation reduction
└── public/
    ├── images/                 # Optimized shop photos
    └── fonts/                  # Custom fonts if any
```

### Structure Rationale

- **`components/sections/`:** Each scroll section is its own component. The home page.tsx simply stacks them vertically. This keeps each section isolated and testable.
- **`components/effects/`:** Particle systems and decorative animations isolated from content components. These are the first things to disable on mobile.
- **`components/ui/`:** Reusable atoms shared across sections. The neon text effect, section headings, and service cards are used in multiple places.
- **`lib/gsap-config.ts`:** GSAP plugins (ScrollTrigger, etc.) must be registered once globally, not per-component. This prevents duplicate registration warnings and centralizes the animation system.
- **`lib/constants.ts`:** All business data (services, prices, hours, address) in one file. When the barber changes prices, one file edit updates the whole site.
- **`hooks/`:** Animation-aware hooks handle responsive behavior. `useReducedMotion` and `useMediaQuery` gate heavy animations on mobile.

## Architectural Patterns

### Pattern 1: Dual Animation Library Strategy (GSAP + Framer Motion)

**What:** Use GSAP for complex, timeline-based, scroll-driven animations (hero intro, parallax, particle effects). Use Framer Motion for React-native UI animations (hover states, layout transitions, simple scroll reveals, page transitions).

**When to use:** When you need both cinematic scroll sequences AND React-integrated UI micro-interactions. This matches the reference project (emirhankaya.vercel.app) which uses GSAP for scroll animations with React components.

**Trade-offs:** Adds ~55KB gzipped total bundle. Worth it for portfolio-quality sites. The key is strict separation of concerns -- never animate the same element with both libraries.

**Boundary rules:**
```
GSAP owns:
  - Hero intro timeline (multi-step entrance sequence)
  - ScrollTrigger-driven parallax effects
  - Canvas/particle animations
  - Complex SVG animations
  - Pinned scroll sections

Framer Motion owns:
  - Component mount/unmount transitions
  - Hover/tap micro-interactions
  - Gallery page transition (AnimatePresence)
  - Layout animations (gallery grid reflow)
  - Simple scroll-reveal (whileInView)
```

### Pattern 2: Centralized GSAP Configuration

**What:** Register all GSAP plugins once in a config file, import it in the root client wrapper.

**When to use:** Always when using GSAP with Next.js App Router.

**Trade-offs:** Slight indirection, but prevents the most common GSAP+Next.js bugs (duplicate registration, SSR errors, missing cleanup).

**Example:**
```typescript
// lib/gsap-config.ts
"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger, useGSAP };
```

```typescript
// Any component needing GSAP:
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap-config";
// Never import gsap directly from "gsap" in components
```

### Pattern 3: Progressive Animation Degradation

**What:** Full animations on desktop, reduced on mobile, none on prefers-reduced-motion. Three tiers, not two.

**When to use:** Any animation-heavy site targeting Lighthouse 90+.

**Trade-offs:** Requires checking device capability at render time, which means client components. Accept this -- animation components are client-side by nature.

**Example:**
```typescript
// hooks/useAnimationTier.ts
"use client";
export type AnimationTier = "full" | "reduced" | "none";

export function useAnimationTier(): AnimationTier {
  const prefersReduced = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (prefersReduced) return "none";
  if (isMobile) return "reduced";
  return "full";
}
```

### Pattern 4: Section-Based Scroll Architecture

**What:** Each major content block is an independent section component with its own scroll trigger setup. The home page is a vertical stack of these sections. Navigation uses hash anchors + smooth scroll.

**When to use:** Single-page scroll sites with distinct content blocks.

**Trade-offs:** Simple and effective. Each section manages its own animations via `useGSAP` with a scoped container ref, ensuring proper cleanup.

**Example:**
```typescript
// app/page.tsx (Server Component - no "use client" needed)
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Contact />
    </main>
  );
}
```

## Data Flow

### Page Load Flow

```
Browser Request
    |
    v
Next.js Server (Vercel Edge)
    |
    v
Root Layout (Server Component)
    |- Loads fonts, sets metadata, renders shell
    |- Renders Navbar (Client) + SmoothScroll wrapper (Client)
    |
    v
Home Page (Server Component)
    |- Renders section components in order
    |- Each section is "use client" (animations need browser APIs)
    |
    v
Client Hydration
    |- GSAP config loads, plugins register
    |- Each section's useGSAP fires, creates ScrollTriggers
    |- ScrollTrigger.refresh() after all sections mounted
    |- Particle effects initialize on canvas
    |- WhatsApp FAB appears with entrance animation
```

### User Interaction Flow

```
[User scrolls]
    |
    v
[ScrollTrigger detects viewport position]
    |
    v
[Section animations fire] -----> [Navbar active state updates]
    |                                    (IntersectionObserver)
    v
[Parallax layers shift]
[Content reveals]
[Service cards stagger in]

[User clicks "Randevu Al" / WhatsApp FAB]
    |
    v
[window.open("https://wa.me/905397256886?text=...")]
    |
    v
[WhatsApp opens with pre-filled message]

[User clicks "Galeri" in nav]
    |
    v
[Next.js client navigation to /galeri]
    |
    v
[Page transition animation (Framer Motion AnimatePresence)]
    |
    v
[Gallery grid renders with staggered entrance]
```

### Static Data Flow

```
lib/constants.ts (single source of truth)
    |
    ├──> Services section (service names, prices, categories)
    ├──> Contact section (address, phone, hours)
    ├──> WhatsApp FAB (phone number, pre-filled message)
    ├──> Navbar (section labels)
    └──> SEO metadata in layout.tsx (business name, description)
```

No API calls. No database. No CMS. All data flows from a single TypeScript constants file into components at build time. This is the correct architecture for a site where the barber owner updates content by asking the developer.

## Anti-Patterns

### Anti-Pattern 1: Animating the Same Element with Both GSAP and Framer Motion

**What people do:** Apply Framer Motion's `motion.div` with `animate` props on the same element that GSAP's ScrollTrigger also targets.

**Why it's wrong:** Both libraries fight over the `transform` property. Animations stutter, elements jump to wrong positions, or animations simply break. Each library maintains its own internal state for transforms.

**Do this instead:** One element, one animation owner. Use a wrapper div if needed -- outer div for GSAP scroll triggers, inner div for Framer Motion hover states.

### Anti-Pattern 2: Registering GSAP Plugins Per Component

**What people do:** Call `gsap.registerPlugin(ScrollTrigger)` inside each component that uses it.

**Why it's wrong:** Causes duplicate registration warnings, potential race conditions during hydration, and makes it unclear which plugins are available.

**Do this instead:** Single `gsap-config.ts` file that registers everything once. All components import from this file.

### Anti-Pattern 3: No Animation Cleanup on Route Change

**What people do:** Create ScrollTrigger instances without the `useGSAP` hook or without manual cleanup.

**Why it's wrong:** When navigating from home to gallery and back, old ScrollTrigger instances persist. Scroll positions trigger animations for elements that no longer exist. Memory leaks accumulate.

**Do this instead:** Always use `useGSAP` from `@gsap/react` with a scope ref. It auto-reverts all GSAP instances on unmount.

### Anti-Pattern 4: Heavy Canvas Animations Without Mobile Detection

**What people do:** Run particle effects, parallax layers, and complex shader backgrounds on all devices.

**Why it's wrong:** Mobile GPUs cannot handle it. Page becomes janky, battery drains, Lighthouse performance score tanks below 50.

**Do this instead:** Use `useAnimationTier()` hook. On mobile: disable particles, reduce parallax layers, simplify or remove canvas effects. On reduced-motion: disable all non-essential animations.

### Anti-Pattern 5: Google Maps Iframe Loaded Eagerly

**What people do:** Embed Google Maps iframe at the bottom of the page without lazy loading.

**Why it's wrong:** Maps iframe loads ~500KB+ of resources on initial page load, even though the contact section is below the fold. Kills LCP and TTI scores.

**Do this instead:** Use `loading="lazy"` on the iframe, or render a static map image that swaps to the interactive embed on click/viewport entry.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| WhatsApp | `https://wa.me/905397256886?text=encoded_message` | URL-based, no API key needed. Pre-fill message with service name if clicked from a specific service card. |
| Google Maps | `<iframe>` embed with lazy loading | Use embed URL, not API key version. Lazy load with IntersectionObserver or native `loading="lazy"`. |
| Vercel | `next build` + git push | Zero-config deployment. Static output mode (`output: 'export'`) is possible but not needed -- default SSR/ISR gives better performance with image optimization. |
| Google Fonts | `next/font/google` | Self-hosted via Next.js font optimization. No external requests at runtime. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Server Components <-> Client Components | Props drilling, no context crossing | Layout is server, sections are client. Keep the boundary clean -- pass only serializable props. |
| GSAP System <-> Framer Motion | No direct communication | They do not interact. GSAP owns scroll-driven effects, Framer owns UI micro-interactions. Separate DOM elements. |
| Section Components <-> Static Data | Direct import from constants | No state management needed. Each section imports what it needs from `lib/constants.ts`. |
| Navbar <-> Sections | IntersectionObserver events | Navbar watches section refs to highlight active link. No prop drilling -- observer runs independently. |
| Home Page <-> Gallery Page | Next.js App Router navigation | Page transition handled by Framer Motion AnimatePresence in a `template.tsx` wrapper. |

## Build Order (Dependencies)

This defines what must be built before what:

```
Phase 1: Foundation (no animation dependencies)
    ├── Project setup (Next.js 15, Tailwind 4, TypeScript)
    ├── Static data file (constants.ts)
    ├── Root layout + fonts + metadata
    └── Basic section shells (HTML structure, no animation)

Phase 2: Core Sections (depends on Phase 1)
    ├── Navbar with scroll-to-section
    ├── Hero section (static version first)
    ├── Services section with cards + prices
    ├── Contact section with lazy map
    ├── About section
    └── WhatsApp FAB (static, always visible)

Phase 3: Animation System (depends on Phase 2 structure)
    ├── GSAP config + useGSAP setup
    ├── Animation tier hook (desktop/mobile/reduced-motion)
    ├── Hero intro timeline (GSAP)
    ├── Section scroll reveals (Framer Motion whileInView)
    ├── Service card stagger animations
    └── Navbar active section tracking

Phase 4: Gallery Page (can parallel with Phase 3)
    ├── Gallery page route
    ├── Photo grid layout
    ├── Lightbox component
    └── Page transition animation

Phase 5: Polish & Effects (depends on Phase 3)
    ├── Particle/decorative effects (desktop only)
    ├── Parallax layers
    ├── Neon text glow effects
    ├── Section divider animations
    ├── Smooth scroll (Lenis or native)
    └── Mobile animation reduction

Phase 6: Optimization & Deploy (depends on all)
    ├── Image optimization (next/image, WebP)
    ├── Lighthouse audit + fixes
    ├── SEO meta tags
    └── Vercel deployment
```

**Key dependency insight:** Build all sections as static HTML/CSS first (Phase 2), then layer animations on top (Phase 3). This ensures the site works without JavaScript and provides a fallback for animation failures. Never build animation and content simultaneously -- it makes debugging impossible.

## Sources

- [Optimizing GSAP Animations in Next.js 15](https://medium.com/@thomasaugot/optimizing-gsap-animations-in-next-js-15-best-practices-for-initialization-and-cleanup-2ebaba7d0232)
- [Setting Up GSAP with Next.js: 2025 Edition](https://javascript.plainenglish.io/setting-up-gsap-with-next-js-2025-edition-bcb86e48eab6)
- [GSAP React Documentation](https://gsap.com/resources/React/)
- [Next.js Project Structure Documentation](https://nextjs.org/docs/app/getting-started/project-structure)
- [Framer Motion + GSAP Scroll Animations](https://medium.com/front-end-weekly/how-to-create-amazing-scroll-based-animations-with-gsap-scrolltrigger-and-framer-motion-c17482ab3f4)
- [Motion (Framer Motion) Official Docs](https://motion.dev/)
- [Next.js 15 Folder Structure Best Practices](https://dev.to/bajrayejoon/best-practices-for-organizing-your-nextjs-15-2025-53ji)
- [Reference project: emirhankaya.vercel.app](https://emirhankaya.vercel.app)

---
*Architecture research for: Dejavu Erkek Kuaforu barber shop website*
*Researched: 2026-04-01*
