import { afterEach, describe, expect, it, vi } from "vitest";

// siteUrl is resolved once at module load, so each case needs a fresh import
// with the environment already in place.
async function loadSiteUrl(env: Record<string, string | undefined>) {
  vi.resetModules();
  for (const [key, value] of Object.entries(env)) {
    vi.stubEnv(key, value === undefined ? "" : value);
  }
  const mod = await import("@/lib/site");
  return mod.siteUrl;
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("siteUrl resolution", () => {
  it("prefers NEXT_PUBLIC_SITE_URL", async () => {
    expect(
      await loadSiteUrl({ NEXT_PUBLIC_SITE_URL: "https://imlucky.dev" }),
    ).toBe("https://imlucky.dev");
  });

  it("strips a trailing slash", async () => {
    expect(
      await loadSiteUrl({ NEXT_PUBLIC_SITE_URL: "https://imlucky.dev/" }),
    ).toBe("https://imlucky.dev");
  });

  it("never emits a vercel.app canonical in production", async () => {
    const url = await loadSiteUrl({
      NEXT_PUBLIC_SITE_URL: undefined,
      VERCEL_ENV: "production",
      VERCEL_URL: "lucky-jaiswal-abc123.vercel.app",
    });

    expect(url).toBe("https://imlucky.dev");
    expect(url).not.toContain("vercel.app");
  });

  it("uses the deployment URL on preview builds", async () => {
    expect(
      await loadSiteUrl({
        NEXT_PUBLIC_SITE_URL: undefined,
        VERCEL_ENV: "preview",
        VERCEL_URL: "lucky-jaiswal-abc123.vercel.app",
      }),
    ).toBe("https://lucky-jaiswal-abc123.vercel.app");
  });

  it("falls back to localhost off Vercel", async () => {
    expect(
      await loadSiteUrl({
        NEXT_PUBLIC_SITE_URL: undefined,
        VERCEL_ENV: undefined,
        VERCEL_URL: undefined,
      }),
    ).toBe("http://localhost:3000");
  });

  it("produces an absolute URL that metadataBase can parse", async () => {
    for (const env of [
      { NEXT_PUBLIC_SITE_URL: "https://imlucky.dev" },
      { NEXT_PUBLIC_SITE_URL: undefined, VERCEL_ENV: "production" },
      {
        NEXT_PUBLIC_SITE_URL: undefined,
        VERCEL_ENV: undefined,
        VERCEL_URL: undefined,
      },
    ]) {
      const url = await loadSiteUrl(env);
      expect(() => new URL(url)).not.toThrow();
      expect(url.endsWith("/")).toBe(false);
    }
  });
});

describe("social links", () => {
  it("are absolute https URLs", async () => {
    const { socialUrls } = await import("@/lib/site");
    for (const [key, url] of Object.entries(socialUrls)) {
      expect(() => new URL(url), `${key} must parse`).not.toThrow();
      expect(new URL(url).protocol, `${key} must be https`).toBe("https:");
    }
  });
});
