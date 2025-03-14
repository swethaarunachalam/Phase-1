
import React from "react";
import './App.css'
function WelcomeMessage({ isLoggedIn }) {
  return (
    <div className="message-container">
      <h1 className={isLoggedIn ? "logged-in" : "logged-out"}>
        {isLoggedIn ? "Welcome back!" : "Please log in"}
      </h1>
    </div>
  );
}

function App() {
  const userLoggedIn = true; // Change this to false to test the "Please log in" message

  return (
    <div className="app-container">
      <WelcomeMessage isLoggedIn={userLoggedIn} />
    </div>
  );
}

export default App;




