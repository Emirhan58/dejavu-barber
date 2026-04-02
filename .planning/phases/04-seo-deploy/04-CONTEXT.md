# Phase 4: SEO & Deploy - Context

**Gathered:** 2026-04-02
**Status:** Ready for planning

<domain>
## Phase Boundary

Siteyi arama motorlarina optimize etme (JSON-LD structured data, Turkce meta tags, OG tags, sitemap), Lighthouse performans optimizasyonu ve Vercel'e deploy. Mevcut animasyonlar ve icerik degismez — sadece SEO meta katmani, performans iyilestirmeleri ve deploy islemleri.

</domain>

<decisions>
## Implementation Decisions

### OG Image & Sosyal Paylasim
- Ana sayfa og:image: Dukkan disi fotografi (DEJAVU neon tabelasi gorunen) — marka taninirligi icin
- Galeri sayfasi: Ayri og:image (ic mekan veya calisma fotografi) ve ayri meta description
- og:image boyutu: 1200x630 standart OG boyutu
- Mevcut resimler/ klasorundeki fotograflardan optimize edilmis versiyonlar kullanilacak

### Domain & URL
- Sadece Vercel subdomain kullanilacak (dejavu-barber.vercel.app veya benzeri)
- Custom domain satin alinmayacak, simdilik ucretsiz Vercel URL'si yeterli
- Canonical URL'ler Vercel subdomain'e isaret edecek

### Lighthouse & Performans
- Animasyonlar oncelikli — portfolio kalitesi korunsun, 85+ kabul edilebilir
- GSAP ve Framer Motion icin tree-shaking ve dynamic import optimizasyonu yapilacak
- Kullanilmayan GSAP plugin'leri cikarilacak
- LCP optimizasyonu: Hero fotografi preload, font display swap (zaten mevcut)
- Animasyonlar LCP'yi engellememeli — intro animasyonu icin lazy approach

### Meta Icerik & SEO Stratejisi
- Yerel odakli anahtar kelimeler — hem ASCII hem Turkce karakterli versiyonlar:
  - "susehri berber" / "Susehri berber" / "Suşehri berber"
  - "susehri erkek kuaforu" / "Suşehri erkek kuaförü"
  - "sivas berber" / "Sivas berber"
  - "salon dejavu" / "Salon Dejavu"
- JSON-LD: BarberShop/LocalBusiness structured data — isletme adi, adres, telefon, calisma saatleri
- JSON-LD geo koordinatlari: Claude arastiracak (Google Maps'ten Susehri Salon Dejavu icin)
- Tum isletme verileri constants.ts'den alinacak (Phase 2 karari)

### Sitemap & Robots
- Next.js metadata API ile sitemap.ts ve robots.ts — build sirasinda otomatik uretilir
- Sayfalar: / (ana sayfa) ve /galeri

### Favicon
- Mevcut DEJAVU logosu/makas ikonundan favicon seti uretilecek (16x16, 32x32, apple-touch-icon)
- src/app/favicon.ico zaten mevcut, gerekirse guncellenecek

### Analytics
- Vercel Analytics entegrasyonu — ucretsiz, zero-config
- Deploy sirasinda aktif edilecek

### Claude's Discretion
- Exact meta description metinleri (anahtar kelime stratejisine uygun)
- JSON-LD icindeki exact field'lar (openingHoursSpecification format vs basit)
- Lighthouse optimizasyon detaylari (hangi GSAP plugin cikarilacak, dynamic import stratejisi)
- Favicon exact boyutlari ve format (ICO vs PNG vs SVG)
- og:image icin fotograflarin exact crop/resize yaklasimi
- Vercel Analytics konfigurasyonu

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

No external specs — requirements fully captured in decisions above and project files:

### Project context
- `.planning/PROJECT.md` — Proje vizyonu, isletme bilgileri (adres, telefon, saatler)
- `.planning/REQUIREMENTS.md` — SEOD-01 through SEOD-04 requirements
- `.planning/ROADMAP.md` — Phase 4 success criteria (4 madde)

### Business data source
- `src/lib/constants.ts` — Tum isletme verileri (BUSINESS objesi: ad, telefon, adres, saatler, hizmetler)

### Existing meta setup
- `src/app/layout.tsx` — Mevcut metadata export (title, description, lang="tr")

### Prior phase decisions
- `.planning/phases/02-content-sections-gallery/02-CONTEXT.md` — Bolum yapilari, galeri sayfasi, constants.ts kullanimlari
- `.planning/phases/03-animation-layer/03-CONTEXT.md` — Animasyon altyapisi, GSAP/Motion kullanimi (optimizasyon icin)

### Business assets
- `resimler/` — 7 dukkan fotografi (og:image kaynaklari)
- `public/images/` — Optimize edilmis site gorselleri

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `constants.ts` BUSINESS objesi: JSON-LD structured data icin tum isletme verileri hazir (ad, adres, telefon, saatler)
- `constants.ts` SERVICES dizisi: Hizmet bilgileri JSON-LD icin kullanilabilir
- `layout.tsx` metadata export: Mevcut basit metadata, genisletilecek
- `src/app/favicon.ico`: Mevcut favicon dosyasi

### Established Patterns
- Next.js App Router metadata API kullaniliyor (export const metadata)
- Font optimizasyonu: display: "swap" ve next/font/google zaten aktif
- Image optimizasyonu: next/image ile WebP, blur placeholder zaten galeri ve hero'da kullaniliyor
- Server component varsayilan — SEO meta islemleri server-side olacak

### Integration Points
- `src/app/layout.tsx` — JSON-LD script tag ve genisletilmis metadata buraya eklenecek
- `src/app/galeri/page.tsx` veya `layout.tsx` — Galeri sayfasi icin ayri metadata
- `src/app/sitemap.ts` — Yeni dosya, Next.js sitemap API
- `src/app/robots.ts` — Yeni dosya, Next.js robots API
- `next.config.ts` — Vercel Analytics ve potansiyel image optimization ayarlari

</code_context>

<specifics>
## Specific Ideas

- Anahtar kelimelerde hem ASCII ("susehri") hem Turkce karakterli ("Suşehri") versiyonlar kullanilmali — yerel kullanicilar her iki sekilde de arar
- Dukkan disi fotografi (neon tabela) sosyal medya paylasimlarinda en guclu marka tanitimi saglar
- Animasyonlar kesinlikle korunsun — bu site portfolyo kalitesinde olmali, Lighthouse skoru ikincil
- Vercel Analytics sifir konfigurasyonla calismali — ekstra karmasiklik istenmiyor

</specifics>

<deferred>
## Deferred Ideas

- Custom domain baglantisi — gelecekte domain satin alinirsa eklenebilir
- Google Business Profile entegrasyonu — v2'de dusunulecek (ENHC-03)
- Sitemap'te hizmet detay sayfalari — suan tek sayfa yapi, gelecekte genisletilebilir

</deferred>

---

*Phase: 04-seo-deploy*
*Context gathered: 2026-04-02*
