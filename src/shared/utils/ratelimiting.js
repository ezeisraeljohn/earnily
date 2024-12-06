const { rateLimit } = require("express-rate-limit");
const { sendFailure } = require("./responses");
const rateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes window
  max: 50, // start blocking after 50 requests
  handler: (req, res) => {
    sendFailure(res, 429, "Too many requests, please try again later.");
  },
});

module.exports = rateLimiter;
