"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300 hover:bg-[color:var(--surface-strong)] border-[color:var(--border)]"
    >
      <span className="sr-only dark:hidden">Switch to dark mode</span>
      <span className="sr-only hidden dark:inline">Switch to light mode</span>

      <Sun
        aria-hidden="true"
        strokeWidth={1.8}
        className="absolute h-4 w-4 rotate-0 scale-100 opacity-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none dark:-rotate-90 dark:scale-50 dark:opacity-0"
      />
      <Moon
        aria-hidden="true"
        strokeWidth={1.8}
        className="absolute h-4 w-4 rotate-90 scale-50 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none dark:rotate-0 dark:scale-100 dark:opacity-100"
      />
    </button>
  );
}
