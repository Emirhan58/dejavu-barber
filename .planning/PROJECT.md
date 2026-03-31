# Dejavu Erkek Kuaforu — Web Sitesi

## What This Is

Susehri/Sivas'taki Salon Dejavu Erkek Kuaforu icin gercek isletme web sitesi. Klasik Turk berber dukkan estigi ile modern web teknolojilerini birlestiren, gorsel olarak etkileyici, portfolio kalitesinde animasyonlara sahip bir tanitim ve randevu yonlendirme sitesi. Musteriler hizmetleri gorebilir, galeriyi inceleyebilir ve WhatsApp uzerinden randevu alabilir.

## Core Value

Dejavu'nun fiziksel dukkan atmosferini dijitale tasiyan, musterileri ilk saniyede etkileyen ve WhatsApp'a yonlendiren profesyonel bir berber sitesi.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Hibrit sayfa yapisi — ana sayfa scroll + galeri ayri sayfa
- [ ] Next.js 15 (App Router) + TypeScript + Tailwind CSS 4
- [ ] Framer Motion + GSAP animasyon sistemi (portfolio kalitesinde tam gaz animasyonlar)
- [ ] Vintage/klasik Turk berber estegi — sicak, samimi, neon tabela havasi
- [ ] Sadece Turkce — tek dil
- [ ] Hero bolumu — tam ekran, dukkan adi, etkileyici giris animasyonu
- [ ] Hizmetler + fiyat listesi bolumu — sac kesim, sakal, cilt bakimi vb.
- [ ] Galeri sayfasi — dukkan fotograflari, oncesi-sonrasi kesimler
- [ ] Randevu butonu — WhatsApp yonlendirme (0539 725 68 86)
- [ ] Iletisim/konum bolumu — Google Maps embed, adres, telefon, calisma saatleri
- [ ] Scroll animasyonlari, parallax, parcacik efektleri, intro animasyon
- [ ] Mobilde azaltilmis animasyonlar (performans korunur)
- [ ] Responsive / mobile-first yaklasim
- [ ] SEO meta tags
- [ ] Vercel deploy

### Out of Scope

- Backend/veritabani — WhatsApp yonlendirme yeterli, sunucu tarafli randevu sistemi gereksiz
- Coklu dil destegi — hedef kitle yerel, Turkce yeterli
- Online odeme — berber isinde nakit/kart yerinde odenir
- Blog/icerik yonetimi — statik site, CMS gereksiz
- Kullanici girisi/uyelik — berber sitesinde gerek yok
- Admin paneli — icerik statik dosyalardan geliyor

## Context

**Isletme:** Salon Dejavu — Sac ve Sakal Tasarimi. Susehri/Sivas'ta faaliyet gosteren gercek bir erkek kuaforu.

**Adres:** Cami Orta Mahallesi, Sivas Cd. No:55/C, 58600 Susehri/Sivas
**Telefon/WhatsApp:** 0539 725 68 86
**Calisma saatleri:** 07:00 - 23:30 (Pazar kapali)

**Hizmetler:** Standart erkek kuaforu hizmetleri — sac kesim, sakal sekillendirme, cilt bakimi, agda, buhar bakimi, sac boyama/tasarim.

**Gorseller:** 7 fotograf mevcut (resimler/ klasoru):
- Dukkan disi gorunumu (tabela, neon "DEJAVU" yazisi)
- Dukkan icerisi (sari berber koltuklari, buhar bakimi, sac tasarimi)
- Calisma fotograflari (sac boyama, perma vb.)

**Tasarim yonu:**
- Klasik Turk berber atmosferi — sicak, samimi, usta-cirak gelenegini yansitan
- Renk paleti: Koyu tonlar (siyah/antrasit), kirmizi/neon vurgular (tabeladan ilham), altin/kremsi aksan, sicak kahverengi tonlari
- Neon tabela hissi — DEJAVU logosunun kirmizi neon gorunumu sitede yansitilmali
- Vintage doku ve motifler — berber diregi cizgileri, eski usul jilet/makas ikonlari, retro cerceveler

**Referans proje:** emirhankaya.vercel.app (samurai portfolio) — ayni kalitede animasyonlar ve gorsel zenginlik isteniyor, sadece berber temasina uyarlanacak.

**Bolumler (ana sayfa scroll):**
1. Hero — tam ekran, dukkan adi, neon efekt, etkileyici giris
2. Hakkimizda — dukkan hikayesi, ekip
3. Hizmetler — kategorize edilmis hizmet kartlari + fiyatlar
4. Galeri (ayri sayfa) — dukkan ve calisma fotograflari
5. Iletisim/Konum — harita, adres, telefon, calisma saatleri
6. WhatsApp CTA — sabit/floating randevu butonu

## Constraints

- **Tech stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS 4, Framer Motion, GSAP
- **Deploy:** Vercel
- **Performans:** Lighthouse 90+ hedef, mobilde agir efektler devre disi
- **Icerik:** Gercek isletme verileri — adres, telefon, fiyatlar statik dosyadan
- **Gorseller:** Mevcut fotograflar kullanilacak (resimler/ klasoru)
- **Randevu:** WhatsApp yonlendirme — backend yok

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Hibrit yapi (scroll + ayri galeri) | Ana sayfa akici deneyim, galeri bol fotograf icin ayri sayfa daha iyi | — Pending |
| WhatsApp randevu | Backend gerektirmez, Turkiye'de yaygin, musteriler zaten WhatsApp kullaniyor | — Pending |
| Sadece Turkce | Yerel isletme, hedef kitle Turkce konusuyor | — Pending |
| Tam gaz animasyon + mobil azaltma | Portfolio kalitesinde etkileyici site, mobilde performans korunur | — Pending |
| Vintage Turk berber temas | Dukkanin gercek atmosferini dijitale tasiyor, samimi ve otantik | — Pending |

---
*Last updated: 2026-04-01 after initialization*
