const createJob = require("../controllers/job_controller").createJob;
const { protect, authorize } = require("../middlewares/auth_middleware");
const router = require("express").Router();

router.post("/jobs", protect, authorize("employer"), createJob);

module.exports = router;
