const {
  getCompanyReviews,
  getCompanyReview,
  createCompanyReview,
} = require("../controllers/company_review_controller");
const {
  protect,
  authorize,
} = require("../../../../shared/middlewares/auth_middleware");
const router = require("express").Router();

router.post(
  "/:companyId/reviews",
  protect,
  authorize(["jobseeker"]),
  createCompanyReview
);

router.get(
  "/:companyId/reviews",
  protect,
  authorize(["jobseeker", "employer"]),
  getCompanyReviews
);

router.get(
  "/:companyId/reviews/:reviewId",
  protect,
  authorize(["jobseeker", "employer"]),
  getCompanyReview
);

module.exports = router;
