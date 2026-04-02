import { BUSINESS } from "@/lib/constants";

export function generateBusinessJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: BUSINESS.name,
    alternateName: "Dejavu Erkek Kuaförü",
    description:
      "Suşehri/Sivas'taki Salon Dejavu Erkek Kuaförü. Profesyonel saç ve sakal tasarımı hizmetleri.",
    url: siteUrl,
    telephone: `+90${BUSINESS.phone}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Cami Orta Mahallesi, Sivas Cd. No:55/C",
      addressLocality: "Suşehri",
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
    image: `${siteUrl}/images/gallery/dukkan/dejavu-kuafor.jpg`,
    priceRange: "$$",
    currenciesAccepted: "TRY",
    paymentAccepted: "Cash, Credit Card",
  };
}
