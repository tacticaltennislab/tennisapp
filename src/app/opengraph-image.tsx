import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/logo-dark.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#192f22",
          color: "#f1f0df",
          fontFamily: "sans-serif",
        }}
      >
        <img src={logoSrc} width={330} height={101} alt="" />
        <div
          style={{
            marginTop: 56,
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: -2,
            maxWidth: 980,
            display: "flex",
          }}
        >
          Build a stronger academy with better analysis of every player.
        </div>
        <div style={{ marginTop: 28, fontSize: 28, color: "#a8a85c", display: "flex", maxWidth: 900 }}>
          Video and match analysis for tennis academies and clubs, from former
          ATP players and ITF Level 2 coaches.
        </div>
      </div>
    ),
    { ...size }
  );
}
