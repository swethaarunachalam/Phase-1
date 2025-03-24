
import React, { useState, useEffect } from 'react';
import './App.css';

const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};
const App = () => {
  const [count, setCount] = useState(0);
  useDocumentTitle(`Count: ${count}`);

  const increment = () => {
    setCount(count + 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="app">
      <h1>useDocumentTitle Example</h1>
      <p>Click the button to update the count. The document title will change dynamically.</p>
      <div className="counter">
        <p>Current Count: <strong>{count}</strong></p>
        <button onClick={increment}>Increment</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default App;