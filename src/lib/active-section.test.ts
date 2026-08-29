import { describe, expect, it } from "vitest";
import {
  pickActiveSection,
  TOP_THRESHOLD,
  type SectionRect,
} from "@/lib/active-section";

const VIEWPORT = 900;

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
    const active = pickActiveSection(layout(100), 100, VIEWPORT);
    expect(active).not.toBe("#skills");
    expect(active).not.toBe("#projects");
    expect(active).not.toBe("#contact");
  });

  it("does not skip a short section between two tall ones", () => {
    const sections: SectionRect[] = [
      { href: "#tall-a", top: -820, height: 900 },
      { href: "#short", top: 80, height: 120 },
      { href: "#tall-b", top: 200, height: 900 },
    ];

    expect(pickActiveSection(sections, 1000, 300)).toBe("#short");
  });

  it("breaks ties towards the higher section", () => {
    const sections: SectionRect[] = [
      { href: "#lower", top: 500, height: 100 },
      { href: "#upper", top: 300, height: 100 },
    ];

    expect(pickActiveSection(sections, 1000, 900)).toBe("#upper");
  });

  it("keeps the last section active at the bottom of the page", () => {
    const sections: SectionRect[] = [
      { href: "#a", top: -1800, height: 900 },
      { href: "#b", top: -900, height: 900 },
      { href: "#c", top: 0, height: 900 },
    ];

    expect(pickActiveSection(sections, 1800, 900)).toBe("#c");
  });
});
