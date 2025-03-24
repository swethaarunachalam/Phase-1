
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import "./App.css"; 
const products = [
  { id: 1, name: "Laptop", price: "$1000", description: "A high-end gaming laptop" },
  { id: 2, name: "Phone", price: "$500", description: "A smartphone with a great camera" },
  { id: 3, name: "Tablet", price: "$700", description: "A tablet with a large screen" }
];
const ProductList = () => {
  return (
    <div className="container">
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.name}</Link> - {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};
const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="container">
      <h1>{product.name}</h1>
      <p>Price: {product.price}</p>
      <p>{product.description}</p>
      <Link to="/products" className="back-button">Back to Products</Link>
    </div>
  );
};
const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/products">Products</Link>
      </nav>

      <Routes>
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
