const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getMe, createStaffAccount, updateProfile } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { authLimiter } = require("../middleware/rateLimitMiddleware");
const {
  handleValidationErrors,
  registerValidationRules,
  loginValidationRules,
} = require("../middleware/validationMiddleware");

router.post(
  "/register",
  authLimiter,
  registerValidationRules,
  handleValidationErrors,
  registerUser
);

router.post(
  "/login",
  authLimiter,
  loginValidationRules,
  handleValidationErrors,
  loginUser
);

router.get("/me", protect, getMe);
router.put("/me", protect, updateProfile);
router.post("/create-staff", authLimiter, createStaffAccount);

module.exports = router;
