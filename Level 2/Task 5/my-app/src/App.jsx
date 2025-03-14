
import React from "react";
import "./App.css";

const UserInfo = ({ name, age, city }) => {
  return (
    <div className="user-card">
      <h2>Name: {name}</h2>
      <p>Age: {age}</p>
      <p>City: {city}</p>
    </div>
  );
};

const App = () => {
  return (
    <div className="app-container">
      <UserInfo name="Swetha" age={20} city="Dharmapuri" />
    </div>
  );
};

export default App;