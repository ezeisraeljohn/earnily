const User = require("../../../../models/user_model");
const Job = require("../../../../models/job_model");
const ReviewJob = require("../../../../models/job_review_model");
const {
  sendSuccess,
  sendFailure,
} = require("../../../../shared/utils/responses");

/**
 * @des Create a new job review
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @route POST /api/v1/jobs/:jobId/reviews
 * @access Private
 * @returns {Promise<void>}
 */
const createJobReview = async (req, res) => {
  const { review, rating } = req.body;
  const { jobId } = req.params;
  try {
    const job = await Job.findById(jobId);
    if (!job) return sendFailure(res, 404, "Job not found");
    const user = await User.findById(req.user.id);
    if (!user) return sendFailure(res, 404, "User not found");
    const savedReview = await ReviewJob.findOne({
      job: jobId,
      reviewedBy: user.id,
    });
    if (savedReview) return sendFailure(res, 400, "Already reviewed this job");
    const newJobReview = await ReviewJob.create({
      review,
      rating,
      job: jobId,
      reviewedBy: user.id,
    });
    job.reviews.push(newJobReview.id);
    await job.save();
    return sendSuccess(res, 201, "Review created successfully", newJobReview);
  } catch (error) {
    console.error(error);
    sendSuccess(res, 500, "Oops something went wrong");
  }
};

/**
 * @des get a review
 *@param {Object} req - Request object
 *@param {Object} res - Response object
 *@route GET /api/v1/jobs/:jobId/reviews/:reviewId
 *@access Private
 *@returns {Promise<void>}
 */
const getJobReview = async (req, res) => {
  const { jobId, reviewId } = req.params;
  try {
    const job = await Job.findById(jobId);
    if (!job) return sendFailure(res, 404, "Job not found");
    const review = await ReviewJob.findById(reviewId);
    if (!review) return sendFailure(res, 404, "Review not found");
    return sendSuccess(res, 200, "Review retrieved successfully", review);
  } catch (error) {
    console.error(error);
    sendFailure(res, 500, "Oops something went wrong");
  }
};

/**
 * @des get all reviews
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @route GET /api/v1/jobs/:jobId/reviews
 * @access Private
 * @returns {Promise<void>}
 */
const getJobReviews = async (req, res) => {
  const { jobId } = req.params;
  try {
    const job = await Job.findById(jobId);
    if (!job) return sendFailure(res, 404, "Job not found");
    const reviews = await ReviewJob.find({ job: jobId }).sort({
      createdAt: -1,
    });
    return sendSuccess(res, 200, "Reviews retrieved successfully", reviews);
  } catch (error) {
    console.error(error);
    return sendFailure(res, 500, "Oops something went wrong");
  }
};

module.exports = { createJobReview, getJobReview, getJobReviews };
