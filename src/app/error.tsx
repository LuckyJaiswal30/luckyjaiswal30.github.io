"use client";

import Link from "next/link";
import { useEffect } from "react";

/**
 * Catches render errors in any route below the root layout. The layout itself
 * still renders, so the nav and theme survive. `global-error.tsx` covers the
 * case where the layout is what broke.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Nothing is wired up to receive this yet, but a swallowed error is worse
    // than a noisy one. Replace with a real reporter when there is one.
    console.error("Route error:", error);
  }, [error]);

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="relative flex min-h-screen items-center bg-[color:var(--background)] px-6 pb-24 pt-36 sm:px-10 lg:px-16 xl:px-20"
    >
      <div className="mx-auto w-full max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-[color:var(--muted-soft)]">
          Something broke
        </p>

        <h1 className="mt-6 text-[2rem] font-semibold leading-[1.06] tracking-[-0.045em] text-[color:var(--foreground)] sm:text-[3.25rem]">
          This page didn&apos;t load.
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-[color:var(--muted)]">
          An error stopped this page from rendering. Trying again sometimes
          works, and if it doesn&apos;t, the rest of the site still does.
        </p>

        {error.digest ? (
          <p className="mt-6 font-mono text-xs text-[color:var(--muted-soft)]">
            Reference: {error.digest}
          </p>
        ) : null}

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="rounded-full border px-6 py-3 text-sm uppercase tracking-[0.24em] transition-all duration-300 hover:brightness-110 border-[color:var(--border)] bg-[color:var(--capsule-bg)] text-[color:var(--capsule-fg)]"
          >
            Try again
          </button>

          <Link
            href="/"
            className="rounded-full border px-6 py-3 text-sm uppercase tracking-[0.24em] text-[color:var(--muted)] transition-all duration-300 hover:text-[color:var(--foreground)] border-[color:var(--border)]"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
