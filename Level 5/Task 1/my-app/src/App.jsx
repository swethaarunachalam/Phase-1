import React, { useEffect, useState } from "react";

const FetchAPIData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/carts/1")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Cart Data</h1>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FetchAPIData;
