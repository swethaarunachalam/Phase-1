
import React from "react";
import ReactDOM from "react-dom/client";
import './App.css'
const App = () => {
  const name = "Swetha"; // Change this to your name
  return <h2>Hello. {name}!</h2>;
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

