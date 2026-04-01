# Phase 3: Animation Layer - Context

**Gathered:** 2026-04-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Mevcut statik icerik uzerine portfolio kalitesinde animasyonlar ekleme: DEJAVU neon intro sekansi, scroll reveal animasyonlari, hero parallax efekti, duman/buhar parcacik efekti (sadece desktop), neon glow hover efektleri ve sayfa gecis animasyonu. Mobilde sadece basit scroll reveal — parallax, parcacik ve agir efektler devre disi. Mevcut useAnimationTier uc katmanli sistemi kullanilacak.

</domain>

<decisions>
## Implementation Decisions

### Intro animasyonu (ANIM-01)
- Sure: 2-3 saniye toplam sekans
- Gorsel akis: DEJAVU harfleri rastgele sirayla tek tek neon glow ile yanar, tam parlakliga ulasir
- Slogan: Harfler yandiktan sonra "Sac ve Sakal Tasarimi" altta fade-in ile belirir
- Arka plan: Tamamen siyah (#000) — neon harfler icin maksimum kontrast
- Skip: Ekrana herhangi bir yere tiklamak/dokunmak intro'yu atlar
- Gecis: Intro ekrani yukari kayarak acilir, altindaki hero bolumu ortaya cikar (perde acilmasi efekti)
- sessionStorage ile kontrol: Ilk ziyarette gosterilir, sonraki sayfa yuklemelerinde atlanir
- Hem desktop hem mobilde gosterilir (ayni sekans)

### Scroll reveal animasyonlari (ANIM-02)
- Stil: Asagidan yukari kayma (30-50px) + fade-in (opacity 0->1)
- Tetikleme: Bolum %20 gorunur oldugunda (ScrollTrigger threshold)
- Stagger: Bolum icindeki elementler (kartlar, listeler) sirayla belirir (stagger 0.1-0.15s)
- Tum ana sayfa bolumleri: Hero (zaten gorunur), Hakkimizda, Hizmetler, Iletisim — hepsi scroll reveal
- Galeri sayfasi: Masonry grid fotograflari stagger ile asagidan yukari kayarak belirir
- GSAP ScrollTrigger ile uygulanir (Phase 1 karari)

### Parallax efekti (ANIM-03)
- Sadece Hero arka planinda (dejavu-kuafor.jpg) — diger bolumlerde parallax yok
- Hiz orani: 0.3-0.5x (hafif parallax — arka plan scroll hizinin %30-50'si kadar hareket eder)
- Sadece desktop'ta aktif (useAnimationTier "full" tier)
- GSAP ScrollTrigger ile uygulanir

### Duman/buhar parcacik efekti (ANIM-04)
- Tur: Duman/sis efekti — yavas hareket eden duman bulutlari
- Konum: Hero'nun alt %30-40'inda — logo ve CTA temiz kalir
- Renk: Beyaz/gri yari saydam (opacity %10-20)
- Parcacik sayisi: 8-12 adet (hafif, zarif)
- Hareket: Yavasca yukari dogru suruklenip kaybolur (buhar fizigi)
- Teknik: CSS animasyonlu div'ler (@keyframes, GPU hizlandirmali, transform: translate3d)
- Scroll davranisi: Hero'dan cikinca parcaciklar solarek kaybolur (gorunmeyen efekt calismaz)
- Sadece desktop'ta aktif (useAnimationTier "full" tier)
- Mobilde tamamen devre disi — hicbir parcacik DOM'da bile olmayacak

### Mobil animasyon kisitlamalari (ANIM-05)
- Mobil (reduced tier): Sadece basit scroll reveal (fade-in + slide-up), navbar gecisi, menu animasyonu
- Parallax YOK, parcacik efekti YOK, karmasik timeline YOK
- prefers-reduced-motion (none tier): Hicbir animasyon yok, aninda gecisler
- Phase 1'deki useAnimationTier hook'u tum kontrolleri saglayacak

### Neon glow hover efektleri (ANIM-06)
- Glow siddeti: Hafif — text-shadow 0 0 10px ile yumusak neon parlama
- Glow rengi: Kirmizi (#E11D48) — neon-red accent, DEJAVU tabelasiyla tutarli
- Gecis suresi: 0.2-0.3s hizli transition — aninda tepki hissi
- Uygulanacak elementler (Phase 1 karari): DEJAVU logosu, CTA butonlari, aktif scroll-spy cizgi, hero basligi
- Hizmet kartlarinda: Neon glow YOK — sadece hafif yukari kayma (2-4px translateY) + golge derinlesmesi (Motion whileHover)
- Kartlarda mevcut AnimationDemo pattern'i tasinir: whileHover scale degil, translateY + shadow

### Sayfa gecis animasyonu (GALR-03)
- Ana sayfa <-> /galeri gecisi: Fade out/in (Motion AnimatePresence)
- Mevcut icerigi fade-out, yeni sayfa fade-in
- Next.js App Router ile entegrasyon — layout.tsx'te AnimatePresence wrapper

### Claude's Discretion
- Intro animasyonundaki harf yanma suresi (her harf icin ms)
- Scroll reveal exact offset degerleri (30px vs 50px)
- Parallax exact speed factor (0.3 vs 0.5 arasi)
- Duman parcaciklarinin exact boyutu ve blur degerleri
- Sayfa gecis animasyonunun exact suresi
- Stagger delay exact degerleri (0.1 vs 0.15)
- CSS @keyframes animasyon detaylari (duman hareketi icin)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

No external specs — requirements are fully captured in decisions above and in project planning files:

### Project context
- `.planning/PROJECT.md` — Proje vizyonu, referans proje (emirhankaya.vercel.app animasyon kalitesi hedefi)
- `.planning/REQUIREMENTS.md` — ANIM-01 through ANIM-06 requirements
- `.planning/ROADMAP.md` — Phase 3 success criteria (5 madde)

### Prior phase decisions
- `.planning/phases/01-foundation-design-system/01-CONTEXT.md` — Animasyon siniri (GSAP vs Motion), uc katmanli degradasyon, neon glow kullanim yerleri, Lenis smooth scroll
- `.planning/phases/02-content-sections-gallery/02-CONTEXT.md` — Hero yapisi, bolum layout'lari, galeri masonry grid, WhatsApp butonu

### Existing animation infrastructure
- `src/lib/gsap-config.ts` — GSAP + ScrollTrigger + useGSAP plugin registration (singleton)
- `src/hooks/useAnimationTier.ts` — Uc katmanli animasyon degradasyonu hook (full/reduced/none)
- `src/components/providers/AnimationProvider.tsx` — GSAP plugin init wrapper
- `src/components/providers/SmoothScrollProvider.tsx` — Lenis + GSAP ticker entegrasyonu (sadece desktop)
- `src/components/demo/AnimationDemo.tsx` — GSAP fade + Motion hover pattern ornegi (referans)

### Business assets
- `resimler/` — 7 dukkan fotografi
- `public/images/hero/dejavu-kuafor.jpg` — Hero arka plan fotografi (parallax icin)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `useAnimationTier()` hook: Tum animasyon bilesenleri icin tier kontrol merkezi. "full"/"reduced"/"none" dondurur
- `gsap-config.ts`: GSAP + ScrollTrigger + useGSAP hazir, import ile kullanima hazir
- `SmoothScrollProvider`: Lenis + GSAP ticker senkronizasyonu zaten calisiyor (sadece desktop)
- `AnimationDemo.tsx`: GSAP useGSAP pattern'i + Motion whileHover pattern'i ornek olarak mevcut
- `ScrollDownArrow`: Hero'da mevcut bounce animasyonu (CSS @keyframes) — intro sonrasi gorunecek
- `Logo` component: SVG DEJAVU logosu, neon glow efektli — intro animasyonunda tekrar kullanilabilir

### Established Patterns
- GSAP: class selector ile hedefleme (`.gsap-fade-item`), useGSAP hook ile scope + dependencies
- Motion: `motion.div` ile whileHover/whileTap, tier kontrolu ile conditional props
- Server component varsayilan, client sadece animasyon gerektirdiginde (`"use client"`)
- Tier kontrolu: `if (tier === "none") return;` pattern'i — animasyon yok ise erken cikis
- SSR-safe: useAnimationTier default "reduced" (mobil-first) — hydration mismatch onlenir

### Integration Points
- `src/components/sections/Hero.tsx` — Server component, intro overlay ve parcacik efekti icin client wrapper gerekecek
- `src/components/sections/About.tsx` — Scroll reveal eklenecek
- `src/components/sections/Services.tsx` + `ServiceCard.tsx` — Scroll reveal + stagger + kart hover
- `src/components/sections/Contact.tsx` — Scroll reveal eklenecek
- `src/components/gallery/GalleryGrid.tsx` — Scroll reveal + stagger eklenecek
- `src/app/layout.tsx` — AnimatePresence wrapper eklenecek (sayfa gecisi icin)
- `src/app/page.tsx` — Intro overlay bileseni eklenecek

</code_context>

<specifics>
## Specific Ideas

- emirhankaya.vercel.app (samurai portfolio) animasyon kalitesi hedef — ayni seviyede etkileyici olmali
- DEJAVU neon tabelasindan ilham — harflerin tek tek yanmasi gercek neon tabela acilisi gibi
- Intro'dan hero'ya gecis "perde acilmasi" hissi vermeli — yukari kayarak acilma
- Duman efekti berber dukkanindaki buhar/sis atmosferini dijitale tasiyor
- %70+ mobil trafik bekleniyor — mobilde sifir performans etkisi olmali, sadece basit fade-in
- Hizmet kartlarinda neon glow degil, zarif yukari kayma — Phase 1 kararina sadik kalinacak

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-animation-layer*
*Context gathered: 2026-04-01*
