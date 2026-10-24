"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  BRAND_600,
  BRAND_900,
  CourtLines,
  Net,
  ResponsiveFov,
  createCourtTexture,
  createTennisBallTexture,
} from "@/components/three/courtParts";

const INK = "#0a120c";

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function FloatingBall() {
  const ref = useRef<THREE.Mesh>(null);
  const texture = useMemo(() => createTennisBallTexture(), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.position.y = 3.1 + Math.sin(t * 1.1) * 0.15;
      ref.current.rotation.x = t * 0.6;
      ref.current.rotation.y = t * 0.4;
    }
  });

  return (
    <mesh ref={ref} position={[4.0, 3.1, 1.2]}>
      <sphereGeometry args={[0.34, 16, 16]} />
      <meshStandardMaterial map={texture} roughness={0.92} />
    </mesh>
  );
}

function IntroCamera() {
  const start = useMemo(() => new THREE.Vector3(0, 16, 24), []);
  const rest = useMemo(() => new THREE.Vector3(0, 5.4, 11.5), []);
  const elapsed = useRef(0);
  const orbitAngle = useRef(0);
  const introDuration = 2.4;

  useFrame((state, delta) => {
    elapsed.current += delta;
    const t = Math.min(1, elapsed.current / introDuration);
    const eased = easeOutCubic(t);

    if (t < 1) {
      state.camera.position.lerpVectors(start, rest, eased);
      state.camera.lookAt(0, 0.6, 0);
    } else {
      orbitAngle.current += delta * 0.06;
      const radius = 12.3;
      state.camera.position.x = Math.sin(orbitAngle.current) * radius * 0.35;
      state.camera.position.z = rest.z + Math.cos(orbitAngle.current) * 1.2;
      state.camera.position.y = rest.y + Math.sin(orbitAngle.current * 0.7) * 0.4;
      state.camera.lookAt(0, 0.4, 0);
    }
  });

  return null;
}

function Scene() {
  const courtTexture = useMemo(() => createCourtTexture(BRAND_900), []);

  return (
    <>
      <color attach="background" args={[INK]} />
      <fog attach="fog" args={[INK, 14, 30]} />
      <ambientLight intensity={0.65} />
      <directionalLight position={[6, 9, 4]} intensity={1.1} color="#fff6df" />
      <directionalLight position={[-6, 4, -6]} intensity={0.25} color={BRAND_600} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[13, 24]} />
        <meshStandardMaterial map={courtTexture} roughness={0.95} />
      </mesh>

      <CourtLines />
      <Net />
      <FloatingBall />
      <ResponsiveFov baseFov={42} />
      <IntroCamera />
    </>
  );
}

export default function Court3DScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: false }}
      camera={{ fov: 42, position: [0, 16, 24] }}
      className="!absolute inset-0"
    >
      <Scene />
    </Canvas>
  );
}
