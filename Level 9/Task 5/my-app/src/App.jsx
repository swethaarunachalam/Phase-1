import React, { useState, useEffect, memo, useMemo } from "react";
import "./App.css";

// Child Component - LargeList (Memoized)
const LargeList = memo(({ items }) => {
  console.log("Rendering LargeList");

  return (
    <ul className="list-container">
      {items.map((item) => (
        <li key={item.id} className="list-item">
          {item.text}
        </li>
      ))}
    </ul>
  );
}, (prevProps, nextProps) => {
  // Custom comparison: Prevent re-render if items are the same
  return JSON.stringify(prevProps.items) === JSON.stringify(nextProps.items);
});

// Parent Component
const App = () => {
  const [counter, setCounter] = useState(0);

  // useMemo to prevent unnecessary recreation of the items array
  const items = useMemo(
    () =>
      Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        text: `Item ${i + 1}`,
      })),
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container">
      <h2 className="counter">Counter: {counter}</h2>
      <LargeList items={items} />
    </div>
  );
};

export default App;
