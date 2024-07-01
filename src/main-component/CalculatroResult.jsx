import { useContext, useEffect } from "react";
import { DataContext } from "../App";
export default function CalculatorRasult() {
  const { billsMonthly, allBills, type, interest } = useContext(DataContext);
  useEffect(() => {
    window.scrollTo({
      top: innerHeight,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className="calculator-results">
      <header className="title-table">
        <h2>Your results</h2>
        <p className="sub-title">
          Your results are shown below based on the information you provided. To
          adjust the results, edit the form and click "calculate repayments"
          again.
        </p>
      </header>
      <div className="number-results">
        <div className="decoration"></div>
        {type === "repayment" ? (
          <>
            <h3>Your monthly repayments</h3>
            <p className="main-founds">£{billsMonthly}</p>
            <hr className="line" />
            <h4>Total you'll repay over the term</h4>
            <p className="sub-founds">£{allBills}</p>
          </>
        ) : (
          <>
            <h3>Your monthly interest</h3>
            <p className="main-founds">£{interest}</p>
          </>
        )}
      </div>
    </div>
  );
}
