import { ogContentType, ogSize, renderOgImage } from "@/lib/og-image";
import { siteDescription, siteName } from "@/lib/site";

export const alt = `${siteName} · ${siteDescription}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: siteName,
    title: siteDescription,
    footer: "Portfolio, projects and writing",
  });
}
