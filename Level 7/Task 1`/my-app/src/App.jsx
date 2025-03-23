import React, { useState } from "react";
import "./App.css"; 

export const ToggleComponent = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="container">
      <button
        onClick={() => setIsVisible((prev) => !prev)}
        className={`toggle-button ${isVisible ? "hide" : "show"}`}
      >
        {isVisible ? "Hide Content" : "Show Content"}
      </button>

      {isVisible && <p className="content">🎉 Hello! This content is now visible.</p>}
    </div>
  );
};

const App = () => {
  return (
    <div>
      <ToggleComponent />
    </div>
  );
};

export default App;
