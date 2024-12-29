const {
  protect,
  authorize,
} = require("../../../../shared/middlewares/auth_middleware");

const createUserReview = require("../controllers/user_review_controller");

const router = require("express").Router();

router.post(
  "/:userId/reviews",
  protect,
  authorize(["employer"]),
  createUserReview
);

module.exports = router;
