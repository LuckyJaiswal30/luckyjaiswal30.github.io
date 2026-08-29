/* Must stay a script file, with no top-level import or export, or the
   `declare module` below becomes a module augmentation and stops applying.
   That is why the imports sit inside the block. */
declare module "*.mdx" {
  import type { MDXProps } from "mdx/types";
  import type { TocEntry } from "@/lib/blog-utils";

  export const metadata: unknown;
  export const toc: TocEntry[];
  export const readingTime: number;

  const MDXContent: (props: MDXProps) => React.JSX.Element;
  export default MDXContent;
}
