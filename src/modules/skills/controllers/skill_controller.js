const Skill = require("../../../models/skill_model");
const { sendFailure, sendSuccess } = require("../../../shared/utils/responses");

/**
 * @desc Retrieve available skills
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @route GET /api/v1/skills
 * @access Public
 * @returns {Promise<void>}
 */
const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    sendSuccess(res, 200, "Skills retrieved successfully", skills);
  } catch (error) {
    console.error(error.message);
    sendFailure(res, 500, "Server Error");
  }
};

module.exports = getSkills;
