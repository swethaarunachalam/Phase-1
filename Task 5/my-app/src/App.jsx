import React from "react";
import "./App.css";

const App = () => {
  const num1 = 50;
  const num2 = 20;
  const result = num1 + num2; // Performing calculation

  return (
    <div className="container">
      <h1>JSX Calculation Example</h1>
      <p>The sum of {num1} and {num2} is: <strong>{result}</strong></p>
    </div>
  );
};

export default App;
