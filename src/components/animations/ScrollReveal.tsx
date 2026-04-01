"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap-config";
import { useAnimationTier } from "@/hooks/useAnimationTier";

interface ScrollRevealProps {
  children: React.ReactNode;
  stagger?: boolean;
  className?: string;
}

export function ScrollReveal({
  children,
  stagger = false,
  className = "",
}: ScrollRevealProps) {
  const container = useRef<HTMLDivElement>(null);
  const tier = useAnimationTier();

  useGSAP(
    () => {
      if (tier === "none") return;

      const targets = stagger
        ? gsap.utils.toArray<HTMLElement>(".scroll-reveal-item", container.current!)
        : [container.current!];

      if (targets.length === 0) return;

      // Set initial hidden state via GSAP (not CSS) so content is visible without JS
      gsap.set(targets, { opacity: 0, y: 40 });

      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: stagger ? 0.12 : 0,
        scrollTrigger: {
          trigger: container.current!,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: container, dependencies: [tier] }
  );

  return (
    <div ref={container} className={className}>
      {children}
    </div>
  );
}
