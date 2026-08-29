import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/**
 * One card design shared by every route's `opengraph-image`, so a link preview
 * looks the same wherever it is shared from.
 *
 * Deliberately fixed to the dark palette rather than theme-aware: this renders
 * once at build time into a PNG, and the person seeing it is in someone else's
 * chat window, not on the site.
 */
export function renderOgImage({
  eyebrow,
  title,
  footer,
}: {
  eyebrow: string;
  title: string;
  footer?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#fafafa",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            textTransform: "uppercase",
            letterSpacing: 8,
            color: "#a3a3a3",
          }}
        >
          {eyebrow}
        </div>

        <div
          style={{
            display: "flex",
            maxWidth: 1000,
            // Long titles drop a size so they still fit the card rather than
            // overflowing it.
            fontSize: title.length > 52 ? 60 : 74,
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: -2,
          }}
        >
          {title}
        </div>

        <div style={{ display: "flex", fontSize: 24, color: "#a3a3a3" }}>
          {footer ?? ""}
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
