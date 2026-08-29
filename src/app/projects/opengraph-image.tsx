import { ogContentType, ogSize, renderOgImage } from "@/lib/og-image";
import { siteName } from "@/lib/site";

export const alt = `Projects · ${siteName}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function ProjectsOpengraphImage() {
  return renderOgImage({
    eyebrow: `${siteName} / Projects`,
    title: "Everything so far, including the parts that aren't finished.",
  });
}
