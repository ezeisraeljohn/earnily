const {
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user_controller");
const { uploadProfilePicture } = require("../middleware/upload_middleware");
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
  uploadProfilePicture.fields([{ name: "profilePicture", maxCount: 1 }]),
  updateUser
);
router.delete(
  "/:userId",
  protect,
  authorize(["employer", "jobseeker"]),
  deleteUser
);

module.exports = router;
