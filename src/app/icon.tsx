import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          background: "#1b7a45",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path
            d="M1.5 12c3.2-2.5 6.8-2.5 10.5 0s7.3 2.5 10.5 0M1.5 12c3.2 2.5 6.8 2.5 10.5 0s7.3-2.5 10.5 0"
            stroke="#cfeddc"
            strokeWidth="1.4"
            fill="none"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
