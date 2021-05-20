import { Header } from "../components/Header";
import { Layout } from "../components/Layout";
import { Converter } from "../converter/Converter";
import { Graph } from "../graph/Graph";
import { RateList } from "../rates-list/RateList";
import useRateData from "../hooks/useRateData";

function App() {
  const { rateListData, latestRateData, currencyData } = useRateData();

  return (
    <>
      <Header headingSize="h1" headingText="Forex Dashboard" />
      <Layout>
        <RateList rateListData={rateListData} />
        <Graph />
        <Converter
          latestRateData={latestRateData.data}
          currencies={currencyData.data}
        />
      </Layout>
    </>
  );
}

export default App;
