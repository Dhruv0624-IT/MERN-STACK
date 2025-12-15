import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";

// ✅ Initialize app
const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Initialize Passport config
import "./config/passport.js";

// ✅ Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Session configuration
app.use(
  session({
    secret: process.env.JWT_SECRET || "temporary_secret_fallback",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      ttl: 14 * 24 * 60 * 60, // 14 days
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    },
  })
);

// ✅ Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// ✅ Serve uploads folder
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// ✅ Health check
app.get("/", (req, res) => {
  res.send("✅ Blog API running successfully!");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
