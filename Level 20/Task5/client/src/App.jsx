import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const fetchRecipes = async () => {
    const res = await axios.get("http://localhost:5000/recipes");
    setRecipes(res.data);
  };

  const createRecipe = async () => {
    const newRecipe = {
      title,
      ingredients: ingredients.split(","),
      instructions,
      cuisineType: "Indian",
      mealType: "Dinner",
      servings: 4,
    };
    await axios.post("http://localhost:5000/recipes", newRecipe);
    fetchRecipes();
  };

  const deleteRecipe = async (id) => {
    await axios.delete(`http://localhost:5000/recipes/${id}`);
    fetchRecipes();
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="App">
      <h1 className="title">🍲 RecipeBox</h1>
      <div className="form">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <input value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="Ingredients (comma separated)" />
        <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="Instructions" />
        <button onClick={createRecipe}>Add Recipe</button>
      </div>
      <div className="recipe-list">
        {recipes.map((r) => (
          <div key={r._id} className="recipe-card">
            <h2>{r.title}</h2>
            <p><strong>Ingredients:</strong> {r.ingredients.join(", ")}</p>
            <p><strong>Instructions:</strong> {r.instructions}</p>
            <button onClick={() => deleteRecipe(r._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
