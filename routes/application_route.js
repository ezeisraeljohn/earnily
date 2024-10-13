const express = require("express");
const {
  applyForJobs,
  getApplicationsForJob,
  getApplications,
  updateApplication,
} = require("../controllers/application_controller");
const { protect, authorize } = require("../middlewares/auth_middleware");
const { upload } = require("../middlewares/upload_middleware");

const router = express.Router();

router.post(
  "/apply",
  protect,
  authorize("jobseeker"),
  upload.fields([{ name: "resume", maxCount: 1 }]),
  applyForJobs
);
router.get(
  "/:jobId/applications",
  protect,
  authorize("employer"),
  getApplicationsForJob
);
router.get("/applications", protect, authorize("jobseeker"), getApplications);
router.put(
  "/applications/:id",
  protect,
  authorize("employer"),
  updateApplication
);

module.exports = router;
