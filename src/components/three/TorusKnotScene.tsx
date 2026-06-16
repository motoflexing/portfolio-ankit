"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const LINE_STRONG = "#3a3a40"; // wireframe colour (near --line-strong on dark)

/**
 * A single slowly-rotating wireframe torus knot. Sits behind the contact CTA
 * as a quiet, premium backdrop. Wireframe material + tiny scale keep it cheap;
 * no lights needed (basic material).
 */
function Knot({ paused }: { paused: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (paused || !ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = t * 0.08;
    ref.current.rotation.y = t * 0.12;
  });
  return (
    <mesh ref={ref} scale={0.4}>
      <torusKnotGeometry args={[2.4, 0.5, 160, 24]} />
      <meshBasicMaterial color={LINE_STRONG} wireframe transparent opacity={0.6} />
    </mesh>
  );
}

export default function TorusKnotScene({ paused = false }: { paused?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={paused ? "demand" : "always"}
      style={{ width: "100%", height: "100%" }}
    >
      <Knot paused={paused} />
    </Canvas>
  );
}
