"use client";

import { useState } from "react";
import Image from "next/image";
import { GALLERY_IMAGES, GALLERY_FILTERS } from "@/lib/constants";
import { Lightbox } from "./Lightbox";
import { motion } from "motion/react";

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
                ? "text-cream border-b-2 border-gold"
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
          Henüz fotoğraf eklenmedi.
        </p>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="mb-4 break-inside-avoid overflow-hidden rounded-lg cursor-pointer"
              onClick={() => setLightboxIndex(index)}
            >
              {image.type === "video" ? (
                <div className="relative aspect-[9/16] bg-base-medium flex items-center justify-center">
                  <video
                    src={image.src}
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-black/60 flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <polygon points="5,3 19,12 5,21" />
                      </svg>
                    </div>
                  </div>
                </div>
              ) : (
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
              )}
            </motion.div>
          ))}
        </div>
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
