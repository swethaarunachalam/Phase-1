import React, { useState } from 'react';
import './App.css';

export const App = () => {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount((prev) => prev + 1);
  };

  const decreaseCount = () => {
    setCount((prev) => prev - 1);
  };

  return (
    <div>
      <p>COUNT: {count}</p>
      <button onClick={increaseCount}>Increase Counter</button>
      <button onClick={decreaseCount}>Decrease Counter</button>
    </div>
  );
};

export default App;
