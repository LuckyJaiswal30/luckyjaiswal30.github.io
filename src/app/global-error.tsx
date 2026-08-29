"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Root layout error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          background: "#0a0a0a",
          color: "#fafafa",
          colorScheme: "dark",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
          padding: "2rem 1.5rem",
        }}
      >
        <div style={{ margin: "0 auto", width: "100%", maxWidth: "36rem" }}>
          <p
            style={{
              margin: 0,
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.24em",
              color: "#7a7a7a",
            }}
          >
            Something broke
          </p>

          <h1
            style={{
              margin: "1.5rem 0 0",
              fontSize: "2rem",
              lineHeight: 1.06,
              letterSpacing: "-0.045em",
            }}
          >
            The site failed to load.
          </h1>

          <p
            style={{
              margin: "1.5rem 0 0",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              color: "#a3a3a3",
            }}
          >
            Something went wrong before the page could render. Reloading is
            usually the fastest fix.
          </p>

          {error.digest ? (
            <p
              style={{
                margin: "1.5rem 0 0",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize: "0.75rem",
                color: "#7a7a7a",
              }}
            >
              Reference: {error.digest}
            </p>
          ) : null}

          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "2.5rem",
              borderRadius: "9999px",
              border: "1px solid #2a2a2a",
              background: "#ffffff",
              color: "#000000",
              padding: "0.75rem 1.5rem",
              fontSize: "0.875rem",
              textTransform: "uppercase",
              letterSpacing: "0.24em",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
