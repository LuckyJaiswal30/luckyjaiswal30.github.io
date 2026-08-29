"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { useSmoothScroll } from "@/components/SmoothScrollProvider";
import ThemeToggle from "@/components/ThemeToggle";
import { pickActiveSection, type SectionRect } from "@/lib/active-section";

type NavItem = {
  label: string;
  href: string;
  /**
   * The homepage section this entry corresponds to, for entries whose href is
   * a route. Projects and Blog both have a full page *and* a homepage section:
   * the link goes to the page, and this is what the scroll tracker watches so
   * the entry still lights up as you pass the section.
   */
  section?: string;
};

/**
 * Projects and Blog are routes, not anchors. Both have a real page listing
 * everything, and sending one to a page while the other only scrolled to a
 * teaser was an inconsistency you could feel: the same click did two different
 * things depending on which word you picked.
 */
const navigation: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "/projects", section: "#projects" },
  { label: "Blog", href: "/blog", section: "#blog-preview" },
  { label: "Contact", href: "#contact" },
];

const isAnchor = (item: NavItem) => item.href.startsWith("#");

/**
 * Every nav entry that has something to track on the homepage, paired with the
 * selector to measure. Anchors track themselves; routes track their section.
 */
const trackedSections: { href: string; selector: string }[] = navigation.flatMap(
  (item) => {
    const selector = isAnchor(item) ? item.href : item.section;
    return selector ? [{ href: item.href, selector }] : [];
  },
);

/** Which `navigation` entry a non-home route corresponds to. */
function navHrefForPath(pathname: string): string {
  if (pathname.startsWith("/blog")) return "/blog";
  if (pathname.startsWith("/projects")) return "/projects";
  return "";
}

function clearHash() {
  const { pathname, search } = window.location;
  window.history.replaceState(null, "", pathname + search);
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolledHref, setScrolledHref] = useState<string>("#home");
  const { scrollTo, stop, start } = useSmoothScroll();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const drawerRef = useRef<HTMLElement | null>(null);

  const activeHref = isHome ? scrolledHref : navHrefForPath(pathname);

  // Track which section the reader is in. The measuring happens here; the
  // choice itself lives in pickActiveSection, where it can be tested.
  useEffect(() => {
    if (!isHome) {
      return;
    }

    const elements = trackedSections
      .map(({ href, selector }) => {
        const element = document.querySelector<HTMLElement>(selector);
        return element ? { href, element } : null;
      })
      .filter((entry) => entry !== null);

    let frame = 0;

    const updateActive = () => {
      const measured: SectionRect[] = elements.map(({ href, element }) => {
        const rect = element.getBoundingClientRect();
        return { href, top: rect.top, height: rect.height };
      });

      const active = pickActiveSection(
        measured,
        window.scrollY,
        window.innerHeight,
      );

      if (active) {
        setScrolledHref(active);
      }
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateActive);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [isHome]);

  // Homepage only: elsewhere a hash is a table-of-contents anchor the reader
  // chose, and clearing it would break "copy link to this heading". Deferred a
  // frame so the browser's own jump happens first.
  useEffect(() => {
    if (!isHome) {
      return;
    }

    let frame = 0;

    const clearAfterJump = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        if (window.location.hash) {
          clearHash();
        }
      });
    };

    clearAfterJump();
    window.addEventListener("hashchange", clearAfterJump);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", clearAfterJump);
    };
  }, [isHome]);

  // Everything the open drawer owns: the scroll lock, Escape, and keeping focus
  // inside it. A drawer that covers the page but leaves focus behind it is
  // navigable only by sighted mouse users.
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    // Both are needed: `overflow` covers native scrolling, `stop()` covers
    // Lenis, which scrolls from JS and ignores the CSS entirely.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    stop();

    const returnFocusTo = document.activeElement as HTMLElement | null;

    const focusable = () =>
      Array.from(
        drawerRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        ) ?? [],
      );

    focusable()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const items = focusable();
      if (items.length === 0) {
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      start();
      document.removeEventListener("keydown", onKeyDown);
      returnFocusTo?.focus();
    };
  }, [isOpen, stop, start]);

  const hrefFor = (item: NavItem) =>
    isAnchor(item) && !isHome ? `/${item.href}` : item.href;

  const handleNavigate = (
    event: MouseEvent<HTMLAnchorElement>,
    item: NavItem,
  ) => {
    if (isAnchor(item) && isHome) {
      event.preventDefault();
      setScrolledHref(item.href);
      // Resume first: the open drawer has Lenis stopped, and a stopped
      // instance drops scrollTo silently. The effect cleanup calls start()
      // again when the drawer unmounts, which is harmless.
      start();
      scrollTo(item.href);
    }

    setIsOpen(false);
  };

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-4 z-60 flex items-start justify-center px-4">
        <div className="hidden md:flex md:w-full md:justify-center">
          <nav
            aria-label="Primary"
            className="glass pointer-events-auto flex items-center gap-2 rounded-full px-3 py-2"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={hrefFor(item)}
                onClick={(event) => handleNavigate(event, item)}
                aria-current={activeHref === item.href ? "location" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  activeHref === item.href
                    ? "bg-[color:var(--surface-strong)] text-[color:var(--foreground)]"
                    : "text-[color:var(--muted)] hover:bg-[color:var(--surface-strong)] hover:text-[color:var(--foreground)]"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <ThemeToggle />
          </nav>
        </div>

        <div className="flex w-full justify-end md:hidden">
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((open) => !open)}
            className="glass pointer-events-auto inline-flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300"
          >
            <span className="sr-only">
              {isOpen ? "Close navigation" : "Open navigation"}
            </span>
            <span aria-hidden="true" className="flex flex-col gap-1.5">
              <span
                className={`h-px w-5 bg-[color:var(--foreground)] transition-all duration-300 ${
                  isOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-5 bg-[color:var(--foreground)] transition-all duration-300 ${
                  isOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-px w-5 bg-[color:var(--foreground)] transition-all duration-300 ${
                  isOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <>
            <motion.div
              aria-hidden="true"
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.aside
              ref={drawerRef}
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed right-0 top-0 z-50 flex h-full w-[18rem] flex-col gap-8 border-l px-6 py-24 md:hidden border-[color:var(--border)]"
              style={{
                background:
                  "color-mix(in srgb, var(--background) 88%, transparent)",
              }}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm uppercase tracking-[0.28em] text-[color:var(--muted)]">
                  Navigation
                </p>
                <ThemeToggle />
              </div>

              <nav aria-label="Primary" className="flex flex-col gap-2">
                {navigation.map((item) => (
                  <motion.a
                    key={item.href}
                    href={hrefFor(item)}
                    whileTap={{ scale: 0.97 }}
                    onClick={(event) => handleNavigate(event, item)}
                    aria-current={
                      activeHref === item.href ? "location" : undefined
                    }
                    className={`rounded-full border px-4 py-3 text-sm uppercase tracking-[0.24em] transition-all duration-300 ${
                      activeHref === item.href
                        ? "border-transparent bg-[color:var(--surface-strong)] text-[color:var(--foreground)]"
                        : "border-[color:var(--border)] text-[color:var(--muted)] hover:bg-[color:var(--surface)] hover:text-[color:var(--foreground)]"
                    }`}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
