"use client";

import { motion, useScroll } from "motion/react";

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
