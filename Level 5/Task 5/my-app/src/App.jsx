import React, { createContext, useContext, useState } from "react";
import "./App.css"; // Import CSS file

// Step 1: Create Context
const ThemeContext = createContext();

const App = () => {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`app-container ${theme}`}>
        <h2>Theme: {theme === "light" ? "Light Mode" : "Dark Mode"}</h2>
        <ThemeToggle />
      </div>
    </ThemeContext.Provider>
  );
};

// Step 2: Create Theme Toggle Component
const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Toggle {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
};

export default App;
