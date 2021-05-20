import { ChangeEvent } from "react";
import styles from "./number-input.module.css";

interface Props {
  id: string;
  value: number;
  direction: string;
  onChangeHandler: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export const NumberInput = ({
  id,
  value,
  direction,
  onChangeHandler,
}: Props) => {
  return (
    <div>
      <label className={styles.label} htmlFor={id}>
        {direction}
      </label>
      <input
        className={styles.input}
        type="number"
        id={id}
        value={value}
        onChange={onChangeHandler}
      />
    </div>
  );
};
