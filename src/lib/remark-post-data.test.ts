import type { Heading, Root } from "mdast";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import { describe, expect, it } from "vitest";
import { collectPostData, slugify } from "@/lib/remark-post-data";

function parse(markdown: string): Root {
  return unified().use(remarkParse).parse(markdown) as Root;
}

function run(markdown: string) {
  const tree = parse(markdown);
  const data = collectPostData(tree);

  const stampedIds: (string | undefined)[] = [];
  visit(tree, "heading", (node: Heading) => {
    const props = node.data?.hProperties as { id?: string } | undefined;
    stampedIds.push(props?.id);
  });

  return { ...data, stampedIds };
}

describe("slugify", () => {
  it("lowercases and hyphenates", () => {
    expect(slugify("The First Real Question")).toBe("the-first-real-question");
  });

  it("strips punctuation and collapses separators", () => {
    expect(slugify("Why it's slow  —  and how")).toBe("why-its-slow-and-how");
  });

  it("trims leading and trailing hyphens", () => {
    expect(slugify("  --Hello--  ")).toBe("hello");
  });
});

describe("collectPostData: headings", () => {
  it("collects h2 and h3 into the table of contents", () => {
    const { toc } = run("## Alpha\n\n### Beta\n\nText.");

    expect(toc).toEqual([
      { id: "alpha", text: "Alpha", level: 2 },
      { id: "beta", text: "Beta", level: 3 },
    ]);
  });

  it("ignores h1 and h4, which are not navigable levels", () => {
    const { toc } = run("# Title\n\n## Real\n\n#### Too deep");
    expect(toc.map((entry) => entry.text)).toEqual(["Real"]);
  });

  it("gives repeated headings distinct anchors, GitHub-style", () => {
    const { toc } = run("## Same\n\n## Same\n\n## Same");

    expect(toc.map((entry) => entry.id)).toEqual(["same", "same-1", "same-2"]);
  });

  it("stamps the same id onto the heading that it puts in the contents", () => {
    const { toc, stampedIds } = run("## Same\n\n## Same\n\n### Other");

    expect(stampedIds).toEqual(toc.map((entry) => entry.id));
  });

  it("ignores headings inside fenced code blocks", () => {
    const { toc } = run("## Real\n\n```md\n## Not a heading\n```\n");
    expect(toc.map((entry) => entry.text)).toEqual(["Real"]);
  });

  it("flattens inline code and emphasis in heading text", () => {
    const { toc } = run("## Why `useEffect` is *hard*");

    expect(toc[0].text).toBe("Why useEffect is hard");
    expect(toc[0].id).toBe("why-useeffect-is-hard");
  });

  it("skips a heading with no text rather than inventing an id", () => {
    const { toc } = run("## \n\n## Real");
    expect(toc.map((entry) => entry.text)).toEqual(["Real"]);
  });
});

describe("collectPostData: reading time", () => {
  it("is at least one minute for a short post", () => {
    expect(run("Three words here.").readingTime).toBe(1);
  });

  it("rounds to the nearest minute at 200 words per minute", () => {
    expect(run(`${"word ".repeat(600)}`).readingTime).toBe(3);
  });

  it("excludes fenced code from the count", () => {
    const prose = `${"word ".repeat(400)}`;
    const withCode = `${prose}\n\n\`\`\`js\n${"junk ".repeat(4000)}\n\`\`\`\n`;

    expect(run(withCode).readingTime).toBe(run(prose).readingTime);
  });

  it("excludes an indented code block too", () => {
    const prose = `${"word ".repeat(400)}`;
    const withIndented = `${prose}\n\n    ${"junk ".repeat(2000)}\n`;

    expect(run(withIndented).readingTime).toBe(run(prose).readingTime);
  });
});
