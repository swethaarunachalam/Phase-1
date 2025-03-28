import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams } from "react-router-dom";
import "./App.css";

const recipes = [
  {
    id: 1,
    title: "Mutton Biryani",
    imageUrl: "/mu.jpeg",
    ingredients: ["Mutton", "Basmati Rice", "Yogurt", "Garam Masala", "Mint Leaves"],
    instructions: "Marinate mutton. Cook with rice, spices, and herbs. Serve hot with raita.",
  },
  {
    id: 2,
    title: "Prawn Masala",
    imageUrl: "/pa.jpeg",
    ingredients: ["Prawns", "Tomato", "Onion", "Curry Leaves", "Black Pepper"],
    instructions: "Sauté onion, tomato, and spices. Add prawns and cook until tender.",
  },
  {
    id: 3,
    title: "Nattu Kozhi Kuzhambu",
    imageUrl: "/no.jpeg",
    ingredients: ["Country Chicken", "Coconut", "Ginger Garlic Paste", "Black Pepper", "Spices"],
    instructions: "Cook country chicken with masala, coconut paste, and black pepper.",
  },
  {
    id: 4,
    title: "Kari Dosai",
    imageUrl: "/ka.jpeg",
    ingredients: ["Dosa Batter", "Minced Mutton", "Onion", "Coriander", "Green Chili"],
    instructions: "Spread dosa batter, add cooked minced mutton, and cook until crispy.",
  },
  {
    id: 5,
    title: "Fish Fry",
    imageUrl: "/fi.jpeg",
    ingredients: ["Fish", "Chili Powder", "Turmeric", "Lemon", "Ginger Garlic Paste"],
    instructions: "Marinate fish with spices. Shallow fry until golden brown and crispy.",
  },
];

const Home = () => {
  const [search, setSearch] = useState("");

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(search.toLowerCase()) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(search.toLowerCase())
      )
  );

  return (
    <div className="container">
      <h1>🍛 Tamil Nadu Recipe Finder</h1>
      <input
        type="text"
        placeholder="Search Tamil Nadu dishes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <div className="recipe-list">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <img src={recipe.imageUrl} alt={recipe.title} />
              <h3>
                <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
              </h3>
            </div>
          ))
        ) : (
          <p>No recipes found! Try a different keyword.</p>
        )}
      </div>
    </div>
  );
};

const RecipeDetail = () => {
  const { id } = useParams();
  const recipe = recipes.find((r) => r.id === parseInt(id));

  if (!recipe) {
    return <h2>Recipe not found!</h2>;
  }

  return (
    <div className="container">
      <h1>{recipe.title}</h1>
      <img src={recipe.imageUrl} alt={recipe.title} className="detail-img" />
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <p>{recipe.instructions}</p>
      <Link to="/">⬅️ Back to Home</Link>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
