import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { AnimationProvider } from "@/components/providers/AnimationProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Navbar } from "@/components/layout/Navbar";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { PageTransition } from "@/components/animations/PageTransition";
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
  title: "Salon Dejavu \u2014 Sac ve Sakal Tasarimi",
  description:
    "Susehri/Sivas'taki Salon Dejavu Erkek Kuaforu. Profesyonel sac ve sakal tasarimi hizmetleri.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-body bg-base-dark text-cream min-h-screen">
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
      </body>
    </html>
  );
}
