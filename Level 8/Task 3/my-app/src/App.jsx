import React, { useEffect } from "react";

const fetchDataPromise = () => 
  new Promise((resolve) => { 
    setTimeout(() => {
      const mockData = [
        { id: 4523, name: "Swetha", department: "IT" },
        { id: 567, name: "Lokesh", department: "CSE" },
        { id: 789, name: "Swathi", department: "IT" }
      ];
      resolve(mockData);
    }, 2000);
  });

const App = () => {
  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const data = await fetchDataPromise();
        console.log("Fetched Data:", data);
      } catch (error) {
        console.error("Fetched Error:", error);
      }
    };

    fetchDataAsync(); 
  }, []);

  return (
    <div>
      <h1>Delay 2 seconds</h1>
      <p>Check the console for data!</p>
    </div>
  );
};

export default App;
