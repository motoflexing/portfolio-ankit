"use client";

/**
 * Pure-CSS hero fallback used when WebGL is unavailable (no GPU / sandboxed /
 * blocklisted driver) or while the 3D chunk loads. No canvas, no external
 * models or images — so it can NEVER crash the page or block scrolling.
 *
 * Visual: a red glowing cube at the centre, one orbit ring, and three small
 * dark-red balls revolving on the ring. Motion is CSS-only and is stilled
 * automatically under prefers-reduced-motion (globals.css zeroes animations).
 */
export function HeroCSSFallback() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 grid place-items-center"
    >
      <div className="relative h-64 w-64 sm:h-80 sm:w-80">
        {/* Ambient red glow */}
        <div className="absolute inset-0 grid place-items-center">
          <div className="h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(229,72,77,0.28),transparent_70%)] blur-2xl sm:h-52 sm:w-52" />
        </div>

        {/* Orbit ring (tilted) */}
        <div
          className="absolute inset-0 grid place-items-center"
          style={{ transform: "rotateX(68deg)" }}
        >
          <div className="motion-safe:animate-[hero-spin_14s_linear_infinite] relative h-56 w-56 rounded-full border border-accent/30 sm:h-64 sm:w-64">
            {/* Three dark-red orbit balls, evenly spaced on the ring */}
            <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent-deep shadow-[0_0_10px_2px_rgba(229,72,77,0.6)]" />
            <span className="absolute bottom-2 right-2 h-2.5 w-2.5 rounded-full bg-accent-deep shadow-[0_0_10px_2px_rgba(229,72,77,0.6)]" />
            <span className="absolute bottom-2 left-2 h-2.5 w-2.5 rounded-full bg-accent-deep shadow-[0_0_10px_2px_rgba(229,72,77,0.6)]" />
          </div>
        </div>

        {/* Glowing red cube (slow 3D tumble) */}
        <div
          className="absolute inset-0 grid place-items-center"
          style={{ perspective: "600px" }}
        >
          <div className="motion-safe:animate-[hero-tumble_18s_linear_infinite] h-20 w-20 rounded-md border border-accent/50 bg-[linear-gradient(135deg,rgba(163,22,33,0.55),rgba(28,4,8,0.7))] shadow-[0_0_30px_6px_rgba(229,72,77,0.35),inset_0_0_18px_rgba(229,72,77,0.25)] sm:h-24 sm:w-24" />
        </div>
      </div>
    </div>
  );
}
