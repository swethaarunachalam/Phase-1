
import React from "react";
import './App.css'
function App() {
  const items = ["React", "JavaScript", "HTML", "CSS", "Node.js"];

  return (
    <div className="list-container">
      <h1>Tech Stack</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
