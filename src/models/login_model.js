const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    lastLogin: {
      type: Date,
      required: true,
      default: Date.now,
    },
    lastLoginInfo: {
      device: {
        type: String,
        required: true,
      },
      os: {
        type: String,
        required: true,
      },
      browser: {
        type: String,
        required: true,
      },
      location: {
        city: String,
        region: String,
        country: String,
      },
    },
    ipAddress: {
      type: String,
      required: true,
    },
    isNewDevice: {
      type: Boolean,
      default: false,
    },
    isNewLocation: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Login = mongoose.model("logins", loginSchema);

module.exports = Login;
