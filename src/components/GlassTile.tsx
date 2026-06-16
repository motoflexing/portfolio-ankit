"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Interactive3DCard } from "@/components/Interactive3DCard";

/**
 * Small dark-glass tile with a subtle pointer-reactive 3D tilt, a soft red
 * cursor-follow glow, and a red border-glow on hover. CSS/Framer-only — no
 * canvas — so it's cheap and never affects scroll.
 *
 * Performance & a11y:
 *  - Tilt + glow are disabled under reduced-motion and on coarse/touch pointers
 *    (the tile is then a plain hairline card).
 *  - Only transform/opacity animate (GPU-friendly), per the perf rules.
 *  - The wrapping element is a <div>; pass `className` for sizing/layout.
 */
export function GlassTile({
  children,
  className,
  /** Max tilt in degrees (kept small for subtlety). */
  tilt = 6,
}: {
  children: React.ReactNode;
  className?: string;
  tilt?: number;
}) {
  return (
    <Interactive3DCard
      className={className}
      surfaceClassName={cn(
        "rounded-lg bg-[linear-gradient(180deg,rgba(24,24,28,0.72),rgba(10,10,12,0.92))]",
        "hover:border-accent/35 hover:shadow-[0_24px_70px_rgba(0,0,0,0.32),0_0_34px_rgba(229,72,77,0.12)]",
      )}
      contentClassName="h-full"
      tilt={tilt}
      glowSize={190}
      glowIntensity={0.14}
      lift={4}
    >
      {children}
    </Interactive3DCard>
  );
}
