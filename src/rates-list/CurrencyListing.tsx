import { ArrowUp } from "../components/ArrowUp";
import { ArrowDown } from "../components/ArrowDown";
import { Equals } from "../components/Equals";
import styles from "./currency-listing.module.css";

interface Props {
  symbol: String;
  fullName: String;
  trend: "up" | "down" | "equal";
  latestRate: number;
}

export const CurrencyListing = ({
  symbol,
  fullName,
  trend,
  latestRate,
}: Props) => {
  const trendSymbols = {
    up: <ArrowUp />,
    down: <ArrowDown />,
    equal: <Equals />,
  };

  return (
    <li className={styles.listing}>
      <div className={styles.listingLayout}>
        <span className={styles.symbol}>{symbol}</span>
        <span className={styles.fullName}>{fullName}</span>
        <span className={styles.trend}>{trendSymbols[trend]}</span>
        <span className={styles.latestRate}>{latestRate}</span>
      </div>
    </li>
  );
};
