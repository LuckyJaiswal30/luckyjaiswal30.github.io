import type { Metadata } from "next";
import BackLink from "@/components/BackLink";
import BlogExplorer from "@/components/blog/BlogExplorer";
import Footer from "@/components/Footer";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { siteName, siteUrl } from "@/lib/site";

const description =
  "Bugs I've chased, things I've learned, and whatever else felt worth writing down.";

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    title: `Blog · ${siteName}`,
    description,
    url: `${siteUrl}/blog`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog · ${siteName}`,
    description,
  },
};

export default async function BlogIndexPage() {
  const [posts, tags] = await Promise.all([getAllPosts(), getAllTags()]);

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
            Blog
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-[color:var(--muted)] sm:text-lg">
            Bugs I&apos;ve chased, things I&apos;ve learned, and whatever else
            felt worth writing down.
          </p>

          <div className="mt-16">
            <BlogExplorer posts={posts} tags={tags} />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
