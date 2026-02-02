import { describe, expect, it } from "vitest";

describe("rate conversions", () => {
  it("converts 1.96% periodic monthly to TEA correctly", () => {
    const rate = 1.96 / 100;
    const m = 12;
    const tea = Math.pow(1 + rate, m) - 1;
    expect(Number((tea * 100).toFixed(6))).toBeCloseTo(26.228645, 6);
  });

  it("converts 1.96% nominal annual convertible monthly to TEA correctly", () => {
    const iN = 1.96 / 100;
    const m = 12;
    const tea = Math.pow(1 + iN / m, m) - 1;
    expect(Number((tea * 100).toFixed(6))).toBeCloseTo(1.977704, 6);
  });
});
