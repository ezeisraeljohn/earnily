const mongoose = require("mongoose");
const company = require("../models/company_model");
const Job = require("../models/job_model");

const userReviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    company: {
      type: mongoose.Schema.ObjectId,
      ref: "Company",
      required: true,
    },
    job: {
      type: mongoose.Schema.ObjectId,
      ref: "Job",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserReview = mongoose.model("UserReview", userReviewSchema);

module.exports = UserReview;
