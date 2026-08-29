import { ogContentType, ogSize, renderOgImage } from "@/lib/og-image";
import { siteName } from "@/lib/site";

export const alt = `Blog · ${siteName}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function BlogOpengraphImage() {
  return renderOgImage({
    eyebrow: `${siteName} / Blog`,
    title:
      "Bugs I've chased, things I've learned, and whatever else felt worth writing down.",
  });
}
