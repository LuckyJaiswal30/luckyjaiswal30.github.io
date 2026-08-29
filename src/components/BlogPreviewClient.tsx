"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import PostRow from "@/components/blog/PostRow";
import {
  fadeInUp,
  sectionViewport,
  staggerContainer,
  transition,
} from "@/lib/animations";
import type { Post } from "@/lib/blog-utils";

export default function BlogPreviewClient({ posts }: { posts: Post[] }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      className="grid gap-10"
    >
      <motion.div
        variants={fadeInUp}
        transition={transition}
        className="flex flex-wrap items-end justify-between gap-6"
      >
        <div className="max-w-xl">
          <h2 className="text-4xl font-semibold tracking-[-0.05em] text-[color:var(--foreground)] sm:text-5xl">
            From the Blog
          </h2>
          <p className="mt-3 text-sm text-[color:var(--muted)]">
            Things I run into while learning, written down before I forget them.
          </p>
        </div>
        <Link
          href="/blog"
          className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium uppercase tracking-[0.22em] text-[color:var(--muted)] transition-colors duration-300 hover:text-[color:var(--foreground)]"
        >
          Read the Blog
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
          />
        </Link>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        transition={transition}
        className="border-b border-[color:var(--border)]"
      >
        {posts.map((post) => (
          <PostRow key={post.slug} post={post} variant="compact" />
        ))}
      </motion.div>
    </motion.div>
  );
}
