import express from "express";
import connectDB from "./db/db.js";
import Favorite from "./models/favorite.js";
import "dotenv/config";

const app = express();
app.use(express.json());
const port = process.env.PORT || 5001;

connectDB();

app.get("/", async (req, res) => {
  try {
    const favorites = await Favorite.find({ user_id: "123" });
    res.status(200).json({ success: true, data: favorites });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/api/favorites/:user_id", async (req, res) => {
  try {
    const favorites = await Favorite.find({ user_id: req.params.user_id });
    res.status(200).json(favorites);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/api/favorites", async (req, res) => {
  try {
    const { user_id, recipe_id, title, image, cook_time, servings } = req.body;

    if (!user_id || !recipe_id || !title) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const favorite = new Favorite({ user_id, recipe_id, title, image, cook_time, servings });
    const result = await favorite.save();

    res.status(201).json({ success: true, data: result._id });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.delete("/api/favorites/:user_id/:recipe_id", async (req, res) => {
  try {
    const { user_id, recipe_id } = req.params;
    await Favorite.deleteOne({ user_id, recipe_id });
    res.status(200).json({ success: true, message: "Removed from favorites" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

