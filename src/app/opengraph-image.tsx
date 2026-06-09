import { ImageResponse } from "next/og";
import { site } from "@/data/site";

/** Default Open Graph image — on-brand, generated at build/edge. */
export const alt = site.defaultTitle;
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
          justifyContent: "space-between",
          background: "#0A0A0B",
          color: "#F5F5F3",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: monogram + eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid rgba(245,245,243,0.18)",
              borderRadius: 12,
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "-1px",
            }}
          >
            AD
          </div>
          <div
            style={{
              fontSize: 22,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#8A8A8F",
            }}
          >
            Ankit Dubey
          </div>
        </div>

        {/* Middle: headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 72,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-2px",
              maxWidth: 1000,
            }}
          >
            <span>Software Developer&nbsp;</span>
            <span style={{ color: "#E5484D" }}>&nbsp;&&nbsp;</span>
            <span>Product Builder</span>
          </div>
          <div style={{ fontSize: 28, color: "#8A8A8F", maxWidth: 900 }}>
            SaaS platforms, AI-powered tools, web, mobile & interactive products.
          </div>
        </div>

        {/* Bottom: domain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 22,
            color: "#5A5A60",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#E5484D",
            }}
          />
          ankit.motoflexing.com
        </div>
      </div>
    ),
    { ...size },
  );
}
