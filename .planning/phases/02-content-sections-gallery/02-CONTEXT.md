# Phase 2: Content Sections & Gallery - Context

**Gathered:** 2026-04-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Tum ana sayfa bolumlerini gercek isletme verileriyle doldurma (hero, hakkimizda, hizmetler, iletisim), ayri /galeri sayfasi olusturma, WhatsApp floating butonu ekleme. Animasyonlar Phase 3'te eklenecek — bu fazda statik icerik ve fonksiyonellik.

</domain>

<decisions>
## Implementation Decisions

### Hero bolumu
- Arka plan: dejavu-kuafor.jpg (dukkan disi gorunumu) tam ekran background-image
- Agir overlay (%70-80 opacity) — koyu karartma, logo ve yazilar net okunur
- Icerik: DEJAVU logosu (mevcut Logo bileseninden, mobil 60px / desktop 120px) + "Sac ve Sakal Tasarimi" slogan + "Randevu Al" CTA butonu + asagi scroll oku
- Scroll ok: Neon glow efektli (kirmizi #E11D48) chevron ok, bounce animasyonu
- CTA butonu stili: Claude'un takdirine (neon kirmizi veya altin outline — temaya en uygun sekilde)
- CTA tiklayinca WhatsApp'a yonlendirir (BUSINESS.whatsappUrl)

### Hakkimizda bolumu
- Layout: 2 sutunlu — sol tarafta dukkan hikayesi metni, sag tarafta dukkan ici fotografi (kuafor-icerisi.jpg veya kuafor-ici.jpg)
- Metin: Claude tarafindan yazilacak genel berber tanitim metni ("Susehri'nin kalbinde, geleneksel berberlik sanatini modern tasarimla bulusturan..." tarzinda)
- Mobilde: Alt alta (metin ustte, foto altta)

### Hizmetler bolumu
- Organizasyon: Kategorili gruplar — her kategori alt baslik + altinda hizmet kartlari
- Kategoriler: Sac, Sakal, Cilt Bakimi, Ozel Hizmetler (agda, buhar, boyama vb.)
- Fiyat gosterilmeyecek — sadece hizmet adi + kisa aciklama (1-2 cumle)
- Kartlar: Mevcut RetroCard bileseni kullanilacak
- Her kartta vintage SVG ikon (makas, jilet, tarak vb.) — Phase 1 kararina tutarli
- Grid: Desktop 3 sutun, tablet 2 sutun, mobil 1 sutun (mevcut pattern)

### Galeri sayfasi (/galeri)
- Layout: Masonry grid — Pinterest tarzi farkli boyutlarda fotograflar
- Lightbox: Fotografa tiklaninca tam ekran overlay'de buyuk fotograf + sag/sol gezinme
- Filtre: Kategori filtre butonlari (Tumu / Dukkan / Calismalarimiz) — varsayilan "Tumu" secili
- Fotograflar: 7 mevcut foto (resimler/ klasoru) — next/image ile WebP, lazy loading, blur placeholder
- Sayfa gecisi: Smooth transition (GALR-03 icin temel yapi — animasyon detaylari Phase 3)

### Iletisim bolumu
- Layout: Claude'un takdirine — harita + bilgi yan yana veya dikey akis, en uygun duzeni secsin
- Google Maps: Standart iframe embed (API key gerektirmez, adres bazinda)
- Bilgiler: Adres, telefon, calisma saatleri — BUSINESS constant'indan
- Footer gorevi: Bu bolum footer'dir (Phase 1 karari) — copyright satiri en altta

### WhatsApp floating butonu
- Gorunum: Yesil daire icinde beyaz WhatsApp ikonu — standart taninan WhatsApp rengi
- Pozisyon: Sag alt kose, sabit (fixed)
- Tiklama: WhatsApp acilir, on yazili mesaj: "Merhaba, randevu almak istiyorum."
- Her sayfada gorunur (ana sayfa + galeri)

### Constants dosyasi genisletme
- Mevcut BUSINESS objesi: Zaten adres, telefon, whatsappUrl, saatler var
- Eklenecek: Hizmet kategorileri ve hizmet listesi (isim + aciklama + ikon referansi)
- Eklenecek: Galeri fotograf listesi (dosya adi + kategori + alt text)
- Eklenecek: WhatsApp on yazili mesaj metni

### Claude's Discretion
- CTA buton stili (neon kirmizi vs altin outline)
- Iletisim bolumu layout detaylari
- Hizmet aciklama metinleri
- Hakkimizda paragraf metni
- Lightbox bileseninin teknik uygulamasi
- Masonry grid teknik yaklasimi (CSS columns vs JS library)
- Fotograf boyutlari ve aspect ratio'lari
- Scroll ok animasyonunun teknik detaylari

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

No external specs — requirements are fully captured in decisions above and in project planning files:

### Project context
- `.planning/PROJECT.md` — Proje vizyonu, isletme bilgileri, tasarim yonu, referans proje (emirhankaya.vercel.app)
- `.planning/REQUIREMENTS.md` — CONT-01 through CONT-06, GALR-01 through GALR-03 requirements
- `.planning/ROADMAP.md` — Phase 2 success criteria (5 madde)

### Phase 1 decisions
- `.planning/phases/01-foundation-design-system/01-CONTEXT.md` — Renk paleti, tipografi, navbar, animasyon siniri, doku/motif kararlari

### Business assets
- `resimler/` — 7 dukkan fotografi (dejavu-kuafor.jpg, dejavu-kuafor2.jpg, kuafor-icerisi.jpg, kuafor-ici.jpg, kuafor-ici2.jpg, sac.jpg, sac2.jpg)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/ui/RetroCard.tsx` — Altin kose suslemeli kart. Hizmet kartlari icin dogrudan kullanilabilir
- `src/components/ui/Logo.tsx` — SVG DEJAVU logosu, neon glow efektli. Hero'da mevcut haliyle kullanilacak
- `src/components/ui/GrainOverlay.tsx` — Grain doku overlay. Tum sayfalarda zaten aktif
- `src/components/layout/SectionDivider.tsx` — Berber diregi bolum ayirici. Bolumler arasinda kullanilacak
- `src/components/layout/Navbar.tsx` — Sticky navbar, scroll-spy, transparan->solid gecis. Mevcut haliyle calisir
- `src/components/layout/MobileMenu.tsx` — Tam ekran mobil menu
- `src/hooks/useAnimationTier.ts` — Uc katmanli animasyon degradasyonu hook'u
- `src/hooks/useScrollSpy.ts` — Bolum scroll takibi
- `src/lib/constants.ts` — Isletme verileri (genisletilecek)

### Established Patterns
- Tailwind CSS 4 ile @theme token sistemi (globals.css)
- Server components varsayilan, client sadece gerektiginde
- RetroCard CSS-based (pure CSS corner ornaments, no JS)
- Bolumler arasi alternating background (base-dark / base-medium / base-light)
- max-w-(--container-content) ile icerik genisligi siniri

### Integration Points
- `src/app/page.tsx` — Ana sayfa, mevcut placeholder bolumleri gercek icerikle degistirilecek
- `src/app/galeri/page.tsx` — Yeni sayfa olusturulacak
- `src/lib/constants.ts` — Hizmet ve galeri verileri eklenecek
- `src/app/layout.tsx` — WhatsApp floating butonu buraya eklenecek (tum sayfalarda gorunmesi icin)

</code_context>

<specifics>
## Specific Ideas

- Hero arka plani olarak dukkan disindaki gercek DEJAVU neon tabelasinin gorunumu kullanilacak (dejavu-kuafor.jpg)
- Overlay %70-80 agir — logo ve yazilar kesinlikle net okunmali
- WhatsApp on yazili mesaj: "Merhaba, randevu almak istiyorum."
- Galeri filtreleri: varsayilan "Tumu", kategoriler "Dukkan" ve "Calismalarimiz"
- Hizmetlerde fiyat yok — dukkana gelince ogrenecekler, site tanitim amacli
- Hakkimizda'da dukkan ici fotografi kullanilacak (sicak atmosfer)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-content-sections-gallery*
*Context gathered: 2026-04-01*
