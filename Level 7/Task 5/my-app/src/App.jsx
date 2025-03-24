// App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';

// Custom Hook: useFetch
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

// App Component
const App = () => {
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts');

  return (
    <div className="app">
      <h1>useFetch Example</h1>
      <p>Fetching and displaying data from an API using a custom hook.</p>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">Error: {error}</p>}

      {data && (
        <div className="data-container">
          {data.slice(0, 5).map((post) => (
            <div key={post.id} className="post">
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;