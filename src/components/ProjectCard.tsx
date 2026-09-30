import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { GitHubIcon } from "@/components/BrandIcons";
import ProjectImage, { projectImageFrame } from "@/components/ProjectImage";
import type { Project } from "@/lib/projects";

function ComingSoonCover() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[color:var(--surface-strong)]">
      <span className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted-soft)]">
        Coming soon
      </span>
    </div>
  );
}

export default function ProjectCard({
  project,
  headingLevel = 3,
}: {
  project: Project;
  headingLevel?: 2 | 3;
}) {
  const isInProgress = project.status === "In Progress";
  const Heading = `h${headingLevel}` as const;
  const headingId = `project-${project.slug}`;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border transition-colors duration-300 border-[color:var(--border)] bg-[color:var(--surface)] hover:border-[color:var(--muted-soft)] hover:bg-[color:var(--surface-strong)]">
      <div
        className={`relative w-full overflow-hidden border-b border-[color:var(--border)] ${projectImageFrame(project)}`}
      >
        {isInProgress ? (
          <ComingSoonCover />
        ) : (
          <ProjectImage
            project={project}
            sizes="(min-width: 1024px) 560px, (min-width: 640px) 50vw, 100vw"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <Heading
          id={headingId}
          className="text-2xl font-semibold leading-tight tracking-[-0.035em] text-[color:var(--foreground)] sm:text-[1.7rem]"
        >
          {project.title}
        </Heading>

        <p className="mt-2 flex flex-wrap items-center gap-x-2 text-xs uppercase tracking-[0.22em] text-[color:var(--muted-soft)]">
          {project.status}
          <span aria-hidden="true">·</span>
          {project.year}
        </p>

        <p className="mt-3 text-[0.95rem] leading-relaxed text-[color:var(--muted)]">
          {project.description}
        </p>

        {project.highlight ? (
          <p className="mt-3 text-[0.95rem] leading-relaxed text-[color:var(--foreground)]">
            {project.highlight}
          </p>
        ) : null}

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border px-2.5 py-1 text-xs text-[color:var(--muted)] border-[color:var(--border)]"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="flex-1" />

        <div className="mt-6 flex items-center gap-3 border-t pt-5 border-[color:var(--border)]">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--foreground)]">
            Details
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4"
            />
          </span>

          <div className="relative z-10 ml-auto flex items-center gap-1">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.title} (opens in a new tab)`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[color:var(--muted)] transition-colors duration-300 hover:bg-[color:var(--surface-strong)] hover:text-[color:var(--foreground)]"
              >
                <ExternalLink
                  aria-hidden="true"
                  className="h-[1.05rem] w-[1.05rem]"
                />
              </a>
            ) : null}

            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} on GitHub (opens in a new tab)`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[color:var(--muted)] transition-colors duration-300 hover:bg-[color:var(--surface-strong)] hover:text-[color:var(--foreground)]"
              >
                <GitHubIcon className="h-[1.1rem] w-[1.1rem]" />
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <Link
        href={`/projects/${project.slug}`}
        aria-labelledby={headingId}
        className="absolute inset-0"
      />
    </article>
  );
}
