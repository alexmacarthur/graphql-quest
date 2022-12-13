import { describe, it, expect } from "vitest";
import { attachParamsToUrl } from "./utils";

describe("attachParamsToUrl", () => {
  it("appends params to clean URL", () => {
    const url = "https://macarthur.me";
    const result = attachParamsToUrl(url, {
      paramA: "something",
      paramB: true,
    });

    expect(result).toEqual(
      "https://macarthur.me/?paramA=something&paramB=true"
    );
  });

  it("appends more params to URL with params", () => {
    const url = "https://macarthur.me?param=hello";
    const result = attachParamsToUrl(url, {
      anotherParam: "another",
    });

    expect(result).toEqual(
      "https://macarthur.me/?param=hello&anotherParam=another"
    );
  });
});
