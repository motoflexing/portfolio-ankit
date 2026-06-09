/**
 * Development journey — ordered *stages*, not fake dates.
 * Describes the honest progression from creator to product builder.
 */

export interface JourneyStage {
  /** Ordered index for the timeline, e.g. "01". */
  index: string;
  title: string;
  /** One-to-two sentence description of what this stage involved. */
  description: string;
  /** Short label for the broad phase, used as an eyebrow. */
  phase: "Creative" | "Foundations" | "Building" | "Ecosystem";
}
