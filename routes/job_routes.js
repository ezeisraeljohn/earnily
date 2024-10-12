const {
  createJob,
  updateJob,
  deleteJob,
  getJobs,
  getJob,
} = require("../controllers/job_controller");
const { protect, authorize } = require("../middlewares/auth_middleware");
const router = require("express").Router();

router.post("/jobs", protect, authorize("employer"), createJob);
router.put("/jobs/:id", protect, authorize("employer"), updateJob);
router.delete("/jobs/:id", protect, authorize("employer"), deleteJob);
router.get("/jobs", protect, authorize("employer"), getJobs);
router.get("/jobs/:id", protect, authorize("employer"), getJob);
module.exports = router;
