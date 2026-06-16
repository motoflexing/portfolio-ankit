"use client";

import { Canvas } from "@react-three/fiber";
import { NetworkGlobe } from "@/components/three/NetworkGlobe";

export default function WireframeSphereScene({
  paused = false,
}: {
  paused?: boolean;
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.2], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={paused ? "demand" : "always"}
      style={{ width: "100%", height: "100%", background: "transparent" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <ambientLight intensity={0.38} />
      <pointLight position={[1.6, 2.2, 3.4]} intensity={4.5} color="#ffffff" />
      <pointLight position={[0.2, 0.4, 2.5]} intensity={4.2} color="#ff3642" />
      <NetworkGlobe paused={paused} />
    </Canvas>
  );
}
