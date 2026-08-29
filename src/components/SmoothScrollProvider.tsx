"use client";

import Lenis from "lenis";
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
  scrollTo: (target: string | HTMLElement) => void;

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

  const [api] = useState<SmoothScrollContextValue>(() => ({
    scrollTo: (target) => {
      const element = resolveElement(target);
      if (!element) {
        return;
      }

      const lenis = lenisRef.current;

      if (!lenis) {
        element.scrollIntoView({ behavior: "auto", block: "start" });
        return;
      }

      const scrollMargin =
        Number.parseFloat(getComputedStyle(element).scrollMarginTop) || 0;

      lenis.scrollTo(element, { offset: -scrollMargin, duration: 1.2 });
    },

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
