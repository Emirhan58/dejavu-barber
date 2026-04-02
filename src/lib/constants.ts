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

export type GalleryItem = {
  src: string;
  alt: string;
  category: "dukkan" | "calismalarimiz" | "urunlerimiz";
  width: number;
  height: number;
  blurDataURL: string;
  type?: "image" | "video";
};

/** @deprecated Use GalleryItem instead */
export type GalleryImage = GalleryItem;

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

export const GALLERY_IMAGES: GalleryItem[] = [
  // Dükkân
  { src: "/images/gallery/dukkan/dejavu-kuafor.jpg", alt: "Dejavu Kuaför dış görünüm", category: "dukkan", width: 1080, height: 1350, blurDataURL: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAIAAYDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAT/xAAZEAADAQEBAAAAAAAAAAAAAAAAAQIDITH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAv/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AINNIeUylSfr6AAp/9k=" },
  { src: "/images/gallery/dukkan/dejavu-kuafor2.jpg", alt: "Dejavu Kuaför giriş", category: "dukkan", width: 1440, height: 1080, blurDataURL: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAGAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAL/xAAaEAACAgMAAAAAAAAAAAAAAAAAAgMRASJR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAVEQEBAAAAAAAAAAAAAAAAAAAAAf/aAAwDAQACEQMRAD8AiaN8M27VXQACo//Z" },
  { src: "/images/gallery/dukkan/dukkan.jpeg", alt: "Salon Dejavu sokak görünümü", category: "dukkan", width: 1200, height: 1600, blurDataURL: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAIAAYDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAP/xAAbEAACAQUAAAAAAAAAAAAAAAAAAQIDBCEiMf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAVEQEBAAAAAAAAAAAAAAAAAAAAEf/aAAwDAQACEQMRAD8AlG4qNvbHQAIV/9k=" },
  { src: "/images/gallery/dukkan/dukkan2.jpeg", alt: "Salon Dejavu yoğun çalışma anı", category: "dukkan", width: 660, height: 1203, blurDataURL: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAIAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAT/xAAaEAEAAQUAAAAAAAAAAAAAAAAAAQIRFTGR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AKoyFtU9gAH/2Q==" },
  { src: "/images/gallery/dukkan/dukkan3.jpeg", alt: "Salon Dejavu gece aydınlatması", category: "dukkan", width: 941, height: 1600, blurDataURL: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAIAAUDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAT/xAAZEAACAwEAAAAAAAAAAAAAAAAAAgERIXH/xAAVAQEBAAAAAAAAAAAAAAAAAAABAv/EABcRAQADAAAAAAAAAAAAAAAAAAABERL/2gAMAwEAAhEDEQA/AJEalyKjoADcrp//2Q==" },
  { src: "/images/gallery/dukkan/dukkan4.jpeg", alt: "Salon Dejavu neon tabelası", category: "dukkan", width: 1600, height: 1200, blurDataURL: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAGAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAT/xAAaEAACIgMAAAAAAAAAAAAAAAAAAQIREiFx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAv/EABYRAQEBAAAAAAAAAAAAAAAAAAACQf/aAAwDAQACEQMRAD8AgyttR1HiAArw3//Z" },
  { src: "/images/gallery/dukkan/dukkan5.jpeg", alt: "Salon Dejavu eğlenceli anlar", category: "dukkan", width: 1200, height: 1600, blurDataURL: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAIAAYDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAP/xAAYEAADAQEAAAAAAAAAAAAAAAAAAgMBQf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8ApOVas+tSqbvQAQf/2Q==" },
  { src: "/images/gallery/dukkan/dukkan6.jpeg", alt: "Müşteri cilt bakımı anı", category: "dukkan", width: 1200, height: 1600, blurDataURL: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAIAAYDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAL/xAAaEAACIgMAAAAAAAAAAAAAAAAAAQIREyFB/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oADAMBAAIRAxEAPwCMk9KDu+JAAQf/2Q==" },
  { src: "/images/gallery/dukkan/dukkan7.jpeg", alt: "Berber ustası poz", category: "dukkan", width: 1200, height: 1200, blurDataURL: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAT/xAAbEAACAwADAAAAAAAAAAAAAAAAAQIDEQQSQf/EABQBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCmrjJ1Rg9Szs2vZaABD//Z" },
  { src: "/images/gallery/dukkan/dukkan8.jpeg", alt: "Berber ustası portre", category: "dukkan", width: 914, height: 1579, blurDataURL: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAIAAUDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAP/xAAaEAADAQADAAAAAAAAAAAAAAAAAQIDESFB/8QAFAEBAAAAAAAAAAAAAAAAAAAAAv/EABURAQEAAAAAAAAAAAAAAAAAAAAB/9oADAMBAAIRAxEAPwCGrWNvO85pLueX4ABQa//Z" },
  { src: "/images/gallery/dukkan/dukkan9.jpeg", alt: "Salon Dejavu ekip fotoğrafı", category: "dukkan", width: 1200, height: 1600, blurDataURL: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAIAAYDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAH/xAAaEAEBAAIDAAAAAAAAAAAAAAABAAIDBBEi/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AKc7HDYgeQ6kkH//2Q==" },
  { src: "/images/gallery/dukkan/dukkan10.jpeg", alt: "Salon Dejavu iç mekân müşteriler", category: "dukkan", width: 1200, height: 1600, blurDataURL: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAIAAYDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAP/xAAbEAACIgMBAAAAAAAAAAAAAAAAAhESAQMhQf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Aii63S1HiYz30AEH/2Q==" },
  { src: "/images/gallery/dukkan/dukkan11.jpeg", alt: "Salon Dejavu önünde ekip", category: "dukkan", width: 1200, height: 1600, blurDataURL: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAIAAYDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAP/xAAaEAACAwEBAAAAAAAAAAAAAAAAAgEDESEx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAv/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJJbcirjw0ZnY8AASf/Z" },
  { src: "/images/gallery/dukkan/dukkan12.jpeg", alt: "Salon Dejavu dış cephe", category: "dukkan", width: 1200, height: 1600, blurDataURL: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAIAAYDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAT/xAAbEAABBAMAAAAAAAAAAAAAAAAAAgMRMQQhIv/EABQBAQAAAAAAAAAAAAAAAAAAAAL/xAAVEQEBAAAAAAAAAAAAAAAAAAAAEf/aAAwDAQACEQMRAD8Anax1VHUbhNAAJR//2Q==" },
  { src: "/images/gallery/dukkan/kuafor-icerisi.jpg", alt: "Salon Dejavu iç mekân", category: "dukkan", width: 1080, height: 1350, blurDataURL: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAIAAYDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAL/xAAbEAACIgMBAAAAAAAAAAAAAAAAAQIRAxIhIv/EABQBAQAAAAAAAAAAAAAAAAAAAAL/xAAXEQADAQAAAAAAAAAAAAAAAAAAAREh/9oADAMBAAIRAxEAPwCcqcEtPV9pSVoAAeClP//Z" },
  { src: "/images/gallery/dukkan/kuafor-ici.jpg", alt: "Salon Dejavu çalışma alanı", category: "dukkan", width: 1440, height: 1440, blurDataURL: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAH/xAAYEAADAQEAAAAAAAAAAAAAAAAAAQIxA//EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAVEQEBAAAAAAAAAAAAAAAAAAABAP/aAAwDAQACEQMRAD8AlKet0+rcw8S14AArC//Z" },
  { src: "/images/gallery/dukkan/kuafor-ici2.jpg", alt: "Salon Dejavu detay", category: "dukkan", width: 1200, height: 1200, blurDataURL: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAH/xAAZEAADAAMAAAAAAAAAAAAAAAAAAQIDBFH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AuPYScy6XAAB//9k=" },
  { src: "/images/gallery/dukkan/dukkanVideo.mp4", alt: "Salon Dejavu tanıtım videosu", category: "dukkan", width: 1080, height: 1920, blurDataURL: "", type: "video" },
  // Çalışmalarımız
  { src: "/images/gallery/calismalarimiz/calismalar.jpeg", alt: "Saç kesim modelleri kolajı", category: "calismalarimiz", width: 802, height: 829, blurDataURL: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAH/xAAbEAACIgMBAAAAAAAAAAAAAAAAAQIRAzFh8P/EABQBAQAAAAAAAAAAAAAAAAAAAAL/xAAVEQEBAAAAAAAAAAAAAAAAAAAAEf/aAAwDAQACEQMRAD8AjjUbeOVVpy75gANKP//Z" },
  { src: "/images/gallery/calismalarimiz/calisma1.jpeg", alt: "Müşteri saç kesimi sonrası", category: "calismalarimiz", width: 1200, height: 1599, blurDataURL: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAIAAYDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAL/xAAaEAACIgMAAAAAAAAAAAAAAAAAEQECBBIT/8QAFAEBAAAAAAAAAAAAAAAAAAAAAv/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AKrk8p1l1cNMABJ//9k=" },
  { src: "/images/gallery/calismalarimiz/calisma2.jpeg", alt: "Berber ve müşteri selfie", category: "calismalarimiz", width: 1200, height: 1600, blurDataURL: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAIAAYDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAP/xAAaEAACIgMAAAAAAAAAAAAAAAAAAQIRAwQx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAWEQEBAQAAAAAAAAAAAAAAAAABABH/2gAMAwEAAhEDEQA/AKQ3owyu22q4ABylW//Z" },
  { src: "/images/gallery/calismalarimiz/calisma3.jpeg", alt: "Saç kesimi tamamlanmış müşteri", category: "calismalarimiz", width: 1200, height: 1200, blurDataURL: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAH/xAAZEAADAAMAAAAAAAAAAAAAAAAAAQIDBFH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AuPYScy6XAAB//9k=" },
  { src: "/images/gallery/calismalarimiz/calisma4.jpeg", alt: "Saç kesimi sırasında", category: "calismalarimiz", width: 1200, height: 1600, blurDataURL: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAIAAYDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAL/xAAZEAEBAAMBAAAAAAAAAAAAAAACAAERIUH/xAAUAQEAAAAAAAAAAAAAAAAAAAAC/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAMAwEAAhEDEQA/AJARGNPvuFySRpR//9k=" },
  { src: "/images/gallery/calismalarimiz/calisma5.jpeg", alt: "Fade kesim çalışması", category: "calismalarimiz", width: 1200, height: 1600, blurDataURL: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAIAAYDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAL/xAAbEAABBQEBAAAAAAAAAAAAAAAAAQIDESESMf/EABUBAQEAAAAAAAAAAAAAAAAAAAID/8QAFxEBAQEBAAAAAAAAAAAAAAAAAQACEf/aAAwDAQACEQMRAD8AtsLI07k28pF8ABLWkZB2/9k=" },
  { src: "/images/gallery/calismalarimiz/calisma6.jpeg", alt: "Saç şekillendirme sonrası", category: "calismalarimiz", width: 1200, height: 1600, blurDataURL: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAIAAYDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAL/xAAaEAACIgMAAAAAAAAAAAAAAAAAAQIxAxMh/8QAFAEBAAAAAAAAAAAAAAAAAAAAAv/EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oADAMBAAIRAxEAPwCXknJa6ku1aAAKUf/Z" },
  { src: "/images/gallery/calismalarimiz/sac.jpg", alt: "Saç tasarımı çalışması", category: "calismalarimiz", width: 1440, height: 1440, blurDataURL: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAH/xAAbEAADAAIDAAAAAAAAAAAAAAAAAQIEESFR4f/EABQBAQAAAAAAAAAAAAAAAAAAAAL/xAAXEQEBAQEAAAAAAAAAAAAAAAABAAIh/9oADAMBAAIRAxEAPwCxFXktxTna748AARlo7f/Z" },
  { src: "/images/gallery/calismalarimiz/sac2.jpg", alt: "Saç kesim çalışması", category: "calismalarimiz", width: 768, height: 960, blurDataURL: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAIAAYDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAL/xAAaEAADAQADAAAAAAAAAAAAAAAAAQMCERMh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAL/xAAWEQEBAQAAAAAAAAAAAAAAAAABACH/2gAMAwEAAhEDEQA/AKjPPbTVNt8vxMAEDkL/2Q==" },
  // Ürünlerimiz
  { src: "/images/gallery/urunlerimiz/urun1.jpeg", alt: "Powertec profesyonel saç kurutma makinesi", category: "urunlerimiz", width: 1200, height: 1008, blurDataURL: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAHAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAL/xAAaEAACAwEBAAAAAAAAAAAAAAAAAQIREgMx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAVEQEBAAAAAAAAAAAAAAAAAAAAAf/aAAwDAQACEQMRAD8Aroo6jTy17QAFqv/Z" },
  { src: "/images/gallery/urunlerimiz/urun2.jpeg", alt: "Powertec profesyonel saç sakal makinesi", category: "urunlerimiz", width: 1042, height: 1055, blurDataURL: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAIAAgDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAAAP/EABsQAAIBBQAAAAAAAAAAAAAAAAABEwIDEiFB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAXEQADAQAAAAAAAAAAAAAAAAAAAQIR/9oADAMBAAIRAxEAPwBdkjeNKXHoACnhUf/Z" },
  { src: "/images/gallery/urunlerimiz/urun3.jpeg", alt: "Morfose saç spreyi", category: "urunlerimiz", width: 1200, height: 1600, blurDataURL: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAIAAYDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAP/xAAYEAADAQEAAAAAAAAAAAAAAAAAAQJDkv/EABQBAQAAAAAAAAAAAAAAAAAAAAL/xAAWEQEBAQAAAAAAAAAAAAAAAAAAEmH/2gAMAwEAAhEDEQA/AJSqWk9IABk7x//Z" },
  { src: "/images/gallery/urunlerimiz/urun4.jpeg", alt: "Wahl Super Close tıraş makinesi", category: "urunlerimiz", width: 1200, height: 1600, blurDataURL: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAIAAYDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAL/xAAbEAABBAMAAAAAAAAAAAAAAAAAAQMREgIhMf/EABUBAQEAAAAAAAAAAAAAAAAAAAID/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8At13GUrWsJxNyACZP/9k=" },
  { src: "/images/gallery/urunlerimiz/urun5.jpeg", alt: "Satılık berber ürünleri rafı", category: "urunlerimiz", width: 1600, height: 1200, blurDataURL: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAGAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAL/xAAZEAADAAMAAAAAAAAAAAAAAAAAAQMCMWH/xAAVAQEBAAAAAAAAAAAAAAAAAAACA//EABYRAQEBAAAAAAAAAAAAAAAAAAEAEf/aAAwDAQACEQMRAD8AqbrjpproAC1QMv/Z" },
  { src: "/images/gallery/urunlerimiz/urun6.jpeg", alt: "Saç bakım ürünleri ve wax çeşitleri", category: "urunlerimiz", width: 1600, height: 1200, blurDataURL: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAGAAgDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAAAP/EABkQAAIDAQAAAAAAAAAAAAAAAAACASExUf/EABQBAQAAAAAAAAAAAAAAAAAAAAP/xAAXEQEBAQEAAAAAAAAAAAAAAAABAgAh/9oADAMBAAIRAxEAPwBCNOttdAANUjlkE7v/2Q==" },
];

export const GALLERY_FILTERS = [
  { label: "Tümü", value: "all" },
  { label: "Dükkân", value: "dukkan" },
  { label: "Çalışmalarımız", value: "calismalarimiz" },
  { label: "Ürünlerimiz", value: "urunlerimiz" },
] as const;
