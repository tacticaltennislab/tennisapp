"use client";

import * as THREE from "three";

export const BRAND_600 = "#1b7a45";
export const BRAND_900 = "#0c3820";
export const LIME = "#d3f234";

export function CourtLines({ color = "#eef7f0" }: { color?: string }) {
  const lineMat = <meshStandardMaterial color={color} roughness={0.8} />;
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

export function Net() {
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
