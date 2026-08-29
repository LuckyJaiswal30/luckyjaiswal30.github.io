/** A section's position, as measured by `getBoundingClientRect()`. */
export type SectionRect = {
  href: string;
  /** Distance from the top of the viewport. Negative once scrolled past. */
  top: number;
  height: number;
};

/** Below this scroll position the first section wins outright. */
export const TOP_THRESHOLD = 80;

/**
 * Which section the reader is looking at.
 *
 * Nearest section centre to the viewport centre, rather than "the last one
 * whose top has passed", so a short section sandwiched between two tall ones
 * still gets its turn instead of being skipped.
 *
 * Pure arithmetic, deliberately: the measuring belongs to the component, but
 * this is the part that is worth testing and the part that is easy to get
 * subtly wrong.
 *
 * `sections` is expected in document order. Returns null when there is nothing
 * to choose from.
 */
export function pickActiveSection(
  sections: SectionRect[],
  scrollY: number,
  viewportHeight: number,
): string | null {
  if (sections.length === 0) {
    return null;
  }

  // At the very top, the first section is active even if the second one's
  // centre happens to sit closer to the middle of a short viewport.
  if (scrollY < TOP_THRESHOLD) {
    return sections[0].href;
  }

  const viewportCentre = viewportHeight / 2;

  const nearest = sections
    // Anything still below the fold is not what the reader is looking at.
    .filter((section) => section.top < viewportHeight)
    .map((section) => ({
      href: section.href,
      top: section.top,
      distance: Math.abs(section.top + section.height / 2 - viewportCentre),
    }))
    // Ties break towards the higher section, so the choice is stable rather
    // than dependent on array order.
    .sort((a, b) => a.distance - b.distance || a.top - b.top)[0];

  return nearest?.href ?? null;
}
