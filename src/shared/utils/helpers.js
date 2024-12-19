const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const generateOtp = (num) =>
  Math.floor(
    Math.random() * (9 * Math.pow(10, num - 1)) + Math.pow(10, num - 1)
  );

const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "2d" });
  return token;
};

const generateSalt = (value) => {
  return bcrypt.genSaltSync(value);
};
module.exports = { generateOtp, generateToken, generateSalt };
