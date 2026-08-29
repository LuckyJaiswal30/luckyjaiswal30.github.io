import type { Metadata } from "next";
import BackLink from "@/components/BackLink";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";
import { siteName, siteUrl } from "@/lib/site";

const description = "Everything I've built, with notes on how each one went.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    title: `Projects · ${siteName}`,
    description,
    url: `${siteUrl}/projects`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Projects · ${siteName}`,
    description,
  },
};

export default function ProjectsIndexPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="relative overflow-x-clip bg-[color:var(--background)]"
    >
      <section className="scroll-mt-24 px-6 pb-24 pt-32 sm:px-10 lg:px-16 xl:px-20">
        <div className="mx-auto max-w-6xl">
          <BackLink href="/" label="Home" />

          <h1 className="mt-6 max-w-2xl text-4xl font-semibold tracking-[-0.05em] text-[color:var(--foreground)] sm:text-5xl">
            All Projects
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-[color:var(--muted)] sm:text-lg">
            Everything I&apos;ve built, with notes on how each one went.
          </p>

          <div
            className={`mt-16 grid gap-6 ${
              projects.length > 1
                ? "sm:grid-cols-2 lg:grid-cols-3"
                : "sm:max-w-xl"
            }`}
          >
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
