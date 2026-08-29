import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { formatDateShort, type Post } from "@/lib/blog-utils";

export default function PostRow({
  post,
  featured = false,
  variant = "full",
  headingLevel = 3,
}: {
  post: Post;
  featured?: boolean;
  variant?: "full" | "compact";

  headingLevel?: 2 | 3;
}) {
  const compact = variant === "compact";
  const Heading = `h${headingLevel}` as const;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group block border-t border-[color:var(--border)] ${
        compact ? "py-5 sm:py-6" : "py-9 sm:py-11"
      }`}
    >
      <div
        className={`grid sm:grid-cols-[8.5rem_1fr_auto] sm:gap-10 ${
          compact ? "gap-2 sm:items-center" : "gap-4 sm:items-start"
        }`}
      >
        <div
          className={`flex flex-wrap items-center gap-x-2 gap-y-2 sm:flex-col sm:items-start sm:gap-2 ${
            compact ? "" : "sm:pt-2"
          }`}
        >
          {featured ? (
            <>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--foreground)] sm:hidden">
                Featured
              </span>
              <span
                aria-hidden="true"
                className="text-xs text-[color:var(--muted-soft)] sm:hidden"
              >
                ·
              </span>
            </>
          ) : null}

          <time
            dateTime={post.meta.date}
            className="text-xs uppercase tracking-[0.16em] text-[color:var(--muted-soft)]"
          >
            {formatDateShort(post.meta.date)}
          </time>

          {compact ? null : (
            <>
              <span
                aria-hidden="true"
                className="text-xs text-[color:var(--muted-soft)] sm:hidden"
              >
                ·
              </span>
              <span className="text-xs uppercase tracking-[0.16em] text-[color:var(--muted-soft)]">
                {post.readingTime} min
              </span>
            </>
          )}
        </div>

        <div className="min-w-0">
          <Heading
            className={`max-w-3xl font-semibold tracking-[-0.03em] text-[color:var(--foreground)] transition-opacity duration-300 group-hover:opacity-70 ${
              compact
                ? "text-lg leading-snug sm:text-xl"
                : "text-2xl leading-[1.15] tracking-[-0.035em] sm:text-[1.75rem]"
            }`}
          >
            {post.meta.title}
          </Heading>

          {compact ? null : (
            <>
              <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-[color:var(--muted)]">
                {post.meta.description}
              </p>

              {post.meta.tags.length > 0 ? (
                <p className="mt-4 text-xs uppercase tracking-[0.16em] text-[color:var(--muted-soft)]">
                  {post.meta.tags.join(" · ")}
                </p>
              ) : null}
            </>
          )}
        </div>

        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end sm:gap-4">
          {featured ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--foreground)] border-[color:var(--foreground)] bg-[color:var(--surface-strong)]">
              <Sparkles aria-hidden="true" className="h-3 w-3" strokeWidth={2.2} />
              Featured
            </span>
          ) : null}

          <span
            aria-hidden="true"
            className={`inline-flex shrink-0 items-center justify-center rounded-full border text-[color:var(--muted)] transition-all duration-300 group-hover:border-[color:var(--foreground)] group-hover:text-[color:var(--foreground)] border-[color:var(--border)] ${
              compact ? "h-8 w-8" : "h-10 w-10"
            }`}
          >
            <ArrowUpRight
              className={compact ? "h-3.5 w-3.5" : "h-4 w-4"}
              strokeWidth={2}
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
