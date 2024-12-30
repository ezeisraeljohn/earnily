const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["employer", "jobseeker"], required: true },
    date: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    profilePicture: { type: String, required: false },
    isEmailVerified: { type: Boolean, default: false },
    emailVerifiedAt: { type: Date, required: false },
    isAdmin: { type: Boolean, required: false, default: false },
    isPasswordReset: { type: Boolean, required: false, default: false },
    isPasswordResetExpiredAt: { type: Date, required: false },
    skills: [{ type: mongoose.Schema.ObjectId, ref: "Skill" }],
    categories: [{ type: mongoose.Schema.ObjectId, ref: "Category" }],
    company: {
      type: mongoose.Schema.ObjectId,
      ref: "Company",
      required: false, // Company is optional during registration
    },
    reviews: [{ type: mongoose.Schema.ObjectId, ref: "UserReview" }],
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (this.role === "employer" && !this.company) {
    console.warn(
      "Warning: Employer registered without a company. Company must be added later."
    );
  }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
