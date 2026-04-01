"use client";

import { useState } from "react";
import Image from "next/image";
import { GALLERY_IMAGES, GALLERY_FILTERS } from "@/lib/constants";
import { Lightbox } from "./Lightbox";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function GalleryGrid() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages =
    activeFilter === "all"
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeFilter);

  return (
    <>
      {/* Filter bar */}
      <div className="flex justify-center gap-2 mb-8">
        {GALLERY_FILTERS.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={`px-4 py-2 text-sm font-bold transition-colors ${
              activeFilter === filter.value
                ? "text-cream border-b-2 border-neon-red"
                : "text-cream/50 hover:text-cream/70"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      {filteredImages.length === 0 ? (
        <p className="text-cream/50 text-center">
          Henuz fotograf eklenmedi.
        </p>
      ) : (
        <ScrollReveal stagger={true}>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {filteredImages.map((image, index) => (
              <div
                key={image.src}
                className="scroll-reveal-item mb-4 break-inside-avoid overflow-hidden rounded-lg cursor-pointer"
                onClick={() => setLightboxIndex(index)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  placeholder="blur"
                  blurDataURL={image.blurDataURL}
                  className="w-full h-auto object-cover hover:opacity-90 transition-opacity"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </ScrollReveal>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filteredImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
