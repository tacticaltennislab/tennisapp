"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BRAND_600, LIME, CourtLines, Net } from "@/components/three/courtParts";

const WHITE = "#ffffff";
const COURT_GREEN = "#2c8a52";

function DriftingCamera() {
  const t0 = useRef<number | null>(null);

  useFrame((state, delta) => {
    if (t0.current === null) {
      t0.current = Math.random() * 100;
    }
    t0.current += delta;
    const t = t0.current;
    state.camera.position.x = Math.sin(t * 0.08) * 2.2;
    state.camera.position.y = 6.8 + Math.sin(t * 0.05) * 0.4;
    state.camera.position.z = 12.5 + Math.cos(t * 0.06) * 1.4;
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

function SunBall() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.position.y = 1.4 + Math.sin(t * 0.9) * 0.12;
      ref.current.rotation.y = t * 0.5;
    }
  });

  return (
    <mesh ref={ref} position={[-3.6, 1.4, 3.2]}>
      <sphereGeometry args={[0.32, 32, 32]} />
      <meshStandardMaterial color={LIME} roughness={0.45} />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={[WHITE]} />
      <fog attach="fog" args={[WHITE, 12, 24]} />
      <ambientLight intensity={1.1} color="#fffaf0" />
      <directionalLight position={[5, 10, 6]} intensity={1.4} color="#fff6e0" />
      <directionalLight position={[-6, 5, -4]} intensity={0.3} color={BRAND_600} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[13, 24]} />
        <meshStandardMaterial color={COURT_GREEN} roughness={0.9} />
      </mesh>

      <CourtLines color="#ffffff" />
      <Net />
      <SunBall />
      <DriftingCamera />
    </>
  );
}

export default function LightCourtScene() {
  return (
    <Canvas
      dpr={1}
      gl={{ antialias: true, alpha: false }}
      camera={{ fov: 38, position: [0, 6.8, 13.5] }}
      className="!absolute inset-0"
    >
      <Scene />
    </Canvas>
  );
}
