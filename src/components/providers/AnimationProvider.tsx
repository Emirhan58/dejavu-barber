"use client";
// Import triggers GSAP plugin registration (side effect)
import "@/lib/gsap-config";

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
