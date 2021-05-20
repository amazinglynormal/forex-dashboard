interface Rates {
  [symbol: string]: number;
}

const calculateExchangeRate = (
  from: string,
  to: string,
  amount: number,
  rates: Rates
): number => {
  const fromRate = from !== "EUR" ? rates[from] : 1.0;
  const toRate = to !== "EUR" ? rates[to] : 1.0;

  const euro = amount / fromRate;
  const result = euro * toRate;

  return Math.round((result + Number.EPSILON) * 100) / 100;
};

export default calculateExchangeRate;
