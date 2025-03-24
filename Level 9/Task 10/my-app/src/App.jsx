import React, { useState, useEffect, lazy, Suspense, memo, useMemo, useCallback, createContext, useReducer } from "react";
import "./App.css";
import { FixedSizeList } from "react-window";

const HeavyComponent = lazy(() => import("./HeavyComponent"));
const ImageComponent = lazy(() => import("./ImageComponent"));


const initialState = { count: 0 };
const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT": return { count: state.count + 1 };
    case "DECREMENT": return { count: state.count - 1 };
    default: return state;
  }
};

const CounterContext = createContext();

const ListItem = memo(({ index, style }) => {
  console.log("Rendering Item:", index);
  return <div className="list-item" style={style}>Item {index}</div>;
});

function App() {
  const [data, setData] = useState([]);
  const [cachedData, setCachedData] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  
  useEffect(() => {
    const cached = localStorage.getItem("apiData");
    if (cached) {
      setCachedData(JSON.parse(cached));
    } else {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((res) => res.json())
        .then((result) => {
          setData(result);
          localStorage.setItem("apiData", JSON.stringify(result));
        });
    }
  }, []);

  
  const handleIncrement = useCallback(() => dispatch({ type: "INCREMENT" }), []);
  const handleDecrement = useCallback(() => dispatch({ type: "DECREMENT" }), []);

  
  const processedData = useMemo(() => {
    return (cachedData || data).slice(0, 10).map((item) => item.title.toUpperCase());
  }, [cachedData, data]);

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      <div className="app">


        <h1>Optimized React App 🚀</h1>

        {/* ✅ Optimized Counter */}
        <div className="counter">
        <h1>Optimized React App 🚀</h1>
          <button onClick={handleDecrement}>➖</button>
          <p>Count: {state.count}</p>
          <button onClick={handleIncrement}>➕</button>
        </div>

        {/* ✅ Lazy Loading with Suspense */}
        <Suspense fallback={<p>Loading Heavy Component...</p>}>
          <HeavyComponent />
        </Suspense>

        {/* ✅ Windowing for Large Lists */}
        <FixedSizeList height={300} width={300} itemSize={35} itemCount={1000}>
          {ListItem}
        </FixedSizeList>

        {/* ✅ Optimized Image Component */}
        <Suspense fallback={<p>Loading Image...</p>}>
          <ImageComponent />
        </Suspense>

        {/* ✅ Optimized API Call */}
        <h2>Processed Data</h2>
        <ul>
          {processedData.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </CounterContext.Provider>
  );
}

export default App;


