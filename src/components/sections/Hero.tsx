import Image from "next/image";
import { Logo } from "@/components/ui/Logo";
import { ScrollDownArrow } from "@/components/ui/ScrollDownArrow";
import { BUSINESS, CTA_TEXT, WHATSAPP_MESSAGE } from "@/lib/constants";

export function Hero() {
  const ctaUrl = `${BUSINESS.whatsappUrl}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center">
      <Image
        src="/images/hero/dejavu-kuafor.jpg"
        alt="Salon Dejavu"
        fill
        priority
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAdEAACAgEFAAAAAAAAAAAAAAABEQACBAMSISPB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAL/xAAWEQEBAQAAAAAAAAAAAAAAAAABADH/2gAMAwEAAhEDEQA/AIl8jGOFap0e0g13NrlvyIiFXa7/2Q=="
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/75" />

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <Logo height={60} className="block md:hidden" />
        <Logo height={120} className="hidden md:block" />
        <p className="mt-4 text-lg md:text-xl text-cream font-body tracking-wide">
          {BUSINESS.subtitle}
        </p>
        <a
          href={ctaUrl}
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
