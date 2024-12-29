const mongoose = require("mongoose");
const { sendSuccess, sendFailure } = require("../../../shared/utils/responses");
const User = require("../../../models/user_model");

/**
 * @desc Get a user profile
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @route PUT /api/v1/user/:userId
 * @access Private
 * @returns {Promise<void>}
 */
const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return sendFailure(res, 400, "Invalid user id");
    }
    const user = await User.findById(userId);
    if (!user) {
      return sendFailure(res, 404, "User not found");
    }
    const { password, ...userWithoutPassword } = user.toObject();
    userWithoutPassword.id = userWithoutPassword._id;
    delete userWithoutPassword._id;
    sendSuccess(res, 200, "User retrieved successfully", userWithoutPassword);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
};

/**
 * @desc Update a user profile
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @route PUT /api/v1/user/:userId
 * @access Private
 * @returns {Promise<void>}
 */
const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { firstName, lastName, profilePicture, skills, categories } =
      req.body;
    const updateBody = {
      firstName,
      lastName,
      profilePicture,
      skills,
      categories,
    };
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return sendFailure(res, 400, "Invalid user id");
    }
    const user = await User.findById(userId);
    if (!user) {
      return sendFailure(res, 404, "User not found");
    }
    if (user._id.toString() !== req.user.id) {
      if (req.user.isAdmin) {
        return sendFailure(
          res,
          401,
          "You are not authorized to update this user"
        );
      }
    }
    const updatedUser = await User.findByIdAndUpdate(userId, updateBody, {
      new: true,
      runValidators: true,
      lean: true,
    });
    const { password, ...userWithoutPassword } = updatedUser;
    userWithoutPassword.id = userWithoutPassword._id;
    sendSuccess(res, 200, "User updated successfully", userWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

/**
 * @desc Delete a user profile
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @route DELETE /api/v1/user/:userId
 * @access Private
 * @returns {Promise<void>}
 */
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return sendFailure(res, 400, "Invalid user id");
    }
    const user = await User.findById(userId);
    if (!user) {
      return sendFailure(res, 404, "User not found");
    }
    if (user._id.toString() !== req.user.id) {
      if (req.user.isAdmin) {
        return sendFailure(
          res,
          401,
          "You are not authorized to delete this user"
        );
      }
    }
    await User.findByIdAndUpdate(userId, { isActive: false });
    sendSuccess(res, 200, "User deleted successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  deleteUser,
  updateUser,
  getUser,
};
