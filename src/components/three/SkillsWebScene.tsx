"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import {
  skillWebNodes,
  skillWebEdges,
  type SkillWebNode,
} from "./skills-web-data";
import type { SkillLevel } from "@/types/skill";

// Honesty-tag colours mirror the design tokens used by SkillLevelTag.
const ACCENT = "#e5484d"; // hover
const LEVEL_COLOR: Record<SkillLevel, string> = {
  Shipped: "#e5484d", // --accent (shipped = strongest presence)
  Prototype: "#a1a1aa", // --metal
  Explored: "#76767e", // --text-faint
  Learning: "#76767e",
};
const LINE = "#3a3a40";

function Node({
  node,
  index,
  active,
  onHover,
}: {
  node: SkillWebNode;
  index: number;
  active: boolean;
  onHover: (i: number | null) => void;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const phase = index * 1.3;
  const color = LEVEL_COLOR[node.level];
  // Node size scales gently with how many skills the group holds.
  const baseScale = useMemo(() => 0.13 + Math.min(node.count, 7) * 0.012, [node.count]);

  useFrame((state) => {
    const mesh = ref.current;
    const mat = matRef.current;
    if (!mesh || !mat) return;
    const t = state.clock.elapsedTime;
    mesh.position.y = node.position[1] + Math.sin(t * 0.5 + phase) * 0.05;
    // hover scales 1 -> 1.4
    const target = active ? 1.4 : 1;
    const s = mesh.scale.x / baseScale;
    const next = s + (target - s) * 0.18;
    mesh.scale.setScalar(next * baseScale);
    const targetEmissive = active ? 1.2 : 0.25;
    mat.emissiveIntensity += (targetEmissive - mat.emissiveIntensity) * 0.15;
  });

  return (
    <mesh
      ref={ref}
      position={node.position}
      scale={baseScale}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        onHover(index);
      }}
      onPointerOut={() => onHover(null)}
    >
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        ref={matRef}
        color={active ? ACCENT : color}
        emissive={active ? ACCENT : color}
        emissiveIntensity={0.25}
        roughness={0.45}
        metalness={0.15}
        flatShading
      />
    </mesh>
  );
}

function Edges({ activeIndex }: { activeIndex: number | null }) {
  return (
    <>
      {skillWebEdges.map(([a, b], i) => {
        const isActive =
          activeIndex !== null && (a === activeIndex || b === activeIndex);
        return (
          <Line
            key={i}
            points={[skillWebNodes[a].position, skillWebNodes[b].position]}
            color={isActive ? ACCENT : LINE}
            lineWidth={isActive ? 1.2 : 0.5}
            transparent
            opacity={isActive ? 0.85 : 0.35}
          />
        );
      })}
    </>
  );
}

function Web({ paused }: { paused: boolean }) {
  const group = useRef<THREE.Group>(null);
  const [active, setActive] = useState<number | null>(null);

  useFrame((state) => {
    const g = group.current;
    if (!g || paused) return;
    const t = state.clock.elapsedTime;
    g.rotation.y = t * 0.12 + state.pointer.x * 0.3;
    g.rotation.x = state.pointer.y * -0.2;
  });

  return (
    <group ref={group}>
      <Edges activeIndex={active} />
      {skillWebNodes.map((node, i) => (
        <Node
          key={node.name}
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
 * Interactive skills web for the Capabilities section. Each node is a skill
 * group (data/skills.ts); colour encodes the group's strongest honesty level,
 * size its breadth. Hovering a node scales it and brightens its connected
 * edges. Reuses the constellation architecture (nodes + drei <Line>).
 */
export default function SkillsWebScene({ paused = false }: { paused?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={paused ? "demand" : "always"}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.7} />
      <pointLight position={[3, 3, 4]} intensity={14} color="#ffffff" />
      <pointLight position={[-3, -2, -2]} intensity={8} color={ACCENT} />
      <Web paused={paused} />
    </Canvas>
  );
}
