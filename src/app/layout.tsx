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
  metadataBase: new URL("https://dejavu-barber.vercel.app"),
  title: {
    default: "Salon Dejavu \u2014 Susehri Berber | Sac ve Sakal Tasarimi",
    template: "%s | Salon Dejavu",
  },
  description:
    "Susehri'nin en iyi erkek kuaforu. Profesyonel sac kesimi, sakal trasi, cilt bakimi. Salon Dejavu \u2014 Sivas Cd. No:55/C, Susehri/Sivas. Randevu icin: 0539 725 68 86",
  keywords: [
    "susehri berber",
    "Susehri berber",
    "Su\u015Fehri berber",
    "susehri erkek kuaforu",
    "Su\u015Fehri erkek kuaf\u00F6r\u00FC",
    "sivas berber",
    "Sivas berber",
    "salon dejavu",
    "Salon Dejavu",
  ],
  authors: [{ name: "Salon Dejavu" }],
  openGraph: {
    title: "Salon Dejavu \u2014 Susehri Berber",
    description:
      "Susehri'nin en iyi erkek kuaforu. Profesyonel sac ve sakal tasarimi.",
    url: "https://dejavu-barber.vercel.app",
    siteName: "Salon Dejavu",
    locale: "tr_TR",
    type: "website",
  },
  alternates: {
    canonical: "https://dejavu-barber.vercel.app",
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
  const jsonLd = generateBusinessJsonLd("https://dejavu-barber.vercel.app");

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
