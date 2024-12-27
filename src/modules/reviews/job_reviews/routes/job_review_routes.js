const {
  createJobReview,
  getJobReview,
  getJobReviews,
} = require("../controllers/job_review_controller");

const router = require("express").Router();
const {
  protect,
  authorize,
} = require("../../../../shared/middlewares/auth_middleware");

router.post(
  "/:jobId/reviews",
  protect,
  authorize(["jobseeker"]),
  createJobReview
);

router.get(
  "/:jobId/reviews/:reviewId",
  protect,
  authorize(["jobseeker", "employer"]),
  getJobReview
);

router.get("/:jobId/reviews", protect, getJobReviews);

module.exports = router;
