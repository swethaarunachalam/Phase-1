import React from "react";
import "./App.css";

const Greeting = () => {
  return <h1 className="greeting">Hello from a functional component!</h1>;
};

const App = () => {
  return (
    <div className="app-container">
      <Greeting />
    </div>
  );
};

export default App;