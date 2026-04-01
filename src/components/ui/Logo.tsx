"use client";
import { useId } from "react";

export function Logo({ className = "", height = 40 }: { className?: string; height?: number }) {
  const id = useId();
  const gradId = `logo-glow-${id}`;
  const neonId = `neon-filter-${id}`;
  const glowId = `outer-glow-${id}`;

  return (
    <svg
      viewBox="-5 -5 310 110"
      height={height}
      className={`shrink-0 ${className}`}
      style={{ width: "auto", minWidth: 0 }}
      aria-label="Salon Dejavu"
      role="img"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E8D5A3" />
          <stop offset="50%" stopColor="#C8A55A" />
          <stop offset="100%" stopColor="#9A7B3A" />
        </linearGradient>
        <filter id={neonId}>
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3.5" result="glow" />
          <feColorMatrix in="glow" type="matrix" values="0 0 0 0 0.78  0 0 0 0 0.65  0 0 0 0 0.35  0 0 0 0.4 0" result="coloredGlow" />
          <feMerge>
            <feMergeNode in="coloredGlow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter={`url(#${glowId})`}>
        {/* DEJA */}
        <text x="8" y="74" fontFamily="'Playfair Display', Georgia, serif" fontWeight="700" fontSize="70" fill={`url(#${gradId})`} filter={`url(#${neonId})`} letterSpacing="4">DEJA</text>

        {/* V — Crossed blades with crown */}
        <g transform="translate(217, 50)" filter={`url(#${neonId})`}>
          <path d="M-16,-32 L-15,-30 L4,-2 L14,18 L10,22 L-2,2 Z" fill={`url(#${gradId})`} />
          <circle cx="16" cy="26" r="7" stroke={`url(#${gradId})`} strokeWidth="3" fill="none" />
          <path d="M16,-32 L15,-30 L-4,-2 L-14,18 L-10,22 L2,2 Z" fill={`url(#${gradId})`} />
          <circle cx="-16" cy="26" r="7" stroke={`url(#${gradId})`} strokeWidth="3" fill="none" />
          <circle cx="0" cy="-2" r="2.5" fill="#0A0A0A" stroke={`url(#${gradId})`} strokeWidth="1.5" />
          <path d="M-14,-40 L-14,-46 L-7,-41 L0,-50 L7,-41 L14,-46 L14,-40 Z" fill={`url(#${gradId})`} />
          <rect x="-14" y="-40" width="28" height="4" rx="1" fill={`url(#${gradId})`} />
        </g>

        {/* U */}
        <text x="245" y="74" fontFamily="'Playfair Display', Georgia, serif" fontWeight="700" fontSize="70" fill={`url(#${gradId})`} filter={`url(#${neonId})`}>U</text>
      </g>
    </svg>
  );
}
