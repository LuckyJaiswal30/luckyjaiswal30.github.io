import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { GitHubIcon } from "@/components/BrandIcons";
import type { Project } from "@/lib/projects";

function hueFromTitle(title: string): number {
  const sum = [...title].reduce((total, char) => total + char.charCodeAt(0), 0);
  return sum % 360 || 200;
}

function CoverFallback({ title }: { title: string }) {
  const hue = hueFromTitle(title);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 120% at 20% 10%, hsl(${hue} 70% 45% / 0.35), transparent 60%), radial-gradient(120% 120% at 90% 90%, hsl(${
            (hue + 60) % 360
          } 70% 50% / 0.25), transparent 55%)`,
        }}
      />
      <span
        aria-hidden="true"
        className="absolute bottom-3 left-5 select-none text-[5.5rem] font-semibold leading-none tracking-[-0.08em] transition-transform duration-500 group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-y-0"
        style={{
          color: "color-mix(in srgb, var(--foreground) 11%, transparent)",
        }}
      >
        LJ
      </span>
    </div>
  );
}

function ComingSoonCover() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[color:var(--surface-strong)]">
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

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border transition-all duration-300 hover:-translate-y-1 motion-reduce:hover:translate-y-0 border-[color:var(--border)] bg-[color:var(--surface)] ${
        isInProgress ? "border-dashed" : ""
      }`}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[color:var(--border)]">
        {isInProgress ? (
          <ComingSoonCover />
        ) : project.image ? (

          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
          />
        ) : (
          <CoverFallback title={project.title} />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="flex flex-wrap items-center gap-x-2 text-xs uppercase tracking-[0.22em] text-[color:var(--muted-soft)]">
          {project.status}
          <span aria-hidden="true">·</span>
          {project.year}
        </p>

        <Heading className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[color:var(--foreground)]">
          {/* The link is stretched over the whole card by the absolute span,
              so the title stays the accessible name for the whole target. */}
          <Link href={`/projects/${project.slug}`} className="static">
            <span className="absolute inset-0" />
            {project.title}
          </Link>
        </Heading>

        <p className="mt-2.5 text-[0.95rem] leading-relaxed text-[color:var(--muted)]">
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

        <div className="mt-6 flex items-center gap-3 border-t pt-5 border-[color:var(--border)]">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--foreground)]">
            Details
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
            />
          </span>

          {project.githubUrl ? (

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
              className="relative z-10 ml-auto inline-flex h-9 w-9 items-center justify-center rounded-full text-[color:var(--muted)] transition-colors duration-300 hover:bg-[color:var(--surface-strong)] hover:text-[color:var(--foreground)]"
            >
              <GitHubIcon className="h-[1.1rem] w-[1.1rem]" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
