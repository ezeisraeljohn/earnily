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
    jobCategory: { type: mongoose.Schema.ObjectId, required: true },
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
    jobCategory: {
      type: mongoose.Schema.ObjectId,
      ref: "JobCategory",
      required: [true, "Please provide a job category"],
      max: 1,
    },
    skills: [{ type: mongoose.Schema.ObjectId, ref: "Skill", required: true }],
    experienceLevel: {
      type: String,
      enum: ["entry-level", "mid-level", "senior-level", "executive"],
      required: false,
      min: 1,
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
