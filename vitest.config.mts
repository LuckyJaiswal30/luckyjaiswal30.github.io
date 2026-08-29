import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],

    // Deliberately west of UTC. A post's date is a calendar day that parses
    // as UTC midnight, so a formatter missing timeZone: "UTC" renders the
    // previous day here. Running the suite under UTC would hide that.
    env: { TZ: "America/Los_Angeles" },
  },
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
