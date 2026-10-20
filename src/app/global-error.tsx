"use client";

import * as Sentry from "@sentry/nextjs";
/**
 * Root error page — fires only if the root layout itself breaks. It has to
 * stand alone, so it carries its own <html> and <body>.
 */

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  Sentry.captureException(error);
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#fff1d4",
          color: "#171310",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            This page did not load.
          </h1>
          {error.digest ? (
            <p style={{ fontSize: "0.8rem", color: "#6b6257" }}>
              Reference: {error.digest}
            </p>
          ) : null}
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "1rem",
              padding: "0.6rem 1.4rem",
              border: "none",
              borderRadius: 999,
              background: "#f4510b",
              color: "#fff6e6",
              fontWeight: 700,
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
