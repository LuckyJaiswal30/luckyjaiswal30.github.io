import type { Transition, Variants } from "motion/react";

export const transition: Transition = {
  duration: 0.72,
  ease: [0.22, 1, 0.36, 1],
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.06,
    },
  },
};

export const sectionViewport = {
  once: true,
  amount: 0.2,
} as const;
