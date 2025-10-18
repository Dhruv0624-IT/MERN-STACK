import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import path from "path";
import movieRoutes from "./routes/movieRoutes.js";

dotenv.config();

const app = express();

// Ensure uploads directory exists to avoid multer/file-serving errors
const uploadsDirPath = path.resolve("uploads");
if (!fs.existsSync(uploadsDirPath)) {
  fs.mkdirSync(uploadsDirPath, { recursive: true });
}

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/movies", movieRoutes);

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is not set in environment (.env)");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Central error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
