"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function NetworkGlobe({ paused = false }: { paused?: boolean }) {
  const globeRef = useRef<THREE.Group>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Group>(null);
  const scrollRef = useRef(0);
  const nodePositions = useMemo(
    () => [
      [1.28, 0.42, 0.98],
      [-1.18, 0.74, 0.6],
      [0.32, -1.12, 1.2],
      [1.02, -0.54, -1.06],
      [-0.88, -0.92, -0.82],
      [-1.18, 0.16, -1.12],
    ] as const,
    [],
  );

  useEffect(() => {
    let frame = 0;
    const updateScroll = () => {
      frame = 0;
      scrollRef.current = Math.min(window.scrollY / 1200, 1);
    };
    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(updateScroll);
    };
    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useFrame((state, delta) => {
    if (paused) return;
    const t = state.clock.elapsedTime;
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.16;
      globeRef.current.rotation.x = Math.sin(t * 0.22) * 0.16;
      globeRef.current.position.y = Math.sin(t * 0.4) * 0.08 - scrollRef.current * 0.18;
    }
    if (orbitRef.current) {
      orbitRef.current.rotation.z += delta * 0.26;
      orbitRef.current.rotation.x = 0.74 + Math.sin(t * 0.3) * 0.1;
    }
    if (nodesRef.current) {
      nodesRef.current.rotation.y -= delta * 0.08;
    }
  });

  return (
    <group ref={globeRef}>
      <mesh scale={1.04}>
        <icosahedronGeometry args={[1.84, 2]} />
        <meshBasicMaterial color="#4c505a" wireframe transparent opacity={0.46} />
      </mesh>

      <mesh scale={1.16}>
        <sphereGeometry args={[1.78, 30, 30]} />
        <meshBasicMaterial
          color="#ff313e"
          transparent
          opacity={0.06}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <group ref={nodesRef}>
        {nodePositions.map((position, index) => (
          <group key={`${position.join("-")}-${index}`} position={position as [number, number, number]}>
            <mesh>
              <sphereGeometry args={[0.07, 18, 18]} />
              <meshBasicMaterial color="#f2f4f6" transparent opacity={0.9} />
            </mesh>
            <mesh scale={1.8}>
              <sphereGeometry args={[0.07, 16, 16]} />
              <meshBasicMaterial
                color="#ff3340"
                transparent
                opacity={0.14}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          </group>
        ))}
      </group>

      <group ref={orbitRef} rotation={[0.76, 0, 0.24]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.42, 0.012, 12, 160]} />
          <meshBasicMaterial color="#e5484d" transparent opacity={0.24} />
        </mesh>
        <mesh position={[2.42, 0, 0]}>
          <sphereGeometry args={[0.11, 18, 18]} />
          <meshStandardMaterial
            color="#101116"
            metalness={1}
            roughness={0.16}
            emissive="#ff3642"
            emissiveIntensity={0.86}
          />
        </mesh>
      </group>

      <group rotation={[0.22, 0.6, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.08, 0.008, 12, 140]} />
          <meshBasicMaterial color="#8a8f98" transparent opacity={0.16} />
        </mesh>
      </group>
    </group>
  );
}
