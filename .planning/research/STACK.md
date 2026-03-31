# Stack Research

**Domain:** Visually impressive barber shop website with heavy animations
**Researched:** 2026-04-01
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Next.js | 15.x (latest 15.2.4) | Framework, SSR/SSG, routing, image optimization | Proven stable, excellent Vercel deployment, built-in image optimization with AVIF/WebP. Next.js 16 exists but 15.x is the safer choice for a small team -- 16 requires migration effort with no critical benefit for a static site. **Confidence: HIGH** |
| TypeScript | 5.x | Type safety | Industry standard, catches errors at build time, better DX with autocomplete. **Confidence: HIGH** |
| React | 19.x | UI library | Ships with Next.js 15. Concurrent features improve animation smoothness. **Confidence: HIGH** |
| Tailwind CSS | 4.x (latest 4.0+) | Utility-first styling | CSS-first config (no tailwind.config.js needed), 5x faster builds via Rust engine, built-in container queries and 3D transforms. Use `@tailwindcss/postcss` for Next.js integration (NOT `@tailwindcss/vite`). **Confidence: HIGH** |

### Animation Stack

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| GSAP | 3.14.x | Complex timeline animations, ScrollTrigger, SplitText | The gold standard for web animation. Now 100% FREE including all plugins (SplitText, ScrollTrigger, MorphSVG). ScrollTrigger is essential for scroll-driven parallax and reveal animations. SplitText enables per-character/word text animations -- perfect for the DEJAVU neon intro. **Confidence: HIGH** |
| Motion (formerly Framer Motion) | 12.x (latest 12.38.0) | Component-level animations, page transitions, hover/tap states | Renamed from `framer-motion` to `motion`. Import from `motion/react`. Best for React-declarative animations: enter/exit, layout, gesture-based. Complements GSAP -- use Motion for component lifecycle, GSAP for complex timelines. **Confidence: HIGH** |
| @gsap/react | 2.x | React integration for GSAP | Provides `useGSAP` hook with automatic cleanup. Prevents memory leaks and "stuck" ScrollTrigger issues in Next.js App Router. **Confidence: HIGH** |
| Lenis | 1.3.x (latest 1.3.21) | Smooth scrolling | Lightweight, performant smooth scroll. Industry standard for portfolio/agency sites. Has `autoRaf` option for easy setup. Essential for the buttery scroll feel that makes a barber site feel premium. **Confidence: HIGH** |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| sharp | latest | Image optimization | Auto-installed by Next.js for production image processing. Provides 40-70% file size reduction. Install explicitly for Vercel deployment. **Confidence: HIGH** |
| clsx | 2.x | Conditional class names | When combining Tailwind classes conditionally (e.g., mobile animation toggle). Tiny (228B), no overhead. **Confidence: HIGH** |
| tailwind-merge | 2.x | Tailwind class deduplication | When building reusable components that accept className props -- prevents conflicting utilities. **Confidence: MEDIUM** |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| ESLint + eslint-config-next | Linting | Ships with `create-next-app`. Next.js-specific rules included. |
| Prettier + prettier-plugin-tailwindcss | Formatting | Auto-sorts Tailwind classes. Reduces bikeshedding. |
| Turbopack | Dev server bundler | Enabled by default in Next.js 15 dev mode. 10x faster HMR than Webpack. |

## Installation

```bash
# Initialize project
npx create-next-app@latest berber-sitesi --ts --tailwind --eslint --app

# Core animation stack
npm install gsap @gsap/react motion lenis

# Utilities
npm install clsx tailwind-merge

# Dev dependencies
npm install -D prettier prettier-plugin-tailwindcss
```

### PostCSS Configuration (postcss.config.mjs)

```javascript
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

### CSS Entry Point (globals.css)

```css
@import "tailwindcss";
```

### GSAP Registration (single client component provider)

```typescript
"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Next.js 15.x | Next.js 16 | Only if you need 16-specific features (improved middleware, new caching). For a static barber site, 15.x is battle-tested and sufficient. |
| Tailwind CSS 4 | CSS Modules | Only if the team is strongly anti-utility-CSS. Tailwind 4 is faster to develop with for this type of visual site. |
| Motion (framer-motion) | React Spring | Only if bundle size is ultra-critical. Motion has better DX for layout animations and exit transitions. |
| GSAP + Motion combo | GSAP only | Possible, but Motion handles React lifecycle animations more naturally. The combo gives the best of both worlds. |
| Lenis | locomotive-scroll | Never. Locomotive-scroll is heavier, less maintained, and has more Next.js compatibility issues. Lenis is the clear winner. |
| clsx + tailwind-merge | cva (class-variance-authority) | Only if building a design system with many component variants. Overkill for a barber site. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| `framer-motion` (package name) | Deprecated package name, no longer actively updated | `motion` (same API, import from `motion/react`) |
| `@studio-freight/lenis` | Deprecated package name | `lenis` (renamed) |
| Particles.js | Abandoned, no updates since 2018, security issues | tsParticles if particles are needed, or pure GSAP canvas animations |
| three.js / React Three Fiber | Massive bundle size (500KB+), overkill for a barber site | GSAP canvas animations or CSS 3D transforms for depth effects |
| Locomotive Scroll | Heavy, poorly maintained, Next.js App Router conflicts | Lenis |
| jQuery / jQuery plugins | Legacy, conflicts with React's DOM management | Native GSAP or Motion |
| Animate.css | Inflexible, no scroll-trigger, no timeline control | GSAP + Motion |
| next-themes | Unnecessary -- this site has a single dark vintage theme, no theme switching needed | Hardcoded dark theme in Tailwind |
| Any CMS (Contentful, Sanity, etc.) | Out of scope -- static content, no dynamic updates needed | Static data files (TypeScript objects) |
| Swiper.js for gallery | Heavy dependency for a simple gallery page | CSS scroll-snap + Motion for gallery transitions |

## Stack Patterns for This Project

**Animation responsibility split:**
- Use **GSAP** for: Hero intro timeline, ScrollTrigger parallax, SplitText character animations, neon glow pulsing, complex multi-step sequences
- Use **Motion** for: Page transitions (gallery <-> home), hover/tap micro-interactions on service cards, staggered list reveals, AnimatePresence for mount/unmount
- Use **Lenis** for: Global smooth scrolling wrapper, scroll velocity for parallax calculations
- Use **CSS/Tailwind** for: Simple transitions (color, opacity on hover), responsive breakpoint animations, neon text-shadow glow via `@keyframes`

**Mobile performance pattern:**
- Detect with `window.matchMedia('(prefers-reduced-motion: reduce)')` and viewport width
- Disable GSAP ScrollTrigger and Lenis on mobile (< 768px) or reduced-motion preference
- Keep Motion enter/exit animations (they're lightweight)
- Replace parallax with simple fade-in on mobile

**Image optimization pattern:**
- Use `next/image` with `priority` on hero images for LCP
- Use `placeholder="blur"` with `blurDataURL` for gallery images
- Serve AVIF with WebP fallback (Next.js handles this automatically)
- Lazy load all below-fold images

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| Next.js 15.2.x | React 19.x | React 19 is required for Next.js 15 |
| Next.js 15.2.x | Tailwind CSS 4.x | Use `@tailwindcss/postcss`, NOT the Vite plugin |
| GSAP 3.14.x | @gsap/react 2.x | Must use `useGSAP` hook for proper cleanup in App Router |
| Motion 12.x | React 19.x | Full compatibility, use `motion/react` import |
| Lenis 1.3.x | Next.js 15.x | Use `autoRaf` option, wrap in client component provider |
| Tailwind CSS 4.x | prettier-plugin-tailwindcss 0.6+ | Ensure plugin version supports v4 CSS-first syntax |

## Sources

- [Next.js Official Blog - 15.5](https://nextjs.org/blog/next-15-5) -- version verification, HIGH confidence
- [Next.js 16 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-16) -- version comparison, HIGH confidence
- [Tailwind CSS v4.0 Release](https://tailwindcss.com/blog/tailwindcss-v4) -- features and setup, HIGH confidence
- [Tailwind CSS PostCSS Installation](https://tailwindcss.com/docs/installation/using-postcss) -- Next.js integration, HIGH confidence
- [Motion Official Site](https://motion.dev/) -- latest version and rename info, HIGH confidence
- [Motion Upgrade Guide](https://motion.dev/docs/react-upgrade-guide) -- migration from framer-motion, HIGH confidence
- [GSAP npm](https://www.npmjs.com/package/gsap) -- version 3.14.x, free license confirmation, HIGH confidence
- [GSAP SplitText Docs](https://gsap.com/docs/v3/Plugins/SplitText/) -- now free, HIGH confidence
- [Lenis GitHub](https://github.com/darkroomengineering/lenis) -- version 1.3.21, HIGH confidence
- [Setting Up GSAP with Next.js: 2025 Edition](https://javascript.plainenglish.io/setting-up-gsap-with-next-js-2025-edition-bcb86e48eab6) -- GSAP + App Router patterns, MEDIUM confidence
- [Optimizing GSAP in Next.js 15](https://medium.com/@thomasaugot/optimizing-gsap-animations-in-next-js-15-best-practices-for-initialization-and-cleanup-2ebaba7d0232) -- cleanup patterns, MEDIUM confidence

---
*Stack research for: Dejavu Erkek Kuaforu barber shop website*
*Researched: 2026-04-01*
