import useAxios from "./useAxios";

import { BASE_URL } from "../app/constants";
import { RateData } from "../interfaces/RateData.interface";
import { Currencies } from "../interfaces/Currencies.interface";
import { LatestRate } from "../interfaces/LatestRate.interface";
import { PreviousRate } from "../interfaces/PreviousRate.interface";

const useRateData = () => {
  const currencyData = useAxios<Currencies>(`${BASE_URL}/currencies`);

  const latestRateData = useAxios<LatestRate>(`${BASE_URL}/latest`);

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const ydayYear = yesterday.getFullYear();
  const ydayMonth = yesterday.getMonth() + 1;
  const ydayDate = yesterday.getDate();
  const yesterdayString = `${ydayYear}-${
    ydayMonth < 10 ? "0" : ""
  }${ydayMonth}-${ydayDate}`;

  const previousRateData = useAxios<PreviousRate>(
    `${BASE_URL}/${yesterdayString}`
  );

  const rateData: RateData[] = [];

  if (currencyData.data && latestRateData.data && previousRateData.data) {
    const symbols = Object.keys(currencyData.data);
    for (const symbol of symbols) {
      if (symbol === "EUR") {
        continue;
      }

      const latestRate = latestRateData.data.rates[symbol];
      const previousRate = previousRateData.data.rates[symbol];

      let trend: string;
      const calculatedTrend = latestRate - previousRate;
      if (calculatedTrend > 0) trend = "up";
      else if (calculatedTrend < 0) trend = "down";
      else trend = "equal";

      const data = {
        symbol,
        fullName: currencyData.data[symbol],
        latestRate,
        trend,
      } as RateData;

      rateData.push(data);
    }
  }

  return rateData;
};

export default useRateData;
