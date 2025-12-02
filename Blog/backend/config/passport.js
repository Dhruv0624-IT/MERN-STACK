import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import dotenv from "dotenv";
import path from "path";

// ✅ Make absolutely sure .env is loaded here too, with explicit path
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// 🔍 Debug check
console.log("🔑 Passport loaded. JWT_SECRET:", process.env.JWT_SECRET ? "✅ Found" : "❌ Missing");

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_fallback";
if (!process.env.JWT_SECRET) {
  console.warn("⚠️ JWT_SECRET missing in environment. Using fallback secret for development.");
}

// ✅ Local Strategy
passport.use(
  "local",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) return done(null, false, { message: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return done(null, false, { message: "Invalid password" });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// ✅ JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await User.findById(payload.id);
      if (user) return done(null, user);
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
);

// ✅ Session serialization
passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
