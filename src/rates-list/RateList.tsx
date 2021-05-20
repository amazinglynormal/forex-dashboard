import styles from "./rate-list.module.css";
import { CurrencyListing } from "./CurrencyListing";
import { RateData } from "../interfaces/RateData.interface";

interface Props {
  rateListData: RateData[];
}

export const RateList = ({ rateListData }: Props) => {
  const renderedCurrencies = rateListData.map((data) => {
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
