import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MAG CORE — THE CORE™";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          color: "white",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            letterSpacing: "-0.05em",
            display: "flex",
          }}
        >
          MAG CORE — THE CORE™
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 24,
            letterSpacing: "0.2em",
            color: "#FF0033",
            display: "flex",
          }}
        >
          V19 BLACK EDITION | MAG CORE OS — Core Lock V08
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 18,
            letterSpacing: "0.3em",
            color: "#1A1A1A",
            display: "flex",
          }}
        >
          7 ONDES • CORE ACTIF • DIAMANT PUR
        </div>
      </div>
    ),
    { ...size }
  );
}
