import React, { useEffect } from "react";

export const fetchDataPromise = () => 
  new Promise((resolve) => { 
    setTimeout(() => {
      const mockData = [
     { message: "Data fetched successfully!", data: [1, 2, 3, 4, 5] }

      ];
      resolve(mockData);
    }, 2000);
  });

const App = () => {
  useEffect(() => {
    fetchDataPromise().then(console.log).catch(console.error);
  }, []);

  return (
    <div>
      <h1>Delay 2 seconds</h1>
      <p>Check the console for data!</p>
    </div>
  );
};

export default App;
