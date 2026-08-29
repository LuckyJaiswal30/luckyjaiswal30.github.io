import { ogContentType, ogSize, renderOgImage } from "@/lib/og-image";
import { blogIndexCopy } from "@/lib/page-copy";
import { siteName } from "@/lib/site";

export const alt = `Blog · ${siteName}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function BlogOpengraphImage() {
  return renderOgImage({
    eyebrow: `${siteName} / Blog`,
    title: blogIndexCopy.description,
  });
}
