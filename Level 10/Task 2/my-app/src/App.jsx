import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, NavLink, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./App.css";

const API_KEY = "3cfa814852e345bd8eef5948e64bf45e";

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const localData = localStorage.getItem("popularRecipes");
      if (localData) {
        setRecipes(JSON.parse(localData));
      } else {
        const response = await fetch(`https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`);
        const data = await response.json();
        setRecipes(data.recipes);
        localStorage.setItem("popularRecipes", JSON.stringify(data.recipes));
      }
    };
    fetchRecipes();
  }, []);

  return (
    <div className="container">
      <h1>Popular Recipes</h1>
      <div className="grid">
        {recipes.map((recipe) => (
          <motion.div key={recipe.id} className="card" whileHover={{ scale: 1.05 }}>
            <NavLink to={`/recipe/${recipe.id}`}>
              <img src={recipe.image} alt={recipe.title} />
              <h3>{recipe.title}</h3>
            </NavLink>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Recipe Details Component
const Recipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
      const data = await response.json();
      setRecipe(data);
    };
    fetchRecipeDetails();
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="recipe-detail">
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} />
      <h3>Ingredients:</h3>
      <ul>{recipe.extendedIngredients.map((ing) => <li key={ing.id}>{ing.original}</li>)}</ul>
      <h3>Instructions:</h3>
      <p dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
    </div>
  );
};

// Search Component
const Search = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) navigate(`/search/${query}`);
  };

  return (
    <form onSubmit={handleSearch} className="search-box">
      <input type="text" placeholder="Search for a recipe..." value={query} onChange={(e) => setQuery(e.target.value)} />
      <button type="submit">Search</button>
    </form>
  );
};

// Search Results Component
const SearchResults = () => {
  const { query } = useParams();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${API_KEY}`);
      const data = await response.json();
      setRecipes(data.results);
    };
    fetchSearchResults();
  }, [query]);

  return (
    <div className="container">
      <h1>Search Results for "{query}"</h1>
      <div className="grid">
        {recipes.map((recipe) => (
          <motion.div key={recipe.id} className="card" whileHover={{ scale: 1.05 }}>
            <NavLink to={`/recipe/${recipe.id}`}>
              <img src={recipe.image} alt={recipe.title} />
              <h3>{recipe.title}</h3>
            </NavLink>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Category Component
const Category = () => {
  const cuisines = ["Italian", "American", "French", "Indian"];
  return (
    <div className="categories">
      {cuisines.map((cuisine) => (
        <NavLink key={cuisine} to={`/category/${cuisine.toLowerCase()}`} className="category-link">
          {cuisine}
        </NavLink>
      ))}
    </div>
  );
};

// Category Results Component
const CategoryResults = () => {
  const { type } = useParams();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchCategoryRecipes = async () => {
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?cuisine=${type}&apiKey=${API_KEY}`);
      const data = await response.json();
      setRecipes(data.results);
    };
    fetchCategoryRecipes();
  }, [type]);

  return (
    <div className="container">
      <h1>{type} Cuisine</h1>
      <div className="grid">
        {recipes.map((recipe) => (
          <motion.div key={recipe.id} className="card" whileHover={{ scale: 1.05 }}>
            <NavLink to={`/recipe/${recipe.id}`}>
              <img src={recipe.image} alt={recipe.title} />
              <h3>{recipe.title}</h3>
            </NavLink>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// App Component
const App = () => {
  return (
    <Router>
      <nav>
        <NavLink to="/" className="nav-link">Home</NavLink>
        <Search />
        <Category />
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/category/:type" element={<CategoryResults />} />
      </Routes>
    </Router>
  );
};

export default App;
