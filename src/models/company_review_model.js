const mongoose = require("mongoose");

const reviewCompanySchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    company: {
      type: mongoose.Schema.ObjectId,
      ref: "Company",
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

reviewCompanySchema.pre("save", function (next) {
  if (this.rating < 1 || this.rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }
  next();
});

const reviewCompany = mongoose.model("ReviewCompany", reviewCompanySchema);

module.exports = reviewCompany;
