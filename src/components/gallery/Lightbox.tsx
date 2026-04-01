"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

interface LightboxProps {
  images: { src: string; alt: string; width: number; height: number }[];
  initialIndex: number;
  onClose: () => void;
}

export function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, next, prev]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] max-w-[90vw]"
      >
        <Image
          src={images[index].src}
          alt={images[index].alt}
          width={images[index].width}
          height={images[index].height}
          className="max-h-[90vh] w-auto object-contain"
          sizes="90vw"
        />

        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/70 hover:text-cream text-4xl transition-colors"
          aria-label="Onceki fotograf"
        >
          &#8249;
        </button>

        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/70 hover:text-cream text-4xl transition-colors"
          aria-label="Sonraki fotograf"
        >
          &#8250;
        </button>

        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-cream/70 hover:text-cream text-2xl transition-colors"
          aria-label="Kapat"
        >
          &#10005;
        </button>
      </div>
    </div>
  );
}
