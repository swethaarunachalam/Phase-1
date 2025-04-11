// server/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://swetha_116:aswetha116116@swetha.76fg2.mongodb.net/project-0?retryWrites=true&w=majority&appName=swetha", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

const favoriteSchema = new mongoose.Schema({ city: String });
const Favorite = mongoose.model("Favorite", favoriteSchema);

const limiter = rateLimit({ windowMs: 60 * 1000, max: 30 });
app.use(limiter);

const API_KEY = "7d8b06b367046a29575d16e7b8ad9928";

const getWeatherData = async (lat, lon, unit) => {
  try {
    const [currentRes, forecastRes] = await Promise.all([
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`),
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`)
    ]);

    const history = Array.from({ length: 5 }, (_, i) => ({
      date: new Date(Date.now() - i * 86400000).toISOString().split("T")[0],
      temp: Math.floor(Math.random() * 10) + 20
    }));

    return {
      current: {
        city: currentRes.data.name,
        temp: currentRes.data.main.temp,
        description: currentRes.data.weather[0].description,
      },
      forecast: forecastRes.data.list.slice(0, 5).map(item => ({
        date: item.dt_txt.split(" ")[0],
        temp: item.main.temp
      })),
      history
    };
  } catch (err) {
    console.error("Error fetching weather data:", err.message);
    throw err;
  }
};

app.get("/weather", async (req, res) => {
  try {
    const { city, unit } = req.query;
    const geo = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`);
    if (!geo.data[0]) return res.status(404).json({ error: "City not found" });

    const { lat, lon } = geo.data[0];
    const data = await getWeatherData(lat, lon, unit);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

app.get("/geolocation", async (req, res) => {
  try {
    const { lat, lon, unit } = req.query;
    const data = await getWeatherData(lat, lon, unit);
    res.json({ ...data, city: data.current.city });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch geolocation data" });
  }
});

app.post("/favorites", async (req, res) => {
  try {
    const fav = new Favorite({ city: req.body.city });
    await fav.save();
    res.json({ message: "Saved" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save favorite" });
  }
});

app.get("/favorites", async (req, res) => {
  try {
    const list = await Favorite.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: "Failed to get favorites" });
  }
});

app.listen(5000, () => console.log(" Server running on http://localhost:5000"));
