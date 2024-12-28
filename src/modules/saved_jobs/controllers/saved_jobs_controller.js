const SavedJob = require("../../../models/saved_jobs_model");
const mongoose = require("mongoose");
const { sendSuccess, sendFailure } = require("../../../shared/utils/responses");
const Job = require("../../../models/job_model");
const User = require("../../../models/user_model");

/**
 * @desc Save a Job for a later time
 * @route POST /api/v1/saved_jobs
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @access Private
 * @returns {Promise<void>}
 */
const saveJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return sendFailure(res, 404, "User not found");
    const job = await Job.findById(jobId);
    if (!job) return sendFailure(res, 404, "Job not found");
    const savedJob = await SavedJob.findOne({ user: req.user.id, job: jobId });
    if (savedJob) return sendFailure(res, 400, "Job already saved");
    const newSavedJob = await SavedJob.create({
      user: req.user.id,
      job: jobId,
    });
    return sendSuccess(res, 201, "Job saved successfully", newSavedJob);
  } catch (error) {
    console.error(error);
    return sendFailure(res, 500, "Oops something went wrong");
  }
};

/**
 * @desc Get all saved jobs
 * @route GET /api/v1/saved_jobs
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @access Private
 * @returns {Promise<void>}
 */
const getSavedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return sendFailure(res, 404, "User not found");
    const savedJobs = await SavedJob.find({ user: req.user.id });
    return sendSuccess(
      res,
      200,
      "Saved Jobs retrieved successfully",
      savedJobs
    );
  } catch (error) {
    console.error(error);
    return sendFailure(res, 500, "Oops something went wrong");
  }
};

/**
 * @desc Delete a saved job
 * @route DELETE /api/v1/saved_jobs/:id
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @access Private
 * @returns {Promise<void>}
 */
const deleteSavedJob = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return sendFailure(res, 400, "Invalid Job ID");
    const savedJob = await SavedJob.findByIdAndDelete(id);
    if (!savedJob) return sendFailure(res, 404, "Saved Job not found");
    if (savedJob.user.toString() !== req.user.id)
      return sendFailure(res, 401, "Unauthorized access");
    return sendSuccess(res, 200, "Job removed successfully", {});
  } catch (error) {
    console.error(error);
    return sendFailure(res, 500, "Oops something went wrong");
  }
};

module.exports = { saveJob, getSavedJobs, deleteSavedJob };
