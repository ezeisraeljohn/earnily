const moongose = require("mongoose");

const applicationSchema = new moongose.Schema(
  {
    job: {
      type: moongose.Schema.ObjectId,
      ref: "Job",
      required: true,
    },
    applicant: {
      type: moongose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    resume: {
      //part to the resume file
      type: String,
      required: true,
    },
    coverLetter: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["applied", "reviewing", "accepted", "rejected"],
      default: "applied",
    },
    dateApplied: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Application = moongose.model("Application", applicationSchema);
module.exports = Application;
