import { ChangeEvent } from "react";
import { Currencies } from "../interfaces/Currencies.interface";
import styles from "./currency-select.module.css";

interface Props {
  currencies: Currencies;
  label: string;
  id: string;
  value: string;
  onChangeHandler: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  graph?: boolean;
}

export const CurrencySelect = ({
  id,
  value,
  currencies,
  label,
  onChangeHandler,
  graph = false,
}: Props) => {
  const currencyList = graph
    ? Object.keys(currencies).filter((key) => key !== "EUR")
    : Object.keys(currencies);

  const renderedOptions = currencyList.map((symbol) => {
    return (
      <option key={symbol} value={symbol}>
        {currencies[symbol]}
      </option>
    );
  });

  return (
    <div>
      <label className={styles.label} htmlFor={label}>
        {label}
      </label>
      <select
        className={styles.select}
        name={label}
        id={id}
        onChange={onChangeHandler}
        value={value}
      >
        {renderedOptions}
      </select>
    </div>
  );
};
