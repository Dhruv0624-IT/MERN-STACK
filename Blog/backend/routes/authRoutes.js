import express from "express";
<<<<<<< HEAD
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ username, email, password });
    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user.id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user.id,
        username: user.username,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
=======
import passport from "passport";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendOtpEmail, verifyMailer } from "../utils/email.js";

const router = express.Router();

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

// Register
router.post("/register", async (req, res, next) => {
  const { username, email, password } = req.body;
  
  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ 
        success: false,
        message: "User already exists" 
      });
    }

    // Create new user (initially not verified)
    const user = await User.create({ 
      username, 
      email, 
      password,
      isEmailVerified: false
    });
    
    // Generate OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    await user.setOtpCode(otpCode, 10); // 10 minutes expiry
    await user.save();
    
    // Send verification email
    try {
      await sendOtpEmail(email, otpCode);
      
      // Return response indicating OTP has been sent
      res.status(201).json({
        success: true,
        message: 'OTP sent to your email. Please verify to complete registration.',
        userId: user._id,
        email: user.email,
        requiresVerification: true
      });
    } catch (emailError) {
      console.error('Failed to send OTP email:', emailError);
      return res.status(500).json({
        success: false,
        message: 'Registration successful but failed to send OTP. Please contact support.'
      });
    }
  } catch (error) {
    console.error('Registration error:', error);
    next(error);
  }
});

// Login with email/password
router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    
    if (!user) {
      return res.status(401).json({ message: info?.message || 'Authentication failed' });
    }
    
    // Check if email is verified
    if (!user.isEmailVerified) {
      return res.status(403).json({ 
        message: "Email not verified. Please verify your email before logging in." 
      });
    }
    
    req.logIn(user, { session: false }, (err) => {
      if (err) {
        return next(err);
      }
      
      const token = generateToken(user);
      
      return res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token,
        message: 'Login successful'
      });
    });
  })(req, res, next);
});

// Protected route example
router.get('/profile', 
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email
      }
    });
  }
);

// Logout
router.post('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Successfully logged out' });
});

// Request OTP (passwordless or 2FA-style login)
router.post("/request-otp", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Valid email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Simple rate limit: 1 email per 60 seconds
    const now = new Date();
    if (user.otpLastSentAt && now - user.otpLastSentAt < 60 * 1000) {
      const wait = Math.ceil((60 * 1000 - (now - user.otpLastSentAt)) / 1000);
      return res.status(429).json({ message: `Please wait ${wait}s before requesting another OTP` });
    }

    // Verify SMTP once per request to provide clearer diagnostics
    await verifyMailer();

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    await user.setOtpCode(code, 10); // 10 minutes TTL
    await user.save();

    await sendOtpEmail(user.email, code);
    return res.json({ message: "OTP sent to your email" });
  } catch (err) {
    return res.status(500).json({ message: err.message || "Failed to send OTP" });
  }
});

// Verify OTP and issue JWT
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) return res.status(400).json({ message: "Email and code are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.otpAttempts >= 5) {
      return res.status(429).json({ message: "Too many attempts. Please request a new OTP." });
    }

    const ok = await user.verifyOtpCode(code);
    if (!ok) {
      user.otpAttempts = (user.otpAttempts || 0) + 1;
      await user.save();
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Clear OTP state
    user.otpCodeHash = undefined;
    user.otpExpiresAt = undefined;
    user.otpAttempts = 0;
    user.isEmailVerified = true;
    await user.save();

    return res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user),
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
>>>>>>> bf97954 (updated Back-End Projects)
  }
});

export default router;
