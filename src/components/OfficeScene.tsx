"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BRAND_600, BRAND_700, LIME, createTennisBallTexture } from "@/components/three/courtParts";

const WHITE = "#ffffff";
const DESK = "#c9a876";
const DESK_DARK = "#a9865c";

function DriftingCamera() {
  const t0 = useRef<number | null>(null);

  useFrame((state, delta) => {
    if (t0.current === null) {
      t0.current = Math.random() * 100;
    }
    t0.current += delta;
    const t = t0.current;
    state.camera.position.x = Math.sin(t * 0.07) * 1.8 - 0.4;
    state.camera.position.y = 8.4 + Math.sin(t * 0.05) * 0.35;
    state.camera.position.z = 9.2 + Math.cos(t * 0.06) * 1.1;
    state.camera.lookAt(0, 0.3, 0);
  });

  return null;
}

function Laptop() {
  return (
    <group position={[-5.2, 0, -0.6]} rotation={[0, 0.35, 0]} scale={1.6}>
      {/* base */}
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[1.6, 0.08, 1.1]} />
        <meshStandardMaterial color="#dcdcdc" roughness={0.5} metalness={0.2} />
      </mesh>
      {/* screen */}
      <group position={[0, 0.1, -0.5]} rotation={[-0.35, 0, 0]}>
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[1.6, 1.15, 0.06]} />
          <meshStandardMaterial color="#dcdcdc" roughness={0.5} metalness={0.2} />
        </mesh>
        {/* lit display showing a mini court diagram */}
        <mesh position={[0, 0.6, 0.035]}>
          <planeGeometry args={[1.42, 0.98]} />
          <meshStandardMaterial color={BRAND_700} emissive={BRAND_600} emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0, 0.6, 0.037]}>
          <planeGeometry args={[1.0, 0.06]} />
          <meshStandardMaterial color="#eef7f0" emissive="#eef7f0" emissiveIntensity={0.4} />
        </mesh>
        <mesh position={[0, 0.42, 0.037]}>
          <planeGeometry args={[0.7, 0.05]} />
          <meshStandardMaterial color="#eef7f0" emissive="#eef7f0" emissiveIntensity={0.4} />
        </mesh>
        <mesh position={[0, 0.6, 0.037]} rotation={[0, 0, Math.PI / 2]}>
          <planeGeometry args={[0.6, 0.045]} />
          <meshStandardMaterial color={LIME} emissive={LIME} emissiveIntensity={0.5} />
        </mesh>
      </group>
    </group>
  );
}

function Notebook() {
  return (
    <group position={[5.0, 0.05, 0.9]} rotation={[0, -0.3, 0]} scale={1.6}>
      <mesh>
        <boxGeometry args={[0.85, 0.05, 1.1]} />
        <meshStandardMaterial color="#f5f2ea" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.026, -0.42]}>
        <boxGeometry args={[0.85, 0.01, 0.22]} />
        <meshStandardMaterial color={BRAND_600} roughness={0.8} />
      </mesh>
      {/* pen */}
      <mesh position={[0.15, 0.05, 0.1]} rotation={[0, 0.4, Math.PI / 2 - 0.15]}>
        <cylinderGeometry args={[0.018, 0.018, 0.75, 10]} />
        <meshStandardMaterial color="#222222" roughness={0.4} metalness={0.4} />
      </mesh>
    </group>
  );
}

function Mug() {
  return (
    <group position={[5.6, 0.16, -1.0]} scale={1.6}>
      <mesh>
        <cylinderGeometry args={[0.16, 0.14, 0.3, 20]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} />
      </mesh>
      <mesh position={[0.19, 0, 0]}>
        <torusGeometry args={[0.09, 0.025, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.14, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.02, 20]} />
        <meshStandardMaterial color="#3a2418" roughness={0.6} />
      </mesh>
    </group>
  );
}

function DeskBall() {
  const ref = useRef<THREE.Mesh>(null);
  const texture = useMemo(() => createTennisBallTexture(), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * 0.6;
      ref.current.rotation.x = 0.3;
    }
  });

  return (
    <mesh ref={ref} position={[-4.6, 0.29, 1.3]}>
      <sphereGeometry args={[0.32, 24, 24]} />
      <meshStandardMaterial map={texture} roughness={0.9} />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={[WHITE]} />
      <fog attach="fog" args={[WHITE, 9, 18]} />
      <ambientLight intensity={1.15} color="#fffaf0" />
      <directionalLight position={[3, 6, 4]} intensity={1.3} color="#fff6e0" />
      <directionalLight position={[-4, 3, -3]} intensity={0.3} color={BRAND_600} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[16, 12]} />
        <meshStandardMaterial color={DESK} roughness={0.85} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]}>
        <ringGeometry args={[5.2, 7, 4]} />
        <meshStandardMaterial color={DESK_DARK} roughness={0.9} />
      </mesh>

      <Laptop />
      <Notebook />
      <Mug />
      <DeskBall />
      <DriftingCamera />
    </>
  );
}

export default function OfficeScene() {
  return (
    <Canvas
      dpr={1}
      gl={{ antialias: true, alpha: false }}
      camera={{ fov: 46, position: [0, 8.4, 9.2] }}
      className="!absolute inset-0"
    >
      <Scene />
    </Canvas>
  );
}
