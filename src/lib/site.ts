const productionUrl = "https://imlucky.dev";

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

export const socialUrls = {
  github: "https://github.com/LuckyJaiswal30",
  linkedin: "https://www.linkedin.com/in/luckyjaiswaldev/",
  instagram: "https://www.instagram.com/luckyjaiswal.3/",
} as const;
