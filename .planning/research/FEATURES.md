# Feature Research

**Domain:** Small-town barber shop website (Susehri/Sivas, Turkey)
**Researched:** 2026-04-01
**Confidence:** HIGH

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = site feels unprofessional or broken.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Hero section with shop name/branding | First impression. Users need to immediately know what this business is and feel its personality. Every barber site leads with a bold hero. | MEDIUM | Full-screen with DEJAVU neon effect, intro animation. Complexity is in the animation quality, not the layout. |
| Services list with prices | Price transparency is the #1 reason people visit a barber website. Hiding prices creates friction and drives users away — they will not call to ask. | LOW | Categorized cards: sac kesim, sakal, cilt bakimi, agda, buhar, boyama. Prices from static data. |
| Contact info + location | Users need address, phone, working hours, and a map. This is often the primary reason someone visits a local business site. | LOW | Google Maps embed, address, phone number, working hours (07:00-23:30, Pazar kapali). |
| WhatsApp appointment button | In Turkey, WhatsApp is the dominant messaging platform. For a small-town barber, this IS the booking system. Users expect to tap and message directly. | LOW | Floating button + section CTAs. Link format: `https://wa.me/905397256886?text=Randevu%20almak%20istiyorum`. |
| Photo gallery | Users want to see the shop interior, atmosphere, and work quality before visiting. Before/after haircut photos build trust. | MEDIUM | Separate gallery page. Optimized images from existing 7 photos. Grid/masonry layout. |
| Mobile-responsive design | 70%+ of barber site traffic is mobile. In a small Turkish town, phone-first browsing is even more dominant. A non-mobile site is unusable. | LOW | Built into Tailwind CSS mobile-first approach. Not a "feature" to build separately — it is the default. |
| Working hours display | Users check "are they open?" before visiting. Must be prominent, not buried. | LOW | In contact/footer section. Highlight current open/closed status if desired. |
| Hakkimizda (About) section | Small-town trust factor. People want to know who runs the shop, the story, the experience. Builds personal connection. | LOW | Brief shop story, team introduction. Warmth and authenticity matter more than length. |

### Differentiators (Competitive Advantage)

Features that elevate this site far above what any Susehri barber would have. This is where the portfolio-quality ambition pays off.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Portfolio-grade intro animation | Immediately signals "this is not a template site." Creates a memorable first impression that gets shared locally. The samurai portfolio reference (emirhankaya.vercel.app) sets the bar. | HIGH | GSAP + Framer Motion. Neon DEJAVU text animation, particle effects, cinematic entrance. Must be skippable. |
| Scroll-triggered section animations | Each section reveals with purpose — fade-ins, slide-ups, parallax layers. Makes browsing feel premium and engaging rather than static. | MEDIUM | Framer Motion `useInView` + scroll-linked animations. Reduce/disable on mobile for performance. |
| Vintage Turkish barber aesthetic | Not generic dark theme — specifically referencing classic Turkish barber culture: neon signs, warm tones, barber pole stripes, retro razor/scissor iconography. Authentic to the actual shop. | MEDIUM | Custom design system. Color palette from PROJECT.md: dark base, red/neon accents, gold/cream, warm browns. Texture overlays, vintage borders. |
| Parallax and particle effects | Depth and motion that make the site feel alive. Smoke/steam particles referencing buhar bakimi (steam treatment). | HIGH | GSAP ScrollTrigger for parallax. Canvas-based or CSS particle system. Performance-critical — must degrade gracefully on low-end devices. |
| Smooth page transitions | Navigation between home and gallery page feels seamless, not jarring. Reinforces the premium feel. | MEDIUM | Framer Motion `AnimatePresence` with Next.js App Router layout transitions. |
| Before/after image slider | Interactive comparison of haircut transformations. More engaging than static gallery photos. | LOW | Simple CSS/JS slider component. Only if before/after photos are available. |
| Neon glow effects on interactive elements | Buttons, headings, and the logo pulse with neon glow on hover/focus. Ties directly to the real DEJAVU neon sign. | LOW | CSS text-shadow, box-shadow animations. Lightweight but visually striking. |
| SEO optimization for local search | Appearing in "Susehri berber" or "Susehri erkek kuaforu" Google searches. Structured data (LocalBusiness schema), meta tags, Open Graph. | LOW | JSON-LD structured data, Turkish meta descriptions, og:image from shop photos. Low effort, high local impact. |

### Anti-Features (Deliberately NOT Building)

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Online booking/reservation system | Many barber site guides recommend integrated booking with calendars, time slots, staff selection. | Requires a backend, database, admin panel, and ongoing maintenance. Overkill for a single-barber small-town shop where the owner manages his schedule on his phone. Adds massive complexity for minimal gain. | WhatsApp button. The owner already uses WhatsApp. Customers in Susehri already use WhatsApp. Zero friction, zero maintenance. |
| Customer reviews/testimonials section | Builds social proof. Common on barber sites globally. | Requires either a CMS/backend to manage reviews, or hardcoded fake-feeling testimonials. A small-town barber's reputation is built on word-of-mouth, not website reviews. Hardcoded reviews look inauthentic. | Link to Google Maps reviews if available. The real social proof is the gallery photos showing quality work. |
| Blog/content section | SEO value, establishes expertise. | Requires ongoing content creation. The shop owner is cutting hair, not writing blog posts. Stale blog content (last post: 6 months ago) looks worse than no blog at all. | SEO through structured data, proper meta tags, and Google Business Profile instead. |
| Newsletter/email signup | Common on business sites. Collect emails for promotions. | A small-town barber does not send email newsletters. The infrastructure (email service, GDPR compliance, content creation) vastly outweighs any benefit. Customers who want updates follow on Instagram or hear in-person. | Social media links (Instagram) if the shop has accounts. |
| E-commerce / product sales | Some barber sites sell grooming products online. | Requires payment processing, inventory management, shipping logistics. Completely irrelevant for a local barber — products are sold in-shop. | Mention available products in the services section if desired. |
| Multi-language support | Internationalization seems professional. | Target audience is exclusively Turkish-speaking locals in Susehri. English adds complexity (translation, maintenance) for zero users. PROJECT.md explicitly scopes this out. | Turkish only. Proper Turkish character support (UTF-8). |
| User accounts / login | Some booking systems require accounts. | No backend, no database, no user data to store. Accounts serve no purpose on a static promotional site. | Not needed. Anonymous WhatsApp contact is the interaction model. |
| Admin panel / CMS | Content management for non-technical users. | Adds enormous complexity (auth, database, UI). Content changes are infrequent (price updates maybe yearly). A developer can update static files in 5 minutes. | Static data in TypeScript files or JSON. Git-based "CMS" — push a commit to update. |
| Chat widget / live chat | Real-time customer support. | Owner is cutting hair, not monitoring a chat widget. Unanswered live chats are worse than no chat at all. | WhatsApp button. Asynchronous messaging that the owner replies to when free. |
| Complex loading screen | Flashy preloader before site appears. | Adds perceived load time. Users in small-town Turkey may have slower connections — making them wait for an animation before seeing content is hostile UX. | Quick, lightweight intro animation that transitions into content (not a separate loading gate). |

## Feature Dependencies

```
[Mobile-Responsive Layout]
    └──required-by──> [All other features]

[Hero Section]
    └──requires──> [Intro Animation System (GSAP)]
    └──requires──> [Neon Text Effect (CSS/GSAP)]

[Scroll Animations]
    └──requires──> [Framer Motion setup]
    └──enhances──> [Services Section]
    └──enhances──> [About Section]
    └──enhances──> [Contact Section]

[Parallax Effects]
    └──requires──> [GSAP ScrollTrigger]
    └──enhances──> [Hero Section]
    └──enhances──> [Gallery Page]

[Particle Effects]
    └──requires──> [Canvas or CSS particle system]
    └──enhances──> [Hero Section]
    └──requires──> [Performance detection (reduce on mobile)]

[Gallery Page]
    └──requires──> [Image optimization pipeline]
    └──requires──> [Page routing (Next.js App Router)]
    └──enhances──> [Page Transitions]

[Page Transitions]
    └──requires──> [Framer Motion AnimatePresence]
    └──requires──> [Next.js App Router layout]

[WhatsApp Button]
    └──independent (no dependencies)

[SEO]
    └──requires──> [All content sections complete]
    └──requires──> [Image optimization (alt tags, og:image)]
```

### Dependency Notes

- **Intro Animation requires GSAP:** The portfolio-quality hero entrance needs GSAP's timeline control. Framer Motion alone is insufficient for complex sequenced animations.
- **Scroll Animations require Framer Motion:** Section reveal animations use Framer Motion's `useInView` and `useScroll` hooks, which integrate naturally with React.
- **Particle Effects require performance detection:** Must detect mobile/low-end devices and disable or reduce particles. Without this gate, the site will be unusable on budget Android phones common in small Turkish towns.
- **Gallery Page requires image optimization:** 7 existing photos need Next.js Image component optimization, proper sizing, and lazy loading. Unoptimized images on slow connections = abandoned visits.
- **SEO requires content completion:** Structured data and meta tags reference actual content. Build SEO layer after all sections have real content.

## MVP Definition

### Launch With (v1)

Minimum viable product — a complete, impressive site the owner can share.

- [ ] Hero section with DEJAVU neon animation — the "wow" moment that justifies the whole project
- [ ] Services + prices section — the practical reason anyone visits
- [ ] Contact/location section with Google Maps — how to find the shop
- [ ] WhatsApp floating button — the conversion action
- [ ] Mobile-responsive layout — majority of users are on phones
- [ ] Basic scroll animations on sections — minimum "premium feel" without going full portfolio
- [ ] SEO meta tags + structured data — appear in local Google searches

### Add After Validation (v1.x)

Features to add once the core site is live and working.

- [ ] Gallery page with full photo grid — once image optimization is tuned and more photos are collected
- [ ] Page transition animations — smooth navigation between home and gallery
- [ ] Parallax effects on hero and between sections — layered depth
- [ ] Before/after image slider — if suitable photo pairs exist
- [ ] Enhanced neon glow effects on hover states — polish pass

### Future Consideration (v2+)

Features to consider if the site proves valuable and the owner wants more.

- [ ] Particle effects (smoke/steam) — highest complexity animation, lowest practical value
- [ ] Full cinematic intro sequence — the samurai-portfolio-level entrance
- [ ] Instagram feed integration — if the shop has an active Instagram
- [ ] Google Reviews widget — if the shop accumulates Google reviews

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Services + prices | HIGH | LOW | P1 |
| Contact + location + map | HIGH | LOW | P1 |
| WhatsApp floating button | HIGH | LOW | P1 |
| Hero section with branding | HIGH | MEDIUM | P1 |
| Mobile responsiveness | HIGH | LOW | P1 |
| SEO (meta + structured data) | HIGH | LOW | P1 |
| Hakkimizda (About) section | MEDIUM | LOW | P1 |
| Basic scroll animations | MEDIUM | LOW | P1 |
| Gallery page | MEDIUM | MEDIUM | P2 |
| Vintage Turkish barber design system | MEDIUM | MEDIUM | P2 |
| Neon glow hover effects | LOW | LOW | P2 |
| Page transitions | LOW | MEDIUM | P2 |
| Parallax effects | LOW | MEDIUM | P2 |
| Before/after slider | LOW | LOW | P3 |
| Particle effects | LOW | HIGH | P3 |
| Full intro animation sequence | LOW | HIGH | P3 |

**Priority key:**
- P1: Must have for launch — the site is incomplete without these
- P2: Should have, add when possible — elevates quality significantly
- P3: Nice to have, future consideration — impressive but not essential

## Competitor Feature Analysis

In Susehri/Sivas, there is effectively no web competition. Local barbers either have no website, a basic Google Business listing, or a generic template site from a Turkish web agency. This means:

| Feature | Typical Turkish Barber Site | Premium Barber Sites (Global) | Dejavu Approach |
|---------|---------------------------|-------------------------------|-----------------|
| Online presence | Google Maps listing only, or basic 1-page template | Custom-designed multi-page sites | Custom Next.js site with animations — far beyond local competition |
| Booking | Phone call or walk-in | Integrated booking systems (Booksy, Fresha) | WhatsApp — fits local behavior perfectly |
| Gallery | Maybe 3-4 photos on Google Maps | Professional portfolio with filtering | Dedicated gallery page with optimized images |
| Design quality | Generic template, stock photos | Dark themes, parallax, custom photography | Portfolio-grade animations with authentic shop photos |
| Pricing | Often hidden or phone-only | Usually displayed | Transparent, categorized price list |
| Mobile experience | Often broken or poorly responsive | Fully responsive | Mobile-first with reduced animations for performance |

**Key insight:** The competition bar in Susehri is essentially zero. This site does not need to beat other barber websites — it needs to impress local customers who have never seen a local business with a site this polished. The differentiator is not any single feature but the overall quality and authenticity of execution.

## Sources

- [Colorlib - 17 Best Barbershop Website Design Examples 2026](https://colorlib.com/wp/barbershop-websites/)
- [CyberOptik - 20 Best Barber Shop Websites of 2026](https://www.cyberoptik.net/blog/best-barber-shop-websites/)
- [Strikingly - Best Practices for Barber Shop Website](https://www.strikingly.com/content/blog/barber-shop-website/)
- [The Salon Business - 24 Best Barbershop Website Designs](https://thesalonbusiness.com/barbershop-website-designs/)
- [YD Web - Berber & Kuafor Web Sitesi Tasarimi](https://ydweb.com.tr/cozumler/berber-kuafor-web-sitesi-tasarimi/)
- [Infobip - Add WhatsApp Button to Website 2026](https://www.infobip.com/blog/add-whatsapp-button-to-website)
- PROJECT.md business context and constraints

---
*Feature research for: Dejavu Erkek Kuaforu barber shop website*
*Researched: 2026-04-01*
