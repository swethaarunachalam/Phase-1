// App.jsx
import React from "react";
import { useState, useRef } from "react";
import "./App.css";

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef(null);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return { value, onChange: handleChange, inputRef };
};

const App = () => {
  const inputProps = useInput("");

  return (
    <div className="container">
      <h2>Custom Hook: useInput</h2>
      <input type="text" {...inputProps} className="input-box" placeholder="Type something..." />
      <p>Entered Text: {inputProps.value}</p>
    </div>
  );
};

export default App;

