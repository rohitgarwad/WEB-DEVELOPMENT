import "./styles.css";
import { useState } from "react";
function App() {
  const [currentValue, setCurrentValue] = useState("0");
  const [prevValue, setPrevValue] = useState("0");
  const [formula, setFormula] = useState("");
  const [evaluated, setEvaluated] = useState(false);

  const isOperator = /[x/+-]/;
  const endsWithOperator = /[x+-/]$/;
  const endsWithNegativeSign = /\d[x/+-]{1}-$/;

  function initialize() {
    setCurrentValue("0");
    setPrevValue("0");
    setFormula("");
    setEvaluated(false);
  }
  function maxDigiWarning() {
    setCurrentValue("Digi Limit Met");
    setTimeout(() => setCurrentValue(currentValue), 1e3);
  }
  function handleNumbers(event) {
    if (!currentValue.includes("Limit")) {
      const value = event.target.value;
      setEvaluated(false);
      if (currentValue.length > 21) {
        maxDigiWarning();
      } else if (evaluated) {
        setCurrentValue(value);
        setFormula(value !== "0" ? value : "");
      } else {
        setCurrentValue(
          currentValue === "0" || isOperator.test(currentValue)
            ? value
            : currentValue + value
        );
        setFormula(
          currentValue === "0" && value === "0"
            ? formula === ""
              ? value
              : formula
            : /([^.0-9]0|^0)$/.test(formula)
            ? formula.slice(0, -1) + value
            : formula + value
        );
      }
    }
  }
  function handleDecimal() {
    if (evaluated) {
      setCurrentValue("0.");
      setFormula("0.");
      setEvaluated(false);
    } else if (!currentValue.includes(".") && !currentValue.includes("Limit")) {
      setEvaluated(false);
      if (currentValue.length > 21) {
        maxDigiWarning();
      } else if (
        endsWithOperator.test(formula) ||
        (currentValue === "0" && formula === "")
      ) {
        setCurrentValue("0.");
        setFormula(formula + "0.");
      } else {
        setCurrentValue(formula.match(/(-?\d+\.?\d*)$/)[0] + ".");
        setFormula(formula + ".");
      }
    }
  }
  function handleOperators(event) {
    if (!currentValue.includes("Limit")) {
      const value = event.target.value;
      setCurrentValue(value);
      setEvaluated(false);
      if (evaluated) {
        setFormula(prevValue + value);
      } else if (endsWithOperator.test(formula)) {
        if (endsWithNegativeSign.test(formula)) {
          value !== "-" && setFormula(prevValue + value);
        } else {
          setFormula(
            (endsWithNegativeSign.test(formula + value) ? formula : prevValue) +
              value
          );
        }
      } else {
        setPrevValue(formula);
        setFormula(formula + value);
      }
    }
  }
  function handleEvaluate() {
    if (!currentValue.includes("Limit")) {
      let expression = formula;
      if (formula.includes("=")) {
        setFormula(currentValue);
      } else {
        while (endsWithOperator.test(formula)) {
          expression = expression.slice(0, -1);
        }
        expression = expression
          .replace(/x/g, "*")
          .replace(/-/g, "-")
          .replace("--", "-");
        let answer = Math.round(1e12 * eval(expression)) / 1e12;
        setCurrentValue(answer.toString());
        setFormula(
          expression
            .replace(/\*/g, "⋅")
            .replace(/-/g, "-")
            .replace(/(x|\/|\+)-/, "$1-")
            .replace(/^-/, "-") +
            "=" +
            answer
        );
        setPrevValue(answer);
        setEvaluated(true);
      }
    }
  }

  return (
    <div className="App">
      <div>
        <div className="calculator">
          <div className="formulaScreen">{formula.replace(/x/g, "⋅")}</div>
          <div className="outputScreen" id="display">
            {currentValue}
          </div>
          <div>
            <button
              className="jumbo"
              id="clear"
              value="AC"
              style={{ background: "rgb(172, 57, 57)" }}
              onClick={initialize}
            >
              AC
            </button>
            <button
              id="divide"
              value="/"
              style={{ background: "rgb(102, 102, 102)" }}
              onClick={handleOperators}
            >
              /
            </button>
            <button
              id="multiply"
              value="x"
              style={{ background: "rgb(102, 102, 102)" }}
              onClick={handleOperators}
            >
              x
            </button>
            <button id="seven" value="7" onClick={handleNumbers}>
              7
            </button>
            <button id="eight" value="8" onClick={handleNumbers}>
              8
            </button>
            <button id="nine" value="9" onClick={handleNumbers}>
              9
            </button>
            <button
              id="subtract"
              value="-"
              style={{ background: "rgb(102, 102, 102)" }}
              onClick={handleOperators}
            >
              -
            </button>
            <button id="four" value="4" onClick={handleNumbers}>
              4
            </button>
            <button id="five" value="5" onClick={handleNumbers}>
              5
            </button>
            <button id="six" value="6" onClick={handleNumbers}>
              6
            </button>
            <button
              id="add"
              value="+"
              style={{ background: "rgb(102, 102, 102)" }}
              onClick={handleOperators}
            >
              +
            </button>
            <button id="one" value="1" onClick={handleNumbers}>
              1
            </button>
            <button id="two" value="2" onClick={handleNumbers}>
              2
            </button>
            <button id="three" value="3" onClick={handleNumbers}>
              3
            </button>
            <button
              className="jumbo"
              id="zero"
              value="0"
              onClick={handleNumbers}
            >
              0
            </button>
            <button id="decimal" value="." onClick={handleDecimal}>
              .
            </button>
            <button
              id="equals"
              value="="
              style={{
                background: "rgb(0, 68, 102)",
                position: "absolute",
                height: "130px",
                bottom: "5px",
              }}
              onClick={handleEvaluate}
            >
              =
            </button>
          </div>
        </div>
        <div className="author">
          Designed and Coded <br />{" "}
          <a href="/#" target="_blank" rel="noreferrer">
            By G Rohit
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
