# Phase 01: Foundation & Design System - Research

**Researched:** 2026-04-01
**Domain:** Next.js 15 App Router + Animation Infrastructure + Design System
**Confidence:** HIGH

## Summary

Bu faz, greenfield bir Next.js 15 App Router projesi kurup, GSAP + Motion (Framer Motion) animasyon altyapisini, vintage Turk berber tasarim sistemini ve uc katmanli animasyon degradasyonunu olusturmayi hedefliyor. Proje tamamen sifirdan basliyor (package.json bile yok).

Arastirma sonucunda: Next.js 15 + Tailwind CSS v4 artik `create-next-app` ile tek komutla kurulabiliyor, Tailwind v4 `@theme` direktifi ile config dosyasina gerek kalmadan CSS-first yaklasim sunuyor. GSAP `@gsap/react` paketi ile `useGSAP` hook'u sayesinde hydration-safe animasyonlar yapmak mumkun. Lenis `lenis/react` ile `ReactLenis` wrapper component sunuyor ve GSAP ticker'a baglanarak ScrollTrigger ile senkronize calisiyor. Motion (eski Framer Motion) artik `motion/react` import path'i kullaniyor.

**Primary recommendation:** `create-next-app@latest` ile projeyi kur, Tailwind v4 `@theme` ile tasarim tokenlerini `globals.css` icinde tanimla, GSAP + Lenis entegrasyonunu tek bir provider'da yonet, Motion'i sadece `"use client"` componentlerde kullan.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Ana arka plan: Koyu kahverengi (#1C1410) -- sicak, ahsap/deri hissi, klasik berber dukkan atmosferi
- Neon vurgu: Canli kirmizi (#E11D48) -- modern neon tabela hissi, DEJAVU tabelasindan ilham
- Bolumler arasi hafif ton farki -- alternating background (#1C1410 / #211812 / #150F0B)
- Basliklar: Display font (Playfair Display veya benzeri serif) -- neon glow ile vintage his
- Govde metni: Temiz sans-serif (Inter veya DM Sans) -- okunakli, modern
- Aksan/CTA: Uppercase, genis letter-spacing
- Navbar: Transparan -> Solid (hero uzerinde seffaf, scroll edince koyu arka plan + blur ile sticky)
- Scroll-spy gostergesi: Neon alt cizgi (#E11D48 glow)
- DEJAVU logo: Display font, kirmizi neon glow efektli
- Menu ogeleri: Hakkimizda, Hizmetler, Galeri, Iletisim, [Randevu Al butonu]
- Mobil menu: Tam ekran overlay
- Layout: Tam genislik bolumler, icerik max-width ile sinirli
- Footer: Iletisim bolumu footer gorevini gorur (ayri footer yok)
- GSAP sorumluluk: ScrollTrigger, timeline, canvas/particle, neon text
- Motion sorumluluk: Navbar gecisi, menu ac/kapa, kart hover, sayfa gecisi, AnimatePresence
- Kural: Paylasilan element yok -- bir element ya GSAP ya Motion
- Tier 1 (Full/Desktop, >=768px): Parallax, parcacik, karmasik scroll, neon glow, tum Motion
- Tier 2 (Reduced/Mobil, <768px): Sadece fade-in/slide-up, navbar, menu, hover->tap
- Tier 3 (None/prefers-reduced-motion): Animasyon yok
- Tespit: CSS media query + JS matchMedia (768px esik) + prefers-reduced-motion
- Hook: useAnimationTier()
- Lenis: Sadece desktop'ta aktif, mobilde native scroll
- Arka plan dokusu: Hafif grain/noise overlay (opacity ~%3-5)
- Bolum ayiricilar: Berber diregi cizgileri (kirmizi-beyaz-mavi)
- Kart cerceveleri: Retro kose suslemeleri
- Neon glow: Secici -- sadece DEJAVU logo, CTA, scroll-spy, hero basligi

### Claude's Discretion
- Altin/kremsi aksan rengi ve kullanim yerleri (belirgin altin vs hafif krem dengesi)
- Grain overlay teknik uygulamasi (CSS vs SVG vs canvas)
- SVG ikon setinin detayli tasarimi
- Exact spacing ve typography scale
- Tailwind CSS 4 tema konfigurasyonu detaylari
- GSAP/Motion entegrasyon pattern'leri (useGSAP hook vb.)

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| FOUND-01 | Site Next.js 15 App Router + TypeScript ile calisir | create-next-app@latest ile kurulum, App Router varsayilan |
| FOUND-02 | Tailwind CSS 4 ile responsive, mobile-first tasarim | Tailwind v4 @theme direktifi ile CSS-first config, next/font entegrasyonu |
| FOUND-03 | GSAP + Motion animasyon altyapisi, sorumluluk alanlari net | useGSAP hook + "use client" pattern, Motion import path degisikligi |
| FOUND-04 | Vintage Turk berber tasarim sistemi | @theme ile renk/font/spacing tokenleri, CSS custom properties |
| FOUND-05 | 3 katmanli animasyon degradasyonu | useAnimationTier() hook, matchMedia + prefers-reduced-motion |
| FOUND-06 | Lenis smooth scroll entegrasyonu | ReactLenis wrapper, GSAP ticker senkronizasyonu, desktop-only |
| FOUND-07 | Sticky navbar ile bolum navigasyonu ve scroll-spy | Motion AnimatePresence + IntersectionObserver pattern |
| VISL-01 | Vintage Turk berber estetigi | Tasarim tokenleri, grain overlay, retro border CSS |
| VISL-02 | Renk paleti dukkanin atmosferini yansitir | @theme ile --color-* tokenleri, alternating section backgrounds |
| VISL-03 | Arka plan dokularinda vintage his | CSS pseudo-element grain overlay (en performansli yaklasim) |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.2.2 | App Router, SSR, routing | create-next-app ile kuruluyor, industry standard |
| react / react-dom | 19.x | UI framework | Next.js 15+ ile birlikte |
| typescript | 5.x | Type safety | create-next-app varsayilan |
| tailwindcss | 4.2.2 | Utility-first CSS, design tokens | v4 CSS-first config, @theme ile token yonetimi |
| gsap | 3.14.2 | ScrollTrigger, timeline, complex animations | Scroll-driven animasyonlarda industry standard |
| @gsap/react | 2.1.2 | useGSAP hook, React lifecycle uyumu | GSAP'in resmi React entegrasyonu, hydration-safe |
| motion | 12.38.0 | Navbar gecisleri, menu, hover, AnimatePresence | React-native animasyon, layout animations |
| lenis | 1.3.21 | Smooth scroll, GSAP ScrollTrigger senkronizasyonu | Darkroom Engineering'in smooth scroll standardi |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| next/font (built-in) | - | Google Fonts (Playfair Display, Inter) | Font optimization, self-hosting, CSS variable export |
| @tailwindcss/vite | 4.2.2 | Tailwind v4 build plugin | Next.js 15+ Turbopack ile birlikte kullanilir |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Lenis | locomotive-scroll | Lenis daha lightweight, daha iyi GSAP entegrasyonu, aktif bakimda |
| Motion | sadece GSAP | Motion React lifecycle'a native entegre, AnimatePresence benzersiz |
| CSS grain | SVG/Canvas grain | CSS pseudo-element en performansli, GPU layer gerektirmez |

**Installation:**
```bash
npx create-next-app@latest berber-sitesi --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd berber-sitesi
npm install gsap @gsap/react motion lenis
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   ├── layout.tsx           # Root layout: fonts, providers, metadata
│   ├── page.tsx             # Ana sayfa (sections)
│   ├── globals.css          # Tailwind @theme, design tokens, grain overlay
│   └── galeri/
│       └── page.tsx         # Galeri sayfasi (Phase 2)
├── components/
│   ├── providers/
│   │   ├── SmoothScrollProvider.tsx  # Lenis + GSAP ticker wrapper
│   │   └── AnimationProvider.tsx     # GSAP registerPlugin, context
│   ├── layout/
│   │   ├── Navbar.tsx       # Sticky navbar (Motion-driven)
│   │   ├── MobileMenu.tsx   # Tam ekran overlay menu (Motion)
│   │   └── SectionDivider.tsx # Berber diregi cizgileri
│   └── ui/
│       ├── NeonText.tsx     # GSAP neon glow text
│       ├── GrainOverlay.tsx # Grain texture overlay
│       └── RetroCard.tsx    # Retro kose suslemeli kart
├── hooks/
│   ├── useAnimationTier.ts  # 3-tier degradasyon hook
│   ├── useScrollSpy.ts     # IntersectionObserver scroll-spy
│   └── useMediaQuery.ts    # matchMedia wrapper
├── lib/
│   ├── gsap-config.ts      # GSAP plugin registration (client-only)
│   └── constants.ts        # Isletme verileri, nav items
└── styles/
    └── design-tokens.ts    # Renk/font referanslari (TS const)
```

### Pattern 1: GSAP Plugin Registration (Singleton)
**What:** GSAP plugin'lerini tek bir yerde, bir kez register etmek
**When to use:** Projenin her yerinde -- tum GSAP kullanilan componentlerden once
**Example:**
```typescript
// src/lib/gsap-config.ts
"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register once globally
gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };
```

### Pattern 2: useGSAP Hook with Scoped Container
**What:** React-safe GSAP animasyonlari, otomatik cleanup
**When to use:** Her GSAP animasyonu icin
**Example:**
```typescript
// Source: https://gsap.com/resources/React/
"use client";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap-config";

export function FadeInSection({ children }: { children: React.ReactNode }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".fade-item", {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      },
    });
  }, { scope: container });

  return <div ref={container}>{children}</div>;
}
```

### Pattern 3: Lenis + GSAP Ticker Senkronizasyonu
**What:** Lenis scroll'unu GSAP ticker'a baglayarak ScrollTrigger ile senkronize etmek
**When to use:** Root layout'ta, smooth scroll provider icinde
**Example:**
```typescript
// Source: https://github.com/darkroomengineering/lenis
"use client";
import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Lenis scroll -> ScrollTrigger sync
    const lenis = lenisRef.current?.lenis;
    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
    }

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
      {children}
    </ReactLenis>
  );
}
```

### Pattern 4: useAnimationTier Hook
**What:** Merkezi animasyon katmani tespiti
**When to use:** Tum animasyonlu componentlerde tier kontrolu
**Example:**
```typescript
// src/hooks/useAnimationTier.ts
"use client";
import { useState, useEffect } from "react";

export type AnimationTier = "full" | "reduced" | "none";

export function useAnimationTier(): AnimationTier {
  const [tier, setTier] = useState<AnimationTier>("reduced");

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isDesktop = window.matchMedia("(min-width: 768px)");

    function update() {
      if (prefersReduced.matches) {
        setTier("none");
      } else if (isDesktop.matches) {
        setTier("full");
      } else {
        setTier("reduced");
      }
    }

    update();
    prefersReduced.addEventListener("change", update);
    isDesktop.addEventListener("change", update);

    return () => {
      prefersReduced.removeEventListener("change", update);
      isDesktop.removeEventListener("change", update);
    };
  }, []);

  return tier;
}
```

### Pattern 5: Tailwind v4 @theme ile Design Tokens
**What:** Tum renk, font ve spacing tokenlerini globals.css'de tanimlamak
**When to use:** Proje kurulumunda, tek seferlik
**Example:**
```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  /* Renk Paleti */
  --color-base-dark: #1C1410;
  --color-base-medium: #211812;
  --color-base-light: #150F0B;
  --color-neon-red: #E11D48;
  --color-gold: #D4A853;
  --color-cream: #F5E6D0;
  --color-white: #FAFAF9;

  /* Neon Glow icin shadow tokenleri */
  --shadow-neon: 0 0 10px #E11D48, 0 0 40px rgba(225, 29, 72, 0.3);
  --shadow-neon-strong: 0 0 10px #E11D48, 0 0 40px #E11D48, 0 0 80px rgba(225, 29, 72, 0.2);

  /* Font Families */
  --font-display: var(--font-playfair);
  --font-body: var(--font-inter);

  /* Spacing Scale */
  --spacing-section: 6rem;
  --spacing-section-mobile: 3rem;

  /* Max Content Width */
  --container-content: 1200px;
}

@theme inline {
  --font-display: var(--font-playfair);
  --font-body: var(--font-inter);
}
```

### Pattern 6: next/font ile Font Setup
**What:** Google Fonts'u self-host, CSS variable olarak export
**When to use:** Root layout'ta
**Example:**
```typescript
// src/app/layout.tsx
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-body bg-base-dark text-white">
        <SmoothScrollProvider>
          <Navbar />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
```

### Anti-Patterns to Avoid
- **GSAP + Motion ayni elemanda:** Bir element ya GSAP ya Motion tarafindan anime edilir. Ikisi birden style cakismasi yaratir.
- **useEffect icinde GSAP (useGSAP yerine):** useGSAP otomatik cleanup yapar, useEffect ile manual context.revert() gerekir ve strict mode'da sorun cikarir.
- **Server component'te animasyon kodu:** GSAP, Motion ve Lenis hepsi `"use client"` gerektirir. Server component'te import etmek hydration hatasi verir.
- **Lenis mobilde aktif:** Mobil cihazlarda native momentum scroll daha iyi performans verir, Lenis ekstra CPU yuku bindirir.
- **tailwind.config.ts olusturmak:** Tailwind v4'te @theme direktifi config dosyasinin yerini aldi. Config dosyasi sadece plugin'ler icin gerekli.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Smooth scroll | Custom requestAnimationFrame loop | Lenis | iOS uyumluluk, momentum, accessibility, edge case'ler |
| Scroll-driven animations | Manual scroll event listener | GSAP ScrollTrigger | Performans (throttling), resize handling, pin/scrub |
| React animation lifecycle | Manual useEffect + cleanup | useGSAP hook | Strict mode, cleanup, memory leak onleme |
| Layout animations | CSS transitions + JS state | Motion AnimatePresence | Exit animations, layout shifts, interruption handling |
| Font loading | Manual @font-face | next/font/google | Self-hosting, preload, FOUT prevention, cache |
| Responsive detection | Manual resize listener | matchMedia + useAnimationTier | Debounce gerektirmez, change event ile reactive |
| CSS design tokens | JS theme object | Tailwind @theme | Build-time optimization, tree-shaking, type-safe utilities |

**Key insight:** Bu projede "infrastructure" kodu (scroll, animation lifecycle, font loading) kutuphanelerin core sorumluluklari. Custom cozumler her zaman edge case'lerde bozulur.

## Common Pitfalls

### Pitfall 1: GSAP Hydration Errors
**What goes wrong:** ScrollTrigger body'ye style attribute ekler, server-rendered HTML ile uyusmazlik olusur
**Why it happens:** GSAP plugin'leri client-side DOM manipulasyonu yapar, SSR sirasinda bunu yapamaz
**How to avoid:** Tum GSAP kodunu `"use client"` componentlerde tut, useGSAP hook kullan (useIsomorphicLayoutEffect pattern'i icerir), plugin registration'i client-only dosyada yap
**Warning signs:** "Hydration failed because the initial UI does not match" konsol hatasi

### Pitfall 2: Lenis + ScrollTrigger Desync
**What goes wrong:** ScrollTrigger trigger noktalari yanlis hesaplanir, animasyonlar erken/gec tetiklenir
**Why it happens:** Lenis kendi virtual scroll position'ini yonetir, ScrollTrigger native scroll'u dinler
**How to avoid:** `lenis.on('scroll', ScrollTrigger.update)` ile senkronize et, `gsap.ticker.lagSmoothing(0)` ayarla, Lenis `autoRaf: false` ile GSAP ticker'dan sur
**Warning signs:** Scroll animasyonlari "jittery" gorunur veya yanlis pozisyonda tetiklenir

### Pitfall 3: Tailwind v4 @theme inline vs Normal
**What goes wrong:** `var(--font-inter)` gibi CSS variable referanslari cozumlenemez
**Why it happens:** @theme (inline olmayan) variable'lari tanim noktasinda cozumler, kullanim noktasinda degil
**How to avoid:** Font ve diger CSS variable referanslarini `@theme inline { }` blogu icinde tanimla
**Warning signs:** Font veya renk degerleri undefined/fallback gorunur

### Pitfall 4: Motion Bundle Size
**What goes wrong:** 30kb+ bundle eklenir
**Why it happens:** Motion tum animasyon ozelliklerini import eder
**How to avoid:** `LazyMotion` + `domAnimation` kullanarak bundle'i ~15kb'ye dusur
**Warning signs:** Lighthouse performance skoru beklenenden dusuk

### Pitfall 5: Lenis Infinite Re-render
**What goes wrong:** "Maximum update depth exceeded" hatasi
**Why it happens:** Lenis options objesi useEffect dependency array'ine konur, her renderda yeni referans olusur
**How to avoid:** Options'i useRef ile sakla veya component disinda const olarak tanimla, useEffect dependency'sini [] yap
**Warning signs:** Sayfa acilinsa kilitlenir veya konsol hata verir

### Pitfall 6: prefers-reduced-motion Ignorance
**What goes wrong:** Animasyona duyarli kullanicilar (vestibular disorders vb.) rahatsiz olur, accessibility sorunu
**Why it happens:** Sadece desktop/mobil kontrol edilir, OS-level ayar gozardi edilir
**How to avoid:** useAnimationTier hook'ta prefers-reduced-motion kontrolunu EN YUKSEK oncelikle yap (tier 3), matchMedia listener ile runtime'da dinle
**Warning signs:** OS ayarlarindan "Reduce motion" acinsa bile animasyonlar devam eder

## Code Examples

### Grain Overlay (CSS Pseudo-element)
```css
/* globals.css */
.grain-overlay::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 50;
  pointer-events: none;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}
```

### Neon Glow CSS
```css
/* globals.css */
.neon-glow {
  text-shadow:
    0 0 7px #E11D48,
    0 0 10px #E11D48,
    0 0 21px #E11D48,
    0 0 42px rgba(225, 29, 72, 0.5);
}

.neon-glow-subtle {
  text-shadow:
    0 0 5px rgba(225, 29, 72, 0.5),
    0 0 15px rgba(225, 29, 72, 0.2);
}
```

### Barber Pole Divider
```typescript
// src/components/layout/SectionDivider.tsx
"use client";
export function SectionDivider() {
  return (
    <div className="h-2 w-full overflow-hidden">
      <div
        className="h-full w-[200%] animate-barber-slide"
        style={{
          background: "repeating-linear-gradient(120deg, #E11D48 0px, #E11D48 20px, #FAFAF9 20px, #FAFAF9 40px, #3B82F6 40px, #3B82F6 60px)",
        }}
      />
    </div>
  );
}
```

### Retro Card Frame
```css
/* Retro corner decorations */
.retro-card {
  position: relative;
  border: 1px solid rgba(212, 168, 83, 0.3);
}
.retro-card::before,
.retro-card::after {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  border-color: var(--color-gold);
}
.retro-card::before {
  top: -1px;
  left: -1px;
  border-top: 2px solid;
  border-left: 2px solid;
}
.retro-card::after {
  bottom: -1px;
  right: -1px;
  border-bottom: 2px solid;
  border-left: none;
  border-right: 2px solid;
}
```

### Desktop-Only Lenis Provider
```typescript
// src/components/providers/SmoothScrollProvider.tsx
"use client";
import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { useAnimationTier } from "@/hooks/useAnimationTier";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);
  const tier = useAnimationTier();
  const isDesktop = tier === "full";

  useEffect(() => {
    if (!isDesktop) return;

    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const lenis = lenisRef.current?.lenis;
    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
    }

    return () => {
      gsap.ticker.remove(update);
    };
  }, [isDesktop]);

  if (!isDesktop) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ autoRaf: false, lerp: 0.1 }} ref={lenisRef}>
      {children}
    </ReactLenis>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| tailwind.config.ts | @theme directive in CSS | Tailwind v4 (Jan 2025) | Config dosyasi gereksiz, CSS-first |
| framer-motion import | motion/react import | Late 2024 | Package rebrand, ayni API |
| @studio-freight/lenis | lenis | 2024 | Package rebrand, lenis/react alt-paket |
| gsap.context() manual | useGSAP hook | @gsap/react 2.x | Otomatik cleanup, scope, contextSafe |
| Manual RAF loop for Lenis | autoRaf option + GSAP ticker | Lenis 1.x | Daha temiz entegrasyon |

**Deprecated/outdated:**
- `@studio-freight/lenis` ve `@studio-freight/react-lenis`: Artik `lenis` ve `lenis/react` kullanilmali
- `framer-motion` import path: Artik `motion/react` import edilmeli (geriye uyumlu ama deprecated)
- `tailwind.config.ts` renk/font tanimlari: v4'te @theme direktifi kullanilmali

## Open Questions

1. **Altin/Kremsi Aksan Renk Secimi**
   - What we know: Kullanici belirgin altin ile hafif krem arasinda denge istiyor, Claude'un takdirine birakildi
   - What's unclear: Exact hex/oklch degeri ve kullanim yerleri (baslik altlari, border'lar, ikonlar?)
   - Recommendation: #D4A853 (warm gold) ana aksan, #F5E6D0 (cream) metin vurgulari icin. Uygulama sirasinda goruntuleyerek ayarlanabilir.

2. **Playfair Display vs Diger Serif**
   - What we know: Kullanici "Playfair Display veya benzeri" dedi
   - What's unclear: Turkce karakter destegi (ş, ç, ğ, ı, ö, ü) yeterliligi
   - Recommendation: Playfair Display Latin Extended subset'i Turkce karakterleri destekler. Kullan.

3. **GSAP Lisansi**
   - What we know: ScrollTrigger dahil core GSAP ucretsiz, "no-charge" license
   - What's unclear: Ticari kullanim siniri (bu bir isletme sitesi)
   - Recommendation: GSAP standard license ticari sitelerde kullanima izin veriyor (son kullaniciya GSAP satis yapilmadigi surece). Bu berber sitesi icin sorun yok.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Playwright (e2e, visual checks icin en uygun) |
| Config file | none -- Wave 0'da olusturulacak |
| Quick run command | `npx playwright test --project=chromium` |
| Full suite command | `npx playwright test` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FOUND-01 | Next.js dev server baslar | smoke | `curl -s http://localhost:3000 \| grep -q "html"` | -- Wave 0 |
| FOUND-02 | Tailwind CSS utility'leri uygulaniyor | visual | Manual: devtools inspect | -- manual-only |
| FOUND-03 | GSAP + Motion hydration hatasiz calisir | e2e | `npx playwright test tests/animations.spec.ts` | -- Wave 0 |
| FOUND-04 | Design system tokenleri uygulanmis | visual | Manual: screenshot comparison | -- manual-only |
| FOUND-05 | 3-tier degradation calisiyor | e2e | `npx playwright test tests/animation-tiers.spec.ts` | -- Wave 0 |
| FOUND-06 | Lenis smooth scroll aktif (desktop) | e2e | `npx playwright test tests/smooth-scroll.spec.ts` | -- Wave 0 |
| FOUND-07 | Navbar scroll-spy calisiyor | e2e | `npx playwright test tests/navbar.spec.ts` | -- Wave 0 |
| VISL-01 | Vintage estetik goruniyor | visual | Manual: screenshot review | -- manual-only |
| VISL-02 | Renk paleti uygulanmis | visual | Manual: design token check | -- manual-only |
| VISL-03 | Grain overlay goruniyor | visual | Manual: opacity check | -- manual-only |

### Sampling Rate
- **Per task commit:** `npx playwright test --project=chromium` (quick smoke)
- **Per wave merge:** `npx playwright test` (full suite)
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `playwright.config.ts` -- test framework config
- [ ] `tests/animations.spec.ts` -- GSAP/Motion hydration check
- [ ] `tests/animation-tiers.spec.ts` -- 3-tier degradation tests
- [ ] `tests/smooth-scroll.spec.ts` -- Lenis desktop-only check
- [ ] `tests/navbar.spec.ts` -- scroll-spy & sticky behavior
- [ ] Framework install: `npm install -D @playwright/test && npx playwright install chromium`

## Sources

### Primary (HIGH confidence)
- [GSAP React docs](https://gsap.com/resources/React/) - useGSAP hook, scoping, cleanup, SSR safety
- [Tailwind CSS Theme docs](https://tailwindcss.com/docs/theme) - @theme directive, --color-*, @theme inline
- [Lenis GitHub](https://github.com/darkroomengineering/lenis) - GSAP ticker integration, ReactLenis, autoRaf
- [Lenis React README](https://github.com/darkroomengineering/lenis/blob/main/packages/react/README.md) - ReactLenis component, useLenis hook
- npm registry - Verified versions: next@16.2.2, gsap@3.14.2, motion@12.38.0, lenis@1.3.21, tailwindcss@4.2.2

### Secondary (MEDIUM confidence)
- [GSAP community forums](https://gsap.com/community/forums/topic/43281-hydration-error-in-nextjs-15/) - Hydration error fixes
- [Next.js fonts + Tailwind v4 guide](https://www.buildwithmatija.com/blog/how-to-use-custom-google-fonts-in-next-js-15-and-tailwind-v4) - Font CSS variable + @theme inline pattern
- [GSAP pricing page](https://gsap.com/pricing/) - Free tier includes ScrollTrigger

### Tertiary (LOW confidence)
- Medium articles on GSAP + Next.js 15 patterns - General guidance, not official

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Tum versiyonlar npm registry'den dogrulandi, kutuphaneler aktif bakimda
- Architecture: HIGH - Pattern'ler resmi dokumantasyonlardan (GSAP, Lenis, Tailwind) alinmis
- Pitfalls: HIGH - GSAP forum'lari ve GitHub issue'larinda dogrulanmis, bilinen sorunlar
- Design tokens: MEDIUM - Tailwind v4 @theme yeni (~1 yil), bazi edge case'ler olabilir

**Research date:** 2026-04-01
**Valid until:** 2026-05-01 (stable libraries, 30-day validity)
