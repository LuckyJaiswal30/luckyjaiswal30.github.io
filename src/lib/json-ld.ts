/**
 * Serialize structured data for a `<script type="application/ld+json">`.
 *
 * `JSON.stringify` leaves `<` alone, so a value containing `</script>` closes
 * the tag early and the rest is parsed as HTML. The escape is a JSON escape,
 * so parsers still read the original value.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
