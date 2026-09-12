"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  BRAND_600,
  BRAND_700,
  BRAND_900,
  LIME,
  CourtLines,
  Net,
  createCourtTexture,
  createTennisBallTexture,
} from "@/components/three/courtParts";

const WHITE = "#ffffff";
const COURT_GREEN = "#2c8a52";

function createStandTexture(baseColor: string, accentColor: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const rows = 14;
  for (let i = 0; i < rows; i++) {
    ctx.fillStyle = i % 2 === 0 ? accentColor : baseColor;
    ctx.globalAlpha = 0.85;
    ctx.fillRect(0, (i / rows) * canvas.height, canvas.width, canvas.height / rows - 1.5);
  }
  ctx.globalAlpha = 1;

  // vertical aisle dividers, like real stadium seating sections
  const aisles = 10;
  ctx.fillStyle = baseColor;
  ctx.globalAlpha = 0.9;
  for (let i = 1; i < aisles; i++) {
    ctx.fillRect((i / aisles) * canvas.width - 1.5, 0, 3, canvas.height);
  }
  ctx.globalAlpha = 1;

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(8, 1);
  return texture;
}

function Stadium() {
  const standTexture = useMemo(() => createStandTexture(BRAND_900, BRAND_600), []);

  const halfWidth = 6.5;
  const halfDepth = 12;
  const gap = 2.5;
  const standHeight = 4.2;
  const tilt = 0.3;

  return (
    <group>
      <mesh position={[0, standHeight / 2, halfDepth + gap]} rotation={[tilt, 0, 0]}>
        <planeGeometry args={[halfWidth * 2 + gap * 2, standHeight]} />
        <meshStandardMaterial map={standTexture} roughness={0.95} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, standHeight / 2, -(halfDepth + gap)]} rotation={[-tilt, Math.PI, 0]}>
        <planeGeometry args={[halfWidth * 2 + gap * 2, standHeight]} />
        <meshStandardMaterial map={standTexture} roughness={0.95} side={THREE.DoubleSide} />
      </mesh>
      <mesh
        position={[halfWidth + gap, standHeight / 2, 0]}
        rotation={[tilt, Math.PI / 2, 0]}
      >
        <planeGeometry args={[halfDepth * 2 + gap * 2, standHeight]} />
        <meshStandardMaterial map={standTexture} roughness={0.95} side={THREE.DoubleSide} />
      </mesh>
      <mesh
        position={[-(halfWidth + gap), standHeight / 2, 0]}
        rotation={[tilt, -Math.PI / 2, 0]}
      >
        <planeGeometry args={[halfDepth * 2 + gap * 2, standHeight]} />
        <meshStandardMaterial map={standTexture} roughness={0.95} side={THREE.DoubleSide} />
      </mesh>

      {/* bright accent trim along the top of the stands */}
      <mesh position={[0, standHeight + 0.05, halfDepth + gap]} rotation={[tilt, 0, 0]}>
        <boxGeometry args={[halfWidth * 2 + gap * 2, 0.15, 0.05]} />
        <meshStandardMaterial color={LIME} emissive={LIME} emissiveIntensity={0.3} />
      </mesh>
      <mesh
        position={[halfWidth + gap, standHeight + 0.05, 0]}
        rotation={[tilt, Math.PI / 2, 0]}
      >
        <boxGeometry args={[halfDepth * 2 + gap * 2, 0.15, 0.05]} />
        <meshStandardMaterial color={LIME} emissive={LIME} emissiveIntensity={0.3} />
      </mesh>
      <mesh
        position={[-(halfWidth + gap), standHeight + 0.05, 0]}
        rotation={[tilt, -Math.PI / 2, 0]}
      >
        <boxGeometry args={[halfDepth * 2 + gap * 2, 0.15, 0.05]} />
        <meshStandardMaterial color={LIME} emissive={LIME} emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

function DriftingCamera() {
  const t0 = useRef<number | null>(null);

  useFrame((state, delta) => {
    if (t0.current === null) {
      t0.current = Math.random() * 100;
    }
    t0.current += delta;
    const t = t0.current;
    state.camera.position.x = Math.sin(t * 0.08) * 1.8;
    state.camera.position.y = 4.1 + Math.sin(t * 0.05) * 0.3;
    state.camera.position.z = 8.2 + Math.cos(t * 0.06) * 1.0;
    state.camera.lookAt(0, 0.2, 0);
  });

  return null;
}

function SunBall() {
  const ref = useRef<THREE.Mesh>(null);
  const texture = useMemo(() => createTennisBallTexture(), []);

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
      <meshStandardMaterial map={texture} roughness={0.9} />
    </mesh>
  );
}

function Scene() {
  const courtTexture = useMemo(() => createCourtTexture(COURT_GREEN), []);

  return (
    <>
      <color attach="background" args={[WHITE]} />
      <fog attach="fog" args={[WHITE, 13, 27]} />
      <ambientLight intensity={1.1} color="#fffaf0" />
      <directionalLight position={[5, 10, 6]} intensity={1.4} color="#fff6e0" />
      <directionalLight position={[-6, 5, -4]} intensity={0.3} color={BRAND_600} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[13, 24]} />
        <meshStandardMaterial map={courtTexture} roughness={0.9} />
      </mesh>

      <CourtLines color="#ffffff" />
      <Net />
      <Stadium />
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
      camera={{ fov: 48, position: [0, 4.1, 8.2] }}
      className="!absolute inset-0"
    >
      <Scene />
    </Canvas>
  );
}
