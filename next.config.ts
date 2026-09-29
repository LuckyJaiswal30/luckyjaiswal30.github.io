import { fileURLToPath } from "node:url";
import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Old URLs from before the slugs were shortened. Links to them already
  // exist in the wild, so they move permanently rather than 404.
  async redirects() {
    return [
      {
        source: "/blog/everyone-can-build-an-ai-app-now-almost-nobody-can-run-one",
        destination: "/blog/ai-apps",
        permanent: true,
      },
      {
        source: "/blog/being-a-programmer-in-2026",
        destination: "/blog/programmer-in-2026",
        permanent: true,
      },
      {
        source: "/projects/this-portfolio",
        destination: "/projects/portfolio",
        permanent: true,
      },
    ];
  },
};

// Turbopack passes loader options to Rust, so remark plugins are named by
// module specifier rather than passed as functions, and the specifier must
// resolve on its own -- which a project-relative path does not.
const remarkPostData = fileURLToPath(
  new URL("./src/lib/remark-post-data.ts", import.meta.url),
);

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm", remarkPostData],
  },
});

export default withMDX(nextConfig);
