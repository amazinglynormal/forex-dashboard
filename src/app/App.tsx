import { useState, useEffect } from "react";

import { Header } from "../components/Header";
import { Layout } from "../components/Layout";
import { Converter } from "../converter/Converter";
import { Graph } from "../graph/Graph";
import { RateList } from "../rates-list/RateList";

import fetchCurrencies from "../utils/fetchCurrencies";
import fetchLatestExchangeRate from "../utils/fetchLatestExchangeRate";
import fetchPreviousExchangeRate from "../utils/fetchPreviousExchangeRate";

import { Currencies } from "../interfaces/Currencies.interface";
import { LatestRate } from "../interfaces/LatestRate.interface";
import { PreviousRate } from "../interfaces/PreviousRate.interface";

interface State {
  currencies: Currencies;
  latest: LatestRate;
  previous: PreviousRate;
}

const initialData = {
  currencies: {},
  latest: {
    amount: 0,
    base: "EUR",
    date: "2020-01-01",
    rates: {
      EUR: 0,
    },
  },
  previous: {
    amount: 0,
    base: "EUR",
    date: "2020-01-01",
    rates: {
      EUR: 0,
    },
  },
};

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<State>(initialData);

  useEffect(() => {
    const fetchData = async () => {
      const currencies = await fetchCurrencies();
      const latest = await fetchLatestExchangeRate();
      const previous = await fetchPreviousExchangeRate();

      if (currencies.data && latest.data && previous.data) {
        setData({
          currencies: currencies.data,
          latest: latest.data,
          previous: previous.data,
        });
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header headingSize="h1" headingText="Forex Dashboard" />
      <Layout>
        <RateList
          latestData={data.latest}
          previousData={data.previous}
          currencies={data.currencies}
          loading={loading}
        />
        <Graph currencies={data.currencies} loading={loading} />
        <Converter
          latestData={data.latest}
          currencies={data.currencies}
          loading={loading}
        />
      </Layout>
    </>
  );
}

export default App;
