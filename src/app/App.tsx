import { Header } from "../components/Header";
import { Layout } from "../components/Layout";
import { Converter } from "../converter/Converter";
import { Graph } from "../graph/Graph";
import { RateList } from "../rates-list/RateList";

function App() {
  return (
    <>
      <Header headingSize="h1" headingText="Forex Dashboard" />
      <Layout>
        <RateList />
        <Graph />
        <Converter />
      </Layout>
    </>
  );
}

export default App;
