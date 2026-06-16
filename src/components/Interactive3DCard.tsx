"use client";

import Link from "next/link";
import * as React from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { usePointerFine } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { CursorGlow } from "@/components/CursorGlow";

type Interactive3DCardProps = {
  children: React.ReactNode;
  className?: string;
  surfaceClassName?: string;
  contentClassName?: string;
  href?: string;
  dataCursor?: string;
  tilt?: number;
  glowSize?: number;
  glowIntensity?: number;
  lift?: number;
};

export function Interactive3DCard({
  children,
  className,
  surfaceClassName,
  contentClassName,
  href,
  dataCursor,
  tilt = 7,
  glowSize = 220,
  glowIntensity = 0.18,
  lift = 6,
}: Interactive3DCardProps) {
  const reduced = useReducedMotion();
  const pointerFine = usePointerFine();
  const interactive = !reduced && pointerFine;

  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const transform = useMotionTemplate`perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const px = ((event.clientX - rect.left) / rect.width) * 100;
    const py = ((event.clientY - rect.top) / rect.height) * 100;
    const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
    const offsetY = (event.clientY - rect.top) / rect.height - 0.5;

    glowX.set(px);
    glowY.set(py);
    rotateY.set(offsetX * tilt);
    rotateX.set(-offsetY * tilt);
  };

  const handlePointerLeave = () => {
    glowX.set(50);
    glowY.set(50);
    rotateX.set(0);
    rotateY.set(0);
  };

  const content = (
    <>
      <CursorGlow
        x={glowX}
        y={glowY}
        size={glowSize}
        intensity={glowIntensity}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/12 to-transparent" />
      <div className={cn("relative z-10 h-full", contentClassName)}>{children}</div>
    </>
  );

  return (
    <motion.div
      className={cn("h-full", className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={interactive ? { transform, transformStyle: "preserve-3d" } : undefined}
      transition={{ type: "spring", stiffness: 220, damping: 22, mass: 0.8 }}
      whileHover={interactive ? { y: -lift } : undefined}
    >
      {href ? (
        <Link
          href={href}
          data-cursor={dataCursor}
          className={cn(
            "group/card relative flex h-full overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(180deg,rgba(23,23,28,0.78),rgba(9,9,11,0.95))] shadow-[0_24px_60px_rgba(0,0,0,0.22)] backdrop-blur-md transition-[border-color,box-shadow,transform] duration-300 outline-none",
            "hover:border-accent/40 hover:shadow-[0_24px_70px_rgba(0,0,0,0.34),0_0_40px_rgba(229,72,77,0.12)] focus-visible:border-accent/45",
            surfaceClassName,
          )}
        >
          {content}
        </Link>
      ) : (
        <div
          className={cn(
            "group/card relative flex h-full overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(180deg,rgba(23,23,28,0.78),rgba(9,9,11,0.95))] shadow-[0_24px_60px_rgba(0,0,0,0.22)] backdrop-blur-md transition-[border-color,box-shadow,transform] duration-300",
            "hover:border-accent/40 hover:shadow-[0_24px_70px_rgba(0,0,0,0.34),0_0_40px_rgba(229,72,77,0.12)]",
            surfaceClassName,
          )}
        >
          {content}
        </div>
      )}
    </motion.div>
  );
}
