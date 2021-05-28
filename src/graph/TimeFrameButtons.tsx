import styles from "./time-frame-buttons.module.css";

interface Props {
  onClickHandler: (value: string) => void;
}

export const TimeFrameButtons = ({ onClickHandler }: Props) => {
  return (
    <div className={styles.buttonContainer}>
      <button onClick={() => onClickHandler("2021-04-01..")}>1 month</button>
      <button onClick={() => onClickHandler("2020-05-01..")}>1 year</button>
      <button onClick={() => onClickHandler("2010-01-01..")}>10 years</button>
      <button onClick={() => onClickHandler("2000-01-01..")}>Since 2000</button>
    </div>
  );
};
