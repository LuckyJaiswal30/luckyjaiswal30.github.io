/** The live domain. Only a fallback: NEXT_PUBLIC_SITE_URL wins when set. */
const productionUrl = "https://imlucky.dev";

/**
 * `metadataBase` is built from this, so every canonical, Open Graph image URL
 * and sitemap entry resolves against it. A wrong value breaks link previews
 * silently and points crawlers at the wrong host.
 *
 * Production never falls through to the deployment URL: emitting a
 * *.vercel.app canonical would compete with the real domain in search results.
 * Preview deploys still use their own URL so their previews stay self-consistent.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) {
    return explicit.replace(/\/+$/, "");
  }

  if (process.env.VERCEL_ENV === "production") {
    return productionUrl;
  }

  const previewDomain = process.env.VERCEL_URL;
  if (previewDomain) {
    return `https://${previewDomain}`;
  }

  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

export const siteName = "Lucky Jaiswal";

export const siteDescription =
  "Second-year Computer Science (AI) student at BBD University in Lucknow, learning full-stack development.";

export const contactEmail = "luckyjaiswal3405@gmail.com";

/** Profile links. Also the `sameAs` set on the Person structured data. */
export const socialUrls = {
  github: "https://github.com/LuckyJaiswal30",
  linkedin: "https://www.linkedin.com/in/luckyjaiswaldev/",
  instagram: "https://www.instagram.com/luckyjaiswal.3/",
} as const;
