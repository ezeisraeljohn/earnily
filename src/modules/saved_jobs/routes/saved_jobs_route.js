const {
  saveJob,
  getSavedJobs,
  deleteSavedJob,
} = require("../controllers/saved_jobs_controller");
const {
  protect,
  authorize,
} = require("../../../shared/middlewares/auth_middleware");
const router = require("express").Router();

router.get("", protect, authorize(["jobseeker"]), getSavedJobs);
router.post("", protect, authorize(["jobseeker"]), saveJob);
router.delete("/:id", protect, authorize(["jobseeker"]), deleteSavedJob);

module.exports = router;
