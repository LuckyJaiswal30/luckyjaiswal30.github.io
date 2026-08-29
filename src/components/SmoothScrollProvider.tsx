"use client";

import Lenis from "lenis";
// Ships the `lenis-stopped` overflow rule that makes stop() actually hold.
import "lenis/dist/lenis.css";
import {
  createContext,
  use,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type SmoothScrollContextValue = {
  /** Scroll to an element or selector, honouring its CSS `scroll-margin-top`. */
  scrollTo: (target: string | HTMLElement) => void;
  /** Pause/resume wheel and touch scrolling, for modal-style overlays. */
  stop: () => void;
  start: () => void;
};

const noop = () => {};

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  scrollTo: noop,
  stop: noop,
  start: noop,
});

export function useSmoothScroll() {
  return use(SmoothScrollContext);
}

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function resolveElement(target: string | HTMLElement): HTMLElement | null {
  if (target instanceof HTMLElement) {
    return target;
  }
  const found = document.querySelector(target);
  return found instanceof HTMLElement ? found : null;
}

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  // Built once, via a lazy initialiser. Every function closes over `lenisRef`
  // and nothing else, so the context value never changes identity and consumers
  // are not re-rendered — or their effects re-run — just because this provider
  // rendered again. `useState` rather than a ref because reading a ref during
  // render is unsafe under concurrent rendering, and rather than `useMemo`
  // because only lazy initial state is guaranteed to run exactly once.
  const [api] = useState<SmoothScrollContextValue>(() => ({
    scrollTo: (target) => {
      const element = resolveElement(target);
      if (!element) {
        return;
      }

      const lenis = lenisRef.current;

      if (!lenis) {
        // No Lenis means reduced motion is on, so jump rather than glide.
        // `scroll-margin-top` is applied by the browser here.
        element.scrollIntoView({ behavior: "auto", block: "start" });
        return;
      }

      // Lenis positions the element at the very top and ignores scroll-margin,
      // so feed it the element's own value. That keeps the offset defined once,
      // in the section's `scroll-mt-*` class, instead of duplicating a pixel
      // count here that would silently drift from the CSS.
      const scrollMargin =
        Number.parseFloat(getComputedStyle(element).scrollMarginTop) || 0;

      lenis.scrollTo(element, { offset: -scrollMargin, duration: 1.2 });
    },
    // Lenis drives scrolling from JS, so `overflow: hidden` on the body does
    // not hold it. Overlays have to pause the instance itself.
    stop: () => lenisRef.current?.stop(),
    start: () => lenisRef.current?.start(),
  }));

  useEffect(() => {
    const media = window.matchMedia(reducedMotionQuery);

    let frame = 0;

    const destroy = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };

    // Smooth scrolling is a motion effect, so it is switched off entirely when
    // the visitor asks for reduced motion rather than merely shortened. Bound
    // to the media query so toggling the OS setting takes effect immediately.
    const sync = () => {
      if (media.matches) {
        destroy();
        return;
      }

      if (lenisRef.current) {
        return;
      }

      const lenis = new Lenis({
        duration: 1.1,
        smoothWheel: true,
        syncTouch: false,
      });
      lenisRef.current = lenis;

      const raf = (time: number) => {
        lenis.raf(time);
        frame = window.requestAnimationFrame(raf);
      };
      frame = window.requestAnimationFrame(raf);
    };

    sync();
    media.addEventListener("change", sync);

    return () => {
      media.removeEventListener("change", sync);
      destroy();
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={api}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
