import React from "react";
import "./App.css";

const Greeting = ({ name = "World" }) => {
  return <h1 className="greeting">Hello, {name}!</h1>;
};

const App = () => {
  return (
    <div className="app-container">
      <Greeting />
      <Greeting name="Swetha" />
    </div>
  );
};

export default App;