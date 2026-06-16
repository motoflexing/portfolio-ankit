/**
 * Home-page editorial content. Kept here so components never hard-code copy.
 * Language is confident but honest — capability shown through what is built,
 * never through buzzwords or invented credentials.
 */

export interface BuildCard {
  index: string;
  title: string;
  description: string;
}

/** "What I Build" — six categories, one tight line each. */
export const buildCards: BuildCard[] = [
  {
    index: "01",
    title: "SaaS Platforms",
    description: "Multi-tenant products with roles, auth, and real workflows.",
  },
  {
    index: "02",
    title: "Business Software",
    description: "Internal tools that replace scattered spreadsheets.",
  },
  {
    index: "03",
    title: "AI-Powered Products",
    description: "AI as an honest assistive layer — scoped to what works.",
  },
  {
    index: "04",
    title: "Interactive Websites",
    description: "Motion-led web with the performance to back it up.",
  },
  {
    index: "05",
    title: "Mobile Applications",
    description: "Flutter and Firebase apps with role-based interfaces.",
  },
  {
    index: "06",
    title: "Games & Experiments",
    description: "Browser games with accounts, scoring, and leaderboards.",
  },
];

/** "Current Focus" — what Ankit is actively working on now. */
export interface FocusItem {
  label: string;
  detail: string;
}

export const currentFocus: FocusItem[] = [
  {
    label: "Engineering fundamentals",
    detail: "Fundamentals over framework lock-in.",
  },
  {
    label: "Maturing the products",
    detail: "OfficeOS, Games, and AI Resume — toward polished.",
  },
  {
    label: "Honest AI integration",
    detail: "Shipping AI only once it actually works.",
  },
  {
    label: "Building in public",
    detail: "Documenting the real process, not a highlight reel.",
  },
];

/** "Building in Public" — what Ankit shares and why. */
export const buildingInPublic = {
  lead: "Building in public.",
  body: "Sharing the real process — progress, launches, and the parts that don't work yet.",
  topics: [
    "Product development",
    "Coding progress",
    "SaaS experiments",
    "AI tools",
    "Challenges & launches",
    "Discipline & growth",
  ],
} as const;

/** Hero copy. */
export const hero = {
  eyebrow: "Software Developer",
  // Heading rendered with accent emphasis on the marked words in the component.
  headingLead: "Building",
  headingAccent: "working",
  headingTail: "products.",
  // One clean supporting line, under ten words.
  supporting: "Code, design, and ship — end to end.",
  secondary: "",
  statement:
    "Not collecting technologies — learning to use them to build useful products.",

  // The mono eyebrow above the display heading. Kept in data, never hardcoded.
  eyebrowAlt: "Software Developer",
  // Display heading, split into short words rendered one per line with a
  // staggered clip-path reveal. Max two words / two lines.
  headingWords: ["Building", "Products."] as const,
  // Primary/secondary CTA labels (component supplies the hrefs from site data).
  ctaPrimary: "View Work",
  ctaSecondary: "Get in Touch",
  scrollHint: "Scroll",
} as const;

/**
 * Cinematic loading-gate copy (Phase 1). The gate plays once per session.
 * Name is split for the letter-by-letter reveal; everything else is data so
 * components never hard-code copy.
 */
export const loadingGate = {
  name: "ANKIT DUBEY",
  monogram: "AD",
} as const;
