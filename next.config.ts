import { fileURLToPath } from "node:url";
import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
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
