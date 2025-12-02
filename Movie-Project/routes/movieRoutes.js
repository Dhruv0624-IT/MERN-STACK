import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import Movie from "../models/Movie.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/jpg"];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Only JPG/PNG images allowed"));
  }
});

// CREATE single movie
<<<<<<< HEAD
=======
// Note: multer errors (fileFilter/limits) are forwarded to the error handler.
>>>>>>> bf97954 (updated Back-End Projects)
router.post("/single", upload.single("poster"), async (req, res, next) => {
  try {
    const { title, description, releaseDate } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ error: "Title is required" });
    }
    const newMovie = new Movie({
      title: title.trim(),
      description: description ?? undefined,
      releaseDate: releaseDate ? new Date(releaseDate) : undefined,
      poster: req.file ? `uploads/${req.file.filename}` : null
    });
    const savedMovie = await newMovie.save();
<<<<<<< HEAD
    res.status(201).json(savedMovie);
=======
    const obj = savedMovie.toObject();
    const host = req.get('host');
    const protocol = req.protocol;
    obj.posterUrl = obj.poster ? `${protocol}://${host}/${obj.poster}` : null;
    res.status(201).json(obj);
>>>>>>> bf97954 (updated Back-End Projects)
  } catch (err) {
    next(err);
  }
});

<<<<<<< HEAD
=======
// Multer-specific error handler for routes in this router.
// Converts common Multer errors to JSON responses with status 400.
router.use((err, req, res, next) => {
  if (err && err.code && (err.code === 'LIMIT_FILE_SIZE' || err.code.startsWith('LIMIT_'))) {
    return res.status(400).json({ error: err.message || 'File upload error' });
  }
  // Multer may also pass a plain Error from fileFilter
  if (err && err.message && /Only JPG|PNG|images?/.test(err.message)) {
    return res.status(400).json({ error: err.message });
  }
  next(err);
});

>>>>>>> bf97954 (updated Back-End Projects)
// CREATE multiple movies
router.post("/multiple", upload.array("posters", 10), async (req, res, next) => {
  try {
    let moviesData = [];
    if (req.body.movies) {
      try {
        moviesData = JSON.parse(req.body.movies);
      } catch (e) {
        return res.status(400).json({ error: "Invalid JSON in 'movies' field" });
      }
    }
    if (!Array.isArray(moviesData) || moviesData.length === 0) {
      return res.status(400).json({ error: "'movies' must be a non-empty array" });
    }
    const moviesToSave = moviesData.map((movie, index) => ({
      title: movie.title ? String(movie.title).trim() : undefined,
      description: movie.description ?? undefined,
      releaseDate: movie.releaseDate ? new Date(movie.releaseDate) : undefined,
      poster: (req.files && req.files[index])
        ? `uploads/${req.files[index].filename}`
        : null
    }));
    const savedMovies = await Movie.insertMany(moviesToSave);
<<<<<<< HEAD
    res.status(201).json(savedMovies);
=======
    const host = req.get('host');
    const protocol = req.protocol;
    const withUrls = savedMovies.map(m => {
      const o = m.toObject();
      o.posterUrl = o.poster ? `${protocol}://${host}/${o.poster}` : null;
      return o;
    });
    res.status(201).json(withUrls);
>>>>>>> bf97954 (updated Back-End Projects)
  } catch (err) {
    next(err);
  }
});

// GET all movies
router.get("/", async (req, res, next) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
<<<<<<< HEAD
    res.status(200).json(movies);
=======
    const host = req.get('host');
    const protocol = req.protocol;
    const withUrl = movies.map(m => {
      const obj = m.toObject();
      obj.posterUrl = obj.poster ? `${protocol}://${host}/${obj.poster}` : null;
      return obj;
    });
    res.status(200).json(withUrl);
>>>>>>> bf97954 (updated Back-End Projects)
  } catch (err) {
    next(err);
  }
});

// GET single movie
router.get("/:id", async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: "Movie not found" });
<<<<<<< HEAD
    res.status(200).json(movie);
=======
    const obj = movie.toObject();
    const host = req.get('host');
    const protocol = req.protocol;
    obj.posterUrl = obj.poster ? `${protocol}://${host}/${obj.poster}` : null;
    res.status(200).json(obj);
>>>>>>> bf97954 (updated Back-End Projects)
  } catch (err) {
    next(err);
  }
});

// UPDATE movie
router.put("/:id", upload.single("poster"), async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: "Movie not found" });

    const { title, description, releaseDate } = req.body;
    if (typeof title === "string" && title.trim()) movie.title = title.trim();
    if (typeof description === "string") movie.description = description;
    if (releaseDate) movie.releaseDate = new Date(releaseDate);
<<<<<<< HEAD
    if (req.file) movie.poster = `uploads/${req.file.filename}`;

    const updated = await movie.save();
    res.status(200).json(updated);
=======
    if (req.file) {
      // delete previous poster file if exists
      if (movie.poster) {
        const prevPath = path.join(uploadDir, path.basename(movie.poster));
        try {
          if (fs.existsSync(prevPath)) fs.unlinkSync(prevPath);
        } catch (e) {
          // log and continue; don't block the update for file delete errors
          console.error('Failed to remove previous poster:', e);
        }
      }
      movie.poster = `uploads/${req.file.filename}`;
    }

    const updated = await movie.save();
    const obj = updated.toObject();
    const host = req.get('host');
    const protocol = req.protocol;
    obj.posterUrl = obj.poster ? `${protocol}://${host}/${obj.poster}` : null;
    res.status(200).json(obj);
>>>>>>> bf97954 (updated Back-End Projects)
  } catch (err) {
    next(err);
  }
});

// DELETE movie
router.delete("/:id", async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: "Movie not found" });

    if (movie.poster) {
      const absolutePosterPath = path.join(uploadDir, path.basename(movie.poster));
      if (fs.existsSync(absolutePosterPath)) {
        fs.unlinkSync(absolutePosterPath);
      }
    }

    await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Movie and poster deleted successfully" });
  } catch (err) {
    next(err);
  }
});

export default router;
