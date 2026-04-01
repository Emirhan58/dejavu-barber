"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { gsap, useGSAP } from "@/lib/gsap-config";
import { useAnimationTier } from "@/hooks/useAnimationTier";

export function IntroOverlay({ children }: { children: React.ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [show, setShow] = useState(false);
  const tier = useAnimationTier();

  useEffect(() => {
    if (sessionStorage.getItem("intro-seen")) return;
    if (tier === "none") return;
    setShow(true);
  }, [tier]);

  const skip = useCallback(() => {
    tlRef.current?.progress(1);
  }, []);

  useGSAP(
    () => {
      if (!show) return;

      const letters = gsap.utils.toArray<HTMLElement>(
        ".intro-letter",
        overlayRef.current!
      );
      const shuffled = [...letters].sort(() => Math.random() - 0.5);

      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("intro-seen", "1");
        },
      });

      // Phase 1 - Letter reveal (shuffled order)
      tl.from(shuffled, {
        opacity: 0,
        textShadow: "0 0 0px transparent",
        duration: 0.2,
        stagger: 0.15,
        ease: "power2.in",
      });

      // Phase 2 - Full glow pulse
      tl.to(".intro-letter", {
        textShadow:
          "0 0 10px #E11D48, 0 0 40px rgba(225,29,72,0.5)",
        duration: 0.4,
        ease: "power2.out",
      });

      // Phase 3 - Slogan fade-in
      tl.from(".intro-slogan", {
        opacity: 0,
        y: 10,
        duration: 0.5,
      });

      // Phase 4 - Hold
      tl.to({}, { duration: 0.3 });

      // Phase 5 - Curtain up
      tl.to(overlayRef.current!, {
        yPercent: -100,
        duration: 0.8,
        ease: "power3.inOut",
      });

      // Phase 6 - Cleanup
      tl.call(() => setShow(false));

      tlRef.current = tl;
    },
    { scope: overlayRef, dependencies: [show] }
  );

  if (!show) {
    return <>{children}</>;
  }

  return (
    <>
      <div
        ref={overlayRef}
        onClick={skip}
        className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center cursor-pointer"
      >
        <div className="flex">
          {"DEJAVU".split("").map((letter, i) => (
            <span
              key={i}
              className="intro-letter font-display font-bold text-cream"
              style={{ fontSize: "clamp(64px, 12vw, 96px)" }}
            >
              {letter}
            </span>
          ))}
        </div>
        <p className="intro-slogan text-cream/80 text-base md:text-xl tracking-[0.2em] mt-4 font-body">
          Sac ve Sakal Tasarimi
        </p>
      </div>
      {children}
    </>
  );
}
