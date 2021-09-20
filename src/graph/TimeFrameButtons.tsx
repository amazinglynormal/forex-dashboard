import styles from "./time-frame-buttons.module.css";

import { calculateOneYearAgo } from "../utils/calculateOneYearAgo";
import { calculateOneMonthAgo } from "../utils/calculateOneMonthAgo";

interface Props {
  onClickHandler: (value: string) => void;
}

export const TimeFrameButtons = ({ onClickHandler }: Props) => {
  const calculateTenYearsAgo = () => {
    const today = new Date();

    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear() - 10;

    return `${year}-${month < 10 ? "0" : ""}${month}-${
      date < 10 ? "0" : ""
    }${date}..`;
  };

  return (
    <div className={styles.buttonContainer}>
      <button
        onClick={() => {
          const date = calculateOneMonthAgo();
          onClickHandler(date);
        }}
      >
        1 month
      </button>
      <button
        onClick={() => {
          const date = calculateOneYearAgo();
          onClickHandler(date);
        }}
      >
        1 year
      </button>
      <button
        onClick={() => {
          const date = calculateTenYearsAgo();
          onClickHandler(date);
        }}
      >
        10 years
      </button>
      <button onClick={() => onClickHandler("2000-01-01..")}>Since 2000</button>
    </div>
  );
};
