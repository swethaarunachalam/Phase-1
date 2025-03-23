
import React, { useState, useEffect } from 'react';
import './App.css'
const useLocalStorage = (key, initialValue) => {
  
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
const App = () => {
  const [name, setName] = useLocalStorage('username', 'Guest');

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div className="app">
      <h1>useLocalStorage Example</h1>
      <p>Your name is stored in localStorage and persists across page reloads.</p>
      <input
        type="text"
        value={name}
        onChange={handleChange}
        placeholder="Enter your name"
        className="input-field"
      />
      <p className="output-text">Hello, <strong>{name}</strong>!</p>
    </div>
  );
};

export default App;