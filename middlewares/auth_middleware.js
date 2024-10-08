const jwt = require("jsonwebtoken");
const User = require("../models/index").User;

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
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    token = bearerToken.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = await User.findById(decoded.userId);
    if (!req.user)
      return res
        .status(401)
        .json({ msg: "Invalid token or token has expired" });
    next();
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
};
