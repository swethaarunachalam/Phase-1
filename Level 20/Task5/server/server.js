const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://swetha_116:aswetha116116@swetha.76fg2.mongodb.net/project-0?retryWrites=true&w=majority&appName=swetha", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error(err));

// Schemas
const recipeSchema = new mongoose.Schema({
  title: String,
  ingredients: [String],
  instructions: String,
  cuisineType: String,
  mealType: String,
  servings: Number
}, { timestamps: true });

const mealPlanSchema = new mongoose.Schema({
  week: String,
  days: Object, // e.g., { Monday: [recipeId, recipeId], ... }
});

const Recipe = mongoose.model("Recipe", recipeSchema);
const MealPlan = mongoose.model("MealPlan", mealPlanSchema);

// Routes
app.get("/recipes", async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

app.post("/recipes", async (req, res) => {
  const recipe = new Recipe(req.body);
  await recipe.save();
  res.json(recipe);
});

app.put("/recipes/:id", async (req, res) => {
  const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(recipe);
});

app.delete("/recipes/:id", async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.post("/scale", (req, res) => {
  const { ingredients, currentServings, newServings } = req.body;
  const factor = newServings / currentServings;
  const scaled = ingredients.map(item => `${item} x${factor.toFixed(2)}`);
  res.json(scaled);
});

app.post("/mealplan", async (req, res) => {
  const mealPlan = new MealPlan(req.body);
  await mealPlan.save();
  res.json(mealPlan);
});

app.get("/mealplan", async (req, res) => {
  const plans = await MealPlan.find();
  res.json(plans);
});

app.post("/shopping-list", async (req, res) => {
  const { recipeIds } = req.body;
  const recipes = await Recipe.find({ _id: { $in: recipeIds } });
  const ingredients = recipes.flatMap(r => r.ingredients);
  res.json([...new Set(ingredients)]);
});

app.listen(5000, () => console.log("Server started on http://localhost:5000"));
