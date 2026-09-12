"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  BRAND_600,
  BRAND_700,
  CourtLines,
  Net,
  ResponsiveFov,
  createCourtTexture,
  createTennisBallTexture,
} from "@/components/three/courtParts";

const COURT_GREEN = "#2c8a52";

/** Deterministic pseudo-random in [0, 1) from an integer seed. Placing
 * palms needs per-tree variation, but calling Math.random() during render
 * is impure (flagged by react-hooks/purity) and would reshuffle the whole
 * treeline on every re-render anyway -- this gives stable, varied-looking
 * placement instead. */
function seededRandom(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/** Warm sunset sky -- Miami Open plays on courts backed by exactly this
 * kind of dusk gradient. A soft radial glow stands in for the low sun near
 * the horizon. Solid gradient, no repeating detail, so nothing to shimmer
 * under camera motion. */
function createSunsetSkyTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const sky = ctx.createLinearGradient(0, 0, 0, size);
  sky.addColorStop(0, "#3a2c63");
  sky.addColorStop(0.4, "#9b4f82");
  sky.addColorStop(0.72, "#ff7e5f");
  sky.addColorStop(1, "#ffd28f");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, size, size);

  const glow = ctx.createRadialGradient(
    size / 2,
    size * 0.74,
    0,
    size / 2,
    size * 0.74,
    size * 0.4
  );
  glow.addColorStop(0, "rgba(255, 230, 180, 0.9)");
  glow.addColorStop(1, "rgba(255, 230, 180, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** A stylized leaning palm: a tilted trunk with a fan of frond "blades"
 * (elongated cones) radiating from the top. Solid colors, no texture, so
 * there's nothing to shimmer or crawl as the camera moves (unlike the
 * crowd texture this replaces), and it's cheaper to render besides. */
function PalmTree({
  position,
  scale,
  lean,
  hue,
}: {
  position: [number, number, number];
  scale: number;
  lean: number;
  hue: string;
}) {
  const trunkHeight = 1.9;
  const fronds = 6;

  return (
    <group position={position} scale={scale} rotation={[0, 0, lean]}>
      <mesh position={[0, trunkHeight / 2, 0]}>
        <cylinderGeometry args={[0.07, 0.13, trunkHeight, 6]} />
        <meshStandardMaterial color="#8a6a45" roughness={0.9} />
      </mesh>
      <group position={[0, trunkHeight, 0]}>
        {Array.from({ length: fronds }).map((_, i) => (
          <mesh key={i} rotation={[Math.PI / 2.5, 0, (i / fronds) * Math.PI * 2]}>
            <coneGeometry args={[0.13, 1.15, 4]} />
            <meshStandardMaterial color={hue} roughness={0.8} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/** A palm treeline standing where the stadium stands used to be -- calmer
 * to look at, on-theme for a real tournament (Miami Open), and with no
 * repeating texture pattern to alias under motion. */
function TreeLine() {
  const halfWidth = 6.5;
  const halfDepth = 12;
  const gap = 3;
  const hues = [BRAND_600, BRAND_700];

  const trees = useMemo(() => {
    const list: { position: [number, number, number]; scale: number; lean: number; hue: string }[] =
      [];
    let seed = 0;

    const place = (position: [number, number, number]) => {
      seed += 1;
      list.push({
        position,
        scale: 0.85 + seededRandom(seed) * 0.35,
        lean: (seededRandom(seed + 0.5) - 0.5) * 0.35,
        hue: hues[Math.floor(seededRandom(seed + 0.25) * hues.length)],
      });
    };

    for (let i = -3; i <= 3; i++) {
      place([i * 2.4 + (seededRandom(i + 10) - 0.5) * 0.6, 0, -(halfDepth + gap)]);
    }
    for (let i = -4; i <= 4; i++) {
      place([halfWidth + gap, 0, i * 2.6 + (seededRandom(i + 20) - 0.5) * 0.6]);
      place([-(halfWidth + gap), 0, i * 2.6 + (seededRandom(i + 30) - 0.5) * 0.6]);
    }
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <group>
      {trees.map((t, i) => (
        <PalmTree key={i} position={t.position} scale={t.scale} lean={t.lean} hue={t.hue} />
      ))}
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
  const skyTexture = useMemo(() => createSunsetSkyTexture(), []);

  return (
    <>
      <primitive attach="background" object={skyTexture} />
      <fog attach="fog" args={["#e59b7a", 12, 26]} />
      <ambientLight intensity={1.05} color="#ffe7cf" />
      <directionalLight position={[5, 10, 6]} intensity={1.3} color="#ffddb0" />
      <directionalLight position={[-6, 5, -4]} intensity={0.3} color={BRAND_600} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[13, 24]} />
        <meshStandardMaterial map={courtTexture} roughness={0.9} />
      </mesh>

      <CourtLines color="#ffffff" />
      <Net />
      <TreeLine />
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
