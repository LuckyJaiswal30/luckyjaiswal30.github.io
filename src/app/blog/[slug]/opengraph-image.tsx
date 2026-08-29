import { getPost, getRoutableSlugs, isRoutable } from "@/lib/blog";
import { formatDate } from "@/lib/blog-utils";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og-image";
import { siteName } from "@/lib/site";

export const alt = `Blog post · ${siteName}`;
export const size = ogSize;
export const contentType = ogContentType;

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getRoutableSlugs();
  return slugs.map((slug) => ({ slug }));
}

// `params` is a Promise in Next 16, in line with the other async request APIs.
export default async function PostOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // getPost rather than a find() over getAllPosts: that listing excludes
  // drafts, so a draft previewed under `next dev` would silently fall back to
  // the generic card while its page rendered the real title.
  const post = await getPost(slug);
  const usable = post && isRoutable(post) ? post : null;

  return renderOgImage({
    eyebrow: `${siteName} / Blog`,
    title: usable?.meta.title ?? "Blog",
    footer: usable
      ? `${formatDate(usable.meta.date)}  ·  ${usable.readingTime} min read`
      : undefined,
  });
}
