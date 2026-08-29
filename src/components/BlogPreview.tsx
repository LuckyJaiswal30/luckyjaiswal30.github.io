import BlogPreviewClient from "@/components/BlogPreviewClient";
import { getAllPosts } from "@/lib/blog";

export default async function BlogPreview() {
  const posts = (await getAllPosts()).slice(0, 3);

  if (posts.length === 0) {
    return null;
  }

  return (
    <section
      id="blog-preview"
      className="scroll-mt-24 px-6 py-24 sm:px-10 lg:px-16 xl:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <BlogPreviewClient posts={posts} />
      </div>
    </section>
  );
}
