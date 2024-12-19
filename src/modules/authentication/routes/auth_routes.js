const express = require("express");
const { protect } = require("../../../shared/middlewares/auth_middleware");
const {
  register,
  login,
  activateEmail,
  resendOTP,
} = require("../controllers/auth_controller");
const router = express.Router();

router.post("/register", register);
router.post("/verify-email", protect, activateEmail);
router.post("/login", login);
router.post("/resend-otp", protect, resendOTP);

module.exports = router;
