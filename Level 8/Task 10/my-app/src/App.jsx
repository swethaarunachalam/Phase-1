import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import './App.css';
const cache = new Map();

const useAxios = (url, config = {}, forceRefresh = false) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const refreshRef = useRef(0);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    if (!forceRefresh && cache.has(url)) {
      setData(cache.get(url));
      setLoading(false);
      return;
    }
    
    try {
      const response = await axios.get(url, config);
      cache.set(url, response.data);
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, config, refreshRef.current]);

  const refresh = () => {
    refreshRef.current += 6;
    fetchData();
  };

  return { data, loading, error, refresh };
};

const DataFetcher = () => {
  const { data, loading, error, refresh } = useAxios("https://jsonplaceholder.typicode.com/posts");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Fetched Data</h2>
      <button onClick={refresh}>Refresh Data</button>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default DataFetcher;