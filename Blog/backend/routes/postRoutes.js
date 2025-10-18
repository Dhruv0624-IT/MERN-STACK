import express from "express";
import multer from "multer";
import Post from "../models/Post.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Image upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Create Post
router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      image: req.file ? req.file.path : "",
      author: req.user._id,
    });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all posts
router.get("/", async (req, res) => {
  const posts = await Post.find().populate("author", "username").sort({ createdAt: -1 });
  res.json(posts);
});

// Get single post
router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id).populate("author", "username");
  res.json(post);
});

// Update post
router.put("/:id", protect, upload.single("image"), async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  if (post.author.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Not authorized" });

  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;
  if (req.file) post.image = req.file.path;
  const updated = await post.save();
  res.json(updated);
});

// Delete post
router.delete("/:id", protect, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  if (post.author.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Not authorized" });

  await post.deleteOne();
  res.json({ message: "Post deleted" });
});

export default router;
