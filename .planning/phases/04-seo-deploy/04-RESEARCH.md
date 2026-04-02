# Phase 4: SEO & Deploy - Research

**Researched:** 2026-04-02
**Domain:** SEO structured data, Next.js metadata API, Vercel deployment, Lighthouse optimization
**Confidence:** HIGH

## Summary

Phase 4 covers four distinct areas: (1) JSON-LD structured data for local business SEO, (2) Turkish meta tags and Open Graph configuration, (3) Vercel deployment, and (4) Lighthouse mobile performance optimization. The existing codebase already has solid foundations -- `constants.ts` contains all business data, `layout.tsx` has basic metadata, fonts use `display: "swap"`, and images use `next/image` with WebP and blur placeholders.

The primary technical work is adding JSON-LD BarberShop/HairSalon structured data, expanding the metadata export with Open Graph fields, creating `sitemap.ts` and `robots.ts` files, preparing OG images from existing photos, and optimizing animation bundle size for Lighthouse scores.

**Primary recommendation:** Use Next.js App Router's built-in metadata API and file conventions for all SEO work. JSON-LD goes as a `<script>` tag in layout.tsx. OG images use the file-based convention (`opengraph-image.jpg`). Vercel deployment is zero-config for Next.js projects.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Ana sayfa og:image: Dukkan disi fotografi (DEJAVU neon tabelasi gorunen)
- Galeri sayfasi: Ayri og:image (ic mekan veya calisma fotografi) ve ayri meta description
- og:image boyutu: 1200x630 standart OG boyutu
- Sadece Vercel subdomain kullanilacak (custom domain yok)
- Canonical URL'ler Vercel subdomain'e isaret edecek
- Animasyonlar oncelikli — portfolio kalitesi korunsun, 85+ kabul edilebilir
- GSAP ve Framer Motion icin tree-shaking ve dynamic import optimizasyonu
- Kullanilmayan GSAP plugin'leri cikarilacak
- LCP optimizasyonu: Hero fotografi preload, font display swap (zaten mevcut)
- Yerel odakli anahtar kelimeler: hem ASCII hem Turkce karakterli versiyonlar
- JSON-LD: BarberShop/LocalBusiness structured data
- JSON-LD geo koordinatlari: Claude arastiracak
- Tum isletme verileri constants.ts'den alinacak
- Next.js metadata API ile sitemap.ts ve robots.ts
- Mevcut favicon.ico, gerekirse guncellenecek
- Vercel Analytics entegrasyonu — ucretsiz, zero-config

### Claude's Discretion
- Exact meta description metinleri (anahtar kelime stratejisine uygun)
- JSON-LD icindeki exact field'lar (openingHoursSpecification format vs basit)
- Lighthouse optimizasyon detaylari (hangi GSAP plugin cikarilacak, dynamic import stratejisi)
- Favicon exact boyutlari ve format (ICO vs PNG vs SVG)
- og:image icin fotograflarin exact crop/resize yaklasimi
- Vercel Analytics konfigurasyonu

### Deferred Ideas (OUT OF SCOPE)
- Custom domain baglantisi
- Google Business Profile entegrasyonu
- Sitemap'te hizmet detay sayfalari
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SEOD-01 | JSON-LD LocalBusiness/BarberShop structured data tum isletme bilgileriyle eklenir | JSON-LD pattern via `<script>` tag in layout.tsx, HairSalon schema type, openingHoursSpecification format, geo coordinates for Susehri |
| SEOD-02 | Turkce meta tags, Open Graph tags ve og:image dukkan fotografiyla eklenir | Next.js metadata API openGraph fields, file-based opengraph-image.jpg convention, sharp for image resize |
| SEOD-03 | Site Vercel'e deploy edilir ve canli URL'den erisilebilir | Vercel CLI or Git integration, zero-config Next.js deployment, @vercel/analytics package |
| SEOD-04 | Lighthouse mobil skoru 90+ hedeflenir | GSAP tree-shaking (only ScrollTrigger used), dynamic imports for animation components, preload hints for LCP |
</phase_requirements>

## Standard Stack

### Core (Already Installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.2.2 | Framework with built-in metadata API | Provides sitemap.ts, robots.ts, metadata export, file-based OG images |
| gsap | ^3.14.2 | Animation (optimization target) | Only ScrollTrigger plugin used -- no unused plugins to remove |
| motion | ^12.38.0 | Animation (optimization target) | Tree-shakeable by default with `motion/react` import |

### New Dependencies
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @vercel/analytics | 2.0.1 | Privacy-friendly traffic analytics | Add Analytics component to layout.tsx |
| sharp | (dev dependency, already available via Next.js) | OG image resize to 1200x630 | Build-time image preparation script |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| File-based OG image | next/og ImageResponse | Dynamic generation is overkill for 2 static pages |
| schema-dts (TypeScript types) | Plain object | schema-dts adds type safety but also a dependency; plain object is simpler for 1 schema |
| @vercel/speed-insights | Nothing | Not requested, Lighthouse covers performance monitoring |

**Installation:**
```bash
npm install @vercel/analytics
```

## Architecture Patterns

### Recommended File Structure
```
src/app/
  layout.tsx              # Extended metadata + JSON-LD script + Analytics component
  opengraph-image.jpg     # 1200x630 OG image (dukkan disi fotografi)
  sitemap.ts              # Next.js sitemap API
  robots.ts               # Next.js robots API
  favicon.ico             # Already exists (25KB)
  page.tsx                # No changes needed
  galeri/
    page.tsx              # Extended metadata with galeri-specific description
    opengraph-image.jpg   # 1200x630 OG image (ic mekan fotografi)
src/lib/
  constants.ts            # Existing -- business data source for JSON-LD
  structured-data.ts      # NEW -- JSON-LD generation function
```

### Pattern 1: JSON-LD via Script Tag in Layout
**What:** Render JSON-LD structured data as a `<script type="application/ld+json">` tag
**When to use:** For site-wide structured data (LocalBusiness/HairSalon)
**Example:**
```typescript
// Source: https://nextjs.org/docs/app/guides/json-ld
// src/lib/structured-data.ts
import { BUSINESS, SERVICES } from "./constants";

export function generateBusinessJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: BUSINESS.name,
    description: "Susehri/Sivas'taki Salon Dejavu Erkek Kuaforu. Profesyonel sac ve sakal tasarimi.",
    url: siteUrl,
    telephone: "+90" + BUSINESS.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Cami Orta Mahallesi, Sivas Cd. No:55/C",
      addressLocality: "Susehri",
      addressRegion: "Sivas",
      postalCode: "58600",
      addressCountry: "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.163,
      longitude: 38.087,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "07:00",
        closes: "23:30",
      },
    ],
    image: `${siteUrl}/images/gallery/dejavu-kuafor.jpg`,
    priceRange: "$$",
  };
}

// In layout.tsx:
const jsonLd = generateBusinessJsonLd("https://dejavu-barber.vercel.app");
// Inside <body>, before children:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
  }}
/>
```

### Pattern 2: Extended Metadata Export with Open Graph
**What:** Expand the existing `metadata` export to include OG tags, locale, keywords
**When to use:** In layout.tsx for site-wide and in galeri/page.tsx for page-specific
**Example:**
```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export const metadata: Metadata = {
  title: "Salon Dejavu — Susehri Berber | Sac ve Sakal Tasarimi",
  description: "Susehri'nin en iyi erkek kuaforu. Profesyonel sac kesimi, sakal trasi, cilt bakimi. Salon Dejavu — Sivas Cd. No:55/C, Susehri/Sivas.",
  keywords: ["susehri berber", "Susehri berber", "susehri erkek kuaforu", "sivas berber", "Salon Dejavu", "Suşehri berber", "Suşehri erkek kuaförü"],
  authors: [{ name: "Salon Dejavu" }],
  openGraph: {
    title: "Salon Dejavu — Susehri Berber",
    description: "Susehri'nin en iyi erkek kuaforu. Profesyonel sac ve sakal tasarimi.",
    url: "https://dejavu-barber.vercel.app",
    siteName: "Salon Dejavu",
    locale: "tr_TR",
    type: "website",
    // images handled by file-based opengraph-image.jpg
  },
  alternates: {
    canonical: "https://dejavu-barber.vercel.app",
  },
};
```

### Pattern 3: File-Based OG Images
**What:** Place `opengraph-image.jpg` files in route directories
**When to use:** For static OG images (no dynamic generation needed)
**How it works:** Next.js automatically detects `opengraph-image.jpg` in the app directory and generates the correct `<meta>` tags with URL, dimensions, and type. More specific route files override parent ones.

```
src/app/opengraph-image.jpg         -> Used for / (ana sayfa)
src/app/galeri/opengraph-image.jpg  -> Used for /galeri
```

**Image preparation:** Use sharp (via a one-off script) to resize source photos from `resimler/` to 1200x630:
```bash
# One-off script to generate OG images
npx sharp-cli resize 1200 630 --fit cover -i resimler/dejavu-kuafor.jpg -o src/app/opengraph-image.jpg
```

### Pattern 4: Sitemap and Robots via Next.js API
**What:** Use `sitemap.ts` and `robots.ts` file conventions
**When to use:** For automatic sitemap.xml and robots.txt generation

```typescript
// src/app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dejavu-barber.vercel.app";
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/galeri`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];
}

// src/app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://dejavu-barber.vercel.app/sitemap.xml",
  };
}
```

### Pattern 5: Vercel Analytics Integration
**What:** Add @vercel/analytics component to layout
**When to use:** After deployment to Vercel
```typescript
// In layout.tsx
import { Analytics } from "@vercel/analytics/next";

// Inside <body>, alongside children:
<Analytics />
```

### Anti-Patterns to Avoid
- **Using next/script for JSON-LD:** JSON-LD is data not executable JS; use native `<script>` tag instead
- **Hardcoding business data in JSON-LD:** All data MUST come from `constants.ts` for single source of truth
- **Using `images` array in metadata openGraph when file-based works:** File-based `opengraph-image.jpg` is simpler and auto-generates dimensions
- **Setting metadataBase to localhost:** Must set `metadataBase` to the Vercel URL for correct OG image absolute URLs

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Sitemap generation | Custom XML builder | `sitemap.ts` file convention | Next.js handles XML serialization, caching, correct content-type |
| Robots.txt | Static file | `robots.ts` file convention | Programmatic, type-safe, auto-served |
| OG image serving | Custom API route | File-based `opengraph-image.jpg` | Auto-generates meta tags with correct dimensions |
| Image optimization | Manual WebP conversion | `next/image` (already in use) | Handles format, sizing, lazy loading |
| Favicon set | Multi-format generation | Keep existing `favicon.ico` + add `icon.png` and `apple-icon.png` if needed | Next.js auto-detects these files |

**Key insight:** Next.js App Router has built-in file conventions for nearly all SEO artifacts. Using these conventions instead of custom solutions ensures correct caching, content-types, and meta tag generation.

## Common Pitfalls

### Pitfall 1: Missing metadataBase
**What goes wrong:** OG image URLs are relative, social media crawlers can't find them
**Why it happens:** Next.js needs an absolute URL base for file-based metadata
**How to avoid:** Set `metadataBase: new URL("https://dejavu-barber.vercel.app")` in root layout metadata
**Warning signs:** OG images not showing in social media preview tools

### Pitfall 2: JSON-LD XSS Vulnerability
**What goes wrong:** Malicious strings in business data could inject scripts
**Why it happens:** `JSON.stringify` doesn't escape `<script>` tags
**How to avoid:** Always use `.replace(/</g, "\\u003c")` on the stringified JSON-LD
**Warning signs:** Raw `<` characters in JSON-LD output

### Pitfall 3: Lighthouse Penalizing Animation JS Bundle
**What goes wrong:** GSAP + Motion combined bundle is large, hurting mobile performance score
**Why it happens:** Both libraries are client-side JS loaded on every page
**How to avoid:** Verify GSAP only imports core + ScrollTrigger (currently correct). Motion tree-shakes well with `motion/react` imports (currently correct). Consider `next/dynamic` with `ssr: false` for heavy animation components like IntroOverlay and SmokeParticles
**Warning signs:** Lighthouse JS execution time warnings, Total Blocking Time > 300ms

### Pitfall 4: LCP Blocked by Intro Animation
**What goes wrong:** Intro overlay covers hero image, delaying LCP measurement
**Why it happens:** Overlay is painted first, hero image loads behind it
**How to avoid:** Ensure hero image has `priority` prop on `next/image` and is preloaded. Intro overlay should not prevent the underlying content from rendering
**Warning signs:** LCP > 2.5s on mobile

### Pitfall 5: Canonical URL Mismatch
**What goes wrong:** Multiple URLs point to same content (with/without trailing slash, www vs non-www)
**Why it happens:** Vercel serves both with and without trailing slashes by default
**How to avoid:** Set explicit `canonical` in alternates metadata. Configure `trailingSlash` in next.config.ts if needed
**Warning signs:** Google Search Console showing duplicate pages

### Pitfall 6: OpenGraph and Twitter Not Inheriting from Metadata
**What goes wrong:** OG title/description are empty even though top-level title/description are set
**Why it happens:** Next.js openGraph and twitter objects need their own explicit values
**How to avoid:** Always set openGraph.title and openGraph.description explicitly (or rely on file-based approach which handles images only)
**Warning signs:** Blank previews on social media

## Code Examples

### Complete Layout Metadata with JSON-LD
```typescript
// Source: https://nextjs.org/docs/app/guides/json-ld + https://nextjs.org/docs/app/api-reference/functions/generate-metadata
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { generateBusinessJsonLd } from "@/lib/structured-data";

const SITE_URL = "https://dejavu-barber.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Salon Dejavu — Susehri Berber | Sac ve Sakal Tasarimi",
    template: "%s | Salon Dejavu",
  },
  description:
    "Susehri'nin en iyi erkek kuaforu. Profesyonel sac kesimi, sakal trasi, cilt bakimi. Salon Dejavu — Sivas Cd. No:55/C, Susehri/Sivas. Randevu icin: 0539 725 68 86",
  keywords: [
    "susehri berber", "Susehri berber", "Suşehri berber",
    "susehri erkek kuaforu", "Suşehri erkek kuaförü",
    "sivas berber", "Sivas berber",
    "salon dejavu", "Salon Dejavu",
  ],
  openGraph: {
    title: "Salon Dejavu — Susehri Berber",
    description: "Susehri'nin en iyi erkek kuaforu. Profesyonel sac ve sakal tasarimi.",
    url: SITE_URL,
    siteName: "Salon Dejavu",
    locale: "tr_TR",
    type: "website",
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
};

// JSON-LD rendered inside RootLayout body:
const jsonLd = generateBusinessJsonLd(SITE_URL);
```

### Complete JSON-LD HairSalon Schema
```typescript
// Source: https://schema.org/HairSalon + https://developers.google.com/search/docs/appearance/structured-data/local-business
// Note: schema.org does not have a distinct BarberShop type.
// HairSalon (subtype of HealthAndBeautyBusiness > LocalBusiness) is the closest match.
{
  "@context": "https://schema.org",
  "@type": "HairSalon",
  "name": "Salon Dejavu",
  "alternateName": "Dejavu Erkek Kuaforu",
  "description": "Susehri/Sivas'taki Salon Dejavu Erkek Kuaforu. Profesyonel sac ve sakal tasarimi hizmetleri.",
  "url": "https://dejavu-barber.vercel.app",
  "telephone": "+905397256886",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Cami Orta Mahallesi, Sivas Cd. No:55/C",
    "addressLocality": "Susehri",
    "addressRegion": "Sivas",
    "postalCode": "58600",
    "addressCountry": "TR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.163,
    "longitude": 38.087
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "07:00",
      "closes": "23:30"
    }
  ],
  "image": "https://dejavu-barber.vercel.app/images/gallery/dejavu-kuafor.jpg",
  "priceRange": "$$",
  "currenciesAccepted": "TRY",
  "paymentAccepted": "Cash, Credit Card"
}
```

### OG Image Preparation Script
```bash
# Resize dukkan disi fotografi for ana sayfa OG image (1200x630)
npx sharp-cli resize 1200 630 --fit cover -i resimler/dejavu-kuafor.jpg -o src/app/opengraph-image.jpg

# Resize ic mekan fotografi for galeri OG image (1200x630)
npx sharp-cli resize 1200 630 --fit cover -i resimler/kuafor-icerisi.jpg -o src/app/galeri/opengraph-image.jpg
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| next-seo package | Built-in Metadata API | Next.js 13.2+ (2023) | No extra dependency needed |
| Static sitemap.xml file | `sitemap.ts` file convention | Next.js 13.3+ (2023) | Programmatic, type-safe |
| Custom OG image API routes | File-based opengraph-image.jpg | Next.js 13.3+ (2023) | Auto meta tag generation |
| next/head for metadata | Export `metadata` object | Next.js 13+ (2023) | Server-component compatible |
| BarberShop schema type | HairSalon (schema.org) | Current | No distinct BarberShop type exists in schema.org |

**Deprecated/outdated:**
- `next-seo` package: Still works but unnecessary with built-in Metadata API
- `next/head`: Not supported in App Router server components
- Manual robots.txt file: Use `robots.ts` for programmatic generation

## Geo Coordinates Note

Susehri ilce merkezi approximate coordinates: **40.163 N, 38.087 E** (based on public geographic data for Susehri, Sivas). The CONTEXT.md notes that exact coordinates for Salon Dejavu should be researched. Since Google Maps API lookup for the specific business address was not available during research, the district center coordinates are used as a reasonable approximation. These can be refined if the business owner provides exact GPS coordinates.

**Confidence: MEDIUM** - District-level coordinates, not exact business location.

## Open Questions

1. **Exact Vercel subdomain name**
   - What we know: User wants `dejavu-barber.vercel.app` or similar
   - What's unclear: Exact name availability on Vercel
   - Recommendation: Use `dejavu-barber` as target, Vercel will auto-assign if taken. All canonical URLs and JSON-LD should use a constant so it's easy to update post-deploy

2. **Exact geo coordinates for the barbershop**
   - What we know: Susehri center is ~40.163, 38.087
   - What's unclear: Exact GPS of Sivas Cd. No:55/C
   - Recommendation: Use district center coordinates as default, update if owner provides exact location

3. **Lighthouse 90+ feasibility with GSAP + Motion**
   - What we know: Both libraries are used. GSAP core + ScrollTrigger is the only import. Motion uses tree-shakeable `motion/react`
   - What's unclear: Combined JS bundle impact on mobile Lighthouse
   - Recommendation: Run Lighthouse after deploy, optimize iteratively. User accepts 85+ as fallback if animations must be preserved

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Python test files exist (test_smoke.py, test_site.py etc.) -- likely Playwright/Selenium |
| Config file | No JS/TS test framework configured |
| Quick run command | `npx next build` (build validation) |
| Full suite command | `npx next build && npx next start` (build + serve for manual Lighthouse) |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| SEOD-01 | JSON-LD BarberShop structured data in page source | smoke | `npx next build && curl -s http://localhost:3000 \| grep "application/ld+json"` | No -- Wave 0 |
| SEOD-02 | Turkish meta tags and OG tags present | smoke | `npx next build && curl -s http://localhost:3000 \| grep "og:image"` | No -- Wave 0 |
| SEOD-03 | Site live on Vercel URL | manual-only | Manual: visit Vercel URL in browser | N/A |
| SEOD-04 | Lighthouse mobile 90+ | manual-only | Manual: run Lighthouse in Chrome DevTools on deployed URL | N/A |

### Sampling Rate
- **Per task commit:** `npx next build` (ensures no build errors)
- **Per wave merge:** `npx next build` + verify HTML output contains JSON-LD and OG tags
- **Phase gate:** Full Lighthouse audit on deployed Vercel URL

### Wave 0 Gaps
- [ ] No JS/TS test framework -- SEO validation is primarily build-time and manual Lighthouse
- [ ] SEOD-01 and SEOD-02 can be verified by inspecting build output HTML
- [ ] SEOD-03 and SEOD-04 require deployment and manual verification

*(Formal test infrastructure not critical for this phase -- SEO correctness is verified via build output inspection and Lighthouse audit on deployed site)*

## Sources

### Primary (HIGH confidence)
- [Next.js JSON-LD Guide](https://nextjs.org/docs/app/guides/json-ld) - Official pattern for structured data
- [Next.js Metadata and OG Images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images) - File-based OG, metadata API
- [Next.js generateMetadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) - Full metadata fields reference
- [Next.js sitemap.xml convention](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) - Sitemap API
- [Next.js robots.txt convention](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots) - Robots API
- [schema.org HairSalon](https://schema.org/HairSalon) - Schema type for barbershops
- [Google Local Business Structured Data](https://developers.google.com/search/docs/appearance/structured-data/local-business) - Google's requirements

### Secondary (MEDIUM confidence)
- [Vercel Analytics quickstart](https://vercel.com/docs/analytics/quickstart) - @vercel/analytics setup
- [@vercel/analytics npm](https://www.npmjs.com/package/@vercel/analytics) - Version 2.0.1 verified via npm registry
- [schema.org OpeningHoursSpecification](https://schema.org/OpeningHoursSpecification) - Hours format

### Tertiary (LOW confidence)
- Susehri geo coordinates (40.163, 38.087) - District-level, not exact business location

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All built-in Next.js features, well-documented
- Architecture: HIGH - File conventions and metadata API are stable, well-documented patterns
- Pitfalls: HIGH - Common Next.js SEO issues are well-known
- Geo coordinates: MEDIUM - District center, not exact address
- Lighthouse 90+ feasibility: MEDIUM - Depends on animation bundle size, may need 85+ fallback

**Research date:** 2026-04-02
**Valid until:** 2026-05-02 (stable Next.js APIs, unlikely to change)
