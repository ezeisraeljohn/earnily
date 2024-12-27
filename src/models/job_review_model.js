const mongoose = require("mongoose");

const reviewJobSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    job: {
      type: mongoose.Schema.ObjectId,
      ref: "Job",
      required: true,
    },
    reviewedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

reviewJobSchema.pre("save", function (next) {
  if (this.rating < 1 || this.rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }
  next();
});

const ReviewJob = mongoose.model("ReviewJob", reviewJobSchema);

module.exports = ReviewJob;
