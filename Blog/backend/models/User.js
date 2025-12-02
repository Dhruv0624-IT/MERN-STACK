import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
<<<<<<< HEAD
=======
  otpCodeHash: { type: String },
  otpExpiresAt: { type: Date },
  otpAttempts: { type: Number, default: 0 },
  otpLastSentAt: { type: Date },
  isEmailVerified: { type: Boolean, default: false },
>>>>>>> bf97954 (updated Back-End Projects)
}, { timestamps: true });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

<<<<<<< HEAD
=======
userSchema.methods.setOtpCode = async function(code, ttlMinutes = 10) {
  const salt = await bcrypt.genSalt(10);
  this.otpCodeHash = await bcrypt.hash(code, salt);
  const expires = new Date();
  expires.setMinutes(expires.getMinutes() + ttlMinutes);
  this.otpExpiresAt = expires;
  this.otpAttempts = 0;
  this.otpLastSentAt = new Date();
};

userSchema.methods.verifyOtpCode = async function(code) {
  if (!this.otpCodeHash || !this.otpExpiresAt) return false;
  if (new Date() > this.otpExpiresAt) return false;
  const ok = await bcrypt.compare(code, this.otpCodeHash);
  return ok;
};

>>>>>>> bf97954 (updated Back-End Projects)
export default mongoose.model("User", userSchema);
