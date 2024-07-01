import { useEffect, useRef, useState } from "react";
import "./calculator.css";
export default function Calculator({ resetIsAnvaliable, sendForm }) {
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [rate, setRate] = useState("");
  const [warning, setWarning] = useState(false);
  const checkedInput = useRef(null);
  const formToCheck = useRef(null);
  const elementToFocus = useRef(null);
  const quickFocus = useRef(null);

  useEffect(() => {
    if (elementToFocus.current) {
      elementToFocus.current.focus();
    }
  }, []);

  useEffect(() => {
    if (warning) setWarning(false);
  }, [amount, rate, term]);

  function reset() {
    // Here sendForm works only to close the window, not to send data
    if (resetIsAnvaliable) sendForm();
    setAmount("");
    setRate("");
    setTerm("");
    if (checkedInput.current) {
      checkedInput.current.checked = false;
    }
    elementToFocus.current.focus();
  }

  function setType(e) {
    if (e.key === "Enter") {
      const inp = e.target.previousSibling;
      inp.checked = true;
      checkedInput.current = inp;
      if (warning) setWarning(false);
    }
  }

  function isSignCorrect(e) {
    if (e.ctrlKey) return;
    const defaultSign = [
      "Backspace",
      "ArrowLeft",
      "ArrowRight",
      "Alt",
      "Tab",
      "Enter",
    ];
    if (isNaN(Number(e.key)) && !defaultSign.includes(e.key))
      e.preventDefault();
  }

  return (
    <div className="calculator">
      <form
        ref={formToCheck}
        onSubmit={(e) => {
          e.preventDefault();
          if (resetIsAnvaliable) return reset();
          sendForm({ amount, term, rate, type: checkedInput.current.value })
        }}>
        <header className="title">
          <h1>Mortgage Calculator</h1>
          <button onClick={() => reset()} type="button" className="reset">
            Clear All
          </button>
        </header>
        <div className="amount">
          <p>Mortgage Amount</p>
          <label className={warning ? "empty" : ""} htmlFor="amount">
            <p className="addition">£</p>
            <input
              ref={elementToFocus}
              maxLength={12}
              value={amount}
              onKeyDown={(e) => {
                isSignCorrect(e);
              }}
              onChange={(e) => setAmount(e.target.value)}
              id="amount"
              required
            />
          </label>
          {warning && <small className="warning">This field is required</small>}
        </div>
        <div className="configuration">
          <div className="box">
            <p>Mortage Term</p>
            <label className={warning ? "empty" : ""} htmlFor="term">
              <input
                maxLength={2}
                value={term}
                onKeyDown={(e) => isSignCorrect(e)}
                onChange={(e) => setTerm(e.target.value)}
                id="term"
                required
              />
              <p className="addition">years</p>
            </label>
            {warning && (
              <small className="warning">This field is required</small>
            )}
          </div>
          <div className="box">
            <p>Interest Rate</p>
            <label className={warning ? "empty" : ""} htmlFor="rate">
              <input
                required
                maxLength={5}
                value={rate}
                onBlur={(e) => {
                  if (e.target.value[rate.length - 1] === ".") {
                    setRate(`${e.target.value}0`);
                  }
                }}
                onKeyDown={(e) => {
                  if (
                    (rate[rate.length - 1] === "." && e.key === ".") ||
                    (rate.includes(".") && e.key === ".")
                  )
                    e.preventDefault();
                  switch (e.key) {
                    case "Enter":
                      return quickFocus.current.focus();
                    case ".":
                      return;
                  }

                  isSignCorrect(e);
                }}
                onChange={(e) => {
                  let rateValue = e.target.value;
                  if (rateValue[0] === ".") rateValue = `0${rateValue}`;
                  setRate(rateValue);
                }}
                id="rate"
              />
              <p className="addition">%</p>
            </label>
            {warning && (
              <small className="warning">This field is required</small>
            )}
          </div>
        </div>
        <div className={`options-to-choose ${warning ? "empty" : ""}`}>
          <p>Mortgage Type</p>
          <input
            onClick={(e) => {
              checkedInput.current = e.target;
            }}
            id="option-repayment"
            type="radio"
            name="type"
            value={"repayment"}
            required
          />
          <label
            ref={quickFocus}
            onKeyDown={(e) => setType(e)}
            onClick={() => warning && setWarning(false)}
            tabIndex={0}
            htmlFor="option-repayment">
            <div className="circle"></div>
            Repayment
          </label>
          <input
            onClick={(e) => {
              checkedInput.current = e.target;
            }}
            id="option-interest"
            type="radio"
            name="type"
            value={"interest only"}
            required
          />
          <label
            onKeyDown={(e) => setType(e)}
            onClick={() => warning && setWarning(false)}
            tabIndex={0}
            htmlFor="option-interest">
            <div className="circle"></div>
            Interest Only
          </label>
          {warning && <small className="warning">This field is required</small>}
        </div>
        <button
          tabIndex={0}
          onKeyDown={(e) => {
            e.preventDefault();
            if (e.key !== "Enter") return;

            if (resetIsAnvaliable) return reset();
            const isFormCorrect = formToCheck.current.checkValidity();
            if (!isFormCorrect) return setWarning(true);
            sendForm({ amount, term, rate, type: checkedInput.current.value });
          }}
          onClick={(e) => {
            if (
              !formToCheck.current.checkValidity() &&
              document.activeElement === e.target
            )
              setWarning(true);
          }}
          className="confirm"
          type="submit">
          Calculate Repayments
        </button>
      </form>
    </div>
  );
}
