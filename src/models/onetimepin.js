const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  hashedOtp: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    enum: ["registration", "login", "passwordReset", "accountRecovery"],
  },

  remainingUsage: {
    type: Number,
    required: true,
    default: 5,
  },
  expiredAt: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const OTP = mongoose.model("OTP", OtpSchema);
