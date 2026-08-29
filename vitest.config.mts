import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
    // Deliberately a timezone west of UTC. A post's date is a calendar day but
    // parses as UTC midnight, so a formatter that forgets to pin its zone
    // renders the previous day here. Running the suite under UTC would make
    // that bug invisible, which is exactly how it shipped the first time.
    env: { TZ: "America/Los_Angeles" },
  },
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
