import { describe, expect, it } from "vitest";
import { formatDate, formatDateShort } from "@/lib/blog-utils";

// The suite runs under America/Los_Angeles (see vitest.config.mts). Without
// timeZone: "UTC" in the formatters, every assertion below renders the
// previous day and fails.
describe("date formatting", () => {
  it("renders the calendar day from the frontmatter, not the local one", () => {
    expect(formatDate("2026-08-27")).toBe("August 27, 2026");
    expect(formatDateShort("2026-08-27")).toBe("Aug 27, 2026");
  });

  it("does not roll backwards across a month boundary", () => {
    expect(formatDateShort("2026-09-01")).toBe("Sep 1, 2026");
    expect(formatDate("2026-01-01")).toBe("January 1, 2026");
  });

  it("does not roll backwards across a year boundary", () => {
    expect(formatDateShort("2026-01-01")).toBe("Jan 1, 2026");
  });
});
