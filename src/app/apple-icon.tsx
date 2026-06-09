import { ImageResponse } from "next/og";

/** Apple touch icon — AD monogram on near-black, generated at build/edge. */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0A0B",
          color: "#F5F5F3",
          fontSize: 84,
          fontWeight: 700,
          letterSpacing: "-4px",
        }}
      >
        AD
      </div>
    ),
    { ...size },
  );
}
