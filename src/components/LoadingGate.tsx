"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { loadingGate } from "@/data/home";

const SESSION_KEY = "ad_gate_played";

/**
 * Cinematic first-visit loading gate.
 *
 * Behaviour:
 *  - Fullscreen takeover, ONCE per session (sessionStorage flag) — refreshes
 *    and in-session navigations skip it.
 *  - A 0 → 100 counter (mono) counts up while the name reveals letter by letter
 *    and an "AD" monogram draws itself via SVG stroke-dashoffset.
 *  - At 100% a GSAP timeline fades the counter, scales the monogram
 *    (1 → 1.08 → 0) with an accent flash, and slides two horizontal panels
 *    apart to reveal the page beneath. ~2.8s total.
 *  - Reduced-motion: never renders — the page shows immediately.
 *
 * Sequencing is a single GSAP timeline (never CSS keyframes / setInterval), so
 * it shares the GSAP clock and never blocks the main thread with timers.
 *
 * The gate is `position: fixed` at the top z-index; while it's up the body is
 * scroll-locked so below-the-fold content can't be reached mid-intro.
 */
export function LoadingGate() {
  const reduced = useReducedMotion();

  // Decide synchronously on mount whether the gate should play, so we never
  // flash it on a session where it already ran.
  const [active, setActive] = useState<boolean | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const monogramRef = useRef<SVGSVGElement>(null);
  const monoPathRef = useRef<SVGPathElement>(null);
  const panelTopRef = useRef<HTMLDivElement>(null);
  const panelBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) {
      setActive(false);
      return;
    }
    const played =
      typeof window !== "undefined" &&
      window.sessionStorage.getItem(SESSION_KEY) === "1";
    setActive(!played);
  }, [reduced]);

  useEffect(() => {
    if (!active) return;

    const root = rootRef.current;
    const counter = counterRef.current;
    const name = nameRef.current;
    const monogram = monogramRef.current;
    const monoPath = monoPathRef.current;
    const panelTop = panelTopRef.current;
    const panelBottom = panelBottomRef.current;
    if (!root || !counter || !name || !monogram || !panelTop || !panelBottom) {
      return;
    }

    // Lock scrolling while the gate is up.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const letters = Array.from(name.querySelectorAll<HTMLElement>("[data-l]"));
    const count = { v: 0 };

    const ctx = gsap.context(() => {
      // Prep monogram stroke for the self-draw.
      if (monoPath) {
        const len = monoPath.getTotalLength();
        gsap.set(monoPath, { strokeDasharray: len, strokeDashoffset: len });
      }
      gsap.set(letters, { yPercent: 110, opacity: 0 });
      gsap.set(monogram, { scale: 1, opacity: 1 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          window.sessionStorage.setItem(SESSION_KEY, "1");
          document.body.style.overflow = prevOverflow;
          setActive(false);
        },
      });

      // Counter 0 -> 100 (drives the on-screen number every frame).
      tl.to(
        count,
        {
          v: 100,
          duration: 2.0,
          ease: "power1.inOut",
          onUpdate: () => {
            counter.textContent = String(Math.round(count.v)).padStart(3, "0");
          },
        },
        0,
      );

      // Name letters rise in, staggered.
      tl.to(
        letters,
        { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.04 },
        0.15,
      );

      // Monogram draws itself alongside.
      if (monoPath) {
        tl.to(monoPath, { strokeDashoffset: 0, duration: 1.4 }, 0.2);
      }

      // --- Exit at 100% (~2.8s total) ---
      tl.to(counter, { opacity: 0, duration: 0.3 }, 2.05);
      tl.to(letters, { yPercent: -110, opacity: 0, duration: 0.4, stagger: 0.02 }, 2.05);

      // Monogram pulse: accent flash + scale 1 -> 1.08 -> 0.
      // GSAP tweens computed colour values, not CSS var() strings, so resolve
      // the accent token at runtime (single source of truth stays globals.css).
      const accent =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--accent")
          .trim() || "#e5484d";
      if (monoPath) tl.to(monoPath, { stroke: accent, duration: 0.2 }, 2.1);
      tl.to(monogram, { scale: 1.08, duration: 0.25, ease: "power2.out" }, 2.2);
      tl.to(monogram, { scale: 0, opacity: 0, duration: 0.4, ease: "power2.in" }, 2.45);

      // Curtain: two horizontal halves slide apart, revealing the page.
      tl.to(panelTop, { yPercent: -100, duration: 0.6, ease: "power4.inOut" }, 2.4);
      tl.to(panelBottom, { yPercent: 100, duration: 0.6, ease: "power4.inOut" }, 2.4);
    }, root);

    return () => {
      ctx.revert();
      document.body.style.overflow = prevOverflow;
    };
  }, [active]);

  // Not yet decided, reduced-motion, or already played this session: render
  // nothing (page shows immediately).
  if (!active) return null;

  return (
    <div
      ref={rootRef}
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className="fixed inset-0 z-200 flex items-center justify-center overflow-hidden"
    >
      {/* Two curtain panels — they slide apart on exit. */}
      <div
        ref={panelTopRef}
        className="absolute inset-x-0 top-0 h-1/2 bg-bg"
        aria-hidden="true"
      />
      <div
        ref={panelBottomRef}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-bg"
        aria-hidden="true"
      />

      {/* Counter — top-left, mono, faint */}
      <span
        ref={counterRef}
        className="font-mono text-text-faint absolute left-6 top-6 text-sm tabular-nums tracking-widest md:left-10 md:top-10"
        aria-hidden="true"
      >
        000
      </span>

      {/* Centre stack: monogram draw + name reveal */}
      <div className="relative z-1 flex flex-col items-center gap-8">
        <svg
          ref={monogramRef}
          width="80"
          height="80"
          viewBox="0 0 64 64"
          fill="none"
          aria-hidden="true"
          className="will-change-transform"
        >
          <rect
            x="6.5"
            y="6.5"
            width="51"
            height="51"
            rx="10"
            fill="none"
            stroke="var(--line-strong)"
            strokeWidth="1.5"
          />
          {/* Single continuous path drawing the "AD" monogram. */}
          <path
            ref={monoPathRef}
            d="M18 44 L24 20 L30 44 M20 37 L28 37 M37 20 L37 44 L43 44 C48 44 50 39 50 32 C50 25 48 20 43 20 L37 20"
            stroke="var(--text)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div ref={nameRef} className="flex overflow-hidden" aria-hidden="true">
          {loadingGate.name.split("").map((ch, i) => (
            <span
              key={`${ch}-${i}`}
              data-l
              className="font-display text-text inline-block text-lg font-medium tracking-[0.25em]"
              style={{ whiteSpace: "pre" }}
            >
              {ch}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
