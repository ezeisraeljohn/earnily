const {
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user_controller");

const {
  protect,
  authorize,
} = require("../../../shared/middlewares/auth_middleware");
const router = require("express").Router();

router.get("/:userId", protect, authorize(["employer", "jobseeker"]), getUser);
router.put(
  "/:userId",
  protect,
  authorize(["employer", "jobseeker"]),
  updateUser
);
router.delete(
  "/:userId",
  protect,
  authorize(["employer", "jobseeker"]),
  deleteUser
);

module.exports = router;
