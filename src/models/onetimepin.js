const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

const OTP = mongoose.model("OTP", OtpSchema);

module.exports = OTP;
