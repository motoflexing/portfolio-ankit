import type * as THREE from "three";
import { projects } from "@/data/projects";
import type { ProjectStatus } from "@/types/project";

/**
 * Node layout for the ProductConstellation. Each project becomes a node at a
 * fixed position in a loose 3D cloud. Positions are hand-placed (not random)
 * so the constellation is stable between renders and reads as intentional.
 *
 * The accent (Live) status is surfaced so the scene can emphasise shipped
 * products — an honest visual cue, not decoration.
 */
export interface ConstellationNode {
  slug: string;
  title: string;
  /** [x, y, z] position. */
  position: [number, number, number];
  /** Relative node size. */
  scale: number;
  /** Whether this product is live (gets a touch more presence). */
  live: boolean;
  /** Real project status — drives node colour and pulse speed honestly. */
  status: ProjectStatus;
}

// Stable hand-placed positions for up to 6 nodes (loose orbit shell).
const POSITIONS: [number, number, number][] = [
  [0, 0, 0],
  [1.7, 0.8, -0.6],
  [-1.8, 0.5, 0.4],
  [1.2, -1.1, 0.8],
  [-1.3, -0.9, -0.7],
  [0.2, 1.5, 0.9],
];

export const constellationNodes: ConstellationNode[] = projects
  .slice(0, POSITIONS.length)
  .map((p, i) => ({
    slug: p.slug,
    title: p.title,
    position: POSITIONS[i],
    scale: p.featured ? 0.16 : 0.12,
    live: p.status === "Live",
    status: p.status,
  }));

/** Pairs of node indices to connect with hairlines (near neighbours). */
export const constellationEdges: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
  [1, 5],
  [2, 4],
  [3, 1],
];

/** Precomputed edge endpoints for line geometry. */
export function edgePoints(): THREE.Vector3Tuple[] {
  const pts: THREE.Vector3Tuple[] = [];
  for (const [a, b] of constellationEdges) {
    pts.push(constellationNodes[a].position);
    pts.push(constellationNodes[b].position);
  }
  return pts;
}
