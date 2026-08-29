import fs from "node:fs";
import path from "node:path";
import type { MDXComponents } from "mdx/types";
import type { ComponentType } from "react";
import type { Post, PostMeta, TocEntry } from "@/lib/blog-utils";

export type { Post, PostMeta, TocEntry } from "@/lib/blog-utils";

type MdxComponentProps = { components?: MDXComponents };

export type PostWithContent = Post & {
  Content: ComponentType<MdxComponentProps>;
};

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function validateMeta(slug: string, value: unknown): PostMeta {
  const where = `src/content/blog/${slug}.mdx`;

  const fail = (problem: string): never => {
    throw new Error(`${where}: ${problem}`);
  };

  if (typeof value !== "object" || value === null) {
    fail("missing an exported `metadata` object");
  }

  const meta = value as Record<string, unknown>;

  const text = (field: "title" | "description"): string => {
    const raw = meta[field];
    if (typeof raw !== "string" || raw.trim() === "") {
      fail(`\`${field}\` must be a non-empty string`);
    }
    return (raw as string).trim();
  };

  const date = meta.date;
  if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    fail(
      `\`date\` must be an ISO calendar day like "2026-08-27", got ${JSON.stringify(date)}`,
    );
  }

  {
    const [year, month, day] = (date as string).split("-").map(Number);
    const parsed = new Date(Date.UTC(year, month - 1, day));
    // A NaN check is not enough: "2026-02-31" parses happily and becomes
    // 3 March. Round-tripping the components is what catches an overflowed day.
    const survivesRoundTrip =
      parsed.getUTCFullYear() === year &&
      parsed.getUTCMonth() === month - 1 &&
      parsed.getUTCDate() === day;

    if (!survivesRoundTrip) {
      fail(`\`date\` is not a real date: ${JSON.stringify(date)}`);
    }
  }

  const tags = meta.tags;
  if (!Array.isArray(tags) || tags.length === 0) {
    fail("`tags` must be a non-empty array of strings");
  }
  if (
    (tags as unknown[]).some((tag) => typeof tag !== "string" || tag.trim() === "")
  ) {
    fail("every entry in `tags` must be a non-empty string");
  }

  for (const flag of ["featured", "draft"] as const) {
    if (meta[flag] !== undefined && typeof meta[flag] !== "boolean") {
      fail(`\`${flag}\` must be true or false if present`);
    }
  }

  return {
    title: text("title"),
    description: text("description"),
    date: date as string,
    tags: (tags as string[]).map((tag) => tag.trim()),
    featured: meta.featured as boolean | undefined,
    draft: meta.draft as boolean | undefined,
  };
}

type PostModule = {
  default: ComponentType<MdxComponentProps>;
  metadata: unknown;
  toc: TocEntry[];
  readingTime: number;
};

async function importPost(slug: string): Promise<PostModule> {
  return (await import(`../content/blog/${slug}.mdx`)) as PostModule;
}

async function loadPost(slug: string): Promise<PostWithContent> {
  const { default: Content, metadata, toc, readingTime } = await importPost(slug);

  return {
    slug,
    meta: validateMeta(slug, metadata),
    readingTime,
    toc,
    Content,
  };
}

export async function getPost(slug: string): Promise<PostWithContent | null> {
  if (!getPostSlugs().includes(slug)) {
    return null;
  }

  return loadPost(slug);
}

const draftsArePreviewable = process.env.NODE_ENV === "development";

function loadAllPosts(): Promise<PostWithContent[]> {
  return Promise.all(getPostSlugs().map((slug) => loadPost(slug)));
}

function byNewestFirst(a: PostWithContent, b: PostWithContent) {
  return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
}

function toListItem({ slug, meta, readingTime, toc }: PostWithContent): Post {
  return { slug, meta, readingTime, toc };
}

export async function getAllPosts(): Promise<Post[]> {
  const posts = await loadAllPosts();
  return posts
    .filter((post) => !post.meta.draft)
    .sort(byNewestFirst)
    .map(toListItem);
}

export async function getRoutableSlugs(): Promise<string[]> {
  const posts = await loadAllPosts();
  return posts
    .filter((post) => draftsArePreviewable || !post.meta.draft)
    .sort(byNewestFirst)
    .map((post) => post.slug);
}

export function isRoutable(post: { meta: PostMeta }): boolean {
  return draftsArePreviewable || !post.meta.draft;
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tags = new Set<string>();
  posts.forEach((post) => post.meta.tags.forEach((tag) => tags.add(tag)));
  return [...tags].sort((a, b) => a.localeCompare(b));
}
