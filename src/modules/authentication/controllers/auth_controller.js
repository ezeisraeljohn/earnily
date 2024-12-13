const User = require("../../../models/user_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { sendSuccess, sendFailure } = require("../../../shared/utils/responses");
const { generateOtp, generateToken } = require("../../../shared/utils/helpers");
const {
  createOTPQuery,
  findOTPQuery,
} = require("../../one_time_pin/onetimepin_queries");
const verifyEmail = require("../../generic/email_service");
const moment = require("moment");
dotenv.config();

const salt = bcrypt.genSalt(10);
/**
 * @desc Register a new user
 * @route POST /api/v1/register
 * @access Public
 * @type {import('express').RequestHandler}
 * @param {import('express').Request} req default request object
 * @param {import('express').Response} res default response object
 *
 * @returns {Promise<void>}
 */
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    let user = await User.findOne({ email });
    if (user) return sendFailure(res, 400, "User already exists");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const otp = generateOtp(6);
    user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role, // employer or jobseeker
    });

    await user.save();

    const { password: _, __v: none, ...userWithoutPassword } = user.toObject();
    userWithoutPassword.id = userWithoutPassword._id;
    delete userWithoutPassword._id;

    const otpData = {
      userId: userWithoutPassword.id,
      hashedOtp: bcrypt.hashSync(String(otp), salt),
      reason: "registration",
      expiredAt: moment().add(5, "minutes"),
    };

    const value = await createOTPQuery(otpData);

    const emailData = { email: userWithoutPassword.email, otp };

    try {
      await verifyEmail(emailData);
    } catch (err) {
      console.error("Failed to send verification email:", err);
    }
    const payload = {
      userId: userWithoutPassword.id,
      email: userWithoutPassword.email,
      role: userWithoutPassword.role,
    };
    const token = generateToken(payload);
    sendSuccess(res, 201, "User created successfully", {
      token,
      ...userWithoutPassword,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
};

/**
 * @description Activate user account
 * @route POST /api/v1/verify-email
 * @access Public
 * @type {import('express').RequestHandler}
 * @param {import('express').Request} req default request object
 * @param {import('express').Response} res default response object
 * @returns {Promise<void>}
 */
const activateEmail = async (req, res) => {
  const { otp } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (user.isEmailVerified)
      return sendFailure(res, 400, "User already verified");

    const data = { userId: req.user.id, purpose: "registration" };
    const otpObject = await findOTPQuery(data);
    if (!otpObject)
      return sendFailure(res, 400, "No Otp, please request for one");

    const sameOtp = bcrypt.compare(otp, otpObject.hashedOtp);

    if (!sameOtp) {
      otpObject.remainingUsage -= 1;
      await otpObject.save();
      return sendFailure(res, 400, "Invalid OTP");
    }
    user.isEmailVerified = true;
    user.emailVerifiedAt = Date.now();
    await user.save();
    sendSuccess(res, 200, "Email verified successfully", { userId: user._id });
  } catch (err) {
    console.error(err);
  }
};

/**
 * @description Login user
 * @route POST /api/v1/login
 * @access Public
 * @type {import('express').RequestHandler}
 * @param {import('express').Request} req default request object
 * @param {import('express').Response} res default response object
 * @returns {Promise<void>}
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) sendFailure(res, 400, "Invalid Credentials");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) sendFailure(res, 400, "Invalid Credentials");

    const payload = { userId: user._id, email: user.email, role: user.role };
    const token = generateToken(payload);
    sendSuccess(res, 200, "Token retrieved successfully", { token });
  } catch (error) {
    console.error(error);
    sendFailure(res, 500, "An error occurred");
  }
};

module.exports = { register, login, activateEmail };
