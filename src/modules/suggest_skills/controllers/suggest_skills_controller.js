const SuggestSkill = require("../../../models/suggest_skills_model");
const Skill = require("../../../models/skill_model");
const { sendFailure, sendSuccess } = require("../../../shared/utils/responses");

/**
 * @desc create a new suggested skill
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @route POST /api/v1/skills/suggest
 * @access Protected
 * @returns {Promise<void>}
 */
const suggestSkill = async (req, res) => {
  try {
    const { name, category } = req.body;
    const skillExists = await Skill.findOne({ name });
    if (skillExists) {
      return sendFailure(res, 400, "Skill already exists");
    }
    const newSkill = new SuggestSkill({ name, category });
    await newSkill.save();
    sendSuccess(res, 201, "Skill suggested successfully", newSkill);
  } catch (error) {
    console.error(error.message);
    sendFailure(res, 500, "Server Error");
  }
};

module.exports = { suggestSkill };
