const { suggestSkill } = require("../controllers/suggest_skills_controller");
const {
  protect,
  authorize,
} = require("../../../shared/middlewares/auth_middleware");

const router = require("express").Router();

router.post(
  "/suggest",
  protect,
  authorize(["jobseeker", "employer"]),
  suggestSkill
);

module.exports = router;
