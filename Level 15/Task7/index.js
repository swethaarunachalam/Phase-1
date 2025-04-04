require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const xml2js = require("xml2js");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Define Article Schema
const articleSchema = new mongoose.Schema({
    title: String,
    link: String,
    description: String,
    pubDate: Date,
    source: String,
    isRead: { type: Boolean, default: false }
});

const Article = mongoose.model("Article", articleSchema);

// ✅ Function to Fetch & Parse RSS Feeds
async function fetchRSS(url) {
    try {
        const response = await axios.get(url);
        const result = await xml2js.parseStringPromise(response.data);
        const items = result.rss.channel[0].item;

        return items.map(item => ({
            title: item.title[0],
            link: item.link[0],
            description: item.description ? item.description[0] : "No description",
            pubDate: new Date(item.pubDate[0]),
            source: url,
            isRead: false
        }));
    } catch (error) {
        console.error("❌ RSS Fetch Error:", error.message);
        return [];
    }
}

// ✅ API: Add RSS Feed & Store in DB
app.post("/addFeed", async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ message: "RSS Feed URL required" });

    const articles = await fetchRSS(url);
    if (articles.length === 0) return res.status(500).json({ message: "Failed to fetch RSS" });

    await Article.insertMany(articles, { ordered: false }).catch(() => {});
    res.json({ message: "✅ Feed Added Successfully", articles });
});

// ✅ API: Get All Articles
app.get("/articles", async (req, res) => {
    const articles = await Article.find();
    res.json(articles);
});

// ✅ API: Query Articles (By Source, Keyword, or Date)
app.get("/search", async (req, res) => {
    const { source, keyword, date } = req.query;
    let query = {};

    if (source) query.source = source;
    if (keyword) query.$or = [{ title: new RegExp(keyword, "i") }, { description: new RegExp(keyword, "i") }];
    if (date) query.pubDate = { $gte: new Date(date) };

    const results = await Article.find(query);
    res.json(results);
});

// ✅ API: Mark Article as Read/Unread
app.patch("/article/:id", async (req, res) => {
    const { isRead } = req.body;
    await Article.findByIdAndUpdate(req.params.id, { isRead });
    res.json({ message: "✅ Article updated successfully" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
