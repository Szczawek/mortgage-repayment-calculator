import { useEffect } from "react";

export default function WaitingForResults() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className="waiting-for-results">
      <img className="logo" src="./images/illustration-empty.svg" alt="decoration" />
      <div className="descryption">
      <h2>Results shown here</h2>
      <p className="title-descryption">
        Complete the form and click "calculate repayments" to see what your
        monthly repayments would be.
      </p>
      </div>
    </div>
  );
}
