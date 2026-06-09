"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import {
  constellationNodes,
  constellationEdges,
  type ConstellationNode,
} from "./constellation-data";

// Design-token colours mirrored for the WebGL context.
const ACCENT = "#e5484d";
const NODE = "#8a8a8f";
const NODE_LIVE = "#f5f5f3";
const LINE = "#3a3a40";

/**
 * A single project node: a low-poly sphere that floats gently and glows
 * accent-red when hovered/active. Geometry is intentionally tiny (16x16) to
 * keep the scene cheap.
 */
function Node({
  node,
  index,
  active,
  onHover,
}: {
  node: ConstellationNode;
  index: number;
  active: boolean;
  onHover: (i: number | null) => void;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  // Deterministic float phase from the node index — stable across renders,
  // pure (no Math.random during render), and gives each node its own rhythm.
  const phase = index * 1.7;

  useFrame((state) => {
    const mesh = ref.current;
    const mat = matRef.current;
    if (!mesh || !mat) return;
    const t = state.clock.elapsedTime;
    // gentle per-node float
    mesh.position.y = node.position[1] + Math.sin(t * 0.6 + phase) * 0.08;
    // ease emissive toward target on hover
    const targetEmissive = active ? 1.4 : node.live ? 0.35 : 0.12;
    mat.emissiveIntensity += (targetEmissive - mat.emissiveIntensity) * 0.12;
    const targetScale = active ? 1.5 : 1;
    const s = mesh.scale.x + (targetScale - mesh.scale.x) * 0.15;
    mesh.scale.setScalar(s);
  });

  return (
    <mesh
      ref={ref}
      position={node.position}
      scale={node.scale}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        onHover(index);
      }}
      onPointerOut={() => onHover(null)}
    >
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial
        ref={matRef}
        color={active ? ACCENT : node.live ? NODE_LIVE : NODE}
        emissive={active ? ACCENT : node.live ? NODE_LIVE : NODE}
        emissiveIntensity={node.live ? 0.35 : 0.12}
        roughness={0.4}
        metalness={0.1}
      />
    </mesh>
  );
}

/** Hairline edges connecting the nodes; the two edges touching the active
 *  node brighten toward accent. */
function Edges({ activeIndex }: { activeIndex: number | null }) {
  return (
    <>
      {constellationEdges.map(([a, b], i) => {
        const isActive =
          activeIndex !== null && (a === activeIndex || b === activeIndex);
        return (
          <Line
            key={i}
            points={[
              constellationNodes[a].position,
              constellationNodes[b].position,
            ]}
            color={isActive ? ACCENT : LINE}
            lineWidth={isActive ? 1.1 : 0.6}
            transparent
            opacity={isActive ? 0.8 : 0.4}
          />
        );
      })}
    </>
  );
}

/**
 * The rotating constellation group with cursor parallax. The whole group
 * drifts continuously and tilts toward the pointer for a subtle parallax.
 */
function Constellation({ paused }: { paused: boolean }) {
  const group = useRef<THREE.Group>(null);
  const [active, setActive] = useState<number | null>(null);

  useFrame((state) => {
    const g = group.current;
    if (!g || paused) return;
    const t = state.clock.elapsedTime;
    // slow continuous drift (rotation), plus a small pointer-driven tilt
    g.rotation.y = t * 0.08 + state.pointer.x * 0.25;
    g.rotation.x = Math.sin(t * 0.2) * 0.08 - state.pointer.y * 0.18;
    // cursor parallax — ease the whole group toward the pointer
    g.position.x += (state.pointer.x * 0.3 - g.position.x) * 0.05;
    g.position.y += (state.pointer.y * 0.3 - g.position.y) * 0.05;
  });

  return (
    <group ref={group}>
      <Edges activeIndex={active} />
      {constellationNodes.map((node, i) => (
        <Node
          key={node.slug}
          node={node}
          index={i}
          active={active === i}
          onHover={setActive}
        />
      ))}
    </group>
  );
}

/**
 * Canvas wrapper for the ProductConstellation. Capped dpr, low-cost lighting,
 * and a `paused` prop so callers can stop the loop when offscreen or under
 * reduced-motion (frameloop switches to "demand").
 */
export default function ConstellationScene({
  paused = false,
}: {
  paused?: boolean;
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={paused ? "demand" : "always"}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 4]} intensity={18} color="#ffffff" />
      <pointLight position={[-4, -2, -2]} intensity={10} color={ACCENT} />
      <Constellation paused={paused} />
    </Canvas>
  );
}
