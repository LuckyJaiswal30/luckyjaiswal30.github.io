import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

function Heading({
  as: Tag,
  className,
  children,
  id,
  ...props
}: {
  as: "h2" | "h3";
  className: string;
  children?: ReactNode;
} & ComponentPropsWithoutRef<"h2">) {
  // `id` is stamped by the remark plugin, which built the table of contents in
  // the same pass, so an anchor and its TOC link always agree — including the
  // numeric suffix on repeated headings. A heading the plugin did not stamp
  // (it skips empty ones) is deliberately left unlinked rather than given an id
  // invented here: a second implementation is exactly how the two drift apart,
  // and an anchor the contents list does not know about helps nobody.
  if (!id) {
    return <Tag className={className} {...props}>{children}</Tag>;
  }

  return (
    <Tag id={id} className={`scroll-mt-28 ${className}`} {...props}>
      <a href={`#${id}`} className="no-underline">
        {children}
      </a>
    </Tag>
  );
}

const components: MDXComponents = {
  h2: (props) => (
    <Heading
      as="h2"
      className="mt-14 mb-5 text-2xl font-semibold tracking-[-0.03em] text-[color:var(--foreground)] sm:text-3xl"
      {...props}
    />
  ),
  h3: (props) => (
    <Heading
      as="h3"
      className="mt-10 mb-4 text-xl font-semibold tracking-[-0.02em] text-[color:var(--foreground)] sm:text-2xl"
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="my-5 text-[1.05rem] leading-[1.8] text-[color:var(--muted)]"
      {...props}
    />
  ),
  a: ({ href = "", ...props }: ComponentPropsWithoutRef<"a">) => {
    const className =
      "font-medium text-[color:var(--foreground)] underline decoration-[color:var(--border)] underline-offset-[3px] transition-opacity duration-300 hover:opacity-75";

    if (href.startsWith("http")) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
          {...props}
        />
      );
    }

    return <Link href={href} className={className} {...props} />;
  },
  ul: (props) => (
    <ul
      className="my-5 flex list-disc flex-col gap-2.5 pl-5 marker:text-[color:var(--muted-soft)]"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="my-5 flex list-decimal flex-col gap-2.5 pl-5 marker:text-[color:var(--muted-soft)]"
      {...props}
    />
  ),
  li: (props) => (
    <li
      className="text-[1.05rem] leading-[1.75] text-[color:var(--muted)]"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="my-7 border-l-2 pl-5 text-lg italic leading-relaxed text-[color:var(--muted)] border-[color:var(--border)]"
      {...props}
    />
  ),
  hr: () => <hr className="my-12 border-[color:var(--border)]" />,
  strong: (props) => (
    <strong
      className="font-semibold text-[color:var(--foreground)]"
      {...props}
    />
  ),
  code: ({ className, ...props }: ComponentPropsWithoutRef<"code">) => {
    // Fenced code blocks arrive as <pre><code class="language-xxx">. Only style
    // bare inline `code`; a block's own <pre> handles its look, so styling this
    // too would double up the border, background and padding.
    if (typeof className === "string" && className.startsWith("language-")) {
      return <code className={className} {...props} />;
    }

    return (
      <code
        className="rounded-md border px-1.5 py-0.5 font-mono text-[0.85em] text-[color:var(--foreground)] border-[color:var(--border)] bg-[color:var(--surface-strong)]"
        {...props}
      />
    );
  },
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      // tabIndex makes an overflowing block reachable by keyboard, so it can be
      // scrolled without a pointer.
      tabIndex={0}
      className="my-7 overflow-x-auto rounded-2xl border p-5 font-mono text-[0.85rem] leading-relaxed text-[color:var(--foreground)] border-[color:var(--border)] bg-[color:var(--surface-strong)]"
      {...props}
    />
  ),
  table: (props) => (
    <div className="my-7 overflow-x-auto rounded-2xl border border-[color:var(--border)]">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th
      className="border-b px-4 py-3 text-left font-semibold text-[color:var(--foreground)] border-[color:var(--border)]"
      {...props}
    />
  ),
  td: (props) => (
    <td
      className="border-b px-4 py-3 text-[color:var(--muted)] border-[color:var(--border)]"
      {...props}
    />
  ),
};

/**
 * The name is the `mdx-components` file convention's, not a choice: @next/mdx
 * looks this export up by name to style MDX rendered anywhere in the app.
 */
export function useMDXComponents(existing: MDXComponents = {}): MDXComponents {
  return { ...existing, ...components };
}
