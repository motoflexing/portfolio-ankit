"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { usePointerFine } from "@/hooks/useMediaQuery";

/**
 * Custom desktop cursor — three layers:
 *  1. a small accent dot tracking the pointer 1:1,
 *  2. a mid ring easing behind it (lag ~0.18) that scales over interactives,
 *  3. a large faint accent ring lagging far behind (lag 0.06).
 *
 * Context states are driven by a `data-cursor` attribute on the hovered
 * element (closest ancestor wins):
 *  - "view" → the mid ring expands to 80px and shows a "VIEW" label,
 *  - "drag" → shows a drag-arrows glyph,
 *  - "link" → the ring fills accent at low opacity.
 *
 * Hidden entirely on touch devices and under reduced-motion (native cursor
 * restored, nothing rendered). Always pointer-events:none + aria-hidden, so it
 * never traps or hides focus — keyboard navigation is unaffected.
 */
export function CustomCursor() {
  const reduced = useReducedMotion();
  const pointerFine = usePointerFine();
  const enabled = pointerFine && !reduced;

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) {
      document.body.removeAttribute("data-custom-cursor");
      return;
    }
    document.body.setAttribute("data-custom-cursor", "true");

    const dot = dotRef.current;
    const ring = ringRef.current;
    const halo = haloRef.current;
    if (!dot || !ring || !halo) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let haloX = mouseX;
    let haloY = mouseY;
    let raf = 0;

    const render = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      haloX += (mouseX - haloX) * 0.06; // very slow follow
      haloY += (mouseY - haloY) * 0.06;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      halo.style.transform = `translate3d(${haloX}px, ${haloY}px, 0)`;
      raf = requestAnimationFrame(render);
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Resolve the active cursor context for whatever element is under the
    // pointer. Explicit data-cursor wins; otherwise any interactive element
    // gets the generic "active" ring scale.
    const interactiveSelector =
      'a, button, [role="button"], input, textarea, select, [data-cursor]';

    const applyContext = (target: HTMLElement | null) => {
      const el = target?.closest<HTMLElement>(interactiveSelector);
      const ctx = el?.getAttribute("data-cursor") ?? (el ? "interactive" : "");
      ring.setAttribute("data-cursor-state", ctx);
      ring.setAttribute("data-active", el ? "true" : "false");
    };

    const onOver = (e: MouseEvent) => applyContext(e.target as HTMLElement);
    const onOut = (e: MouseEvent) => {
      // Only clear when leaving an interactive element entirely.
      const related = (e.relatedTarget as HTMLElement | null)?.closest(
        interactiveSelector,
      );
      if (!related) {
        ring.setAttribute("data-cursor-state", "");
        ring.setAttribute("data-active", "false");
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
      document.body.removeAttribute("data-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Large slow-following accent halo */}
      <div ref={haloRef} className="cursor-halo" aria-hidden="true" />

      {/* Mid ring — carries context label/glyphs */}
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span className="cursor-label cursor-label--view">VIEW</span>
        <span className="cursor-label cursor-label--drag" aria-hidden="true">
          ↔
        </span>
      </div>

      {/* 1:1 dot */}
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
