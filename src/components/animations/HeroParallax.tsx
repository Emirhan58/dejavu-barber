"use client";

import { gsap, useGSAP } from "@/lib/gsap-config";
import { useAnimationTier } from "@/hooks/useAnimationTier";

export function HeroParallax() {
  const tier = useAnimationTier();

  useGSAP(
    () => {
      if (tier !== "full") return;

      gsap.to(".hero-bg-image", {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    },
    { dependencies: [tier] }
  );

  return null;
}
