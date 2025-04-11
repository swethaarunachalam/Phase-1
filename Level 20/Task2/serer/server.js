const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
const NodeCache = require("node-cache");

const app = express();
app.use(cors());
app.use(express.json());

const cache = new NodeCache({ stdTTL: 600 }); // 10 mins

mongoose.connect("mongodb://127.0.0.1:27017/bookshelf", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Mongoose Schema
const bookSchema = new mongoose.Schema({
  title: String,
  authors: [String],
  status: String,
  rating: Number,
  note: String,
});
const Book = mongoose.model("Book", bookSchema);

// Search Books from Google Books API
app.get("/api/search", async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "Query required" });

  if (cache.has(q)) return res.json(cache.get(q));

  try {
    const response = await axios.get("https://www.googleapis.com/books/v1/volumes", {
      params: { q, maxResults: 10 },
    });

    const books = response.data.items.map((b) => ({
      id: b.id,
      title: b.volumeInfo.title,
      authors: b.volumeInfo.authors || [],
    }));

    cache.set(q, books);
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Search failed" });
  }
});

// Add Book to Collection
app.post("/api/books", async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.json(newBook);
  } catch (err) {
    res.status(500).json({ error: "Add failed" });
  }
});

// Get Books with Optional Filter
app.get("/api/books", async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status && status !== "All" ? { status } : {};
    const books = await Book.find(filter);
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Fetch failed" });
  }
});

// Update Book
app.put("/api/books/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

// Delete Book
app.delete("/api/books/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

app.listen(5000, () => console.log("✅ Server started on http://localhost:5000"));
