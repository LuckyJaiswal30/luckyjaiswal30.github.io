"use client";

import { ArrowRight } from "lucide-react";
import * as m from "motion/react-m";
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
      className="scroll-mt-24 px-6 py-16 lg:py-20 sm:px-10 lg:px-16 xl:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="grid gap-10"
        >
          <m.div
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
              className="group -my-2 inline-flex shrink-0 items-center gap-2 py-2 text-sm font-medium uppercase tracking-[0.22em] text-[color:var(--muted)] transition-colors duration-300 hover:text-[color:var(--foreground)]"
            >
              All Projects
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
              />
            </Link>
          </m.div>

          <div
            className={`grid gap-6 ${
              featuredProjects.length > 1 ? "sm:grid-cols-2" : "sm:max-w-xl"
            }`}
          >
            {featuredProjects.map((project) => (
              <m.div
                key={project.slug}
                variants={fadeInUp}
                transition={transition}
              >
                <ProjectCard project={project} />
              </m.div>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
}
