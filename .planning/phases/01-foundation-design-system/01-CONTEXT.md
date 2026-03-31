# Phase 1: Foundation & Design System - Context

**Gathered:** 2026-04-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Next.js 15 App Router projesi kurulumu, GSAP + Motion animasyon altyapisi, vintage Turk berber tasarim sistemi (renk token'lari, tipografi, doku, motifler), uc katmanli animasyon degradasyonu (desktop/mobil/reduced-motion), Lenis smooth scroll ve navbar scroll-spy. Icerik bolumleri ve gercek veriler Phase 2'de gelecek.

</domain>

<decisions>
## Implementation Decisions

### Renk paleti
- Ana arka plan: Koyu kahverengi (#1C1410) — sicak, ahsap/deri hissi, klasik berber dukkan atmosferi
- Neon vurgu: Canli kirmizi (#E11D48) — modern neon tabela hissi, DEJAVU tabelasindan ilham
- Altin/kremsi aksan: Claude'un takdirine birakildi — belirgin altin ile hafif krem arasinda en uygun dengeyi bulsun
- Bolumler arasi hafif ton farki — alternating background ile gorsel ayrim (ornegin #1C1410 / #211812 / #150F0B)

### Tipografi
- Basliklar: Display font (Playfair Display veya benzeri serif) — sik, neon glow ile vintage his
- Govde metni: Temiz sans-serif (Inter veya DM Sans) — okunakli, modern
- Aksan/CTA: Uppercase, genis letter-spacing
- Display + Sans kombinasyonu — vintage basliklar ile modern govde dengesi

### Navbar & layout
- Navbar davranisi: Transparan → Solid — hero uzerinde seffaf, scroll edince koyu arka plan + blur ile sticky
- Scroll-spy gostergesi: Neon alt cizgi — aktif bolumun altinda #E11D48 glow cizgi
- Navbar logo: "DEJAVU" yazisi display fontuyla, kirmizi neon glow efektli
- Menu ogeleri: Hakkimizda, Hizmetler, Galeri, Iletisim, [Randevu Al butonu] — 5 oge
- Mobil menu: Tam ekran overlay — koyu arka plan, buyuk linkler, neon vurgulu, Randevu Al butonu
- Layout: Tam genislik bolumler — her bolum ekrani kaplar, icerik max-width ile sinirli (parallax'a uygun)
- Footer: Iletisim bolumu footer gorevini gorur — harita, adres, saatler + copyright satiri (ayri footer yok)

### Animasyon siniri (GSAP vs Motion)
- GSAP sorumluluk: ScrollTrigger (fade-in, parallax), timeline (intro sekansi), canvas/particle efektler, neon text animasyonu
- Motion sorumluluk: Navbar gecisi (transparan→solid), menu ac/kapa, kart hover efektleri, sayfa gecisi (galeri), AnimatePresence
- Kural: Paylasilan element yok — bir element ya GSAP ya Motion tarafindan anime edilir, ikisi birden degil

### Uc katmanli animasyon degradasyonu
- Tier 1 (Full/Desktop, >=768px): Parallax katmanlari, parcacik/duman efektleri, karmasik scroll sekanslari, neon glow animasyonlari, tum Motion efektleri
- Tier 2 (Reduced/Mobil, <768px): Sadece basit fade-in/slide-up, navbar gecisi, menu animasyonu, hover→tap donusumu. Parallax, parcaciklar, karmasik timeline YOK
- Tier 3 (None/prefers-reduced-motion): Animasyon yok, aninda gecisler
- Tespit: CSS media query + JS matchMedia ile ekran genisligi (768px esik) + prefers-reduced-motion
- Hook: useAnimationTier() — tum animasyon bilesenlerinin referans aldigi merkezi hook

### Smooth scroll
- Lenis: Sadece desktop'ta aktif — butter-smooth scrolling, ScrollTrigger entegrasyonu, anchor navigasyonu
- Mobilde native scroll — iOS/Android momentum scroll, performans korunur, ekstra CPU yuku yok

### Doku & gorsel motifler
- Arka plan dokusu: Hafif grain/noise overlay (opacity ~%3-5) — fark edilir ama metin okumay bozmaz
- Bolum ayiricilar: Berber diregi cizgileri (kirmizi-beyaz-mavi) — vintage his
- Kart cerceveleri: Retro kose suslemeleri — vintage cizim tarzi
- Ikonlar: Dekoratif SVG ikon seti — makas, jilet, berber diregi, tarak, firca (vintage cizim tarzi)
- Neon glow: Secici kullanim — sadece DEJAVU logosu, CTA butonlari, aktif scroll-spy cizgi, hero basligi. Hizmet kartlari, footer, normal linkler'de glow YOK

### Claude's Discretion
- Altin/kremsi aksan rengi ve kullanim yerleri (belirgin altin vs hafif krem dengesi)
- Grain overlay'in teknik uygulamasi (CSS vs SVG vs canvas)
- SVG ikon setinin detayli tasarimi
- Exact spacing ve typography scale
- Tailwind CSS 4 tema konfigurasyonu detaylari
- GSAP/Motion entegrasyon pattern'leri (useGSAP hook vb.)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

No external specs — requirements are fully captured in decisions above and in project planning files:

### Project context
- `.planning/PROJECT.md` — Proje vizyonu, isletme bilgileri, tasarim yonu, referans proje (emirhankaya.vercel.app)
- `.planning/REQUIREMENTS.md` — FOUND-01 through FOUND-07, VISL-01 through VISL-03 requirements
- `.planning/ROADMAP.md` — Phase 1 success criteria (5 madde)

### Business assets
- `resimler/` — 7 dukkan fotografı (dis gorunum, ic mekan, calisma fotograflari)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- Proje henuz bos — greenfield. Hicbir mevcut kod yok.

### Established Patterns
- Henuz pattern yok — Phase 1 tum pattern'leri olusturacak.

### Integration Points
- `resimler/` klasorundeki 7 fotograf — Phase 2'de next/image ile optimize edilecek, Phase 1'de sample layout icin kullanilabilir
- referans: emirhankaya.vercel.app — animasyon kalitesi ve gorsel zenginlik hedefi

</code_context>

<specifics>
## Specific Ideas

- DEJAVU neon tabela hissi sitede yansitilmali — dukkan disindaki gercek kirmizi neon tabeladan ilham
- emirhankaya.vercel.app (samurai portfolio) referans — ayni kalitede animasyonlar isteniyor, berber temasina uyarlanacak
- Mobilde %70+ trafik bekleniyor (mid-range Android) — performans kritik
- Koyu kahverengi base ton secimi dukkanin sicak, samimi atmosferini dijitale tasiyor

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-foundation-design-system*
*Context gathered: 2026-04-01*
