import express from "express";
import "dotenv/config";
import pool from "./db/db.js";

const app = express();
app.use(express.json());
const port = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.status(200).json({ success: true });
});

app.get("/api/favorites/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;

    const query = "select * from favorites where user_id = ?";
    const userFavorites = await pool.execute(query, [user_id]);
    res.status(200).json(userFavorites[0]);
  } catch (error) {
    console.log("Error adding favorite", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/api/favorites", async (req, res) => {
  try {
    const { user_id, recipe_id, title, image, cook_time, servings } = req.body;

    if (!user_id || !recipe_id || !title) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const query =
      "insert into favorites (user_id, recipe_id, title, image, cook_time, servings) values (?, ?, ?, ?, ?, ?)";
    const values = [user_id, recipe_id, title, image, cook_time, servings];
    const [result] = await pool.execute(query, values);
    res.status(201).json({ success: true, data: result.insertId });
  } catch (error) {
    console.log("Error adding favorite", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.delete("/api/favorites/:user_id/:recipe_id", async (req, res) => {
  try {
    const { user_id, recipe_id } = req.params;

    const query = "delete from favorites where user_id = ? and recipe_id = ?";
    await pool.execute(query, [user_id, recipe_id]);
    res.status(200).json({ success: true, message: "Removed from favorites" });
  } catch (error) {
    console.log("Error adding favorite", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log("Server is running on port: ", port);
});
