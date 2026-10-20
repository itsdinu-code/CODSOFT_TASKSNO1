"use client";

import Link from "next/link";

/**
 * Error boundary for the site pages. It renders inside the site chrome
 * when a page breaks: one honest card, one way back.
 */

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="field-paper2 section">
      <div className="wrap grid12 gap-y-8">
        <p className="col-span-12 t-small uppercase tracking-[0.3em] text-accent-deep">
          The kitchen dropped something
        </p>
        <h1 className="display col-span-12 t-display text-ink lg:col-span-7">
          This page did not load.
        </h1>
        <p className="col-span-12 max-w-[48ch] t-body text-ink-2 lg:col-span-5">
          It is us, not your connection. Try again, or step back to the menu.
        </p>
        {error.digest ? (
          <p className="col-span-12 t-small text-muted">
            Reference: {error.digest}
          </p>
        ) : null}
        <div className="col-span-12 flex flex-wrap gap-4">
          <button type="button" onClick={reset} className="btn">
            Try again
          </button>
          <Link href="/menu" className="btn btn-quiet">
            The menu
          </Link>
        </div>
      </div>
    </section>
  );
}
