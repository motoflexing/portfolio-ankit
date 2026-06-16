"use client";

import { type MutableRefObject, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export type HeroInteractionState = {
  x: number;
  y: number;
  active: boolean;
};

export type HeroInteractionRef = MutableRefObject<HeroInteractionState>;

type OrbitConfig = {
  radius: number;
  speed: number;
  tiltX: number;
  tiltZ: number;
  phase: number;
};

const ORBITS: OrbitConfig[] = [
  { radius: 2.7, speed: 0.34, tiltX: 0.52, tiltZ: 0.12, phase: 0 },
  { radius: 3.05, speed: 0.24, tiltX: -0.24, tiltZ: -0.2, phase: 1.9 },
  { radius: 2.16, speed: 0.48, tiltX: 0.18, tiltZ: 0.42, phase: 3.8 },
];

const FRAME_BARS = [
  { position: [0, 1.08, 1.08], scale: [2.28, 0.18, 0.18] },
  { position: [0, 1.08, -1.08], scale: [2.28, 0.18, 0.18] },
  { position: [0, -1.08, 1.08], scale: [2.28, 0.18, 0.18] },
  { position: [0, -1.08, -1.08], scale: [2.28, 0.18, 0.18] },
  { position: [1.08, 1.08, 0], scale: [0.18, 0.18, 2.28] },
  { position: [-1.08, 1.08, 0], scale: [0.18, 0.18, 2.28] },
  { position: [1.08, -1.08, 0], scale: [0.18, 0.18, 2.28] },
  { position: [-1.08, -1.08, 0], scale: [0.18, 0.18, 2.28] },
  { position: [1.08, 0, 1.08], scale: [0.18, 2.28, 0.18] },
  { position: [1.08, 0, -1.08], scale: [0.18, 2.28, 0.18] },
  { position: [-1.08, 0, 1.08], scale: [0.18, 2.28, 0.18] },
  { position: [-1.08, 0, -1.08], scale: [0.18, 2.28, 0.18] },
] as const;

function HeroCubeSystem({ interactionRef }: { interactionRef: HeroInteractionRef }) {
  const mobile = useMediaQuery("(max-width: 767px)");
  const rootRef = useRef<THREE.Group>(null);
  const cubeRigRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const coreGlowRef = useRef<THREE.Mesh>(null);
  const floorGlowRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Group>(null);
  const innerRingRef = useRef<THREE.Group>(null);
  const orbitRefs = useRef<Array<THREE.Group | null>>([]);
  const orbitBallRefs = useRef<Array<THREE.Mesh | null>>([]);
  const orbitMaterialRefs = useRef<Array<THREE.MeshStandardMaterial | null>>([]);
  const particleRef = useRef<THREE.Points>(null);
  const starfieldRef = useRef<THREE.Points>(null);
  const coreMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const targetPointerRef = useRef(new THREE.Vector2(0, 0));
  const smoothPointerRef = useRef(new THREE.Vector2(0, 0));
  const scrollBoostRef = useRef(0);
  const glowBoostRef = useRef(0);

  const tempWorld = useMemo(() => new THREE.Vector3(), []);
  const tempProjected = useMemo(() => new THREE.Vector3(), []);
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(96 * 3);
    for (let i = 0; i < positions.length; i += 3) {
      const radius = 1.2 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      positions[i] = Math.cos(theta) * radius;
      positions[i + 1] = (Math.random() - 0.35) * 3.4;
      positions[i + 2] = -0.8 + Math.random() * 2.2;
    }
    return positions;
  }, []);
  const starfieldPositions = useMemo(() => {
    const positions = new Float32Array(220 * 3);
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] = (Math.random() - 0.1) * 10;
      positions[i + 1] = (Math.random() - 0.45) * 6.8;
      positions[i + 2] = -2.8 - Math.random() * 1.7;
    }
    return positions;
  }, []);

  useEffect(() => {
    let frame = 0;

    const updateScroll = () => {
      frame = 0;
      scrollBoostRef.current = Math.min(window.scrollY / (mobile ? 720 : 1120), 1);
    };

    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(updateScroll);
    };

    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [mobile]);

  useFrame((state, delta) => {
    const root = rootRef.current;
    const cubeRig = cubeRigRef.current;
    const core = coreRef.current;
    const coreGlow = coreGlowRef.current;
    const floorGlow = floorGlowRef.current;
    const outerRing = outerRingRef.current;
    const innerRing = innerRingRef.current;
    const coreMaterial = coreMaterialRef.current;
    if (
      !root ||
      !cubeRig ||
      !core ||
      !coreGlow ||
      !floorGlow ||
      !outerRing ||
      !innerRing ||
      !coreMaterial
    ) {
      return;
    }

    const motionScale = mobile ? 0.62 : 1;
    const pointer = interactionRef.current;
    const targetX = pointer.active ? pointer.x * 0.24 * motionScale : 0;
    const targetY = pointer.active ? pointer.y * 0.18 * motionScale : 0;
    targetPointerRef.current.set(targetX, targetY);
    smoothPointerRef.current.lerp(
      targetPointerRef.current,
      1 - Math.exp(-delta * 4.8),
    );

    root.rotation.x = THREE.MathUtils.lerp(
      root.rotation.x,
      -0.12 + smoothPointerRef.current.y * 0.92 + scrollBoostRef.current * 0.08,
      0.08,
    );
    root.rotation.y = THREE.MathUtils.lerp(
      root.rotation.y,
      0.22 + smoothPointerRef.current.x * 1.1,
      0.08,
    );
    root.position.y = Math.sin(state.clock.elapsedTime * 0.74) * 0.12 * motionScale;

    cubeRig.rotation.x += delta * (0.14 + scrollBoostRef.current * 0.14);
    cubeRig.rotation.y += delta * (0.2 + scrollBoostRef.current * 0.2);
    cubeRig.rotation.z += delta * 0.045;

    cubeRig.getWorldPosition(tempWorld);
    tempProjected.copy(tempWorld).project(state.camera);
    const cubePointerDistance = pointer.active
      ? Math.hypot(tempProjected.x - pointer.x, tempProjected.y - pointer.y)
      : 10;
    const targetGlowBoost = THREE.MathUtils.clamp(1 - cubePointerDistance / 0.46, 0, 1);
    glowBoostRef.current = THREE.MathUtils.lerp(
      glowBoostRef.current,
      targetGlowBoost,
      0.08,
    );

    const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.3) * 0.08;
    core.scale.setScalar(0.92 * pulse + glowBoostRef.current * 0.07);
    coreGlow.scale.setScalar(
      1.4 +
        Math.sin(state.clock.elapsedTime * 1.5) * 0.05 +
        glowBoostRef.current * 0.18,
    );
    floorGlow.scale.setScalar(1.02 + glowBoostRef.current * 0.08);
    coreMaterial.emissiveIntensity = 2.7 + glowBoostRef.current * 1.6;

    outerRing.rotation.y += delta * (0.1 + scrollBoostRef.current * 0.12);
    outerRing.rotation.z = 0.18 + smoothPointerRef.current.x * 0.5;
    innerRing.rotation.y -= delta * (0.08 + scrollBoostRef.current * 0.1);
    innerRing.rotation.x = 1.02 + smoothPointerRef.current.y * 0.35;

    let hoveredBall = -1;
    let closestBallDistance = Number.POSITIVE_INFINITY;

    orbitBallRefs.current.forEach((ball, index) => {
      if (!ball || !pointer.active) return;
      ball.getWorldPosition(tempWorld);
      tempProjected.copy(tempWorld).project(state.camera);
      const distance = Math.hypot(tempProjected.x - pointer.x, tempProjected.y - pointer.y);
      if (distance < 0.14 && distance < closestBallDistance) {
        closestBallDistance = distance;
        hoveredBall = index;
      }
    });

    orbitRefs.current.forEach((orbit, index) => {
      const ball = orbitBallRefs.current[index];
      const material = orbitMaterialRefs.current[index];
      if (!orbit || !ball || !material) return;

      const hovered = hoveredBall === index;
      const speedBoost = hovered ? 2 : 1;
      orbit.rotation.y +=
        delta * ORBITS[index].speed * speedBoost * (mobile ? 0.68 : 1);
      orbit.rotation.x =
        ORBITS[index].tiltX +
        Math.sin(state.clock.elapsedTime * 0.26 + ORBITS[index].phase) * 0.05;
      orbit.rotation.z =
        ORBITS[index].tiltZ +
        Math.cos(state.clock.elapsedTime * 0.24 + ORBITS[index].phase) * 0.05;

      const targetScale = hovered ? 1.26 : 1;
      ball.scale.x = THREE.MathUtils.lerp(ball.scale.x, targetScale, 0.12);
      ball.scale.y = THREE.MathUtils.lerp(ball.scale.y, targetScale, 0.12);
      ball.scale.z = THREE.MathUtils.lerp(ball.scale.z, targetScale, 0.12);
      ball.rotation.x += delta * (hovered ? 1.5 : 0.36);
      ball.rotation.y += delta * (hovered ? 3.6 : 1.1);
      material.emissiveIntensity = THREE.MathUtils.lerp(
        material.emissiveIntensity,
        hovered ? 1.35 : 0.24,
        0.12,
      );
    });

    if (particleRef.current) {
      particleRef.current.rotation.y += delta * 0.06;
      particleRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.08;
    }

    if (starfieldRef.current) {
      starfieldRef.current.rotation.y += delta * 0.012;
      starfieldRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.03;
    }
  });

  const sceneScale = mobile ? 0.76 : 0.96;

  return (
    <group position={[0.7, -0.24, 0]} scale={sceneScale}>
      <group ref={rootRef}>
        <points ref={starfieldRef} position={[0.36, 0.2, -0.35]}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[starfieldPositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            color="#ff4049"
            size={mobile ? 0.018 : 0.022}
            sizeAttenuation
            transparent
            opacity={0.26}
            depthWrite={false}
          />
        </points>

        <mesh
          ref={floorGlowRef}
          position={[0.22, -3.5, -0.4]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[0.9, 4.45, 120]} />
          <meshBasicMaterial
            color="#ff2632"
            transparent
            opacity={0.14}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        <group position={[0, -2.92, 0]}>
          <mesh position={[0, -0.16, 0]}>
            <cylinderGeometry args={[3.05, 3.5, 0.58, 72, 1]} />
            <meshStandardMaterial color="#060608" metalness={1} roughness={0.16} />
          </mesh>
          <mesh position={[0, 0.24, 0]}>
            <cylinderGeometry args={[2.62, 2.86, 0.76, 72, 1]} />
            <meshStandardMaterial color="#111115" metalness={0.98} roughness={0.14} />
          </mesh>
          <mesh position={[0, 0.56, 0]}>
            <cylinderGeometry args={[2.18, 2.36, 0.22, 72, 1]} />
            <meshStandardMaterial color="#18181d" metalness={0.95} roughness={0.12} />
          </mesh>
          <mesh position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[2.68, 0.065, 28, 220]} />
            <meshStandardMaterial
              color="#ff2d37"
              emissive="#ff1f2e"
              emissiveIntensity={2.4}
              metalness={0.22}
              roughness={0.12}
            />
          </mesh>
          <mesh position={[0, 0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.44, 0.04, 18, 180]} />
            <meshStandardMaterial
              color="#ff313d"
              emissive="#ff1f2a"
              emissiveIntensity={1.6}
              transparent
              opacity={0.9}
            />
          </mesh>
        </group>

        <group
          ref={outerRingRef}
          position={[0, -0.44, 0]}
          rotation={[0.94, 0.2, 0.18]}
        >
          <mesh>
            <torusGeometry args={[3.18, 0.013, 20, 240]} />
            <meshStandardMaterial
              color="#9f2028"
              emissive="#ff2d3a"
              emissiveIntensity={0.46}
              transparent
              opacity={0.34}
              metalness={0.75}
              roughness={0.18}
            />
          </mesh>
        </group>

        <group
          ref={innerRingRef}
          position={[0, -0.12, 0]}
          rotation={[1.02, -0.32, -0.2]}
        >
          <mesh>
            <torusGeometry args={[2.54, 0.011, 18, 220]} />
            <meshStandardMaterial
              color="#6f737b"
              transparent
              opacity={0.24}
              metalness={1}
              roughness={0.1}
            />
          </mesh>
        </group>

        <group
          ref={cubeRigRef}
          position={[0.08, 0.06, 0]}
          rotation={[0.42, 0.55, -0.18]}
        >
          <mesh>
            <boxGeometry args={[2.08, 2.08, 2.08]} />
            <meshPhysicalMaterial
              color="#26070b"
              transmission={1}
              thickness={0.82}
              ior={1.14}
              transparent
              opacity={0.24}
              roughness={0.08}
              metalness={0.08}
              reflectivity={1}
              clearcoat={1}
              clearcoatRoughness={0.08}
              emissive="#5f1219"
              emissiveIntensity={0.3}
            />
          </mesh>

          <mesh scale={0.84} rotation={[0.12, 0.26, 0]}>
            <boxGeometry args={[2.08, 2.08, 2.08]} />
            <meshPhysicalMaterial
              color="#32090e"
              transmission={0.82}
              thickness={0.38}
              transparent
              opacity={0.15}
              roughness={0.14}
              emissive="#7a141d"
              emissiveIntensity={0.42}
            />
          </mesh>

          {FRAME_BARS.map((bar, index) => (
            <mesh
              key={`${index}-${bar.position.join("-")}`}
              position={bar.position as [number, number, number]}
              scale={bar.scale as [number, number, number]}
            >
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="#07070a" metalness={1} roughness={0.13} />
            </mesh>
          ))}

          <mesh ref={coreRef} scale={0.96}>
            <octahedronGeometry args={[0.78, 2]} />
            <meshStandardMaterial
              ref={coreMaterialRef}
              color="#ff5b61"
              emissive="#ff3040"
              emissiveIntensity={2.8}
              roughness={0.05}
              metalness={0.28}
            />
          </mesh>

          <mesh ref={coreGlowRef} scale={1.5}>
            <sphereGeometry args={[0.82, 32, 32]} />
            <meshBasicMaterial
              color="#ff2d38"
              transparent
              opacity={0.14}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        </group>

        {ORBITS.map((orbit, index) => (
          <group
            key={orbit.phase}
            ref={(node) => {
              orbitRefs.current[index] = node;
            }}
            position={[0, -0.18, 0]}
            rotation={[orbit.tiltX, orbit.phase, orbit.tiltZ]}
          >
            <mesh
              ref={(node) => {
                orbitBallRefs.current[index] = node;
              }}
              position={[orbit.radius, 0, 0]}
            >
              <sphereGeometry args={[0.18, 28, 28]} />
              <meshStandardMaterial
                ref={(node) => {
                  orbitMaterialRefs.current[index] = node;
                }}
                color="#666a72"
                metalness={1}
                roughness={0.18}
                emissive="#e5484d"
                emissiveIntensity={0.24}
              />
            </mesh>
            <mesh position={[orbit.radius, 0, 0]} scale={1.36}>
              <sphereGeometry args={[0.22, 20, 20]} />
              <meshBasicMaterial
                color="#ff3340"
                transparent
                opacity={0.07}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </mesh>
          </group>
        ))}

        <points ref={particleRef} position={[0, -0.08, 0]}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[particlePositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            color="#ff454f"
            size={mobile ? 0.03 : 0.04}
            sizeAttenuation
            transparent
            opacity={0.34}
            depthWrite={false}
          />
        </points>
      </group>
    </group>
  );
}

export default function Hero3DScene({
  interactionRef,
}: {
  interactionRef: HeroInteractionRef;
}) {
  return (
    <Canvas
      dpr={[1, 1.7]}
      camera={{ position: [0, 0.2, 8.2], fov: 34 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <ambientLight intensity={0.46} />
      <hemisphereLight args={["#ffffff", "#09090b", 0.3]} />
      <pointLight position={[2.8, 2.4, 3.8]} intensity={24} color="#ffffff" />
      <pointLight position={[0.8, 0.5, 2.6]} intensity={18} color="#ff3340" />
      <pointLight position={[-2.6, -2.2, 1.6]} intensity={8} color="#8c93a0" />
      <HeroCubeSystem interactionRef={interactionRef} />
    </Canvas>
  );
}
