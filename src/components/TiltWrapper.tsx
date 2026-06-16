"use client";

import { useCardTilt } from "@/hooks/useCardTilt";
import { cn } from "@/lib/utils";

/**
 * Client wrapper that applies a 3D hover tilt + accent glow to its children.
 * Kept separate so server-rendered cards stay server components by default and
 * only opt into client tilt where it's wanted (the home rail).
 *
 * The parent provides perspective; this element is the preserve-3d surface.
 * Reduced-motion / touch: the hook is inert, so the card just stays flat.
 */
export function TiltWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useCardTilt<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn(
        "group/tilt relative h-full transition-shadow duration-300 [transform-style:preserve-3d] hover:shadow-[0_0_40px_rgba(229,72,77,0.15)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
