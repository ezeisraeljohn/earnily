const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    requrired: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    enum: ["full-time", "part-time", "contract", "temporary", "internship"],
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  datePosted: {
    type: Date,
    default: Date.now,
    write: false,
  },
});

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
