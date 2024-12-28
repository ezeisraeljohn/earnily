const getCategories = require("../controllers/categories_controller");
const {
  protect,
  authorize,
} = require("../../../shared/middlewares/auth_middleware");
const router = require("express").Router();

router.get("", protect, authorize(["jobseeker", "employer"]), getCategories);

module.exports = router;
