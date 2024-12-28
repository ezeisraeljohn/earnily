const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Please provide a title"] },
    company: {
      type: mongoose.ObjectId,
      requrired: [true, "Please provide a company"],
    },
    location: { type: String, required: [true, "Please provide a location"] },
    salaryMin: { type: Number, required: [true, "Please provide a salary"] },
    salaryMax: { type: Number, required: [true, "Please provide a salary"] },

    description: { type: String },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "temporary", "internship"],
      required: [true, "Please provide a job type"],
    },
    numberOfOpenings: { type: Number, default: 1 },
    postedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Please provide a user (only employers can post jobs)"],
    },
    experienceLevel: {
      type: String,
      enum: ["entry-level", "mid-level", "senior-level", "executive"],
      required: false,
    },
    jobDuration: {
      type: String,
      enum: ["short-term", "long-term", "permanent"],
    },
    datePosted: { type: Date, default: Date.now },
    status: { type: String, enum: ["active", "closed"], default: "active" },
    expiryDate: {
      type: Date,
      rerquired: false,
    },
    reviews: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "ReviewJob",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
