import React, { useState, useMemo, useCallback } from "react";
import "./App.css";

// Expensive Calculation - Finding prime numbers up to a limit
const findPrimes = (limit) => {
  console.log("Calculating prime numbers...");
  const primes = [];
  for (let num = 2; num <= limit; num++) {
    let isPrime = true;
    for (let div = 2; div * div <= num; div++) {
      if (num % div === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(num);
    }
  }
  return primes;
};

// Child Component - Displays primes
const PrimeList = React.memo(({ primes, onReset }) => {
  console.log("Rendering PrimeList");
  return (
    <div className="prime-container">
      <h3>Prime Numbers:</h3>
      <ul className="prime-list">
        {primes.map((prime, index) => (
          <li key={index} className="prime-item">
            {prime}
          </li>
        ))}
      </ul>
      <button onClick={onReset} className="reset-button">
        Reset
      </button>
    </div>
  );
});

const App = () => {
  const [limit, setLimit] = useState(100);
  const [counter, setCounter] = useState(0);

  // useMemo - Memoize the result of expensive calculation
  const primeNumbers = useMemo(() => findPrimes(limit), [limit]);

  // useCallback - Memoize event handler
  const resetCounter = useCallback(() => {
    setCounter(0);
  }, []);

  return (
    <div className="app-container">
      <h2 className="title">Prime Number Finder</h2>
      <div className="controls">
        <label>Limit:</label>
        <input
          type="number"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="input-field"
        />
      </div>
      <p className="counter">Counter: {counter}</p>
      <button onClick={() => setCounter(counter + 1)} className="counter-button">
        Increment Counter
      </button>
      <PrimeList primes={primeNumbers} onReset={resetCounter} />
    </div>
  );
};

export default App;
