import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project so Next doesn't pick up a stray
  // lockfile in a parent directory (avoids the inferred-root warning).
  turbopack: {
    root: path.resolve(__dirname),
  },

  images: {
    formats: ["image/avif", "image/webp"],
    // Live MotoFlexing apps may serve OG/screenshot assets remotely.
    remotePatterns: [
      { protocol: "https", hostname: "**.motoflexing.com" },
      { protocol: "https", hostname: "motoflexing.com" },
    ],
  },
};

export default nextConfig;
