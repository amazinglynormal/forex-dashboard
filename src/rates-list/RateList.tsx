import { Header } from "../components/Header";
import { CurrencyListing } from "./CurrencyListing";
import styles from "./rate-list.module.css";

import useRateData from "../hooks/useRateData";

import { LatestRate } from "../interfaces/LatestRate.interface";
import { PreviousRate } from "../interfaces/PreviousRate.interface";
import { Currencies } from "../interfaces/Currencies.interface";

interface Props {
  latestData: LatestRate;
  previousData: PreviousRate;
  currencies: Currencies;
  loading: boolean;
}

export const RateList = ({
  latestData,
  previousData,
  currencies,
  loading,
}: Props) => {
  const rateData = useRateData(latestData, previousData, currencies);

  const renderedCurrencies = rateData.map((data) => {
    return (
      <CurrencyListing
        key={data.symbol}
        symbol={data.symbol}
        fullName={data.fullName}
        trend={data.trend}
        latestRate={data.latestRate}
      />
    );
  });

  return (
    <article className={styles.list}>
      <Header headingText="Latest Exchange Rates" headingSize="h2" />
      <ul>{renderedCurrencies}</ul>
    </article>
  );
};
