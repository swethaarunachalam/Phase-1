import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const API_KEY = "7d8b06b367046a29575d16e7b8ad9928";  

  const fetchWeather = async () => {
    if (!city) {
      alert("Please enter a city name.");
      return;
    }
    
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("City not found! Please enter a valid city.");
      } else {
        alert("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="container">
      <h2>Weather App</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {weather && (
        <div className="weather-card">
          <h3>{weather.name}, {weather.sys.country}</h3>
          <h1>{Math.round(weather.main.temp)}°C</h1>
          <p>{weather.weather[0].description.toUpperCase()}</p>
          <div className="details">
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} km/h</p>
            <p>Latitude: {weather.coord.lat}</p>
            <p>Longitude: {weather.coord.lon}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
