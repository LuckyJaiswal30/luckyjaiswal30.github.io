import { fileURLToPath } from "node:url";
import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
};

/**
 * Turbopack hands loader options across to Rust, so remark plugins have to be
 * named by module specifier rather than passed as functions — and the specifier
 * has to resolve on its own, which a project-relative path does not. Hence the
 * absolute path for the local plugin.
 */
const remarkPostData = fileURLToPath(
  new URL("./src/lib/remark-post-data.ts", import.meta.url),
);

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm", remarkPostData],
  },
});

export default withMDX(nextConfig);
