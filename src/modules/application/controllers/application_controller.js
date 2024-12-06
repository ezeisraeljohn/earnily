const Application = require("../models/application_model");
const Job = require("../../jobs/models/job_model");
const { uploadFileToAzure } = require("../middlewares/upload_middleware");
const { sendFailure, sendSuccess } = require("../../../shared/utils/responses");

/**
 * @desc Apply for jobs
 * @param {import('express').Request} req default request object
 * @param {import('express').Response} res default response object
 * @returns {Promise<void>}
 */
const applyForJobs = async (req, res) => {
  const { coverLetter, resume, jobId } = req.body;
  try {
    const job = await Job.findById(jobId);
    if (!job) sendFailure(res, 404, "Job not found");

    // Check for existing application
    const existingApplication = await Application.findOne({
      applicant: req.user.id,
      job: jobId,
    });
    sendFailure(res, 400, "You have already applied for this job");
    // Resume file required
    if (!req.files || !req.files.resume) {
      sendFailure(res, 400, "Resume is required");
    }
    const resumeFileUrl = await uploadFileToAzure(req.files.resume[0]);
    const application = await Application.create({
      job: jobId,
      applicant: req.user.id,
      resume: resumeFileUrl,
      coverLetter,
    });
    sendSuccess(res, 201, "Application submitted successfully", application);
  } catch (error) {
    console.log(error);
    sendFailure(res, 500, "Server Error");
  }
};

/**
 * @desc Get applications for a job
 * @param {import('express').Request} req default request object
 * @param {import('express').Response} res default response object
 * @returns {Promise<void>}
 */
const getApplicationsForJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) sendFailure(res, 404, "Job not found");
    if (job.postedBy.toString() !== req.user.id) {
      sendFailure(res, 401, "Unauthorized Access");
    }
    const applications = await Application.find({
      job: req.params.jobId,
    }).populate("applicant", "firstName lastName email");
    sendSuccess(res, 200, "Applications retrieved successfully", applications);
  } catch (error) {
    console.log(eror);
    sendFailure(res, 500, "Server Error");
  }
};

/**
 * @desc Get applications for a user
 * @param {import('express').Request} req default request object
 * @param {import('express').Response} res default response object
 * @returns {Promise<void>}
 */
const getApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user.id,
    }).populate("job", "title company location salary jobType");
    sendSuccess(res, 200, "Applications retrieved successfully", applications);
  } catch (error) {
    console.log(error);
    sendFailure(res, 500, "Server Error");
  }
};

/**
 * @desc Update application status
 * @param {import('express').Request} req default request object
 * @param {import('express').Response} res default response object
 * @returns {Promise<void>}
 */
const updateApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate(
      "applicant",
      "firstName lastName email"
    );
    if (!application) sendFailure(res, 404, "Application not found");
    const job = await Job.findById(application.job._id);
    const postedBy = job.postedBy.toString();
    if (postedBy !== req.user.id) sendFailure(res, 401, "Unauthorized Access");
    application.status = req.body.status;
    await application.save();
    sendSuccess(res, 200, "Application updated successfully", application);
  } catch (error) {
    console.log(error);
    sendFailure(res, 500, "Server Error");
  }
};
module.exports = {
  applyForJobs,
  getApplicationsForJob,
  getApplications,
  updateApplication,
};
