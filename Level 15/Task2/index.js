import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.error(err));

const journalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  tags: { type: [String], default: [] },
});

const Journal = mongoose.model("Journal", journalSchema);


app.post("/api/journal", async (req, res) => {
  try {
    const { title, content, date, tags } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }
    const entry = new Journal({ title, content, date, tags });
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


app.get("/api/journal", async (req, res) => {
  try {
    const entries = await Journal.find();
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


app.get("/api/journal/search", async (req, res) => {
  try {
    const { title, startDate, endDate, tags } = req.query;
    let filter = {};

    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }
    if (startDate && endDate) {
      filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    if (tags) {
      filter.tags = { $in: tags.split(",") };
    }

    const entries = await Journal.find(filter);
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


app.put("/api/journal/:id", async (req, res) => {
  try {
    const { title, content, date, tags } = req.body;
    const updatedEntry = await Journal.findByIdAndUpdate(
      req.params.id,
      { title, content, date, tags },
      { new: true }
    );
    if (!updatedEntry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.status(200).json(updatedEntry);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


app.delete("/api/journal/:id", async (req, res) => {
  try {
    const deletedEntry = await Journal.findByIdAndDelete(req.params.id);
    if (!deletedEntry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.status(200).json({ message: "Entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
