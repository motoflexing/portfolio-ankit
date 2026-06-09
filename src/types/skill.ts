/**
 * Skills model — no percentage bars, no fake levels.
 * Each skill carries an honesty tag describing the depth of real use.
 */

/**
 * - Shipped:    used in a shipped/deployed project
 * - Prototype:  built working prototypes, not yet shipped to production
 * - Explored:   hands-on experiments / learning projects
 * - Learning:   currently learning / early exposure
 */
export type SkillLevel = "Shipped" | "Prototype" | "Explored" | "Learning";

export type SkillGroupName =
  | "Languages"
  | "Frontend"
  | "Backend & App Logic"
  | "Database & Cloud"
  | "AI & ML"
  | "Mobile"
  | "Game Dev"
  | "Motion, Interaction & 3D"
  | "Tools & Platforms";

export interface Skill {
  name: string;
  level: SkillLevel;
  /** Optional one-line note for context (kept honest, no buzzwords). */
  note?: string;
}

export interface SkillGroup {
  name: SkillGroupName;
  /** Mono index shown in the editorial margin, e.g. "01". */
  index: string;
  skills: Skill[];
}
