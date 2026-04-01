import { SERVICES } from "@/lib/constants";
import { ServiceCard } from "./ServiceCard";

export function Services() {
  return (
    <section
      id="hizmetler"
      className="bg-base-dark py-(--spacing-section-mobile) md:py-(--spacing-section)"
    >
      <div className="mx-auto max-w-(--container-content) px-4 md:px-6">
        <h2 className="font-display text-2xl font-bold text-cream mb-8 text-center">
          Hizmetlerimiz
        </h2>
        {SERVICES.map(({ category, items }) => (
          <div key={category} className="mb-12 last:mb-0">
            <h3 className="text-lg font-bold text-gold uppercase tracking-wide mb-4">
              {category}
            </h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <ServiceCard key={item.name} {...item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
