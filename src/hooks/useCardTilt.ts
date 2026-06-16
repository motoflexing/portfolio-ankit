"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";
import { usePointerFine } from "./useMediaQuery";

interface TiltOptions {
  /** Max rotation around X (deg). */
  maxRotateX?: number;
  /** Max rotation around Y (deg). */
  maxRotateY?: number;
  /** Z translation (px) applied while hovered. */
  lift?: number;
}

/**
 * 3D hover tilt for a card. Tracks the pointer over the element and applies a
 * `rotateX`/`rotateY` (and a small `translateZ` lift) toward the cursor, eased
 * per frame via rAF. The parent must set `perspective`; this element should be
 * `transform-style: preserve-3d`.
 *
 * Disabled (inert ref) on touch devices and under reduced-motion — the card
 * simply stays flat. No layout thrash: only `transform` is written.
 */
export function useCardTilt<T extends HTMLElement = HTMLElement>(
  options: TiltOptions = {},
) {
  const { maxRotateX = 8, maxRotateY = 12, lift = 20 } = options;
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();
  const pointerFine = usePointerFine();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || !pointerFine) return;

    let raf = 0;
    let tRx = 0;
    let tRy = 0;
    let tZ = 0;
    let rx = 0;
    let ry = 0;
    let z = 0;

    const animate = () => {
      rx += (tRx - rx) * 0.15;
      ry += (tRy - ry) * 0.15;
      z += (tZ - z) * 0.15;
      el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(${z}px)`;
      if (
        Math.abs(tRx - rx) > 0.05 ||
        Math.abs(tRy - ry) > 0.05 ||
        Math.abs(tZ - z) > 0.1
      ) {
        raf = requestAnimationFrame(animate);
      } else {
        raf = 0;
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      tRy = px * maxRotateY * 2;
      tRx = -py * maxRotateX * 2;
      tZ = lift;
      if (raf === 0) raf = requestAnimationFrame(animate);
    };

    const onLeave = () => {
      tRx = 0;
      tRy = 0;
      tZ = 0;
      if (raf === 0) raf = requestAnimationFrame(animate);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
      el.style.transform = "";
    };
  }, [reduced, pointerFine, maxRotateX, maxRotateY, lift]);

  return ref;
}
