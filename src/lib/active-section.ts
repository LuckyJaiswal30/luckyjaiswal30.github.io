export type SectionRect = {
  href: string;

  top: number;
  height: number;
};

export const TOP_THRESHOLD = 80;

export function pickActiveSection(
  sections: SectionRect[],
  scrollY: number,
  viewportHeight: number,
): string | null {
  if (sections.length === 0) {
    return null;
  }

  if (scrollY < TOP_THRESHOLD) {
    return sections[0].href;
  }

  const viewportCentre = viewportHeight / 2;

  const nearest = sections

    .filter((section) => section.top < viewportHeight)
    .map((section) => ({
      href: section.href,
      top: section.top,
      distance: Math.abs(section.top + section.height / 2 - viewportCentre),
    }))

    .sort((a, b) => a.distance - b.distance || a.top - b.top)[0];

  return nearest?.href ?? null;
}
