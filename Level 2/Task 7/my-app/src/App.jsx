import { useState } from "react";
import'./App.css'
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter-container">
      <h1>Simple Counter</h1>
      <p className="count">{count}</p>
      <div className="buttons">
        <button onClick={() => setCount(count + 1)} className="increment">
          Increment
        </button>
        <button onClick={() => setCount(count - 1)} className="decrement">
          Decrement
        </button>
      </div>
    </div>
  );
}

export default App;
