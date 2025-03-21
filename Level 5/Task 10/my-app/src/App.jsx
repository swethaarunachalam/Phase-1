import React, { useState, useCallback } from "react";
import "./App.css";

const ChildComponent = React.memo(({ onClick }) => {
  console.log("Child Component Rendered");

  return (
    <div>
      <h3>Child Component</h3>
      <button onClick={onClick}>Click Me</button>
    </div>
  );
});

const App = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const handleClick = useCallback(() => {
    console.log("Button Clicked!");
  }, []);

  return (
    <div className="app-container">
      <h1>useCallback Example</h1>
      <p>Counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
      />
      <ChildComponent onClick={handleClick} />
    </div>
  );
};

export default App;
