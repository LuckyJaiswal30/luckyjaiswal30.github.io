"use client";

import { motion } from "motion/react";
import {
  fadeInUp,
  sectionViewport,
  staggerContainer,
  transition,
} from "@/lib/animations";

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 px-6 py-24 sm:px-10 lg:px-16 xl:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="grid gap-10 lg:grid-cols-12"
        >
          <motion.div
            variants={fadeInUp}
            transition={transition}
            className="lg:col-span-4"
          >
            <p className="text-sm uppercase tracking-[0.34em] text-[color:var(--muted)]">
              About
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[color:var(--foreground)] sm:text-4xl">
              Trying to actually understand the things I build.
            </h2>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            transition={transition}
            className="lg:col-span-8"
          >
            <div className="max-w-3xl space-y-6 text-lg leading-8 text-[color:var(--muted)]">
              <p>
                I&apos;m in my second year of Computer Science (AI) at BBD
                University in Lucknow. My days are mostly split between C++ and
                data structures for coursework, and JavaScript, React and
                Node.js for everything else. Full-stack is where I want to end
                up.
              </p>
              <p>
                I build things until I understand them, and I&apos;m honest
                about the parts I still don&apos;t. This site started as one of
                those and turned into something I keep coming back to.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
