import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BackLink from "@/components/BackLink";
import Footer from "@/components/Footer";
import { projects } from "@/lib/projects";
import { siteUrl } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.description,
      url: `${siteUrl}/projects/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="relative overflow-x-clip bg-[color:var(--background)]"
    >
      <section className="scroll-mt-24 px-6 pb-24 pt-32 sm:px-10 lg:px-16 xl:px-20">
        <div className="mx-auto max-w-3xl">
          <BackLink href="/projects" label="All projects" />

          <p className="mt-8 flex flex-wrap items-center gap-x-2 text-xs uppercase tracking-[0.26em] text-[color:var(--muted-soft)]">
            {project.status}
            <span aria-hidden="true">·</span>
            {project.year}
          </p>

          <h1 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-[color:var(--foreground)] sm:text-5xl">
            {project.title}
          </h1>

          <p className="mt-6 text-lg leading-8 text-[color:var(--muted)]">
            {project.longDescription ?? project.description}
          </p>

          {project.highlight ? (
            <p className="mt-6 border-l-2 pl-5 text-lg leading-8 text-[color:var(--foreground)] border-[color:var(--foreground)]">
              {project.highlight}
            </p>
          ) : null}

          <p className="mt-8 text-xs uppercase tracking-[0.22em] text-[color:var(--muted-soft)]">
            {project.stack.join(" / ")}
          </p>

          {project.liveUrl || project.githubUrl ? (
            <div className="mt-8 flex items-center gap-6 text-sm">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-transparent pb-1 text-[color:var(--foreground)] transition-all duration-300 hover:border-current"
                >
                  View Project
                </a>
              ) : null}
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-transparent pb-1 text-[color:var(--muted)] transition-all duration-300 hover:border-current hover:text-[color:var(--foreground)]"
                >
                  GitHub
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>

      <Footer />
    </main>
  );
}
