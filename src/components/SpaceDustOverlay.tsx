const STARS = [
  { left: "8%", top: "10%", size: 2, opacity: 0.34, delay: "0s" },
  { left: "16%", top: "22%", size: 1, opacity: 0.22, delay: "1.2s" },
  { left: "26%", top: "14%", size: 2, opacity: 0.28, delay: "0.8s" },
  { left: "34%", top: "28%", size: 1, opacity: 0.18, delay: "1.8s" },
  { left: "48%", top: "12%", size: 2, opacity: 0.32, delay: "0.6s" },
  { left: "58%", top: "24%", size: 1, opacity: 0.22, delay: "2s" },
  { left: "68%", top: "16%", size: 2, opacity: 0.26, delay: "1s" },
  { left: "78%", top: "10%", size: 1, opacity: 0.2, delay: "1.4s" },
  { left: "88%", top: "18%", size: 2, opacity: 0.3, delay: "0.4s" },
  { left: "10%", top: "40%", size: 1, opacity: 0.16, delay: "2.2s" },
  { left: "20%", top: "52%", size: 2, opacity: 0.24, delay: "0.9s" },
  { left: "30%", top: "44%", size: 1, opacity: 0.2, delay: "1.6s" },
  { left: "42%", top: "58%", size: 2, opacity: 0.22, delay: "0.3s" },
  { left: "55%", top: "46%", size: 1, opacity: 0.16, delay: "1.9s" },
  { left: "64%", top: "60%", size: 2, opacity: 0.24, delay: "0.7s" },
  { left: "76%", top: "48%", size: 1, opacity: 0.18, delay: "1.1s" },
  { left: "84%", top: "56%", size: 2, opacity: 0.26, delay: "1.5s" },
  { left: "92%", top: "42%", size: 1, opacity: 0.14, delay: "2.4s" },
  { left: "6%", top: "76%", size: 2, opacity: 0.24, delay: "1.3s" },
  { left: "18%", top: "86%", size: 1, opacity: 0.18, delay: "0.5s" },
  { left: "32%", top: "74%", size: 2, opacity: 0.28, delay: "2.1s" },
  { left: "46%", top: "88%", size: 1, opacity: 0.16, delay: "0.2s" },
  { left: "57%", top: "80%", size: 2, opacity: 0.22, delay: "1.7s" },
  { left: "68%", top: "90%", size: 1, opacity: 0.16, delay: "0.9s" },
  { left: "74%", top: "74%", size: 2, opacity: 0.24, delay: "1.2s" },
  { left: "82%", top: "84%", size: 1, opacity: 0.16, delay: "2.1s" },
  { left: "90%", top: "72%", size: 2, opacity: 0.22, delay: "0.6s" },
] as const;

export function SpaceDustOverlay() {
  return (
    <div aria-hidden="true" className="space-dust-layer">
      <div className="space-dust-grid" />
      <div className="space-dust-glow" />
      {STARS.map((star, index) => (
        <span
          key={`${star.left}-${star.top}-${index}`}
          className="space-dust-star motion-safe:animate-[space-twinkle_4.8s_ease-in-out_infinite]"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: star.delay,
          }}
        />
      ))}
    </div>
  );
}
