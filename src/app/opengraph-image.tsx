import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          background: "linear-gradient(135deg, #0f2e1e 0%, #173f2a 55%, #0c3820 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "#1b7a45",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
              <path
                d="M1.5 12c3.2-2.5 6.8-2.5 10.5 0s7.3 2.5 10.5 0M1.5 12c3.2 2.5 6.8 2.5 10.5 0s7.3-2.5 10.5 0"
                stroke="#cfeddc"
                strokeWidth="1.4"
                fill="none"
              />
            </svg>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, display: "flex" }}>
            Tactical Tennis Lab
          </div>
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 900,
            display: "flex",
          }}
        >
          Train like it&apos;s match point every session.
        </div>
        <div style={{ marginTop: 24, fontSize: 26, color: "#cfeddc", display: "flex", maxWidth: 800 }}>
          Personalized training plans and video coaching from former ATP
          players and ITF Level 2 coaches.
        </div>
      </div>
    ),
    { ...size }
  );
}
