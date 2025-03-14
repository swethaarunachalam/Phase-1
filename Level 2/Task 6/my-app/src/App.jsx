import React from "react";
import PropTypes from "prop-types";
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

UserInfo.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
};

const App = () => {
  return (
    <div className="app-container">
      <UserInfo name="Swetha" age={20} city="Dharmapuri" />
      <UserInfo name="Ajay" age={22}city= "Chennai"/>
    </div>
  );
};

export default App;