"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Line, Points, PointMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import {
  constellationNodes,
  constellationEdges,
  type ConstellationNode,
} from "./constellation-data";

// Design-token colours mirrored for the WebGL context (single source of truth
// stays globals.css; these mirror the same hex values).
const ACCENT = "#e5484d";
const NODE_LIVE = "#f5f5f3"; // --text
const NODE_DEV = "#8a8a8f"; // --text-muted
const NODE_PLANNED = "#1b1b1f"; // --surface-2
const NODE_DEFAULT = "#8a8a8f";
const LINE = "#3a3a40";
const METAL = "#a1a1aa"; // --metal (particle field)

/** Per-status presentation — honest: planned products read as faint + static. */
function statusVisual(node: ConstellationNode): {
  color: string;
  baseEmissive: number;
  pulseSpeed: number; // 0 = static
  pulseAmp: number;
} {
  switch (node.status) {
    case "Live":
      return { color: NODE_LIVE, baseEmissive: 0.45, pulseSpeed: 3.14, pulseAmp: 0.15 }; // ~2s loop
    case "In Development":
    case "Prototype":
      return { color: NODE_DEV, baseEmissive: 0.22, pulseSpeed: 1.7, pulseAmp: 0.08 }; // slower
    case "Planned":
    case "Experimental":
      return { color: NODE_PLANNED, baseEmissive: 0.05, pulseSpeed: 0, pulseAmp: 0 }; // static
    default:
      return { color: NODE_DEFAULT, baseEmissive: 0.12, pulseSpeed: 0, pulseAmp: 0 };
  }
}

/**
 * A single project node: a low-poly sphere that floats gently and pulses by
 * status, glowing accent-red when hovered/active. Geometry is intentionally
 * tiny (16x16) to keep the scene cheap.
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
  const phase = index * 1.7;
  const vis = useMemo(() => statusVisual(node), [node]);

  useFrame((state) => {
    const mesh = ref.current;
    const mat = matRef.current;
    if (!mesh || !mat) return;
    const t = state.clock.elapsedTime;
    // gentle per-node float
    mesh.position.y = node.position[1] + Math.sin(t * 0.6 + phase) * 0.08;

    // status pulse (scale 1 -> 1+amp -> 1) layered under the hover scale
    const pulse =
      vis.pulseSpeed > 0 ? 1 + (Math.sin(t * vis.pulseSpeed + phase) * 0.5 + 0.5) * vis.pulseAmp : 1;
    const targetScale = (active ? 1.5 : 1) * pulse;
    const s = mesh.scale.x + (targetScale - mesh.scale.x) * 0.15;
    mesh.scale.setScalar(s);

    // emissive eases toward target on hover (else the status base level)
    const targetEmissive = active ? 1.4 : vis.baseEmissive;
    mat.emissiveIntensity += (targetEmissive - mat.emissiveIntensity) * 0.12;
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
        color={active ? ACCENT : vis.color}
        emissive={active ? ACCENT : vis.color}
        emissiveIntensity={vis.baseEmissive}
        roughness={0.4}
        metalness={0.1}
      />
    </mesh>
  );
}

/** Hairline edges connecting the nodes; edges touching the active node
 *  brighten toward accent. */
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
 * Ambient particle field — 300 deterministic points in a loose sphere shell,
 * drifting very slowly. Adds depth around the constellation without any
 * physics. Positions are seeded (no Math.random during render) so the field is
 * stable between renders.
 */
function ParticleField() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const COUNT = 300;
    const arr = new Float32Array(COUNT * 3);
    // Deterministic pseudo-random (mulberry-ish) so renders are stable.
    let seed = 1337;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
    for (let i = 0; i < COUNT; i++) {
      // distribute in a spherical shell radius ~2.2–4
      const r = 2.2 + rand() * 1.8;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={METAL}
        size={0.008}
        sizeAttenuation
        depthWrite={false}
        opacity={0.5}
      />
    </Points>
  );
}

/**
 * The constellation group with cursor parallax + slow auto-rotate. When the
 * cursor is idle the group auto-rotates; pointer movement drives a parallax
 * tilt on top.
 */
function Constellation({ paused }: { paused: boolean }) {
  const group = useRef<THREE.Group>(null);
  const [active, setActive] = useState<number | null>(null);

  useFrame((state) => {
    const g = group.current;
    if (!g || paused) return;
    const t = state.clock.elapsedTime;

    // slow continuous auto-rotate; pointer movement adds a parallax tilt on top
    g.rotation.y = t * 0.08 + state.pointer.x * 0.25;
    g.rotation.x = Math.sin(t * 0.2) * 0.08 - state.pointer.y * 0.18;

    // cursor parallax — ease the whole group toward the pointer
    g.position.x += (state.pointer.x * 0.3 - g.position.x) * 0.05;
    g.position.y += (state.pointer.y * 0.3 - g.position.y) * 0.05;
  });

  return (
    <group ref={group}>
      <ParticleField />
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
 * Camera scroll-scrub: as the hero scrolls away (progress 0 -> 1), pull the
 * camera back (z 3 -> 6). Progress is supplied by the parent via GSAP
 * ScrollTrigger (see ProductConstellation). Pure ref read — no React state in
 * the frame loop.
 */
function CameraRig({ progressRef }: { progressRef: React.RefObject<number> }) {
  useFrame((state) => {
    const p = progressRef.current ?? 0;
    const targetZ = 3 + p * 3; // 3 -> 6
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.1;
  });
  return null;
}

/**
 * Canvas wrapper for the ProductConstellation. Capped dpr, low-cost lighting,
 * Bloom postprocessing, and a `paused` prop so callers can stop the loop when
 * offscreen or under reduced-motion (frameloop switches to "demand").
 *
 * `progressRef` carries hero scroll progress (0..1) for the camera pull-back.
 */
export default function ConstellationScene({
  paused = false,
  progressRef,
}: {
  paused?: boolean;
  progressRef?: React.RefObject<number>;
}) {
  const fallbackProgress = useRef(0);
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 3], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={paused ? "demand" : "always"}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 4]} intensity={18} color="#ffffff" />
      <pointLight position={[-4, -2, -2]} intensity={10} color={ACCENT} />
      <Constellation paused={paused} />
      <CameraRig progressRef={progressRef ?? fallbackProgress} />
      {/* Bloom gives the live (bright) nodes and accent glow a cinematic lift.
          Kept restrained so it reads as glow, not haze. */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.2}
          intensity={0.8}
          radius={0.4}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}
