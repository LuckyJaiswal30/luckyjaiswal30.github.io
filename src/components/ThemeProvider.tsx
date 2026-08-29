"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

/**
 * `attribute="class"` puts `.dark` on <html> from a blocking script, before
 * first paint, which is what lets the token palette in globals.css and the
 * `dark:` variant resolve correctly without a hydration flash.
 *
 * `disableTransitionOnChange` is deliberately *not* set. It injects a
 * stylesheet suppressing every transition while the class flips, which is what
 * made switching themes a jump cut. The colour cross-fade now lives in
 * globals.css, and it is disabled under prefers-reduced-motion there.
 */
export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
    >
      {children}
    </NextThemesProvider>
  );
}
