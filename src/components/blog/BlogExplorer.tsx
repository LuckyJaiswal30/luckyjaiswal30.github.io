"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import PostRow from "@/components/blog/PostRow";
import type { Post } from "@/lib/blog-utils";

function matches(post: Post, query: string, activeTag: string | null): boolean {
  if (activeTag && !post.meta.tags.includes(activeTag)) {
    return false;
  }

  if (!query) {
    return true;
  }

  return (
    post.meta.title.toLowerCase().includes(query) ||
    post.meta.description.toLowerCase().includes(query) ||
    post.meta.tags.some((tag) => tag.toLowerCase().includes(query))
  );
}

export default function BlogExplorer({
  posts,
  tags,
}: {
  posts: Post[];
  tags: string[];
}) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  if (posts.length === 0) {
    return (
      <p className="rounded-3xl border border-dashed p-10 text-center text-[color:var(--muted)] border-[color:var(--border)]">
        No posts yet.
      </p>
    );
  }

  const filtered = posts.filter((post) =>
    matches(post, query.trim().toLowerCase(), activeTag),
  );

  const featured = posts.find((post) => post.meta.featured);
  const isDefaultView = !query && !activeTag;
  const list =
    isDefaultView && featured
      ? [featured, ...filtered.filter((post) => post !== featured)]
      : filtered;

  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className="relative max-w-md">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--muted-soft)]"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search posts…"
            aria-label="Search posts"
            className="h-11 w-full rounded-full border pl-11 pr-4 text-sm text-[color:var(--foreground)] transition-colors duration-300 placeholder:text-[color:var(--muted-soft)] border-[color:var(--border)] bg-[color:var(--surface)]"
          />
        </div>

        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            <TagChip
              label="All"
              active={!activeTag}
              onClick={() => setActiveTag(null)}
            />
            {tags.map((tag) => (
              <TagChip
                key={tag}
                label={tag}
                active={activeTag === tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              />
            ))}
          </div>
        ) : null}
      </div>

      <p aria-live="polite" className="sr-only">
        {list.length} {list.length === 1 ? "post" : "posts"} shown
      </p>

      <div className="mt-12">
        {list.length === 0 ? (
          <p className="rounded-3xl border border-dashed p-10 text-center text-[color:var(--muted)] border-[color:var(--border)]">
            No posts match that search.
          </p>
        ) : (
          <div className="border-b border-[color:var(--border)]">
            {list.map((post) => (
              <PostRow
                key={post.slug}
                post={post}
                featured={isDefaultView && post === featured}
                headingLevel={2}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TagChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-300 ${
        active
          ? "border-[color:var(--foreground)] bg-[color:var(--surface-strong)] text-[color:var(--foreground)]"
          : "border-[color:var(--border)] text-[color:var(--muted)]"
      }`}
    >
      {label}
    </button>
  );
}
