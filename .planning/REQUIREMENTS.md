# Requirements: Dejavu Erkek Kuaforu

**Defined:** 2026-04-01
**Core Value:** Dejavu'nun fiziksel dukkan atmosferini dijitale tasiyan, musterileri ilk saniyede etkileyen ve WhatsApp'a yonlendiren profesyonel bir berber sitesi

## v1 Requirements

### Foundation

- [x] **FOUND-01**: Site Next.js 15 App Router + TypeScript ile calisir
- [x] **FOUND-02**: Tailwind CSS 4 ile responsive, mobile-first tasarim uygulanir
- [x] **FOUND-03**: GSAP + Motion (Framer Motion) animasyon altyapisi kurulur, sorumluluk alanlari net ayrilir
- [x] **FOUND-04**: Vintage Turk berber tasarim sistemi olusturulur (koyu tonlar, kirmizi/neon vurgular, altin/kremsi aksan, sicak kahverengi)
- [x] **FOUND-05**: 3 katmanli animasyon degradasyonu: full (desktop), reduced (mobil), none (prefers-reduced-motion)
- [x] **FOUND-06**: Lenis smooth scroll entegrasyonu
- [x] **FOUND-07**: Sticky navbar ile bolum navigasyonu ve scroll-spy

### Content

- [x] **CONT-01**: Kullanici tam ekran hero bolumunde DEJAVU adini neon efektiyle gorur
- [x] **CONT-02**: Kullanici Hakkimizda bolumunde dukkan hikayesini ve ekip bilgisini gorur
- [x] **CONT-03**: Kullanici hizmetler bolumunde kategorize edilmis hizmet kartlarini gorur (sac kesim, sakal, cilt bakimi, agda, buhar, boyama)
- [x] **CONT-04**: Kullanici iletisim bolumunde Google Maps embed, adres, telefon ve calisma saatlerini gorur
- [x] **CONT-05**: Kullanici her sayfada WhatsApp floating butonunu gorur ve tiklayinca WhatsApp mesaji acilir (905397256886)
- [x] **CONT-06**: Tum isletme verileri (adres, telefon, hizmetler, fiyatlar, saatler) tek bir constants dosyasindan gelir

### Gallery

- [x] **GALR-01**: Kullanici ayri /galeri sayfasinda dukkan fotograflarini grid/masonry layoutta gorur
- [x] **GALR-02**: Fotograflar Next.js Image ile optimize edilir (WebP, lazy loading, blur placeholder)
- [x] **GALR-03**: Ana sayfa ile galeri arasinda smooth sayfa gecis animasyonu vardir

### Animations

- [ ] **ANIM-01**: Kullanici ilk ziyarette DEJAVU neon intro animasyonu gorur (skippable, sessionStorage ile tekrar gosterilmez)
- [ ] **ANIM-02**: Kullanici scroll ederken bolumlerin fade-in/slide-up ile ortaya ciktigini gorur
- [ ] **ANIM-03**: Kullanici parallax arka plan katmanlarinin farkli hizlarda hareket ettigini gorur
- [ ] **ANIM-04**: Kullanici desktop'ta duman/buhar parcacik efektlerini gorur (mobilde devre disi)
- [ ] **ANIM-05**: Mobil kullanici sadece basit scroll reveal animasyonlarini gorur (parallax/parcacik yok)
- [ ] **ANIM-06**: Neon glow hover efektleri butonlar ve basliklar uzerinde calisir

### Visual

- [x] **VISL-01**: Site vintage Turk berber estetigi tasir — neon tabela hissi, retro cerceveler, berber diregi motifleri
- [x] **VISL-02**: Renk paleti dukkanin gercek atmosferini yansitir: koyu siyah/antrasit base, kirmizi/neon vurgular, altin/kremsi aksan
- [x] **VISL-03**: Arka plan dokularinda vintage his vardir (grain, texture overlay)

### SEO & Deploy

- [ ] **SEOD-01**: JSON-LD LocalBusiness/BarberShop structured data tum isletme bilgileriyle eklenir
- [ ] **SEOD-02**: Turkce meta tags, Open Graph tags ve og:image dukkan fotografiyla eklenir
- [ ] **SEOD-03**: Site Vercel'e deploy edilir ve canli URL'den erisilebilir
- [ ] **SEOD-04**: Lighthouse mobil skoru 90+ hedeflenir

## v2 Requirements

### Enhancements

- **ENHC-01**: Before/after image slider (oncesi-sonrasi karsilastirma)
- **ENHC-02**: Instagram feed entegrasyonu (dukkanin Instagram'i varsa)
- **ENHC-03**: Google Reviews widget
- **ENHC-04**: Vercel Analytics entegrasyonu
- **ENHC-05**: Sitemap ve robots.txt
- **ENHC-06**: Custom 404 sayfasi

## Out of Scope

| Feature | Reason |
|---------|--------|
| Online randevu/rezervasyon sistemi | Backend gerektirir, WhatsApp Turkiye'de zaten standart, sifir bakim maliyeti |
| Blog / icerik yonetimi | Dukkan sahibi icerik uretmeyecek, bayat blog zarar verir |
| CMS / admin paneli | Icerik nadiren degisir, developer 5 dakikada guncelleyebilir |
| Kullanici hesaplari / giris | Statik tanitim sitesinde amaci yok |
| E-ticaret / urun satisi | Urunler dukkanda satilir, online satis gereksiz |
| Coklu dil destegi | Hedef kitle yerel Turkce konusuyor |
| Canli chat widget | Sahip sac kesiyor, cevapsiz chat zarar verir |
| Newsletter / email toplama | Kucuk kasaba berberi newsletter gondermez |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Complete |
| FOUND-02 | Phase 1 | Complete |
| FOUND-03 | Phase 1 | Complete |
| FOUND-04 | Phase 1 | Complete |
| FOUND-05 | Phase 1 | Complete |
| FOUND-06 | Phase 1 | Complete |
| FOUND-07 | Phase 1 | Complete |
| CONT-01 | Phase 2 | Complete |
| CONT-02 | Phase 2 | Complete |
| CONT-03 | Phase 2 | Complete |
| CONT-04 | Phase 2 | Complete |
| CONT-05 | Phase 2 | Complete |
| CONT-06 | Phase 2 | Complete |
| GALR-01 | Phase 2 | Complete |
| GALR-02 | Phase 2 | Complete |
| GALR-03 | Phase 2 | Complete |
| ANIM-01 | Phase 3 | Pending |
| ANIM-02 | Phase 3 | Pending |
| ANIM-03 | Phase 3 | Pending |
| ANIM-04 | Phase 3 | Pending |
| ANIM-05 | Phase 3 | Pending |
| ANIM-06 | Phase 3 | Pending |
| VISL-01 | Phase 1 | Complete |
| VISL-02 | Phase 1 | Complete |
| VISL-03 | Phase 1 | Complete |
| SEOD-01 | Phase 4 | Pending |
| SEOD-02 | Phase 4 | Pending |
| SEOD-03 | Phase 4 | Pending |
| SEOD-04 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 29 total
- Mapped to phases: 29
- Unmapped: 0

---
*Requirements defined: 2026-04-01*
*Last updated: 2026-04-01 after roadmap creation*
