import { ImageResponse } from "next/og";
import { getProjectBySlug, projects } from "@/data/projects";

/** Per-case-study Open Graph image. Static for all known slugs. */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const title = project?.title ?? "Ankit Dubey";
  const description =
    project?.shortDescription ?? "Software Developer & Product Builder";
  const status = project?.status ?? "";
  const category = project?.category ?? "";

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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 22,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#8A8A8F",
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
          {[status, category].filter(Boolean).join("  ·  ")}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 80,
              fontWeight: 600,
              letterSpacing: "-2px",
              lineHeight: 1,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 30, color: "#8A8A8F", maxWidth: 950 }}>
            {description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#5A5A60",
          }}
        >
          <span>ankit.motoflexing.com</span>
          <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid rgba(245,245,243,0.18)",
                borderRadius: 10,
                fontSize: 18,
                fontWeight: 700,
                color: "#F5F5F3",
              }}
            >
              AD
            </span>
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
