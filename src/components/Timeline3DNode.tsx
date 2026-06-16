"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Timeline3DNode({
  active = false,
  className,
}: {
  active?: boolean;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative inline-flex h-4 w-4 items-center justify-center rounded-full border border-accent/50 bg-[#070709]",
        className,
      )}
    >
      {!reduced && (
        <motion.span
          className="absolute inset-[-7px] rounded-full border border-accent/18"
          animate={active ? { scale: [0.96, 1.12, 0.98] } : { scale: 1 }}
          transition={{ duration: 2.2, repeat: active ? Infinity : 0, ease: "easeInOut" }}
        />
      )}
      <span className="absolute inset-[-16px] rounded-full bg-accent/12 blur-xl" />
      <span className="absolute h-2 w-2 rounded-full bg-accent" />
      <span className="absolute h-1 w-1 translate-x-[5px] translate-y-[-5px] rounded-full bg-white/70" />
    </span>
  );
}
