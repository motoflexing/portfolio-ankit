import type { JourneyStage } from "@/types/journey";

/**
 * Development journey — ordered stages, NOT dates.
 * The honest progression from creator to product builder, which informs
 * Ankit's product-first approach to engineering.
 */
export const journey: JourneyStage[] = [
  {
    index: "01",
    title: "Content creation & video editing",
    description:
      "Started by making and editing video — learning to hold attention, structure a story, and finish and ship work.",
    phase: "Creative",
  },
  {
    index: "02",
    title: "Digital storytelling & personal branding",
    description:
      "Grew into storytelling and branding, understanding audiences and how a consistent identity is built over time.",
    phase: "Creative",
  },
  {
    index: "03",
    title: "Programming fundamentals",
    description:
      "Moved into code, learning the fundamentals of how software actually works rather than chasing tools.",
    phase: "Foundations",
  },
  {
    index: "04",
    title: "Python & AI/ML exploration",
    description:
      "Explored Python and the basics of AI/ML to understand what these systems can and cannot reasonably do.",
    phase: "Foundations",
  },
  {
    index: "05",
    title: "Frontend web development",
    description:
      "Learned to build interfaces for the web — layout, responsiveness, and turning designs into working pages.",
    phase: "Foundations",
  },
  {
    index: "06",
    title: "React & TypeScript applications",
    description:
      "Adopted React and TypeScript to build real, type-safe applications with maintainable structure.",
    phase: "Building",
  },
  {
    index: "07",
    title: "Firebase-backed products",
    description:
      "Connected frontends to real backends with Firebase — authentication, Firestore data, and security rules.",
    phase: "Building",
  },
  {
    index: "08",
    title: "Business & SaaS software",
    description:
      "Built business-grade software like OfficeOS: multi-role, multi-tenant SaaS with real operational workflows.",
    phase: "Building",
  },
  {
    index: "09",
    title: "Flutter mobile development",
    description:
      "Extended into mobile with Flutter and Firebase, building role-based app interfaces during internship work.",
    phase: "Building",
  },
  {
    index: "10",
    title: "Unity & C# exploration",
    description:
      "Explored game development with Unity and C# to broaden how I think about interaction and systems.",
    phase: "Building",
  },
  {
    index: "11",
    title: "AI integration",
    description:
      "Began integrating AI into products thoughtfully — as an assistive layer, scoped honestly rather than oversold.",
    phase: "Building",
  },
  {
    index: "12",
    title: "Product deployment & real-world testing",
    description:
      "Shipped products to real environments and validated them through real deployment and testing — not just demos.",
    phase: "Ecosystem",
  },
  {
    index: "13",
    title: "Building the MotoFlexing ecosystem",
    description:
      "Brought it together as MotoFlexing: an ecosystem of products, built in public, with the goal of becoming a strong engineer and founder.",
    phase: "Ecosystem",
  },
];
