import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, useSearchParams } from "react-router-dom";
import "./App.css";

// Sample Data (Products)
const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 1000 },
  { id: 2, name: "Smartphone", category: "Electronics", price: 500 },
  { id: 3, name: "Table", category: "Furniture", price: 200 },
  { id: 4, name: "Chair", category: "Furniture", price: 100 },
  { id: 5, name: "Headphones", category: "Electronics", price: 150 },
  { id: 6, name: "Shoes", category: "Fashion", price: 80 },
];

// Search Component
const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Form state initialized from query parameters
  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [price, setPrice] = useState(searchParams.get("price") || "");

  // Filter products based on search parameters
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      return (
        (searchTerm === "" || product.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (category === "" || product.category === category) &&
        (price === "" || product.price <= Number(price))
      );
    });
  }, [searchTerm, category, price]);

  // Handle form submission & update URL parameters
  const handleSearch = (e) => {
    e.preventDefault();
    const params = {};
    if (searchTerm) params.query = searchTerm;
    if (category) params.category = category;
    if (price) params.price = price;
    setSearchParams(params);
  };

  return (
    <div className="search-container">
      <h2>Product Search</h2>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Fashion">Fashion</option>
        </select>
        <input
          type="number"
          placeholder="Max Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <h3>Results:</h3>
      <ul className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <li key={product.id} className="product-item">
              {product.name} - ${product.price} ({product.category})
            </li>
          ))
        ) : (
          <p>No products found</p>
        )}
      </ul>
    </div>
  );
};

// App Component with Routing
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
      </Routes>
    </Router>
  );
};

export default App;
