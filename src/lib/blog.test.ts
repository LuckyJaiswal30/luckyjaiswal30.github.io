import { afterEach, describe, expect, it, vi } from "vitest";
import { validateMeta } from "@/lib/blog";
import type { PostMeta } from "@/lib/blog-utils";

const valid: PostMeta = {
  title: "A Post",
  description: "One sentence.",
  date: "2026-08-27",
  tags: ["Learning"],
};

function reject(meta: unknown): string | null {
  try {
    validateMeta("a-post", meta);
    return null;
  } catch (error) {
    return (error as Error).message;
  }
}

describe("validateMeta", () => {
  it("accepts well-formed frontmatter", () => {
    expect(validateMeta("a-post", valid)).toEqual({
      ...valid,
      featured: undefined,
      draft: undefined,
    });
  });

  it("trims text fields and tags", () => {
    const meta = validateMeta("a-post", {
      ...valid,
      title: "  Padded  ",
      tags: [" Learning ", "Next.js"],
    });

    expect(meta.title).toBe("Padded");
    expect(meta.tags).toEqual(["Learning", "Next.js"]);
  });

  it("names the offending file in the message", () => {
    expect(reject(null)).toContain("src/content/blog/a-post.mdx");
  });

  it("rejects missing metadata entirely", () => {
    expect(reject(undefined)).toContain("missing an exported `metadata` object");
    expect(reject("not an object")).toContain("missing an exported `metadata`");
  });

  it("rejects a missing or empty title", () => {
    expect(reject({ ...valid, title: undefined })).toContain("`title`");
    expect(reject({ ...valid, title: "   " })).toContain("`title`");
  });

  it("rejects an empty description", () => {
    expect(reject({ ...valid, description: "" })).toContain("`description`");
  });

  it("rejects a non-ISO date", () => {
    expect(reject({ ...valid, date: "27/08/2026" })).toContain("`date`");
    expect(reject({ ...valid, date: "2026-8-7" })).toContain("`date`");
    expect(reject({ ...valid, date: 20260827 })).toContain("`date`");
  });

  it("rejects a well-formed date that is not a real day", () => {
    expect(reject({ ...valid, date: "2026-02-31" })).toContain("not a real date");
  });

  it("rejects missing or empty tags", () => {
    expect(reject({ ...valid, tags: undefined })).toContain("`tags`");
    expect(reject({ ...valid, tags: [] })).toContain("`tags`");
    expect(reject({ ...valid, tags: "Learning" })).toContain("`tags`");
  });

  it("rejects a blank entry inside tags", () => {
    expect(reject({ ...valid, tags: ["Learning", "  "] })).toContain(
      "non-empty string",
    );
    expect(reject({ ...valid, tags: ["Learning", 3] })).toContain(
      "non-empty string",
    );
  });

  it("rejects a non-boolean draft or featured flag", () => {
    expect(reject({ ...valid, draft: "yes" })).toContain("`draft`");
    expect(reject({ ...valid, featured: 1 })).toContain("`featured`");
  });

  it("allows the optional flags to be absent or boolean", () => {
    expect(reject({ ...valid, draft: true, featured: false })).toBeNull();
  });
});

describe("draft routing policy", () => {
  async function loadIsRoutable(nodeEnv: string) {
    vi.resetModules();
    vi.stubEnv("NODE_ENV", nodeEnv);
    const mod = await import("@/lib/blog");
    return mod.isRoutable;
  }

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("refuses to route a draft outside development", async () => {
    for (const env of ["production", "test"]) {
      const isRoutable = await loadIsRoutable(env);
      expect(isRoutable({ meta: { ...valid, draft: true } }), env).toBe(false);
      expect(isRoutable({ meta: { ...valid, draft: false } }), env).toBe(true);
      expect(isRoutable({ meta: valid }), env).toBe(true);
    }
  });

  it("previews drafts under next dev", async () => {
    const isRoutable = await loadIsRoutable("development");
    expect(isRoutable({ meta: { ...valid, draft: true } })).toBe(true);
  });
});
