"use client";
import dynamic from "next/dynamic";

const IntroOverlay = dynamic(
  () =>
    import("@/components/animations/IntroOverlay").then((m) => m.IntroOverlay),
  { ssr: false }
);

export function IntroOverlayLazy() {
  return <IntroOverlay />;
}
