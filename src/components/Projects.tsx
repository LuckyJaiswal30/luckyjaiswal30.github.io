"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import {
  fadeInUp,
  sectionViewport,
  staggerContainer,
  transition,
} from "@/lib/animations";
import { featuredProjects } from "@/lib/projects";

export default function Projects() {
  if (featuredProjects.length === 0) {
    return null;
  }

  return (
    <section
      id="projects"
      className="scroll-mt-24 px-6 py-24 sm:px-10 lg:px-16 xl:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="grid gap-14"
        >
          <motion.div
            variants={fadeInUp}
            transition={transition}
            className="flex flex-wrap items-end justify-between gap-6"
          >
            <div className="max-w-xl">
              <h2 className="text-4xl font-semibold tracking-[-0.05em] text-[color:var(--foreground)] sm:text-5xl">
                Projects
              </h2>
              <p className="mt-3 text-sm text-[color:var(--muted)]">
                Things I&apos;ve built, and what building them taught me.
              </p>
            </div>
            <Link
              href="/projects"
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium uppercase tracking-[0.22em] text-[color:var(--muted)] transition-colors duration-300 hover:text-[color:var(--foreground)]"
            >
              All Projects
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
              />
            </Link>
          </motion.div>

          <div
            className={`grid gap-6 ${
              featuredProjects.length > 1 ? "sm:grid-cols-2" : "sm:max-w-xl"
            }`}
          >
            {featuredProjects.map((project) => (
              <motion.div
                key={project.slug}
                variants={fadeInUp}
                transition={transition}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
