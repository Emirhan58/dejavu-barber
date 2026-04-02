import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Galeri",
  description:
    "Salon Dejavu galeri \u2014 dukkan fotograflari, sac tasarimi calismalari ve berber salonu ic mekan goruntuler. Susehri/Sivas.",
  openGraph: {
    title: "Galeri \u2014 Salon Dejavu",
    description:
      "Salon Dejavu galeri \u2014 dukkan fotograflari ve sac tasarimi calismalari.",
    url: "https://dejavu-barber.vercel.app/galeri",
  },
  alternates: {
    canonical: "https://dejavu-barber.vercel.app/galeri",
  },
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
