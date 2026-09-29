import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BackLink from "@/components/BackLink";
import MobileTableOfContents from "@/components/blog/MobileTableOfContents";
import ReadingProgress from "@/components/blog/ReadingProgress";
import TableOfContents from "@/components/blog/TableOfContents";
import Footer from "@/components/Footer";
import { getAllPosts, getPost, getRoutableSlugs, isRoutable } from "@/lib/blog";
import { formatDate, type Post } from "@/lib/blog-utils";
import { serializeJsonLd } from "@/lib/json-ld";
import { siteName, siteUrl } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getRoutableSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post || !isRoutable(post)) {
    return {};
  }

  return {
    title: post.meta.title,
    description: post.meta.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.meta.title,
      description: post.meta.description,
      url: `${siteUrl}/blog/${slug}`,
      publishedTime: post.meta.date,
      authors: [siteName],
      tags: post.meta.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta.title,
      description: post.meta.description,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post || !isRoutable(post)) {
    notFound();
  }

  const { Content } = post;

  const allPosts = await getAllPosts();
  const index = allPosts.findIndex((item) => item.slug === slug);

  const newer = index > 0 ? allPosts[index - 1] : undefined;
  const older = index >= 0 ? allPosts[index + 1] : undefined;

  const hasToc = post.toc.length > 0;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.meta.title,
    description: post.meta.description,
    datePublished: post.meta.date,
    author: { "@type": "Person", name: siteName, url: siteUrl },
    url: `${siteUrl}/blog/${slug}`,
  };

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="relative overflow-x-clip bg-[color:var(--background)]"
    >
      <ReadingProgress />

      <article className="scroll-mt-24 px-6 pb-24 pt-32 sm:px-10 lg:px-16 xl:px-20">
        <div className={`mx-auto ${hasToc ? "max-w-6xl" : "max-w-3xl"}`}>
          <BackLink href="/blog" label="Blog" />

          <header className="mt-12 max-w-3xl">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted-soft)]">
              <time dateTime={post.meta.date}>{formatDate(post.meta.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime} min read</span>
              {post.meta.tags.length > 0 ? (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{post.meta.tags.join(" · ")}</span>
                </>
              ) : null}
            </div>

            <h1 className="mt-6 text-balance text-[2rem] font-semibold leading-[1.06] tracking-[-0.045em] text-[color:var(--foreground)] sm:text-[3.25rem]">
              {post.meta.title}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-[color:var(--muted)] sm:text-xl">
              {post.meta.description}
            </p>
          </header>

          <hr className="mt-14 border-[color:var(--border)]" />

          {hasToc ? (
            <div className="mt-10 max-w-3xl lg:hidden">
              <MobileTableOfContents toc={post.toc} />
            </div>
          ) : null}

          <div
            className={
              hasToc
                ? "mt-14 lg:grid lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-14"
                : "mt-14"
            }
          >
            <div className="min-w-0 max-w-3xl">
              <Content />
            </div>

            {hasToc ? (
              <aside className="hidden lg:block">
                <div className="sticky top-28">
                  <TableOfContents toc={post.toc} />
                </div>
              </aside>
            ) : null}
          </div>

          {newer || older ? (
            <nav
              aria-label="More posts"
              className="mt-24 max-w-3xl border-t pt-10 border-[color:var(--border)]"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {older ? <AdjacentPost post={older} direction="older" /> : null}
                {newer ? <AdjacentPost post={newer} direction="newer" /> : null}
              </div>
            </nav>
          ) : null}

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
          />
        </div>
      </article>

      <Footer />
    </main>
  );
}

function AdjacentPost({
  post,
  direction,
}: {
  post: Post;
  direction: "newer" | "older";
}) {
  const isOlder = direction === "older";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex flex-col gap-3 rounded-2xl border p-6 transition-colors duration-300 hover:border-[color:var(--foreground)] border-[color:var(--border)] ${
        isOlder ? "" : "sm:col-start-2 sm:items-end sm:text-right"
      }`}
    >
      <span className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.24em] text-[color:var(--muted-soft)]">
        {isOlder ? (
          <ArrowLeft
            aria-hidden="true"
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5 motion-reduce:group-hover:translate-x-0"
            strokeWidth={2}
          />
        ) : null}
        {isOlder ? "Older post" : "Newer post"}
        {isOlder ? null : (
          <ArrowRight
            aria-hidden="true"
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
            strokeWidth={2}
          />
        )}
      </span>

      <span className="text-lg font-semibold leading-snug tracking-[-0.02em] text-[color:var(--foreground)] transition-opacity duration-300 group-hover:opacity-70">
        {post.meta.title}
      </span>
    </Link>
  );
}
