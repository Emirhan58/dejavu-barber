export const BUSINESS = {
  name: "Salon Dejavu",
  subtitle: "Sac ve Sakal Tasarimi",
  phone: "05397256886",
  phoneFormatted: "0539 725 68 86",
  whatsappUrl: "https://wa.me/905397256886",
  address:
    "Cami Orta Mahallesi, Sivas Cd. No:55/C, 58600 Susehri/Sivas",
  hours: {
    weekdays: "07:00 - 23:30",
    sunday: "Kapali",
  },
  copyright: "\u00A9 2026 Salon Dejavu \u2014 Tum haklari saklidir.",
} as const;

export const NAV_ITEMS = [
  { label: "Hakkimizda", href: "#hakkimizda" },
  { label: "Hizmetler", href: "#hizmetler" },
  { label: "Galeri", href: "/galeri" },
  { label: "Iletisim", href: "#iletisim" },
] as const;

export const CTA_TEXT = "RANDEVU AL" as const;
