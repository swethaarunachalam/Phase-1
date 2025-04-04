import express from "express";
import fs from "fs/promises";
import path from "path";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const NOTES_DIR = path.join(process.cwd(), "notes");

const ensureNotesDir = async () => {
  try {
    await fs.mkdir(NOTES_DIR, { recursive: true });
  } catch (error) {
    console.error("Error creating notes directory:", error);
  }
};

ensureNotesDir();


app.post("/api/notes", async (req, res) => {
  try {
    const { title, content, category } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const categoryDir = path.join(NOTES_DIR, category || "uncategorized");
    await fs.mkdir(categoryDir, { recursive: true });

    const notePath = path.join(categoryDir, `${title}.md`);
    await fs.writeFile(notePath, content, "utf8");

    res.status(201).json({ message: "Note created successfully", path: notePath });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


app.get("/api/notes", async (req, res) => {
  try {
    const categories = await fs.readdir(NOTES_DIR);
    let notes = [];

    for (const category of categories) {
      const categoryPath = path.join(NOTES_DIR, category);
      const files = await fs.readdir(categoryPath);

      files.forEach((file) => {
        notes.push({ title: file.replace(".md", ""), category });
      });
    }

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


app.get("/api/notes/:category/:title", async (req, res) => {
  try {
    const { category, title } = req.params;
    const notePath = path.join(NOTES_DIR, category, `${title}.md`);

    const content = await fs.readFile(notePath, "utf8");
    res.status(200).json({ title, content, category });
  } catch (error) {
    res.status(404).json({ message: "Note not found" });
  }
});


app.put("/api/notes/:category/:title", async (req, res) => {
  try {
    const { category, title } = req.params;
    const { content } = req.body;
    const notePath = path.join(NOTES_DIR, category, `${title}.md`);

    await fs.writeFile(notePath, content, "utf8");
    res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete a note
app.delete("/api/notes/:category/:title", async (req, res) => {
  try {
    const { category, title } = req.params;
    const notePath = path.join(NOTES_DIR, category, `${title}.md`);

    await fs.unlink(notePath);
    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "Note not found" });
  }
});

app.get("/api/search", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ message: "Search query is required" });

    const categories = await fs.readdir(NOTES_DIR);
    let results = [];

    for (const category of categories) {
      const categoryPath = path.join(NOTES_DIR, category);
      const files = await fs.readdir(categoryPath);

      for (const file of files) {
        const notePath = path.join(categoryPath, file);
        const content = await fs.readFile(notePath, "utf8");

        if (content.includes(query)) {
          results.push({ title: file.replace(".md", ""), category });
        }
      }
    }

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
