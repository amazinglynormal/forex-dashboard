import { ChangeEvent, useEffect, useState } from "react";
import { Header } from "../components/Header";
import { CurrencySelect } from "../components/CurrencySelect";
import { D3LineChart } from "./D3LineChart";
import { TimeFrameButtons } from "./TimeFrameButtons";
import styles from "./graph.module.css";

import fetchTimeSeriesData from "../utils/fetchTimeSeriesData";
import { calculateOneYearAgo } from "../utils/calculateOneYearAgo";
// import useGraphSize from "../hooks/useGraphSize";

import { TimeSeries } from "../interfaces/TimeSeries.interface";
import { Currencies } from "../interfaces/Currencies.interface";

interface Props {
  currencies: Currencies;
  loading: boolean;
}

const initialData = {
  amount: 1.0,
  base: "EUR",
  start_date: "2020-01-01",
  end_date: "2020-01-01",
  rates: {
    "2020-01-01": {
      USD: 1.22,
    },
  },
};

export const Graph = ({ currencies, loading }: Props) => {
  const oneYearAgo = calculateOneYearAgo();
  const [currency, setCurrency] = useState("USD");
  const [timeFrame, setTimeFrame] = useState(oneYearAgo);
  const [data, setData] = useState<TimeSeries>(initialData);
  // const graphSize = useGraphSize();

  const onCurrencyChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCurrency(e.target.value);
  };

  const onTimeFrameChange = (value: string) => {
    setTimeFrame(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const timeSeriesData = await fetchTimeSeriesData(currency, timeFrame);
      if (timeSeriesData.data) {
        setData(timeSeriesData.data);
      }
    };

    fetchData();
  }, [currency, timeFrame]);

  return (
    <article className={styles.graph}>
      <Header headingText="Exchange Rates Over Time" headingSize="h2" />
      <p>{`timeframe: ${timeFrame} & currency: ${currency}`}</p>
      <div>
        <D3LineChart
          data={data}
          currency={currency}
          svgWidth={700}
          svgHeight={500}
        />
      </div>
      {currencies && (
        <CurrencySelect
          id="Select Currency"
          label="Select Currency"
          value={currency}
          onChangeHandler={onCurrencyChange}
          currencies={currencies}
          graph={true}
        />
      )}
      <TimeFrameButtons onClickHandler={onTimeFrameChange} />
    </article>
  );
};
