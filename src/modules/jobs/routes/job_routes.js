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

router.post("/jobs", protect, authorize("employer"), createJob);
router.put("/jobs/:id", protect, authorize("employer"), updateJob);
router.delete("/jobs/:id", protect, authorize("employer"), deleteJob);
router.get("/jobs/me", protect, authorize("employer"), getMyJobs);
router.get("/job/:id", protect, authorize("employer"), getJob);
router.get("/jobs", getJobs);
module.exports = router;
