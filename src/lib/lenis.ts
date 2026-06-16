import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Smooth-scroll setup. Lenis owns the scroll position now (the old
 * `html { scroll-behavior: smooth }` is removed from globals.css), and it is
 * reconciled with GSAP ScrollTrigger so scrubbed timelines stay in sync:
 *
 *  - `lenis.on("scroll", ScrollTrigger.update)` keeps ScrollTrigger's cached
 *    scroll value correct on every Lenis frame.
 *  - Driving `lenis.raf` from the GSAP ticker (instead of a separate rAF loop)
 *    means one animation clock, no competing loops, no jank.
 *  - `lagSmoothing(0)` stops GSAP from "catching up" after a stall, which would
 *    otherwise fight Lenis's own easing.
 *
 * Reduced-motion is handled by the CALLER (LenisProvider): when the user
 * prefers reduced motion we never call this, so native (instant) scrolling is
 * used and nothing here runs.
 */
export function initLenis(): Lenis {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });

  lenis.on("scroll", ScrollTrigger.update);

  const raf = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  // Expose the cleanup of the ticker callback via the instance so the provider
  // can fully tear down on unmount (StrictMode double-invoke safety).
  (lenis as Lenis & { _rafCallback?: (t: number) => void })._rafCallback = raf;

  return lenis;
}

/** Tear down a Lenis instance and detach its GSAP ticker callback. */
export function destroyLenis(lenis: Lenis): void {
  const raf = (lenis as Lenis & { _rafCallback?: (t: number) => void })
    ._rafCallback;
  if (raf) gsap.ticker.remove(raf);
  lenis.destroy();
}
