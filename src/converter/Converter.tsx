import { ChangeEvent, useState } from "react";

import { Header } from "../components/Header";
import { NumberInput } from "./NumberInput";
import { CurrencySelect } from "../components/CurrencySelect";
import { ConvertResult } from "./ConvertResult";
import styles from "./converter.module.css";

import calculateExchangeRate from "../utils/calculateExchangeRate";

import { LatestRate } from "../interfaces/LatestRate.interface";
import { Currencies } from "../interfaces/Currencies.interface";

interface Props {
  latestData: LatestRate;
  currencies: Currencies;
  loading: boolean;
}

const initialState = {
  from: "EUR",
  to: "USD",
  amount1: 0,
  amount2: 0,
};

export const Converter = ({ latestData, currencies, loading }: Props) => {
  const [exchangeRate, setExchangeRate] = useState(initialState);

  const rates = latestData.rates;

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
      <div className={styles.inputContainer}>
        <div className={styles.from}>
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
        </div>
        <div className={styles.to}>
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
        </div>
      </div>
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
