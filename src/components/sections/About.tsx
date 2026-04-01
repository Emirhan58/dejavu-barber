import Image from "next/image";

export function About() {
  return (
    <section
      id="hakkimizda"
      className="bg-base-medium py-(--spacing-section-mobile) md:py-(--spacing-section)"
    >
      <div className="mx-auto max-w-(--container-content) px-4 md:px-6">
        <h2 className="font-display text-2xl font-bold text-cream mb-6">
          Hakkimizda
        </h2>
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <p className="text-cream leading-relaxed text-base">
              Susehri&apos;nin kalbinde, geleneksel berberlik sanatini modern
              tasarimla bulusturan Salon Dejavu, yillardir musterilerine ozenli
              ve profesyonel hizmet sunmaktadir. Deneyimli ekibimiz, klasik sac
              ve sakal kesiminden modern tasarimlara kadar genis bir yelpazede
              sizlere en iyi deneyimi yasamaniz icin burada.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src="/images/about/kuafor-icerisi.jpg"
              alt="Salon Dejavu ic mekan"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
