"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

/**
 * `attribute="class"` puts `.dark` on <html> from a blocking script, before
 * first paint, which is what lets the token palette in globals.css and the
 * `dark:` variant resolve correctly without a hydration flash.
 */
export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
