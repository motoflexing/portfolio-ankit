/**
 * Experience & Education models.
 * Internship work and personal products are deliberately separate concerns —
 * `Ownership` on Project keeps that boundary; Experience describes employment.
 */

export interface Experience {
  /** Role title — kept honest, no inflated seniority. */
  title: string;
  organization: string;
  /** Display timeframe, e.g. "2024 — Present". No fabricated tenure. */
  period: string;
  location?: string;
  /** Short summary of the role. */
  summary: string;
  /** Concrete responsibilities actually performed. */
  responsibilities: string[];
  /** Tech actually used in the role. */
  technologies: string[];
}

export interface Education {
  degree: string;
  field: string;
  institution: string;
  period: string;
  location?: string;
  note?: string;
}
