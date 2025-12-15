import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendOtpEmail } from "../utils/email.js";

const router = express.Router();


const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email }, 
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};


router.post("/register", async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Username, email and password are required" });
  }

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ username, email, password, isEmailVerified: false });

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    await user.setOtpCode(otpCode, 10);

    try {
      await sendOtpEmail(user.email, otpCode);
    } catch (emailErr) {
      console.error("Failed to send OTP email:", emailErr);
      return res.status(201).json({
        success: true,
        message: "User created but failed to send OTP email"
      });
    }

    res.status(201).json({ success: true, message: "User created. OTP sent to email." });
  } catch (err) {
    next(err);
  }
});


router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info?.message || "Authentication failed" });

    if (!user.isEmailVerified)
      return res.status(403).json({ message: "Email not verified" });

    const token = generateToken(user);
    return res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token
    });
  })(req, res, next);
});


router.post("/request-otp", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const now = new Date();
    if (user.otpLastSentAt && now - user.otpLastSentAt < 60 * 1000) {
      const wait = Math.ceil((60 * 1000 - (now - user.otpLastSentAt)) / 1000);
      return res.status(429).json({ message: `Please wait ${wait}s before requesting another OTP` });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    await user.setOtpCode(code, 10);

    await sendOtpEmail(user.email, code);
    return res.json({ message: "OTP sent to your email" });
  } catch (err) {
    return res.status(500).json({ message: err.message || "Failed to send OTP" });
  }
});


router.post("/verify-otp", async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) return res.status(400).json({ message: "Email and code are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.otpAttempts >= 5) {
      return res.status(429).json({ message: "Too many attempts. Request a new OTP." });
    }

    const ok = await user.verifyOtpCode(code);
    if (!ok) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isEmailVerified = true;
    await user.save();

    const token = generateToken(user);
    return res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});


router.get("/profile", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.json({
    user: { id: req.user._id, username: req.user.username, email: req.user.email }
  });
});


router.post("/logout", (req, res) => {
  res.json({ message: "Successfully logged out (invalidate token client-side)" });
});

export default router;
