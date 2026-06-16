/**
 * Small decorative neon ring — pure CSS, no canvas. Two thin concentric rings
 * with a soft red glow and a slow idle rotation (stilled under reduced-motion
 * via globals.css). Sits beside the contact channels as a quiet futuristic
 * accent; aria-hidden and pointer-events-none so it never affects interaction
 * or scroll.
 *
 * Server Component — the motion is CSS-only.
 */
export function NeonRing({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative grid place-items-center ${className ?? ""}`}
    >
      {/* Ambient glow */}
      <div className="absolute h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(229,72,77,0.22),transparent_70%)] blur-2xl" />
      {/* Outer ring */}
      <div className="motion-safe:animate-[hero-spin_16s_linear_infinite] absolute h-28 w-28 rounded-full border border-accent/40 shadow-[0_0_18px_rgba(229,72,77,0.25)]" />
      {/* Inner ring (counter-rotates) */}
      <div className="motion-safe:animate-[hero-spin_11s_linear_infinite_reverse] absolute h-16 w-16 rounded-full border border-accent/30" />
      {/* Core dot */}
      <div className="h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_2px_rgba(229,72,77,0.6)]" />
    </div>
  );
}
