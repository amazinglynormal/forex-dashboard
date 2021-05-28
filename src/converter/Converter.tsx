import { ChangeEvent, useState } from "react";
import { LatestRate } from "../interfaces/LatestRate.interface";
import styles from "./converter.module.css";
import calculateExchangeRate from "../utils/calculateExchangeRate";
import { NumberInput } from "./NumberInput";
import { Currencies } from "../interfaces/Currencies.interface";
import { CurrencySelect } from "../components/CurrencySelect";
import { ConvertResult } from "./ConvertResult";
import { Header } from "../components/Header";

interface Props {
  latestRateData: LatestRate | undefined;
  currencies: Currencies | undefined;
}

const initialState = {
  from: "EUR",
  to: "USD",
  amount1: 0,
  amount2: 0,
};

export const Converter = ({ latestRateData, currencies }: Props) => {
  const [exchangeRate, setExchangeRate] = useState(initialState);

  if (!latestRateData || !currencies) {
    return (
      <div className={styles.converter}>
        <p>Something went wrong</p>
      </div>
    );
  }

  const rates = latestRateData.rates;

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const id = e.target.id;
    const value =
      id === "amount1" || id === "amount2"
        ? Number(e.target.value)
        : e.target.value;

    let result: number;

    if ((id === "amount1" || id === "amount2") && value < 0) {
      return;
    }

    if (id === "from" && typeof value === "string") {
      result = calculateExchangeRate(
        value,
        exchangeRate.to,
        exchangeRate.amount1,
        rates
      );
      setExchangeRate((prevState) => {
        return { ...prevState, from: value, amount2: result };
      });
    } else if (id === "to" && typeof value === "string") {
      result = calculateExchangeRate(
        exchangeRate.from,
        value,
        exchangeRate.amount1,
        rates
      );
      setExchangeRate((prevState) => {
        return { ...prevState, to: value, amount2: result };
      });
    } else if (id === "amount1" && typeof value === "number") {
      result = calculateExchangeRate(
        exchangeRate.from,
        exchangeRate.to,
        value,
        rates
      );
      setExchangeRate((prevState) => {
        return { ...prevState, amount1: value, amount2: result };
      });
    } else if (id === "amount2" && typeof value === "number") {
      result = calculateExchangeRate(
        exchangeRate.to,
        exchangeRate.from,
        value,
        rates
      );
      setExchangeRate((prevState) => {
        return { ...prevState, amount2: value, amount1: result };
      });
    }
  };

  return (
    <article className={styles.converter}>
      <Header headingText="Exchange Rate Converter" headingSize="h2" />
      <NumberInput
        id="amount1"
        direction="from"
        value={exchangeRate.amount1}
        onChangeHandler={onChange}
      />
      <CurrencySelect
        currencies={currencies}
        id="from"
        value={exchangeRate.from}
        label="from"
        onChangeHandler={onChange}
      />
      <NumberInput
        id="amount2"
        direction="to"
        value={exchangeRate.amount2}
        onChangeHandler={onChange}
      />
      <CurrencySelect
        currencies={currencies}
        id="to"
        value={exchangeRate.to}
        label="to"
        onChangeHandler={onChange}
      />
      <ConvertResult
        currencies={currencies}
        from={exchangeRate.from}
        to={exchangeRate.to}
        amount1={exchangeRate.amount1}
        amount2={exchangeRate.amount2}
      />
    </article>
  );
};
