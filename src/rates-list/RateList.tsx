import styles from "./rate-list.module.css";
import useRateData from "../hooks/useRateData";
import { CurrencyListing } from "./CurrencyListing";

export const RateList = () => {
  const rateData = useRateData();

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
    <div className={styles.list}>
      <ul>{renderedCurrencies}</ul>
    </div>
  );
};
