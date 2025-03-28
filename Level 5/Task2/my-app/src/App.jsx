import React, { useState } from "react";
import "./App.css"; 
const productData = [
  {
    id: 1,
    name: "Lakmé 9 to 5 Matte Lipstick",
    imageUrl: "/Lakme.jpeg",
    price: 499,
    description: "Long-lasting matte lipstick with a smooth texture.",
  },
  {
    id: 2,
    name: "Maybelline Fit Me Foundation",
    imageUrl: "/Fun.jpeg",
    price: 799,
    description: "Lightweight foundation with natural coverage.",
  },
  {
    id: 3,
    name: "Sugar Cosmetics Kajal",
    imageUrl: "/Ka.jpeg",
    price: 299,
    description: "Smudge-proof and waterproof kajal for all-day wear.",
  },
  {
    id: 4,
    name: "Nykaa Eyeshadow Palette",
    imageUrl: "/Pw.jpeg",
    price: 1299,
    description: "Highly pigmented eyeshadow palette with vibrant shades.",
  },
  {
    id: 5,
    name: "Mamaearth Natural Glow Face Serum",
    imageUrl: "/Se.jpeg",
    price: 699,
    description: "Skin-brightening serum with vitamin C and turmeric.",
  },
];


const Product = ({ product, addToCart }) => {
  return (
    <div className="product">
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p className="price">₹{product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};


const App = () => {
  const [cart, setCart] = useState([]);

 
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="container">
      <h1>💄 Swetha Makeup Store</h1>
      <div className="cart">Cart: {cart.length} items</div>

      {/* Product Listing */}
      <div className="product-list">
        {productData.map((product) => (
          <Product key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default App;
