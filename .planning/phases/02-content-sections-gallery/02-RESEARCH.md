# Phase 2: Content Sections & Gallery - Research

**Researched:** 2026-04-01
**Domain:** Next.js content sections, image optimization, gallery/lightbox, Google Maps embed
**Confidence:** HIGH

## Summary

Phase 2, mevcut placeholder bolumleri gercek isletme verileriyle dolduracak ve ayri bir galeri sayfasi olusturacak. Teknik acidan nispeten basit bir faz -- cogu is Tailwind ile layout olusturma, constants dosyasini genisletme ve next/image ile fotograf optimizasyonu. En karmasik teknik kararlar masonry grid yaklasimi ve lightbox bileseni secimi.

Fotograflar `resimler/` klasorunde mevcut (7 adet JPG, toplam ~1.4MB). Bunlarin `public/images/` altina tasinmasi ve next/image ile static import kullanilarak otomatik blur placeholder ve WebP donusumu saglanmasi gerekiyor. Galeri icin masonry layout CSS columns ile yapilabilir (native CSS masonry henuz stable degil). Lightbox icin ya custom basit bir cozum ya da yet-another-react-lightbox-lite (~5KB) kullanilabilir.

**Primary recommendation:** Fotograflari `public/images/` altina tasi, static import ile next/image kullan (otomatik blur + WebP), masonry icin CSS columns kullan, lightbox icin minimal custom bilesen yaz (7 fotograf icin kutuphane gereksiz).

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Hero: dejavu-kuafor.jpg tam ekran background, %70-80 agir overlay, Logo bileseni (mobil 60px / desktop 120px) + slogan + CTA + scroll ok
- CTA butonu WhatsApp'a yonlendirir (BUSINESS.whatsappUrl)
- Scroll ok: Neon glow efektli (#E11D48) chevron, bounce animasyonu
- Hakkimizda: 2 sutunlu layout (sol metin, sag fotograf: kuafor-icerisi.jpg veya kuafor-ici.jpg), mobilde alt alta
- Hizmetler: Kategorili gruplar (Sac, Sakal, Cilt Bakimi, Ozel Hizmetler), fiyat GOSTERILMEYECEK, RetroCard bileseni, vintage SVG ikonlar, grid 3/2/1 sutun
- Galeri: Masonry grid, lightbox (tam ekran overlay + sag/sol gezinme), filtre butonlari (Tumu/Dukkan/Calismalarimiz), 7 mevcut fotograf
- Iletisim: Google Maps iframe embed (API key gereksiz), adres/telefon/saatler BUSINESS constant'indan, footer gorevi gorur + copyright
- WhatsApp floating buton: Yesil daire, beyaz ikon, sag alt fixed, on yazili mesaj "Merhaba, randevu almak istiyorum.", her sayfada gorunur
- Constants genisletme: Hizmet kategorileri/listesi, galeri fotograf listesi, WhatsApp on yazili mesaj

### Claude's Discretion
- CTA buton stili (neon kirmizi vs altin outline)
- Iletisim bolumu layout detaylari
- Hizmet aciklama metinleri
- Hakkimizda paragraf metni
- Lightbox bileseninin teknik uygulamasi
- Masonry grid teknik yaklasimi (CSS columns vs JS library)
- Fotograf boyutlari ve aspect ratio'lari
- Scroll ok animasyonunun teknik detaylari

### Deferred Ideas (OUT OF SCOPE)
None
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CONT-01 | Tam ekran hero, DEJAVU neon efektiyle | Hero section pattern: full-screen bg image + overlay + Logo bileseni + neon-glow CSS class |
| CONT-02 | Hakkimizda bolumu: dukkan hikayesi ve ekip | 2-column layout pattern, next/image for shop photo |
| CONT-03 | Hizmetler bolumu: kategorize kartlar | RetroCard + grid layout, constants'tan data-driven rendering |
| CONT-04 | Iletisim: Maps embed, adres, telefon, saatler | Google Maps iframe (no API key), BUSINESS constant |
| CONT-05 | WhatsApp floating buton, her sayfada | Fixed position component in layout.tsx, wa.me URL with pre-filled text |
| CONT-06 | Tum veriler tek constants dosyasindan | constants.ts genisletme: SERVICES, GALLERY_IMAGES, WHATSAPP_MESSAGE |
| GALR-01 | /galeri: grid/masonry layout | CSS columns masonry, category filter with useState |
| GALR-02 | next/image ile optimize (WebP, lazy, blur) | Static import = automatic blur + WebP + srcSet |
| GALR-03 | Smooth sayfa gecisi (ana sayfa <-> galeri) | Temel yapi bu fazda, animasyon detaylari Phase 3 |
</phase_requirements>

## Standard Stack

### Core (Zaten Projede Mevcut)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.2.2 | Framework, Image optimization, App Router | Proje temeli |
| react | 19.2.4 | UI library | Proje temeli |
| tailwindcss | ^4 | Styling | Proje temeli |
| motion | ^12.38.0 | Navbar/menu animasyonlari (Phase 1) | Mevcut, Phase 2'de minimal kullanim |

### Bu Fazda EK Paket Gerekmiyor

Phase 2 icin yeni npm paketi kurulmasina gerek yok. Tum isler mevcut stack ile yapilabilir:
- **Masonry:** CSS columns (pure CSS, kutuphane gereksiz)
- **Lightbox:** Custom React bileseni (7 fotograf icin kutuphane overhead'i gereksiz, ~50 satir kod)
- **Google Maps:** Native iframe embed
- **WhatsApp:** Basit `<a>` tag with wa.me URL
- **SVG ikonlar:** Inline SVG components (Phase 1 pattern'ine tutarli)

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CSS columns masonry | yet-another-react-lightbox | Ek dependency, 7 fotograf icin overkill |
| Custom lightbox | yet-another-react-lightbox-lite (5KB) | Iyi kutuphane ama 7 fotograf + basit navigation icin custom daha hafif |
| Google Maps iframe | @googlemaps/js-api-loader | API key gerektirir, basit embed icin gereksiz karmasiklik |

## Architecture Patterns

### Recommended Project Structure (Phase 2 Eklemeleri)
```
src/
├── app/
│   ├── page.tsx              # Ana sayfa (hero + hakkimizda + hizmetler + iletisim)
│   └── galeri/
│       └── page.tsx          # Galeri sayfasi
├── components/
│   ├── layout/
│   │   └── WhatsAppButton.tsx  # Floating WhatsApp butonu
│   ├── sections/
│   │   ├── Hero.tsx            # Hero section
│   │   ├── About.tsx           # Hakkimizda section
│   │   ├── Services.tsx        # Hizmetler section
│   │   ├── Contact.tsx         # Iletisim/footer section
│   │   └── ServiceCard.tsx     # Tekil hizmet karti
│   ├── gallery/
│   │   ├── GalleryGrid.tsx     # Masonry grid + filtre (client component)
│   │   └── Lightbox.tsx        # Fullscreen lightbox (client component)
│   └── ui/
│       └── ScrollDownArrow.tsx # Bounce animasyonlu scroll ok
├── lib/
│   └── constants.ts          # Genisletilmis: SERVICES, GALLERY_IMAGES, WHATSAPP_MESSAGE
└── public/
    └── images/               # resimler/ dan tasinan optimize edilmis fotograflar
        ├── hero/
        │   └── dejavu-kuafor.jpg
        ├── about/
        │   └── kuafor-icerisi.jpg
        └── gallery/
            ├── dejavu-kuafor.jpg
            ├── dejavu-kuafor2.jpg
            ├── kuafor-ici.jpg
            ├── kuafor-ici2.jpg
            ├── sac.jpg
            └── sac2.jpg
```

### Pattern 1: Data-Driven Sections from Constants
**What:** Tum isletme verileri `constants.ts` dosyasindan gelir, bilesenler bu veriyi map eder
**When to use:** Her content section icin
**Example:**
```typescript
// src/lib/constants.ts
export const SERVICES = [
  {
    category: "Sac",
    items: [
      { name: "Sac Kesimi", description: "Klasik ve modern sac kesim teknikleri.", icon: "scissors" },
      { name: "Sac Boyama", description: "Profesyonel sac boyama ve balyaj.", icon: "brush" },
    ],
  },
  // ... diger kategoriler
] as const;

export const GALLERY_IMAGES = [
  { src: "/images/gallery/dejavu-kuafor.jpg", alt: "Dejavu Kuafor dis gorunum", category: "dukkan" },
  { src: "/images/gallery/sac.jpg", alt: "Sac tasarimi calismasi", category: "calismalarimiz" },
  // ...
] as const;

export const WHATSAPP_MESSAGE = "Merhaba, randevu almak istiyorum." as const;
```

### Pattern 2: Static Image Import for Blur Placeholders
**What:** next/image ile static import kullanarak otomatik blur placeholder, WebP donusumu ve srcSet
**When to use:** Galeri ve bolum fotograflari icin
**Example:**
```typescript
// Galeri sayfasinda static import KULLANILMAZ cunku dinamik filtreleme var
// Bunun yerine public/ klasorunden path ile yuklenir
// Blur placeholder icin: placeholder="blur" + blurDataURL (base64 string)

// Hakkimizda bolumunde ise static import kullanilabilir:
import aboutImage from "@/public/images/about/kuafor-icerisi.jpg";
import Image from "next/image";

<Image
  src={aboutImage}
  alt="Salon Dejavu ic mekan"
  placeholder="blur"   // otomatik blur — static import sayesinde
  className="rounded-lg object-cover"
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### Pattern 3: CSS Columns Masonry
**What:** CSS `columns` property ile masonry benzeri layout
**When to use:** Galeri sayfasinda farkli boy fotograflar icin
**Example:**
```css
.masonry-grid {
  columns: 1;
  column-gap: 1rem;
}
@media (min-width: 640px) {
  .masonry-grid { columns: 2; }
}
@media (min-width: 1024px) {
  .masonry-grid { columns: 3; }
}
.masonry-grid > * {
  break-inside: avoid;
  margin-bottom: 1rem;
}
```

### Pattern 4: Custom Lightweight Lightbox
**What:** useState ile kontrol edilen fullscreen overlay, keyboard navigation, swipe destegi
**When to use:** Galeri fotograflarini buyutmek icin
**Example:**
```typescript
"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

interface LightboxProps {
  images: { src: string; alt: string }[];
  initialIndex: number;
  onClose: () => void;
}

export function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex);

  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, next, prev]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="relative max-h-[90vh] max-w-[90vw]">
        <Image
          src={images[index].src}
          alt={images[index].alt}
          width={1200}
          height={800}
          className="max-h-[90vh] w-auto object-contain"
        />
        <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl">&#8249;</button>
        <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl">&#8250;</button>
        <button onClick={onClose} className="absolute top-4 right-4 text-white text-2xl">&#10005;</button>
      </div>
    </div>
  );
}
```

### Pattern 5: WhatsApp Floating Button
**What:** Fixed position, tum sayfalarda gorunen WhatsApp butonu
**When to use:** layout.tsx icinde, main'den sonra
**Example:**
```typescript
// src/components/layout/WhatsAppButton.tsx
import { BUSINESS, WHATSAPP_MESSAGE } from "@/lib/constants";

export function WhatsAppButton() {
  const url = `${BUSINESS.whatsappUrl}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile randevu al"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform hover:scale-110"
    >
      {/* WhatsApp SVG icon */}
      <svg viewBox="0 0 24 24" fill="white" className="h-7 w-7">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.4 0-4.637-.78-6.457-2.1l-.36-.27-3.48 1.167 1.167-3.48-.27-.36A9.958 9.958 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
      </svg>
    </a>
  );
}
```

### Pattern 6: Google Maps Iframe Embed (No API Key)
**What:** Google Maps'ten alinan iframe embed kodu ile harita gosterimi
**When to use:** Iletisim bolumunde
**Example:**
```typescript
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d37.9835!3d40.1588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCami+Orta+Mahallesi%2C+Sivas+Cd.+No%3A55%2FC%2C+58600+S%C3%BC%C5%9Fehri%2FSivas!5e0!3m2!1str!2str"
  width="100%"
  height="400"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  title="Salon Dejavu Konum"
/>
```
**Not:** Gercek embed URL'si Google Maps'ten alinmali. Uygulama sirasinda dogrulanacak. Alternatif olarak adres bazli basit URL kullanilabilir:
```
https://www.google.com/maps/embed/v1/place?q=Cami+Orta+Mahallesi+Sivas+Cd+No+55/C+Susehri+Sivas
```

### Anti-Patterns to Avoid
- **Client component overuse:** Hero, Hakkimizda, Hizmetler, Iletisim bolumlerinin hepsi server component olabilir. Sadece interaktivite gerektiren bilesenler (GalleryGrid, Lightbox, ScrollDownArrow) client component olmali.
- **Inline business data:** Hicbir bolumde hard-coded isletme verisi olmamali -- hepsi `constants.ts` dosyasindan gelmeli.
- **next/image olmadan fotograf kullanma:** Tum fotograflar next/image ile yuklenecek -- ham `<img>` tag kullanilmayacak.
- **Galeri fotograflarini static import ile yukleme:** Filtre degisince dinamik gosterim gerektigi icin src path string olarak kullanilmali, static import degil. Blur icin blurDataURL opsiyonel.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image optimization | Manuel WebP donusumu, resize | `next/image` component | Otomatik WebP, srcSet, lazy loading, blur placeholder |
| Responsive grid | Custom JS grid hesaplamalari | Tailwind `grid-cols-*` + `columns-*` | CSS native, JS gereksiz |
| WhatsApp entegrasyonu | Custom API | `wa.me` URL + `text` parameter | Standart, API key gereksiz |
| Google Maps | @googlemaps/js-api-loader | iframe embed | API key gereksiz, basit kullanim icin yeterli |
| Scroll locking (lightbox) | Custom scroll prevention | `document.body.style.overflow = "hidden"` | Basit ve etkili |

**Key insight:** Phase 2 buyuk olcude icerik doldurmaya odaklanir. Karmasik teknik cozumler gereksiz -- mevcut Next.js ve CSS yetenekleri tum gereksinimleri karsilar.

## Common Pitfalls

### Pitfall 1: next/image width/height Zorunlulugu
**What goes wrong:** Remote/path-based src kullanan next/image'da width ve height belirtmemek build hatasina yol acar
**Why it happens:** Static import disinda next/image boyut bilgisi alamaz
**How to avoid:** Path-based kullandiginda her zaman width/height veya fill prop'u belirt. Galeri icin `fill` + parent container sizing kullan.
**Warning signs:** Build hatasi: "Image with src X must use width and height"

### Pitfall 2: Galeri Filtresi State Yonetimi
**What goes wrong:** Filtre degistiginde layout bozulur veya animasyon atlama yapar
**Why it happens:** CSS columns reflow animasyonu zor, filtre sonrasi eleman sayisi degisince columns yeniden dagitilir
**How to avoid:** `transition-opacity` ile fade in/out kullan. Filtrelenen elemanlari DOM'dan kaldirmak yerine `hidden` class ile gizle veya opacity:0 yap.
**Warning signs:** Filtre butonuna tiklandiginda fotograflarin aniden yer degistirmesi

### Pitfall 3: Hero Background Image Optimizasyonu
**What goes wrong:** Buyuk JPG arka plan resmini next/image ile degil, CSS background-image ile yukleme performansi dusurur
**Why it happens:** CSS background-image WebP donusumu ve lazy loading desteklemez
**How to avoid:** Hero icin next/image fill mode + absolute positioning + object-cover kullan (background-image yerine). Ya da hero above-the-fold oldugu icin `priority` prop ekle.
**Warning signs:** Lighthouse'da LCP (Largest Contentful Paint) uyarisi

### Pitfall 4: Google Maps Iframe Lazy Loading
**What goes wrong:** Maps iframe sayfanin ilk yuklemesini yavaslatir
**Why it happens:** iframe default olarak eager yukler
**How to avoid:** `loading="lazy"` attribute ekle -- iframe viewport'a girinceye kadar yuklenmez
**Warning signs:** Network tab'da maps.googleapis.com istekleri sayfa yuklemesinde gorunur

### Pitfall 5: WhatsApp URL Encoding
**What goes wrong:** On yazili mesajdaki Turkce karakterler bozulur
**Why it happens:** URL encoding yapilmadiginda ozel karakterler kaybolur
**How to avoid:** `encodeURIComponent()` ile mesaj metnini encode et
**Warning signs:** WhatsApp'ta mesaj bos acilir veya garip karakterler gorunur

### Pitfall 6: Lightbox Body Scroll Lock
**What goes wrong:** Lightbox acikken arka planda sayfa scroll olmaya devam eder
**Why it happens:** Fixed overlay scroll'u engellemez
**How to avoid:** Lightbox acildiginda `body.style.overflow = "hidden"`, kapandiginda geri al. Cleanup fonksiyonunda da geri almak kritik.
**Warning signs:** Lightbox acikken arka plandaki sayfanin kaydigi gorunur

## Code Examples

### Hero Section with Full-Screen Background
```typescript
// src/components/sections/Hero.tsx (Server Component)
import Image from "next/image";
import { Logo } from "@/components/ui/Logo";
import { BUSINESS, CTA_TEXT } from "@/lib/constants";
import { ScrollDownArrow } from "@/components/ui/ScrollDownArrow";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center">
      {/* Background image */}
      <Image
        src="/images/hero/dejavu-kuafor.jpg"
        alt="Salon Dejavu"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/75" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <Logo height={60} className="block md:hidden" />
        <Logo height={120} className="hidden md:block" />
        <p className="mt-4 text-lg md:text-xl text-cream font-body tracking-wide">
          {BUSINESS.subtitle}
        </p>
        <a
          href={`${BUSINESS.whatsappUrl}?text=${encodeURIComponent("Merhaba, randevu almak istiyorum.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 px-8 py-3 border-2 border-neon-red text-neon-red font-bold uppercase tracking-widest hover:bg-neon-red hover:text-white transition-colors"
        >
          {CTA_TEXT}
        </a>
      </div>

      <ScrollDownArrow />
    </section>
  );
}
```

### Constants File Extension Pattern
```typescript
// src/lib/constants.ts — genisletilmis
export type ServiceCategory = {
  category: string;
  items: { name: string; description: string; icon: string }[];
};

export type GalleryImage = {
  src: string;
  alt: string;
  category: "dukkan" | "calismalarimiz";
  width: number;
  height: number;
};

export const SERVICES: ServiceCategory[] = [
  {
    category: "Sac",
    items: [
      { name: "Sac Kesimi", description: "Klasik ve modern sac kesim teknikleri.", icon: "scissors" },
      { name: "Sac Boyama", description: "Profesyonel sac boyama ve renklendirme.", icon: "brush" },
      { name: "Perma", description: "Dogal gorunumlu perma uygulamalari.", icon: "comb" },
    ],
  },
  // ... Sakal, Cilt Bakimi, Ozel Hizmetler
];

export const GALLERY_IMAGES: GalleryImage[] = [
  { src: "/images/gallery/dejavu-kuafor.jpg", alt: "Dejavu Kuafor dis gorunum", category: "dukkan", width: 800, height: 600 },
  // ... 7 fotograf
];

export const WHATSAPP_MESSAGE = "Merhaba, randevu almak istiyorum." as const;

export const GALLERY_FILTERS = [
  { label: "Tumu", value: "all" },
  { label: "Dukkan", value: "dukkan" },
  { label: "Calismalarimiz", value: "calismalarimiz" },
] as const;
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| CSS masonry (native) | CSS columns (stable) | 2025 -- masonry still experimental | CSS columns tum browserlarda calisir, native masonry henuz stable degil |
| External lightbox lib | Custom minimal lightbox | 2024+ | 7 fotograf icin ~50 satir kod yeterli, dependency gereksiz |
| Google Maps JS API | iframe embed | Hep vardi | Basit marker/embed icin API key gereksiz |
| Manual blur hash | next/image static import | Next.js 13+ | Static import otomatik blurDataURL uretir |

**Deprecated/outdated:**
- `next/legacy/image`: Eski Image component, `next/image` kullanilmali
- CSS masonry (`grid-template-rows: masonry`): Sadece Firefox flag arkasinda, Safari experimental -- production'da kullanilmamali
- react-image-lightbox: Archived/unmaintained

## Open Questions

1. **Google Maps embed URL'si**
   - What we know: iframe embed API key gerektirmez, adres bazli calisir
   - What's unclear: Susehri'deki dukkanin tam Google Maps embed URL'si (Google Maps'ten alinmali)
   - Recommendation: Uygulama sirasinda Google Maps'te adresi arayip "Share > Embed" ile gercek URL'yi al. Simdilik placeholder URL kullan.

2. **Fotograf boyutlari**
   - What we know: 7 JPG dosyasi, 117KB-257KB arasi
   - What's unclear: Her fotografin pixel boyutlari (width x height)
   - Recommendation: Uygulama sirasinda fotograflari incele, constants'a width/height ekle. Masonry icin aspect ratio farkli olacak.

3. **Hizmet listesi detaylari**
   - What we know: 4 kategori (Sac, Sakal, Cilt Bakimi, Ozel Hizmetler)
   - What's unclear: Her kategorideki tam hizmet listesi
   - Recommendation: Genel berber hizmetleri listesi olustur, dukkan sahibi sonra duzeltebilir. Constants'ta kolayca degistirilebilir yapida tut.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | No test framework configured |
| Config file | none |
| Quick run command | `npm run build` (type check + build verification) |
| Full suite command | `npm run build && npm run lint` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CONT-01 | Hero section renders with logo | smoke | `npm run build` | N/A |
| CONT-02 | Hakkimizda section renders | smoke | `npm run build` | N/A |
| CONT-03 | Hizmetler section renders cards | smoke | `npm run build` | N/A |
| CONT-04 | Iletisim section with Maps | smoke | `npm run build` | N/A |
| CONT-05 | WhatsApp button visible | manual-only | Manual browser check | N/A |
| CONT-06 | All data from constants | manual-only | Code review: grep for hardcoded data | N/A |
| GALR-01 | /galeri masonry grid | manual-only | Navigate to /galeri in browser | N/A |
| GALR-02 | Images optimized (WebP, blur) | manual-only | Chrome DevTools Network tab | N/A |
| GALR-03 | Page transition foundation | smoke | `npm run build` (route exists) | N/A |

### Sampling Rate
- **Per task commit:** `npm run build`
- **Per wave merge:** `npm run build && npm run lint`
- **Phase gate:** Full build + manual browser verification of all sections

### Wave 0 Gaps
- No test framework installed -- this is acceptable for a small static site. Build verification + manual browser testing is the primary validation method.
- Fotograflarin `public/images/` altina tasinmasi build oncesi yapilmali

## Sources

### Primary (HIGH confidence)
- Next.js Image Component docs -- blur placeholder, static import, fill mode, priority
- Tailwind CSS 4 -- @theme tokens, responsive grid, columns utility
- Existing project code (constants.ts, RetroCard.tsx, Logo.tsx, page.tsx, layout.tsx, globals.css)

### Secondary (MEDIUM confidence)
- [Google Maps iframe embed](https://developers.google.com/maps/documentation/embed/embedding-map) -- no API key embed method
- [WhatsApp Click to Chat](https://faq.whatsapp.com/5913398998672934) -- wa.me URL with text parameter
- [CSS columns for masonry](https://developer.mozilla.org/en-US/docs/Web/CSS/columns) -- stable cross-browser support
- [Yet Another React Lightbox Lite](https://github.com/igordanchenko/yet-another-react-lightbox-lite) -- 5KB lightweight alternative (not recommended for this project, custom preferred)

### Tertiary (LOW confidence)
- CSS native masonry status -- still experimental in all browsers, not production-ready

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - mevcut proje stack'i yeterli, ek paket gereksiz
- Architecture: HIGH - Next.js App Router + server/client component pattern'leri iyi belgelenmis
- Pitfalls: HIGH - next/image, iframe, WhatsApp URL gibi konular iyi bilinen konular
- Masonry approach: MEDIUM - CSS columns calisiyor ama native masonry kadar esnek degil (7 fotograf icin yeterli)
- Lightbox: MEDIUM - custom cozum basit ama edge case'ler (touch swipe, pinch zoom) icin sinirli

**Research date:** 2026-04-01
**Valid until:** 2026-05-01 (stable teknolojiler, hizli degisim beklenmez)
