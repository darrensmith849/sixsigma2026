/**
 * Open Graph image template for Next.js's `next/og` ImageResponse.
 *
 * Returns the JSX content + size constants — each route's
 * `opengraph-image.tsx` wraps this in an `ImageResponse`. AI engines
 * (ChatGPT, Perplexity, Claude) display OG images in citation cards;
 * a per-route image substantially improves click-through and recall over
 * a single static og-image.jpg.
 *
 * No custom fonts — system sans-serif renders predictably across the edge
 * runtime without the extra bytes / latency of font fetches.
 */
import type { ReactElement } from "react";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png" as const;

export interface OgCardProps {
  title: string;
  /** One-line context: course mode, city, role, etc. */
  subtitle?: string;
  /** Eyebrow text — small uppercase label above the title. */
  eyebrow?: string;
  /** Brand wordmark / footer line. */
  brand?: string;
  /** Optional accreditation chip text e.g. "CSSC Accredited · USA". */
  badge?: string;
  /** Hex colours — override per brand. */
  background?: string;
  accent?: string;
  textColor?: string;
  /** Optional logo absolute URL — must be fetchable from the edge runtime. */
  logoUrl?: string;
}

export function OgCard(props: OgCardProps): ReactElement {
  const bg = props.background ?? "#14532d"; // green-900
  const accent = props.accent ?? "#22c55e"; // green-500
  const fg = props.textColor ?? "#ffffff";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: bg,
        position: "relative",
        color: fg,
        padding: "80px",
        fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Accent stripe — top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "8px",
          background: accent,
          display: "flex",
        }}
      />

      {/* Dot grid background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.12) 1.5px, transparent 1.5px)",
          backgroundSize: "32px 32px",
          opacity: 0.6,
          display: "flex",
        }}
      />

      {/* Content stack */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          {props.eyebrow && (
            <div
              style={{
                fontSize: 24,
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: accent,
                marginBottom: 32,
                display: "flex",
              }}
            >
              {props.eyebrow}
            </div>
          )}
          <div
            style={{
              fontSize: props.title.length > 60 ? 64 : 84,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              marginBottom: props.subtitle ? 32 : 0,
              display: "flex",
              maxWidth: "950px",
            }}
          >
            {props.title}
          </div>
          {props.subtitle && (
            <div
              style={{
                fontSize: 32,
                color: "rgba(255,255,255,0.82)",
                lineHeight: 1.35,
                display: "flex",
                maxWidth: "900px",
              }}
            >
              {props.subtitle}
            </div>
          )}
        </div>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: "-0.01em",
              display: "flex",
            }}
          >
            {props.brand ?? "Six Sigma South Africa"}
          </div>
          {props.badge && (
            <div
              style={{
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: fg,
                padding: "14px 22px",
                borderRadius: 999,
                border: `2px solid ${accent}`,
                display: "flex",
              }}
            >
              {props.badge}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
