const getSkills = require("../controllers/skill_controller");
const {
  protect,
  authorize,
} = require("../../../shared/middlewares/auth_middleware");
const router = require("express").Router();

router.get("", protect, authorize(["jobseeker", "employer"]), getSkills);

module.exports = router;
