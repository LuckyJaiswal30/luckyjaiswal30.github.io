/**
 * Named exports on an imported `.mdx` module.
 *
 * `metadata` is hand-authored in the post, so it is deliberately `unknown`:
 * every consumer has to put it through `validateMeta` rather than trusting a
 * shape TypeScript cannot actually check. `toc` and `readingTime` are injected
 * by the remark plugin in `lib/remark-post-data.ts`, so they are typed as what
 * that plugin emits.
 *
 * This has to stay a *script* file, with no top-level import or export, or the
 * `declare module` becomes a module augmentation and silently stops applying.
 * That is why the imports sit inside the block.
 */
declare module "*.mdx" {
  import type { MDXProps } from "mdx/types";
  import type { TocEntry } from "@/lib/blog-utils";

  export const metadata: unknown;
  export const toc: TocEntry[];
  export const readingTime: number;

  const MDXContent: (props: MDXProps) => React.JSX.Element;
  export default MDXContent;
}
