import { ogContentType, ogSize, renderOgImage } from "@/lib/og-image";
import { projects } from "@/lib/projects";
import { siteName } from "@/lib/site";

export const alt = `Project · ${siteName}`;
export const size = ogSize;
export const contentType = ogContentType;

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  return renderOgImage({
    eyebrow: `${siteName} / Projects`,
    title: project?.title ?? "Projects",
    footer: project ? project.stack.join("  ·  ") : undefined,
  });
}
