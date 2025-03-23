import React, { useState } from "react";
import "./App.css"; 

const InputControl = () => {
  const [text, setText] = useState("");

  return (
    <div className="input-container">
      <h2>Live Input Display</h2>
      <input
        type="text"
        placeholder="Type something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="input-field"
      />
      <p className="display-text">You typed: {text}</p>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <InputControl />
    </div>
  );
};

export default App;
