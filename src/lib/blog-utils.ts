export type PostMeta = {
  title: string;
  description: string;
  /** ISO date string, e.g. "2026-08-23". */
  date: string;
  tags: string[];
  /** Pin to the top of the blog index. */
  featured?: boolean;
  /** Excluded from the built site; renders under `next dev` only. */
  draft?: boolean;
};

export type TocEntry = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type Post = {
  slug: string;
  meta: PostMeta;
  readingTime: number;
  toc: TocEntry[];
};

/**
 * Pinned to UTC. A date-only string parses as UTC midnight, so formatting it in
 * the viewer's zone shows the previous day anywhere west of UTC. These run on
 * the server and again at hydration, so an unpinned zone changes the text
 * between the two.
 */
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** Compact form for the blog index rail, e.g. "Aug 27, 2026". */
export function formatDateShort(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
