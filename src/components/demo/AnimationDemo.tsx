"use client";
import { useRef, useState, useEffect } from "react";
import { gsap, useGSAP } from "@/lib/gsap-config";
import { motion } from "motion/react";
import { useAnimationTier } from "@/hooks/useAnimationTier";

export function AnimationDemo() {
  const container = useRef<HTMLDivElement>(null);
  const tier = useAnimationTier();
  const [ready, setReady] = useState(false);

  // Wait one frame after mount so tier has stabilized
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // GSAP animation — fade-in on mount (only after tier is stable)
  useGSAP(
    () => {
      if (!ready || tier === "none") return;

      gsap.from(".gsap-fade-item", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      });
    },
    { scope: container, dependencies: [ready] }
  );

  return (
    <section className="py-12 md:py-24">
      <h2 className="font-display text-[28px] md:text-[36px] font-bold text-cream text-center mb-8">
        Animasyon Demo
      </h2>

      {/* GSAP controlled elements */}
      <div
        ref={container}
        className="max-w-[var(--container-content)] mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {["GSAP Fade 1", "GSAP Fade 2", "GSAP Fade 3"].map((text) => (
          <div
            key={text}
            className="gsap-fade-item retro-card p-6 bg-base-medium text-cream"
            style={!ready ? { opacity: 0 } : undefined}
          >
            <p className="font-body text-base">{text}</p>
            <p className="text-sm text-gold mt-2">Tier: {tier}</p>
          </div>
        ))}
      </div>

      {/* Motion controlled elements */}
      <div className="max-w-[var(--container-content)] mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {["Motion Hover 1", "Motion Hover 2"].map((text) => (
          <motion.div
            key={text}
            className="retro-card p-6 bg-base-light text-cream cursor-pointer"
            whileHover={tier !== "none" ? { scale: 1.03 } : undefined}
            whileTap={tier !== "none" ? { scale: 0.98 } : undefined}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <p className="font-body text-base">{text}</p>
            <p className="text-sm text-gold mt-2">Motion-driven (hover/tap)</p>
          </motion.div>
        ))}
      </div>

      {/* Tier indicator */}
      <div className="text-center mt-8">
        <p className="text-sm text-gold">
          Aktif Tier:{" "}
          <span className="text-neon-red font-bold uppercase">{tier}</span>
        </p>
        <p className="text-xs text-cream/50 mt-1">
          Desktop = full, Mobil = reduced, Reduced-motion = none
        </p>
      </div>
    </section>
  );
}
