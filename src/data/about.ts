/**
 * About-page content. Confident but grounded — never "genius / visionary /
 * master / world-class / expert". Capability is shown through how Ankit works
 * and what he has built, not through adjectives.
 */

/** The opening narrative — the core "who I am" message. */
export const aboutIntro = {
  eyebrow: "Who I am",
  heading: "I'm a developer who thinks like a product builder.",
  paragraphs: [
    "I'm Ankit Dubey — a software developer focused on building useful products, not just writing code. I came to engineering through content creation and digital storytelling, and that background still shapes how I work: I think about the person using the thing, not only the system behind it.",
    "I care about the full journey of a product — understanding the problem, structuring it, building the core experience, testing it against real workflows, then shipping and learning. I'd rather own that whole arc than be handed a single ticket in isolation.",
    "I deliberately invest in fundamentals over getting locked into one framework. Tools change; the way you reason about problems, data, and users doesn't. Long term, I want to grow into a strong engineer and a founder building under the MotoFlexing ecosystem.",
  ],
} as const;

/** How I Approach Building — the five-step method. */
export interface ApproachStep {
  index: string;
  title: string;
  description: string;
}

export const approachSteps: ApproachStep[] = [
  {
    index: "01",
    title: "Understand the problem",
    description:
      "Start with the real problem and the people who have it — before any code, any framework, any feature list.",
  },
  {
    index: "02",
    title: "Structure the product",
    description:
      "Shape the problem into a product: roles, data, flows, and the boundaries that keep it coherent as it grows.",
  },
  {
    index: "03",
    title: "Build the core experience",
    description:
      "Build the essential path first and make it genuinely work, rather than scattering half-finished features.",
  },
  {
    index: "04",
    title: "Test real workflows",
    description:
      "Validate against how people actually use it — real workflows and real edge cases, not just a happy-path demo.",
  },
  {
    index: "05",
    title: "Ship and learn",
    description:
      "Deploy it, watch how it behaves, and improve. Shipping is where the real feedback starts, not where it ends.",
  },
];

/** Core Strengths — each with ONE supporting sentence (no empty badges). */
export interface Strength {
  title: string;
  support: string;
}

export const strengths: Strength[] = [
  {
    title: "Product thinking",
    support:
      "I scope features around the problem and the user, which is why my projects ship as coherent products rather than piles of code.",
  },
  {
    title: "Full-stack delivery",
    support:
      "I take work from interface to application logic to deployment — OfficeOS went from idea to a live multi-tenant SaaS this way.",
  },
  {
    title: "Honest engineering",
    support:
      "I label what's shipped, prototyped, or planned, because trustworthy software starts with telling the truth about its state.",
  },
  {
    title: "Learning velocity",
    support:
      "I move across web, mobile, AI, and game tooling quickly by leaning on fundamentals instead of memorising one stack.",
  },
  {
    title: "Design sensibility",
    support:
      "My content-creation background means I care how a product looks, feels, and communicates — not only whether it functions.",
  },
  {
    title: "Shipping discipline",
    support:
      "I finish and deploy things; several MotoFlexing products are live, not stuck forever as private experiments.",
  },
];

/** What Keeps Me Building — motivation. */
export const motivation = {
  heading: "What keeps me building",
  paragraphs: [
    "I build because I like turning a vague idea into something real that people can actually open and use. There's a specific satisfaction in watching a product go from a sketch to a live deployment that someone relies on.",
    "Building in public keeps me honest and keeps me moving — sharing the progress, the launches, and the parts that don't work yet. The goal isn't to look finished; it's to keep getting better and to build a body of work I can stand behind.",
  ],
} as const;
