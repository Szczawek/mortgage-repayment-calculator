import WaitingForResults from "./WaitingForResults";
import CalculatorRasult from "./CalculatroResult";
import "./results.css";

export default function Results({ resultsAreReady }) {
  return (
    <div className="results">
      {resultsAreReady ? <CalculatorRasult /> : <WaitingForResults />}
    </div>
  );
}
