import { valueToEstree } from "estree-util-value-to-estree";
import type { Heading, Root } from "mdast";
import type { MdxjsEsm } from "mdast-util-mdxjs-esm";
import { visit } from "unist-util-visit";
// Type-only, and therefore erased before this file is evaluated. next.config.ts
// loads it by absolute path through Node, outside both the "@/..." path aliases
// and the extension rewriting a bundler would do, so a *value* import of a
// local module could not resolve here.
import type { TocEntry } from "./blog-utils";

const WORDS_PER_MINUTE = 200;

/**
 * Heading text to anchor id. Lives here rather than in blog-utils because this
 * plugin is the only thing that generates an id: every anchor on the site is
 * stamped in the pass below, and the table of contents is built from the same
 * pass, so there is no second implementation to keep in step.
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Flatten a heading's inline children ("A `code` word") down to plain text. */
function headingText(node: Heading): string {
  let text = "";

  visit(node, (child) => {
    if (child.type === "text" || child.type === "inlineCode") {
      text += child.value;
    }
  });

  return text.trim();
}

/** An `export const <name> = <value>` statement, as an MDX ESM node. */
function exportConst(name: string, value: unknown): MdxjsEsm {
  return {
    type: "mdxjsEsm",
    value: "",
    data: {
      estree: {
        type: "Program",
        sourceType: "module",
        body: [
          {
            type: "ExportNamedDeclaration",
            specifiers: [],
            attributes: [],
            source: null,
            declaration: {
              type: "VariableDeclaration",
              kind: "const",
              declarations: [
                {
                  type: "VariableDeclarator",
                  id: { type: "Identifier", name },
                  init: valueToEstree(value),
                },
              ],
            },
          },
        ],
      },
    },
  };
}

/**
 * Stamps anchor ids onto headings and exports the post's derived data.
 *
 * The ids and the table of contents come out of the same pass over the same
 * tree, so the two cannot disagree — including the numeric suffix on repeated
 * headings, which is the case a second pass reliably gets wrong.
 *
 * Reading time counts words from the tree and skips `code` nodes structurally,
 * rather than regexing fences out of the raw source: a fence inside a list, or
 * indented code, or a stray ``` in prose all defeat the regex version.
 *
 * The results are attached to the compiled module as `toc` and `readingTime`,
 * so the bundler computes them once at build time and `lib/blog.ts` simply
 * reads them off the import.
 */
/**
 * Stamp anchor ids onto headings and derive the post's table of contents and
 * reading time, in one pass over the tree.
 *
 * Separated from the plugin wrapper below so the rules are directly testable:
 * the wrapper's only remaining job is turning these values into module exports,
 * which the build itself exercises.
 *
 * Mutates `tree`, which is what a remark transformer is for.
 */
export function collectPostData(tree: Root): {
  toc: TocEntry[];
  readingTime: number;
} {
  const toc: TocEntry[] = [];
  const seen = new Map<string, number>();

  visit(tree, "heading", (node: Heading) => {
    if (node.depth !== 2 && node.depth !== 3) {
      return;
    }

    const text = headingText(node);
    if (!text) {
      return;
    }

    const base = slugify(text) || "section";
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    // GitHub-style: the first wins the bare slug, repeats get -1, -2, ...
    const id = count === 0 ? base : `${base}-${count}`;

    node.data ??= {};
    node.data.hProperties = { ...node.data.hProperties, id };

    toc.push({ id, text, level: node.depth });
  });

  let words = 0;
  visit(tree, (node) => {
    if (node.type === "code") {
      return "skip";
    }
    if (node.type === "text") {
      words += node.value.trim().split(/\s+/).filter(Boolean).length;
    }
  });

  return {
    toc,
    readingTime: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
  };
}

/** Attaches the collected data to the compiled module as named exports. */
export default function remarkPostData() {
  return (tree: Root) => {
    const { toc, readingTime } = collectPostData(tree);

    tree.children.unshift(
      exportConst("toc", toc),
      exportConst("readingTime", readingTime),
    );
  };
}
