const reviewCompany = require("../../../../models/company_review_model");
const User = require("../../../../models/user_model");
const {
  sendFailure,
  sendSuccess,
} = require("../../../../shared/utils/responses");
const Company = require("../../../../models/company_model");

/**
 * @des Create a new company review
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @route POST /api/v1/companies/:companyId/reviews
 * @access Private
 * @returns {Promise<void>}
 */
const createCompanyReview = async (req, res) => {
  const { review, rating } = req.body;
  const { companyId } = req.params;
  try {
    const company = await Company.findById(companyId);
    if (!company) return sendFailure(res, 404, "Company not found");
    const user = await User.findById(req.user.id);
    if (!user) return sendFailure(res, 404, "User not found");
    const savedReview = await reviewCompany.findOne({
      company: companyId,
      reviewedBy: user.id,
    });
    if (savedReview)
      return sendFailure(res, 400, "Already reviewed this company");

    const newCompanyReview = await reviewCompany.create({
      review,
      rating,
      company: companyId,
      reviewedBy: user.id,
    });
    company.reviews.push(newCompanyReview.id);
    await company.save();
    return sendSuccess(
      res,
      201,
      "Review created successfully",
      newCompanyReview
    );
  } catch (error) {
    console.error(error);
    sendFailure(res, 500, "Oops something went wrong");
  }
};

/**
 * @des Get all company reviews
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @route GET /api/v1/companies/:companyId/reviews
 * @access Public
 * @returns {Promise<void>}
 */
const getCompanyReviews = async (req, res) => {
  const { companyId } = req.params;
  try {
    const company = await reviewCompany
      .find({ company: companyId })
      .sort({ createdAt: -1 });
    if (!company) return sendFailure(res, 404, "Company not found");
    return sendSuccess(
      res,
      200,
      "Company reviews retrieved successfully",
      company
    );
  } catch (error) {
    console.error(error);
    sendFailure(res, 500, "Oops something went wrong");
  }
};

/**
 * @des get a company review
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @route GET /api/v1/companies/:companyId/reviews/:reviewId
 * @access Private
 * @returns {Promise<void>}
 */
const getCompanyReview = async (req, res) => {
  const { companyId, reviewId } = req.params;
  try {
    const company = await Company.findById(companyId);
    if (!company) return sendFailure(res, 404, "Company not found");
    const review = await reviewCompany.findById(reviewId);
    if (!review) return sendFailure(res, 404, "Review not found");
    return sendSuccess(res, 200, "Review retrieved successfully", review);
  } catch (error) {
    console.error(error);
    sendFailure(res, 500, "Oops something went wrong");
  }
};

module.exports = { createCompanyReview, getCompanyReview, getCompanyReviews };
