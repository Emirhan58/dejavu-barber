"use client";
import { useAnimationTier } from "@/hooks/useAnimationTier";

export function SmokeParticles() {
  const tier = useAnimationTier();

  if (tier !== "full") {
    return null;
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[40%] overflow-hidden pointer-events-none z-[1]">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="smoke-particle"
          style={{
            left: `${10 + i * 8}%`,
            bottom: `${(i * 7) % 20}%`,
            animationDelay: `${i * 0.6}s`,
            animationDuration: `${5 + (i % 4) * 0.75}s`,
            width: `${60 + (i % 5) * 10}px`,
            height: `${60 + (i % 5) * 10}px`,
          }}
        />
      ))}
    </div>
  );
}
