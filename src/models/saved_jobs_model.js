const mongoose = require("mongoose");
const savedJobSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  job: {
    type: mongoose.Schema.ObjectId,
    ref: "Job",
    required: true,
  },
  savedAt: {
    type: Date,
    default: Date.now,
  },
});

const savedJob = mongoose.model("SavedJob", savedJobSchema);

module.exports = savedJob;
