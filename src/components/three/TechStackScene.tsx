"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODE = "#a1a1aa"; // --metal
const ACCENT = "#e5484d";

/**
 * A floating cluster of small wireframe polyhedra — one per technology in a
 * project's stack. Hand-placed on a Fibonacci sphere so the cluster reads as
 * intentional and stays stable between renders. The actual tech NAMES are
 * rendered as an accessible HTML caption row by the caller (no in-canvas text,
 * so there's no troika font fetch and screen readers get the real list).
 */
function Cluster({ count, paused }: { count: number; paused: boolean }) {
  const group = useRef<THREE.Group>(null);

  const positions = useMemo(() => {
    const pts: [number, number, number][] = [];
    const n = Math.max(count, 1);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / Math.max(n - 1, 1)) * 2; // 1..-1
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      pts.push([Math.cos(theta) * r * 1.6, y * 1.6, Math.sin(theta) * r * 1.6]);
    }
    return pts;
  }, [count]);

  useFrame((state) => {
    if (paused || !group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * 0.18 + state.pointer.x * 0.3;
    group.current.rotation.x = Math.sin(t * 0.25) * 0.1 - state.pointer.y * 0.2;
  });

  return (
    <group ref={group}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos} scale={0.22}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={i % 4 === 0 ? ACCENT : NODE}
            emissive={i % 4 === 0 ? ACCENT : NODE}
            emissiveIntensity={i % 4 === 0 ? 0.4 : 0.15}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
}

export default function TechStackScene({
  count = 6,
  paused = false,
}: {
  count?: number;
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
      <ambientLight intensity={0.7} />
      <pointLight position={[3, 3, 4]} intensity={12} color="#ffffff" />
      <Cluster count={count} paused={paused} />
    </Canvas>
  );
}
