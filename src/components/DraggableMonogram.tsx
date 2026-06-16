"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { usePointerFine } from "@/hooks/useMediaQuery";

/**
 * Footer easter egg: a throwable/draggable "AD" token, constrained to its
 * parent area, using the already-installed interact.js.
 *
 * It's a progressive enhancement layered over a normal monogram:
 *  - Under reduced-motion or on touch/coarse pointers the token is NOT made
 *    draggable (interact.js is only imported + initialised when enabled), so
 *    those users just see a static mark.
 *  - `data-cursor="drag"` wires it to the custom cursor's drag context state.
 *  - interact.js is dynamically imported, so its bundle only loads when the
 *    enhancement actually runs.
 */
export function DraggableMonogram() {
  const reduced = useReducedMotion();
  const pointerFine = usePointerFine();
  const enabled = !reduced && pointerFine;

  const boundsRef = useRef<HTMLDivElement>(null);
  const tokenRef = useRef<HTMLButtonElement>(null);
  const [hint, setHint] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const token = tokenRef.current;
    const bounds = boundsRef.current;
    if (!token || !bounds) return;

    let cleanup = () => {};
    let cancelled = false;

    // Dynamic import keeps interact.js out of the bundle unless used.
    import("interactjs").then((mod) => {
      if (cancelled) return;
      const interact = (mod.default ?? mod) as typeof import("interactjs").default;
      let x = 0;
      let y = 0;

      const interactable = interact(token).draggable({
        inertia: true,
        modifiers: [
          interact.modifiers.restrictRect({ restriction: "parent" }),
        ],
        listeners: {
          start() {
            setHint(false);
            token.style.cursor = "grabbing";
          },
          move(event: { dx: number; dy: number }) {
            x += event.dx;
            y += event.dy;
            token.style.transform = `translate(${x}px, ${y}px)`;
          },
          end() {
            token.style.cursor = "grab";
          },
        },
      });

      cleanup = () => interactable.unset();
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [enabled]);

  return (
    <div
      ref={boundsRef}
      className="relative h-12 w-full"
      aria-hidden="true"
    >
      <button
        ref={tokenRef}
        type="button"
        data-cursor={enabled ? "drag" : undefined}
        onMouseEnter={() => enabled && setHint(true)}
        tabIndex={-1}
        className={
          "grid h-9 w-9 touch-none select-none place-items-center rounded border border-line-strong font-display text-sm font-semibold tracking-tight text-text transition-colors hover:border-accent hover:text-accent" +
          (enabled ? " cursor-grab" : "")
        }
        style={{ willChange: "transform" }}
      >
        AD
      </button>
      {enabled && hint && (
        <span className="pointer-events-none absolute left-11 top-1.5 font-mono text-[0.65rem] uppercase tracking-widest text-text-faint">
          drag me
        </span>
      )}
    </div>
  );
}
