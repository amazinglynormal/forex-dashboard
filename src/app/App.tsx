import { Header } from "../components/Header";
import { Layout } from "../components/Layout";
import { RateList } from "../rates-list/RateList";

function App() {
  return (
    <>
      <Header headingSize="h1" headingText="Forex Dashboard" />
      <Layout>
        <RateList />
      </Layout>
    </>
  );
}

export default App;
