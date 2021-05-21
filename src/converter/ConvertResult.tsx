import { Currencies } from "../interfaces/Currencies.interface";
// import styles from "./convert-result.module.css";

interface Props {
  currencies: Currencies;
  from: string;
  to: string;
  amount1: number;
  amount2: number;
}

export const ConvertResult = ({
  currencies,
  from,
  to,
  amount1,
  amount2,
}: Props) => {
  const fromString = `${amount1} ${currencies[from]}`;
  const toString = `${amount2} ${currencies[to]}`;

  return (
    <div>
      <p>{`${fromString} is equal to ${toString}`}</p>
    </div>
  );
};
