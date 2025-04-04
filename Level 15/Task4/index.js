import axios from "axios";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cron from "node-cron";
import cliChart from "cli-chart";

dotenv.config();


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

const weatherSchema = new mongoose.Schema({
  city: String,
  temperature: Number,
  humidity: Number,
  weather: String,
  timestamp: { type: Date, default: Date.now },
});


const Weather = mongoose.model("Weather", weatherSchema);


async function fetchWeather() {
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${process.env.CITY}&appid=${process.env.WEATHER_API_KEY}&units=metric`;

  try {
    const response = await axios.get(API_URL);
    const { temp, humidity } = response.data.main;
    const weather = response.data.weather[0].description;

    const weatherEntry = new Weather({
      city: process.env.CITY,
      temperature: temp,
      humidity: humidity,
      weather: weather,
    });

    await weatherEntry.save();
    console.log(`✅ Weather data saved: ${temp}°C, ${humidity}% humidity, ${weather}`);
  } catch (error) {
    console.error("❌ Error fetching weather data:", error.message);
  }
}


async function getWeatherHistory(days = 7) {
  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - days);

  const history = await Weather.find({ timestamp: { $gte: pastDate } }).sort({ timestamp: 1 });

  if (history.length === 0) {
    console.log(" No data found for the given period.");
    return;
  }

  console.log(` Weather Data for the Last ${days} Days:`);
  history.forEach(entry => {
    console.log(`${entry.timestamp.toLocaleString()} - ${entry.temperature}°C, ${entry.weather}`);
  });

 
  const chart = new cliChart({ width: 40, height: 10, xlabel: "Days", ylabel: "Temp (°C)" });
  history.forEach(entry => chart.addBar(entry.temperature));
  chart.draw();
}

cron.schedule("0 * * * *", fetchWeather);
console.log(" Weather logging scheduled every hour.");


const command = process.argv[2];
const days = parseInt(process.argv[3]) || 7;

if (command === "fetch") {
  fetchWeather();
} else if (command === "history") {
  getWeatherHistory(days);
} else {
  console.log("⚡ Usage:");
  console.log("   node weatherLogger.js fetch      → Fetch current weather data");
  console.log("   node weatherLogger.js history 7  → Get last 7 days weather history");
}
