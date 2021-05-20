import calculateExchangeRate from "../utils/calculateExchangeRate";

const rates = {
  USD: 1.2212,
  AUD: 1.5765,
};

describe("calculateExchangeRate", () => {
  test("returns correct result", () => {
    const result1 = calculateExchangeRate("USD", "EUR", 1, rates);
    const result2 = calculateExchangeRate("USD", "AUD", 1, rates);

    expect(result1).toBeCloseTo(0.82);
    expect(result2).toBeCloseTo(1.29);
  });
});
