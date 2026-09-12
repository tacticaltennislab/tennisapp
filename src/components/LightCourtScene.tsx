"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  BRAND_600,
  BRAND_900,
  LIME,
  CourtLines,
  Net,
  ResponsiveFov,
  createCourtTexture,
  createTennisBallTexture,
} from "@/components/three/courtParts";

const WHITE = "#ffffff";
const COURT_GREEN = "#2c8a52";

/** Grand-slam-style stand texture: a solid court-level kick wall with a
 * packed, mottled crowd above it (scattered varied-color blobs rather than
 * flat stripes), so distant tiers read as spectators instead of a striped
 * wall. Same flat plane geometry as before -- this only changes what's
 * drawn onto it once and cached, so it costs nothing extra per frame. */
function createStandTexture(baseColor: string, accentColor: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Solid kick wall at court level (bottom of the canvas -> bottom of the
  // mesh once mapped).
  const wallHeight = canvas.height * 0.22;
  ctx.fillStyle = accentColor;
  ctx.fillRect(0, canvas.height - wallHeight, canvas.width, wallHeight);

  // Crowd tiers fill the rest.
  const crowdHeight = canvas.height - wallHeight;
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, canvas.width, crowdHeight);

  const palette = [
    "#e8d3b0",
    "#c9a06b",
    "#8a5a3a",
    "#3d2b1f",
    "#c94f4f",
    "#4f7fc9",
    "#e0c14f",
    "#4fae6a",
    "#ffffff",
    "#2b2b2b",
  ];

  const rows = 9;
  const rowHeight = crowdHeight / rows;
  for (let r = 0; r < rows; r++) {
    const rowY = r * rowHeight;
    const haze = 1 - r / rows;
    const dotsPerRow = 44;
    for (let i = 0; i < dotsPerRow; i++) {
      const x = (i / dotsPerRow) * canvas.width + (Math.random() - 0.5) * 4;
      const y = rowY + rowHeight * 0.5 + (Math.random() - 0.5) * rowHeight * 0.6;
      const radius = 1.6 + Math.random() * 1.2;
      ctx.globalAlpha = 0.55 + haze * 0.4;
      ctx.fillStyle = palette[Math.floor(Math.random() * palette.length)];
      ctx.beginPath();
      ctx.ellipse(x, y, radius, radius * 1.3, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;

  // vertical aisle dividers, like real stadium seating sections
  const aisles = 10;
  ctx.fillStyle = baseColor;
  ctx.globalAlpha = 0.85;
  for (let i = 1; i < aisles; i++) {
    ctx.fillRect((i / aisles) * canvas.width - 1.5, 0, 3, crowdHeight);
  }
  ctx.globalAlpha = 1;

  // Soft haze toward the back/top of the stands rather than a hard cutoff.
  const topFade = ctx.createLinearGradient(0, 0, 0, crowdHeight * 0.35);
  topFade.addColorStop(0, "rgba(255,255,255,0.35)");
  topFade.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = topFade;
  ctx.fillRect(0, 0, canvas.width, crowdHeight * 0.35);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(8, 1);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function Stadium() {
  const standTexture = useMemo(() => createStandTexture(BRAND_900, BRAND_600), []);

  const halfWidth = 6.5;
  const halfDepth = 12;
  const gap = 2.5;
  const standHeight = 4.2;
  const tilt = 0.3;

  // Unlit materials: these are distant background geometry, so skipping
  // per-fragment PBR lighting (meshStandardMaterial) keeps the added
  // stands cheap even with DoubleSide, which we need since the exact
  // outward normal after each wall's rotation isn't worth hand-deriving.
  return (
    <group>
      <mesh position={[0, standHeight / 2, -(halfDepth + gap)]} rotation={[-tilt, Math.PI, 0]}>
        <planeGeometry args={[halfWidth * 2 + gap * 2, standHeight]} />
        <meshBasicMaterial map={standTexture} side={THREE.DoubleSide} fog />
      </mesh>
      <mesh
        position={[halfWidth + gap, standHeight / 2, 0]}
        rotation={[tilt, Math.PI / 2, 0]}
      >
        <planeGeometry args={[halfDepth * 2 + gap * 2, standHeight]} />
        <meshBasicMaterial map={standTexture} side={THREE.DoubleSide} fog />
      </mesh>
      <mesh
        position={[-(halfWidth + gap), standHeight / 2, 0]}
        rotation={[tilt, -Math.PI / 2, 0]}
      >
        <planeGeometry args={[halfDepth * 2 + gap * 2, standHeight]} />
        <meshBasicMaterial map={standTexture} side={THREE.DoubleSide} fog />
      </mesh>

      {/* bright accent trim along the top of the stands */}
      <mesh
        position={[halfWidth + gap, standHeight + 0.05, 0]}
        rotation={[tilt, Math.PI / 2, 0]}
      >
        <boxGeometry args={[halfDepth * 2 + gap * 2, 0.15, 0.05]} />
        <meshBasicMaterial color={LIME} fog={false} />
      </mesh>
      <mesh
        position={[-(halfWidth + gap), standHeight + 0.05, 0]}
        rotation={[tilt, -Math.PI / 2, 0]}
      >
        <boxGeometry args={[halfDepth * 2 + gap * 2, 0.15, 0.05]} />
        <meshBasicMaterial color={LIME} fog={false} />
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
      <sphereGeometry args={[0.32, 16, 16]} />
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
      <ResponsiveFov baseFov={48} />
      <DriftingCamera />
    </>
  );
}

export default function LightCourtScene() {
  return (
    <Canvas
      dpr={1}
      gl={{ antialias: false, alpha: false }}
      camera={{ fov: 48, position: [0, 4.1, 8.2] }}
      className="!absolute inset-0"
    >
      <Scene />
    </Canvas>
  );
}
