const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
app.use(express.json())

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/productDB")
  .then(() => console.log("MongoDB connected"))

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, text: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true }
})
const Product = mongoose.model("Product", productSchema)

app.get('/seed', async (req, res) => {
  await Product.deleteMany()
  await Product.insertMany([
    { name: "iPhone 13", price: 999, category: "Electronics", stock: 10 },
    { name: "Samsung Galaxy S22", price: 899, category: "Electronics", stock: 12 },
    { name: "Sony Headphones", price: 199, category: "Electronics", stock: 20 },
    { name: "MacBook Air", price: 1200, category: "Electronics", stock: 5 },
    { name: "LG OLED TV", price: 1500, category: "Electronics", stock: 3 },
    { name: "Nike Air Max", price: 150, category: "Footwear", stock: 15 },
    { name: "Adidas Ultraboost", price: 180, category: "Footwear", stock: 10 },
    { name: "Puma Sneakers", price: 100, category: "Footwear", stock: 8 },
    { name: "Reebok Classic", price: 120, category: "Footwear", stock: 14 },
    { name: "Campus Shoes", price: 90, category: "Footwear", stock: 25 },
    { name: "Levi's Jeans", price: 70, category: "Clothing", stock: 20 },
    { name: "Cotton Shirt", price: 50, category: "Clothing", stock: 30 },
    { name: "Winter Jacket", price: 120, category: "Clothing", stock: 12 },
    { name: "Hoodie", price: 90, category: "Clothing", stock: 22 },
    { name: "T-Shirt", price: 35, category: "Clothing", stock: 40 },
    { name: "LG Washing Machine", price: 500, category: "Appliances", stock: 6 },
    { name: "IFB Oven", price: 250, category: "Appliances", stock: 4 },
    { name: "Philips Iron", price: 45, category: "Appliances", stock: 10 },
    { name: "Samsung Refrigerator", price: 800, category: "Appliances", stock: 7 },
    { name: "Voltas AC", price: 1100, category: "Appliances", stock: 5 }
  ])
  res.send("Database seeded")
})

app.get('/api/products/stats', async (req, res) => {
  const result = await Product.aggregate([
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" }
      }
    }
  ])
  res.json(result)
})

app.get('/api/products/complex', async (req, res) => {
  const result = await Product.find({
    price: { $gte: 100 },
    stock: { $gte: 10 },
    category: { $in: ["Electronics", "Footwear"] }
  })
  res.json(result)
})

app.get('/api/products/search', async (req, res) => {
  const { keyword } = req.query
  const result = await Product.find({ $text: { $search: keyword } })
  res.json(result)
})

app.get('/api/products/average', async (req, res) => {
  const result = await Product.aggregate([
    {
      $group: {
        _id: "$category",
        averagePrice: { $avg: "$price" }
      }
    }
  ])
  res.json(result)
})

app.get('/api/products/filter', async (req, res) => {
  const { min, max, sortBy = 'price', order = 'asc' } = req.query
  const filter = {}
  if (min || max) {
    filter.price = {}
    if (min) filter.price.$gte = Number(min)
    if (max) filter.price.$lte = Number(max)
  }
  const result = await Product.find(filter).sort({ [sortBy]: order === 'asc' ? 1 : -1 })
  res.json(result)
})

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000")
})
