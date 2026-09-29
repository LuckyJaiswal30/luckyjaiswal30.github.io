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
  a: ({ href = "", children, ...props }: ComponentPropsWithoutRef<"a">) => {
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
        >
          {children}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      );
    }

    return (
      <Link href={href} className={className} {...props}>
        {children}
      </Link>
    );
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

export function useMDXComponents(existing: MDXComponents = {}): MDXComponents {
  return { ...existing, ...components };
}
