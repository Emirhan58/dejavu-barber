import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { AnimationProvider } from "@/components/providers/AnimationProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Navbar } from "@/components/layout/Navbar";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { PageTransition } from "@/components/animations/PageTransition";
import { generateBusinessJsonLd } from "@/lib/structured-data";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://salondejavu.vercel.app"),
  verification: {
    google: "I5eaoY-wfYI0-D0QzCG4zXBIXLDlTYubLXe3XzJBaNo",
  },
  title: {
    default: "Salon Dejavu — Suşehri Berber | Saç ve Sakal Tasarımı",
    template: "%s | Salon Dejavu",
  },
  description:
    "Suşehri'nin en iyi erkek kuaförü. Profesyonel saç kesimi, sakal tıraşı, cilt bakımı. Salon Dejavu — Sivas Cd. No:55/C, Suşehri/Sivas. Randevu için: 0539 725 68 86",
  keywords: [
    "suşehri berber",
    "Suşehri berber",
    "susehri berber",
    "suşehri erkek kuaförü",
    "Suşehri erkek kuaförü",
    "susehri erkek kuaforu",
    "sivas berber",
    "Sivas berber",
    "salon dejavu",
    "Salon Dejavu",
    "saç kesimi suşehri",
    "erkek kuaförü sivas",
  ],
  authors: [{ name: "Salon Dejavu" }],
  openGraph: {
    title: "Salon Dejavu — Suşehri Berber",
    description:
      "Suşehri'nin en iyi erkek kuaförü. Profesyonel saç ve sakal tasarımı.",
    url: "https://salondejavu.vercel.app",
    siteName: "Salon Dejavu",
    locale: "tr_TR",
    type: "website",
  },
  alternates: {
    canonical: "https://salondejavu.vercel.app",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = generateBusinessJsonLd("https://salondejavu.vercel.app");

  return (
    <html lang="tr" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-body bg-base-dark text-cream min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <AnimationProvider>
          <SmoothScrollProvider>
            <div className="grain-overlay">
              <Navbar />
              <main>
                <PageTransition>{children}</PageTransition>
              </main>
              <WhatsAppButton />
            </div>
          </SmoothScrollProvider>
        </AnimationProvider>
        <Analytics />
      </body>
    </html>
  );
}
