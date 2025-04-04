import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  category: { type: String, default: "General" },
});

const Contact = mongoose.model("Contact", contactSchema);

// 📌 API Routes

// ✅ Add Contact
app.post("/contacts", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json({ message: "✅ Contact added successfully!", contact: newContact });
  } catch (error) {
    res.status(400).json({ error: "❌ Error adding contact", details: error.message });
  }
});


app.get("/contacts", async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});


app.get("/contacts/search", async (req, res) => {
  const { query } = req.query;
  const contacts = await Contact.find({
    $or: [{ name: { $regex: query, $options: "i" } }, { phone: { $regex: query, $options: "i" } }],
  });
  res.json(contacts);
});


app.put("/contacts/:id", async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "✅ Contact updated successfully!", contact: updatedContact });
  } catch (error) {
    res.status(400).json({ error: "❌ Error updating contact", details: error.message });
  }
});


app.delete("/contacts/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "✅ Contact deleted successfully!" });
  } catch (error) {
    res.status(400).json({ error: "❌ Error deleting contact", details: error.message });
  }
});

app.get("/contacts/category/:category", async (req, res) => {
  const contacts = await Contact.find({ category: req.params.category });
  res.json(contacts);
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
