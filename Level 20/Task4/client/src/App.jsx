import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [historical, setHistorical] = useState([]);
  const [unit, setUnit] = useState("metric");
  const [favorites, setFavorites] = useState([]);
  const [currentLocation, setCurrentLocation] = useState("");

  const API_BASE = "http://localhost:5000";

  const fetchWeather = async (query) => {
    try {
      const res = await axios.get(`${API_BASE}/weather?city=${query}&unit=${unit}`);
      setWeather(res.data.current);
      setForecast(res.data.forecast);
      setHistorical(res.data.history);
    } catch (err) {
      alert("Weather data not found for this city.");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!city) return;
    fetchWeather(city);
  };

  const toggleUnit = () => {
    setUnit((prev) => (prev === "metric" ? "imperial" : "metric"));
  };

  const saveFavorite = async () => {
    await axios.post(`${API_BASE}/favorites`, { city });
    getFavorites();
  };

  const getFavorites = async () => {
    const res = await axios.get(`${API_BASE}/favorites`);
    setFavorites(res.data);
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const res = await axios.get(`${API_BASE}/geolocation?lat=${latitude}&lon=${longitude}&unit=${unit}`);
      setCurrentLocation(res.data.city);
      setWeather(res.data.current);
      setForecast(res.data.forecast);
      setHistorical(res.data.history);
    });
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <div className="container">
      <h1>🌦 WeatherDash</h1>
      <form onSubmit={handleSearch}>
        <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Search city..." />
        <button type="submit">Search</button>
        <button type="button" onClick={toggleUnit}>°{unit === "metric" ? "F" : "C"}</button>
        <button type="button" onClick={saveFavorite}>⭐</button>
        <button type="button" onClick={getCurrentLocation}>📍</button>
      </form>

      {weather && (
        <div className="weather-box animate">
          <h2>{weather.city}</h2>
          <p>{weather.temp}°{unit === "metric" ? "C" : "F"}</p>
          <p>{weather.description}</p>
        </div>
      )}

      {forecast.length > 0 && (
        <div className="forecast animate">
          <h3>5-Day Forecast</h3>
          <ul>
            {forecast.map((day, index) => (
              <li key={index}>
                <strong>{day.date}</strong>: {day.temp}°
              </li>
            ))}
          </ul>
        </div>
      )}

      {historical.length > 0 && (
        <div className="chart animate">
          <h3>Historical Data</h3>
          <Line
            data={{
              labels: historical.map(h => h.date),
              datasets: [{
                label: "Temp",
                data: historical.map(h => h.temp),
                borderColor: "#3e95cd",
                fill: false
              }]
            }}
          />
        </div>
      )}

      <div className="favorites animate">
        <h3>Favorites</h3>
        <ul>
          {favorites.map((f, i) => (
            <li key={i} onClick={() => fetchWeather(f.city)}>{f.city}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
