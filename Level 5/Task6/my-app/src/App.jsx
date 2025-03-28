import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MovieDetails from "./MovieDetails";
import "./App.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "a3e46a1a"; 

  const searchMovies = async () => {
    if (!searchTerm) return;
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`
      );
      if (response.data.Response === "True") {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
        setError(response.data.Error);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <Router>
      <div className="container">
        <h1>🎬 Movie Search</h1>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={searchMovies}>🔍 Search</button>
        </div>

        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}

        <div className="movie-grid">
          {movies.map((movie) => (
            <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID} className="movie-card">
              <img src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"} alt={movie.Title} />
              <h3>{movie.Title}</h3>
            </Link>
          ))}
        </div>
      </div>

      <Routes>
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
