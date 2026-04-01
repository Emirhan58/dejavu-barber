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

export const WHATSAPP_MESSAGE = "Merhaba, randevu almak istiyorum." as const;

export type ServiceCategory = {
  category: string;
  items: { name: string; description: string; icon: string }[];
};

export type GalleryImage = {
  src: string;
  alt: string;
  category: "dukkan" | "calismalarimiz";
  width: number;
  height: number;
};

export const SERVICES: ServiceCategory[] = [
  {
    category: "Sac",
    items: [
      { name: "Sac Kesimi", description: "Klasik ve modern sac kesim teknikleri ile size en uygun tarzi olusturuyoruz.", icon: "scissors" },
      { name: "Sac Boyama", description: "Profesyonel boyama ve renklendirme hizmetiyle yeni bir gorunum.", icon: "brush" },
      { name: "Perma", description: "Dogal gorunumlu, uzun omurlu perma uygulamalari.", icon: "comb" },
    ],
  },
  {
    category: "Sakal",
    items: [
      { name: "Sakal Tiras", description: "Geleneksel ustura ile hassas sakal trasi ve sekillendirme.", icon: "razor" },
      { name: "Sakal Bakimi", description: "Profesyonel sakal bakimi, nemlendirme ve sekillendirme.", icon: "beard" },
    ],
  },
  {
    category: "Cilt Bakimi",
    items: [
      { name: "Yuz Bakimi", description: "Cilt tipinize ozel profesyonel yuz bakimi uygulamalari.", icon: "face" },
      { name: "Cilt Temizligi", description: "Derinlemesine cilt temizligi ve peeling uygulamalari.", icon: "sparkle" },
    ],
  },
  {
    category: "Ozel Hizmetler",
    items: [
      { name: "Agda", description: "Profesyonel agda uygulamalari.", icon: "wax" },
      { name: "Buhar", description: "Rahatlatici buhar uygulamasi ile cilt bakimi.", icon: "steam" },
      { name: "Sac Dovmesi", description: "Sac dovmesi ve ozel tasarim uygulamalari.", icon: "tattoo" },
    ],
  },
];

export const GALLERY_IMAGES: GalleryImage[] = [
  { src: "/images/gallery/dejavu-kuafor.jpg", alt: "Dejavu Kuafor dis gorunum", category: "dukkan", width: 800, height: 600 },
  { src: "/images/gallery/dejavu-kuafor2.jpg", alt: "Dejavu Kuafor giris", category: "dukkan", width: 800, height: 600 },
  { src: "/images/gallery/kuafor-icerisi.jpg", alt: "Salon Dejavu ic mekan", category: "dukkan", width: 800, height: 600 },
  { src: "/images/gallery/kuafor-ici.jpg", alt: "Salon Dejavu calisma alani", category: "dukkan", width: 800, height: 600 },
  { src: "/images/gallery/kuafor-ici2.jpg", alt: "Salon Dejavu detay", category: "dukkan", width: 800, height: 600 },
  { src: "/images/gallery/sac.jpg", alt: "Sac tasarimi calismasi", category: "calismalarimiz", width: 800, height: 600 },
  { src: "/images/gallery/sac2.jpg", alt: "Sac kesim calismasi", category: "calismalarimiz", width: 800, height: 600 },
];

export const GALLERY_FILTERS = [
  { label: "Tumu", value: "all" },
  { label: "Dukkan", value: "dukkan" },
  { label: "Calismalarimiz", value: "calismalarimiz" },
] as const;
