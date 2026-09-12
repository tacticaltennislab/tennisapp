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

/** One tier's worth of crowd: a short, wide strip of packed, mottled
 * spectator dots plus aisle dividers, meant to be tiled onto each riser of
 * a real stepped stand rather than stretched across a single flat plane. */
function createCrowdRowTexture(baseColor: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 40;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

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

  const dots = 46;
  for (let i = 0; i < dots; i++) {
    const x = (i / dots) * canvas.width + (Math.random() - 0.5) * 4;
    const y = canvas.height * 0.55 + (Math.random() - 0.5) * canvas.height * 0.5;
    const radius = 2 + Math.random() * 1.4;
    ctx.globalAlpha = 0.7 + Math.random() * 0.3;
    ctx.fillStyle = palette[Math.floor(Math.random() * palette.length)];
    ctx.beginPath();
    ctx.ellipse(x, y, radius, radius * 1.3, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // aisle dividers, like real stadium seating sections
  const aisles = 10;
  ctx.fillStyle = baseColor;
  for (let i = 1; i < aisles; i++) {
    ctx.fillRect((i / aisles) * canvas.width - 1.5, 0, 3, canvas.height);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(8, 1);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** A real stepped stand: a short run of stacked, staggered boxes rising
 * away from the court, instead of one flat textured plane. This gives it
 * actual depth and parallax as the camera moves -- a flat plane always
 * looks flat no matter how good its texture is. Kept to a handful of tiers
 * (a few dozen triangles total) since this sits behind an already-animated
 * scene and shouldn't add meaningful GPU cost. */
function TieredStand({
  axis,
  sign,
  length,
  baseOffset,
  texture,
  trimColor,
}: {
  axis: "x" | "z";
  sign: 1 | -1;
  length: number;
  baseOffset: number;
  texture: THREE.Texture;
  trimColor: string;
}) {
  const tiers = 6;
  const rise = 0.65;
  const run = 0.85;
  const depth = 0.45;

  return (
    <group>
      {Array.from({ length: tiers }).map((_, i) => {
        const dist = baseOffset + i * run;
        const y = i * rise + rise / 2;
        const position: [number, number, number] =
          axis === "z" ? [0, y, sign * dist] : [sign * dist, y, 0];
        const size: [number, number, number] =
          axis === "z" ? [length, rise, depth] : [depth, rise, length];
        return (
          <mesh key={i} position={position}>
            <boxGeometry args={size} />
            <meshBasicMaterial map={texture} fog />
          </mesh>
        );
      })}

      {/* bright accent trim along the top of the highest tier */}
      <mesh
        position={
          axis === "z"
            ? [0, tiers * rise + 0.05, sign * (baseOffset + (tiers - 1) * run)]
            : [sign * (baseOffset + (tiers - 1) * run), tiers * rise + 0.05, 0]
        }
      >
        <boxGeometry args={axis === "z" ? [length, 0.15, 0.05] : [0.05, 0.15, length]} />
        <meshBasicMaterial color={trimColor} fog={false} />
      </mesh>
    </group>
  );
}

function Stadium() {
  const crowdTexture = useMemo(() => createCrowdRowTexture(BRAND_900), []);

  const halfWidth = 6.5;
  const halfDepth = 12;
  const gap = 2.5;

  return (
    <group>
      <TieredStand
        axis="z"
        sign={-1}
        length={halfWidth * 2 + gap * 2}
        baseOffset={halfDepth + gap}
        texture={crowdTexture}
        trimColor={LIME}
      />
      <TieredStand
        axis="x"
        sign={1}
        length={halfDepth * 2 + gap * 2}
        baseOffset={halfWidth + gap}
        texture={crowdTexture}
        trimColor={LIME}
      />
      <TieredStand
        axis="x"
        sign={-1}
        length={halfDepth * 2 + gap * 2}
        baseOffset={halfWidth + gap}
        texture={crowdTexture}
        trimColor={LIME}
      />
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
