const express = require("express");
const connectDB = require("./src/config/db");
const authRouter = require("./src/modules/authentication/routes/auth_routes");
const jobsRouter = require("./src/modules/jobs/routes/job_routes");
const applicationRouter = require("./src/modules/application/routes/application_route");
const userRouter = require("./src/modules/user/routes/user_routes");
const companyRouter = require("./src/modules/companies/routes/company_routes");
const ReviewJobRouter = require("./src/modules/reviews/job_reviews/routes/job_review_routes");
const ReviewCompanyRouter = require("./src/modules/reviews/company_review/routes/company_review_routes");
const savedJobsRouter = require("./src/modules/saved_jobs/routes/saved_jobs_route");
const categoryRouter = require("./src/modules/categories/routes/categories_route");
const suggestSkillRouter = require("./src/modules/suggest_skills/routers/suggest_skills_route");
const skillRouter = require("./src/modules/skills/routes/skill_route");
const userReviewRouter = require("./src/modules/reviews/user_review/routers/user_review_routes");
const path = require("path");
const cors = require("cors");
const rateLimiter = require("./src/shared/utils/ratelimiting");

const app = express();

connectDB();

app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(rateLimiter);
app.use("/api/v1/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/v1/user", userRouter, userReviewRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/company", companyRouter, ReviewCompanyRouter);
app.use("/api/v1", applicationRouter);
app.use("/api/v1/jobs", jobsRouter, ReviewJobRouter);
app.use("/api/v1/saved-jobs", savedJobsRouter);
app.use("/api/v1/job-categories", categoryRouter);
app.use("/api/v1/skills", skillRouter, suggestSkillRouter);
const PORT = process.env.PORT || 8080;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
module.exports = app;
