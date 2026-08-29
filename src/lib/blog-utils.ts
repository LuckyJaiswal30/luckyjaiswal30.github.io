export type PostMeta = {
  title: string;
  description: string;

  date: string;
  tags: string[];

  featured?: boolean;

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

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function formatDateShort(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
