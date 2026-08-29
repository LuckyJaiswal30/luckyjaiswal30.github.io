import { ogContentType, ogSize, renderOgImage } from "@/lib/og-image";
import { projectsIndexCopy } from "@/lib/page-copy";
import { siteName } from "@/lib/site";

export const alt = `Projects · ${siteName}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function ProjectsOpengraphImage() {
  return renderOgImage({
    eyebrow: `${siteName} / Projects`,
    title: projectsIndexCopy.ogTitle,
  });
}
