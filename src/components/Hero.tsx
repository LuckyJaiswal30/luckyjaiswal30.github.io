"use client";

import { motion, useScroll, useTransform } from "motion/react";
import type { MouseEvent } from "react";
import { useSmoothScroll } from "@/components/SmoothScrollProvider";
import { fadeInUp, transition } from "@/lib/animations";

const techLabels = [
  { name: "React", top: "18%", right: "8%", delay: 0.2, duration: 13, drift: 2 },
  { name: "Next.js", top: "37%", right: "30%", delay: 0.8, duration: 15, drift: -2 },
  { name: "Tailwind", top: "56%", right: "12%", delay: 1.4, duration: 14, drift: 3 },
  { name: "TypeScript", top: "74%", right: "26%", delay: 2, duration: 16, drift: -3 },
];

const threadPaths = [
  { d: "M318 92 C294 110 266 136 240 166", delay: 0, duration: 8 },
  { d: "M240 166 C268 190 286 220 304 250", delay: 0.9, duration: 9 },
  { d: "M304 250 C286 274 271 302 252 330", delay: 1.8, duration: 8.5 },
];

const sparkNodes = [
  { left: "72%", top: "21%", delay: 0.4 },
  { left: "57%", top: "37%", delay: 1.6 },
  { left: "65%", top: "56%", delay: 2.5 },
];

const INFINITE = Number.POSITIVE_INFINITY;

export default function Hero() {
  const { scrollTo } = useSmoothScroll();

  const { scrollYProgress } = useScroll();
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.35], [0.5, 0.16]);
  const rightGlowOpacity = useTransform(scrollYProgress, [0, 0.4], [0.58, 0.34]);

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
      className="relative scroll-mt-24 overflow-hidden px-6 pb-20 pt-32 sm:px-10 lg:px-16 xl:px-20"
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          aria-hidden="true"
          className="absolute left-[12%] top-[16%] h-56 w-56 rounded-full blur-[140px]"
          style={{
            y: glowY,
            opacity: glowOpacity,
            background:
              "radial-gradient(circle, var(--glow-accent) 0%, transparent 72%)",
          }}
        />
      </div>

      <div className="mx-auto grid min-h-[calc(100vh-9rem)] max-w-6xl items-center gap-16 lg:grid-cols-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={transition}
          className="relative lg:col-span-7"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.08 }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border py-2 pl-3.5 pr-4 text-xs font-medium uppercase tracking-[0.22em] text-[color:var(--muted)] border-[color:var(--border)] bg-[color:var(--surface)]"
          >
            <span className="relative flex h-2 w-2 shrink-0">
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
          </motion.div>

          <h1 className="max-w-xl text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-[color:var(--foreground)] sm:text-5xl lg:text-[4.1rem]">
            Hey, I&apos;m Lucky Jaiswal.
          </h1>

          <p className="mt-4 max-w-2xl text-2xl font-medium leading-[1.15] tracking-[-0.03em] text-[color:var(--foreground)]/90 sm:text-3xl">
            Second-year CS student, working my way into full-stack development.
          </p>

          <p className="mt-5 max-w-lg text-base leading-7 text-[color:var(--muted)] sm:text-lg">
            Most days it&apos;s C++ and data structures. The rest of the time
            I&apos;m building things with React, Next.js, and Node.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              onClick={(event) => handleHeroNavigate(event, "#projects")}
              className="rounded-full border px-6 py-3 text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)] transition-all duration-300 hover:bg-[color:var(--surface-strong)] border-[color:var(--border)] bg-[color:var(--surface)]"
            >
              Projects
            </a>
            <a
              href="#contact"
              onClick={(event) => handleHeroNavigate(event, "#contact")}
              className="rounded-full border px-6 py-3 text-sm uppercase tracking-[0.24em] text-[color:var(--muted)] transition-all duration-300 hover:text-[color:var(--foreground)] border-[color:var(--border)]"
            >
              Contact
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...transition, delay: 0.14 }}
          className="relative hidden lg:col-span-5 lg:block"
          aria-hidden="true"
        >
          <div className="relative ml-auto h-[28rem] w-[24rem]">
            <motion.div
              className="absolute inset-[-4%] rounded-[2.6rem] blur-[108px]"
              style={{
                y: orbY,
                opacity: rightGlowOpacity,
                background:
                  "radial-gradient(74% 66% at 66% 38%, color-mix(in srgb, var(--foreground) 20%, transparent) 0%, color-mix(in srgb, var(--glow-accent) 74%, transparent) 42%, transparent 78%)",
              }}
            />

            <motion.svg
              viewBox="0 0 384 448"
              className="absolute inset-0 h-full w-full"
              style={{ y: glowY, opacity: 0.86 }}
            >
              {threadPaths.map((thread) => (
                <g key={thread.d}>
                  <path
                    d={thread.d}
                    pathLength={1}
                    fill="none"
                    stroke="color-mix(in srgb, var(--border) 86%, transparent)"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <motion.path
                    d={thread.d}
                    pathLength={1}
                    fill="none"
                    stroke="color-mix(in srgb, var(--glow-accent) 82%, var(--foreground) 18%)"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="0.18 0.82"
                    animate={{
                      strokeDashoffset: [0, -1],
                      opacity: [0.2, 0.72, 0.2],
                    }}
                    transition={{
                      duration: thread.duration,
                      delay: thread.delay,
                      repeat: INFINITE,
                      ease: "linear",
                    }}
                  />
                </g>
              ))}
            </motion.svg>

            {sparkNodes.map((spark) => (
              <motion.span
                key={`${spark.left}-${spark.top}`}
                className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  left: spark.left,
                  top: spark.top,
                  background:
                    "color-mix(in srgb, var(--glow-accent) 86%, var(--foreground) 14%)",
                  boxShadow:
                    "0 0 0 1px color-mix(in srgb, var(--background) 70%, transparent), 0 0 10px color-mix(in srgb, var(--glow-accent) 65%, transparent)",
                }}
                animate={{
                  opacity: [0, 0, 0.9, 0, 0],
                  scale: [0.85, 0.85, 1.2, 0.85, 0.85],
                }}
                transition={{
                  duration: 4.6,
                  delay: spark.delay,
                  repeat: INFINITE,
                  ease: "easeInOut",
                }}
              />
            ))}

            {techLabels.map((label) => (
              <motion.span
                key={label.name}
                className="absolute rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.2em]"
                style={{
                  top: label.top,
                  right: label.right,
                  borderColor:
                    "color-mix(in srgb, var(--border) 92%, transparent)",
                  background:
                    "color-mix(in srgb, var(--surface-strong) 80%, transparent)",
                  color: "color-mix(in srgb, var(--foreground) 72%, transparent)",
                  opacity: 0.84,
                }}
                animate={{ y: [-3, 3, -3], x: [0, label.drift, 0] }}
                transition={{
                  duration: label.duration,
                  delay: label.delay,
                  repeat: INFINITE,
                  ease: "easeInOut",
                }}
              >
                {label.name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
