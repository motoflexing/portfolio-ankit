"use client";

import { motion, type MotionValue } from "framer-motion";

export function CursorGlow({
  x,
  y,
  size = 220,
  intensity = 0.2,
  className,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  size?: number;
  intensity?: number;
  className?: string;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className={className}
      style={{
        background: `radial-gradient(${size}px circle at ${x}% ${y}%, rgba(229,72,77,${intensity}), transparent 60%)`,
      }}
    />
  );
}
