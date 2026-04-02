"use client";
import Image from "next/image";
import { Logo } from "@/components/ui/Logo";
import { ScrollDownArrow } from "@/components/ui/ScrollDownArrow";
import { HeroParallax } from "@/components/animations/HeroParallax";
import { BUSINESS, CTA_TEXT, WHATSAPP_MESSAGE } from "@/lib/constants";

export function Hero() {
  const ctaUrl = `${BUSINESS.whatsappUrl}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <section className="hero-section relative flex min-h-screen bg-base-dark overflow-hidden">
      <HeroParallax />

      {/* Content grid — text left, photo right */}
      <div className="relative z-10 flex flex-col md:flex-row items-center w-full max-w-[var(--container-content)] mx-auto px-6">
        {/* Left — text */}
        <div className="flex-1 flex flex-col items-center text-center md:items-start md:text-left justify-center py-32 md:py-0 md:pr-12">
          <h1 className="font-display font-bold text-cream text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight">
            <span className="text-gold">TARZINI</span>{" "}
            BİZE BIRAK
          </h1>
          <p className="mt-6 text-cream/60 text-base md:text-lg max-w-lg font-body leading-relaxed">
            Suşehri&apos;nin berber salonu. Saç kesiminden sakal tasarımına, profesyonel erkek bakımında fark yaratıyoruz.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-gold text-base-dark font-bold uppercase tracking-widest hover:brightness-110 transition-all rounded text-sm"
            >
              {CTA_TEXT}
            </a>
            <a
              href="#hizmetler"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("hizmetler")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-3 border border-cream/30 text-cream font-bold uppercase tracking-widest hover:border-gold hover:text-gold transition-colors rounded text-sm"
            >
              Hizmetler
            </a>
          </div>
        </div>

        {/* Right — photo */}
        <div className="relative flex-1 hidden md:flex items-center justify-end min-h-screen">
          <div className="relative w-full h-[80vh] max-w-[500px]">
            <Image
              src="/images/hero/dejavu-kuafor.jpg"
              alt="Salon Dejavu"
              fill
              priority
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAdEAACAgEFAAAAAAAAAAAAAAABEQACBAMSISPB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAL/xAAWEQEBAQAAAAAAAAAAAAAAAAABADH/2gAMAwEAAhEDEQA/AIl8jGOFap0e0g13NrlvyIiFXa7/2Q=="
              className="hero-photo object-cover grayscale"
              sizes="(max-width: 768px) 0vw, 50vw"
              style={{ maskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)", maskComposite: "intersect", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)", WebkitMaskComposite: "source-in" } as React.CSSProperties}
            />
          </div>
        </div>
      </div>

      {/* Mobile hero image — below text */}
      <div className="absolute inset-0 md:hidden pointer-events-none">
        <Image
          src="/images/hero/dejavu-kuafor.jpg"
          alt=""
          fill
          priority
          className="object-cover grayscale opacity-[0.08]"
          sizes="(max-width: 768px) 100vw, 0vw"
          aria-hidden="true"
        />
      </div>

      <ScrollDownArrow />
    </section>
  );
}
