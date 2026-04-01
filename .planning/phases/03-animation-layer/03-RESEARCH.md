# Phase 3: Animation Layer - Research

**Researched:** 2026-04-01
**Domain:** GSAP ScrollTrigger animations, Motion (Framer Motion) page transitions, CSS particle effects, neon glow, parallax
**Confidence:** HIGH

## Summary

Phase 3 adds portfolio-grade animations to the existing static content: a DEJAVU neon intro sequence, scroll-reveal animations on all sections, hero parallax, CSS smoke/steam particles (desktop only), neon glow hover effects, and page transitions between home and gallery. The project already has a solid animation infrastructure from Phase 1 (GSAP + ScrollTrigger + useGSAP registered, useAnimationTier 3-tier system, Lenis smooth scroll on desktop, AnimationProvider). The key technical challenges are: (1) the neon intro sequence with letter-by-letter GSAP timeline + sessionStorage gating, (2) the FrozenRouter pattern needed for AnimatePresence page transitions with Next.js App Router, and (3) ensuring zero performance impact on mobile by conditionally rendering heavy effects.

All section components (Hero, About, Services, Contact) are currently server components. Scroll reveal and hover animations require client wrappers or converting to client components. The established pattern from AnimationDemo.tsx (useGSAP with scope + class selectors for GSAP, motion.div for hover) should be followed consistently.

**Primary recommendation:** Use GSAP timelines for the intro sequence and ScrollTrigger for scroll-reveal/parallax (heavy orchestration), Motion AnimatePresence with FrozenRouter for page transitions (route-aware), and pure CSS @keyframes for smoke particles (GPU-composited, zero JS overhead).

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Intro animation: 2-3s total, DEJAVU letters light up randomly one by one with neon glow, slogan fades in after, black background, skip on click/tap anywhere, curtain-up reveal to hero, sessionStorage control, shown on both desktop and mobile
- Scroll reveal: slide-up 30-50px + fade-in, trigger at 20% visible, stagger 0.1-0.15s, GSAP ScrollTrigger
- Parallax: Hero background only, 0.3-0.5x speed, desktop only (full tier), GSAP ScrollTrigger
- Smoke/steam: CSS animated divs (@keyframes, GPU-accelerated), hero bottom 30-40%, white/gray 10-20% opacity, 8-12 particles, slow upward drift, fade out on scroll past hero, desktop only, mobile DOM excluded entirely
- Mobile (reduced tier): Only simple scroll reveal + navbar + menu animation. No parallax, particles, or complex timelines
- prefers-reduced-motion (none tier): Zero animations, instant transitions
- Neon glow hover: text-shadow 0 0 10px, red #E11D48, 0.2-0.3s transition, on DEJAVU logo, CTA buttons, active scroll-spy line, hero heading
- Service cards: NO neon glow, only translateY 2-4px + shadow deepening (Motion whileHover)
- Page transition: Fade out/in with Motion AnimatePresence, layout.tsx wrapper

### Claude's Discretion
- Intro letter burn duration per letter (ms values)
- Scroll reveal exact offset (30px vs 50px range)
- Parallax exact speed factor (0.3-0.5 range)
- Smoke particle exact size and blur values
- Page transition exact duration
- Stagger delay exact values (0.1-0.15 range)
- CSS @keyframes details for smoke movement

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| ANIM-01 | DEJAVU neon intro animation (skippable, sessionStorage) | GSAP timeline with stagger, text-shadow animation, sessionStorage check, click/tap skip handler, curtain-up exit animation |
| ANIM-02 | Scroll reveal fade-in/slide-up on sections | GSAP ScrollTrigger with `from()` opacity:0/y:30-50, threshold 20%, stagger for child elements |
| ANIM-03 | Parallax background layers at different speeds | GSAP ScrollTrigger with scrub:true on hero background image, yPercent animation, desktop-only via tier check |
| ANIM-04 | Desktop smoke/steam particles (mobile disabled) | Pure CSS @keyframes with transform:translate3d for GPU compositing, conditional render via tier, 8-12 particle divs |
| ANIM-05 | Mobile: simple scroll-reveal only, no parallax/particles | useAnimationTier "reduced" tier gating -- early return for complex animations, conditional component rendering |
| ANIM-06 | Neon glow hover on buttons/headings | CSS transition on text-shadow with neon-glow-subtle class, Motion whileHover for service cards (translateY + shadow) |
</phase_requirements>

## Standard Stack

### Core (Already Installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| gsap | 3.14.2 | Timeline orchestration, ScrollTrigger, scroll-linked animations | Industry standard for complex animation sequences; already registered |
| @gsap/react | 2.1.2 | useGSAP hook for React lifecycle safety | Official GSAP React integration; handles cleanup automatically |
| motion | 12.38.0 | AnimatePresence page transitions, whileHover/whileTap | Best React animation library for route transitions and gesture-driven micro-interactions |
| lenis | 1.3.21 | Smooth scroll (desktop) with GSAP ticker sync | Already integrated in SmoothScrollProvider; ScrollTrigger compatibility |

### Supporting (No New Dependencies)
| Library | Purpose | When to Use |
|---------|---------|-------------|
| CSS @keyframes | Smoke/steam particle animation | GPU-composited transform+opacity animations that run independently of JS |
| sessionStorage | Intro animation replay prevention | Built-in browser API, no library needed |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CSS smoke particles | Canvas/WebGL particles | Canvas is overkill for 8-12 simple smoke puffs; CSS is zero-JS, GPU composited |
| FrozenRouter pattern | next-transition-router package | External dependency for a simple 2-page app; FrozenRouter is ~30 lines of code |
| GSAP for page transitions | GSAP Flip plugin | Motion AnimatePresence is already in the stack and purpose-built for React route transitions |

**No new packages needed.** All animation requirements are covered by existing dependencies.

## Architecture Patterns

### Component Structure for Animations
```
src/
  components/
    animations/
      IntroOverlay.tsx       # DEJAVU neon intro sequence (client)
      ScrollReveal.tsx       # Reusable scroll-reveal wrapper (client)
      SmokeParticles.tsx     # CSS smoke effect for hero (client)
      PageTransition.tsx     # AnimatePresence + FrozenRouter wrapper (client)
    sections/
      Hero.tsx               # Add parallax via client wrapper
      About.tsx              # Wrap content with ScrollReveal
      Services.tsx           # Wrap with ScrollReveal, cards get hover
      ServiceCard.tsx        # Add Motion whileHover (client)
      Contact.tsx            # Wrap content with ScrollReveal
    gallery/
      GalleryGrid.tsx        # Add stagger scroll reveal to grid items
```

### Pattern 1: Reusable ScrollReveal Wrapper
**What:** A client component that wraps any section content and applies GSAP ScrollTrigger fade-in/slide-up
**When to use:** Every section that needs scroll-triggered entrance animation
**Example:**
```typescript
"use client";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap-config";
import { useAnimationTier } from "@/hooks/useAnimationTier";

export function ScrollReveal({
  children,
  stagger = false,
  className = "",
}: {
  children: React.ReactNode;
  stagger?: boolean;
  className?: string;
}) {
  const container = useRef<HTMLDivElement>(null);
  const tier = useAnimationTier();

  useGSAP(
    () => {
      if (tier === "none") return;

      const targets = stagger
        ? gsap.utils.toArray(".scroll-reveal-item", container.current!)
        : [container.current!];

      gsap.from(targets, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
        stagger: stagger ? 0.12 : 0,
        scrollTrigger: {
          trigger: container.current!,
          start: "top 80%",  // ~20% visible
          toggleActions: "play none none none",
        },
      });
    },
    { scope: container, dependencies: [tier] }
  );

  return (
    <div ref={container} className={className}>
      {children}
    </div>
  );
}
```

### Pattern 2: GSAP Timeline for Intro Sequence
**What:** A GSAP timeline that orchestrates the full intro: letter reveal -> slogan fade-in -> curtain up
**When to use:** IntroOverlay component, plays once per session
**Example:**
```typescript
"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { gsap, useGSAP } from "@/lib/gsap-config";

export function IntroOverlay({ children }: { children: React.ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem("intro-seen")) {
      setShow(false);
      return;
    }
    setShow(true);
  }, []);

  const skip = useCallback(() => {
    if (tlRef.current) {
      tlRef.current.progress(1); // Jump to end
    }
  }, []);

  useGSAP(
    () => {
      if (!show) return;

      const letters = gsap.utils.toArray(".intro-letter", overlayRef.current!);
      // Shuffle for random order
      const shuffled = [...letters].sort(() => Math.random() - 0.5);

      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("intro-seen", "1");
        },
      });

      // Phase 1: Letters light up randomly
      tl.from(shuffled, {
        opacity: 0,
        textShadow: "0 0 0px transparent",
        duration: 0.2,
        stagger: 0.15,
        ease: "power2.in",
      });

      // Phase 2: Full glow pulse
      tl.to(".intro-letter", {
        textShadow: "0 0 10px #E11D48, 0 0 40px rgba(225,29,72,0.5)",
        duration: 0.4,
        ease: "power2.out",
      });

      // Phase 3: Slogan fade in
      tl.from(".intro-slogan", {
        opacity: 0,
        y: 10,
        duration: 0.5,
      });

      // Phase 4: Hold briefly
      tl.to({}, { duration: 0.3 });

      // Phase 5: Curtain up
      tl.to(overlayRef.current!, {
        yPercent: -100,
        duration: 0.8,
        ease: "power3.inOut",
      });

      tl.call(() => setShow(false));

      tlRef.current = tl;
    },
    { scope: overlayRef, dependencies: [show] }
  );

  if (!show) return null;

  return (
    <div
      ref={overlayRef}
      onClick={skip}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center cursor-pointer"
    >
      {/* Letter spans and slogan rendered here */}
    </div>
  );
}
```

### Pattern 3: FrozenRouter for Page Transitions
**What:** Preserves React context during AnimatePresence exit animations in Next.js App Router
**When to use:** Layout wrapper for page transitions between / and /galeri
**Example:**
```typescript
"use client";
import { useContext, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useSelectedLayoutSegment } from "next/navigation";

function usePreviousValue<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function FrozenRouter({ children }: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const prevContext = usePreviousValue(context) || null;
  const segment = useSelectedLayoutSegment();
  const prevSegment = usePreviousValue(segment);
  const changed = segment !== prevSegment &&
    segment !== undefined && prevSegment !== undefined;

  return (
    <LayoutRouterContext.Provider value={changed ? prevContext : context}>
      {children}
    </LayoutRouterContext.Provider>
  );
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const segment = useSelectedLayoutSegment();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={segment}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
}
```

### Pattern 4: CSS Smoke Particles (Zero JS)
**What:** Pure CSS @keyframes smoke effect using GPU-composited transforms
**When to use:** Hero section bottom area, desktop only
**Example:**
```css
@keyframes smoke-rise {
  0% {
    transform: translate3d(0, 0, 0) scale(0.8);
    opacity: 0;
  }
  20% {
    opacity: 0.15;
  }
  100% {
    transform: translate3d(20px, -120px, 0) scale(1.5);
    opacity: 0;
  }
}

.smoke-particle {
  position: absolute;
  width: 80px;
  height: 80px;
  background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(20px);
  animation: smoke-rise 6s ease-out infinite;
  will-change: transform, opacity;
}
```

### Anti-Patterns to Avoid
- **Converting server components to client unnecessarily:** Wrap with a client animation component instead of making the whole section client. Keep Hero.tsx as server component, add a `HeroAnimationWrapper` client component around it.
- **GSAP on motion.div elements:** GSAP and Motion must never target the same DOM element. GSAP uses class selectors; Motion uses motion.div components.
- **Running animations without tier check:** Every animation component MUST check `useAnimationTier()` and return early or skip for "none" tier. "reduced" tier should only get simple fade/slide.
- **Importing GSAP directly:** Always import from `@/lib/gsap-config` to ensure singleton plugin registration.
- **Using requestAnimationFrame loops for particles:** CSS @keyframes are more performant and automatically handled by the compositor thread.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll-triggered animations | IntersectionObserver + manual animation | GSAP ScrollTrigger | Handles all edge cases: refresh mid-page, resize, Lenis integration, scrub |
| Page transitions in App Router | Custom unmount delay logic | AnimatePresence + FrozenRouter | Route context management is complex; FrozenRouter pattern is battle-tested |
| Smooth scroll + ScrollTrigger sync | Manual RAF loop | Lenis + GSAP ticker (already done) | SmoothScrollProvider already handles this correctly |
| Text splitting for intro | Manual string.split + span wrapping | Simple map over characters array | "DEJAVU" is only 6 characters; no need for SplitText plugin |
| Animation tier detection | Manual matchMedia checks | useAnimationTier() hook (already done) | Hook already handles desktop/mobile/reduced-motion with proper SSR default |

## Common Pitfalls

### Pitfall 1: ScrollTrigger + Lenis Desync
**What goes wrong:** ScrollTrigger animations fire at wrong scroll positions or don't fire at all
**Why it happens:** Lenis virtualizes scroll position; ScrollTrigger needs to be told about it
**How to avoid:** SmoothScrollProvider already syncs Lenis scroll events to `ScrollTrigger.update`. Verify this sync is active before adding ScrollTrigger animations. On mobile where Lenis is disabled, native scroll works fine with ScrollTrigger.
**Warning signs:** Animations trigger too early/late or not at all on desktop

### Pitfall 2: Hydration Mismatch with Tier-Conditional Rendering
**What goes wrong:** Server renders "reduced" tier content, client detects "full" tier, React throws hydration error
**Why it happens:** useAnimationTier defaults to "reduced" (SSR-safe), then updates to "full" on desktop after mount
**How to avoid:** Use the existing pattern from AnimationDemo: initial state hides animated elements (`opacity: 0` via style), animation reveals them after tier stabilizes. Never conditionally render different DOM structure based on tier during SSR -- use CSS display/opacity or render after mount.
**Warning signs:** Console hydration warnings, flash of wrong content

### Pitfall 3: Intro Overlay Blocking Interaction
**What goes wrong:** Intro overlay covers the page but scroll/click doesn't work after it finishes
**Why it happens:** Overlay div remains in DOM with `position: fixed; z-index: 100` after animation completes
**How to avoid:** Remove overlay from DOM entirely after animation completes (`setShow(false)` in timeline onComplete). The `yPercent: -100` animation slides it up, then state change removes it.
**Warning signs:** Unable to scroll or click after intro plays

### Pitfall 4: FrozenRouter Using Internal Next.js API
**What goes wrong:** Page transitions break after Next.js update
**Why it happens:** `LayoutRouterContext` is imported from `next/dist/shared/lib/app-router-context.shared-runtime` which is not a public API
**How to avoid:** Pin the Next.js version (16.2.2) and test after any upgrade. This is a known community pattern but relies on internal API. Alternative: use simple CSS fade transition on template.tsx without AnimatePresence exit animations.
**Warning signs:** Import error or TypeScript error after Next.js update

### Pitfall 5: GSAP Animations Running Before Mount
**What goes wrong:** GSAP targets elements that don't exist yet, animations silently fail
**Why it happens:** useGSAP fires but DOM elements haven't rendered (conditional rendering, async data)
**How to avoid:** Always use `scope` option in useGSAP to limit targeting. Use the `dependencies` array to re-run when conditions change. Use `ready` state pattern from AnimationDemo if needed.
**Warning signs:** No animation plays, no error in console

### Pitfall 6: Smoke Particles Causing Repaints
**What goes wrong:** Janky scroll performance, dropped frames
**Why it happens:** CSS filter:blur() or non-composited properties trigger paint
**How to avoid:** Use only `transform` and `opacity` in @keyframes. Apply `will-change: transform, opacity` to particle elements. Use `filter: blur()` only on initial style (not animated). Keep particle count to 8-12 max.
**Warning signs:** DevTools paint flashing on hero section during scroll

## Code Examples

### ScrollTrigger Parallax on Hero Background
```typescript
// Inside a client wrapper component for Hero
useGSAP(() => {
  if (tier !== "full") return;

  gsap.to(".hero-bg-image", {
    yPercent: -15, // moves image 15% up over scroll distance
    ease: "none",
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top top",
      end: "bottom top",
      scrub: 0.5, // smooth 0.5s lag behind scroll
    },
  });
}, { dependencies: [tier] });
```

### Neon Glow Hover (CSS-only approach)
```css
/* Add to globals.css */
.neon-hover-glow {
  transition: text-shadow 0.25s ease;
}
.neon-hover-glow:hover {
  text-shadow:
    0 0 7px #E11D48,
    0 0 10px #E11D48,
    0 0 21px #E11D48;
}
```

### Service Card Hover (Motion)
```typescript
"use client";
import { motion } from "motion/react";
import { useAnimationTier } from "@/hooks/useAnimationTier";

export function ServiceCard({ name, description, icon }: Props) {
  const tier = useAnimationTier();

  return (
    <motion.div
      className="retro-card p-6 bg-base-medium"
      whileHover={
        tier !== "none"
          ? { y: -3, boxShadow: "0 8px 30px rgba(0,0,0,0.4)" }
          : undefined
      }
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {/* card content */}
    </motion.div>
  );
}
```

### Conditional Smoke Particles (Desktop Only)
```typescript
"use client";
import { useAnimationTier } from "@/hooks/useAnimationTier";

export function SmokeParticles() {
  const tier = useAnimationTier();

  // Mobile: don't even render DOM nodes
  if (tier !== "full") return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[40%] overflow-hidden pointer-events-none">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="smoke-particle"
          style={{
            left: `${10 + i * 8}%`,
            bottom: `${Math.random() * 20}%`,
            animationDelay: `${i * 0.6}s`,
            animationDuration: `${5 + Math.random() * 3}s`,
            width: `${60 + Math.random() * 40}px`,
            height: `${60 + Math.random() * 40}px`,
          }}
        />
      ))}
    </div>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| gsap.context() for cleanup | useGSAP hook with scope | @gsap/react 2.x (2024) | Automatic cleanup, React 18+ compatible |
| framer-motion package | motion package (renamed) | 2024 | Import from "motion/react" not "framer-motion" |
| Manual IntersectionObserver | ScrollTrigger `toggleActions` | GSAP 3.x | Handles all scroll edge cases automatically |
| Canvas particle systems | CSS @keyframes + will-change | Ongoing | For simple effects, CSS is more performant (compositor thread) |
| Pages Router AnimatePresence | App Router FrozenRouter pattern | Next.js 13+ (2023) | Required because App Router manages component lifecycle differently |

**Deprecated/outdated:**
- `framer-motion` package name: now `motion`, import from `motion/react`
- `gsap.context()` in React: replaced by `useGSAP` hook
- `ScrollTrigger.create()` alone: prefer `scrollTrigger` property inside `gsap.to/from/fromTo` for simpler code

## Open Questions

1. **FrozenRouter stability with Next.js 16**
   - What we know: The pattern works with Next.js 14-15; import path is `next/dist/shared/lib/app-router-context.shared-runtime`
   - What's unclear: Whether Next.js 16.2.2 has changed this internal API path
   - Recommendation: Test the import during implementation. If it fails, fall back to simpler template.tsx fade-in-only approach (no exit animation needed for a 2-page site)

2. **ScrollTrigger refresh timing with dynamic content**
   - What we know: Gallery page loads images lazily, which can shift layout
   - What's unclear: Whether ScrollTrigger needs manual `refresh()` after images load
   - Recommendation: Call `ScrollTrigger.refresh()` after gallery images have loaded, or use `invalidateOnRefresh: true`

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Manual visual testing + Lighthouse |
| Config file | none -- visual animations are not unit-testable |
| Quick run command | `npm run dev` (visual inspection) |
| Full suite command | `npm run build && npm run start` (production behavior) |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| ANIM-01 | Intro plays on first visit, skips on second | manual | Open in incognito, click through, reload | N/A |
| ANIM-02 | Sections fade-in on scroll | manual | Scroll through page, verify animations trigger | N/A |
| ANIM-03 | Hero parallax on desktop | manual | Scroll on desktop viewport, verify background moves slower | N/A |
| ANIM-04 | Smoke particles visible desktop, absent mobile | manual | Toggle DevTools responsive mode | N/A |
| ANIM-05 | Mobile shows only simple reveals | manual | Mobile viewport in DevTools, verify no parallax/particles | N/A |
| ANIM-06 | Neon glow on hover | manual | Hover over CTA, logo, heading | N/A |

### Sampling Rate
- **Per task commit:** `npm run build` (ensures no build errors)
- **Per wave merge:** Visual inspection of all animations on desktop + mobile viewport
- **Phase gate:** Full build + Lighthouse performance check + visual QA on both viewports

### Wave 0 Gaps
None -- animation testing is inherently visual/manual. Build verification (`npm run build`) confirms no runtime errors.

## Sources

### Primary (HIGH confidence)
- Project codebase: `src/lib/gsap-config.ts`, `src/hooks/useAnimationTier.ts`, `src/components/providers/SmoothScrollProvider.tsx` -- existing animation infrastructure
- Project codebase: `src/components/demo/AnimationDemo.tsx` -- established GSAP + Motion patterns
- GSAP official docs: ScrollTrigger configuration, scrub, toggleActions
- Motion docs: AnimatePresence, whileHover, motion.div

### Secondary (MEDIUM confidence)
- [FrozenRouter pattern for Next.js App Router](https://www.imcorfitz.com/posts/adding-framer-motion-page-transitions-to-next-js-app-router) -- Widely used community pattern, uses internal Next.js API
- [GSAP ScrollTrigger parallax pattern](https://codepen.io/GreenSock/pen/JjYPQpN) -- Official GSAP CodePen example
- [CSS smoke animation techniques](https://solution-smith.com/diy/css/animation/smoke/) -- Pure CSS approach

### Tertiary (LOW confidence)
- `LayoutRouterContext` import path for Next.js 16 -- verified for Next.js 14-15, unverified for 16.2.2

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - all libraries already installed and integrated in Phase 1
- Architecture: HIGH - patterns established in AnimationDemo.tsx, clear separation of concerns
- Pitfalls: HIGH - well-documented issues with GSAP+Next.js hydration, Lenis sync, FrozenRouter
- Page transitions: MEDIUM - FrozenRouter relies on internal Next.js API; may need fallback

**Research date:** 2026-04-01
**Valid until:** 2026-05-01 (stable stack, no fast-moving dependencies)
