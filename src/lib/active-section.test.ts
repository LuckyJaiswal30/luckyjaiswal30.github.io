import { describe, expect, it } from "vitest";
import {
  pickActiveSection,
  TOP_THRESHOLD,
  type SectionRect,
} from "@/lib/active-section";

const VIEWPORT = 900;

/** Five equal full-height sections, as measured at a given scroll offset. */
function layout(scrollY: number): SectionRect[] {
  return ["#home", "#about", "#skills", "#projects", "#contact"].map(
    (href, index) => ({
      href,
      top: index * VIEWPORT - scrollY,
      height: VIEWPORT,
    }),
  );
}

describe("pickActiveSection", () => {
  it("returns null when there are no sections", () => {
    expect(pickActiveSection([], 500, VIEWPORT)).toBeNull();
  });

  it("pins the first section while near the top", () => {
    expect(pickActiveSection(layout(0), 0, VIEWPORT)).toBe("#home");
    expect(
      pickActiveSection(layout(TOP_THRESHOLD - 1), TOP_THRESHOLD - 1, VIEWPORT),
    ).toBe("#home");
  });

  it("follows the reader down the page", () => {
    const cases: [number, string][] = [
      [900, "#about"],
      [1800, "#skills"],
      [2700, "#projects"],
      [3600, "#contact"],
    ];

    for (const [scrollY, expected] of cases) {
      expect(pickActiveSection(layout(scrollY), scrollY, VIEWPORT)).toBe(
        expected,
      );
    }
  });

  it("ignores sections that are still below the fold", () => {
    // Scrolled just past the threshold: #skills onwards start below the
    // viewport and must not be selectable yet.
    const active = pickActiveSection(layout(100), 100, VIEWPORT);
    expect(active).not.toBe("#skills");
    expect(active).not.toBe("#projects");
    expect(active).not.toBe("#contact");
  });

  it("does not skip a short section between two tall ones", () => {
    // The bug a "last top past the line" implementation has: a 120px section
    // never becomes active because the next tall one's top passes immediately
    // after. Centre-distance has to pick it while it is centred.
    const sections: SectionRect[] = [
      { href: "#tall-a", top: -820, height: 900 },
      { href: "#short", top: 80, height: 120 },
      { href: "#tall-b", top: 200, height: 900 },
    ];

    expect(pickActiveSection(sections, 1000, 300)).toBe("#short");
  });

  it("breaks ties towards the higher section", () => {
    // Two sections equidistant from the centre, listed out of document order.
    const sections: SectionRect[] = [
      { href: "#lower", top: 500, height: 100 },
      { href: "#upper", top: 300, height: 100 },
    ];

    expect(pickActiveSection(sections, 1000, 900)).toBe("#upper");
  });

  it("keeps the last section active at the bottom of the page", () => {
    // Bottom of the document: everything has scrolled up, and only the final
    // section's centre is anywhere near the viewport centre.
    const sections: SectionRect[] = [
      { href: "#a", top: -1800, height: 900 },
      { href: "#b", top: -900, height: 900 },
      { href: "#c", top: 0, height: 900 },
    ];

    expect(pickActiveSection(sections, 1800, 900)).toBe("#c");
  });
});
