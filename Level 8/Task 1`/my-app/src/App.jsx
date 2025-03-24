
import React, { useEffect } from 'react'

export const App = () => {
  function fetchData(callback) {
    setTimeout(() =>{
    const mockData =[
      {id:4523,name:"swetha",department:"it"},
      {id:567,name:"lokesh",department:"cse"},
      {id:789,name:"swathi",department:"it"}
    ];
    callback(mockData);
    },2000);
  }

  useEffect(()=>{
    fetchData(console.log);
  },[]);

  return (
    <div>
      <h1> Deplay 2 seconds</h1>
      <p>check the console data</p>
    </div>
  );
};
export default App;

