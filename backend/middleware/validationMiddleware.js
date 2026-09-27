const { body, validationResult } = require("express-validator");

// Runs after the validation rules below; collects any errors and
// returns a clean 400 response instead of letting bad data reach controllers.
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg, // show the first error, keep it simple
    });
  }
  next();
};

const registerValidationRules = [
  body("name").trim().notEmpty().withMessage("Name is required."),
  body("email").isEmail().withMessage("Please enter a valid email address.").normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters."),
];

const loginValidationRules = [
  body("email").isEmail().withMessage("Please enter a valid email address.").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required."),
];

module.exports = {
  handleValidationErrors,
  registerValidationRules,
  loginValidationRules,
};
