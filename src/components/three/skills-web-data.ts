import { skillGroups } from "@/data/skills";
import type { SkillLevel } from "@/types/skill";

/**
 * Skill-web node layout. One node per skill GROUP (from data/skills.ts — the
 * real source of truth), hand-placed in a stable 2.5D ring so the web reads as
 * intentional, not random. Node colour is driven by the group's strongest
 * honesty level (Shipped > Prototype > Explored > Learning) — so the web stays
 * honest: a group of mostly-explored skills never lights up like a shipped one.
 */
export interface SkillWebNode {
  name: string;
  index: string;
  position: [number, number, number];
  /** Strongest honesty level present in the group. */
  level: SkillLevel;
  /** Count of skills in the group (drives node size). */
  count: number;
}

const LEVEL_RANK: Record<SkillLevel, number> = {
  Shipped: 3,
  Prototype: 2,
  Explored: 1,
  Learning: 0,
};

function strongestLevel(levels: SkillLevel[]): SkillLevel {
  return levels.reduce((best, l) =>
    LEVEL_RANK[l] > LEVEL_RANK[best] ? l : best,
  );
}

// Stable ring positions (up to 9 groups). Loose 2.5D cloud around centre.
const POSITIONS: [number, number, number][] = [
  [0, 1.5, 0],
  [1.5, 0.8, 0.3],
  [1.7, -0.7, -0.3],
  [0.7, -1.6, 0.2],
  [-0.7, -1.6, -0.2],
  [-1.7, -0.7, 0.3],
  [-1.5, 0.8, -0.3],
  [-0.6, 0.4, 0.5],
  [0.6, 0.1, -0.5],
];

export const skillWebNodes: SkillWebNode[] = skillGroups
  .slice(0, POSITIONS.length)
  .map((g, i) => ({
    name: g.name,
    index: g.index,
    position: POSITIONS[i],
    level: strongestLevel(g.skills.map((s) => s.level)),
    count: g.skills.length,
  }));

/**
 * Edges connect each group to a central hub plus a few near-neighbours, so
 * hovering a node can brighten the lines it touches.
 */
export const skillWebEdges: [number, number][] = (() => {
  const n = skillWebNodes.length;
  const edges: [number, number][] = [];
  // ring neighbours
  for (let i = 0; i < n; i++) {
    edges.push([i, (i + 1) % n]);
  }
  // a couple of cross links for visual interest (bounded by node count)
  if (n > 4) edges.push([0, Math.min(4, n - 1)]);
  if (n > 6) edges.push([2, Math.min(6, n - 1)]);
  return edges;
})();
