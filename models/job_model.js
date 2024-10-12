const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
  },
  company: {
    type: String,
    requrired: [true, "Please provide a company"],
  },
  location: {
    type: String,
    required: [true, "Please provide a location"],
  },
  salaryMin: {
    type: Number,
    required: [true, "Please provide a salary"],
  },
  salaryMax: {
    type: Number,
    required: [true, "Please provide a salary"],
  },

  description: {
    type: String,
  },
  jobType: {
    type: String,
    enum: ["full-time", "part-time", "contract", "temporary", "internship"],
    required: [true, "Please provide a job type"],
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Please provide a user (only employers can post jobs)"],
  },
  datePosted: {
    type: Date,
    default: Date.now,
  },
});

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
