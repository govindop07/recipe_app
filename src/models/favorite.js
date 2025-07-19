import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  recipe_id: { type: Number, required: true },
  title: { type: String, required: true },
  image: String,
  cook_time: String,
  servings: String,
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model("Favorite", favoriteSchema);
