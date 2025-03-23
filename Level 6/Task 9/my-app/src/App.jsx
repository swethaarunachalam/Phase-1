import React, { useRef } from "react";
import "./App.css"; // Importing CSS file

const App = () => {
  const inputRef = useRef(null);

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="container">
      <h2>useRef DOM Manipulation</h2>
      <input
        ref={inputRef}
        type="text"
        placeholder="Type something..."
        className="input-field"
      />
      <button onClick={handleFocus} className="focus-button">
        Focus Input
      </button>
    </div>
  );
};

export default App;
