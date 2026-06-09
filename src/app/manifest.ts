import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/**
 * Web app manifest. Dark, on-brand. Icons reference the generated SVG/PNG
 * icons in /public/icons (see /icon route for the maskable app icon).
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.defaultTitle,
    short_name: site.name,
    description: site.defaultDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0b",
    theme_color: "#0a0a0b",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
