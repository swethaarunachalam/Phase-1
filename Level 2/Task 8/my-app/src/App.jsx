import { useState } from "react";
import './App.css'
function App() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="toggle-container">
      <h1>Toggle Content</h1>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? "Hide Content" : "Show Content"}
      </button>
      {isVisible && <div className="content">I AM SWETHA BTECH-IT!</div>}
    </div>
  );
}

export default App;
