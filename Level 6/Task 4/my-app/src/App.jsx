import React, { useState } from "react";
import "./App.css"; 

const UserForm = () => {
  const [user, setUser] = useState({
    name: "",
    age: ""
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  return (
    <div className="form-container">
      <h2>User Information</h2>
      <input
        type="text"
        name="name"
        placeholder="Enter name"
        value={user.name}
        onChange={handleChange}
        className="input-field"
      />
      <input
        type="number"
        name="age"
        placeholder="Enter age"
        value={user.age}
        onChange={handleChange}
        className="input-field"
      />
      <p className="display-text">Name: {user.name}</p>
      <p className="display-text">Age: {user.age}</p>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <UserForm />
    </div>
  );
};

export default App;
