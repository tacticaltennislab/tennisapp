"use client";

import * as THREE from "three";

export const BRAND_600 = "#1b7a45";
export const BRAND_700 = "#145c34";
export const BRAND_900 = "#0c3820";
export const LIME = "#d3f234";

/** Procedural acrylic hard-court surface: base color + paint grain, roller
 * bands, and a soft vignette so it reads as a real painted surface instead
 * of a flat color fill. */
export function createCourtTexture(baseColor: string): THREE.CanvasTexture {
  const w = 520;
  const h = 960;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, w, h);

  for (let i = 0; i < 9000; i++) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    ctx.fillStyle = Math.random() > 0.5 ? "rgba(255,255,255,0.035)" : "rgba(0,0,0,0.045)";
    ctx.beginPath();
    ctx.arc(x, y, Math.random() * 1.4 + 0.3, 0, Math.PI * 2);
    ctx.fill();
  }

  for (let i = 0; i < 14; i++) {
    const y = Math.random() * h;
    const bandHeight = 6 + Math.random() * 14;
    ctx.fillStyle = Math.random() > 0.5 ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.025)";
    ctx.fillRect(0, y, w, bandHeight);
  }

  const vignette = ctx.createRadialGradient(w / 2, h / 2, h * 0.25, w / 2, h / 2, h * 0.72);
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(1, "rgba(0,0,0,0.18)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, w, h);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

/** Procedural tennis-ball texture: optic-yellow felt speckle plus the two
 * curved seam bands, so the floating ball reads as a real ball instead of a
 * plain colored sphere. */
export function createTennisBallTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#d7e83f";
  ctx.fillRect(0, 0, size, size);

  for (let i = 0; i < 4000; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    ctx.fillStyle = Math.random() > 0.5 ? "rgba(255,255,255,0.10)" : "rgba(60,80,0,0.10)";
    ctx.beginPath();
    ctx.arc(x, y, Math.random() * 1.1 + 0.25, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.strokeStyle = "#f8fbe9";
  ctx.lineWidth = size * 0.035;
  ctx.lineCap = "round";
  const amp = size * 0.17;

  // Two wavy bands that kiss tangentially rather than crossing through the
  // middle, closer to how a real seam reads at a glance.
  for (const center of [size * 0.32, size * 0.68]) {
    const sign = center < size / 2 ? 1 : -1;
    ctx.beginPath();
    for (let x = 0; x <= size; x++) {
      const y = center + sign * Math.sin((x / size) * Math.PI * 2) * amp;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

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
