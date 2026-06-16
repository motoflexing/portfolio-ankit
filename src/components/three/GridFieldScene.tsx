"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

const LINE = "#3a3a40";

/**
 * A field of horizontal hairlines that drift and gently wave — reads like a
 * grid slowly dissolving. Sits behind the Statement copy at very low opacity.
 * Pure line geometry, no lights, no postprocessing — extremely cheap.
 */
function Grid({ paused }: { paused: boolean }) {
  const group = useRef<THREE.Group>(null);

  // Build a set of horizontal lines spanning the view; each is a row of points
  // so we can wave it per-frame.
  const lines = useMemo(() => {
    const ROWS = 14;
    const COLS = 24;
    const width = 8;
    const rows: { y: number; base: THREE.Vector3[] }[] = [];
    for (let r = 0; r < ROWS; r++) {
      const y = (r / (ROWS - 1) - 0.5) * 5;
      const base: THREE.Vector3[] = [];
      for (let c = 0; c < COLS; c++) {
        const x = (c / (COLS - 1) - 0.5) * width;
        base.push(new THREE.Vector3(x, y, 0));
      }
      rows.push({ y, base });
    }
    return rows;
  }, []);

  const refs = useRef<(THREE.Object3D | null)[]>([]);

  useFrame((state) => {
    if (paused) return;
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.position.x = (Math.sin(t * 0.05) * 0.5) % 8;
    }
    // wave each line subtly
    lines.forEach((row, i) => {
      const obj = refs.current[i] as unknown as
        | { geometry?: { setPositions?: (a: number[]) => void } }
        | null;
      if (!obj?.geometry?.setPositions) return;
      const pts: number[] = [];
      for (const p of row.base) {
        const z = Math.sin(t * 0.4 + p.x * 0.4 + row.y) * 0.15;
        pts.push(p.x, row.y, z);
      }
      obj.geometry.setPositions(pts);
    });
  });

  return (
    <group ref={group}>
      {lines.map((row, i) => (
        <Line
          key={i}
          ref={(el) => {
            refs.current[i] = el as unknown as THREE.Object3D | null;
          }}
          points={row.base.map((p) => [p.x, p.y, p.z] as [number, number, number])}
          color={LINE}
          lineWidth={0.5}
          transparent
          opacity={0.6}
        />
      ))}
    </group>
  );
}

export default function GridFieldScene({ paused = false }: { paused?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={paused ? "demand" : "always"}
      style={{ width: "100%", height: "100%" }}
    >
      <Grid paused={paused} />
    </Canvas>
  );
}
