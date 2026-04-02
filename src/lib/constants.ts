export const BUSINESS = {
  name: "Salon Dejavu",
  subtitle: "Saç ve Sakal Tasarımı",
  phone: "05397256886",
  phoneFormatted: "0539 725 68 86",
  whatsappUrl: "https://wa.me/905397256886",
  address:
    "Cami Orta Mahallesi, Sivas Cd. No:55/C, 58600 Suşehri/Sivas",
  hours: {
    weekdays: "07:00 - 23:30",
    sunday: "Kapalı",
  },
  copyright: "© 2026 Salon Dejavu — Tüm hakları saklıdır.",
} as const;

export const NAV_ITEMS = [
  { label: "Hakkımızda", href: "#hakkimizda" },
  { label: "Hizmetler", href: "#hizmetler" },
  { label: "Galeri", href: "/galeri" },
  { label: "İletişim", href: "#iletisim" },
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
  blurDataURL: string;
};

export const SERVICES: ServiceCategory[] = [
  {
    category: "Saç",
    items: [
      { name: "Saç Kesimi", description: "Klasik ve modern saç kesim teknikleri ile size en uygun tarzı oluşturuyoruz.", icon: "scissors" },
      { name: "Saç Boyama", description: "Profesyonel boyama ve renklendirme hizmetiyle yeni bir görünüm.", icon: "brush" },
      { name: "Perma", description: "Doğal görünümlü, uzun ömürlü perma uygulamaları.", icon: "comb" },
    ],
  },
  {
    category: "Sakal",
    items: [
      { name: "Sakal Tıraşı", description: "Geleneksel ustura ile hassas sakal tıraşı ve şekillendirme.", icon: "razor" },
      { name: "Sakal Bakımı", description: "Profesyonel sakal bakımı, nemlendirme ve şekillendirme.", icon: "beard" },
    ],
  },
  {
    category: "Cilt Bakımı",
    items: [
      { name: "Yüz Bakımı", description: "Cilt tipinize özel profesyonel yüz bakımı uygulamaları.", icon: "face" },
      { name: "Cilt Temizliği", description: "Derinlemesine cilt temizliği ve peeling uygulamaları.", icon: "sparkle" },
    ],
  },
  {
    category: "Özel Hizmetler",
    items: [
      { name: "Ağda", description: "Profesyonel ağda uygulamaları.", icon: "wax" },
      { name: "Buhar", description: "Rahatlatıcı buhar uygulaması ile cilt bakımı.", icon: "steam" },
      { name: "Saç Dövmesi", description: "Saç dövmesi ve özel tasarım uygulamaları.", icon: "tattoo" },
    ],
  },
];

export const GALLERY_IMAGES: GalleryImage[] = [
  { src: "/images/gallery/dejavu-kuafor.jpg", alt: "Dejavu Kuaför dış görünüm", category: "dukkan", width: 800, height: 600, blurDataURL: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAdEAACAgEFAAAAAAAAAAAAAAABEQACBAMSISPB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAL/xAAWEQEBAQAAAAAAAAAAAAAAAAABADH/2gAMAwEAAhEDEQA/AIl8jGOFap0e0g13NrlvyIiFXa7/2Q==" },
  { src: "/images/gallery/dejavu-kuafor2.jpg", alt: "Dejavu Kuaför giriş", category: "dukkan", width: 800, height: 600, blurDataURL: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAT/xAAeEAABBAEFAAAAAAAAAAAAAAABAAIDEQQSEyFB4f/EABUBAQEAAAAAAAAAAAAAAAAAAAED/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAECEf/aAAwDAQACEQMRAD8Ake3L3JNUsrQGWTyLPZ8REQyk4z//2Q==" },
  { src: "/images/gallery/kuafor-icerisi.jpg", alt: "Salon Dejavu iç mekân", category: "dukkan", width: 800, height: 600, blurDataURL: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAH/xAAbEAACAwADAAAAAAAAAAAAAAABAgADBBEhIv/EABQBAQAAAAAAAAAAAAAAAAAAAAP/xAAWEQADAAAAAAAAAAAAAAAAAAAAASH/2gAMAwEAAhEDEQA/AJpoavKLq63ZXAJUn2QR3xERCcEVP//Z" },
  { src: "/images/gallery/kuafor-ici.jpg", alt: "Salon Dejavu çalışma alanı", category: "dukkan", width: 800, height: 600, blurDataURL: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAL/xAAcEAACAgIDAAAAAAAAAAAAAAABAgADBCExMpH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABcRAQEBAQAAAAAAAAAAAAAAAAEAAiH/2gAMAwEAAhEDEQA/AJda8q2xstnSlwCAnZtDzgRESa0jyAN//9k=" },
  { src: "/images/gallery/kuafor-ici2.jpg", alt: "Salon Dejavu detay", category: "dukkan", width: 800, height: 600, blurDataURL: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAL/xAAcEAACAgIDAAAAAAAAAAAAAAAAAQIDBBEFIYH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AKx+QUZ1QdkdLptp6foACv/Z" },
  { src: "/images/gallery/sac.jpg", alt: "Saç tasarımı çalışması", category: "calismalarimiz", width: 800, height: 600, blurDataURL: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAH/xAAaEAACAwEBAAAAAAAAAAAAAAABAwACMQVh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAgP/xAAXEQEBAQEAAAAAAAAAAAAAAAABAgAR/9oADAMBAAIRAxEAPwCpS13SsUsusGuCxII8BzIiJOV5ncg7/9k=" },
  { src: "/images/gallery/sac2.jpg", alt: "Saç kesim çalışması", category: "calismalarimiz", width: 800, height: 600, blurDataURL: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAH/xAAcEAACAgIDAAAAAAAAAAAAAAABAwARAgQFIUH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAA//EABgRAAMBAQAAAAAAAAAAAAAAAAABIQMi/9oADAMBAAIRAxEAPwC6+qs8ox7H5BYFizRPXsREln0qFD//2Q==" },
];

export const GALLERY_FILTERS = [
  { label: "Tümü", value: "all" },
  { label: "Dükkân", value: "dukkan" },
  { label: "Çalışmalarımız", value: "calismalarimiz" },
] as const;
