const rateLimit = require("express-rate-limit");

// Limits repeated login/register attempts from the same IP.
// Protects against brute-force password guessing.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 attempts per window per IP
  message: {
    success: false,
    message: "Too many attempts. Please try again in 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { authLimiter };
