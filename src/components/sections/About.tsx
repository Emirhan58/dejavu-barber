"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function About() {
  return (
    <section
      id="hakkimizda"
      className="bg-base-medium py-(--spacing-section-mobile) md:py-(--spacing-section)"
    >
      <ScrollReveal className="mx-auto max-w-(--container-content) px-4 md:px-6">
        <h2 className="font-display text-2xl font-bold text-cream mb-6">
          Hakkımızda
        </h2>
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <p className="text-cream leading-relaxed text-base">
              Suşehri&apos;nin kalbinde, geleneksel berberlik sanatını modern
              tasarımla buluşturan Salon Dejavu, yıllardır müşterilerine özenli
              ve profesyonel hizmet sunmaktadır. Deneyimli ekibimiz, klasik saç
              ve sakal kesiminden modern tasarımlara kadar geniş bir yelpazede
              sizlere en iyi deneyimi yaşamanız için burada.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src="/images/gallery/dukkan/dukkan2.jpeg"
              alt="Salon Dejavu yoğun çalışma anı"
              fill
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAH/xAAbEAACAwADAAAAAAAAAAAAAAABAgADBBEhIv/EABQBAQAAAAAAAAAAAAAAAAAAAAP/xAAWEQADAAAAAAAAAAAAAAAAAAAAASH/2gAMAwEAAhEDEQA/AJpoavKLq63ZXAJUn2QR3xERCcEVP//Z"
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
