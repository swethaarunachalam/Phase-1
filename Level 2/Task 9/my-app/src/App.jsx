import { useState } from "react";
import './App.css'
function App() {
  const [text, setText] = useState("");

  return (
    <div className="input-container">
      <h1>Live Text Update</h1>
      <input
        type="text"
        placeholder="Type something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <p className="output">{text}</p>
    </div>
  );
}

export default App;
