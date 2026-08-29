"use client";

import { motion, useScroll } from "motion/react";

/**
 * Thin fill across the top of the viewport tracking how far through the
 * document the reader is.
 *
 * Driven by a motion value rather than React state. The old version called
 * setState from a scroll listener, which re-rendered the component on every
 * scroll frame to change one CSS percentage; `scrollYProgress` writes straight
 * to the DOM and React never renders again after mount. At progress 0 the
 * transform collapses the bar to nothing, so it needs no separate hiding rule.
 */
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: scrollYProgress }}
      className="pointer-events-none fixed inset-x-0 top-0 z-70 h-[2px] origin-left bg-[color:var(--foreground)] opacity-90"
    />
  );
}
