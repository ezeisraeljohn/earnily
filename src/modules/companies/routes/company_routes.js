const {
  createCompany,
  getCompany,
  updateCompany,
  deleteCompany,
} = require("../controllers/company_controller");
const {
  protect,
  authorize,
} = require("../../../shared/middlewares/auth_middleware");

const router = require("express").Router();
const { uploadLogo } = require("../middlewares/upload_middleware");

router.post(
  "",
  protect,
  authorize(["employer"]),
  uploadLogo.fields([{ name: "logo", maxCount: 1 }]),
  createCompany
);
router.get("/:companyId", protect, authorize(["employer"]), getCompany);
router.put("/:companyId", protect, authorize(["employer"]), updateCompany);
router.delete("/:companyId", protect, authorize(["employer"]), deleteCompany);

module.exports = router;
