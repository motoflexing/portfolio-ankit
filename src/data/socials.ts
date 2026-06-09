/**
 * Social / external profile links — single source of truth.
 *
 * Follower counts are intentionally omitted. Per the content-accuracy rules,
 * we never display unverified counts. If a count is later verified, set it on
 * the matching entry (`followers`) and the UI may surface it; otherwise the UI
 * shows the platform without a number.
 */

export type SocialPlatform =
  | "github"
  | "linkedin"
  | "youtube"
  | "instagram";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  /** Display handle (no fabricated metrics). */
  handle: string;
  url: string;
  /** Only set when independently verified. Leave undefined otherwise. */
  followers?: number;
}

export const socials: Record<SocialPlatform, SocialLink> = {
  github: {
    platform: "github",
    label: "GitHub",
    handle: "@motoflexing",
    url: "https://github.com/motoflexing",
  },
  linkedin: {
    platform: "linkedin",
    label: "LinkedIn",
    handle: "ankit2003dubey",
    url: "https://www.linkedin.com/in/ankit2003dubey/",
  },
  youtube: {
    platform: "youtube",
    label: "YouTube",
    handle: "@moto.flexing",
    url: "https://www.youtube.com/@moto.flexing",
  },
  instagram: {
    platform: "instagram",
    label: "Instagram",
    handle: "@moto.flexing",
    url: "https://www.instagram.com/moto.flexing/",
  },
};

/** Ordered list for rendering rows/grids. */
export const socialList: SocialLink[] = [
  socials.github,
  socials.linkedin,
  socials.youtube,
  socials.instagram,
];
