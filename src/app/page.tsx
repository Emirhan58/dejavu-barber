import { SectionDivider } from "@/components/layout/SectionDivider";
import { RetroCard } from "@/components/ui/RetroCard";
import { AnimationDemo } from "@/components/demo/AnimationDemo";
import { BUSINESS } from "@/lib/constants";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-base-dark flex min-h-screen flex-col items-center justify-center px-4">
        <h1 className="font-display text-[40px] md:text-[64px] font-bold text-white neon-glow text-center">
          DEJAVU
        </h1>
        <p className="mt-4 text-lg text-cream text-center">
          Sac ve Sakal Tasarimi
        </p>
      </section>

      <SectionDivider />

      {/* Hakkimizda Section */}
      <section id="hakkimizda" className="bg-base-medium min-h-[70vh] py-(--spacing-section-mobile) md:py-(--spacing-section)">
        <div className="mx-auto max-w-(--container-content) px-4 md:px-6">
          <h2 className="font-display text-[28px] md:text-[36px] font-bold text-cream mb-6">
            Hakkimizda
          </h2>
          <p className="text-cream/80 leading-relaxed max-w-2xl">
            Susehri&apos;nin kalbinde, geleneksel berberlik sanatini modern
            tasarimla bulusturan bir mekan. Salon Dejavu olarak, her
            musterimize ozel bir deneyim sunuyoruz.
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* Hizmetler Section */}
      <section id="hizmetler" className="bg-base-light min-h-[70vh] py-(--spacing-section-mobile) md:py-(--spacing-section)">
        <div className="mx-auto max-w-(--container-content) px-4 md:px-6">
          <h2 className="font-display text-[28px] md:text-[36px] font-bold text-cream mb-8">
            Hizmetler
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <RetroCard>
              <h3 className="text-gold font-bold mb-2">Sac Kesimi</h3>
              <p className="text-cream/70 text-sm">
                Klasik ve modern sac kesim teknikleri.
              </p>
            </RetroCard>
            <RetroCard>
              <h3 className="text-gold font-bold mb-2">Sakal Tasarimi</h3>
              <p className="text-cream/70 text-sm">
                Profesyonel sakal sekillendirme ve bakim.
              </p>
            </RetroCard>
            <RetroCard>
              <h3 className="text-gold font-bold mb-2">Cilt Bakimi</h3>
              <p className="text-cream/70 text-sm">
                Yuz bakimi ve cilt temizligi hizmetleri.
              </p>
            </RetroCard>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Iletisim Section */}
      <section id="iletisim" className="bg-base-dark min-h-[70vh] py-(--spacing-section-mobile) md:py-(--spacing-section)">
        <div className="mx-auto max-w-(--container-content) px-4 md:px-6">
          <h2 className="font-display text-[28px] md:text-[36px] font-bold text-cream mb-6">
            Iletisim
          </h2>
          <RetroCard className="max-w-md">
            <p className="text-cream/80 mb-2">{BUSINESS.address}</p>
            <p className="text-gold font-bold">{BUSINESS.phoneFormatted}</p>
            <p className="text-cream/60 mt-2 text-sm">
              Hafta ici: {BUSINESS.hours.weekdays}
            </p>
            <p className="text-cream/60 text-sm">
              Pazar: {BUSINESS.hours.sunday}
            </p>
          </RetroCard>
        </div>
      </section>

      <SectionDivider />

      {/* Animation Demo */}
      <section className="bg-base-medium py-(--spacing-section-mobile) md:py-(--spacing-section)">
        <AnimationDemo />
      </section>

      {/* Copyright */}
      <div className="bg-base-dark pb-8 pt-4">
        <p className="text-sm text-cream/50 text-center">
          {BUSINESS.copyright}
        </p>
      </div>
    </>
  );
}
