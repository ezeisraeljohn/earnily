const {
  sendSuccess,
  sendFailure,
} = require("../../../../shared/utils/responses");
const UserReview = require("../../../../models/user_review_model");
const User = require("../../../../models/user_model");
const Application = require("../../../../models/application_model");

/**
 * @desc Create a user review
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @route POST /api/v1/user/:userId/review
 * @access Private
 * @returns {Promise<void>}
 */
const createUserReview = async (req, res) => {
  try {
    const { userId } = req.params;
    const { rating, review, job } = req.body;
    console.log({ rating, review, job });
    const user = await User.findById(userId);
    if (!user) {
      return sendFailure(res, 404, "User not found");
    }
    const application = await Application.findOne({
      applicant: userId,
      job,
    });
    if (!application) {
      return sendFailure(res, 404, "User did not apply for this job");
    }
    if (application.status !== "completed") {
      return sendFailure(res, 400, "User has not completed this job");
    }
    const existingReview = await UserReview.findOne({ user: userId, job });
    const company = req.user?.company?.toString();
    if (existingReview) {
      return sendFailure(res, 400, "User review already exists");
    }
    const userReview = await UserReview.create({
      user: userId,
      company,
      job,
      rating,
      review,
    });
    user.reviews.push(userReview._id);
    await user.save();
    sendSuccess(res, 201, "Review created successfully", userReview);
  } catch (error) {
    console.error(error);
    sendFailure(res, 500, "Oops something went wrong");
  }
};

module.exports = createUserReview;
