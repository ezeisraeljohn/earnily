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
      enum: ["applied", "reviewing", "accepted", "rejected", "completed"],
      default: "applied",
    },
    dateApplied: {
      type: Date,
      default: Date.now,
    },
    feedback: {
      type: String, // Feedback text from employer/recruiter
      required: false,
    },
    attachments: [
      {
        fileUrl: { type: String, required: false },
        fileName: { type: String, required: false },
      },
    ],
    reviews: [
      {
        type: moongose.Schema.ObjectId,
        ref: "JobReview",
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Application = moongose.model("Application", applicationSchema);
module.exports = Application;
