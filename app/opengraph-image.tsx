import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "RiversideHomes.co — Sell Your Home Simple";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
          fontFamily: "sans-serif",
          padding: "60px",
        }}
      >
        {/* Logo area */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "12px",
              background: "#2b8cee",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "28px",
              fontWeight: 800,
            }}
          >
            RH
          </div>
          <div
            style={{
              fontSize: "36px",
              fontWeight: 800,
              color: "white",
              letterSpacing: "-0.5px",
            }}
          >
            RiversideHomes
            <span style={{ color: "#2b8cee" }}>.co</span>
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "52px",
            fontWeight: 900,
            color: "white",
            textAlign: "center",
            lineHeight: 1.2,
            maxWidth: "900px",
            marginBottom: "24px",
          }}
        >
          Selling your Riverside home doesn't have to be complicated.
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "24px",
            color: "#94a3b8",
            textAlign: "center",
          }}
        >
          Simple process. Clear guidance. Real strategy from start to close.
        </div>

        {/* Accent bar */}
        <div
          style={{
            width: "80px",
            height: "4px",
            background: "#2b8cee",
            borderRadius: "2px",
            marginTop: "40px",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
