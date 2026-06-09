import type { Metadata } from "next";
import { site } from "@/data/site";

/**
 * SEO helpers. Canonical base is always ankit.motoflexing.com — we never
 * canonicalize to the ecosystem domain.
 */

/** Absolute URL for a path on this site. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, site.domain).toString();
}

/**
 * Build per-page metadata with a canonical URL and OG/Twitter cards.
 * `path` is the route (e.g. "/projects/officeos"); canonical is derived.
 *
 * OG/Twitter images are intentionally NOT set here: every route provides one
 * through Next's file convention (app/opengraph-image.tsx, and the per-slug
 * variant for case studies). Setting an explicit `ogImage` overrides that.
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  ogImage,
}: {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
}): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title,
      description,
      ...(ogImage
        ? { images: [{ url: ogImage, width: 1200, height: 630, alt: title }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}
