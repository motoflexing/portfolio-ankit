/**
 * About-page content. Confident but grounded — never "genius / visionary /
 * master / world-class / expert". Capability is shown through how Ankit works
 * and what he has built, not through adjectives.
 */

/** The opening narrative — the core "who I am" message. */
export const aboutIntro = {
  eyebrow: "Who I am",
  heading: "A developer who thinks like a product builder.",
  paragraphs: [
    "I build useful products, not just code. I care about the whole arc — problem, structure, build, ship, learn.",
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
    description: "Start with the real problem and the people who have it.",
  },
  {
    index: "02",
    title: "Structure the product",
    description: "Shape it into roles, data, and flows that stay coherent.",
  },
  {
    index: "03",
    title: "Build the core",
    description: "Make the essential path genuinely work first.",
  },
  {
    index: "04",
    title: "Test real workflows",
    description: "Validate against how people actually use it.",
  },
  {
    index: "05",
    title: "Ship and learn",
    description: "Deploy, watch, improve. Shipping starts the feedback.",
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
    support: "Features scoped around the problem and the user.",
  },
  {
    title: "Full-stack delivery",
    support: "From interface to logic to deployment.",
  },
  {
    title: "Honest engineering",
    support: "Shipped, prototyped, or planned — labelled truthfully.",
  },
  {
    title: "Learning velocity",
    support: "Fundamentals over memorising one stack.",
  },
  {
    title: "Design sensibility",
    support: "How a product feels, not only how it functions.",
  },
  {
    title: "Shipping discipline",
    support: "I finish and deploy — several products are live.",
  },
];

/** What Keeps Me Building — motivation. */
export const motivation = {
  heading: "What keeps me building",
  paragraphs: [
    "Turning a vague idea into something real that people actually use.",
  ],
} as const;
