import { valueToEstree } from "estree-util-value-to-estree";
import type { Heading, Root } from "mdast";
import type { MdxjsEsm } from "mdast-util-mdxjs-esm";
import { visit } from "unist-util-visit";
// Type-only on purpose. next.config.ts loads this file by absolute path
// through Node, outside the bundler's alias and extension resolution, so a
// value import of a local module cannot resolve here.
import type { TocEntry } from "./blog-utils";

const WORDS_PER_MINUTE = 200;

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function headingText(node: Heading): string {
  let text = "";

  visit(node, (child) => {
    if (child.type === "text" || child.type === "inlineCode") {
      text += child.value;
    }
  });

  return text.trim();
}

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

export default function remarkPostData() {
  return (tree: Root) => {
    const { toc, readingTime } = collectPostData(tree);

    tree.children.unshift(
      exportConst("toc", toc),
      exportConst("readingTime", readingTime),
    );
  };
}
