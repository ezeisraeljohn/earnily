const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["employer", "jobseeker"],
    required: true,
  },
  resume: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  profilePicture: {
    type: String,
    required: false,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  emailVerificationToken: {
    type: String,
    required: false,
  },
  emailVerifiedAt: {
    type: Date,
    required: false,
  },
  isAdmin: {
    type: Boolean,
    required: false,
    default: false,
  },
  timestamps: true,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
