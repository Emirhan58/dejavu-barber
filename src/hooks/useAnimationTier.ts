"use client";
import { useState, useEffect } from "react";

export type AnimationTier = "full" | "reduced" | "none";
export type AnimationTierState = { tier: AnimationTier; ready: boolean };

export function useAnimationTier(): AnimationTier {
  const [tier, setTier] = useState<AnimationTier>("reduced");

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const isDesktop = window.matchMedia("(min-width: 768px)");

    function update() {
      if (prefersReduced.matches) {
        setTier("none");
      } else if (isDesktop.matches) {
        setTier("full");
      } else {
        setTier("reduced");
      }
    }

    update();
    prefersReduced.addEventListener("change", update);
    isDesktop.addEventListener("change", update);

    return () => {
      prefersReduced.removeEventListener("change", update);
      isDesktop.removeEventListener("change", update);
    };
  }, []);

  return tier;
}
