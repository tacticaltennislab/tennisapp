"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const BRAND_600 = "#1b7a45";
const BRAND_900 = "#0c3820";
const LIME = "#d3f234";
const INK = "#0a120c";

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function CourtLines() {
  const lineMat = <meshStandardMaterial color="#eef7f0" roughness={0.8} />;
  const y = 0.011;

  return (
    <group>
      {/* baselines */}
      <mesh position={[0, y, 9.75]}>
        <boxGeometry args={[9, 0.02, 0.07]} />
        {lineMat}
      </mesh>
      <mesh position={[0, y, -9.75]}>
        <boxGeometry args={[9, 0.02, 0.07]} />
        {lineMat}
      </mesh>
      {/* doubles sidelines */}
      <mesh position={[4.5, y, 0]}>
        <boxGeometry args={[0.07, 0.02, 19.5]} />
        {lineMat}
      </mesh>
      <mesh position={[-4.5, y, 0]}>
        <boxGeometry args={[0.07, 0.02, 19.5]} />
        {lineMat}
      </mesh>
      {/* singles sidelines */}
      <mesh position={[3.375, y, 0]}>
        <boxGeometry args={[0.06, 0.02, 19.5]} />
        {lineMat}
      </mesh>
      <mesh position={[-3.375, y, 0]}>
        <boxGeometry args={[0.06, 0.02, 19.5]} />
        {lineMat}
      </mesh>
      {/* service lines */}
      <mesh position={[0, y, 5.25]}>
        <boxGeometry args={[6.75, 0.02, 0.06]} />
        {lineMat}
      </mesh>
      <mesh position={[0, y, -5.25]}>
        <boxGeometry args={[6.75, 0.02, 0.06]} />
        {lineMat}
      </mesh>
      {/* center service line */}
      <mesh position={[0, y, 0]}>
        <boxGeometry args={[0.06, 0.02, 10.5]} />
        {lineMat}
      </mesh>
    </group>
  );
}

function Net() {
  return (
    <group>
      <mesh position={[0, 0.45, 0]}>
        <planeGeometry args={[9.6, 0.9]} />
        <meshStandardMaterial
          color="#0a0a0a"
          transparent
          opacity={0.75}
          side={THREE.DoubleSide}
          roughness={1}
        />
      </mesh>
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[9.6, 0.05, 0.05]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>
      <mesh position={[4.8, 0.45, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.95, 8]} />
        <meshStandardMaterial color={BRAND_900} />
      </mesh>
      <mesh position={[-4.8, 0.45, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.95, 8]} />
        <meshStandardMaterial color={BRAND_900} />
      </mesh>
    </group>
  );
}

function FloatingBall() {
  const ref = useRef<THREE.Mesh>(null);

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
      <sphereGeometry args={[0.34, 32, 32]} />
      <meshStandardMaterial color={LIME} roughness={0.5} />
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
  return (
    <>
      <color attach="background" args={[INK]} />
      <fog attach="fog" args={[INK, 14, 30]} />
      <ambientLight intensity={0.65} />
      <directionalLight position={[6, 9, 4]} intensity={1.1} color="#eafff0" />
      <directionalLight position={[-6, 4, -6]} intensity={0.25} color={BRAND_600} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[13, 24]} />
        <meshStandardMaterial color={BRAND_900} roughness={0.95} />
      </mesh>

      <CourtLines />
      <Net />
      <FloatingBall />
      <IntroCamera />
    </>
  );
}

export default function Court3DScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false }}
      camera={{ fov: 42, position: [0, 16, 24] }}
      className="!absolute inset-0"
    >
      <Scene />
    </Canvas>
  );
}
