import React from "react";
import { FixedSizeList as List } from "react-window";
import "./App.css";

const totalItems = 10000;

// Generate 10,000 items
const items = Array.from({ length: totalItems }, (_, index) => `Item ${index + 1}`);

// Item component for virtualized list
const Row = ({ index, style }) => {
  return (
    <div style={style} className="list-item">
      {items[index]}
    </div>
  );
};

const App = () => {
  return (
    <div className="app-container">
      <h2>Virtual Scrolling with react-window</h2>
      <List
        height={500} // Visible height
        itemCount={totalItems} // Total items
        itemSize={35} // Height of each row
        width="100%" // List width
      >
        {Row}
      </List>
    </div>
  );
};

export default App;

