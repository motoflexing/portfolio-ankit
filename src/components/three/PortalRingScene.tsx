"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function PortalRing({ paused = false }: { paused?: boolean }) {
  const ringRef = useRef<THREE.Group>(null);
  const sparksRef = useRef<THREE.Points>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  const sparkPositions = useMemo(() => {
    const positions = new Float32Array(84 * 3);
    for (let i = 0; i < positions.length; i += 3) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.22 + Math.random() * 0.74;
      positions[i] = Math.cos(angle) * radius;
      positions[i + 1] = Math.sin(angle) * radius;
      positions[i + 2] = (Math.random() - 0.5) * 0.34;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (paused) return;
    const t = state.clock.elapsedTime;
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.24;
      ringRef.current.rotation.x = Math.sin(t * 0.5) * 0.18;
      ringRef.current.rotation.y = Math.cos(t * 0.28) * 0.1;
    }
    if (sparksRef.current) {
      sparksRef.current.rotation.z -= delta * 0.18;
      sparksRef.current.rotation.x = Math.sin(t * 0.22) * 0.16;
    }
    if (pulseRef.current) {
      const scale = 1 + Math.sin(t * 1.7) * 0.06;
      pulseRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={ringRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.24, 0.09, 28, 200]} />
        <meshStandardMaterial color="#09090c" metalness={1} roughness={0.14} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.98, 0.028, 18, 180]} />
        <meshStandardMaterial
          color="#ff333e"
          emissive="#ff2c37"
          emissiveIntensity={2.1}
          transparent
          opacity={0.88}
          metalness={0.4}
          roughness={0.12}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.68, 0.018, 16, 140]} />
        <meshStandardMaterial
          color="#818691"
          transparent
          opacity={0.2}
          metalness={0.92}
          roughness={0.12}
        />
      </mesh>
      <mesh ref={pulseRef} scale={1.32}>
        <sphereGeometry args={[0.94, 28, 28]} />
        <meshBasicMaterial
          color="#ff2631"
          transparent
          opacity={0.1}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <points ref={sparksRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[sparkPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#ff4d55"
          size={0.04}
          sizeAttenuation
          transparent
          opacity={0.34}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default function PortalRingScene({ paused = false }: { paused?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 3.6], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={paused ? "demand" : "always"}
      style={{ width: "100%", height: "100%", background: "transparent" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <ambientLight intensity={0.42} />
      <pointLight position={[0, 0, 2]} intensity={4.4} color="#ff3a45" />
      <pointLight position={[1.4, -1.6, 1.6]} intensity={1.2} color="#b7bfc9" />
      <PortalRing paused={paused} />
    </Canvas>
  );
}
