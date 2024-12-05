const jwt = require("jsonwebtoken");
const User = require("../models/index").User;
const { sendSuccess, sendFailure } = require("../utils/responses");

/**
 * @desc Middleware to verify token
 * @param {import('express').Request} req default request object
 * @param {import('express').Response} res default response object
 * @param {import('express').NextFunction} next default next function
 * @returns {Promise<void>}
 */
const protect = async (req, res, next) => {
  const bearerToken = req.header("Authorization");
  if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
    sendFailure(res, 401, "No token, authorization denied");
  }
  try {
    const token = bearerToken.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = await User.findById(decoded.userId);
    if (!req.user) sendFailure(res, 401, "Invalid token or token has expired");
    next();
  } catch (error) {
    console.error(error);
    sendFailure(res, 401, "Invalid token or token has expired");
  }
};

/**
 *
 * @param {string} role
 * @returns
 */
const authorize = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    sendFailure(res, 403, "You are not authorized to access this route");
  }
  next();
};

module.exports = { protect, authorize };
