import type { Transition, Variants } from "motion/react";

/** The site's one easing curve, so sections feel like the same document. */
export const transition: Transition = {
  duration: 0.72,
  ease: [0.22, 1, 0.36, 1],
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Put this on the element that wraps a group of `fadeInUp` children. Motion
 * propagates the `hidden`/`visible` label down regardless, so children still
 * animate without it — they just all arrive at once, which is the difference
 * between a section that unfolds and one that pops.
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.06,
    },
  },
};

/** Replays when a section is scrolled back to, rather than firing once. */
export const sectionViewport = {
  once: false,
  amount: 0.2,
} as const;
