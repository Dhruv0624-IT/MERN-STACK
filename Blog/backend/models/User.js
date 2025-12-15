import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true, 
    match: [/.+@.+\..+/, "Please enter a valid email address"] 
  },
  password: { type: String, required: true },
  otpCodeHash: { type: String },
  otpExpiresAt: { type: Date },
  otpAttempts: { type: Number, default: 0 },
  otpLastSentAt: { type: Date },
  isEmailVerified: { type: Boolean, default: false },
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

userSchema.methods.setOtpCode = async function (code, ttlMinutes = 10) {
  const salt = await bcrypt.genSalt(10);
  this.otpCodeHash = await bcrypt.hash(code, salt);
  const expires = new Date();
  expires.setMinutes(expires.getMinutes() + ttlMinutes);
  this.otpExpiresAt = expires;
  this.otpAttempts = 0;
  this.otpLastSentAt = new Date();
  await this.save();
};

userSchema.methods.verifyOtpCode = async function (code) {
  if (!this.otpCodeHash || !this.otpExpiresAt) return false;

  if (new Date() > this.otpExpiresAt) return false;

  const isValid = await bcrypt.compare(code, this.otpCodeHash);

  if (isValid) {
    this.otpCodeHash = undefined;
    this.otpExpiresAt = undefined;
    this.otpAttempts = 0;
    await this.save();
  } else {
    this.otpAttempts += 1;
    await this.save();
  }

  return isValid;
};

export default mongoose.model("User", userSchema);
