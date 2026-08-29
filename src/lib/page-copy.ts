/**
 * Headline copy for the index pages, in one place.
 *
 * Each of these strings was previously written out two or three times — in the
 * page's `metadata.description`, in the visible paragraph, and in the Open
 * Graph card — with nothing keeping them in step. Editing the visible sentence
 * and forgetting the other two is a silent mistake: the page reads correctly
 * while search results and link previews quote the old wording.
 *
 * `metaTitle` and `heading` are separate fields on purpose. They are the same
 * for the blog, and deliberately different for projects, where the tab reads
 * "Projects" and the page says "All Projects".
 */
export const blogIndexCopy = {
  metaTitle: "Blog",
  heading: "Blog",
  description:
    "Bugs I've chased, things I've learned, and whatever else felt worth writing down.",
} as const;

export const projectsIndexCopy = {
  metaTitle: "Projects",
  heading: "All Projects",
  description: "Everything I've built, with notes on how each one went.",
  /** The card is a standalone pitch, so it says something the page does not. */
  ogTitle: "Everything so far, including the parts that aren't finished.",
} as const;
