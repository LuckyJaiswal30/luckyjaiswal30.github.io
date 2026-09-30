import { getImageProps } from "next/image";
import ProjectCover from "@/components/ProjectCover";
import type { Project } from "@/lib/projects";

// Wide covers are 16:10 with the title set small beside the screens, which
// shrinks past reading on a phone. Phones get a square version with the title
// on top instead. The frame's aspect ratio must switch at the same breakpoint,
// so the parent uses `projectImageFrame(project)`.
const PHONE_MAX = "(max-width: 639px)";
// Both the card and the project page sit inside the 24px side gutters.
const PHONE_SIZES = "calc(100vw - 48px)";

export function projectImageFrame(project: Project): string {
  return project.imageSquare ? "aspect-square sm:aspect-[16/10]" : "aspect-[16/10]";
}

export default function ProjectImage({
  project,
  sizes,
  alt = "",
  priority = false,
}: {
  project: Project;
  sizes: string;
  alt?: string;
  priority?: boolean;
}) {
  if (!project.image) {
    return <ProjectCover />;
  }

  // getImageProps only makes a priority image eager; the fetch hint has to be
  // passed through by hand or the cover queues behind scripts.
  const common = {
    alt,
    priority,
    fetchPriority: priority ? ("high" as const) : undefined,
    className: "absolute inset-0 h-full w-full object-cover",
  };
  const {
    props: { srcSet: wideSrcSet, ...img },
  } = getImageProps({ ...common, src: project.image, width: 2000, height: 1250, sizes });

  if (!project.imageSquare) {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...img} srcSet={wideSrcSet} />;
  }

  const {
    props: { srcSet: squareSrcSet },
  } = getImageProps({ ...common, src: project.imageSquare, width: 1200, height: 1200, sizes: PHONE_SIZES });

  return (
    <picture>
      <source media={PHONE_MAX} srcSet={squareSrcSet} sizes={PHONE_SIZES} />
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img {...img} srcSet={wideSrcSet} />
    </picture>
  );
}
