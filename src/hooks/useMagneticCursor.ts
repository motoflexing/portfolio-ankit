"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";
import { usePointerFine } from "./useMediaQuery";

interface MagneticOptions {
  /** How far the element drifts toward the pointer (0–1). */
  strength?: number;
  /** Pointer distance (px) within which the pull activates. */
  radius?: number;
}

/**
 * Magnetic hover effect for CTAs: the element eases toward the pointer
 * while it hovers, then springs back on leave. Disabled on touch devices
 * and under reduced-motion, where it returns an inert ref.
 *
 * Attach the returned ref to the element you want to magnetize.
 */
export function useMagneticCursor<T extends HTMLElement = HTMLElement>(
  options: MagneticOptions = {},
) {
  const { strength = 0.35, radius = 120 } = options;
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();
  const pointerFine = usePointerFine();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || !pointerFine) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const animate = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
        raf = requestAnimationFrame(animate);
      } else {
        raf = 0;
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < radius) {
        targetX = dx * strength;
        targetY = dy * strength;
      } else {
        targetX = 0;
        targetY = 0;
      }
      if (raf === 0) raf = requestAnimationFrame(animate);
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      if (raf === 0) raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
      el.style.transform = "";
    };
  }, [reduced, pointerFine, strength, radius]);

  return ref;
}
