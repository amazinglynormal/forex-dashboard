import { ChangeEvent } from "react";
import { Currencies } from "../interfaces/Currencies.interface";
import styles from "./currency-select.module.css";

interface Props {
  currencies: Currencies;
  direction: "to" | "from";
  id: string;
  value: string;
  onChangeHandler: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export const CurrencySelect = ({
  id,
  value,
  currencies,
  direction,
  onChangeHandler,
}: Props) => {
  const renderedOptions = Object.keys(currencies).map((symbol) => {
    return (
      <option key={symbol} value={symbol}>
        {currencies[symbol]}
      </option>
    );
  });

  return (
    <div>
      <label className={styles.label} htmlFor={direction}>
        {direction}
      </label>
      <select
        className={styles.select}
        name={direction}
        id={id}
        onChange={onChangeHandler}
        value={value}
      >
        {renderedOptions}
      </select>
    </div>
  );
};
