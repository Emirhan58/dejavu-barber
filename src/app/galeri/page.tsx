import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Galeri — Salon Dejavu",
  description: "Salon Dejavu galeri - dukkan fotograflari ve calismalarimiz.",
};

export default function GaleriPage() {
  return (
    <div className="bg-base-dark min-h-screen py-(--spacing-section-mobile) md:py-(--spacing-section)">
      <div className="mx-auto max-w-(--container-content) px-4 md:px-6">
        <h1 className="font-display text-3xl font-bold text-cream text-center mb-8">
          Galeri
        </h1>
        <GalleryGrid />
      </div>
    </div>
  );
}
