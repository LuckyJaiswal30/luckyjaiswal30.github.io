"use client";

import * as m from "motion/react-m";
import Link from "next/link";
import type { MouseEvent } from "react";
import { useSmoothScroll } from "@/components/SmoothScrollProvider";
import { transition } from "@/lib/animations";

export default function Hero() {
  const { scrollTo } = useSmoothScroll();

  const handleHeroNavigate = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    event.preventDefault();
    scrollTo(href);
  };

  return (
    <section
      id="home"
      className="relative scroll-mt-24 px-6 pb-20 pt-32 sm:px-10 lg:px-16 xl:px-20"
    >
      {/* The name and intro render visible from the first paint; fading them
          in held back the largest paint until the JavaScript had loaded. */}
      <div className="mx-auto flex min-h-[calc(100svh-9rem)] max-w-3xl flex-col items-center justify-center text-center">
        <m.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.08 }}
          className="mb-7 inline-flex items-center gap-2.5 rounded-full border py-2 pl-3.5 pr-4 text-xs font-medium uppercase tracking-[0.22em] text-[color:var(--muted)] border-[color:var(--border)] bg-[color:var(--surface)]"
        >
          <span aria-hidden="true" className="relative flex h-2 w-2 shrink-0">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
              style={{ background: "var(--foreground)" }}
            />
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{ background: "var(--foreground)" }}
            />
          </span>
          Open to internships
        </m.p>

        <h1 className="text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-[color:var(--foreground)] sm:text-6xl lg:text-7xl">
          Hey, I&apos;m Lucky Jaiswal.
        </h1>

        <p className="mt-6 max-w-2xl text-xl font-medium leading-[1.25] tracking-[-0.02em] text-[color:var(--foreground)]/90 sm:text-2xl">
          Second-year CS student, working my way into full-stack development.
        </p>

        <p className="mt-5 max-w-xl text-base leading-7 text-[color:var(--muted)] sm:text-lg">
          Most days it&apos;s C++ and data structures. The rest of the time
          I&apos;m building things with React, Next.js, and Node.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/projects"
            className="rounded-full border px-6 py-3 text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)] transition-all duration-300 hover:bg-[color:var(--surface-strong)] border-[color:var(--border)] bg-[color:var(--surface)]"
          >
            Projects
          </Link>
          <a
            href="#contact"
            onClick={(event) => handleHeroNavigate(event, "#contact")}
            className="rounded-full border px-6 py-3 text-sm uppercase tracking-[0.24em] text-[color:var(--muted)] transition-all duration-300 hover:text-[color:var(--foreground)] border-[color:var(--border)]"
          >
            Contact
          </a>
        </div>
      </div>
    </section>
  );
}
