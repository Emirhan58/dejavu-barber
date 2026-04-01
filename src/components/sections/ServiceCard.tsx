"use client";

import { motion } from "motion/react";
import { RetroCard } from "@/components/ui/RetroCard";
import { useAnimationTier } from "@/hooks/useAnimationTier";

function getServiceIcon(icon: string) {
  const props = {
    width: 40,
    height: 40,
    viewBox: "0 0 40 40",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
  };

  switch (icon) {
    case "scissors":
      return (
        <svg {...props}>
          <circle cx="10" cy="28" r="3" />
          <circle cx="30" cy="28" r="3" />
          <line x1="13" y1="26" x2="27" y2="14" />
          <line x1="27" y1="26" x2="13" y2="14" />
        </svg>
      );
    case "brush":
      return (
        <svg {...props}>
          <rect x="17" y="20" width="6" height="14" rx="1" />
          <path d="M14 8 C14 4, 26 4, 26 8 L26 20 L14 20 Z" />
          <line x1="17" y1="12" x2="23" y2="12" />
          <line x1="17" y1="16" x2="23" y2="16" />
        </svg>
      );
    case "comb":
      return (
        <svg {...props}>
          <rect x="8" y="16" width="24" height="8" rx="2" />
          <line x1="12" y1="16" x2="12" y2="10" />
          <line x1="16" y1="16" x2="16" y2="10" />
          <line x1="20" y1="16" x2="20" y2="10" />
          <line x1="24" y1="16" x2="24" y2="10" />
          <line x1="28" y1="16" x2="28" y2="10" />
        </svg>
      );
    case "razor":
      return (
        <svg {...props}>
          <path d="M8 28 L20 8 L24 8 L24 12 L12 32 L8 28Z" />
          <line x1="20" y1="8" x2="32" y2="8" />
          <line x1="24" y1="12" x2="32" y2="12" />
          <line x1="32" y1="8" x2="32" y2="12" />
        </svg>
      );
    case "beard":
      return (
        <svg {...props}>
          <path d="M12 14 C12 8, 28 8, 28 14" />
          <path d="M12 14 L12 22 C12 28, 20 32, 20 32 C20 32, 28 28, 28 22 L28 14" />
          <line x1="20" y1="18" x2="20" y2="26" />
        </svg>
      );
    case "face":
      return (
        <svg {...props}>
          <circle cx="20" cy="18" r="10" />
          <circle cx="16" cy="16" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="24" cy="16" r="1.5" fill="currentColor" stroke="none" />
          <path d="M16 22 C17 24, 23 24, 24 22" />
        </svg>
      );
    case "sparkle":
      return (
        <svg {...props}>
          <path d="M20 6 L22 16 L32 18 L22 20 L20 30 L18 20 L8 18 L18 16 Z" />
          <line x1="30" y1="8" x2="32" y2="6" />
          <line x1="30" y1="6" x2="32" y2="8" />
        </svg>
      );
    case "wax":
      return (
        <svg {...props}>
          <rect x="10" y="14" width="20" height="16" rx="3" />
          <path d="M14 14 C14 10, 26 10, 26 14" />
          <line x1="16" y1="20" x2="24" y2="20" />
          <line x1="16" y1="24" x2="24" y2="24" />
        </svg>
      );
    case "steam":
      return (
        <svg {...props}>
          <path d="M12 30 C12 24, 28 24, 28 30" />
          <rect x="10" y="30" width="20" height="4" rx="1" />
          <path d="M15 20 C15 18, 17 16, 15 14" />
          <path d="M20 20 C20 18, 22 16, 20 14" />
          <path d="M25 20 C25 18, 27 16, 25 14" />
        </svg>
      );
    case "tattoo":
      return (
        <svg {...props}>
          <path d="M14 32 L14 12 C14 8, 20 6, 20 6 C20 6, 26 8, 26 12 L26 32" />
          <line x1="14" y1="16" x2="26" y2="16" />
          <circle cx="20" cy="24" r="3" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <circle cx="20" cy="20" r="10" />
          <path d="M20 14 L22 18 L26 18 L23 21 L24 26 L20 23 L16 26 L17 21 L14 18 L18 18 Z" />
        </svg>
      );
  }
}

export function ServiceCard({
  name,
  description,
  icon,
}: {
  name: string;
  description: string;
  icon: string;
}) {
  const tier = useAnimationTier();

  return (
    <motion.div
      whileHover={
        tier !== "none"
          ? { y: -3, boxShadow: "0 8px 30px rgba(0,0,0,0.4)" }
          : undefined
      }
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <RetroCard>
        <div className="flex flex-col items-center text-center">
          <div className="mb-3 text-cream">{getServiceIcon(icon)}</div>
          <h3 className="text-base font-bold text-cream mb-2">{name}</h3>
          <p className="text-sm text-cream/70">{description}</p>
        </div>
      </RetroCard>
    </motion.div>
  );
}
