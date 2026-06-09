/**
 * Single source of truth for top-level site identity & metadata.
 * Never hard-code these strings in components — import from here.
 */
export const site = {
  name: "Ankit Dubey",
  role: "Software Developer & Product Builder",
  identityLine: "Developer · Product Builder · Creative Technologist",
  ecosystem: "MotoFlexing",
  ecosystemUrl: "https://motoflexing.com",
  base: "India",
  status:
    "Open to junior software roles, internships, collaborations, and product opportunities.",
  domain: "https://ankit.motoflexing.com",
  email: "ankitkrdubey13@gmail.com",
  resumeUrl: "/ankit-dubey-resume.pdf",

  // SEO defaults (consumed by app/layout.tsx and lib/seo helpers)
  defaultTitle: "Ankit Dubey — Software Developer & Product Builder",
  titleTemplate: "%s — Ankit Dubey",
  defaultDescription:
    "Portfolio of Ankit Dubey, a software developer and product builder creating SaaS platforms, AI-powered tools, web applications, mobile experiences, and interactive products.",
  // OG images are generated via Next's file convention (app/opengraph-image.tsx
  // and the per-case-study variant) — no static OG file is needed.
} as const;

export type Site = typeof site;
