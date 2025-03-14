import React, { Component } from "react";
import "./App.css";

class Greeting extends Component {
  render() {
    return <h1 className="greeting">Hello from a class component!</h1>;
  }
}

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <Greeting />
      </div>
    );
  }
}

export default App;
