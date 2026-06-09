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

/** "What I Build" — six categories with one tight paragraph each. */
export const buildCards: BuildCard[] = [
  {
    index: "01",
    title: "SaaS Platforms",
    description:
      "Multi-role, multi-tenant products with authentication, role-based access, and real operational workflows — built to be used by teams, not just demoed.",
  },
  {
    index: "02",
    title: "Business Software",
    description:
      "Internal tools and operations software that replace scattered spreadsheets and chats with one structured, access-aware source of truth.",
  },
  {
    index: "03",
    title: "AI-Powered Products",
    description:
      "Products where AI is an honest assistive layer — added carefully, scoped to what actually works, and never oversold as more than it is.",
  },
  {
    index: "04",
    title: "Interactive Websites",
    description:
      "Premium, motion-led web experiences with editorial design, considered interaction, and the performance and SEO fundamentals to back them up.",
  },
  {
    index: "05",
    title: "Mobile Applications",
    description:
      "Mobile-first apps with Flutter and Firebase, including role-based interfaces and the discipline of shipping inside a team on real deadlines.",
  },
  {
    index: "06",
    title: "Games & Experiments",
    description:
      "Browser games with accounts, scoring, and leaderboards — plus experimental projects that exist to learn, not to pretend to be finished.",
  },
];

/** "Current Focus" — what Ankit is actively working on now. */
export interface FocusItem {
  label: string;
  detail: string;
}

export const currentFocus: FocusItem[] = [
  {
    label: "Deepening engineering fundamentals",
    detail:
      "Prioritising strong fundamentals over single-framework lock-in, so the tools change but the thinking stays solid.",
  },
  {
    label: "Maturing the MotoFlexing products",
    detail:
      "Moving OfficeOS, Games, and the AI Resume platform forward — from working features toward reliable, polished products.",
  },
  {
    label: "Honest AI integration",
    detail:
      "Exploring where AI genuinely helps inside real products, and shipping it only once it actually works.",
  },
  {
    label: "Building in public",
    detail:
      "Documenting the process — progress, launches, and the parts that don't work yet — across the MotoFlexing channels.",
  },
];

/** "Building in Public" — what Ankit shares and why. */
export const buildingInPublic = {
  lead: "I build in public — documenting the real process, not a highlight reel.",
  body: "Across YouTube, LinkedIn, Instagram, and GitHub I share product development, coding progress, SaaS experiments, AI tooling, the challenges and the launches — alongside the discipline, growth, and behind-the-scenes work that rarely makes it into a portfolio. The point isn't to look finished; it's to show how things actually get built.",
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
  eyebrow: "Ankit Dubey · Software Developer",
  // Heading rendered with accent emphasis on the marked words in the component.
  headingLead: "I turn ambitious ideas into",
  headingAccent: "working",
  headingTail: "digital products.",
  supporting:
    "Software developer and product builder creating SaaS platforms, AI-powered tools, business applications, interactive websites, mobile experiences, and experimental products.",
  secondary:
    "I enjoy working across product thinking, interface design, application logic, deployment, and continuous improvement.",
  statement:
    "I am not focused on collecting technologies. I am focused on learning how to use them to build useful products.",
} as const;
