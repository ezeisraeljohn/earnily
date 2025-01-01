const User = require("../../../models/user_model");
const Category = require("../../../models/categories_model");
const Job = require("../../../models/job_model");
const { sendFailure, sendSuccess } = require("../../../shared/utils/responses");

/**
 * @desc Get all job categories
 * @route GET /api/v1/job-categories
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @access Public
 * @returns {Promise<void>}
 */
const getCategories = async (req, res) => {
  try {
    const jobCategories = await Category.find();
    return sendSuccess(
      res,
      200,
      "Job categories retrieved successfully",
      jobCategories
    );
  } catch (error) {
    console.error(error);
    return sendFailure(res, 500, "Oops, something went wrong");
  }
};

module.exports = getCategories;
