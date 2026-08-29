"use client";

import { useEffect, useState } from "react";
import type { TocEntry } from "@/lib/blog-utils";

export default function TableOfContents({ toc }: { toc: TocEntry[] }) {
  const [active, setActive] = useState<string>(toc[0]?.id ?? "");

  useEffect(() => {
    if (toc.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      // Top margin clears the fixed nav; the large bottom margin means a
      // heading counts as "current" only once it reaches the upper third,
      // rather than the moment it appears at the bottom of the screen.
      { rootMargin: "-96px 0px -70% 0px", threshold: [0, 1] },
    );

    for (const { id } of toc) {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    }

    return () => observer.disconnect();
  }, [toc]);

  if (toc.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Table of contents">
      <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[color:var(--muted-soft)]">
        On this page
      </p>

      <ul className="mt-5 flex flex-col border-l border-[color:var(--border)]">
        {toc.map((entry) => {
          const isActive = active === entry.id;

          return (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`-ml-px block border-l-2 py-2 text-[0.8rem] leading-snug transition-colors duration-300 ${
                  entry.level === 3 ? "pl-7" : "pl-5"
                } ${
                  isActive
                    ? "border-[color:var(--foreground)] font-medium text-[color:var(--foreground)]"
                    : "border-transparent text-[color:var(--muted)]"
                }`}
              >
                {entry.text}
              </a>
            </li>
          );
        })}
      </ul>

      <a
        href="#main-content"
        className="mt-6 inline-block text-[10px] font-medium uppercase tracking-[0.24em] text-[color:var(--muted-soft)] transition-colors duration-300 hover:text-[color:var(--foreground)]"
      >
        Back to top
      </a>
    </nav>
  );
}
