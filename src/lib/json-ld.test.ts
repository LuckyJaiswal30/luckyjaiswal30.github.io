import { describe, expect, it } from "vitest";
import { serializeJsonLd } from "@/lib/json-ld";

describe("serializeJsonLd", () => {
  it("escapes < so a value cannot close the script tag", () => {
    const payload = serializeJsonLd({
      headline: "Breakout </script><img src=x onerror=alert(1)>",
    });

    expect(payload).not.toContain("</script>");
    expect(payload).toContain("\\u003c");
  });

  it("keeps the data intact for a JSON parser", () => {
    const data = {
      "@type": "BlogPosting",
      headline: "Breakout </script><img src=x>",
      description: "5 < 10 && 10 > 5",
    };

    expect(JSON.parse(serializeJsonLd(data))).toEqual(data);
  });

  it("handles nested and array values", () => {
    const data = { tags: ["<a>", "<b>"], author: { name: "<script>" } };
    expect(serializeJsonLd(data)).not.toContain("<");
    expect(JSON.parse(serializeJsonLd(data))).toEqual(data);
  });
});
