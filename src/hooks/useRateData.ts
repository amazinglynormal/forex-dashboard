import { RateData } from "../interfaces/RateData.interface";
import { Currencies } from "../interfaces/Currencies.interface";
import { LatestRate } from "../interfaces/LatestRate.interface";
import { PreviousRate } from "../interfaces/PreviousRate.interface";

const useRateData = (
  latest: LatestRate,
  previous: PreviousRate,
  currencies: Currencies
) => {
  const rateData: RateData[] = [];

  const symbols = Object.keys(currencies);

  for (const symbol of symbols) {
    if (symbol === "EUR") {
      continue;
    }

    const latestRate = latest.rates[symbol];
    const previousRate = previous.rates[symbol];

    let trend: string;
    const calculatedTrend = latestRate - previousRate;
    if (calculatedTrend > 0) trend = "up";
    else if (calculatedTrend < 0) trend = "down";
    else trend = "equal";

    const data = {
      symbol,
      fullName: currencies[symbol],
      latestRate,
      trend,
    } as RateData;

    rateData.push(data);
  }

  return rateData;
};

export default useRateData;
