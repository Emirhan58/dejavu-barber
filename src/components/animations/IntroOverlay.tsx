"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { gsap, useGSAP } from "@/lib/gsap-config";
import { useAnimationTier } from "@/hooks/useAnimationTier";
import { Logo } from "@/components/ui/Logo";

export function IntroOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [show, setShow] = useState(true);
  const tier = useAnimationTier();

  useEffect(() => {
    if (tier === "none") setShow(false);
  }, [tier]);

  const skip = useCallback(() => {
    tlRef.current?.progress(1);
  }, []);

  useGSAP(
    () => {
      if (!show || !overlayRef.current) return;

      const tl = gsap.timeline();

      // Phase 1 - Logo reveal
      tl.fromTo(".intro-logo",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
      );

      // Phase 2 - Gold glow pulse
      tl.to(".intro-logo", {
        filter: "drop-shadow(0 0 8px rgba(200,165,90,0.6)) drop-shadow(0 0 20px rgba(200,165,90,0.3))",
        duration: 0.5,
        ease: "power2.out",
      });

      // Phase 3 - Slogan fade-in
      tl.fromTo(".intro-slogan",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5 }
      );

      // Phase 4 - Hold
      tl.to({}, { duration: 0.4 });

      // Phase 5 - Curtain up
      tl.to(overlayRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power3.inOut",
      });

      // Phase 6 - Hide overlay
      tl.call(() => setShow(false));

      tlRef.current = tl;
    },
    { scope: overlayRef, dependencies: [show] }
  );

  if (!show) return null;

  return (
    <div
      ref={overlayRef}
      onClick={skip}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center cursor-pointer"
    >
      <div className="intro-logo" style={{ opacity: 0 }}>
        <Logo height={100} className="md:hidden" />
        <Logo height={160} className="hidden md:block" />
      </div>
      <p className="intro-slogan text-cream/80 text-base md:text-xl tracking-[0.2em] mt-4 font-body" style={{ opacity: 0 }}>
        Saç ve Sakal Tasarımı
      </p>
    </div>
  );
}
