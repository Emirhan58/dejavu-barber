import { BUSINESS } from "@/lib/constants";

export function generateBusinessJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: BUSINESS.name,
    alternateName: "Dejavu Erkek Kuaforu",
    description:
      "Susehri/Sivas'taki Salon Dejavu Erkek Kuaforu. Profesyonel sac ve sakal tasarimi hizmetleri.",
    url: siteUrl,
    telephone: `+90${BUSINESS.phone}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Cami Orta Mahallesi, Sivas Cd. No:55/C",
      addressLocality: "Susehri",
      addressRegion: "Sivas",
      postalCode: "58600",
      addressCountry: "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.163,
      longitude: 38.087,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "07:00",
        closes: "23:30",
      },
    ],
    image: `${siteUrl}/images/gallery/dejavu-kuafor.jpg`,
    priceRange: "$$",
    currenciesAccepted: "TRY",
    paymentAccepted: "Cash, Credit Card",
  };
}
