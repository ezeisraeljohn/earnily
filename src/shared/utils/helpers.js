const jwt = require("jsonwebtoken");
const generateOtp = (num) =>
  Math.floor(
    Math.random() * (9 * Math.pow(10, num - 1)) + Math.pow(10, num - 1)
  );

const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "2d" });
  return token;
};
module.exports = { generateOtp, generateToken };
