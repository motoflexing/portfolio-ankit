"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Hairline card with motion-based hover depth.
 * Per the design system, depth comes from contrast + motion, not drop-shadow:
 * on hover the border brightens, the surface lifts slightly, and (optionally)
 * a faint accent wash appears. Reduced-motion users get the static card —
 * Framer Motion respects the global transition-zeroing, and `whileHover`
 * transforms are negligible.
 */
interface CardProps extends HTMLMotionProps<"div"> {
  /** Enable the interactive hover lift + border brighten. */
  interactive?: boolean;
  /** Add a faint accent wash on hover (use sparingly). */
  accentHover?: boolean;
  children: React.ReactNode;
}

export function Card({
  interactive = false,
  accentHover = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <motion.div
      className={cn(
        "card-hairline relative overflow-hidden transition-colors duration-300",
        interactive &&
          "hover:border-line-strong cursor-default focus-within:border-line-strong",
        accentHover && "hover:border-accent/40",
        className,
      )}
      whileHover={interactive ? { y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Convenience inner padding wrapper for card content. */
export function CardBody({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("p-6 md:p-7", className)} {...props} />;
}
