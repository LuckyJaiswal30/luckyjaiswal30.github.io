"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

/**
 * Which icon and label apply is decided in CSS from the `.dark` class that
 * next-themes sets before first paint, not from React state. That keeps a real
 * button in the server-rendered markup — focusable and labelled on the first
 * frame — instead of the placeholder a mount gate leaves behind, and it cannot
 * produce a hydration mismatch because React never renders the difference.
 *
 * `resolvedTheme` is still read in the click handler, which only ever runs
 * after hydration, so it is reliably defined there.
 */
export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 hover:bg-[color:var(--surface-strong)] border-[color:var(--border)]"
    >
      <span className="sr-only dark:hidden">Switch to dark mode</span>
      <span className="sr-only hidden dark:inline">Switch to light mode</span>

      <Sun aria-hidden="true" className="block h-4 w-4 dark:hidden" strokeWidth={1.8} />
      <Moon aria-hidden="true" className="hidden h-4 w-4 dark:block" strokeWidth={1.8} />
    </button>
  );
}
