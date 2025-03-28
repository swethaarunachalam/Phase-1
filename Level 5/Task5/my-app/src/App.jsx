// App.jsx
import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("");
  const [operator, setOperator] = useState(null);
  const [prevInput, setPrevInput] = useState("");
  const [result, setResult] = useState(null);
  const [expression, setExpression] = useState(""); // Stores full equation

  const handleNumberClick = (num) => {
    if (input === "0" && num === "0") return; // Prevent multiple leading zeros
    setInput((prev) => (prev === "0" ? num : prev + num));
  };

  const handleOperatorClick = (op) => {
    if (input === "") return;
    if (operator) {
      handleEqualsClick(); // Evaluate previous operation first
    }
    setOperator(op);
    setPrevInput(input);
    setExpression(input + " " + op); // Display equation so far
    setInput("");
  };

  const handleEqualsClick = () => {
    if (!operator || input === "") return;
    const num1 = parseFloat(prevInput);
    const num2 = parseFloat(input);
    let res;

    switch (operator) {
      case "+":
        res = num1 + num2;
        break;
      case "-":
        res = num1 - num2;
        break;
      case "*":
        res = num1 * num2;
        break;
      case "/":
        res = num2 !== 0 ? num1 / num2 : "Error";
        break;
      default:
        return;
    }

    setExpression(prevInput + " " + operator + " " + input + " = " + res); // Full equation
    setResult(res);
    setInput(res.toString());
    setOperator(null);
    setPrevInput(res.toString());
  };

  const handleClear = () => {
    setInput("");
    setOperator(null);
    setPrevInput("");
    setResult(null);
    setExpression("");
  };

  return (
    <div className="calculator">
      <div className="display">{expression || result || input || "0"}</div>
      <div className="buttons">
        {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", "C", "=", "+"].map((btn) => (
          <button
            key={btn}
            className={`btn ${btn === "C" ? "clear" : btn === "=" ? "equals" : ""}`}
            onClick={() =>
              btn === "C"
                ? handleClear()
                : btn === "="
                ? handleEqualsClick()
                : ["+", "-", "*", "/"].includes(btn)
                ? handleOperatorClick(btn)
                : handleNumberClick(btn)
            }
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
