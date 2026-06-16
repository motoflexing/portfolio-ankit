"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

type NodePoint = [number, number, number];

const TECH_NODES: NodePoint[] = [
  [1.26, 0.4, 0.6],
  [-1.1, 0.7, 0.28],
  [0.64, -1.18, 0.5],
  [-0.54, -0.96, -0.86],
  [1.04, -0.46, -0.72],
  [-1.34, 0.04, -0.44],
];

export function TechCore({ paused }: { paused: boolean }) {
  const rootRef = useRef<THREE.Group>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(54 * 3);
    for (let i = 0; i < positions.length; i += 3) {
      const radius = 0.9 + Math.random() * 1.4;
      const theta = Math.random() * Math.PI * 2;
      positions[i] = Math.cos(theta) * radius;
      positions[i + 1] = (Math.random() - 0.5) * 2.4;
      positions[i + 2] = (Math.random() - 0.5) * 1.8;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (paused) return;
    const t = state.clock.elapsedTime;
    if (rootRef.current) {
      rootRef.current.rotation.y += delta * 0.2;
      rootRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
      rootRef.current.position.y = Math.sin(t * 0.5) * 0.08;
    }
    if (shellRef.current) {
      shellRef.current.rotation.x += delta * 0.12;
      shellRef.current.rotation.y -= delta * 0.22;
    }
    if (glowRef.current) {
      const scale = 1 + Math.sin(t * 1.8) * 0.05;
      glowRef.current.scale.setScalar(scale);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.16;
    }
    if (orbitRef.current) {
      orbitRef.current.rotation.y -= delta * 0.34;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={rootRef}>
      <mesh ref={shellRef}>
        <icosahedronGeometry args={[0.86, 2]} />
        <meshPhysicalMaterial
          color="#25080d"
          transmission={0.96}
          thickness={0.42}
          transparent
          opacity={0.24}
          roughness={0.08}
          metalness={0.14}
          emissive="#6f111b"
          emissiveIntensity={0.38}
          clearcoat={1}
        />
      </mesh>

      <mesh scale={0.58}>
        <octahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          color="#ff5a61"
          emissive="#ff3040"
          emissiveIntensity={2.6}
          metalness={0.25}
          roughness={0.06}
        />
      </mesh>

      <mesh ref={glowRef} scale={1.3}>
        <sphereGeometry args={[0.92, 28, 28]} />
        <meshBasicMaterial
          color="#ff2a36"
          transparent
          opacity={0.12}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <group ref={ringRef} rotation={[0.9, 0, 0.22]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.72, 0.014, 16, 180]} />
          <meshStandardMaterial
            color="#8d212a"
            emissive="#ff2d39"
            emissiveIntensity={0.44}
            transparent
            opacity={0.32}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.32, 0.01, 12, 150]} />
          <meshStandardMaterial
            color="#787d86"
            transparent
            opacity={0.2}
            metalness={0.9}
            roughness={0.14}
          />
        </mesh>
      </group>

      {TECH_NODES.map((node, index) => (
        <Line
          key={`line-${index}`}
          points={[[0, 0, 0], node]}
          color={index % 2 === 0 ? "#e5484d" : "#565b66"}
          transparent
          opacity={0.28}
          lineWidth={0.7}
        />
      ))}

      {TECH_NODES.map((node, index) => (
        <mesh key={`node-${index}`} position={node}>
          <sphereGeometry args={[0.1, 18, 18]} />
          <meshStandardMaterial
            color={index % 2 === 0 ? "#14151a" : "#c0c5cc"}
            metalness={1}
            roughness={0.14}
            emissive="#ff3a46"
            emissiveIntensity={index % 2 === 0 ? 0.5 : 0.2}
          />
        </mesh>
      ))}

      <group ref={orbitRef} rotation={[0.32, 0.42, 0]}>
        <mesh position={[1.98, 0, 0]}>
          <sphereGeometry args={[0.12, 18, 18]} />
          <meshStandardMaterial
            color="#0f1014"
            metalness={1}
            roughness={0.16}
            emissive="#ff3240"
            emissiveIntensity={0.82}
          />
        </mesh>
      </group>

      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#ff4650"
          size={0.035}
          sizeAttenuation
          transparent
          opacity={0.32}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default function TechCoreScene({ paused = false }: { paused?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.8], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={paused ? "demand" : "always"}
      style={{ width: "100%", height: "100%", background: "transparent" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <ambientLight intensity={0.48} />
      <pointLight position={[2, 2.4, 3]} intensity={8} color="#ffffff" />
      <pointLight position={[0.4, 0.2, 2.4]} intensity={9} color="#ff3440" />
      <pointLight position={[-1.8, -2, 1.6]} intensity={3} color="#9ba2ad" />
      <TechCore paused={paused} />
    </Canvas>
  );
}
