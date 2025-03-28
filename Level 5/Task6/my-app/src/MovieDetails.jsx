import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "YOUR_API_KEY"; // Replace with your OMDb API key

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
        if (response.data.Response === "True") {
          setMovie(response.data);
        } else {
          setError("Movie not found.");
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
      }
      setLoading(false);
    };
    fetchMovieDetails();
  }, [id]);

  if (loading) return <p className="loading">Loading movie details...</p>;
  if (error) return <p className="error">{error}</p>;

  return movie ? (
    <div className="movie-details">
      <img src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"} alt={movie.Title} />
      <div className="info">
        <h2>{movie.Title}</h2>
        <p><strong>Year:</strong> {movie.Year}</p>
        <p><strong>Genre:</strong> {movie.Genre}</p>
        <p><strong>Director:</strong> {movie.Director}</p>
        <p><strong>Actors:</strong> {movie.Actors}</p>
        <p><strong>Plot:</strong> {movie.Plot}</p>
        <p><strong>IMDB Rating:</strong> ⭐ {movie.imdbRating}</p>
        <Link to="/">🔙 Back to Search</Link>
      </div>
    </div>
  ) : null;
};

export default MovieDetails;
