import React from "react";
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <h2>Static List Rendering</h2>
      <ul className="list-container">
        <li className="list-item">HTML</li>
        <li className="list-item">CSS</li>
        <li className="list-item">JAVASCRIPT</li>
        <li className="list-item">REACT JS</li>
        <li className="list-item">NODE JS</li>
      </ul>
    </div>
  );
};

export default App;
