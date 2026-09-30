import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { getPostSlugs } from "@/lib/blog";
import { featuredProjects, projects } from "@/lib/projects";

describe("projects config", () => {
  it("has at least one project", () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it("has unique slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("uses url-safe slugs", () => {
    for (const p of projects) {
      expect(p.slug, `${p.slug} must be lowercase and hyphenated`).toMatch(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      );
    }
  });

  it("has non-empty text on every required field", () => {
    for (const p of projects) {
      expect(p.title.trim(), `${p.slug}: title`).not.toBe("");
      expect(p.description.trim(), `${p.slug}: description`).not.toBe("");
      expect(p.year.trim(), `${p.slug}: year`).not.toBe("");
      expect(
        p.stack.length,
        `${p.slug}: needs at least one stack entry`,
      ).toBeGreaterThan(0);
      expect(
        p.stack.every((tech) => tech.trim() !== ""),
        `${p.slug}: empty stack entry`,
      ).toBe(true);
    }
  });

  it("uses absolute external links and root-relative internal ones", () => {
    for (const p of projects) {
      for (const [field, url] of [
        ["githubUrl", p.githubUrl],
        ["liveUrl", p.liveUrl],
        ["writeUp", p.writeUp],
      ] as const) {
        if (!url) continue;
        expect(
          url.startsWith("https://") || url.startsWith("/"),
          `${p.slug}: ${field} should be https:// or root-relative, got ${url}`,
        ).toBe(true);
      }
    }
  });

  it("points image at public/projects when set", () => {
    for (const p of projects) {
      if (!p.image) continue;
      expect(p.image, `${p.slug}: image`).toMatch(/^\/projects\/[\w.-]+$/);
    }
  });

  it("derives featuredProjects from the featured flag", () => {
    expect(featuredProjects).toEqual(projects.filter((p) => p.featured));
    expect(featuredProjects.every((p) => p.featured)).toBe(true);
  });

  it("does not leave a live link pointing at the page it is on", () => {
    for (const p of projects) {
      expect(p.liveUrl, `${p.slug}: liveUrl "/" links to the homepage`).not.toBe(
        "/",
      );
    }
  });

  it("does not set an image on an in-progress project", () => {
    for (const p of projects) {
      if (p.status !== "In Progress") continue;
      expect(
        p.image,
        `${p.slug}: an in-progress card renders "Coming soon", not the image`,
      ).toBeUndefined();
    }
  });

  it("ships every cover image it references", () => {
    for (const p of projects) {
      for (const [field, src] of [
        ["image", p.image],
        ["imageSquare", p.imageSquare],
      ] as const) {
        if (!src) continue;
        expect(
          existsSync(path.join(process.cwd(), "public", src)),
          `${p.slug}: ${field} ${src} is not in public/`,
        ).toBe(true);
      }
      if (p.imageSquare) {
        expect(p.image, `${p.slug}: a square cover needs a wide one too`).toBeDefined();
      }
    }
  });

  it("points writeUp at a blog post that exists", () => {
    const slugs = getPostSlugs();
    for (const p of projects) {
      if (!p.writeUp) continue;
      expect(p.writeUp, `${p.slug}: writeUp must be /blog/<slug>`).toMatch(/^\/blog\//);
      expect(slugs, `${p.slug}: no post at ${p.writeUp}`).toContain(
        p.writeUp.slice("/blog/".length),
      );
    }
  });

  it("does not advertise a live link for unfinished work", () => {
    for (const p of projects) {
      if (p.status !== "In Progress") continue;
      expect(p.liveUrl, `${p.slug}: in progress but claims a live URL`).toBeUndefined();
    }
  });
});
