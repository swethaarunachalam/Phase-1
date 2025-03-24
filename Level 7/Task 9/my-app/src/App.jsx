import React, { useState, useEffect, useRef } from "react";
import "./App.css";

// Custom Hook: useIntersectionObserver
function useIntersectionObserver(callback, options) {
  const targetRef = useRef(null);

  useEffect(() => {
    if (!targetRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback();
      }
    }, options);

    observer.observe(targetRef.current);

    return () => {
      if (targetRef.current) observer.unobserve(targetRef.current);
    };
  }, [callback, options]);

  return targetRef;
}

function App() {
  const [items, setItems] = useState(Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`));

  const loadMoreItems = () => {
    setTimeout(() => {
      setItems((prevItems) => [
        ...prevItems,
        ...Array.from({ length: 10 }, (_, i) => `Item ${prevItems.length + i + 1}`),
      ]);
    }, 1000); // Simulating API delay
  };

  const lastItemRef = useIntersectionObserver(loadMoreItems, { threshold: 1.0 });

  return (
    <div className="app">
      <h2>Infinite Scroll</h2>
      <ul className="item-list">
        {items.map((item, index) => (
          <li key={index} className="item">
            {item}
          </li>
        ))}
      </ul>
      <div ref={lastItemRef} className="loading">Loading more...</div>
    </div>
  );
}

export default App;
