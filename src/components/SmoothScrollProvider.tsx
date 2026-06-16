"use client";

import { useEffect } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { initLenis, destroyLenis } from "@/lib/lenis";

/**
 * Mounts Lenis smooth-scroll for the whole app and reconciles it with GSAP
 * ScrollTrigger (see lib/lenis.ts). Renders nothing — it's a behavioural
 * provider wrapped around the app in the root layout.
 *
 * Reduced-motion: Lenis is never initialized. The browser's native (instant)
 * scrolling is used, which is exactly what reduced-motion users want, and no
 * smooth-scroll rAF loop runs at all.
 */
export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const lenis = initLenis();
    return () => destroyLenis(lenis);
  }, [reduced]);

  return <>{children}</>;
}
