import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [role, setRole] = useState("User");

  return (
    <div className="app-container">
      <h2>Conditional Rendering Example</h2>
      <div className="role-buttons">
        <button onClick={() => setRole("Admin")}>Set as Admin</button>
        <button onClick={() => setRole("User")}>Set as User</button>
      </div>
      <div className="message-box">
        {role === "Admin" ? (
          <h3>Welcome, Admin! You have full access.</h3>
        ) : (
          <h3>Welcome, User! You have limited access.</h3>
        )}
      </div>
    </div>
  );
};

export default App;