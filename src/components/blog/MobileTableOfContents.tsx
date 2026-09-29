import { ChevronDown } from "lucide-react";
import type { TocEntry } from "@/lib/blog-utils";

export default function MobileTableOfContents({ toc }: { toc: TocEntry[] }) {
  if (toc.length === 0) {
    return null;
  }

  return (
    <details className="group rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] lg:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[11px] font-medium uppercase tracking-[0.24em] text-[color:var(--muted)] [&::-webkit-details-marker]:hidden">
        On this page
        <ChevronDown
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-300 group-open:rotate-180 motion-reduce:transition-none"
        />
      </summary>

      <nav aria-label="Table of contents" className="px-5 pb-4">
        <ul className="flex flex-col border-l border-[color:var(--border)]">
          {toc.map((entry) => (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                className={`-ml-px block border-l-2 border-transparent py-2 text-sm leading-snug text-[color:var(--muted)] transition-colors duration-300 hover:border-[color:var(--foreground)] hover:text-[color:var(--foreground)] ${
                  entry.level === 3 ? "pl-7" : "pl-4"
                }`}
              >
                {entry.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}
