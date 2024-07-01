import Results from "./main-component/Results";
import Calculator from "./main-component/Calculator";
import "./styles.css";
import { mortageCalculator } from "./main-component/mortgageCalculator";
import { createContext, useState } from "react";
const DataContext = createContext();
export default function App() {
  const [resultsAreReady, setResultsAreReady] = useState(false);
  const [data, setData] = useState({});
  function caclulate(e) {
    if (resultsAreReady) return setResultsAreReady(false);
    const { amount, term, rate,type } = e;
    const { interest, monthlyPayments, allPayments } = mortageCalculator(amount, rate, term);

    setData({
      billsMonthly: monthlyPayments,
      allBills: allPayments,
      interest,
      type,
    });
    setResultsAreReady(true);
  }
  return (
    <div className="root">
      <Calculator resetIsAnvaliable={resultsAreReady} sendForm={caclulate} />
      <DataContext.Provider value={data}>
        <Results resultsAreReady={resultsAreReady} data={data} />
      </DataContext.Provider>
    </div>
  );
}

export { DataContext };
