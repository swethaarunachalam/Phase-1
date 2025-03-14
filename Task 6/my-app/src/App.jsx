import React, { useState } from "react";
import DynamicDiv from "./DynamicDiv";
import "./App.css";

const App = () => {
  const [color, setColor] = useState("lightblue");

  return (
    <div className="app-container">
      <div className="center-content">
        <h2>Dynamic Styling Example</h2>
        <button onClick={() => setColor("lightcoral")}>Red</button>
        <button onClick={() => setColor("lightgreen")}>Green</button>
        <button onClick={() => setColor("lightblue")}>Blue</button>
        <DynamicDiv bgColor={color} />
      </div>
    </div>
  );
};

export default App;
