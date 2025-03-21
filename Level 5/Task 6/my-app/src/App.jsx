import { useState, useEffect } from "react";
import'./App.css'
function TimerComponent() {
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Message logged every second");
    }, 1000);

    // Cleanup function to clear interval when component unmounts
    return () => {
      clearInterval(interval);
      console.log("Timer cleared on unmount");
    };
  }, []);

  return <div className="container">Open console to see logs.</div>;
}

export default function App() {
  const [showTimer, setShowTimer] = useState(true);

  return (
    <div className="app">
      <h1>useEffect Cleanup Example</h1>
      <button onClick={() => setShowTimer((prev) => !prev)}>
        {showTimer ? "Unmount Timer" : "Mount Timer"}
      </button>
      {showTimer && <TimerComponent />}
    </div>
  );
}
