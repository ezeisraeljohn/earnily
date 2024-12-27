const {
  createJob,
  updateJob,
  deleteJob,
  getMyJobs,
  getJob,
  getJobs,
} = require("../controllers/job_controller");
const {
  protect,
  authorize,
} = require("../../../shared/middlewares/auth_middleware");
const router = require("express").Router();

router.post("", protect, authorize(["employer"]), createJob);
router.put("/:id", protect, authorize(["employer"]), updateJob);
router.delete("/jobs/:id", protect, authorize(["employer"]), deleteJob);
router.get("/me", protect, authorize(["employer"]), getMyJobs);
router.get("/:id", protect, authorize(["employer"]), getJob);
router.get("", getJobs);
module.exports = router;
