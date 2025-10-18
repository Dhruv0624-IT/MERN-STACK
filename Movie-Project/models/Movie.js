import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  releaseDate: { type: Date },
  poster: { type: String } 
}, { timestamps: true });

export default mongoose.model("Movie", movieSchema);
